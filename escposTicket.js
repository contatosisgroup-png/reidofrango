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

function line(text = '') {
  return Buffer.concat([Buffer.from(text, 'utf8'), Buffer.from([0x0a])]);
}

export function buildTicket(order) {
  const createdAt = order.created_at ? new Date(order.created_at) : new Date();
  const dateLabel = Number.isNaN(createdAt.getTime())
    ? new Date().toLocaleString('pt-BR')
    : createdAt.toLocaleString('pt-BR');

  const lines = [];
  lines.push(alignCenter());
  lines.push(boldOn());
  lines.push(line('REI DO FRANGO'));
  lines.push(boldOff());
  lines.push(line('PEDIDO AUTOMÁTICO'));
  lines.push(line('-----------------------------'));
  lines.push(alignLeft());
  lines.push(line(`Pedido: ${order.id}`));
  lines.push(line(`Cliente: ${order.customer_name}`));
  if (order.customer_phone) lines.push(line(`Telefone: ${order.customer_phone}`));
  if (order.customer_address) lines.push(line(`Endereço: ${order.customer_address}`));
  if (order.payment_method) lines.push(line(`Pagamento: ${order.payment_method}`));
  if (order.payment_status) lines.push(line(`Status: ${order.payment_status}`));
  if (order.amount_paid && Number(order.amount_paid) >= 0) {
    lines.push(line(`Pago: R$ ${Number(order.amount_paid).toFixed(2).replace('.', ',')}`));
  }
  if (order.change_due && Number(order.change_due) > 0) {
    lines.push(line(`Troco: R$ ${Number(order.change_due).toFixed(2).replace('.', ',')}`));
  }
  if (order.payment_reference) lines.push(line(`Ref: ${order.payment_reference}`));
  if (order.notes) lines.push(line(`Obs: ${order.notes}`));
  if (order.table_number) lines.push(line(`Mesa: ${order.table_number}`));
  lines.push(line(`Hora: ${dateLabel}`));
  lines.push(line('-----------------------------'));

  for (const item of order.items) {
    const quantity = item.quantity ?? 1;
    const itemLine = `${quantity}x ${item.name}`;
    const price = Number(item.price).toFixed(2).replace('.', ',');
    lines.push(line(itemLine));
    if (item.modifiers?.length) {
      for (const modifier of item.modifiers) {
        lines.push(line(`  - ${modifier}`));
      }
    }
    lines.push(line(`  R$ ${price}`));
  }

  lines.push(line('-----------------------------'));
  lines.push(boldOn());
  lines.push(line(`TOTAL: R$ ${Number(order.total).toFixed(2).replace('.', ',')}`));
  lines.push(boldOff());
  lines.push(line('')); // blank line
  lines.push(alignCenter());
  lines.push(line('Obrigado pela preferência!'));
  lines.push(line('')); // blank line
  lines.push(cutPaper());

  return Buffer.concat(lines);
}
