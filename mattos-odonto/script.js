const header = document.querySelector('.site-header');
const nav = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.querySelector('.back-to-top');
const yearElement = document.getElementById('current-year');
const mobileMenuQuery = window.matchMedia('(max-width: 1080px)');

if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
}

function setMenuState(isOpen) {
    if (!menuToggle || !nav) return;
    nav.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen && mobileMenuQuery.matches);
}

function closeMenu() {
    setMenuState(false);
}

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        setMenuState(!nav.classList.contains('open'));
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    document.addEventListener('click', (event) => {
        if (!nav.classList.contains('open')) return;
        const target = event.target;
        if (!(target instanceof Node)) return;
        if (nav.contains(target) || menuToggle.contains(target)) return;
        closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    const handleMenuViewportChange = () => {
        if (!mobileMenuQuery.matches) {
            closeMenu();
        }
    };

    if (typeof mobileMenuQuery.addEventListener === 'function') {
        mobileMenuQuery.addEventListener('change', handleMenuViewportChange);
    } else if (typeof mobileMenuQuery.addListener === 'function') {
        mobileMenuQuery.addListener(handleMenuViewportChange);
    }
}

function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const headerOffset = header ? header.offsetHeight + 8 : 0;
    const elementTop = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
        top: Math.max(elementTop - headerOffset, 0),
        behavior: 'smooth'
    });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        event.preventDefault();
        smoothScrollTo(href);
        closeMenu();
    });
});

function updateHeaderState() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 16);
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const checkpoint = window.scrollY + (header ? header.offsetHeight + 30 : 30);

    let currentId = '';

    sections.forEach((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (checkpoint >= top && checkpoint < bottom) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
}

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function updateBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle('visible', window.scrollY > 500);
}

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
    });
}, { threshold: 0.12 });

revealElements.forEach((element) => {
    const delay = Number(element.dataset.delay || 0);
    if (delay > 0) {
        element.style.transitionDelay = `${delay}ms`;
    }
    revealObserver.observe(element);
});

const counters = document.querySelectorAll('[data-counter]');

function runCounter(counter) {
    const target = Number(counter.dataset.counter || 0);
    const duration = 1300;
    const start = performance.now();

    function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * eased);
        counter.textContent = target >= 1000 ? `${current}+` : `${current}`;

        if (progress < 1) {
            window.requestAnimationFrame(frame);
        } else {
            counter.textContent = target >= 1000 ? `${target}+` : `${target}`;
        }
    }

    window.requestAnimationFrame(frame);
}

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        observer.unobserve(entry.target);
    });
}, { threshold: 0.7 });

counters.forEach((counter) => counterObserver.observe(counter));

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox ? lightbox.querySelector('img') : null;
const lightboxCaption = lightbox ? lightbox.querySelector('.lightbox-caption') : null;
const lightboxCloseButton = lightbox ? lightbox.querySelector('.lightbox-close') : null;

function closeLightbox() {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
        lightboxImage.src = '';
    }, 220);
}

if (lightbox && lightboxImage && lightboxCaption) {
    document.querySelectorAll('[data-lightbox]').forEach((card) => {
        card.addEventListener('click', () => {
            const imageSrc = card.getAttribute('data-lightbox');
            const caption = card.getAttribute('data-caption') || '';
            if (!imageSrc) return;

            lightboxImage.src = imageSrc;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('open');
            lightbox.setAttribute('aria-hidden', 'false');
        });
    });

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    if (lightboxCloseButton) {
        lightboxCloseButton.addEventListener('click', closeLightbox);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    });
}

const whatsappForm = document.getElementById('whatsapp-form');

if (whatsappForm) {
    whatsappForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = (document.getElementById('nome')?.value || '').trim();
        const mensagem = (document.getElementById('mensagem')?.value || '').trim();

        if (!nome || !mensagem) {
            return;
        }

        const text = `Olá! Meu nome é ${nome}. ${mensagem}`;
        const url = `https://wa.me/5512991855969?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        whatsappForm.reset();
    });
}

const heroPanel = document.querySelector('.hero-panel');

if (heroPanel && window.matchMedia('(pointer: fine)').matches) {
    heroPanel.addEventListener('mousemove', (event) => {
        const rect = heroPanel.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 5;
        const rotateX = (0.5 - (y / rect.height)) * 4;

        heroPanel.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroPanel.addEventListener('mouseleave', () => {
        heroPanel.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
}

function onScroll() {
    updateHeaderState();
    updateActiveLink();
    updateBackToTop();
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('load', onScroll);
onScroll();
