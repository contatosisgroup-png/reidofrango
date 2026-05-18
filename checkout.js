const STORAGE_KEYS = {
  siteData: "rei_do_frango_site_data_v1",
  customer: "rei_do_frango_customer_v1",
  checkoutState: "rei_do_frango_checkout_state_v1"
};

const DEFAULT_SITE_DATA = {
  hero: {
    badge: "Aberto todos os dias - 11h as 23h",
    title: "O frango mais famoso do bairro chegou no ponto certo.",
    text: "Casquinha crocante por fora, carne macia por dentro e tempero de casa. No Rei do Frango, cada pedido sai farto, quente e inesquecivel."
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
      description: "24 pedacos crocantes + 2 molhos + fritas para compartilhar.",
      price: "R$ 89,90",
      image: "https://images.pexels.com/photos/16892378/pexels-photo-16892378.jpeg?auto=compress&cs=tinysrgb&w=1200",
      category: "pratos"
    },
    {
      id: "sanduiche-coroacao",
      title: "Sanduiche Coroacao",
      description: "Pão brioche, filé de frango grelhado, queijo, salada e molho picante.",
      price: "R$ 29,90",
      image: "https://images.pexels.com/photos/14662606/pexels-photo-14662606.jpeg?auto=compress&cs=tinysrgb&w=1200",
      category: "pratos"
    },
    {
      id: "prato-executivo-rei",
      title: "Prato Executivo do Rei",
      description: "Meio frango assado, arroz, feijao, farofa e salada fresca.",
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

const DELIVERY_ZONES = {
  centro: { label: "Centro", fee: 6, minEta: 25, maxEta: 35 },
  bairro: { label: "Bairros próximos", fee: 9, minEta: 30, maxEta: 45 },
  distante: { label: "Área distante", fee: 14, minEta: 40, maxEta: 60 }
};

const COUPONS = {
  REI10: { type: "percent", value: 0.1, minSubtotal: 0, maxDiscount: 25, label: "10% de desconto" },
  REI15: { type: "percent", value: 0.15, minSubtotal: 90, maxDiscount: 35, label: "15% de desconto" },
  FRETEGRATIS: { type: "free_shipping", value: 0, minSubtotal: 0, maxDiscount: 0, label: "Frete grátis" }
};

const FREE_SHIPPING_GOAL = 80;
const RUNTIME_CONFIG_FILE = "runtime-config.json";
const LOCAL_PRINT_BASE_URL = "http://localhost:3000";

const productsCatalogEl = document.getElementById("productsCatalog");
const categoryJumpEl = document.getElementById("categoryJump");
const selectedItemsListEl = document.getElementById("selectedItemsList");
const addonsGridEl = document.getElementById("addonsGrid");
const upsellGridEl = document.getElementById("upsellGrid");
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
const summaryDeliveryEl = document.getElementById("summaryDelivery");
const summaryDiscountEl = document.getElementById("summaryDiscount");
const summaryTotalEl = document.getElementById("summaryTotal");
const shippingProgressBarEl = document.getElementById("shippingProgressBar");
const shippingProgressTextEl = document.getElementById("shippingProgressText");
const checkoutStatusEl = document.getElementById("checkoutStatus");
const resultSectionEl = document.getElementById("checkoutResult");
const resultMessageEl = document.getElementById("resultMessage");
const resultCodeEl = document.getElementById("resultCode");
const resultEtaEl = document.getElementById("resultEta");
const resultPaymentEl = document.getElementById("resultPayment");
const checkoutNameEl = document.getElementById("checkoutName");
const checkoutPhoneEl = document.getElementById("checkoutPhone");
const checkoutAddressEl = document.getElementById("checkoutAddress");
const checkoutZipEl = document.getElementById("checkoutZip");
const checkoutDeliveryZoneEl = document.getElementById("checkoutDeliveryZone");
const deliveryEtaNoteEl = document.getElementById("deliveryEtaNote");
const checkoutNoteEl = document.getElementById("checkoutNote");
const checkoutCouponInputEl = document.getElementById("checkoutCouponInput");
const applyCouponBtnEl = document.getElementById("applyCouponBtn");
const couponStatusEl = document.getElementById("couponStatus");
const menuToggleEl = document.querySelector(".menu-toggle");
const mainNavEl = document.querySelector(".main-nav");

const openCartBtnEl = document.getElementById("openCartBtn");
const closeCartBtnEl = document.getElementById("closeCartBtn");
const cartDrawerBackdropEl = document.getElementById("cartDrawerBackdrop");
const cartDrawerListEl = document.getElementById("cartDrawerList");
const cartDrawerCountEl = document.getElementById("cartDrawerCount");
const cartDrawerSubtotalEl = document.getElementById("cartDrawerSubtotal");
const cartGoPaymentBtnEl = document.getElementById("cartGoPaymentBtn");
const topCartCountEl = document.getElementById("topCartCount");
const mobileCartBarEl = document.getElementById("mobileCartBar");
const mobileCartBtnEl = document.getElementById("mobileCartBtn");
const mobileCartCountEl = document.getElementById("mobileCartCount");
const mobileCartTotalEl = document.getElementById("mobileCartTotal");
const checkoutPaymentCardEl = document.getElementById("checkoutPaymentCard");
const ordersSectionEl = document.getElementById("pedidos");

const statusReceivedEl = document.getElementById("statusReceived");
const statusPreparingEl = document.getElementById("statusPreparing");
const statusOnRouteEl = document.getElementById("statusOnRoute");
const statusDeliveredEl = document.getElementById("statusDelivered");

const ORDER_ENTRY_ALIASES = new Set(["pedidos", "pedido", "orders", "order"]);

let selectedItems = {};
let selectedAddons = [];
let appliedCouponCode = "";
let checkoutSubmitting = false;
let activeSiteData = null;
let runtimeConfigPromise = null;
let timelineTimeouts = [];

function safeParse(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
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

function itemCategory(item) {
  const category = sanitizeText(item?.category || "", 20).toLowerCase();
  if (category === "pratos" || category === "bebidas" || category === "sobremesas") return category;
  return "pratos";
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

function isLocalHostname(hostname) {
  const normalized = String(hostname || "").toLowerCase();
  return normalized === "localhost" || normalized === "127.0.0.1" || normalized === "[::1]" || normalized === "::1";
}

function normalizePrintBaseUrl(value) {
  const raw = sanitizeText(value || "", 240);
  if (!raw) return "";
  if (!/^https?:\/\//i.test(raw)) return "";

  let normalized = raw.replace(/\/+$/, "");
  if (normalized.toLowerCase().endsWith("/print")) {
    normalized = normalized.slice(0, -"/print".length);
  }
  return normalized;
}

function resolveRuntimeConfigUrl() {
  if (typeof window === "undefined" || !window.location) return RUNTIME_CONFIG_FILE;
  return new URL(RUNTIME_CONFIG_FILE, window.location.href).toString();
}

async function fetchRuntimeConfig() {
  if (!(window.location.protocol === "http:" || window.location.protocol === "https:")) {
    return null;
  }

  try {
    const response = await fetch(resolveRuntimeConfigUrl(), { cache: "no-store" });
    if (!response.ok) return null;
    const data = await response.json();
    const printServiceUrl = normalizePrintBaseUrl(data?.printServiceUrl || data?.print_url || "");
    if (!printServiceUrl) return null;
    return { printServiceUrl };
  } catch {
    return null;
  }
}

function getRuntimeConfig() {
  if (!runtimeConfigPromise) {
    runtimeConfigPromise = fetchRuntimeConfig().catch(() => null);
  }
  return runtimeConfigPromise;
}

function getPrintUrls(siteData, runtimeConfig) {
  const urls = [];
  const shouldPreferLocalhost = isLocalHostname(window.location.hostname);

  const addPrintUrl = (baseOrPrintUrl) => {
    const normalizedBase = normalizePrintBaseUrl(baseOrPrintUrl);
    if (!normalizedBase) return;
    const printUrl = `${normalizedBase}/print`;
    if (!urls.includes(printUrl)) urls.push(printUrl);
  };

  if (shouldPreferLocalhost) {
    addPrintUrl(LOCAL_PRINT_BASE_URL);
  }

  addPrintUrl(runtimeConfig?.printServiceUrl);
  addPrintUrl(siteData?.contact?.printServiceUrl);

  if (window.location.protocol.startsWith("http")) {
    addPrintUrl(window.location.origin);
  }

  if (!shouldPreferLocalhost) {
    addPrintUrl(LOCAL_PRINT_BASE_URL);
  }

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
  const runtimeConfig = await getRuntimeConfig();
  const printUrls = getPrintUrls(siteData, runtimeConfig);
  let lastError = null;
  const attemptedUrls = [];

  for (const printUrl of printUrls) {
    attemptedUrls.push(printUrl);
    try {
      const response = await submitPrint(printUrl, payload);
      return { response, printUrl };
    } catch (error) {
      lastError = error;
      if (!isConnectionError(error)) break;
    }
  }

  if (lastError && typeof lastError === "object") {
    lastError.attemptedUrls = attemptedUrls;
    throw lastError;
  }

  const fallbackError = new Error("Falha ao enviar pedido para impressão.");
  fallbackError.attemptedUrls = attemptedUrls;
  throw fallbackError;
}

function createOrderCode() {
  const stamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 90 + 10);
  return `RF-${stamp}${random}`;
}

function getSelectedItemCount() {
  return Object.values(selectedItems).reduce((sum, quantity) => sum + quantity, 0);
}

function pruneSelectedItems() {
  const validIds = new Set(getAllProducts(activeSiteData).map((item) => item.id));
  selectedItems = Object.fromEntries(
    Object.entries(selectedItems).filter(([id, quantity]) => validIds.has(id) && quantity > 0)
  );
}

function getSelectedList() {
  const allItems = getAllProducts(activeSiteData);
  return Object.entries(selectedItems)
    .map(([id, quantity]) => {
      const item = allItems.find((candidate) => candidate.id === id);
      if (!item) return null;
      return { ...item, quantity };
    })
    .filter(Boolean);
}

function getCardBadge(item, index) {
  const category = itemCategory(item);
  if (index === 0) return "Mais pedido";
  if (category === "bebidas") return "Gelado";
  if (category === "sobremesas") return "Novo";
  return "Promo";
}

function buildProductCard(item, index) {
  return `
    <div class="product-card" data-id="${item.id}">
      <div class="product-card-image">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
      </div>
      <div class="product-card-content">
        <span class="product-tag">${getCardBadge(item, index)}</span>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </div>
      <div class="product-card-footer">
        <p class="product-price">${item.price}</p>
        <div class="quantity-controls" aria-label="Quantidade de ${item.title}">
          <button class="quantity-btn" type="button" onclick="changeQuantity('${item.id}', -1)">-</button>
          <span class="quantity-display" id="qty-${item.id}">0</span>
          <button class="quantity-btn" type="button" onclick="changeQuantity('${item.id}', 1)">+</button>
        </div>
      </div>
    </div>
  `;
}

function buildProductCategory(categoryKey, title, items) {
  const cards = items.map((item, index) => buildProductCard(item, index)).join("");
  return `
    <div class="product-category" id="category-${categoryKey}" data-category-key="${categoryKey}">
      <h3>${title}</h3>
      <div class="product-grid">
        ${cards}
      </div>
    </div>
  `;
}

function getCatalogCategories(siteData) {
  return [
    { key: "pratos", title: "Refeicoes", items: siteData.menuItems || [] },
    { key: "bebidas", title: "Bebidas", items: siteData.drinks || [] },
    { key: "sobremesas", title: "Doces", items: siteData.desserts || [] }
  ];
}

function syncCategoryJumpButtons(categories) {
  if (!categoryJumpEl) return;

  const availableKeys = new Set(
    categories
      .filter((category) => Array.isArray(category.items) && category.items.length > 0)
      .map((category) => category.key)
  );

  const buttons = Array.from(categoryJumpEl.querySelectorAll(".category-jump-btn"));
  let firstVisibleButton = null;

  buttons.forEach((button) => {
    const key = sanitizeText(button.dataset.categoryTarget, 24).toLowerCase();
    const available = availableKeys.has(key);
    button.hidden = !available;
    button.disabled = !available;
    button.classList.remove("active");

    if (available && !firstVisibleButton) {
      firstVisibleButton = button;
    }
  });

  if (firstVisibleButton) {
    firstVisibleButton.classList.add("active");
  }
}

function renderProductsCatalog(siteData) {
  const categories = getCatalogCategories(siteData);

  const html = categories
    .filter((category) => Array.isArray(category.items) && category.items.length > 0)
    .map((category) => buildProductCategory(category.key, category.title, category.items))
    .join("");

  productsCatalogEl.innerHTML = html;
  syncCategoryJumpButtons(categories);
}

function syncQuantityDisplays() {
  document.querySelectorAll(".quantity-display").forEach((element) => {
    element.textContent = "0";
  });

  Object.entries(selectedItems).forEach(([id, quantity]) => {
    const quantityEl = document.getElementById(`qty-${id}`);
    if (quantityEl) quantityEl.textContent = String(quantity);
  });
}

function renderSelectedItems() {
  const selectedList = getSelectedList();
  if (selectedList.length === 0) {
    const emptyHtml = '<p class="empty-state">Nenhum item selecionado ainda.</p>';
    selectedItemsListEl.innerHTML = emptyHtml;
    cartDrawerListEl.innerHTML = emptyHtml;
    return;
  }

  const inlineHtml = selectedList
    .map(
      (item) => `
        <div class="selected-item">
          <div class="selected-item-info">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
          </div>
          <div class="selected-item-actions">
            <div class="mini-qty">
              <button type="button" onclick="changeQuantity('${item.id}', -1)">-</button>
              <span>${item.quantity}</span>
              <button type="button" onclick="changeQuantity('${item.id}', 1)">+</button>
            </div>
            <div class="selected-item-price">${formatBRL(parseBRL(item.price) * item.quantity)}</div>
          </div>
        </div>
      `
    )
    .join("");
  selectedItemsListEl.innerHTML = inlineHtml;

  const drawerHtml = selectedList
    .map(
      (item) => `
        <div class="drawer-item">
          <div>
            <strong>${item.title}</strong>
            <p>${item.quantity} x ${item.price}</p>
          </div>
          <div class="drawer-item-actions">
            <div class="mini-qty">
              <button type="button" onclick="changeQuantity('${item.id}', -1)" aria-label="Remover unidade">-</button>
              <span>${item.quantity}</span>
              <button type="button" onclick="changeQuantity('${item.id}', 1)" aria-label="Adicionar unidade">+</button>
            </div>
            <strong>${formatBRL(parseBRL(item.price) * item.quantity)}</strong>
          </div>
        </div>
      `
    )
    .join("");
  cartDrawerListEl.innerHTML = drawerHtml;
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

function renderUpsell() {
  const allProducts = getAllProducts(activeSiteData);
  const suggestions = allProducts.filter((item) => !selectedItems[item.id]).slice(0, 4);

  if (suggestions.length === 0) {
    upsellGridEl.innerHTML = '<p class="small-note">Seu carrinho ja tem varias opcoes. Perfeito.</p>';
    return;
  }

  const html = suggestions
    .map(
      (item) => `
        <article class="upsell-card">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <div>
            <h4>${item.title}</h4>
            <p>${item.price}</p>
            <button type="button" class="btn btn-secondary" onclick="addUpsellItem('${item.id}')">Adicionar</button>
          </div>
        </article>
      `
    )
    .join("");

  upsellGridEl.innerHTML = html;
}

function getCouponDefinition(code) {
  if (!code) return null;
  return COUPONS[code] || null;
}

function calculateCouponDiscount(code, subtotal, extras, delivery) {
  const coupon = getCouponDefinition(code);
  if (!coupon) return 0;
  if (subtotal < (coupon.minSubtotal || 0)) return 0;

  const base = subtotal + extras + delivery;
  if (coupon.type === "free_shipping") {
    return delivery;
  }

  if (coupon.type === "percent") {
    const rawDiscount = subtotal * coupon.value;
    const cappedDiscount = coupon.maxDiscount ? Math.min(rawDiscount, coupon.maxDiscount) : rawDiscount;
    return Math.min(base, cappedDiscount);
  }

  return 0;
}

function calculateTotals() {
  const allItems = getAllProducts(activeSiteData);
  const zoneKey = checkoutDeliveryZoneEl.value in DELIVERY_ZONES ? checkoutDeliveryZoneEl.value : "centro";
  const zone = DELIVERY_ZONES[zoneKey];

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

  const deliveryBase = zone.fee;
  const freeShippingAuto = subtotal >= FREE_SHIPPING_GOAL ? deliveryBase : 0;
  const deliveryCharge = Math.max(0, deliveryBase - freeShippingAuto);
  const couponDiscount = calculateCouponDiscount(appliedCouponCode, subtotal, extras, deliveryCharge);
  const discount = freeShippingAuto + couponDiscount;

  const totalBeforeDiscount = subtotal + extras + deliveryBase;
  const total = Math.max(0, totalBeforeDiscount - discount);

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
      : "confirmado";

  return {
    zoneKey,
    zone,
    subtotal,
    extras,
    deliveryBase,
    freeShippingAuto,
    deliveryCharge,
    couponDiscount,
    discount,
    total,
    paymentMethod,
    amountPaid,
    changeDue,
    paymentReference,
    paymentStatus
  };
}

function updateDeliveryEtaNote(zone) {
  deliveryEtaNoteEl.textContent = `Entrega estimada: ${zone.minEta} a ${zone.maxEta} min`;
}

function updateShippingProgress(subtotal) {
  const ratio = Math.min(1, subtotal / FREE_SHIPPING_GOAL);
  const percentage = Math.round(ratio * 100);
  shippingProgressBarEl.style.width = `${percentage}%`;

  if (subtotal >= FREE_SHIPPING_GOAL) {
    shippingProgressTextEl.textContent = "Frete grátis liberado neste pedido.";
    return;
  }

  const missing = FREE_SHIPPING_GOAL - subtotal;
  shippingProgressTextEl.textContent = `Faltam ${formatBRL(missing)} para frete grátis`;
}

function updateCouponStatus(totals) {
  if (!appliedCouponCode) {
    couponStatusEl.textContent = "";
    couponStatusEl.classList.remove("error");
    return;
  }

  const coupon = getCouponDefinition(appliedCouponCode);
  if (!coupon) {
    couponStatusEl.textContent = "Cupom inválido.";
    couponStatusEl.classList.add("error");
    return;
  }

  if (totals.subtotal < (coupon.minSubtotal || 0)) {
    couponStatusEl.textContent = `Cupom ${appliedCouponCode} exige subtotal mínimo de ${formatBRL(coupon.minSubtotal)}.`;
    couponStatusEl.classList.add("error");
    return;
  }

  const discountText = formatBRL(totals.couponDiscount + totals.freeShippingAuto);
  couponStatusEl.textContent = `Cupom aplicado: ${appliedCouponCode} (${coupon.label}). Desconto atual: ${discountText}.`;
  couponStatusEl.classList.remove("error");
}

function updateCartIndicators(totals) {
  const itemCount = getSelectedItemCount();
  topCartCountEl.textContent = String(itemCount);
  cartDrawerCountEl.textContent = String(itemCount);
  cartDrawerSubtotalEl.textContent = formatBRL(totals.subtotal + totals.extras);

  if (itemCount > 0) {
    mobileCartBarEl.hidden = false;
    mobileCartCountEl.textContent = String(itemCount);
    mobileCartTotalEl.textContent = formatBRL(totals.total);
  } else {
    mobileCartBarEl.hidden = true;
  }
}

function saveCheckoutState() {
  const payload = {
    selectedItems,
    selectedAddons,
    appliedCouponCode,
    deliveryZone: sanitizeText(checkoutDeliveryZoneEl.value, 20),
    zip: sanitizeText(checkoutZipEl.value, 12)
  };
  localStorage.setItem(STORAGE_KEYS.checkoutState, JSON.stringify(payload));
}

function loadCheckoutState() {
  const saved = safeParse(localStorage.getItem(STORAGE_KEYS.checkoutState), null);
  if (!saved || typeof saved !== "object") return;

  if (saved.selectedItems && typeof saved.selectedItems === "object") {
    selectedItems = Object.fromEntries(
      Object.entries(saved.selectedItems)
        .map(([id, quantity]) => [sanitizeText(id, 70), Number(quantity) || 0])
        .filter(([, quantity]) => quantity > 0)
    );
  }

  if (Array.isArray(saved.selectedAddons)) {
    const validAddonIds = new Set(ADDONS.map((addon) => addon.id));
    selectedAddons = saved.selectedAddons
      .map((id) => sanitizeText(id, 40))
      .filter((id) => validAddonIds.has(id));
  }

  const nextCouponCode = sanitizeText(saved.appliedCouponCode || "", 20).toUpperCase();
  if (nextCouponCode) {
    appliedCouponCode = nextCouponCode;
    checkoutCouponInputEl.value = nextCouponCode;
  }

  if (saved.deliveryZone && saved.deliveryZone in DELIVERY_ZONES) {
    checkoutDeliveryZoneEl.value = saved.deliveryZone;
  }

  if (saved.zip) {
    checkoutZipEl.value = sanitizeText(saved.zip, 12);
  }
}

function clearCheckoutState() {
  localStorage.removeItem(STORAGE_KEYS.checkoutState);
}

function refreshCheckoutUI() {
  syncQuantityDisplays();
  renderSelectedItems();
  renderUpsell();

  const totals = calculateTotals();

  summarySubtotalEl.textContent = formatBRL(totals.subtotal);
  summaryExtrasEl.textContent = formatBRL(totals.extras);
  summaryDeliveryEl.textContent = formatBRL(totals.deliveryCharge);
  summaryDiscountEl.textContent = `- ${formatBRL(totals.discount)}`;
  summaryTotalEl.textContent = formatBRL(totals.total);
  checkoutChangeEl.textContent = formatBRL(totals.changeDue);

  updateDeliveryEtaNote(totals.zone);
  updateShippingProgress(totals.subtotal);
  updateCouponStatus(totals);
  updateCartIndicators(totals);
  saveCheckoutState();

  return totals;
}

function setStatus(message) {
  checkoutStatusEl.textContent = message;
}

function setCheckoutSubmitting(submitting) {
  checkoutSubmitting = submitting;
  const submitButton = checkoutFormEl.querySelector('button[type="submit"]');
  if (!submitButton) return;
  submitButton.disabled = submitting;
  submitButton.textContent = submitting ? "Enviando..." : "Finalizar compra";
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
  paymentReferenceEl.required = false;

  if (method === "Pix") {
    pixSectionEl.hidden = false;
    paymentReferenceEl.placeholder = "Opcional: PIX12345 ou comprovante";
  } else {
    pixSectionEl.hidden = true;
    paymentReferenceEl.placeholder = "Opcional: número de autorização";
  }
}

function openCartDrawer(event) {
  if (event) {
    event.preventDefault();
  }
  if (!cartDrawerBackdropEl) return;

  cartDrawerBackdropEl.hidden = false;
  cartDrawerBackdropEl.classList.add("is-open");
  cartDrawerBackdropEl.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeCartDrawer(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (!cartDrawerBackdropEl) return;

  cartDrawerBackdropEl.classList.remove("is-open");
  cartDrawerBackdropEl.hidden = true;
  cartDrawerBackdropEl.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function applyCouponFromInput() {
  const code = sanitizeText(checkoutCouponInputEl.value, 20).toUpperCase();
  if (!code) {
    appliedCouponCode = "";
    couponStatusEl.textContent = "";
    couponStatusEl.classList.remove("error");
    refreshCheckoutUI();
    return;
  }

  const coupon = getCouponDefinition(code);
  if (!coupon) {
    appliedCouponCode = "";
    couponStatusEl.textContent = "Cupom inválido.";
    couponStatusEl.classList.add("error");
    refreshCheckoutUI();
    return;
  }

  appliedCouponCode = code;
  checkoutCouponInputEl.value = code;
  refreshCheckoutUI();
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

function preselectItemFromQuery(siteData) {
  const paramId = sanitizeText(new URLSearchParams(window.location.search).get("item") || "", 80);
  if (!paramId) return;
  const found = getAllProducts(siteData).find((item) => item.id === paramId);
  if (!found) return;
  selectedItems[found.id] = (selectedItems[found.id] || 0) + 1;
}

function readEntryTarget() {
  const params = new URLSearchParams(window.location.search);
  const rawTarget =
    params.get("aba") ||
    params.get("tab") ||
    params.get("section") ||
    String(window.location.hash || "").replace(/^#/, "");
  return sanitizeText(rawTarget, 24).toLowerCase();
}

function focusOrdersSectionFromEntry() {
  if (!(ordersSectionEl instanceof HTMLElement)) return;
  const target = readEntryTarget();
  if (!target || !ORDER_ENTRY_ALIASES.has(target)) return;

  window.requestAnimationFrame(() => {
    ordersSectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
    ordersSectionEl.classList.add("checkout-target-highlight");
    window.setTimeout(() => {
      ordersSectionEl.classList.remove("checkout-target-highlight");
    }, 1800);
  });
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
    deliveryZip: sanitizeText(checkoutZipEl.value, 12),
    deliveryZone: totals.zone.label,
    paymentMethod: customer.paymentMethod,
    paymentStatus: totals.paymentStatus,
    amountPaid: totals.amountPaid,
    changeDue: totals.changeDue,
    paymentReference: totals.paymentReference || `PED${Date.now().toString().slice(-6)}`,
    note: customer.note,
    couponCode: appliedCouponCode || null,
    subtotal: totals.subtotal,
    extras: totals.extras,
    deliveryFee: totals.deliveryCharge,
    discount: totals.discount,
    items,
    total: totals.total
  };
}

function clearTimeline() {
  timelineTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
  timelineTimeouts = [];
}

function setTimelineStep(stepIndex) {
  const steps = [statusReceivedEl, statusPreparingEl, statusOnRouteEl, statusDeliveredEl];
  steps.forEach((step, index) => {
    step.classList.remove("active", "done");
    if (index < stepIndex) {
      step.classList.add("done");
      return;
    }
    if (index === stepIndex) {
      step.classList.add("active");
    }
  });
}

function startTimeline() {
  clearTimeline();
  setTimelineStep(0);

  timelineTimeouts.push(
    setTimeout(() => setTimelineStep(1), 4000),
    setTimeout(() => setTimelineStep(2), 10000),
    setTimeout(() => setTimelineStep(3), 18000)
  );
}

function showResult(orderCode, eta, paymentMethod) {
  resultCodeEl.textContent = orderCode;
  resultEtaEl.textContent = eta;
  resultPaymentEl.textContent = paymentMethod;
  resultMessageEl.textContent = "Pedido confirmado. Você pode acompanhar o status abaixo até a entrega.";
  resultSectionEl.hidden = false;
  startTimeline();
  resultSectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
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

function setupCategoryJump() {
  if (!categoryJumpEl || !productsCatalogEl) return;

  categoryJumpEl.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const button = target.closest(".category-jump-btn");
    if (!button || button.disabled) return;

    const categoryKey = sanitizeText(button.dataset.categoryTarget, 24).toLowerCase();
    const section = productsCatalogEl.querySelector(`[data-category-key="${categoryKey}"]`);
    if (!(section instanceof HTMLElement)) {
      setStatus("Categoria indisponível no momento.");
      return;
    }

    categoryJumpEl.querySelectorAll(".category-jump-btn").forEach((candidate) => {
      candidate.classList.toggle("active", candidate === button);
    });

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function setupCartDrawer() {
  if (!openCartBtnEl || !closeCartBtnEl || !mobileCartBtnEl || !cartGoPaymentBtnEl || !checkoutPaymentCardEl || !cartDrawerBackdropEl) {
    return;
  }

  openCartBtnEl.addEventListener("click", (event) => openCartDrawer(event));
  closeCartBtnEl.addEventListener("click", (event) => closeCartDrawer(event));
  closeCartBtnEl.addEventListener("touchend", (event) => closeCartDrawer(event));
  mobileCartBtnEl.addEventListener("click", (event) => openCartDrawer(event));
  cartGoPaymentBtnEl.addEventListener("click", () => {
    closeCartDrawer();
    checkoutPaymentCardEl.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  cartDrawerBackdropEl.addEventListener("click", (event) => {
    if (event.target === cartDrawerBackdropEl) {
      closeCartDrawer();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !cartDrawerBackdropEl.hidden) {
      closeCartDrawer();
    }
  });
}

function setupCheckout() {
  setupHeaderMenu();
  setupCartDrawer();
  setupCategoryJump();
  setupCopyPixAction();

  activeSiteData = getLocalSiteData();
  void getRuntimeConfig();

  renderProductsCatalog(activeSiteData);
  loadCheckoutState();
  preselectItemFromQuery(activeSiteData);
  pruneSelectedItems();
  renderAddons(selectedAddons);
  populateCustomerFields(loadCustomerData());
  syncQuantityDisplays();
  toggleCashSection(paymentMethodEl.value);
  refreshCheckoutUI();
  focusOrdersSectionFromEntry();

  addonsGridEl.addEventListener("change", () => {
    selectedAddons = Array.from(addonsGridEl.querySelectorAll("input[type=checkbox]:checked")).map((input) => input.value);
    refreshCheckoutUI();
    setStatus("Acompanhamentos atualizados.");
  });

  paymentMethodEl.addEventListener("change", () => {
    toggleCashSection(paymentMethodEl.value);
    refreshCheckoutUI();
    setStatus(`Método de pagamento: ${paymentMethodEl.value}`);
  });

  amountPaidEl.addEventListener("input", () => {
    refreshCheckoutUI();
  });

  paymentReferenceEl.addEventListener("input", () => {
    refreshCheckoutUI();
  });

  checkoutDeliveryZoneEl.addEventListener("change", () => {
    refreshCheckoutUI();
    setStatus("Região de entrega atualizada.");
  });

  checkoutZipEl.addEventListener("input", () => {
    saveCheckoutState();
  });

  applyCouponBtnEl.addEventListener("click", () => {
    applyCouponFromInput();
  });

  checkoutCouponInputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      applyCouponFromInput();
    }
  });

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

    const totals = refreshCheckoutUI();
    if (totals.total <= 0) {
      setStatus("Total inválido. Revise os itens selecionados.");
      return;
    }

    if (customer.paymentMethod === "Dinheiro" && totals.amountPaid < totals.total) {
      setStatus("Valor em dinheiro insuficiente para confirmar o pedido.");
      return;
    }

    const payload = buildPrintPayload(customer, selectedAddons, totals);

    try {
      setCheckoutSubmitting(true);
      setStatus("Enviando pedido para o restaurante...");

      const { response } = await submitPrintWithFallback(activeSiteData, payload);
      const orderCode = sanitizeText(response?.orderId || createOrderCode(), 40);
      const etaRandom = totals.zone.minEta + Math.floor(Math.random() * (totals.zone.maxEta - totals.zone.minEta + 1));
      const eta = `${etaRandom} min`;

      showResult(orderCode, eta, customer.paymentMethod);
      saveCustomerData(customer);

      selectedItems = {};
      selectedAddons = [];
      appliedCouponCode = "";
      checkoutCouponInputEl.value = "";
      clearCheckoutState();
      renderAddons(selectedAddons);
      refreshCheckoutUI();
      closeCartDrawer();
      setStatus("Pedido enviado com sucesso. Impressão acionada no restaurante.");
    } catch (error) {
      const message = String(error?.message || "Tente novamente.");
      if (isConnectionError(error)) {
        const attempted = Array.isArray(error?.attemptedUrls) ? error.attemptedUrls.join(" | ") : "";
        const suffix = attempted ? ` Endpoints testados: ${attempted}` : "";
        setStatus(
          `Não foi possível conectar ao serviço de impressão. Verifique se o INICIAR_IMPRESSAO.bat está em execução.${suffix}`
        );
      } else {
        setStatus(`Falha ao enviar pedido: ${message}`);
      }
    } finally {
      setCheckoutSubmitting(false);
    }
  });
}

function changeQuantity(itemId, delta) {
  const currentQty = selectedItems[itemId] || 0;
  const nextQty = Math.max(0, currentQty + delta);

  if (nextQty === 0) {
    delete selectedItems[itemId];
  } else {
    selectedItems[itemId] = nextQty;
  }

  refreshCheckoutUI();
}

function addUpsellItem(itemId) {
  selectedItems[itemId] = (selectedItems[itemId] || 0) + 1;
  refreshCheckoutUI();
  setStatus("Item sugerido adicionado ao carrinho.");
}

window.changeQuantity = changeQuantity;
window.addUpsellItem = addUpsellItem;
window.addEventListener("DOMContentLoaded", setupCheckout);
