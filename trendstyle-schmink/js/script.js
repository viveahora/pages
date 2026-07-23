// Image Slider
const slider = document.querySelector('.slider');
if (slider) {
  const track = slider.querySelector('.slider-track');
  const dots = slider.querySelectorAll('.dot');
  const slides = slider.querySelectorAll('.slide');
  let current = 0;
  let autoplay;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[current].classList.add('active');
  }

  slider.querySelector('.prev').addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
  slider.querySelector('.next').addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });
  dots.forEach(dot => dot.addEventListener('click', () => { goTo(+dot.dataset.index); resetAutoplay(); }));

  // Touch/Swipe
  let startX = 0;
  slider.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); resetAutoplay(); }
  });

  function resetAutoplay() { clearInterval(autoplay); autoplay = setInterval(() => goTo(current + 1), 4000); }
  resetAutoplay();
}

// Accordion FAQ
document.querySelectorAll('.accordion-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.accordion-trigger').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.classList.add('open');
    }
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('section > .container > *').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ═══════════════════════════════════════
// COOKIE CONSENT & TRACKING
// ═══════════════════════════════════════

const CONSENT_KEY = 'ts_cookie_consent';

function hasConsent() {
  return localStorage.getItem(CONSENT_KEY) === 'accepted';
}

function loadMetaPixel() {
  if (typeof fbq !== 'undefined') return;
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '453746324141769');
  fbq('track', 'PageView');
  sendCAPIEvent('PageView');
}

function initTracking() {
  loadMetaPixel();

  // CTA Button Tracking
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof fbq !== 'undefined') fbq('track', 'InitiateCheckout');
      sendCAPIEvent('InitiateCheckout');
    });
  });
}

// Cookie Banner
const banner = document.getElementById('cookie-banner');

function hideBanner() {
  if (banner) banner.classList.add('hidden');
}

if (hasConsent()) {
  hideBanner();
  initTracking();
} else if (localStorage.getItem(CONSENT_KEY) === 'declined') {
  hideBanner();
} else {
  // Banner anzeigen
  document.getElementById('cookie-accept').addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    hideBanner();
    initTracking();
  });

  document.getElementById('cookie-decline').addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    hideBanner();
  });
}

// "Cookies verwalten" Link im Footer
const cookieReset = document.getElementById('cookie-reset');
if (cookieReset) {
  cookieReset.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem(CONSENT_KEY);
    if (banner) banner.classList.remove('hidden');
  });
}

// CAPI – serverseitiges Event senden
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : undefined;
}

function sendCAPIEvent(eventName) {
  fetch('/.netlify/functions/meta-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventName,
      sourceUrl: window.location.href,
      clientUserAgent: navigator.userAgent,
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc'),
    }),
  }).catch(() => {});
}
