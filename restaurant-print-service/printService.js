import net from 'net';
import fs from 'fs';
import os from 'os';
import path from 'path';
import fetch from 'node-fetch';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);
const ESC = 0x1b;
const POWERSHELL_TIMEOUT_MS = Number(process.env.PRINTER_PS_TIMEOUT_MS || 15000);
const VIRTUAL_PRINTER_REGEX = /onenote|pdf|xps|fax|microsoft print|adobe pdf|writer|document writer/i;
const ESCPOS_HINT_REGEX = /goldensky|58mm|80mm|epson|elgin|bematech|daruma|xprinter|termica|thermal|esc\/pos|receipt|sat|tm[-\s]?\d+/i;
const AUTO_PRINTER_TOKENS = new Set(['', 'auto', 'any', '*']);

let detectedTargetCache = null;

function normalizeText(value) {
  return String(value ?? '').trim();
}

function normalizeBoolean(value) {
  return value === true || String(value).toLowerCase() === 'true';
}

function parseJsonAsArray(rawJson) {
  const parsed = JSON.parse(rawJson);
  return Array.isArray(parsed) ? parsed : [parsed];
}

function isAutoPrinterSelection(value) {
  return AUTO_PRINTER_TOKENS.has(normalizeText(value).toLowerCase());
}

function isEnvDisabled(value) {
  const normalized = normalizeText(value).toLowerCase();
  return normalized === '0' || normalized === 'false' || normalized === 'no' || normalized === 'off';
}

function parsePortCategory(portName) {
  const normalized = normalizeText(portName).toUpperCase();
  if (!normalized) return 'unknown';
  if (/USB|DOT4|LPT|COM/.test(normalized)) return 'local';
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(normalized) || /^WSD|IP_|TCP/.test(normalized)) return 'network';
  return 'other';
}

function wrapInHex(content) {
  return Buffer.concat([Buffer.from([ESC, 0x40]), content, Buffer.from([0x0a, 0x0a, 0x1d, 0x56, 0x41, 0x10])]);
}

function isIpv4(value) {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(String(value || '').trim());
}

function getPowerShellExecOptions() {
  return {
    timeout: POWERSHELL_TIMEOUT_MS,
    windowsHide: true,
    maxBuffer: 1024 * 1024 * 5
  };
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
    const { stdout } = await execFileAsync('powershell', ['-NoProfile', '-Command', script], getPowerShellExecOptions());
    const out = stdout.trim();
    if (!out) return null;

    const parsed = JSON.parse(out);
    const host = String(parsed?.PrinterHostAddress || '').trim();
    const port = Number(parsed?.PortNumber || 9100);
    if (!isIpv4(host)) return null;

    return {
      type: 'tcp',
      ip: host,
      port: Number.isFinite(port) ? port : 9100
    };
  } catch {
    return null;
  }
}

function isPhysicalPrinterCandidate(printer) {
  const name = normalizeText(printer?.Name || printer?.printerName);
  const portName = normalizeText(printer?.PortName || printer?.portName).toUpperCase();
  if (!name) return false;
  if (VIRTUAL_PRINTER_REGEX.test(name)) return false;
  if (!portName) return false;

  const portCategory = parsePortCategory(portName);
  const looksLikeLocalPort = portCategory === 'local';
  const looksLikeNetworkPort = portCategory === 'network';
  return looksLikeLocalPort || looksLikeNetworkPort;
}

function scoreWindowsPrinterCandidate(printer) {
  const name = normalizeText(printer?.Name || printer?.printerName);
  const portName = normalizeText(printer?.PortName || printer?.portName).toUpperCase();
  const isDefault = normalizeBoolean(printer?.Default || printer?.isDefault);
  const isOffline = normalizeBoolean(printer?.WorkOffline || printer?.isOffline);
  const portCategory = parsePortCategory(portName);

  let score = 0;
  if (isDefault) score += 100;
  if (!isOffline) score += 40;
  if (portCategory === 'local') score += 30;
  if (portCategory === 'network') score += 20;

  if (ESCPOS_HINT_REGEX.test(name)) {
    score += 15;
  }

  return score;
}

function toWindowsTarget(printer, source = 'auto') {
  return {
    type: 'windows',
    printerName: normalizeText(printer?.Name || printer?.printerName),
    portName: normalizeText(printer?.PortName || printer?.portName),
    source
  };
}

async function listWindowsPrinterCandidates() {
  const script = `
    $all = Get-Printer | Select-Object Name, PortName, DriverName, Default, WorkOffline, PrinterStatus
    if ($all) {
      ConvertTo-Json $all -Depth 4 -Compress
    }
  `;

  try {
    const { stdout } = await execFileAsync('powershell', ['-NoProfile', '-Command', script], getPowerShellExecOptions());
    const out = stdout.trim();
    if (!out) return [];

    const all = parseJsonAsArray(out)
      .filter((printer) => isPhysicalPrinterCandidate(printer))
      .sort((a, b) => scoreWindowsPrinterCandidate(b) - scoreWindowsPrinterCandidate(a));

    const unique = [];
    const seen = new Set();
    for (const printer of all) {
      const key = normalizeText(printer?.Name).toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      unique.push(printer);
    }

    return unique;
  } catch {
    return [];
  }
}

function getWindowsPrintMode(printerName) {
  const configuredMode = String(process.env.PRINTER_MODE || '').trim().toLowerCase();
  if (configuredMode === 'raw' || configuredMode === 'escpos') return 'raw';
  if (configuredMode === 'text' || configuredMode === 'driver') return 'text';

  return ESCPOS_HINT_REGEX.test(String(printerName || '')) ? 'raw' : 'text';
}

async function resolvePrinterTarget() {
  const envIp = normalizeText(process.env.PRINTER_IP || '');
  if (envIp) {
    return {
      type: 'tcp',
      ip: envIp,
      port: Number(process.env.PRINTER_PORT || 9100)
    };
  }

  const envPrinterName = normalizeText(process.env.PRINTER_NAME || '');
  const autoDetectEnabled = !isEnvDisabled(process.env.PRINTER_AUTO_DETECT);

  if (detectedTargetCache && (isAutoPrinterSelection(envPrinterName) || !envPrinterName)) {
    return detectedTargetCache;
  }

  if (process.platform === 'win32') {
    const candidates = await listWindowsPrinterCandidates();

    if (!isAutoPrinterSelection(envPrinterName)) {
      const configuredCandidate = candidates.find(
        (printer) => normalizeText(printer?.Name).toLowerCase() === envPrinterName.toLowerCase()
      );
      if (configuredCandidate) {
        return toWindowsTarget(configuredCandidate, 'configured');
      }

      if (!autoDetectEnabled) {
        return {
          type: 'windows',
          printerName: envPrinterName,
          source: 'configured-manual'
        };
      }
    }

    if (candidates.length > 0) {
      const detected = toWindowsTarget(candidates[0], 'auto');
      detectedTargetCache = detected;
      return detected;
    }

    const detected = await detectWindowsPrinterTarget();
    if (detected) {
      detectedTargetCache = detected;
      return detected;
    }

    if (!isAutoPrinterSelection(envPrinterName)) {
      return {
        type: 'windows',
        printerName: envPrinterName,
        source: 'configured-fallback'
      };
    }
  }

  return null;
}

async function buildWindowsTargetsForAttempt(primaryTarget) {
  const attempts = [];
  const seen = new Set();

  const pushTarget = (target) => {
    const printerName = normalizeText(target?.printerName || target?.Name);
    if (!printerName) return;
    const key = printerName.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    attempts.push({
      type: 'windows',
      printerName,
      portName: normalizeText(target?.portName || target?.PortName),
      source: normalizeText(target?.source || 'auto')
    });
  };

  pushTarget(primaryTarget);
  const candidates = await listWindowsPrinterCandidates();
  for (const candidate of candidates) {
    pushTarget(toWindowsTarget(candidate, 'auto-fallback'));
  }

  return attempts;
}

async function sendRawToWindowsPrinter(printerName, contentBuffer) {
  const byteFile = path.join(os.tmpdir(), `escpos-${Date.now()}-${Math.random().toString(16).slice(2)}.bin`);
  const scriptFile = path.join(os.tmpdir(), `escpos-${Date.now()}-${Math.random().toString(16).slice(2)}.ps1`);

  const script = `param($printerName, $filePath)
$bytes = [System.IO.File]::ReadAllBytes($filePath)
Add-Type -TypeDefinition @"
using System;
using System.IO;
using System.Runtime.InteropServices;

public class RawPrinterHelper {
    [StructLayout(LayoutKind.Sequential, CharSet=CharSet.Ansi)]
    public struct DOCINFOA {
        [MarshalAs(UnmanagedType.LPStr)] public string pDocName;
        [MarshalAs(UnmanagedType.LPStr)] public string pOutputFile;
        [MarshalAs(UnmanagedType.LPStr)] public string pDataType;
    }

    [DllImport(\"winspool.Drv\", EntryPoint=\"OpenPrinterA\", SetLastError=true, CharSet=CharSet.Ansi)]
    public static extern bool OpenPrinter(string pPrinterName, out IntPtr phPrinter, IntPtr pDefault);

    [DllImport(\"winspool.Drv\", EntryPoint=\"ClosePrinter\", SetLastError=true)]
    public static extern bool ClosePrinter(IntPtr hPrinter);

    [DllImport(\"winspool.Drv\", EntryPoint=\"StartDocPrinterA\", SetLastError=true)]
    public static extern bool StartDocPrinter(IntPtr hPrinter, int level, ref DOCINFOA di);

    [DllImport(\"winspool.Drv\", EntryPoint=\"EndDocPrinter\", SetLastError=true)]
    public static extern bool EndDocPrinter(IntPtr hPrinter);

    [DllImport(\"winspool.Drv\", EntryPoint=\"StartPagePrinter\", SetLastError=true)]
    public static extern bool StartPagePrinter(IntPtr hPrinter);

    [DllImport(\"winspool.Drv\", EntryPoint=\"EndPagePrinter\", SetLastError=true)]
    public static extern bool EndPagePrinter(IntPtr hPrinter);

    [DllImport(\"winspool.Drv\", EntryPoint=\"WritePrinter\", SetLastError=true)]
    public static extern bool WritePrinter(IntPtr hPrinter, IntPtr pBytes, int dwCount, out int dwWritten);

    public static bool SendBytesToPrinter(string szPrinterName, byte[] pBytes) {
        IntPtr hPrinter;
        if (!OpenPrinter(szPrinterName, out hPrinter, IntPtr.Zero)) return false;
        DOCINFOA di = new DOCINFOA { pDocName = \"Raw ESC/POS\", pDataType = \"RAW\" };
        if (!StartDocPrinter(hPrinter, 1, ref di)) { ClosePrinter(hPrinter); return false; }
        if (!StartPagePrinter(hPrinter)) { EndDocPrinter(hPrinter); ClosePrinter(hPrinter); return false; }
        IntPtr pUnmanagedBytes = Marshal.AllocHGlobal(pBytes.Length);
        Marshal.Copy(pBytes, 0, pUnmanagedBytes, pBytes.Length);
        bool success = WritePrinter(hPrinter, pUnmanagedBytes, pBytes.Length, out int dwWritten);
        Marshal.FreeHGlobal(pUnmanagedBytes);
        EndPagePrinter(hPrinter);
        EndDocPrinter(hPrinter);
        ClosePrinter(hPrinter);
        return success;
    }
}
"@

if (-not [RawPrinterHelper]::SendBytesToPrinter($printerName, $bytes)) {
    throw "Falha ao enviar dados raw para a impressora: $printerName"
}
`;

  await fs.promises.writeFile(byteFile, contentBuffer);
  await fs.promises.writeFile(scriptFile, script, { encoding: 'utf8' });

  try {
    await execFileAsync('powershell', [
      '-NoProfile',
      '-ExecutionPolicy',
      'Bypass',
      '-File',
      scriptFile,
      '-printerName',
      printerName,
      '-filePath',
      byteFile
    ], getPowerShellExecOptions());
  } finally {
    try { await fs.promises.unlink(byteFile); } catch {}
    try { await fs.promises.unlink(scriptFile); } catch {}
  }
}

function escposToPlainText(contentBuffer) {
  const raw = contentBuffer.toString('utf8');
  const withoutControlChars = raw.replace(/[\x00-\x08\x0B-\x1F\x7F]/g, '');
  return withoutControlChars.trim() + os.EOL;
}

async function sendTextToWindowsPrinter(printerName, contentBuffer) {
  const textFile = path.join(os.tmpdir(), `ticket-${Date.now()}-${Math.random().toString(16).slice(2)}.txt`);
  const scriptFile = path.join(os.tmpdir(), `ticket-${Date.now()}-${Math.random().toString(16).slice(2)}.ps1`);
  const printableText = escposToPlainText(contentBuffer);

  const script = `param($printerName, $filePath)
$text = Get-Content -LiteralPath $filePath -Raw
if ([string]::IsNullOrWhiteSpace($text)) {
  throw "Ticket vazio para impressao em modo texto."
}
$text | Out-Printer -Name $printerName
`;

  await fs.promises.writeFile(textFile, printableText, { encoding: 'utf8' });
  await fs.promises.writeFile(scriptFile, script, { encoding: 'utf8' });

  try {
    await execFileAsync('powershell', [
      '-NoProfile',
      '-ExecutionPolicy',
      'Bypass',
      '-File',
      scriptFile,
      '-printerName',
      printerName,
      '-filePath',
      textFile
    ], getPowerShellExecOptions());
  } finally {
    try { await fs.promises.unlink(textFile); } catch {}
    try { await fs.promises.unlink(scriptFile); } catch {}
  }
}

function openPrinterConnection(target, contentBuffer) {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();
    let settled = false;

    const rejectOnce = (error) => {
      if (settled) return;
      settled = true;
      reject(error);
    };

    const resolveOnce = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    client.setTimeout(5000);

    client.connect(target.port, target.ip, () => {
      client.write(wrapInHex(contentBuffer));
      client.end();
    });

    client.on('timeout', () => {
      client.destroy();
      rejectOnce(new Error(`Timeout ao conectar na impressora ${target.ip}:${target.port}`));
    });
    client.on('error', rejectOnce);
    client.on('close', (hadError) => {
      if (hadError) return;
      resolveOnce();
    });
  });
}

function mapCandidateForDiagnostics(printer) {
  return {
    name: normalizeText(printer?.Name || printer?.printerName),
    portName: normalizeText(printer?.PortName || printer?.portName),
    driverName: normalizeText(printer?.DriverName || printer?.driverName),
    isDefault: normalizeBoolean(printer?.Default || printer?.isDefault),
    isOffline: normalizeBoolean(printer?.WorkOffline || printer?.isOffline),
    score: scoreWindowsPrinterCandidate(printer),
    recommendedMode: getWindowsPrintMode(printer?.Name || printer?.printerName)
  };
}

function mapResolvedTarget(target) {
  if (!target) return null;
  if (target.type === 'tcp') {
    return {
      type: 'tcp',
      ip: normalizeText(target.ip),
      port: Number(target.port || 9100),
      source: normalizeText(target.source || 'env')
    };
  }
  if (target.type === 'windows') {
    return {
      type: 'windows',
      printerName: normalizeText(target.printerName),
      portName: normalizeText(target.portName),
      source: normalizeText(target.source || 'auto'),
      mode: getWindowsPrintMode(target.printerName)
    };
  }
  return {
    type: normalizeText(target.type)
  };
}

export async function getPrinterDiagnostics() {
  const configuredPrinterName = normalizeText(process.env.PRINTER_NAME || '');
  const configuredPrinterIp = normalizeText(process.env.PRINTER_IP || '');
  const configuredPrinterMode = normalizeText(process.env.PRINTER_MODE || 'auto') || 'auto';
  const autoDetectEnabled = !isEnvDisabled(process.env.PRINTER_AUTO_DETECT);

  const windowsCandidates = process.platform === 'win32' ? await listWindowsPrinterCandidates() : [];
  const resolvedTarget = await resolvePrinterTarget();

  return {
    platform: process.platform,
    configured: {
      printerName: configuredPrinterName || null,
      printerIp: configuredPrinterIp || null,
      printerMode: configuredPrinterMode,
      autoDetectEnabled
    },
    resolvedTarget: mapResolvedTarget(resolvedTarget),
    candidates: windowsCandidates.map(mapCandidateForDiagnostics)
  };
}

export async function sendToPrinter(contentBuffer) {
  const target = await resolvePrinterTarget();
  if (!target) {
    throw new Error('Impressora nao encontrada. Defina PRINTER_IP, PRINTER_NAME ou instale uma impressora Windows local.');
  }

  if (target.type === 'tcp') {
    try {
      return await openPrinterConnection({ ip: target.ip, port: Number(target.port || 9100) }, contentBuffer);
    } catch (error) {
      if (process.platform === 'win32') {
        const fallback = await detectWindowsPrinterTarget();
        if (fallback?.ip && (fallback.ip !== target.ip || fallback.port !== target.port)) {
          return await openPrinterConnection(fallback, contentBuffer);
        }
      }
      throw error;
    }
  }

  if (target.type === 'windows') {
    const targets = await buildWindowsTargetsForAttempt(target);
    let lastError = null;
    const attemptedPrinters = [];

    for (const currentTarget of targets) {
      const mode = getWindowsPrintMode(currentTarget.printerName);
      attemptedPrinters.push(`${currentTarget.printerName} (${mode})`);
      console.log(`Tentando impressora Windows: ${currentTarget.printerName} (modo: ${mode}, origem: ${currentTarget.source})`);

      try {
        if (mode === 'text') {
          try {
            return await sendTextToWindowsPrinter(currentTarget.printerName, contentBuffer);
          } catch (textError) {
            console.warn(`Modo texto falhou para ${currentTarget.printerName}. Tentando RAW...`, textError?.message || textError);
            return await sendRawToWindowsPrinter(currentTarget.printerName, contentBuffer);
          }
        }

        try {
          return await sendRawToWindowsPrinter(currentTarget.printerName, contentBuffer);
        } catch (rawError) {
          console.warn(`RAW falhou para ${currentTarget.printerName}. Tentando modo texto...`, rawError?.message || rawError);
          return await sendTextToWindowsPrinter(currentTarget.printerName, contentBuffer);
        }
      } catch (error) {
        lastError = error;
        console.warn(`Falha ao imprimir com ${currentTarget.printerName}. Tentando proxima impressora...`, error?.message || error);
      }
    }

    if (lastError) {
      const attemptedLabel = attemptedPrinters.length > 0 ? attemptedPrinters.join(', ') : 'nenhuma impressora detectada';
      throw new Error(`Falha de impressao em: ${attemptedLabel}. Motivo final: ${lastError.message || lastError}`);
    }

    throw new Error('Nenhuma impressora Windows disponivel aceitou o pedido.');
  }

  throw new Error('Tipo de impressora desconhecido.');
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
