/* ===================================================
   HAMBURGER MENU
   =================================================== */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Tutup menu saat link diklik (mobile)
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

/* ===================================================
   DARK / LIGHT MODE TOGGLE
   =================================================== */
const themeToggle = document.getElementById('theme-toggle');
const htmlEl      = document.documentElement;

// Cek preferensi tema yang tersimpan
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlEl.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ===================================================
   MODAL FOTO PROFIL
   =================================================== */
const profilePhoto = document.getElementById('profile-photo');
const photoModal   = document.getElementById('photo-modal');
const modalClose   = document.getElementById('modal-close');

// Buka modal saat foto diklik
profilePhoto.addEventListener('click', () => {
  photoModal.classList.add('active');
  photoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // cegah scroll saat modal terbuka
});

// Tutup modal dengan tombol ×
modalClose.addEventListener('click', closeModal);

// Tutup modal saat klik area luar (overlay)
photoModal.addEventListener('click', (e) => {
  if (e.target === photoModal) closeModal();
});

// Tutup modal dengan tombol Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && photoModal.classList.contains('active')) {
    closeModal();
  }
});

function closeModal() {
  photoModal.classList.remove('active');
  photoModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ===================================================
   EXPAND / COLLAPSE CARDS (Tugas & Materi)
   =================================================== */
document.querySelectorAll('.card-header').forEach(header => {
  header.addEventListener('click', () => toggleCard(header));

  // Aksesibilitas: Enter dan Space untuk keyboard
  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCard(header);
    }
  });
});

function toggleCard(header) {
  const card     = header.closest('.expand-card');
  const isOpen   = card.classList.contains('open');

  // Tutup semua card yang terbuka (opsional: hapus blok ini jika ingin multi-open)
  document.querySelectorAll('.expand-card.open').forEach(c => {
    c.classList.remove('open');
    c.querySelector('.card-header').setAttribute('aria-expanded', 'false');
  });

  // Buka card yang diklik (jika sebelumnya tertutup)
  if (!isOpen) {
    card.classList.add('open');
    header.setAttribute('aria-expanded', 'true');
  }
}

/* ===================================================
   SMOOTH SCROLL (fallback untuk browser lama)
   =================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===================================================
   NAVBAR — tambah shadow saat di-scroll
   =================================================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});