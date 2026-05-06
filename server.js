import express from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { Queue, Worker } from 'bullmq';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildTicket } from './escposTicket.js';
import { sendToPrinter, sendToPrintNode } from './printService.js';
import { createPixPayment, verifyPixPayment, isPixGatewayConfigured } from './pixGateway.js';

dotenv.config();

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const siteRoot = path.resolve(__dirname, '..');

app.use((req, res, next) => {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

const port = Number(process.env.PORT || 3000);
const queueName = process.env.QUEUE_NAME || 'print-jobs';
const queueEnabled = process.env.ENABLE_QUEUE === '1';
const hasDatabase = Boolean(process.env.DATABASE_URL);

const pool = hasDatabase ? new Pool({ connectionString: process.env.DATABASE_URL }) : null;

let queue = null;
let worker = null;
if (queueEnabled) {
  const redisConnection = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT || 6379)
  };

  queue = new Queue(queueName, { connection: redisConnection });

  worker = new Worker(
    queueName,
    async (job) => {
      if (job.name !== 'print-order') return;
      const { order } = job.data;
      return printOrder(order);
    },
    { connection: redisConnection }
  );

  worker.on('completed', (job) => {
    console.log(`Job de impressao concluido: ${job.id}`);
  });

  worker.on('failed', (job, err) => {
    console.error(`Falha na impressao do job ${job?.id}:`, err);
  });

  worker.on('error', (err) => {
    console.error('Erro no worker de impressao:', err.message);
  });
}

async function ensureSchema() {
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      customer_name TEXT NOT NULL,
      customer_phone TEXT,
      customer_address TEXT,
      payment_method TEXT,
      payment_status TEXT NOT NULL DEFAULT 'pending',
      amount_paid NUMERIC(12,2) NOT NULL DEFAULT 0,
      change_due NUMERIC(12,2) NOT NULL DEFAULT 0,
      payment_reference TEXT,
      payment_details JSONB,
      table_number TEXT,
      items JSONB NOT NULL,
      total NUMERIC(12,2) NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

const PAYMENT_METHODS = [
  'Dinheiro',
  'Cartão Crédito',
  'Cartão Débito',
  'Pix',
  'Vale Refeição',
  'Vale Alimentação',
  'Transferência',
  'Voucher',
  'Outros'
];

function parseNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizePaymentMethod(value) {
  const method = String(value || '').trim();
  if (!method) return '';
  const match = PAYMENT_METHODS.find((item) => item.toLowerCase() === method.toLowerCase());
  return match || method;
}

function normalizeItems(items) {
  if (!Array.isArray(items)) return [];

  return items.map((item) => ({
    name: String(item?.name || 'Item'),
    quantity: parseNumber(item?.quantity) || 1,
    price: parseNumber(item?.price),
    modifiers: Array.isArray(item?.modifiers) ? item.modifiers.map((m) => String(m)) : []
  }));
}

function buildDirectOrder(body) {
  const createdAt = new Date().toISOString();
  const items = normalizeItems(body.items);
  const total =
    typeof body.total === 'number'
      ? body.total
      : items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const amountPaid = parseNumber(body.amountPaid || body.amount_paid || body.paid || total);
  const changeDue = parseNumber(body.changeDue || body.change_due || amountPaid - total);

  return {
    id: body.id || `SIM-${Date.now().toString().slice(-6)}`,
    customer_name: String(body.customerName || body.customer_name || 'Cliente'),
    customer_phone: String(body.customerPhone || body.customer_phone || body.phone || ''),
    customer_address: String(body.customerAddress || body.customer_address || body.address || ''),
    payment_method: normalizePaymentMethod(body.paymentMethod || body.payment_method || body.payment || ''),
    payment_status: String(body.paymentStatus || body.payment_status || body.status || 'pending'),
    amount_paid: amountPaid,
    change_due: changeDue,
    payment_reference: String(
      body.paymentReference || body.payment_reference || body.transactionId || body.transaction_id || ''
    ),
    payment_details:
      typeof body.paymentDetails === 'object' && body.paymentDetails !== null ? body.paymentDetails : null,
    notes: String(body.note || body.notes || ''),
    table_number: body.tableNumber || body.table_number || null,
    items,
    total: parseNumber(total),
    created_at: createdAt
  };
}

async function printOrder(order) {
  const content = buildTicket(order);

  if (process.env.PRINTNODE_API_KEY && process.env.PRINTNODE_PRINTER_ID) {
    return sendToPrintNode(content, order);
  }

  return sendToPrinter(content);
}

app.post('/print', async (req, res) => {
  try {
    const order = buildDirectOrder(req.body || {});
    if (!order.customer_name || order.items.length === 0) {
      return res.status(400).json({ error: 'customerName e items sao obrigatorios' });
    }

    if (order.payment_method === 'Pix') {
      // Gateway Pix desabilitado - aceitar sem verificacao
      order.payment_status = 'paid';
    }

    await printOrder(order);
    return res.status(201).json({
      ok: true,
      message: 'Pedido enviado para impressao',
      orderId: String(order.id)
    });
  } catch (error) {
    console.error('Falha na impressao direta:', error);
    return res.status(500).json({
      error: 'Falha ao imprimir pedido',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

app.post('/pix/create', async (req, res) => {
  try {
    const order = buildDirectOrder(req.body || {});
    if (order.payment_method !== 'Pix') {
      return res.status(400).json({ error: 'Somente pagamento Pix pode usar este endpoint.' });
    }
    // Mock response - gateway desabilitado
    const amount = order.total.toFixed(2);
    const pixCode = `00020101021126860014br.gov.bcb.pix0117429927640001500216Rei do Frango5204000053039865405${amount}5802BR5913Rei do Frango6014Rio de Janeiro62070503***6304ABCD`;
    const mockResponse = {
      status: 'ACTIVE',
      reference: order.payment_reference || order.id,
      qrcode: pixCode,
      qrcodePayload: pixCode,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      raw: { mock: true }
    };
    return res.status(201).json({ ok: true, ...mockResponse });
  } catch (error) {
    console.error('Erro no mock Pix:', error);
    return res.status(500).json({
      error: 'Falha no mock Pix',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

app.post('/pix/verify', async (req, res) => {
  try {
    const reference = String(req.body?.reference || '').trim();
    if (!reference) {
      return res.status(400).json({ error: 'Referencia Pix obrigatoria para verificacao.' });
    }
    // Mock response - sempre retorna pago
    const mockResponse = {
      status: 'PAID',
      paid: true,
      reference: reference,
      raw: { mock: true }
    };
    return res.json({ ok: true, ...mockResponse });
  } catch (error) {
    console.error('Erro no mock verify:', error);
    return res.status(500).json({
      error: 'Falha na verificacao mock',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

app.get('/orders/:id', async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Banco de dados nao configurado' });
  }

  const { id } = req.params;
  const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Pedido nao encontrado' });
  res.json(result.rows[0]);
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    queueEnabled,
    databaseEnabled: hasDatabase,
    pixGatewayConfigured: false, // Mock mode
    pixMode: 'mock'
  });
});

app.use(express.static(siteRoot));

app.get('/', (_req, res) => {
  res.sendFile(path.join(siteRoot, 'index.html'));
});

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/print') || req.path.startsWith('/orders') || req.path.startsWith('/health')) {
    return next();
  }
  return res.sendFile(path.join(siteRoot, 'index.html'));
});

app.listen(port, async () => {
  try {
    await ensureSchema();
    console.log(`Servidor rodando em http://localhost:${port}`);
  } catch (error) {
    console.error('Servidor iniciou sem schema completo:', error);
  }
});
