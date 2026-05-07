param(
  [int]$Port = 3000,
  [string]$RootPath = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($RootPath)) {
  $RootPath = $PSScriptRoot
}

$resolvedRoot = [System.IO.Path]::GetFullPath($RootPath)
$serviceDir = Join-Path $resolvedRoot 'restaurant-print-service'

if (-not (Test-Path -LiteralPath $serviceDir -PathType Container)) {
  throw "Pasta restaurant-print-service nao encontrada em: $serviceDir"
}

$packageFile = Join-Path $serviceDir 'package.json'
if (-not (Test-Path -LiteralPath $packageFile -PathType Leaf)) {
  throw "package.json nao encontrado em: $packageFile"
}

Write-Host "[INFO] print-service.ps1 agora usa o servico Node.js oficial."
Write-Host "[INFO] Diretorio do servico: $serviceDir"

Push-Location $serviceDir
try {
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw 'Node.js nao encontrado no PATH.'
  }

  if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    throw 'NPM nao encontrado no PATH.'
  }

  if (-not (Test-Path -LiteralPath (Join-Path $serviceDir 'node_modules') -PathType Container)) {
    Write-Host '[INFO] Instalando dependencias...'
    & npm install
    if ($LASTEXITCODE -ne 0) {
      throw "Falha ao instalar dependencias (npm install). Codigo: $LASTEXITCODE"
    }
  }

  $envFile = Join-Path $serviceDir '.env'
  $envExample = Join-Path $serviceDir '.env.example'
  if (-not (Test-Path -LiteralPath $envFile -PathType Leaf)) {
    if (Test-Path -LiteralPath $envExample -PathType Leaf) {
      Copy-Item -LiteralPath $envExample -Destination $envFile -Force
      Write-Host '[INFO] .env criado a partir de .env.example'
    } else {
      @(
        'PORT=3000',
        'PRINTER_NAME=auto',
        'PRINTER_AUTO_DETECT=1',
        'PRINTER_MODE=auto',
        'ENABLE_QUEUE=0',
        'ALLOWED_ORIGIN=*'
      ) | Set-Content -LiteralPath $envFile -Encoding UTF8
      Write-Host '[INFO] .env minimo criado.'
    }
  }

  $env:PORT = [string]$Port
  Write-Host "[INFO] Iniciando servidor em http://localhost:$Port"

  & npm start
  if ($LASTEXITCODE -ne 0) {
    throw "Falha ao iniciar o servidor (npm start). Codigo: $LASTEXITCODE"
  }
}
finally {
  Pop-Location
}
