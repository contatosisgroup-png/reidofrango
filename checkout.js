const STORAGE_KEYS = {
  siteData: "rei_do_frango_site_data_v1",
  customer: "rei_do_frango_customer_v1"
};

const DEFAULT_SITE_DATA = {
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
    {
      id: "asinhas-defumadas-bbq",
      title: "Asinhas Defumadas BBQ",
      description: "Asinhas ao molho barbecue da casa com cebola crispy.",
      price: "R$ 34,90",
      image: "https://images.pexels.com/photos/15682894/pexels-photo-15682894.jpeg?auto=compress&cs=tinysrgb&w=1200",
      category: "pratos"
    }
  ],
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
  { id: "fritas", title: "Batata frita crocante", price: 9.9, description: "Porção média de fritas temperadas." },
  { id: "farofa", title: "Farofa da casa", price: 6.9, description: "Farofa crocante com toque especial." },
  { id: "arroz-feijao", title: "Arroz e Feijão", price: 8.5, description: "Porção de arroz branco e feijão." },
  { id: "salada-fresca", title: "Salada Fresca", price: 7.9, description: "Mix de folhas verdes com legumes." },
  { id: "molhos", title: "2 molhos extras", price: 5.5, description: "Escolha entre maionese e barbecue." },
  { id: "pao-alho", title: "Pão de Alho", price: 6.9, description: "Pão francês com manteiga de alho." }
];

const productsCatalogEl = document.getElementById("productsCatalog");
const selectedItemsListEl = document.getElementById("selectedItemsList");
const addonsGridEl = document.getElementById("addonsGrid");
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
const menuToggleEl = document.querySelector(".menu-toggle");
const mainNavEl = document.querySelector(".main-nav");

let selectedItems = {};
let selectedAddons = [];
let checkoutSubmitting = false;
let activeSiteData = null;

function safeParse(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function sanitizeText(value, maxLength = 120) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function textValue(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function formatBRL(amount) {
  return `R$ ${Number(amount || 0).toFixed(2).replace(".", ",")}`;
}

function parseBRL(value) {
  const normalized = String(value || "").replace(/[R$\s.]/g, "").replace(",", ".");
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : 0;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeItem(rawItem, fallbackItem, index, category) {
  const fallback = fallbackItem || {
    id: `${category || "item"}-${index + 1}`,
    title: `Item ${index + 1}`,
    description: "Descrição do item.",
    price: "R$ 0,00",
    image: "https://images.pexels.com/photos/1027810/pexels-photo-1027810.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: category || "pratos"
  };

  const parsedPrice = parseBRL(rawItem?.price);

  return {
    id: sanitizeText(rawItem?.id || fallback.id, 70),
    title: sanitizeText(rawItem?.title || fallback.title, 80),
    description: sanitizeText(rawItem?.description || fallback.description, 180),
    price: parsedPrice > 0 ? formatBRL(parsedPrice) : textValue(rawItem?.price, fallback.price),
    image: sanitizeText(rawItem?.image || fallback.image, 400),
    category: sanitizeText(rawItem?.category || fallback.category || category || "pratos", 24)
  };
}

function normalizeCategory(items, fallbackItems, category) {
  if (!Array.isArray(items) || items.length === 0) {
    return fallbackItems.map((item, index) => normalizeItem(item, fallbackItems[index], index, category));
  }

  return items
    .map((item, index) => normalizeItem(item, fallbackItems[index], index, category))
    .filter((item) => Boolean(item.id && item.title));
}

function normalizeSiteData(rawData) {
  const base = clone(DEFAULT_SITE_DATA);
  if (!rawData || typeof rawData !== "object") return base;

  base.menuItems = normalizeCategory(rawData.menuItems, DEFAULT_SITE_DATA.menuItems, "pratos");
  base.drinks = normalizeCategory(rawData.drinks, DEFAULT_SITE_DATA.drinks, "bebidas");
  base.desserts = normalizeCategory(rawData.desserts, DEFAULT_SITE_DATA.desserts, "sobremesas");

  base.contact.phoneLabel = sanitizeText(rawData.contact?.phoneLabel || base.contact.phoneLabel, 40);
  base.contact.whatsappDigits = sanitizeText(rawData.contact?.whatsappDigits || base.contact.whatsappDigits, 30).replace(/\D/g, "");
  base.contact.address = sanitizeText(rawData.contact?.address || base.contact.address, 120);
  base.contact.instagram = sanitizeText(rawData.contact?.instagram || base.contact.instagram, 60);
  base.contact.printServiceUrl = sanitizeText(rawData.contact?.printServiceUrl || base.contact.printServiceUrl, 240);

  return base;
}

function getLocalSiteData() {
  const saved = safeParse(localStorage.getItem(STORAGE_KEYS.siteData), null);
  const normalized = normalizeSiteData(saved);
  localStorage.setItem(STORAGE_KEYS.siteData, JSON.stringify(normalized));
  return normalized;
}

function getAllProducts(siteData) {
  return [...(siteData.menuItems || []), ...(siteData.drinks || []), ...(siteData.desserts || [])];
}

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
          <div class="quantity-controls" aria-label="Quantidade de ${item.title}">
            <button class="quantity-btn" type="button" onclick="changeQuantity('${item.id}', -1)">-</button>
            <span class="quantity-display" id="qty-${item.id}">0</span>
            <button class="quantity-btn" type="button" onclick="changeQuantity('${item.id}', 1)">+</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildProductCategory(title, items) {
  const cards = items.map(buildProductCard).join("");
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
    .filter((category) => Array.isArray(category.items) && category.items.length > 0)
    .map((category) => buildProductCategory(category.title, category.items))
    .join("");

  productsCatalogEl.innerHTML = html;
}

function changeQuantity(itemId, delta) {
  const currentQty = selectedItems[itemId] || 0;
  const nextQty = Math.max(0, currentQty + delta);

  if (nextQty === 0) {
    delete selectedItems[itemId];
  } else {
    selectedItems[itemId] = nextQty;
  }

  const qtyEl = document.getElementById(`qty-${itemId}`);
  if (qtyEl) qtyEl.textContent = String(nextQty);

  renderSelectedItems();
  updateSummary();
}

function renderSelectedItems() {
  const allItems = getAllProducts(activeSiteData);

  const selectedList = Object.entries(selectedItems)
    .map(([id, quantity]) => {
      const item = allItems.find((candidate) => candidate.id === id);
      if (!item) return null;
      return { ...item, quantity };
    })
    .filter(Boolean);

  if (selectedList.length === 0) {
    selectedItemsListEl.innerHTML = '<p class="empty-state">Nenhum item selecionado ainda.</p>';
    return;
  }

  const html = selectedList
    .map(
      (item) => `
      <div class="selected-item">
        <div class="selected-item-info">
          <h4>${item.title} x${item.quantity}</h4>
          <p>${item.description}</p>
        </div>
        <div class="selected-item-price">${formatBRL(parseBRL(item.price) * item.quantity)}</div>
      </div>
    `
    )
    .join("");

  selectedItemsListEl.innerHTML = html;
}

function renderAddons(selectedIds) {
  addonsGridEl.innerHTML = "";

  ADDONS.forEach((addon) => {
    const checked = selectedIds.includes(addon.id);
    const wrapper = document.createElement("label");
    wrapper.className = "addon-item";
    wrapper.innerHTML = `
      <input type="checkbox" value="${addon.id}" ${checked ? "checked" : ""}>
      <div>
        <strong>${addon.title}</strong>
        <p>${addon.description}</p>
      </div>
      <span>${formatBRL(addon.price)}</span>
    `;
    addonsGridEl.appendChild(wrapper);
  });
}

function calculateTotals() {
  const allItems = getAllProducts(activeSiteData);

  let subtotal = 0;
  Object.entries(selectedItems).forEach(([id, quantity]) => {
    const item = allItems.find((candidate) => candidate.id === id);
    if (!item) return;
    subtotal += parseBRL(item.price) * quantity;
  });

  let extras = 0;
  selectedAddons.forEach((addonId) => {
    const addon = ADDONS.find((candidate) => candidate.id === addonId);
    if (addon) extras += addon.price;
  });

  const total = subtotal + extras;
  const paidValue = parseBRL(amountPaidEl.value);
  const paymentMethod = paymentMethodEl.value;
  const amountPaid = paymentMethod === "Dinheiro" ? paidValue : total;
  const changeDue = Math.max(0, amountPaid - total);
  const paymentReference = sanitizeText(paymentReferenceEl.value, 60);

  const paymentStatus =
    paymentMethod === "Dinheiro"
      ? paidValue >= total
        ? "confirmado"
        : "aguardando pagamento"
      : paymentReference
        ? "confirmado"
        : "aguardando pagamento";

  return {
    subtotal,
    extras,
    total,
    paymentMethod,
    paidValue,
    amountPaid,
    changeDue,
    paymentReference,
    paymentStatus
  };
}

function updateSummary() {
  const totals = calculateTotals();
  summarySubtotalEl.textContent = formatBRL(totals.subtotal);
  summaryExtrasEl.textContent = formatBRL(totals.extras);
  summaryTotalEl.textContent = formatBRL(totals.total);
  checkoutChangeEl.textContent = formatBRL(totals.changeDue);
  return totals;
}

function toggleCashSection(method) {
  if (method === "Dinheiro") {
    cashSectionEl.hidden = false;
    paymentReferenceSectionEl.hidden = true;
    pixSectionEl.hidden = true;
    paymentReferenceEl.required = false;
    paymentReferenceEl.value = "";
    return;
  }

  cashSectionEl.hidden = true;
  amountPaidEl.value = "";
  checkoutChangeEl.textContent = "R$ 0,00";
  paymentReferenceSectionEl.hidden = false;
  paymentReferenceEl.required = true;

  if (method === "Pix") {
    pixSectionEl.hidden = false;
    paymentReferenceEl.placeholder = "Ex: PIX12345 ou comprovante";
    if (!paymentReferenceEl.value) {
      paymentReferenceEl.value = `PIX-${Date.now().toString().slice(-5)}`;
    }
  } else {
    pixSectionEl.hidden = true;
    paymentReferenceEl.placeholder = "Ex: número de autorização";
  }
}

function getPrintUrls(siteData) {
  const urls = [];

  const addPrintUrl = (baseOrPrintUrl) => {
    const cleaned = String(baseOrPrintUrl || "").trim().replace(/\/+$/, "");
    if (!cleaned) return;
    const printUrl = cleaned.endsWith("/print") ? cleaned : `${cleaned}/print`;
    if (!urls.includes(printUrl)) urls.push(printUrl);
  };

  addPrintUrl(siteData?.contact?.printServiceUrl);
  if (window.location.protocol.startsWith("http")) {
    addPrintUrl(window.location.origin);
  }
  addPrintUrl("http://localhost:3000");

  return urls;
}

function isConnectionError(error) {
  const message = String(error?.message || "").toLowerCase();
  return message.includes("failed to fetch") || message.includes("network") || message.includes("timeout") || message.includes("abort");
}

async function submitPrint(printUrl, payload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

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

async function submitPrintWithFallback(siteData, payload) {
  const printUrls = getPrintUrls(siteData);
  let lastError = null;

  for (const printUrl of printUrls) {
    try {
      const response = await submitPrint(printUrl, payload);
      return { response, printUrl };
    } catch (error) {
      lastError = error;
      if (!isConnectionError(error)) break;
    }
  }

  throw lastError || new Error("Falha ao enviar pedido para impressão.");
}

function createOrderCode() {
  const stamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 90 + 10);
  return `RF-${stamp}${random}`;
}

function loadCustomerData() {
  const saved = safeParse(localStorage.getItem(STORAGE_KEYS.customer), null);
  if (!saved || typeof saved !== "object") {
    return { name: "", phone: "", address: "", note: "" };
  }

  return {
    name: sanitizeText(saved.name, 80),
    phone: sanitizeText(saved.phone, 30),
    address: sanitizeText(saved.address, 140),
    note: sanitizeText(saved.note, 240)
  };
}

function saveCustomerData(customer) {
  localStorage.setItem(
    STORAGE_KEYS.customer,
    JSON.stringify({
      name: sanitizeText(customer.name, 80),
      phone: sanitizeText(customer.phone, 30),
      address: sanitizeText(customer.address, 140),
      note: sanitizeText(customer.note, 240)
    })
  );
}

function populateCustomerFields(customer) {
  checkoutNameEl.value = customer.name || "";
  checkoutPhoneEl.value = customer.phone || "";
  checkoutAddressEl.value = customer.address || "";
  checkoutNoteEl.value = customer.note || "";
}

function setCheckoutSubmitting(submitting) {
  checkoutSubmitting = submitting;

  const submitButton = checkoutFormEl.querySelector('button[type="submit"]');
  if (!submitButton) return;

  submitButton.disabled = submitting;
  submitButton.textContent = submitting ? "Enviando..." : "Finalizar compra";
}

function showResult(orderCode, eta, paymentMethod) {
  resultCodeEl.textContent = orderCode;
  resultEtaEl.textContent = eta;
  resultPaymentEl.textContent = paymentMethod;
  resultMessageEl.textContent = "O pedido foi enviado para impressão automática do restaurante. Aguarde a confirmação do preparo.";
  resultSectionEl.hidden = false;
  resultSectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setStatus(message) {
  checkoutStatusEl.textContent = message;
}

function preselectItemFromQuery(siteData) {
  const paramId = sanitizeText(new URLSearchParams(window.location.search).get("item") || "", 80);
  if (!paramId) return;

  const allItems = getAllProducts(siteData);
  const found = allItems.find((item) => item.id === paramId);
  if (!found) return;

  selectedItems[found.id] = 1;

  const qtyEl = document.getElementById(`qty-${found.id}`);
  if (qtyEl) qtyEl.textContent = "1";
}

function buildPrintPayload(customer, addonIds, totals) {
  const allItems = getAllProducts(activeSiteData);
  const items = [];

  Object.entries(selectedItems).forEach(([id, quantity]) => {
    const item = allItems.find((candidate) => candidate.id === id);
    if (!item) return;

    items.push({
      name: item.title,
      quantity,
      price: parseBRL(item.price)
    });
  });

  addonIds.forEach((addonId) => {
    const addon = ADDONS.find((candidate) => candidate.id === addonId);
    if (!addon) return;

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
    items,
    total: totals.total
  };
}

function setupCopyPixAction() {
  if (!copyPixButton || !pixPhoneNumberEl) return;

  copyPixButton.addEventListener("click", async () => {
    const originalText = copyPixButton.textContent;

    try {
      const pixKey = sanitizeText(pixPhoneNumberEl.value, 30);
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(pixKey);
      } else {
        pixPhoneNumberEl.select();
        document.execCommand("copy");
      }
      copyPixButton.textContent = "Copiado!";
    } catch {
      copyPixButton.textContent = "Falha ao copiar";
    }

    setTimeout(() => {
      copyPixButton.textContent = originalText;
    }, 1600);
  });
}

function setupHeaderMenu() {
  if (!menuToggleEl || !mainNavEl) return;

  menuToggleEl.addEventListener("click", () => {
    const isOpen = mainNavEl.classList.toggle("open");
    menuToggleEl.setAttribute("aria-expanded", String(isOpen));
  });

  mainNavEl.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNavEl.classList.remove("open");
      menuToggleEl.setAttribute("aria-expanded", "false");
    });
  });
}

function setupCheckout() {
  setupHeaderMenu();
  activeSiteData = getLocalSiteData();

  renderProductsCatalog(activeSiteData);
  preselectItemFromQuery(activeSiteData);
  renderSelectedItems();
  renderAddons(selectedAddons);
  updateSummary();
  toggleCashSection(paymentMethodEl.value);

  addonsGridEl.addEventListener("change", () => {
    selectedAddons = Array.from(addonsGridEl.querySelectorAll("input[type=checkbox]:checked")).map((input) => input.value);
    updateSummary();
    setStatus("Acompanhamentos atualizados.");
  });

  paymentMethodEl.addEventListener("change", () => {
    toggleCashSection(paymentMethodEl.value);
    updateSummary();
    setStatus(`Método de pagamento: ${paymentMethodEl.value}`);
  });

  amountPaidEl.addEventListener("input", () => {
    updateSummary();
    setStatus("Troco recalculado.");
  });

  setupCopyPixAction();
  populateCustomerFields(loadCustomerData());

  checkoutFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (checkoutSubmitting) return;

    const customer = {
      name: sanitizeText(checkoutNameEl.value, 80),
      phone: sanitizeText(checkoutPhoneEl.value, 30),
      address: sanitizeText(checkoutAddressEl.value, 140),
      note: sanitizeText(checkoutNoteEl.value, 240),
      paymentMethod: paymentMethodEl.value
    };

    if (!customer.name || !customer.phone || !customer.address) {
      setStatus("Preencha nome, telefone e endereço para continuar.");
      return;
    }

    if (Object.keys(selectedItems).length === 0) {
      setStatus("Selecione pelo menos um produto para finalizar o pedido.");
      return;
    }

    const totals = updateSummary();

    if (totals.total <= 0) {
      setStatus("O total do pedido está inválido. Revise os itens selecionados.");
      return;
    }

    if (customer.paymentMethod === "Dinheiro" && totals.amountPaid < totals.total) {
      setStatus("Valor em dinheiro insuficiente para confirmar o pedido.");
      return;
    }

    if (customer.paymentMethod !== "Dinheiro" && !totals.paymentReference) {
      setStatus("Informe a referência/comprovante do pagamento para continuar.");
      return;
    }

    const payload = buildPrintPayload(customer, selectedAddons, totals);

    try {
      setCheckoutSubmitting(true);
      setStatus("Enviando pedido para o restaurante...");

      const { response } = await submitPrintWithFallback(activeSiteData, payload);
      const orderCode = sanitizeText(response?.orderId || createOrderCode(), 40);
      const etaMinutes = 20 + Math.floor(Math.random() * 15);
      const eta = `${etaMinutes} min`;

      showResult(orderCode, eta, customer.paymentMethod);
      saveCustomerData(customer);
      setStatus("Pedido enviado com sucesso. Impressão acionada no restaurante.");
    } catch (error) {
      const message = String(error?.message || "Tente novamente.");
      if (isConnectionError(error)) {
        setStatus("Não foi possível conectar ao serviço de impressão. Verifique se o INICIAR_IMPRESSAO.bat está em execução.");
      } else {
        setStatus(`Falha ao enviar pedido: ${message}`);
      }
    } finally {
      setCheckoutSubmitting(false);
    }
  });
}

window.changeQuantity = changeQuantity;
window.addEventListener("DOMContentLoaded", setupCheckout);
