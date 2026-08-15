// Sprachumschalter DE/EN
// Elemente mit [data-de] tragen das deutsche HTML-Fragment; das englische
// Original wird beim ersten Durchlauf automatisch in [data-en] gesichert.
// [data-de-alt] / [data-de-aria-label] behandeln alt- bzw. aria-label-Attribute
// separat, da diese nicht Teil von innerHTML sind.
const LANG_STORAGE_KEY = 'eaoMarineLang';
const langToggle = document.getElementById('langToggle');

function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-de]').forEach((el) => {
    // title/meta werden unten separat behandelt (innerHTML ist für beide ungeeignet:
    // bei <title> Entity-Escaping-Problem, bei <meta> ohnehin immer leer/kein Content)
    if (el.tagName === 'TITLE' || el.tagName === 'META') return;
    if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
    el.innerHTML = lang === 'de' ? el.dataset.de : el.dataset.en;
  });

  document.querySelectorAll('[data-de-alt]').forEach((el) => {
    if (el.dataset.enAlt === undefined) el.dataset.enAlt = el.getAttribute('alt') || '';
    el.setAttribute('alt', lang === 'de' ? el.dataset.deAlt : el.dataset.enAlt);
  });

  document.querySelectorAll('[data-de-aria-label]').forEach((el) => {
    if (el.dataset.enAriaLabel === undefined) el.dataset.enAriaLabel = el.getAttribute('aria-label') || '';
    el.setAttribute('aria-label', lang === 'de' ? el.dataset.deAriaLabel : el.dataset.enAriaLabel);
  });

  const titleEl = document.querySelector('title[data-de]');
  if (titleEl) {
    if (titleEl.dataset.en === undefined) titleEl.dataset.en = titleEl.textContent;
    titleEl.textContent = lang === 'de' ? titleEl.dataset.de : titleEl.dataset.en;
  }

  const metaDesc = document.querySelector('meta[name="description"][data-de]');
  if (metaDesc) {
    if (metaDesc.dataset.en === undefined) metaDesc.dataset.en = metaDesc.getAttribute('content') || '';
    metaDesc.setAttribute('content', lang === 'de' ? metaDesc.dataset.de : metaDesc.dataset.en);
  }

  if (langToggle) {
    langToggle.textContent = lang === 'de' ? 'EN' : 'DE';
    langToggle.setAttribute('aria-label', lang === 'de' ? 'Switch language to English' : 'Switch language to German');
  }

  setYear(); // die im Footer per innerHTML ersetzte #year-Span neu befüllen
  localStorage.setItem(LANG_STORAGE_KEY, lang);
}

let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || 'en';
if (langToggle) {
  langToggle.addEventListener('click', (e) => {
    e.preventDefault();
    currentLang = currentLang === 'en' ? 'de' : 'en';
    applyLanguage(currentLang);
  });
}
applyLanguage(currentLang);

// Hero-Slider: Cross-Fade + Ken-Burns, wechselt automatisch alle 6s
const heroSlides = document.querySelectorAll('#heroSlider .hero-slide');
if (heroSlides.length > 1) {
  let heroIndex = 0;
  setInterval(() => {
    const current = heroSlides[heroIndex];
    heroIndex = (heroIndex + 1) % heroSlides.length;
    const next = heroSlides[heroIndex];

    current.classList.remove('active');

    // Ken-Burns-Animation für den neuen Slide von vorn starten
    next.style.animation = 'none';
    void next.offsetWidth; // reflow erzwingen
    next.style.animation = '';
    next.classList.add('active');
  }, 6000);
}

// "Why EAO"-Video: startet automatisch, sobald der Bereich sichtbar wird
const whyEaoVideo = document.getElementById('whyEaoVideo');
if (whyEaoVideo) {
  const whyEaoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) whyEaoVideo.play();
      else whyEaoVideo.pause();
    });
  }, { threshold: 0.4 });
  whyEaoObserver.observe(whyEaoVideo);
}

// Referenzen-Video: Play/Pause per Custom-Button
const videoTile = document.getElementById('videoTile');
const marineVideo = document.getElementById('marineVideo');
const videoPlayBtn = document.getElementById('videoPlayBtn');
if (videoTile && marineVideo && videoPlayBtn) {
  videoPlayBtn.addEventListener('click', () => {
    if (marineVideo.paused) marineVideo.play();
    else marineVideo.pause();
  });
  marineVideo.addEventListener('play', () => videoTile.classList.add('playing'));
  marineVideo.addEventListener('pause', () => videoTile.classList.remove('playing'));
  marineVideo.addEventListener('ended', () => videoTile.classList.remove('playing'));
}

// Mobile Nav Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// FAQ Accordion (one open at a time)
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Contact form (client-side mock — no backend wired up yet)
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formSuccess.classList.add('show');
  contactForm.reset();
});
