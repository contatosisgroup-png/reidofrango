@echo off
setlocal EnableExtensions

cd /d "%~dp0restaurant-print-service"

echo ==========================================
echo   REI DO FRANGO - SERVICO DE IMPRESSAO
echo ==========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js nao encontrado no PATH.
  echo Instale o Node.js e tente novamente.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo NPM nao encontrado no PATH.
  echo Reinstale o Node.js e tente novamente.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Instalando dependencias...
  call npm install
  if errorlevel 1 (
    echo Falha ao instalar dependencias.
    pause
    exit /b 1
  )
)

if not exist .env (
  if exist .env.example (
    echo Criando arquivo .env a partir do .env.example...
    copy .env.example .env >nul
  ) else (
    echo Criando .env minimo...
    > .env (
      echo PORT=3000
      echo PRINTER_NAME=auto
      echo PRINTER_AUTO_DETECT=1
      echo PRINTER_MODE=auto
      echo ENABLE_QUEUE=0
      echo ALLOWED_ORIGIN=*
    )
  )
)

echo Iniciando servidor em http://localhost:3000 ...
call npm start
exit /b %errorlevel%
