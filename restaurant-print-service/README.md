# Restaurant Print Service

Servico local de impressao para pedidos do Rei do Frango.

- API HTTP local (`http://localhost:3000`)
- Deteccao automatica de impressoras fisicas no Windows (`PRINTER_NAME=auto`)
- Suporte a impressao por rede (IP:porta 9100) ou impressora USB/driver Windows

## Inicializacao rapida

Na pasta raiz do projeto:

1. Execute `INICIAR_REI_DO_FRANGO.bat` (fluxo completo com abertura do site).
2. Ou execute `INICIAR_IMPRESSAO.bat` (somente servico de impressao).

Os scripts:

- instalam dependencias automaticamente;
- criam `.env` se nao existir;
- iniciam o servidor Node.js em `http://localhost:3000`.

## Configuracao (`restaurant-print-service/.env`)

Principais variaveis:

```env
PORT=3000
PRINTER_NAME=auto
PRINTER_AUTO_DETECT=1
PRINTER_MODE=auto
PRINTER_IP=
PRINTER_PORT=9100
```

Regras:

- Para USB/Windows: mantenha `PRINTER_NAME=auto`.
- Para impressora de rede: defina `PRINTER_IP` e opcionalmente `PRINTER_PORT`.
- Para forcar modo: `PRINTER_MODE=raw` (termica ESC/POS) ou `PRINTER_MODE=text` (driver comum).

## Endpoints

- `GET /health`
  - status geral do servico + resumo de impressoras detectadas.
- `GET /printers`
  - diagnostico completo das impressoras candidatas e alvo resolvido.
- `POST /print`
  - recebe o pedido e dispara impressao.
- `GET /orders?limit=80`
  - lista os pedidos recebidos (com status de impressao).
- `GET /orders/stream`
  - stream em tempo real (Server-Sent Events) para acompanhar novos pedidos.
- `POST /pix/create`
  - mock de criacao Pix.
- `POST /pix/verify`
  - mock de verificacao Pix.

## Exemplo `POST /print`

```json
{
  "customerName": "Joao",
  "customerPhone": "(11) 99999-0000",
  "customerAddress": "Rua A, 123",
  "paymentMethod": "Pix",
  "paymentStatus": "paid",
  "amountPaid": 54.9,
  "changeDue": 0,
  "paymentReference": "TX123456",
  "note": "Sem cebola",
  "items": [
    { "name": "Frango Assado Tradicional", "quantity": 1, "price": 54.9 }
  ],
  "total": 54.9
}
```

## Troubleshooting rapido

1. Abra `http://localhost:3000/health` e confirme `status: ok`.
2. Abra `http://localhost:3000/printers` e confirme `resolvedTarget` preenchido.
3. Se a impressora nao aparecer, verifique se ela esta instalada no Windows e ligada.
4. Se aparecer "Enviando..." e nao imprimir, rode novamente com `INICIAR_REI_DO_FRANGO.bat` e valide o diagnostico exibido no terminal.
