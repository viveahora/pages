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

// Meta Pixel – CTA Button Tracking
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', () => {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'InitiateCheckout');
    }
    sendCAPIEvent('InitiateCheckout');
  });
});

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

// PageView via CAPI beim Laden
sendCAPIEvent('PageView');
