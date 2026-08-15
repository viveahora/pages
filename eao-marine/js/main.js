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

// Feature panel toggle (Warum EAO für den Marine-Markt?)
const featureToggle = document.getElementById('featureToggle');
const featureBody = document.getElementById('featureBody');
featureToggle.addEventListener('click', () => {
  featureBody.style.display = featureBody.style.display === 'none' ? 'grid' : 'none';
});

// Contact form (client-side mock — no backend wired up yet)
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formSuccess.classList.add('show');
  contactForm.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
