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

document.getElementById('year').textContent = new Date().getFullYear();
