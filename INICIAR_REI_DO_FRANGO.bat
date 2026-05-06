@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title Rei do Frango - Inicializador

echo ==========================================
echo    REI DO FRANGO - INICIO EM 1 CLIQUE
echo ==========================================
echo.

echo [1/3] Verificando se o servico ja esta online...
powershell -NoProfile -Command "try { $r=Invoke-WebRequest -UseBasicParsing 'http://localhost:3000/health' -TimeoutSec 2; if($r.StatusCode -eq 200){ exit 0 } else { exit 1 } } catch { exit 1 }"
if errorlevel 1 (
  echo Servico offline. Iniciando servico local...
  start "Rei do Frango - Print Service" /MIN powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0print-service.ps1" -Port 3000 -RootPath "%~dp0"
) else (
  echo Servico ja estava online.
)

echo [2/3] Aguardando resposta do servico...
powershell -NoProfile -Command "$ok=$false; 1..30 | ForEach-Object { try { $r=Invoke-WebRequest -UseBasicParsing 'http://localhost:3000/health' -TimeoutSec 2; if($r.StatusCode -eq 200){ $ok=$true; break } } catch {} ; Start-Sleep -Milliseconds 500 }; if($ok){ exit 0 } else { exit 1 }"
if errorlevel 1 (
  echo.
  echo Nao consegui subir o servico em http://localhost:3000
  echo Vou abrir o site em modo de impressao local do navegador.
  start "" "%~dp0index.html"
  echo.
  echo Se aparecer "Failed to fetch", o sistema vai abrir a janela de impressao local automaticamente.
  timeout /t 3 >nul
  exit /b 0
)

echo [3/3] Abrindo o site...
start "" "http://localhost:3000"

echo.
echo Pronto. Finalize um pedido para testar a impressao.
timeout /t 2 >nul
exit /b 0
