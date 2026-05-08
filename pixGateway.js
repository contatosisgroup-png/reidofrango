import fetch from 'node-fetch';

const API_BASE_URL = String(process.env.PIX_GATEWAY_API_URL || 'https://api.pagseguro.com').trim();
const API_KEY = String(process.env.PIX_GATEWAY_API_KEY || '').trim();
const API_SECRET = String(process.env.PIX_GATEWAY_API_SECRET || '').trim();
const BEARER_TOKEN = String(process.env.PIX_GATEWAY_BEARER_TOKEN || '').trim();
const PROVIDER = String(process.env.PIX_GATEWAY_PROVIDER || 'pagseguro').trim().toLowerCase();
const CREATE_PATH = String(process.env.PIX_GATEWAY_CREATE_PATH || '/charges').trim();
const VERIFY_PATH = String(process.env.PIX_GATEWAY_VERIFY_PATH || '/charges/:reference').trim();
const MERCHANT_PIX_KEY = String(process.env.PIX_GATEWAY_MERCHANT_KEY || '+5521965648765').trim();

function isConfigured() {
  return Boolean(API_BASE_URL && (API_KEY || BEARER_TOKEN));
}

function getHeaders() {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  if (BEARER_TOKEN) {
    headers['Authorization'] = `Bearer ${BEARER_TOKEN}`;
    headers['access_token'] = BEARER_TOKEN;
  } else if (API_KEY) {
    headers['access_token'] = API_KEY;
  }

  return headers;
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const message = body?.errors?.[0]?.description || body?.error || body?.message || `Erro HTTP ${response.status}`;
    throw new Error(message);
  }
  return body;
}

function buildPagSeguroPayload(order) {
  return {
    reference_id: order.payment_reference || order.id,
    description: order.note || `Pedido ${order.id}`,
    amount: {
      value: Math.round(order.total * 100),
      currency: 'BRL'
    },
    payment_method: {
      type: 'PIX',
      pix: {
        key: MERCHANT_PIX_KEY.replace('+55', '')
      }
    },
    notification_urls: [
      `${process.env.BASE_URL || 'http://localhost:3000'}/pix/webhook`
    ]
  };
}

function buildAsaasPayload(order) {
  return {
    customer: order.customer_name,
    billingType: 'PIX',
    value: order.total,
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // amanhã
    description: order.note || `Pedido ${order.id}`,
    externalReference: order.payment_reference || order.id,
    pixAddressKey: MERCHANT_PIX_KEY.replace('+55', ''),
    pixAddressKeyType: 'CPF_CNPJ'
  };
}

function buildGenericPayload(order) {
  return {
    amount: Math.round(order.total * 100),
    currency: 'BRL',
    reference: order.payment_reference || order.id,
    description: order.note || `Pedido ${order.id}`,
    pix_key: MERCHANT_PIX_KEY,
    customer: {
      name: order.customer_name,
      phone: order.customer_phone,
      address: order.customer_address
    },
    metadata: {
      orderId: order.id,
      paymentMethod: order.payment_method
    }
  };
}

function buildGatewayPayload(order) {
  if (PROVIDER === 'asaas') {
    return buildAsaasPayload(order);
  } else if (PROVIDER === 'pagseguro') {
    return buildPagSeguroPayload(order);
  }
  return buildGenericPayload(order);
}

function resolveUrl(path) {
  if (!path) throw new Error('PIX gateway path nao configurado');
  return path.startsWith('http') ? path : `${API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export async function createPixPayment(order) {
  if (!isConfigured()) {
    throw new Error('Gateway Pix nao configurado (PIX_GATEWAY_API_KEY ou PIX_GATEWAY_BEARER_TOKEN faltando).');
  }

  const url = resolveUrl(CREATE_PATH);
  const payload = buildGatewayPayload(order);
  const body = await fetchJson(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });

  if (PROVIDER === 'asaas') {
    return {
      status: body.status || body.paymentStatus || 'PENDING',
      reference: body.externalReference || body.id || body.reference,
      qrcode:
        body.encodedImage ||
        body.pixQrCode ||
        body.qrCode ||
        body.qr_code ||
        body.data?.pixQrCode ||
        body.data?.qrcode ||
        body.qr_code_image,
      qrcodePayload:
        body.payload ||
        body.pixPayload ||
        body.qrcodePayload ||
        body.qr_code_payload ||
        body.data?.pix_payload ||
        body.data?.qrcode_payload,
      expiresAt: body.dueDate || body.expiresAt || body.expiration || body.due_date,
      raw: body
    };
  } else if (PROVIDER === 'pagseguro') {
    const qrCode = body.qr_codes?.[0];
    return {
      status: body.status || 'ACTIVE',
      reference: body.id || body.reference_id,
      qrcode: qrCode?.links?.find(link => link.rel === 'QRCODE.PNG')?.href,
      qrcodePayload: qrCode?.text,
      expiresAt: body.created_at ? new Date(Date.parse(body.created_at) + 24 * 60 * 60 * 1000).toISOString() : null,
      raw: body
    };
  }

  return {
    status: body.status || body.payment_status || 'created',
    reference: body.reference || body.payment_reference || payload.reference,
    qrcode: body.qrcode || body.qrCode || body.data?.qrcode || body.qr_code,
    qrcodePayload: body.qrcodePayload || body.qr_code_payload || body.data?.qrcode || body.data?.qrcode_payload,
    expiresAt: body.expires_at || body.expiration || body.data?.expires_at,
    raw: body
  };
}

export async function verifyPixPayment(reference) {
  if (!isConfigured()) {
    throw new Error('Gateway Pix nao configurado para verificacao.');
  }
  if (!String(reference || '').trim()) {
    throw new Error('Referencia Pix obrigatoria para verificacao.');
  }

  const rawPath = VERIFY_PATH.replace(':reference', encodeURIComponent(reference));
  const url = resolveUrl(rawPath);
  const method = VERIFY_PATH.includes(':reference') ? 'GET' : 'POST';
  const options = {
    method,
    headers: getHeaders()
  };

  if (method === 'POST') {
    options.body = JSON.stringify({ reference });
  }

  const body = await fetchJson(url, options);

  if (PROVIDER === 'asaas') {
    return {
      status: body.status || 'PENDING',
      paid: body.status === 'RECEIVED',
      reference: body.id || reference,
      raw: body
    };
  } else if (PROVIDER === 'pagseguro') {
    return {
      status: body.status || body.payment_status || 'UNKNOWN',
      paid: body.status === 'PAID',
      reference: body.id || reference,
      raw: body
    };
  }

  return {
    status: body.status || body.payment_status || body.statusDetail || 'pending',
    paid: Boolean(body.paid || body.is_paid || body.status === 'paid' || body.status === 'paid_out'),
    reference: body.reference || body.payment_reference || reference,
    raw: body
  };
}

export function isPixGatewayConfigured() {
  return isConfigured();
}