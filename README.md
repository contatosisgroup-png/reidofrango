# Restaurant Print Service

Servico de impressao local para pedidos (PowerShell + HTTP local) com envio para impressora termica ESC/POS.

## Modos de uso

1. Modo simples (`POST /print`) - sem banco e sem fila.
2. Modo fila (`POST /orders`) - opcional via Node.js.

## Setup rapido (modo simples - recomendado)

1. Na raiz do projeto, execute:
   - `INICIAR_IMPRESSAO.bat`
2. O script instala dependências, cria `.env` e inicia o servidor em `http://localhost:3000`.
3. Configure o `.env` com IP da impressora (ex: `PRINTER_IP=192.168.0.100`).

### Opção sem abrir arquivos (1 clique)

Se estiver na pasta principal do projeto, inicie por:

- `INICIAR_IMPRESSAO.bat`

Esse atalho:
- instala dependências automaticamente;
- cria arquivo `.env` se não existir;
- inicia o serviço de impressão.

## Endpoints

- `GET /health`
  - Status do servico.
- `POST /print`
  - Impressao direta.
- `POST /orders`
  - Modo fila (Node.js), opcional.
- `GET /orders/:id`
  - Consulta de pedido salvo em banco (modo fila Node.js), opcional.

## Exemplo `POST /print`

```json
{
  "customerName": "Joao",
  "customerPhone": "(11) 99999-0000",
  "customerAddress": "Rua A, 123",
  "paymentMethod": "Pix",
  "paymentStatus": "paid",
  "amountPaid": 54.90,
  "changeDue": 0.00,
  "paymentReference": "TX123456",
  "note": "Sem cebola",
  "items": [
    { "name": "Frango Assado Tradicional", "quantity": 1, "price": 54.9 }
  ],
  "total": 54.9
}
```

### Métodos de pagamento suportados

- Dinheiro
- Cartão Crédito
- Cartão Débito
- Pix
- Vale Refeição
- Vale Alimentação
- Transferência
- Voucher
- Outros

> No caso de pagamentos em cartão ou digital, use `paymentMethod`, `paymentStatus`, `amountPaid` e `paymentReference`.

## Integração com gateway Pix (Asaas)

Este serviço suporta integração com Asaas para pagamentos Pix reais.

### Configuração no Asaas

1. Crie uma conta em [Asaas](https://www.asaas.com/).
2. Obtenha sua chave de API no painel Asaas (Configurações > Integração).
3. Configure a chave Pix do recebedor: `+5521965648765`.

### Configurações no .env

```env
PIX_GATEWAY_API_URL=https://www.asaas.com/api/v3
PIX_GATEWAY_API_KEY=sua_chave_api_asaas_aqui
PIX_GATEWAY_PROVIDER=asaas
PIX_GATEWAY_MERCHANT_KEY=+5521965648765
```

### Como funciona

- Ao escolher Pix no checkout, o sistema cria uma cobrança no Asaas.
- O QR Code é gerado pelo Asaas e exibido no site.
- Antes de imprimir, o sistema verifica se o pagamento foi recebido no Asaas.
- Se pago, imprime automaticamente; senão, bloqueia.

### Endpoints adicionados

- `POST /pix/create` - cria cobrança Pix no Asaas.
- `POST /pix/verify` - verifica status no Asaas.

### Exemplo de uso do gateway Pix

`POST /pix/create`
```json
{
  "customerName": "Joao",
  "paymentMethod": "Pix",
  "total": 54.9,
  "paymentReference": "TX123456",
  "customerPhone": "(11) 99999-0000",
  "customerAddress": "Rua A, 123",
  "note": "Sem cebola",
  "items": [
    { "name": "Frango Assado Tradicional", "quantity": 1, "price": 54.9 }
  ]
}
```

`POST /pix/verify`
```json
{
  "reference": "TX123456"
}
```

## Integracao com o site

No painel admin do site (atalho `]`), deixe:

- `URL do servico de impressao` em branco (usa o mesmo servidor automaticamente).

Ao clicar em "Finalizar compra", o site chama `POST /print` e o ticket e enviado para a impressora.
