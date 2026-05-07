const STORAGE_KEYS = {
  siteData: "rei_do_frango_site_data_v1",
  customer: "rei_do_frango_customer_v1",
  adminCreds: "rei_do_frango_admin_creds_v1",
  adminSession: "rei_do_frango_admin_session_v1"
};

const DEFAULT_ADMIN_CREDS = {
  username: "admin",
  password: "rei123"
};

const DEFAULT_SITE_DATA = {
  hero: {
    badge: "Aberto todos os dias - 11h as 23h",
    title: "O frango mais famoso do bairro chegou no ponto certo.",
    text: "Casquinha crocante por fora, carne macia por dentro e tempero de casa. No Rei do Frango, cada pedido sai farto, quente e inesquecivel."
  },
  featured: {
    kicker: "Destaque da Casa",
    title: "Frango Rei Supremo",
    text: "Frango inteiro assado + farofa da casa + batata rustica + molho especial.",
    price: "R$ 69,90"
  },
  promo: {
    active: true,
    badge: "Promoção da Semana",
    title: "Combo Rei da Semana",
    text: "Frango crocante + fritas + 2 molhos especiais para 2 pessoas.",
    price: "R$ 59,90"
  },
  contact: {
    phoneLabel: "(11) 99999-0000",
    whatsappDigits: "5511999990000",
    address: "Rua do Braseiro, 123 - Centro",
    instagram: "@reidofrango",
    printServiceUrl: ""
  },
  menuItems: [
    {
      id: "frango-assado-tradicional",
      title: "Frango Assado Tradicional",
      description: "Frango inteiro no braseiro com batata dourada e molho de ervas.",
      price: "R$ 54,90",
      image: "https://images.pexels.com/photos/1027810/pexels-photo-1027810.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: "frango-crocante-supreme",
      title: "Frango Crocante Supreme",
      description: "Tiras empanadas extra crocantes com maionese da casa e limao.",
      price: "R$ 42,90",
      image: "https://images.pexels.com/photos/7172851/pexels-photo-7172851.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: "balde-rei-galera",
      title: "Balde Rei da Galera",
      description: "24 pedacos crocantes + 2 molhos + fritas para compartilhar.",
      price: "R$ 89,90",
      image: "https://images.pexels.com/photos/16892378/pexels-photo-16892378.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: "sanduiche-coroacao",
      title: "Sanduiche Coroacao",
      description: "Pao brioche, file de frango grelhado, queijo, salada e molho picante.",
      price: "R$ 29,90",
      image: "https://images.pexels.com/photos/14662606/pexels-photo-14662606.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: "prato-executivo-rei",
      title: "Prato Executivo do Rei",
      description: "Meio frango assado, arroz, feijao, farofa e salada fresca.",
      price: "R$ 37,90",
      image: "https://images.pexels.com/photos/27497768/pexels-photo-27497768.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: "asinhas-defumadas-bbq",
      title: "Asinhas Defumadas BBQ",
      description: "Asinhas ao molho barbecue da casa com cebola crispy.",
      price: "R$ 34,90",
      image: "https://images.pexels.com/photos/15682894/pexels-photo-15682894.jpeg?auto=compress&cs=tinysrgb&w=1200"
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
  ]
};

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

const heroBadgeEl = document.getElementById("heroBadge");
const heroTitleEl = document.getElementById("heroTitle");
const heroTextEl = document.getElementById("heroText");
const featuredKickerEl = document.getElementById("featuredKicker");
const featuredTitleEl = document.getElementById("featuredTitle");
const featuredTextEl = document.getElementById("featuredText");
const featuredPriceEl = document.getElementById("featuredPrice");
const featuredChooseBtn = document.getElementById("featuredChooseBtn");

const promoSectionEl = document.getElementById("promocao");
const promoBadgeEl = document.getElementById("promoBadge");
const promoTitleEl = document.getElementById("promoTitle");
const promoTextEl = document.getElementById("promoText");
const promoPriceEl = document.getElementById("promoPrice");

const menuGridEl = document.getElementById("menuGrid");
const orderFormEl = document.getElementById("orderForm");
const orderItemEl = document.getElementById("orderItem");
const orderPaymentEl = document.getElementById("orderPayment");
const orderStatusEl = document.getElementById("orderStatus");
const orderReceiptEl = document.getElementById("orderReceipt");
const receiptCodeEl = document.getElementById("receiptCode");
const receiptItemEl = document.getElementById("receiptItem");
const receiptPaymentEl = document.getElementById("receiptPayment");
const receiptEtaEl = document.getElementById("receiptEta");
const customerNameEl = document.getElementById("customerName");
const customerPhoneEl = document.getElementById("customerPhone");
const customerAddressEl = document.getElementById("customerAddress");
const customerNoteEl = document.getElementById("customerNote");
const hasInlineOrderForm = Boolean(orderFormEl && orderItemEl && orderPaymentEl);
const contactPhoneEl = document.getElementById("contactPhone");
const contactAddressEl = document.getElementById("contactAddress");
const contactInstagramEl = document.getElementById("contactInstagram");
const contactWhatsLinkEl = document.getElementById("contactWhatsLink");

const adminOverlayEl = document.getElementById("adminOverlay");
const adminCloseBtn = document.getElementById("adminCloseBtn");
const adminLoginViewEl = document.getElementById("adminLoginView");
const adminEditorViewEl = document.getElementById("adminEditorView");
const adminLoginFormEl = document.getElementById("adminLoginForm");
const adminUserInputEl = document.getElementById("adminUserInput");
const adminPassInputEl = document.getElementById("adminPassInput");
const adminLoginStatusEl = document.getElementById("adminLoginStatus");
const adminFormEl = document.getElementById("adminForm");
const adminEditorStatusEl = document.getElementById("adminEditorStatus");
const addDishBtnEl = document.getElementById("addDishBtn");
const adminLogoutBtnEl = document.getElementById("adminLogoutBtn");
const adminItemsEditorEl = document.getElementById("adminItemsEditor");
const resetSiteBtnEl = document.getElementById("resetSiteBtn");

const heroBadgeInputEl = document.getElementById("heroBadgeInput");
const heroTitleInputEl = document.getElementById("heroTitleInput");
const heroTextInputEl = document.getElementById("heroTextInput");
const featuredKickerInputEl = document.getElementById("featuredKickerInput");
const featuredTitleInputEl = document.getElementById("featuredTitleInput");
const featuredTextInputEl = document.getElementById("featuredTextInput");
const featuredPriceInputEl = document.getElementById("featuredPriceInput");
const promoActiveInputEl = document.getElementById("promoActiveInput");
const promoBadgeInputEl = document.getElementById("promoBadgeInput");
const promoTitleInputEl = document.getElementById("promoTitleInput");
const promoTextInputEl = document.getElementById("promoTextInput");
const promoPriceInputEl = document.getElementById("promoPriceInput");
const contactPhoneInputEl = document.getElementById("contactPhoneInput");
const contactNumberInputEl = document.getElementById("contactNumberInput");
const contactAddressInputEl = document.getElementById("contactAddressInput");
const contactInstagramInputEl = document.getElementById("contactInstagramInput");
const printServiceUrlInputEl = document.getElementById("printServiceUrlInput");
const newAdminUserInputEl = document.getElementById("newAdminUserInput");
const newAdminPassInputEl = document.getElementById("newAdminPassInput");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

const clone = (value) => JSON.parse(JSON.stringify(value));

function safeParse(jsonValue, fallback) {
  if (!jsonValue) return fallback;
  try {
    return JSON.parse(jsonValue);
  } catch {
    return fallback;
  }
}

function textValue(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function boolValue(value, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function normalizeItem(rawItem, fallbackItem, index) {
  const fallback = fallbackItem || {
    id: `item-${index + 1}`,
    title: `Prato ${index + 1}`,
    description: "Descricao do prato.",
    price: "R$ 0,00",
    image: "https://images.pexels.com/photos/1027810/pexels-photo-1027810.jpeg?auto=compress&cs=tinysrgb&w=1200"
  };

  return {
    id: textValue(rawItem?.id, fallback.id),
    title: textValue(rawItem?.title, fallback.title),
    description: textValue(rawItem?.description, fallback.description),
    price: textValue(rawItem?.price, fallback.price),
    image: textValue(rawItem?.image, fallback.image)
  };
}

function normalizeSiteData(rawData) {
  const base = clone(DEFAULT_SITE_DATA);
  if (!rawData || typeof rawData !== "object") return base;

  base.hero.badge = textValue(rawData.hero?.badge, base.hero.badge);
  base.hero.title = textValue(rawData.hero?.title, base.hero.title);
  base.hero.text = textValue(rawData.hero?.text, base.hero.text);

  base.featured.kicker = textValue(rawData.featured?.kicker, base.featured.kicker);
  base.featured.title = textValue(rawData.featured?.title, base.featured.title);
  base.featured.text = textValue(rawData.featured?.text, base.featured.text);
  base.featured.price = textValue(rawData.featured?.price, base.featured.price);

  base.promo.active = boolValue(rawData.promo?.active, base.promo.active);
  base.promo.badge = textValue(rawData.promo?.badge, base.promo.badge);
  base.promo.title = textValue(rawData.promo?.title, base.promo.title);
  base.promo.text = textValue(rawData.promo?.text, base.promo.text);
  base.promo.price = textValue(rawData.promo?.price, base.promo.price);

  base.contact.phoneLabel = textValue(rawData.contact?.phoneLabel, base.contact.phoneLabel);
  base.contact.whatsappDigits = textValue(rawData.contact?.whatsappDigits, base.contact.whatsappDigits);
  base.contact.address = textValue(rawData.contact?.address, base.contact.address);
  base.contact.instagram = textValue(rawData.contact?.instagram, base.contact.instagram);
  base.contact.printServiceUrl = textValue(rawData.contact?.printServiceUrl, base.contact.printServiceUrl);

  if (Array.isArray(rawData.menuItems) && rawData.menuItems.length > 0) {
    base.menuItems = rawData.menuItems.map((item, index) =>
      normalizeItem(item, DEFAULT_SITE_DATA.menuItems[index], index)
    );
  }

  return base;
}

function loadSiteData() {
  const saved = safeParse(localStorage.getItem(STORAGE_KEYS.siteData), null);
  return normalizeSiteData(saved);
}

function saveSiteData(data) {
  localStorage.setItem(STORAGE_KEYS.siteData, JSON.stringify(data));
}

function loadAdminCredentials() {
  const saved = safeParse(localStorage.getItem(STORAGE_KEYS.adminCreds), null);
  if (!saved || typeof saved !== "object") {
    return clone(DEFAULT_ADMIN_CREDS);
  }
  return {
    username: textValue(saved.username, DEFAULT_ADMIN_CREDS.username),
    password: textValue(saved.password, DEFAULT_ADMIN_CREDS.password)
  };
}

function saveAdminCredentials(credentials) {
  localStorage.setItem(STORAGE_KEYS.adminCreds, JSON.stringify(credentials));
}

function buildWhatsAppUrl(digits, message = "") {
  const cleanDigits = String(digits || "").replace(/\D/g, "");
  const baseUrl = `https://wa.me/${cleanDigits || "5511999990000"}`;
  if (!message) return baseUrl;
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

function parseBRLMoney(value) {
  const normalized = String(value || "")
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : 0;
}

function makePrintPayload(customer, item) {
  const amount = parseBRLMoney(item?.price);
  const modifiers = [];

  if (customer.note) {
    modifiers.push(`Referencia: ${customer.note}`);
  }
  if (customer.phone) {
    modifiers.push(`Telefone: ${customer.phone}`);
  }
  if (customer.address) {
    modifiers.push(`Endereço: ${customer.address}`);
  }
  if (customer.payment) {
    modifiers.push(`Pagamento: ${customer.payment}`);
  }

  return {
    customerName: customer.name,
    customerPhone: customer.phone,
    customerAddress: customer.address,
    paymentMethod: customer.payment,
    note: customer.note,
    items: [
      {
        name: item?.title || "Prato",
        quantity: 1,
        price: amount,
        modifiers
      }
    ],
    total: amount
  };
}

async function parseJsonSafe(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function resolvePrintUrl() {
  const configuredBase = textValue(siteData.contact.printServiceUrl, "").trim().replace(/\/+$/, "");
  if (configuredBase) {
    return `${configuredBase}/print`;
  }

  if (window.location.protocol === "http:" || window.location.protocol === "https:") {
    return `${window.location.origin}/print`;
  }

  return "http://localhost:3000/print";
}

function resolveFallbackPrintUrl(primaryUrl) {
  if (!(window.location.protocol === "http:" || window.location.protocol === "https:")) {
    return "http://localhost:3000/print";
  }
  const originFallback = `${window.location.origin}/print`;
  return originFallback === primaryUrl ? "" : originFallback;
}

function printTicketWithBrowser(orderCode, selectedItem, customer) {
  const now = new Date().toLocaleString("pt-BR");
  const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Pedido ${orderCode}</title>
  <style>
    body{font-family:Consolas,Monaco,monospace;padding:14px;max-width:320px}
    h1{font-size:18px;margin:0 0 8px}
    p{margin:3px 0;font-size:13px}
    .line{border-top:1px dashed #000;margin:8px 0}
  </style>
</head>
<body>
  <h1>REI DO FRANGO</h1>
  <p>PEDIDO: ${orderCode}</p>
  <p>DATA: ${now}</p>
  <div class="line"></div>
  <p>CLIENTE: ${customer.name || "-"}</p>
  <p>FONE: ${customer.phone || "-"}</p>
  <p>ENDEREÇO: ${customer.address || "-"}</p>
  <p>PAGAMENTO: ${customer.payment || "-"}</p>
  ${customer.note ? `<p>OBS: ${customer.note}</p>` : ""}
  <div class="line"></div>
  <p>1x ${selectedItem.title}</p>
  <p>VALOR: ${selectedItem.price}</p>
  <div class="line"></div>
  <p>OBRIGADO!</p>
  <script>window.print();<\/script>
</body>
</html>`;

  const printWindow = window.open("", "_blank", "width=420,height=680");
  if (!printWindow) {
    return false;
  }
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  return true;
}

async function submitPrintRequest(printUrl, printPayload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  const response = await fetch(printUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(printPayload),
    signal: controller.signal
  }).finally(() => clearTimeout(timeout));

  const payload = await parseJsonSafe(response);
  if (!response.ok) {
    const details = payload?.error || payload?.details || payload?.message || `Erro HTTP ${response.status}`;
    throw new Error(details);
  }

  return payload;
}

function observeRevealElements(scope = document) {
  scope.querySelectorAll(".reveal").forEach((element) => {
    if (!element.classList.contains("show")) {
      revealObserver.observe(element);
    }
  });
}

let siteData = loadSiteData();
let adminCredentials = loadAdminCredentials();
let adminAuthenticated = sessionStorage.getItem(STORAGE_KEYS.adminSession) === "1";

function renderHero() {
  heroBadgeEl.textContent = siteData.hero.badge;
  heroTitleEl.textContent = siteData.hero.title;
  heroTextEl.textContent = siteData.hero.text;

  featuredKickerEl.textContent = siteData.featured.kicker;
  featuredTitleEl.textContent = siteData.featured.title;
  featuredTextEl.textContent = siteData.featured.text;
  featuredPriceEl.textContent = siteData.featured.price;
}

function renderPromotion() {
  promoBadgeEl.textContent = siteData.promo.badge;
  promoTitleEl.textContent = siteData.promo.title;
  promoTextEl.textContent = siteData.promo.text;
  promoPriceEl.textContent = siteData.promo.price;
  promoSectionEl.hidden = !siteData.promo.active;
}

function renderContact() {
  contactPhoneEl.textContent = siteData.contact.phoneLabel;
  contactAddressEl.textContent = siteData.contact.address;
  contactInstagramEl.textContent = siteData.contact.instagram;
  contactWhatsLinkEl.href = buildWhatsAppUrl(siteData.contact.whatsappDigits);
}

function buildDishCard(item, index) {
  const article = document.createElement("article");
  article.className = "dish reveal";
  if (index % 3 === 1) article.classList.add("delay-1");
  if (index % 3 === 2) article.classList.add("delay-2");

  const image = document.createElement("img");
  image.src = item.image;
  image.alt = item.title;
  image.loading = "lazy";
  article.appendChild(image);

  const body = document.createElement("div");
  body.className = "dish-body";

  const title = document.createElement("h3");
  title.textContent = item.title;
  body.appendChild(title);

  const description = document.createElement("p");
  description.textContent = item.description;
  body.appendChild(description);

  const footer = document.createElement("div");
  footer.className = "dish-footer";

  const price = document.createElement("span");
  price.textContent = item.price;
  footer.appendChild(price);

  const chooseBtn = document.createElement("button");
  chooseBtn.type = "button";
  chooseBtn.className = "btn btn-dark choose-item";
  chooseBtn.dataset.itemId = item.id;
  chooseBtn.textContent = "Escolher";
  footer.appendChild(chooseBtn);

  body.appendChild(footer);
  article.appendChild(body);
  return article;
}

function renderMenu() {
  menuGridEl.innerHTML = "";
  siteData.menuItems.forEach((item, index) => {
    const card = buildDishCard(item, index);
    menuGridEl.appendChild(card);
  });
  observeRevealElements(menuGridEl);
}

function fillOrderSelect() {
  if (!orderItemEl) return;
  const selectedValue = orderItemEl.value;
  orderItemEl.innerHTML = "";

  siteData.menuItems.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = `${item.title} - ${item.price}`;
    if (selectedValue) {
      option.selected = selectedValue === item.id;
    } else if (index === 0) {
      option.selected = true;
    }
    orderItemEl.appendChild(option);
  });
}

function renderSite() {
  renderHero();
  renderPromotion();
  renderContact();
  renderMenu();
  fillOrderSelect();
}

function createOrderCode() {
  const stamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 90 + 10);
  return `RF-${stamp}${random}`;
}

function loadCustomerData() {
  const savedCustomer = safeParse(localStorage.getItem(STORAGE_KEYS.customer), null);
  if (!savedCustomer || typeof savedCustomer !== "object") return;

  if (customerNameEl) customerNameEl.value = textValue(savedCustomer.name, "");
  if (customerPhoneEl) customerPhoneEl.value = textValue(savedCustomer.phone, "");
  if (customerAddressEl) customerAddressEl.value = textValue(savedCustomer.address, "");
  if (customerNoteEl) customerNoteEl.value = textValue(savedCustomer.note, "");
  const savedPayment = textValue(savedCustomer.payment, "");
  if (savedPayment && orderPaymentEl) {
    orderPaymentEl.value = savedPayment;
  }
}

function setOrderItem(itemId) {
  const exists = siteData.menuItems.some((item) => item.id === itemId);
  if (!exists) return;
  window.location.href = `checkout.html?item=${encodeURIComponent(itemId)}`;
}

function setAdminStatus(message, isError = false) {
  adminEditorStatusEl.textContent = message;
  adminEditorStatusEl.classList.toggle("error", isError);
}

function setAdminLoginStatus(message, isError = false) {
  adminLoginStatusEl.textContent = message;
  adminLoginStatusEl.classList.toggle("error", isError);
}

function populateAdminItemEditor() {
  adminItemsEditorEl.innerHTML = "";

  siteData.menuItems.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "admin-item";
    wrapper.dataset.itemIndex = String(index);

    const header = document.createElement("div");
    header.className = "admin-item-head";

    const heading = document.createElement("h4");
    heading.textContent = `Prato ${index + 1}`;
    header.appendChild(heading);

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "admin-remove-item";
    removeBtn.textContent = "Remover";
    removeBtn.dataset.removeIndex = String(index);
    header.appendChild(removeBtn);

    wrapper.appendChild(header);

    const fields = [
      { label: "ID interno", key: "id" },
      { label: "Titulo", key: "title" },
      { label: "Descricao", key: "description", multiline: true },
      { label: "Preco", key: "price" },
      { label: "URL da imagem", key: "image" }
    ];

    fields.forEach((field) => {
      const label = document.createElement("label");
      label.textContent = field.label;
      label.dataset.field = field.key;

      const input = field.multiline ? document.createElement("textarea") : document.createElement("input");
      if (!field.multiline) {
        input.type = "text";
      } else {
        input.rows = 2;
      }

      input.dataset.field = field.key;
      input.value = textValue(item[field.key], "");
      label.appendChild(input);
      wrapper.appendChild(label);
    });

    adminItemsEditorEl.appendChild(wrapper);
  });
}

function populateAdminForm() {
  heroBadgeInputEl.value = siteData.hero.badge;
  heroTitleInputEl.value = siteData.hero.title;
  heroTextInputEl.value = siteData.hero.text;

  featuredKickerInputEl.value = siteData.featured.kicker;
  featuredTitleInputEl.value = siteData.featured.title;
  featuredTextInputEl.value = siteData.featured.text;
  featuredPriceInputEl.value = siteData.featured.price;

  promoActiveInputEl.checked = Boolean(siteData.promo.active);
  promoBadgeInputEl.value = siteData.promo.badge;
  promoTitleInputEl.value = siteData.promo.title;
  promoTextInputEl.value = siteData.promo.text;
  promoPriceInputEl.value = siteData.promo.price;

  contactPhoneInputEl.value = siteData.contact.phoneLabel;
  contactNumberInputEl.value = siteData.contact.whatsappDigits;
  contactAddressInputEl.value = siteData.contact.address;
  contactInstagramInputEl.value = siteData.contact.instagram;
  printServiceUrlInputEl.value = siteData.contact.printServiceUrl;

  newAdminUserInputEl.value = "";
  newAdminPassInputEl.value = "";

  populateAdminItemEditor();
}

function openAdmin() {
  adminOverlayEl.classList.add("open");
  adminOverlayEl.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");

  if (adminAuthenticated) {
    adminLoginViewEl.hidden = true;
    adminEditorViewEl.hidden = false;
    populateAdminForm();
    setAdminStatus("");
  } else {
    adminLoginViewEl.hidden = false;
    adminEditorViewEl.hidden = true;
    adminLoginFormEl.reset();
    setAdminLoginStatus("");
    adminUserInputEl.focus();
  }
}

function closeAdmin() {
  adminOverlayEl.classList.remove("open");
  adminOverlayEl.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function toggleAdmin() {
  if (adminOverlayEl.classList.contains("open")) {
    closeAdmin();
  } else {
    openAdmin();
  }
}

function collectAdminItemsFromForm() {
  const wrappers = adminItemsEditorEl.querySelectorAll(".admin-item");
  const items = [];

  wrappers.forEach((wrapper, index) => {
    const id = textValue(wrapper.querySelector('[data-field="id"]')?.value, "").trim();
    const title = textValue(wrapper.querySelector('[data-field="title"]')?.value, "").trim();
    const description = textValue(wrapper.querySelector('[data-field="description"]')?.value, "").trim();
    const price = textValue(wrapper.querySelector('[data-field="price"]')?.value, "").trim();
    const image = textValue(wrapper.querySelector('[data-field="image"]')?.value, "").trim();

    items.push(
      normalizeItem(
        {
          id: id || `item-${Date.now()}-${index}`,
          title: title || `Prato ${index + 1}`,
          description: description || "Descricao do prato.",
          price: price || "R$ 0,00",
          image: image || DEFAULT_SITE_DATA.menuItems[0].image
        },
        DEFAULT_SITE_DATA.menuItems[index],
        index
      )
    );
  });

  return items;
}

function updateAdminCredentialsIfNeeded() {
  const nextUser = textValue(newAdminUserInputEl.value, "").trim();
  const nextPass = textValue(newAdminPassInputEl.value, "").trim();

  if (!nextUser && !nextPass) return;

  const updatedCredentials = {
    username: nextUser || adminCredentials.username,
    password: nextPass || adminCredentials.password
  };

  adminCredentials = updatedCredentials;
  saveAdminCredentials(updatedCredentials);
}

function setupMenuBehavior() {
  menuGridEl.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest(".choose-item");
    if (!button) return;

    const itemId = button.dataset.itemId;
    if (!itemId) return;
    setOrderItem(itemId);
  });

  if (featuredChooseBtn) {
    featuredChooseBtn.addEventListener("click", () => {
      if (siteData.menuItems.length === 0) return;
      setOrderItem(siteData.menuItems[0].id);
    });
  }
}

function setupHeaderMenu() {
  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupOrderForm() {
  orderFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const customer = {
      name: textValue(customerNameEl.value, "").trim(),
      phone: textValue(customerPhoneEl.value, "").trim(),
      address: textValue(customerAddressEl.value, "").trim(),
      note: textValue(customerNoteEl.value, "").trim(),
      payment: textValue(orderPaymentEl.value, "").trim()
    };

    localStorage.setItem(STORAGE_KEYS.customer, JSON.stringify(customer));

    const selectedItem = siteData.menuItems.find((item) => item.id === orderItemEl.value) || siteData.menuItems[0];
    const printPayload = makePrintPayload(customer, selectedItem);
    const printUrl = resolvePrintUrl();
    const fallbackPrintUrl = resolveFallbackPrintUrl(printUrl);

    orderStatusEl.textContent = "Enviando pedido para impressao...";

    try {
      let payload;
      try {
        payload = await submitPrintRequest(printUrl, printPayload);
      } catch (error) {
        const message = error instanceof Error ? error.message : "";
        if (fallbackPrintUrl && message.toLowerCase().includes("failed to fetch")) {
          payload = await submitPrintRequest(fallbackPrintUrl, printPayload);
        } else {
          throw error;
        }
      }

      const etaMinutes = 25 + Math.floor(Math.random() * 20);
      const etaClock = new Date(Date.now() + etaMinutes * 60000).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      });
      const orderCode = textValue(payload?.orderId, createOrderCode());

      receiptCodeEl.textContent = orderCode;
      receiptItemEl.textContent = `${selectedItem.title} (${selectedItem.price})`;
      receiptPaymentEl.textContent = customer.payment || "Nao informado";
      receiptEtaEl.textContent = `${etaMinutes} min (aprox. ${etaClock})`;
      orderReceiptEl.hidden = false;
      orderStatusEl.textContent = "Pedido enviado para impressao com sucesso.";
    } catch (error) {
      const fallbackOrderCode = createOrderCode();
      const printed = printTicketWithBrowser(fallbackOrderCode, selectedItem, customer);
      receiptCodeEl.textContent = fallbackOrderCode;
      receiptItemEl.textContent = `${selectedItem.title} (${selectedItem.price})`;
      receiptPaymentEl.textContent = customer.payment || "Nao informado";
      receiptEtaEl.textContent = "Pedido local (impressao pelo navegador)";
      orderReceiptEl.hidden = false;

      const message = error instanceof Error ? error.message : "Falha inesperada de impressao";
      if (message.toLowerCase().includes("failed to fetch")) {
        orderStatusEl.textContent = printed
          ? "Servico de impressao offline. Ticket aberto na impressao do navegador."
          : "Servico de impressao offline e popup bloqueado. Permita popups para imprimir.";
      } else {
        orderStatusEl.textContent = printed
          ? `Impressao local do navegador acionada. Motivo do servico: ${message}`
          : `Falha no servico e popup bloqueado: ${message}`;
      }
    }
  });
}

function setupAdminEvents() {
  document.addEventListener("keydown", (event) => {
    const targetTag = event.target && "tagName" in event.target ? String(event.target.tagName).toLowerCase() : "";
    if (["input", "textarea", "select"].includes(targetTag)) return;

    if (event.key === "]" || event.code === "BracketRight") {
      event.preventDefault();
      toggleAdmin();
    }
  });

  adminCloseBtn.addEventListener("click", closeAdmin);
  adminOverlayEl.addEventListener("click", (event) => {
    if (event.target === adminOverlayEl) {
      closeAdmin();
    }
  });

  adminLoginFormEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = textValue(adminUserInputEl.value, "").trim();
    const password = textValue(adminPassInputEl.value, "").trim();

    if (username === adminCredentials.username && password === adminCredentials.password) {
      adminAuthenticated = true;
      sessionStorage.setItem(STORAGE_KEYS.adminSession, "1");
      adminLoginViewEl.hidden = true;
      adminEditorViewEl.hidden = false;
      populateAdminForm();
      setAdminLoginStatus("");
      setAdminStatus("Login efetuado.");
      return;
    }

    setAdminLoginStatus("Usuario ou senha invalidos.", true);
  });

  addDishBtnEl.addEventListener("click", () => {
    siteData.menuItems.push(
      normalizeItem(
        {
          id: `item-${Date.now()}`,
          title: "Novo prato",
          description: "Descreva este prato.",
          price: "R$ 0,00",
          image: DEFAULT_SITE_DATA.menuItems[0].image
        },
        null,
        siteData.menuItems.length
      )
    );
    populateAdminItemEditor();
    setAdminStatus("Novo prato adicionado. Preencha os campos e salve.");
  });

  adminItemsEditorEl.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest(".admin-remove-item");
    if (!button) return;
    const index = Number(button.dataset.removeIndex);
    if (Number.isNaN(index)) return;

    if (siteData.menuItems.length <= 1) {
      setAdminStatus("Mantenha pelo menos um prato no cardápio.", true);
      return;
    }

    siteData.menuItems.splice(index, 1);
    populateAdminItemEditor();
    setAdminStatus("Prato removido. Clique em salvar para aplicar no site.");
  });

  adminFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    siteData.hero.badge = textValue(heroBadgeInputEl.value, siteData.hero.badge).trim();
    siteData.hero.title = textValue(heroTitleInputEl.value, siteData.hero.title).trim();
    siteData.hero.text = textValue(heroTextInputEl.value, siteData.hero.text).trim();

    siteData.featured.kicker = textValue(featuredKickerInputEl.value, siteData.featured.kicker).trim();
    siteData.featured.title = textValue(featuredTitleInputEl.value, siteData.featured.title).trim();
    siteData.featured.text = textValue(featuredTextInputEl.value, siteData.featured.text).trim();
    siteData.featured.price = textValue(featuredPriceInputEl.value, siteData.featured.price).trim();

    siteData.promo.active = promoActiveInputEl.checked;
    siteData.promo.badge = textValue(promoBadgeInputEl.value, siteData.promo.badge).trim();
    siteData.promo.title = textValue(promoTitleInputEl.value, siteData.promo.title).trim();
    siteData.promo.text = textValue(promoTextInputEl.value, siteData.promo.text).trim();
    siteData.promo.price = textValue(promoPriceInputEl.value, siteData.promo.price).trim();

    siteData.contact.phoneLabel = textValue(contactPhoneInputEl.value, siteData.contact.phoneLabel).trim();
    siteData.contact.whatsappDigits = textValue(contactNumberInputEl.value, siteData.contact.whatsappDigits).replace(/\D/g, "");
    siteData.contact.address = textValue(contactAddressInputEl.value, siteData.contact.address).trim();
    siteData.contact.instagram = textValue(contactInstagramInputEl.value, siteData.contact.instagram).trim();
    siteData.contact.printServiceUrl = textValue(printServiceUrlInputEl.value, siteData.contact.printServiceUrl).trim();

    siteData.menuItems = collectAdminItemsFromForm();

    updateAdminCredentialsIfNeeded();
    saveSiteData(siteData);
    renderSite();
    setAdminStatus("Alteracoes salvas e publicadas no site.");
  });

  resetSiteBtnEl.addEventListener("click", () => {
    siteData = clone(DEFAULT_SITE_DATA);
    saveSiteData(siteData);
    renderSite();
    populateAdminForm();
    setAdminStatus("Site restaurado para o padrao.");
  });

  adminLogoutBtnEl.addEventListener("click", () => {
    adminAuthenticated = false;
    sessionStorage.removeItem(STORAGE_KEYS.adminSession);
    adminEditorViewEl.hidden = true;
    adminLoginViewEl.hidden = false;
    adminLoginFormEl.reset();
    setAdminStatus("");
    setAdminLoginStatus("Sessao encerrada.");
  });
}

function bootstrap() {
  setupHeaderMenu();
  setupMenuBehavior();
  if (hasInlineOrderForm) setupOrderForm();
  setupAdminEvents();
  renderSite();
  loadCustomerData();
  observeRevealElements();
}

bootstrap();
