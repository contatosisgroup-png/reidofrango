const STORAGE_KEYS = {
  siteData: "rei_do_frango_site_data_v1",
  customer: "rei_do_frango_customer_v1"
};

const SITE_DATA_SCHEMA_VERSION = 3;
const QUENTINHA_ITEM_ID = "quentinha-monte-do-seu-jeito";
const QUENTINHA_ITEM_LIMIT = 5;
const SALAD_LIMIT = 2;
const QUENTINHA_MENU_ITEM = {
  id: QUENTINHA_ITEM_ID,
  title: "Quentinha Monte do Seu Jeito",
  description: "Escolha ate 5 itens entre 10 opcoes e ate 2 saladas separadas.",
  price: "R$ 24,90",
  image: "https://images.pexels.com/photos/27497768/pexels-photo-27497768.jpeg?auto=compress&cs=tinysrgb&w=1200",
  category: "pratos"
};
const DEFAULT_QUENTINHA_CHOICES = [
  { id: "arroz-branco", title: "Arroz branco", description: "Porcao tradicional soltinha." },
  { id: "feijao-carioca", title: "Feijao carioca", description: "Feijao temperado da casa." },
  { id: "macarrao-alho-oleo", title: "Macarrao alho e oleo", description: "Massa simples com tempero leve." },
  { id: "farofa-da-casa", title: "Farofa da casa", description: "Farofa crocante temperada." },
  { id: "batata-frita", title: "Batata frita", description: "Batata sequinha e crocante." },
  { id: "pure-batata", title: "Pure de batata", description: "Pure cremoso para completar." },
  { id: "legumes-cozidos", title: "Legumes cozidos", description: "Legumes frescos no ponto." },
  { id: "banana-frita", title: "Banana frita", description: "Banana dourada e levemente doce." },
  { id: "ovo-cozido", title: "Ovo cozido", description: "Ovo cozido cortado." },
  { id: "aipim-cozido", title: "Aipim cozido", description: "Aipim macio com toque de sal." }
];
const DEFAULT_SALAD_CHOICES = [
  { id: "alface-tomate", title: "Alface com tomate", description: "Folhas frescas com tomate." },
  { id: "cenoura-ralada", title: "Cenoura ralada", description: "Cenoura fresca e crocante." },
  { id: "beterraba", title: "Beterraba", description: "Beterraba cozida e temperada." },
  { id: "maionese", title: "Maionese", description: "Salada de maionese da casa." }
];

const DEFAULT_SITE_DATA = {
  schemaVersion: SITE_DATA_SCHEMA_VERSION,
  hero: {
    badge: "Aberto todos os dias - 11h às 23h",
    title: "O frango mais famoso do bairro chegou no ponto certo.",
    text: "Casquinha crocante por fora, carne macia por dentro e tempero de casa. No Rei do Frango, cada pedido sai farto, quente e inesquecível."
  },
  promo: {
    active: true,
    badge: "Promoção da Semana",
    title: "Combo Rei da Semana",
    text: "Frango crocante + fritas + 2 molhos especiais para 2 pessoas.",
    price: "R$ 59,90"
  },
  menuItems: [
    {
      id: "frango-assado-tradicional",
      title: "Frango Assado Tradicional",
      description: "Frango inteiro no braseiro com batata dourada e molho de ervas.",
      price: "R$ 54,90",
      image: "https://images.pexels.com/photos/1027810/pexels-photo-1027810.jpeg?auto=compress&cs=tinysrgb&w=1200",
      category: "pratos"
    },
    {
      id: "frango-crocante-supreme",
      title: "Frango Crocante Supreme",
      description: "Tiras empanadas extra crocantes com maionese da casa e limão.",
      price: "R$ 42,90",
      image: "https://images.pexels.com/photos/7172851/pexels-photo-7172851.jpeg?auto=compress&cs=tinysrgb&w=1200",
      category: "pratos"
    },
    {
      id: "balde-rei-galera",
      title: "Balde Rei da Galera",
      description: "24 pedaços crocantes + 2 molhos + fritas para compartilhar.",
      price: "R$ 89,90",
      image: "https://images.pexels.com/photos/16892378/pexels-photo-16892378.jpeg?auto=compress&cs=tinysrgb&w=1200",
      category: "pratos"
    },
    {
      id: "sanduiche-coroacao",
      title: "Sanduíche Coroação",
      description: "Pão brioche, filé de frango grelhado, queijo, salada e molho picante.",
      price: "R$ 29,90",
      image: "https://images.pexels.com/photos/14662606/pexels-photo-14662606.jpeg?auto=compress&cs=tinysrgb&w=1200",
      category: "pratos"
    },
    {
      id: "prato-executivo-rei",
      title: "Prato Executivo do Rei",
      description: "Meio frango assado, arroz, feijão, farofa e salada fresca.",
      price: "R$ 37,90",
      image: "https://images.pexels.com/photos/27497768/pexels-photo-27497768.jpeg?auto=compress&cs=tinysrgb&w=1200",
      category: "pratos"
    },
    { ...QUENTINHA_MENU_ITEM },
    {
      id: "asinhas-defumadas-bbq",
      title: "Asinhas Defumadas BBQ",
      description: "Asinhas ao molho barbecue da casa com cebola crispy.",
      price: "R$ 34,90",
      image: "https://images.pexels.com/photos/15682894/pexels-photo-15682894.jpeg?auto=compress&cs=tinysrgb&w=1200",
      category: "pratos"
    }
  ],
  quentinhaItems: DEFAULT_QUENTINHA_CHOICES,
  saladItems: DEFAULT_SALAD_CHOICES,
  drinks: [
    {
      id: "coca-cola-350ml",
      title: "Coca-Cola 350ml",
      description: "Refrigerante gelado para acompanhar seu pedido.",
      price: "R$ 7,50",
      image: "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-50593.jpeg?auto=compress&cs=tinysrgb&w=1200",
      category: "bebidas"
    },
    {
      id: "fanta-laranja-350ml",
      title: "Fanta Laranja 350ml",
      description: "Refrigerante de laranja gelado.",
      price: "R$ 7,50",
      image: "https://images.pexels.com/photos/1191146/pexels-photo-1191146.jpeg?auto=compress&cs=tinysrgb&w=1200",
      category: "bebidas"
    },
    {
      id: "sprite-350ml",
      title: "Sprite 350ml",
      description: "Refrigerante limão gelado.",
      price: "R$ 7,50",
      image: "https://images.pexels.com/photos/1191147/pexels-photo-1191147.jpeg?auto=compress&cs=tinysrgb&w=1200",
      category: "bebidas"
    },
    {
      id: "agua-mineral-500ml",
      title: "Água Mineral 500ml",
      description: "Água mineral sem gás.",
      price: "R$ 4,50",
      image: "https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=1200",
      category: "bebidas"
    },
    {
      id: "suco-laranja-natural",
      title: "Suco de Laranja Natural",
      description: "Suco de laranja espremido na hora.",
      price: "R$ 8,90",
      image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=1200",
      category: "bebidas"
    }
  ],
  desserts: [
    {
      id: "pudim-leite-condensado",
      title: "Pudim de Leite Condensado",
      description: "Pudim cremoso com calda de caramelo.",
      price: "R$ 12,90",
      image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1200",
      category: "sobremesas"
    },
    {
      id: "mousse-chocolate",
      title: "Mousse de Chocolate",
      description: "Mousse aerado de chocolate belga.",
      price: "R$ 11,90",
      image: "https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=1200",
      category: "sobremesas"
    },
    {
      id: "sorvete-creme",
      title: "Sorvete de Creme",
      description: "Sorvete artesanal de creme com calda.",
      price: "R$ 9,90",
      image: "https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=1200",
      category: "sobremesas"
    }
  ],
  contact: {
    phoneLabel: "(11) 99999-0000",
    whatsappDigits: "5511999990000",
    address: "Rua do Braseiro, 123 - Centro",
    instagram: "@reidofrango",
    printServiceUrl: ""
  }
};

const ADDONS = [
  { id: "fritas", title: "Batata frita crocante", price: 9.9, description: "Porção média de fritas temperadas.", category: "acompanhamentos" },
  { id: "farofa", title: "Farofa da casa", price: 6.9, description: "Farofa crocante com toque especial.", category: "acompanhamentos" },
  { id: "arroz-feijao", title: "Arroz e Feijão", price: 8.5, description: "Porção de arroz branco e feijão.", category: "acompanhamentos" },
  { id: "molhos", title: "2 molhos extras", price: 5.5, description: "Escolha entre maionese e barbecue.", category: "acompanhamentos" },
  { id: "pao-alho", title: "Pão de Alho", price: 6.9, description: "Pão francês com manteiga de alho.", category: "acompanhamentos" }
];

const QUENTINHA_CHOICES = DEFAULT_QUENTINHA_CHOICES;
const SALAD_CHOICES = DEFAULT_SALAD_CHOICES;

const orderProductEl = document.getElementById("selectedItemCard");
const productsCatalogEl = document.getElementById("productsCatalog");
const selectedItemsListEl = document.getElementById("selectedItemsList");
const addonsGridEl = document.getElementById("addonsGrid");
const quentinhaOptionsSectionEl = document.getElementById("quentinhaOptionsSection");
const quentinhaItemsGridEl = document.getElementById("quentinhaItemsGrid");
const saladsGridEl = document.getElementById("saladsGrid");
const checkoutFormEl = document.getElementById("checkoutForm");
const paymentMethodEl = document.getElementById("checkoutPaymentMethod");
const amountPaidEl = document.getElementById("checkoutAmountPaid");
const paymentReferenceEl = document.getElementById("checkoutPaymentReference");
const cashSectionEl = document.getElementById("cashSection");
const paymentReferenceSectionEl = document.getElementById("paymentReferenceSection");
const pixSectionEl = document.getElementById("pixSection");
const copyPixButton = document.getElementById("copyPixButton");
const pixPhoneNumberEl = document.getElementById("pixPhoneNumber");
const checkoutChangeEl = document.getElementById("checkoutChange");
const summarySubtotalEl = document.getElementById("summarySubtotal");
const summaryExtrasEl = document.getElementById("summaryExtras");
const summaryTotalEl = document.getElementById("summaryTotal");
const checkoutStatusEl = document.getElementById("checkoutStatus");
const resultSectionEl = document.getElementById("checkoutResult");
const resultMessageEl = document.getElementById("resultMessage");
const resultCodeEl = document.getElementById("resultCode");
const resultEtaEl = document.getElementById("resultEta");
const resultPaymentEl = document.getElementById("resultPayment");
const checkoutNameEl = document.getElementById("checkoutName");
const checkoutPhoneEl = document.getElementById("checkoutPhone");
const checkoutAddressEl = document.getElementById("checkoutAddress");
const checkoutNoteEl = document.getElementById("checkoutNote");

// Estado dos itens selecionados
let selectedItems = {};
let selectedAddons = [];
let selectedQuentinhaItems = [];
let selectedSalads = [];
let pixPaymentConfirmed = false;
let gatewayPixReference = null;

const PIX_DATA = {
  key: "+5521965648765",
  name: "REI DO FRANGO",
  city: "SAO PAULO",
  description: "Pagamento de pedido Rei do Frango"
};

function buildProductCard(item) {
  return `
    <div class="product-card" data-id="${item.id}">
      <div class="product-card-image">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
      </div>
      <div class="product-card-content">
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <div class="product-card-footer">
          <p class="product-price">${item.price}</p>
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="changeQuantity('${item.id}', -1)">-</button>
            <span class="quantity-display" id="qty-${item.id}">0</span>
            <button class="quantity-btn" onclick="changeQuantity('${item.id}', 1)">+</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildProductCategory(title, items) {
  const cards = items.map(buildProductCard).join('');
  return `
    <div class="product-category">
      <h3>${title}</h3>
      <div class="product-grid">
        ${cards}
      </div>
    </div>
  `;
}

function renderProductsCatalog(siteData) {
  const categories = [
    { title: "Pratos Principais", items: siteData.menuItems || [] },
    { title: "Bebidas", items: siteData.drinks || [] },
    { title: "Sobremesas", items: siteData.desserts || [] }
  ];

  const html = categories
    .filter(cat => cat.items.length > 0)
    .map(cat => buildProductCategory(cat.title, cat.items))
    .join('');

  productsCatalogEl.innerHTML = html;
}

function changeQuantity(itemId, delta) {
  const currentQty = selectedItems[itemId] || 0;
  const newQty = Math.max(0, currentQty + delta);

  if (newQty === 0) {
    delete selectedItems[itemId];
  } else {
    selectedItems[itemId] = newQty;
  }

  // Atualizar display da quantidade
  const qtyEl = document.getElementById(`qty-${itemId}`);
  if (qtyEl) {
    qtyEl.textContent = newQty;
  }

  syncQuentinhaOptions();

  // Atualizar lista de itens selecionados
  renderSelectedItems();
  updateSummary();
}

function getChoiceTitles(choices, selectedIds) {
  return choices
    .filter((choice) => selectedIds.includes(choice.id))
    .map((choice) => choice.title);
}

function getQuentinhaChoices(siteData = getLocalSiteData()) {
  return Array.isArray(siteData.quentinhaItems) ? siteData.quentinhaItems : QUENTINHA_CHOICES;
}

function getSaladChoices(siteData = getLocalSiteData()) {
  return Array.isArray(siteData.saladItems) ? siteData.saladItems : SALAD_CHOICES;
}

function getQuentinhaModifiers() {
  const siteData = getLocalSiteData();
  const quentinhaItems = getChoiceTitles(getQuentinhaChoices(siteData), selectedQuentinhaItems);
  const salads = getChoiceTitles(getSaladChoices(siteData), selectedSalads);
  return [
    quentinhaItems.length ? `Itens da quentinha: ${quentinhaItems.join(", ")}` : "",
    salads.length ? `Saladas: ${salads.join(", ")}` : ""
  ].filter(Boolean);
}

function isQuentinhaSelected() {
  return (selectedItems[QUENTINHA_ITEM_ID] || 0) > 0;
}

function buildSelectedItemOptions(itemId) {
  if (itemId !== QUENTINHA_ITEM_ID) return "";
  const modifiers = getQuentinhaModifiers();
  if (modifiers.length === 0) return "";
  return modifiers.map((modifier) => `<p class="selected-item-options">${modifier}</p>`).join("");
}

function renderSelectedItems() {
  const siteData = getLocalSiteData();
  const allItems = [
    ...(siteData.menuItems || []),
    ...(siteData.drinks || []),
    ...(siteData.desserts || [])
  ];

  const selectedItemsArray = Object.entries(selectedItems).map(([id, qty]) => {
    const item = allItems.find(item => item.id === id);
    return { ...item, quantity: qty };
  });

  if (selectedItemsArray.length === 0) {
    selectedItemsListEl.innerHTML = '<p class="empty-state">Nenhum item selecionado ainda.</p>';
    return;
  }

  const html = selectedItemsArray.map(item => `
    <div class="selected-item">
      <div class="selected-item-info">
        <h4>${item.title} x${item.quantity}</h4>
        <p>${item.description}</p>
        ${buildSelectedItemOptions(item.id)}
      </div>
      <div class="selected-item-price">${formatBRL(parseBRL(item.price) * item.quantity)}</div>
    </div>
  `).join('');

  selectedItemsListEl.innerHTML = html;
}

function safeParse(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function formatBRL(amount) {
  return `R$ ${amount.toFixed(2).replace('.', ',')}`;
}

function parseBRL(value) {
  const normalized = String(value || "").replace(/[R$\s.]/g, "").replace(',', '.');
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : 0;
}

function normalizeChoice(rawChoice, fallbackChoice, index, prefix) {
  const fallback = fallbackChoice || {
    id: `${prefix}-${index + 1}`,
    title: `Opcao ${index + 1}`,
    description: "Descricao da opcao."
  };

  return {
    id: typeof rawChoice?.id === "string" ? rawChoice.id : fallback.id,
    title: typeof rawChoice?.title === "string" ? rawChoice.title : fallback.title,
    description: typeof rawChoice?.description === "string" ? rawChoice.description : fallback.description
  };
}

function normalizeChoiceList(rawList, fallbackList, prefix) {
  const source = Array.isArray(rawList) ? rawList : fallbackList;
  return source.map((choice, index) =>
    normalizeChoice(choice, fallbackList[index], index, prefix)
  );
}

function ensureQuentinhaMenuItem(items, schemaVersion) {
  if (Number(schemaVersion) >= SITE_DATA_SCHEMA_VERSION) return items;
  if (items.some((item) => item.id === QUENTINHA_ITEM_ID)) return items;

  const nextItems = [...items];
  const insertAfterIndex = nextItems.findIndex((item) => item.id === "prato-executivo-rei");
  const insertAt = insertAfterIndex >= 0 ? insertAfterIndex + 1 : nextItems.length;
  nextItems.splice(insertAt, 0, { ...QUENTINHA_MENU_ITEM });
  return nextItems;
}

function getLocalSiteData() {
  const saved = safeParse(localStorage.getItem(STORAGE_KEYS.siteData), null);
  
  // Se não há dados salvos ou se os dados salvos não têm as categorias necessárias,
  // usar dados padrão e salvar no localStorage
  if (!saved || !saved.menuItems || saved.menuItems.length === 0 || !saved.drinks || !saved.desserts) {
    console.log('Usando dados padrão porque dados salvos estão incompletos');
    localStorage.setItem(STORAGE_KEYS.siteData, JSON.stringify(DEFAULT_SITE_DATA));
    return DEFAULT_SITE_DATA;
  }
  
  const migrated = {
    ...DEFAULT_SITE_DATA,
    ...saved,
    schemaVersion: SITE_DATA_SCHEMA_VERSION,
    menuItems: ensureQuentinhaMenuItem(saved.menuItems || DEFAULT_SITE_DATA.menuItems, saved.schemaVersion),
    quentinhaItems: normalizeChoiceList(saved.quentinhaItems, DEFAULT_QUENTINHA_CHOICES, "quentinha"),
    saladItems: normalizeChoiceList(saved.saladItems, DEFAULT_SALAD_CHOICES, "salada")
  };

  if (
    saved.schemaVersion !== SITE_DATA_SCHEMA_VERSION ||
    migrated.menuItems.length !== saved.menuItems.length ||
    !Array.isArray(saved.quentinhaItems) ||
    !Array.isArray(saved.saladItems)
  ) {
    localStorage.setItem(STORAGE_KEYS.siteData, JSON.stringify(migrated));
  }

  return migrated;
}

function buildPrintPayload(customer, selectedItemIds, addonIds, totals) {
  const siteData = getLocalSiteData();
  const allItems = [
    ...(siteData.menuItems || []),
    ...(siteData.drinks || []),
    ...(siteData.desserts || [])
  ];

  const selectedAddonItems = ADDONS.filter(addon => addonIds.includes(addon.id));
  const commonModifiers = [customer.note].filter(Boolean);

  // Construir lista de itens do pedido
  const items = [];

  // Adicionar itens principais selecionados
  Object.entries(selectedItems).forEach(([id, qty]) => {
    const item = allItems.find(item => item.id === id);
    if (item) {
      const quentinhaModifiers = id === QUENTINHA_ITEM_ID ? getQuentinhaModifiers() : [];
      const modifiers = [...quentinhaModifiers, ...commonModifiers];
      items.push({
        name: item.title,
        quantity: qty,
        price: parseBRL(item.price),
        modifiers: modifiers.length > 0 ? modifiers : undefined
      });
    }
  });

  // Adicionar acompanhamentos
  selectedAddonItems.forEach((addon) => {
    items.push({
      name: addon.title,
      quantity: 1,
      price: addon.price
    });
  });

  return {
    customerName: customer.name,
    customerPhone: customer.phone,
    customerAddress: customer.address,
    paymentMethod: customer.paymentMethod,
    paymentStatus: totals.paymentStatus,
    amountPaid: totals.amountPaid,
    changeDue: totals.changeDue,
    paymentReference: totals.paymentReference || `PED${Date.now().toString().slice(-6)}`,
    note: customer.note,
    items: items,
    total: totals.total
  };
}

function parseQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || "";
}

function getPrintUrl(siteData) {
  const configured = String(siteData.contact.printServiceUrl || "").trim().replace(/\/+$/, "");
  if (configured) return `${configured}/print`;
  if (window.location.protocol.startsWith("http")) {
    return `${window.location.origin}/print`;
  }
  return "http://localhost:3000/print";
}

function getItemById(siteData, itemId) {
  return siteData.menuItems.find((item) => item.id === itemId) || siteData.menuItems[0] || DEFAULT_SITE_DATA.menuItems[0];
}

function buildItemCard(item) {
  return `
    <div class="product-card-image">
      <img src="${item.image}" alt="${item.title}">
    </div>
    <div class="product-card-body">
      <span class="eyebrow">Pedido selecionado</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <p class="product-price">${item.price}</p>
    </div>
  `;
}

function renderAddons(selectedIds) {
  renderChoiceGroup(addonsGridEl, ADDONS, selectedIds, "price");
}

function renderChoiceGroup(container, choices, selectedIds, metaType = "included") {
  container.innerHTML = "";
  choices.forEach((choice) => {
    const checked = selectedIds.includes(choice.id);
    const item = document.createElement("label");
    item.className = "addon-item";
    item.innerHTML = `
      <input type="checkbox" value="${choice.id}" ${checked ? "checked" : ""}>
      <div>
        <strong>${choice.title}</strong>
        <p>${choice.description}</p>
      </div>
      <span>${metaType === "price" ? formatBRL(choice.price) : "Incluso"}</span>
    `;
    container.appendChild(item);
  });
}

function updateChoiceAvailability(container, limit) {
  const checkedCount = container.querySelectorAll("input[type=checkbox]:checked").length;
  container.querySelectorAll("input[type=checkbox]").forEach((input) => {
    input.disabled = !input.checked && checkedCount >= limit;
  });
}

function readLimitedChoices(container, limit, overflowMessage, changedInput) {
  const checked = Array.from(container.querySelectorAll("input[type=checkbox]:checked"));
  if (checked.length > limit) {
    const inputToUndo = changedInput?.checked ? changedInput : checked[checked.length - 1];
    inputToUndo.checked = false;
    checkoutStatusEl.textContent = overflowMessage;
  }
  updateChoiceAvailability(container, limit);
  return Array.from(container.querySelectorAll("input[type=checkbox]:checked")).map((input) => input.value);
}

function renderQuentinhaOptions() {
  const siteData = getLocalSiteData();
  renderChoiceGroup(quentinhaItemsGridEl, getQuentinhaChoices(siteData), selectedQuentinhaItems);
  renderChoiceGroup(saladsGridEl, getSaladChoices(siteData), selectedSalads);
  updateChoiceAvailability(quentinhaItemsGridEl, QUENTINHA_ITEM_LIMIT);
  updateChoiceAvailability(saladsGridEl, SALAD_LIMIT);
}

function syncQuentinhaOptions() {
  const shouldShow = isQuentinhaSelected();
  quentinhaOptionsSectionEl.hidden = !shouldShow;

  if (!shouldShow && (selectedQuentinhaItems.length > 0 || selectedSalads.length > 0)) {
    selectedQuentinhaItems = [];
    selectedSalads = [];
  }

  renderQuentinhaOptions();
}

function toEmv(id, value) {
  const padded = String(value).length.toString().padStart(2, "0");
  return `${id}${padded}${value}`;
}

function computeCrc16(payload) {
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function buildPixString(amount) {
  const formattedAmount = amount.toFixed(2);
  const merchantInfo = toEmv("00", "BR.GOV.BCB.PIX") + toEmv("01", PIX_DATA.key) + toEmv("02", PIX_DATA.description);
  const additional = toEmv("05", `REF${Date.now().toString().slice(-6)}`);
  let payload = "";
  payload += toEmv("00", "01");
  payload += toEmv("26", merchantInfo);
  payload += toEmv("52", "0000");
  payload += toEmv("53", "986");
  payload += toEmv("54", formattedAmount);
  payload += toEmv("58", "BR");
  payload += toEmv("59", PIX_DATA.name);
  payload += toEmv("60", PIX_DATA.city);
  payload += toEmv("62", additional);
  payload += "6304";
  payload += computeCrc16(payload);
  return payload;
}

function renderPixCodeFromText(text) {
  pixPaymentConfirmed = false;
  confirmPixPaymentBtn.hidden = false;
  confirmPixPaymentBtn.disabled = false;
  confirmPixPaymentBtn.textContent = "Confirmar pagamento Pix";
  pixGatewayStatusEl.textContent = "";
  pixQrCodeEl.innerHTML = "";
  new QRCode(pixQrCodeEl, {
    text,
    width: 220,
    height: 220,
    colorDark: "#111",
    colorLight: "#fff"
  });
}

function renderPixCode(total) {
  gatewayPixReference = null;
  renderPixCodeFromText(buildPixString(total));
  paymentReferenceEl.value = paymentReferenceEl.value || `PIX-${Date.now().toString().slice(-5)}`;
  pixGatewayStatusEl.textContent = "QR Code Pix local gerado. Use apenas se o gateway nao estiver configurado.";
}

async function createGatewayPixCharge(orderPayload) {
  const response = await fetch('/pix/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload)
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error || body?.details || body?.message || `HTTP ${response.status}`);
  }

  return response.json();
}

async function verifyGatewayPix(reference) {
  const response = await fetch('/pix/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reference })
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error || body?.details || body?.message || `HTTP ${response.status}`);
  }

  return response.json();
}

async function verifyPixPayment() {
  const reference = paymentReferenceEl.value.trim();
  if (!reference) {
    checkoutStatusEl.textContent = "Informe a referência do comprovante Pix antes de confirmar.";
    return false;
  }

  if (gatewayPixReference) {
    try {
      const result = await verifyGatewayPix(reference);
      pixGatewayStatusEl.textContent = `Status do gateway: ${result.status || 'pendente'}`;
      if (result.paid) {
        pixPaymentConfirmed = true;
        checkoutStatusEl.textContent = "Pagamento Pix confirmado pelo gateway.";
        return true;
      }
      checkoutStatusEl.textContent = `Pagamento Pix nao encontrado. Status: ${result.status || 'pendente'}`;
      return false;
    } catch (error) {
      checkoutStatusEl.textContent = `Falha ao verificar gateway Pix: ${error.message}`;
      return false;
    }
  }

  pixPaymentConfirmed = true;
  checkoutStatusEl.textContent = "Pagamento Pix confirmado localmente. Agora finalize a compra.";
  return true;
}

function updateSummary() {
  const totals = calculateTotals();
  summarySubtotalEl.textContent = formatBRL(totals.subtotal);
  summaryExtrasEl.textContent = formatBRL(totals.extras);
  summaryTotalEl.textContent = formatBRL(totals.total);
  checkoutChangeEl.textContent = formatBRL(totals.changeDue);
  return totals;
}

function calculateTotals() {
  const siteData = getLocalSiteData();
  const allItems = [
    ...(siteData.menuItems || []),
    ...(siteData.drinks || []),
    ...(siteData.desserts || [])
  ];

  // Calcular subtotal dos itens selecionados
  let subtotal = 0;
  Object.entries(selectedItems).forEach(([id, qty]) => {
    const item = allItems.find(item => item.id === id);
    if (item) {
      subtotal += parseBRL(item.price) * qty;
    }
  });

  // Calcular acompanhamentos
  let extras = 0;
  selectedAddons.forEach(addonId => {
    const addon = ADDONS.find(a => a.id === addonId);
    if (addon) {
      extras += addon.price;
    }
  });

  const total = subtotal + extras;
  const paidValue = parseBRL(amountPaidEl.value);
  const amountPaid = paymentMethodEl.value === "Dinheiro" ? paidValue : total;
  const changeDue = Math.max(0, amountPaid - total);
  const paymentReference = paymentReferenceEl.value.trim();
  const paymentStatus = paymentMethodEl.value === "Dinheiro"
    ? (paidValue >= total ? "confirmado" : "aguardando pagamento")
    : (paymentReference ? "confirmado" : "aguardando pagamento");

  return {
    subtotal,
    extras,
    total,
    paidValue,
    amountPaid,
    changeDue,
    paymentMethod: paymentMethodEl.value,
    paymentStatus,
    paymentReference
  };
}

function toggleCashSection(method) {
  if (method === "Dinheiro") {
    cashSectionEl.hidden = false;
    paymentReferenceSectionEl.hidden = true;
    pixSectionEl.hidden = true;
    paymentReferenceEl.required = false;
    paymentReferenceEl.value = "";
  } else if (method === "Pix") {
    cashSectionEl.hidden = true;
    paymentReferenceSectionEl.hidden = false;
    pixSectionEl.hidden = false;
    confirmPixPaymentBtn.hidden = false;
    confirmPixPaymentBtn.disabled = false;
    confirmPixPaymentBtn.textContent = "Confirmar pagamento Pix";
    paymentReferenceEl.required = true;
    paymentReferenceEl.placeholder = "Ex: PIX12345 ou comprovante";
    paymentReferenceEl.value = paymentReferenceEl.value || `PIX-${Date.now().toString().slice(-5)}`;
    pixPaymentConfirmed = false;
  } else {
    cashSectionEl.hidden = true;
    amountPaidEl.value = "";
    checkoutChangeEl.textContent = "R$ 0,00";
    paymentReferenceSectionEl.hidden = false;
    pixSectionEl.hidden = true;
    confirmPixPaymentBtn.hidden = true;
    paymentReferenceEl.required = true;
    paymentReferenceEl.placeholder = "Ex: nº autorizacao";
    pixPaymentConfirmed = false;
  }
}

async function submitPrint(printUrl, payload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  try {
    const response = await fetch(printUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    const body = await response.json().catch(() => null);
    if (!response.ok) {
      const message = body?.error || body?.details || body?.message || `Erro HTTP ${response.status}`;
      throw new Error(message);
    }
    return body;
  } finally {
    clearTimeout(timeout);
  }
}

function buildWhatsAppLink(number, message) {
  const digits = String(number || "").replace(/\D/g, "");
  return `https://wa.me/${digits || "5511999990000"}?text=${encodeURIComponent(message)}`;
}

function createOrderCode() {
  const stamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 90 + 10);
  return `RF-${stamp}${random}`;
}

function populateCustomerFields(customer) {
  checkoutNameEl.value = customer.name || "";
  checkoutPhoneEl.value = customer.phone || "";
  checkoutAddressEl.value = customer.address || "";
  checkoutNoteEl.value = customer.note || "";
}

function loadCustomerData() {
  const saved = safeParse(localStorage.getItem(STORAGE_KEYS.customer), null);
  if (!saved || typeof saved !== "object") return { name: "", phone: "", address: "", note: "" };
  return saved;
}

function saveCustomerData(customer) {
  localStorage.setItem(STORAGE_KEYS.customer, JSON.stringify(customer));
}

function showResult(orderCode, eta, paymentMethod) {
  resultCodeEl.textContent = orderCode;
  resultEtaEl.textContent = eta;
  resultPaymentEl.textContent = paymentMethod;
  resultMessageEl.textContent = "O pedido foi enviado para impressão automática do restaurante. Aguarde a confirmação do preparo.";
  resultSectionEl.hidden = false;
}

function setupCheckout() {
  const siteData = getLocalSiteData();

  // Renderizar catálogo de produtos
  renderProductsCatalog(siteData);

  // Renderizar acompanhamentos
  renderAddons(selectedAddons);
  renderQuentinhaOptions();
  syncQuentinhaOptions();

  // Atualizar resumo inicial
  updateSummary();
  toggleCashSection(paymentMethodEl.value);

  // Configurar eventos dos acompanhamentos
  addonsGridEl.addEventListener("change", () => {
    const selectedIds = Array.from(addonsGridEl.querySelectorAll("input[type=checkbox]:checked")).map((input) => input.value);
    selectedAddons = selectedIds;
    updateSummary();
    checkoutStatusEl.textContent = `Acompanhamentos atualizados`;
  });

  quentinhaItemsGridEl.addEventListener("change", (event) => {
    const changedInput = event.target instanceof HTMLInputElement ? event.target : null;
    selectedQuentinhaItems = readLimitedChoices(
      quentinhaItemsGridEl,
      QUENTINHA_ITEM_LIMIT,
      `Escolha no maximo ${QUENTINHA_ITEM_LIMIT} itens para a quentinha.`,
      changedInput
    );
    renderSelectedItems();
  });

  saladsGridEl.addEventListener("change", (event) => {
    const changedInput = event.target instanceof HTMLInputElement ? event.target : null;
    selectedSalads = readLimitedChoices(
      saladsGridEl,
      SALAD_LIMIT,
      `Escolha no maximo ${SALAD_LIMIT} saladas.`,
      changedInput
    );
    renderSelectedItems();
  });

  // Configurar eventos de pagamento
  paymentMethodEl.addEventListener("change", () => {
    toggleCashSection(paymentMethodEl.value);
    updateSummary();
    checkoutStatusEl.textContent = `Método de pagamento: ${paymentMethodEl.value}`;
  });

  amountPaidEl.addEventListener("input", () => {
    updateSummary();
    checkoutStatusEl.textContent = `Troco calculado`;
  });

  copyPixButton.addEventListener("click", () => {
    pixPhoneNumberEl.select();
    document.execCommand("copy");
    const originalText = copyPixButton.textContent;
    copyPixButton.textContent = "Copiado!";
    setTimeout(() => {
      copyPixButton.textContent = originalText;
    }, 2000);
  });

  // Preencher dados do cliente
  populateCustomerFields(loadCustomerData());

  // Configurar formulário de checkout
  checkoutFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    const customer = {
      name: checkoutNameEl.value.trim(),
      phone: checkoutPhoneEl.value.trim(),
      address: checkoutAddressEl.value.trim(),
      note: checkoutNoteEl.value.trim(),
      paymentMethod: paymentMethodEl.value
    };

    if (!customer.name || !customer.phone || !customer.address) {
      checkoutStatusEl.textContent = "Por favor, preencha nome, telefone e endereço.";
      return;
    }

    // Verificar se há itens selecionados
    const selectedItemsArray = Object.keys(selectedItems);
    if (selectedItemsArray.length === 0) {
      checkoutStatusEl.textContent = "Por favor, selecione pelo menos um produto.";
      return;
    }

    if (isQuentinhaSelected() && selectedQuentinhaItems.length === 0) {
      checkoutStatusEl.textContent = "Escolha pelo menos 1 item para a quentinha.";
      return;
    }

    const totals = updateSummary();

    if (customer.paymentMethod === "Dinheiro" && totals.amountPaid < totals.total) {
      checkoutStatusEl.textContent = "Valor em dinheiro insuficiente para confirmar o pagamento.";
      return;
    }

    if (customer.paymentMethod === "Pix") {
      if (!totals.paymentReference) {
        checkoutStatusEl.textContent = "Por favor, informe a referência ou comprovante do pagamento.";
        return;
      }
    } else if (customer.paymentMethod !== "Dinheiro" && !totals.paymentReference) {
      checkoutStatusEl.textContent = "Por favor, informe a referência ou comprovante do pagamento.";
      return;
    }

    const payload = buildPrintPayload(customer, Object.keys(selectedItems), selectedAddons, totals);

    try {
      checkoutStatusEl.textContent = "Enviando pedido...";
      const printUrl = getPrintUrl(getLocalSiteData());
      const response = await submitPrint(printUrl, payload);
      const orderCode = response?.orderId || createOrderCode();
      const etaMinutes = 20 + Math.floor(Math.random() * 15);
      const eta = `${etaMinutes} min`;
      showResult(orderCode, eta, customer.paymentMethod);
      saveCustomerData(customer);
    } catch (error) {
      console.error("Erro:", error);
      checkoutStatusEl.textContent = `Erro ao enviar pedido: ${error.message || "Tente novamente."}`;
    }
  });
}

window.changeQuantity = changeQuantity;

window.addEventListener("DOMContentLoaded", setupCheckout);
