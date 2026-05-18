import express from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { Queue, Worker } from 'bullmq';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { buildTicket } from './escposTicket.js';
import { sendToPrinter, sendToPrintNode, getPrinterDiagnostics } from './printService.js';

dotenv.config();

const app = express();
app.use(express.json({ limit: '1mb' }));

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

  return next();
});

const port = Number(process.env.PORT || 3000);
const queueName = process.env.QUEUE_NAME || 'print-jobs';
const queueEnabled = process.env.ENABLE_QUEUE === '1';
const rawDatabaseUrl = String(process.env.DATABASE_URL || '').trim();
const hasDatabase = Boolean(rawDatabaseUrl) && !rawDatabaseUrl.includes('user:password@localhost:5432/restaurant');
let databaseEnabled = hasDatabase;
let databaseReady = false;
const ORDER_HISTORY_LIMIT = Math.max(20, Number(process.env.ORDER_HISTORY_LIMIT || 300));
const ordersStorePath = path.join(__dirname, 'orders-store.json');
let orderHistory = [];
const orderStreamClients = new Set();

const pool = databaseEnabled ? new Pool({ connectionString: process.env.DATABASE_URL }) : null;

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
  if (!pool) {
    databaseEnabled = false;
    databaseReady = false;
    return;
  }

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
  databaseReady = true;
}

function normalizeOrderHistoryRecord(rawRecord, index) {
  const fallbackId = `HIST-${Date.now()}-${index + 1}`;
  const createdAt = sanitizeText(rawRecord?.created_at, 40) || new Date().toISOString();
  const updatedAt = sanitizeText(rawRecord?.updated_at, 40) || createdAt;
  const items = Array.isArray(rawRecord?.items) ? rawRecord.items : [];

  return {
    id: sanitizeText(rawRecord?.id, 60) || fallbackId,
    customer_name: sanitizeText(rawRecord?.customer_name, 80) || 'Cliente',
    customer_phone: sanitizeText(rawRecord?.customer_phone, 40),
    customer_address: sanitizeText(rawRecord?.customer_address, 220),
    payment_method: sanitizeText(rawRecord?.payment_method, 60),
    payment_status: sanitizeText(rawRecord?.payment_status, 40) || 'pending',
    amount_paid: parseNumber(rawRecord?.amount_paid),
    change_due: parseNumber(rawRecord?.change_due),
    payment_reference: sanitizeText(rawRecord?.payment_reference, 100),
    notes: sanitizeText(rawRecord?.notes, 240),
    table_number: sanitizeText(rawRecord?.table_number, 30) || null,
    items,
    total: parseNumber(rawRecord?.total),
    status: sanitizeText(rawRecord?.status, 50) || 'recebido',
    print_error: sanitizeText(rawRecord?.print_error, 300),
    created_at: createdAt,
    updated_at: updatedAt,
    printed_at: sanitizeText(rawRecord?.printed_at, 40),
    source: sanitizeText(rawRecord?.source, 40) || 'print-service'
  };
}

function sortOrderHistory(records) {
  return [...records].sort((a, b) => {
    const aTime = new Date(a?.created_at || 0).getTime();
    const bTime = new Date(b?.created_at || 0).getTime();
    return bTime - aTime;
  });
}

function trimOrderHistory(records) {
  return sortOrderHistory(records).slice(0, ORDER_HISTORY_LIMIT);
}

async function loadOrderHistory() {
  try {
    const content = await fs.readFile(ordersStorePath, 'utf8');
    const parsed = JSON.parse(content);
    const rawList = Array.isArray(parsed) ? parsed : [];
    orderHistory = trimOrderHistory(rawList.map((item, index) => normalizeOrderHistoryRecord(item, index)));
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      console.warn('Nao foi possivel ler orders-store.json:', error?.message || error);
    }
    orderHistory = [];
  }
}

async function persistOrderHistory() {
  const payload = JSON.stringify(orderHistory, null, 2);
  await fs.writeFile(ordersStorePath, `${payload}\n`, 'utf8');
}

function findOrderInHistory(orderId) {
  const normalized = sanitizeText(orderId, 60);
  if (!normalized) return null;
  return orderHistory.find((order) => String(order.id) === normalized) || null;
}

function toPublicOrder(order) {
  return {
    id: String(order.id),
    customer_name: order.customer_name,
    customer_phone: order.customer_phone,
    customer_address: order.customer_address,
    payment_method: order.payment_method,
    payment_status: order.payment_status,
    amount_paid: parseNumber(order.amount_paid),
    change_due: parseNumber(order.change_due),
    payment_reference: order.payment_reference,
    notes: order.notes,
    table_number: order.table_number,
    items: Array.isArray(order.items) ? order.items : [],
    total: parseNumber(order.total),
    status: order.status,
    print_error: order.print_error || '',
    created_at: order.created_at,
    updated_at: order.updated_at || order.created_at,
    printed_at: order.printed_at || ''
  };
}

function buildOrderHistoryRecord(order, status, printError = '') {
  const now = new Date().toISOString();
  return normalizeOrderHistoryRecord(
    {
      ...order,
      status,
      print_error: printError,
      updated_at: now,
      printed_at: status === 'impresso' ? now : ''
    },
    0
  );
}

async function upsertOrderHistoryRecord(record) {
  const normalized = normalizeOrderHistoryRecord(record, 0);
  const withoutCurrent = orderHistory.filter((item) => String(item.id) !== String(normalized.id));
  orderHistory = trimOrderHistory([normalized, ...withoutCurrent]);
  await persistOrderHistory();
  return normalized;
}

function sendOrderEventToClient(client, eventName, payload) {
  try {
    client.write(`event: ${eventName}\n`);
    client.write(`data: ${JSON.stringify(payload)}\n\n`);
    return true;
  } catch {
    return false;
  }
}

function broadcastOrderUpdate(orderRecord) {
  const payload = {
    type: 'order_update',
    order: toPublicOrder(orderRecord),
    sent_at: new Date().toISOString()
  };

  for (const client of orderStreamClients) {
    const sent = sendOrderEventToClient(client, 'update', payload);
    if (!sent) {
      orderStreamClients.delete(client);
    }
  }
}

const PAYMENT_METHODS = [
  'Dinheiro',
  'Cartao Credito',
  'Cartao Debito',
  'Pix',
  'Vale Refeicao',
  'Vale Alimentacao',
  'Transferencia',
  'Voucher',
  'Outros'
];

function parseNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function sanitizeText(value, maxLength = 180) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function normalizeForCompare(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function normalizePaymentMethod(value) {
  const method = sanitizeText(value || '', 50);
  if (!method) return '';

  const normalized = normalizeForCompare(method);
  const match = PAYMENT_METHODS.find((item) => normalizeForCompare(item) === normalized);
  return match || method;
}

function normalizeItems(items) {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      const quantity = Math.max(1, Math.trunc(parseNumber(item?.quantity) || 1));
      const price = Math.max(0, parseNumber(item?.price));
      const name = sanitizeText(item?.name || 'Item', 90) || 'Item';
      const modifiers = Array.isArray(item?.modifiers)
        ? item.modifiers.map((modifier) => sanitizeText(modifier, 90)).filter(Boolean)
        : [];

      return {
        name,
        quantity,
        price,
        modifiers
      };
    })
    .filter((item) => item.quantity > 0 && item.price >= 0);
}

function buildDirectOrder(body) {
  const createdAt = new Date().toISOString();
  const items = normalizeItems(body.items);
  const calculatedTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const informedTotal = parseNumber(body.total);
  const total = informedTotal > 0 ? informedTotal : calculatedTotal;

  const amountPaid = Math.max(0, parseNumber(body.amountPaid || body.amount_paid || body.paid || total));
  const changeDue = Math.max(0, parseNumber(body.changeDue || body.change_due || amountPaid - total));

  return {
    id: sanitizeText(body.id || `SIM-${Date.now().toString().slice(-6)}`, 36),
    customer_name: sanitizeText(body.customerName || body.customer_name || 'Cliente', 80) || 'Cliente',
    customer_phone: sanitizeText(body.customerPhone || body.customer_phone || body.phone || '', 30),
    customer_address: sanitizeText(body.customerAddress || body.customer_address || body.address || '', 180),
    payment_method: normalizePaymentMethod(body.paymentMethod || body.payment_method || body.payment || ''),
    payment_status: sanitizeText(body.paymentStatus || body.payment_status || body.status || 'pending', 30),
    amount_paid: amountPaid,
    change_due: changeDue,
    payment_reference: sanitizeText(
      body.paymentReference || body.payment_reference || body.transactionId || body.transaction_id || '',
      80
    ),
    payment_details:
      typeof body.paymentDetails === 'object' && body.paymentDetails !== null ? body.paymentDetails : null,
    notes: sanitizeText(body.note || body.notes || '', 240),
    table_number: sanitizeText(body.tableNumber || body.table_number || '', 20) || null,
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

    if (order.total <= 0) {
      return res.status(400).json({ error: 'Total do pedido invalido' });
    }

    if (normalizeForCompare(order.payment_method) === 'pix') {
      order.payment_status = 'paid';
    }

    let historyRecord = buildOrderHistoryRecord(order, 'recebido');
    try {
      historyRecord = await upsertOrderHistoryRecord(historyRecord);
      broadcastOrderUpdate(historyRecord);
    } catch (historyError) {
      console.warn('Nao foi possivel registrar pedido no historico:', historyError?.message || historyError);
    }

    try {
      await printOrder(order);
      historyRecord = {
        ...historyRecord,
        status: 'impresso',
        print_error: '',
        updated_at: new Date().toISOString(),
        printed_at: new Date().toISOString()
      };

      try {
        historyRecord = await upsertOrderHistoryRecord(historyRecord);
        broadcastOrderUpdate(historyRecord);
      } catch (historyError) {
        console.warn('Nao foi possivel atualizar status de impressao no historico:', historyError?.message || historyError);
      }
    } catch (printError) {
      const printReason = printError instanceof Error ? printError.message : 'Erro desconhecido';
      historyRecord = {
        ...historyRecord,
        status: 'falha_impressao',
        print_error: printReason,
        updated_at: new Date().toISOString()
      };

      try {
        historyRecord = await upsertOrderHistoryRecord(historyRecord);
        broadcastOrderUpdate(historyRecord);
      } catch (historyError) {
        console.warn('Nao foi possivel atualizar falha de impressao no historico:', historyError?.message || historyError);
      }

      throw Object.assign(new Error(printReason), { orderId: historyRecord.id });
    }

    return res.status(201).json({
      ok: true,
      message: 'Pedido enviado para impressao',
      orderId: String(historyRecord.id),
      printStatus: 'impresso'
    });
  } catch (error) {
    console.error('Falha na impressao direta:', error);
    return res.status(500).json({
      error: 'Falha ao imprimir pedido',
      details: error instanceof Error ? error.message : 'Erro desconhecido',
      orderId: error?.orderId ? String(error.orderId) : undefined
    });
  }
});

app.get('/printers', async (_req, res) => {
  try {
    const diagnostics = await getPrinterDiagnostics();
    return res.json({
      ok: true,
      ...diagnostics
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: 'Falha ao listar impressoras',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

app.post('/pix/create', async (req, res) => {
  try {
    const order = buildDirectOrder(req.body || {});

    if (normalizeForCompare(order.payment_method) !== 'pix') {
      return res.status(400).json({ error: 'Somente pagamento Pix pode usar este endpoint.' });
    }

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
    const reference = sanitizeText(req.body?.reference || '', 80);
    if (!reference) {
      return res.status(400).json({ error: 'Referencia Pix obrigatoria para verificacao.' });
    }

    const mockResponse = {
      status: 'PAID',
      paid: true,
      reference,
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

app.get('/orders', async (req, res) => {
  const rawLimit = Number(req.query?.limit);
  const limit = Number.isFinite(rawLimit) ? Math.max(1, Math.min(200, Math.trunc(rawLimit))) : 80;

  if (orderHistory.length > 0) {
    return res.json({
      ok: true,
      source: 'local_store',
      orders: orderHistory.slice(0, limit).map(toPublicOrder)
    });
  }

  if (pool && databaseReady) {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT $1', [limit]);
    return res.json({
      ok: true,
      source: 'database',
      orders: result.rows.map((row, index) => toPublicOrder(normalizeOrderHistoryRecord(row, index)))
    });
  }

  return res.json({
    ok: true,
    source: 'empty',
    orders: []
  });
});

app.get('/orders/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  if (typeof res.flushHeaders === 'function') {
    res.flushHeaders();
  }

  orderStreamClients.add(res);
  sendOrderEventToClient(res, 'ready', {
    ok: true,
    message: 'Canal de pedidos conectado',
    sent_at: new Date().toISOString()
  });

  const heartbeat = setInterval(() => {
    try {
      res.write(': ping\n\n');
    } catch {
      clearInterval(heartbeat);
      orderStreamClients.delete(res);
    }
  }, 25000);

  req.on('close', () => {
    clearInterval(heartbeat);
    orderStreamClients.delete(res);
  });
});

app.get('/orders/:id', async (req, res) => {
  const orderId = sanitizeText(req.params?.id, 60);
  const fromHistory = findOrderInHistory(orderId);
  if (fromHistory) {
    return res.json(toPublicOrder(fromHistory));
  }

  if (pool && databaseReady) {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
    if (result.rows.length > 0) {
      return res.json(toPublicOrder(normalizeOrderHistoryRecord(result.rows[0], 0)));
    }
  }

  return res.status(404).json({ error: 'Pedido nao encontrado' });
});

app.get('/health', async (_req, res) => {
  let printer = {
    resolvedTarget: null,
    candidatesCount: 0
  };

  try {
    const diagnostics = await getPrinterDiagnostics();
    printer = {
      resolvedTarget: diagnostics.resolvedTarget,
      candidatesCount: Array.isArray(diagnostics.candidates) ? diagnostics.candidates.length : 0
    };
  } catch {
  }

  return res.json({
    status: 'ok',
    queueEnabled,
    databaseEnabled: databaseEnabled && databaseReady,
    pixGatewayConfigured: false,
    pixMode: 'mock',
    printer,
    orders: {
      totalCached: orderHistory.length,
      latestOrderId: orderHistory[0]?.id || null,
      latestStatus: orderHistory[0]?.status || null
    }
  });
});

app.use(express.static(siteRoot));

app.get('/', (_req, res) => {
  res.sendFile(path.join(siteRoot, 'index.html'));
});

app.get('*', (req, res, next) => {
  if (
    req.path.startsWith('/print') ||
    req.path.startsWith('/orders') ||
    req.path.startsWith('/health') ||
    req.path.startsWith('/printers') ||
    req.path.startsWith('/pix')
  ) {
    return next();
  }

  return res.sendFile(path.join(siteRoot, 'index.html'));
});

app.listen(port, async () => {
  try {
    await loadOrderHistory();
    await ensureSchema();
    console.log(`Servidor rodando em http://localhost:${port}`);
  } catch (error) {
    databaseEnabled = false;
    databaseReady = false;
    console.error('Servidor iniciou em modo sem banco (schema indisponivel):', error);
  }
});
