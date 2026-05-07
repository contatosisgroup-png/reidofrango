const ESC = 0x1b;
const GS = 0x1d;

function boldOn() {
  return Buffer.from([ESC, 0x45, 0x01]);
}

function boldOff() {
  return Buffer.from([ESC, 0x45, 0x00]);
}

function alignCenter() {
  return Buffer.from([ESC, 0x61, 0x01]);
}

function alignLeft() {
  return Buffer.from([ESC, 0x61, 0x00]);
}

function cutPaper() {
  return Buffer.from([GS, 0x56, 0x00]);
}

function normalizePrintableText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7E]/g, '')
    .trim();
}

function toMoney(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return '0,00';
  return amount.toFixed(2).replace('.', ',');
}

function line(text = '') {
  return Buffer.concat([Buffer.from(normalizePrintableText(text), 'ascii'), Buffer.from([0x0a])]);
}

export function buildTicket(order) {
  const createdAt = order.created_at ? new Date(order.created_at) : new Date();
  const dateLabel = Number.isNaN(createdAt.getTime())
    ? new Date().toLocaleString('pt-BR')
    : createdAt.toLocaleString('pt-BR');

  const amountPaid = Number(order.amount_paid);
  const changeDue = Number(order.change_due);
  const total = Number(order.total);

  const lines = [];
  lines.push(alignCenter());
  lines.push(boldOn());
  lines.push(line('REI DO FRANGO'));
  lines.push(boldOff());
  lines.push(line('PEDIDO AUTOMATICO'));
  lines.push(line('-----------------------------'));

  lines.push(alignLeft());
  lines.push(line(`Pedido: ${order.id}`));
  lines.push(line(`Cliente: ${order.customer_name}`));
  if (order.customer_phone) lines.push(line(`Telefone: ${order.customer_phone}`));
  if (order.customer_address) lines.push(line(`Endereco: ${order.customer_address}`));
  if (order.payment_method) lines.push(line(`Pagamento: ${order.payment_method}`));
  if (order.payment_status) lines.push(line(`Status: ${order.payment_status}`));
  if (Number.isFinite(amountPaid) && amountPaid >= 0) {
    lines.push(line(`Pago: R$ ${toMoney(amountPaid)}`));
  }
  if (Number.isFinite(changeDue) && changeDue > 0) {
    lines.push(line(`Troco: R$ ${toMoney(changeDue)}`));
  }
  if (order.payment_reference) lines.push(line(`Ref: ${order.payment_reference}`));
  if (order.notes) lines.push(line(`Obs: ${order.notes}`));
  if (order.table_number) lines.push(line(`Mesa: ${order.table_number}`));
  lines.push(line(`Hora: ${dateLabel}`));
  lines.push(line('-----------------------------'));

  for (const item of order.items || []) {
    const quantity = Number(item.quantity) > 0 ? Number(item.quantity) : 1;
    lines.push(line(`${quantity}x ${item.name || 'Item'}`));

    if (Array.isArray(item.modifiers) && item.modifiers.length > 0) {
      for (const modifier of item.modifiers) {
        lines.push(line(`  - ${modifier}`));
      }
    }

    lines.push(line(`  R$ ${toMoney(item.price)}`));
  }

  lines.push(line('-----------------------------'));
  lines.push(boldOn());
  lines.push(line(`TOTAL: R$ ${toMoney(total)}`));
  lines.push(boldOff());
  lines.push(line(''));
  lines.push(alignCenter());
  lines.push(line('Obrigado pela preferencia!'));
  lines.push(line(''));
  lines.push(cutPaper());

  return Buffer.concat(lines);
}
