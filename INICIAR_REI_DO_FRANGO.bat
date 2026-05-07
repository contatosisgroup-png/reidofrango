@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title Rei do Frango - Inicializador

echo ==========================================
echo    REI DO FRANGO - INICIO EM 1 CLIQUE
echo ==========================================
echo.

echo [1/4] Verificando se o servico ja esta online...
powershell -NoProfile -Command "try { $r=Invoke-WebRequest -UseBasicParsing 'http://localhost:3000/health' -TimeoutSec 2; if($r.StatusCode -eq 200){ exit 0 } else { exit 1 } } catch { exit 1 }"
if errorlevel 1 (
  echo Servico offline. Iniciando servico Node.js...
  start "Rei do Frango - Print Service" /MIN cmd /c "\"%~dp0INICIAR_IMPRESSAO.bat\""
) else (
  echo Servico ja estava online.
)

echo [2/4] Aguardando resposta do servico...
powershell -NoProfile -Command "$ok=$false; 1..40 | ForEach-Object { try { $r=Invoke-WebRequest -UseBasicParsing 'http://localhost:3000/health' -TimeoutSec 2; if($r.StatusCode -eq 200){ $ok=$true; break } } catch {} ; Start-Sleep -Milliseconds 500 }; if($ok){ exit 0 } else { exit 1 }"
if errorlevel 1 (
  echo.
  echo Nao foi possivel iniciar o servico em http://localhost:3000
  echo.
  echo Tente abrir o arquivo INICIAR_IMPRESSAO.bat para ver o erro detalhado.
  echo O site sera aberto em modo local para testes visuais.
  start "" "%~dp0index.html"
  timeout /t 3 >nul
  exit /b 1
)

echo [3/4] Consultando diagnostico de impressoras...
powershell -NoProfile -Command "try { $r=Invoke-RestMethod 'http://localhost:3000/printers' -TimeoutSec 5; if($r.resolvedTarget){ 'Impressora selecionada: ' + ($r.resolvedTarget | ConvertTo-Json -Compress) } else { 'Impressora ainda nao selecionada automaticamente.' } } catch { 'Nao foi possivel consultar /printers agora.' }"

echo [4/4] Abrindo o site...
start "" "http://localhost:3000"

echo.
echo Pronto. Finalize um pedido para testar a impressao.
timeout /t 2 >nul
exit /b 0
