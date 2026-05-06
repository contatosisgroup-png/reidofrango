import net from 'net';
import fetch from 'node-fetch';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);
const ESC = 0x1b;

let detectedTargetCache = null;

function wrapInHex(content) {
  return Buffer.concat([Buffer.from([ESC, 0x40]), content, Buffer.from([0x0a, 0x0a, 0x1d, 0x56, 0x41, 0x10])]);
}

function isIpv4(value) {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(String(value || '').trim());
}

async function detectWindowsPrinterTarget() {
  const script = `
    $port = Get-PrinterPort | Where-Object {
      $_.PrinterHostAddress -and $_.PrinterHostAddress -match '^(\\d{1,3}\\.){3}\\d{1,3}$'
    } | Select-Object -First 1 PrinterHostAddress, PortNumber
    if ($port) {
      $port | ConvertTo-Json -Compress
      exit 0
    }

    $fallback = Get-Printer | Where-Object {
      $_.PortName -and $_.PortName -match '^(\\d{1,3}\\.){3}\\d{1,3}$'
    } | Select-Object -First 1 -ExpandProperty PortName
    if ($fallback) {
      @{ PrinterHostAddress = $fallback; PortNumber = 9100 } | ConvertTo-Json -Compress
    }
  `;

  try {
    const { stdout } = await execFileAsync('powershell', ['-NoProfile', '-Command', script]);
    const out = stdout.trim();
    if (!out) return null;

    const parsed = JSON.parse(out);
    const host = String(parsed?.PrinterHostAddress || '').trim();
    const port = Number(parsed?.PortNumber || 9100);
    if (!isIpv4(host)) return null;

    return {
      ip: host,
      port: Number.isFinite(port) ? port : 9100
    };
  } catch {
    return null;
  }
}

async function resolvePrinterTarget() {
  const envIp = String(process.env.PRINTER_IP || '').trim();
  if (envIp) {
    return {
      ip: envIp,
      port: Number(process.env.PRINTER_PORT || 9100)
    };
  }

  if (detectedTargetCache) {
    return detectedTargetCache;
  }

  if (process.platform === 'win32') {
    const detected = await detectWindowsPrinterTarget();
    if (detected) {
      detectedTargetCache = detected;
      return detected;
    }
  }

  return null;
}

export async function sendToPrinter(contentBuffer) {
  const target = await resolvePrinterTarget();
  if (!target?.ip) {
    throw new Error('Impressora nao encontrada. Defina PRINTER_IP ou instale uma impressora de rede no Windows.');
  }

  const printerPort = Number(target.port || 9100);

  return new Promise((resolve, reject) => {
    const client = new net.Socket();
    client.setTimeout(5000);

    client.connect(printerPort, target.ip, () => {
      client.write(wrapInHex(contentBuffer));
      client.end();
    });

    client.on('timeout', () => {
      client.destroy();
      reject(new Error(`Timeout ao conectar na impressora ${target.ip}:${printerPort}`));
    });
    client.on('error', reject);
    client.on('close', resolve);
  });
}

export async function sendToPrintNode(contentBuffer, order) {
  const apiKey = process.env.PRINTNODE_API_KEY;
  const printerId = process.env.PRINTNODE_PRINTER_ID;
  if (!apiKey || !printerId) throw new Error('PRINTNODE_API_KEY ou PRINTNODE_PRINTER_ID nao configurado');

  const body = {
    printerId: Number(printerId),
    title: `Pedido ${order.id}`,
    contentType: 'raw_base64',
    content: contentBuffer.toString('base64'),
    source: 'restaurant-print-service'
  };

  const response = await fetch('https://api.printnode.com/printjobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const payload = await response.text();
    throw new Error(`PrintNode falhou: ${response.status} ${payload}`);
  }

  return response.json();
}
