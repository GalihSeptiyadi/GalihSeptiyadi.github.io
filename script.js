/* ==============================
   DARK MODE
================================ */
const html = document.documentElement;
const darkToggle = document.getElementById('darkToggle');
const toggleIcon = darkToggle.querySelector('.toggle-icon');

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
toggleIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

darkToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  toggleIcon.textContent = next === 'dark' ? '☀️' : '🌙';
});

/* ==============================
   HAMBURGER & SIDEBAR
================================ */
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);
sidebarLinks.forEach(link => link.addEventListener('click', closeSidebar));

/* ==============================
   NAVBAR SCROLL SHADOW
================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ==============================
   ACTIVE NAV LINK ON SCROLL
================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const sidebarNavLinks = document.querySelectorAll('.sidebar-link');

function updateActiveNav() {
  const scrollY = window.scrollY;
  let currentId = '';

  sections.forEach(section => {
    const top = section.offsetTop - 80;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      currentId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
  sidebarNavLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ==============================
   ACCORDION
================================ */
const triggers = document.querySelectorAll('.accordion-trigger');

triggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const targetId = trigger.getAttribute('data-target');
    const body = document.getElementById(targetId);
    const item = trigger.closest('.accordion-item');
    const isOpen = item.classList.contains('open');

    // Tutup semua dalam grid yang sama
    const parentGrid = trigger.closest('.accordion-grid');
    parentGrid.querySelectorAll('.accordion-item.open').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        const openBody = openItem.querySelector('.accordion-body');
        if (openBody) openBody.classList.remove('open');
      }
    });

    // Toggle yang diklik
    item.classList.toggle('open', !isOpen);
    if (body) body.classList.toggle('open', !isOpen);
  });
});

/* ==============================
   SKILL BAR ANIMATION
================================ */
const skillFills = document.querySelectorAll('.skill-fill');
let skillAnimated = false;

function animateSkills() {
  const tentangSection = document.getElementById('tentang');
  if (!tentangSection || skillAnimated) return;

  const rect = tentangSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.8) {
    skillAnimated = true;
    skillFills.forEach(fill => {
      const w = fill.getAttribute('data-w');
      fill.style.width = w + '%';
    });
  }
}

window.addEventListener('scroll', animateSkills, { passive: true });
animateSkills();

/* ==============================
   FADE IN ON SCROLL
================================ */
const fadeEls = document.querySelectorAll(
  '.accordion-item, .about-desc-card, .info-card, .hero-badge, .hero-stats, .stat-item'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

/* ==============================
   SMOOTH SCROLL (fallback)
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = target.offsetTop - (parseInt(getComputedStyle(html).getPropertyValue('--nav-h')) || 64);
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});