// ===== AÑO DINÁMICO EN FOOTER =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== MENÚ MÓVIL =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== EFECTO TYPING EN HERO =====
const typingElement = document.querySelector('.typing');
const phrases = [
  'Full Stack Developer.',
  'Mobile Developer.',
  'Game Developer.',
  'UI/UX Designer.'
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingElement.textContent = currentPhrase.substring(0, charIndex--);
  } else {
    typingElement.textContent = currentPhrase.substring(0, charIndex++);
  }

  let speed = isDeleting ? 45 : 90;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}
typeEffect();

// ===== FILTRO DE PROYECTOS =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.45s ease';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== REVEAL AL SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll(
  '.section-title, .about-grid, .stack-card, .timeline-item, .project-card, .edu-card, .contact-text, .contact-links'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 6) * 0.06}s`;
  observer.observe(el);
});

// ===== SCROLL SUAVE CON OFFSET PARA NAVBAR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
