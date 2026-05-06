@echo off
echo Iniciando servico de impressao do Rei do Frango...
set PATH=%PATH%;"C:\Program Files\nodejs"
cd /d "%~dp0restaurant-print-service"
if not exist node_modules (
    echo Instalando dependencias...
    npm install
)
if not exist .env (
    echo Criando arquivo de configuracao .env...
    copy .env.example .env
    echo.
    echo ATENCAO: Configure o arquivo .env com suas configuracoes de impressora e banco de dados.
    echo Pressione qualquer tecla para continuar...
    pause >nul
)
echo Iniciando servidor...
npm run dev
pause