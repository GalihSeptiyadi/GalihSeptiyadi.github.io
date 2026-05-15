/* ===========================
   HAMBURGER MENU
=========================== */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Tutup menu saat salah satu link diklik
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

/* ===========================
   DARK / LIGHT MODE
=========================== */
const darkToggle = document.getElementById('darkToggle');
const body       = document.body;

// Cek preferensi yang tersimpan
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
}

darkToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  // Simpan preferensi ke localStorage
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

/* ===========================
   SMOOTH SCROLL
=========================== */
// Sudah ditangani oleh `scroll-behavior: smooth` di CSS
// Script ini bisa digunakan untuk offset karena navbar fixed
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target   = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const offset = document.getElementById('navbar').offsetHeight;
    const top    = target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ===========================
   MODAL HELPER (buka & tutup)
=========================== */
/**
 * Buka modal berdasarkan ID
 * @param {string} modalId - ID elemen overlay
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden'; // Kunci scroll background
}

/**
 * Tutup modal berdasarkan ID
 * @param {string} modalId - ID elemen overlay
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Tombol close (×) di dalam modal
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-close');
    closeModal(modalId);
  });
});

// Klik area overlay (luar box) untuk menutup
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal(overlay.id);
    }
  });
});

// Tutup modal dengan tombol Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(modal => {
      closeModal(modal.id);
    });
  }
});

/* ===========================
   MODAL TUGAS & MATERI
=========================== */
// Semua tombol "Lihat Tugas" dan "Lihat Materi"
document.querySelectorAll('.btn-card').forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-modal');
    const title   = btn.getAttribute('data-title');
    const content = btn.getAttribute('data-content');

    // Isi konten modal sesuai card yang diklik
    const titleEl = document.getElementById(modalId + '-title');
    const bodyEl  = document.getElementById(modalId + '-body');

    if (titleEl) titleEl.textContent = title;
    if (bodyEl)  bodyEl.innerHTML   = content;

    openModal(modalId);
  });
});

/* ===========================
   PREVIEW FOTO PROFIL
=========================== */
const profilFoto = document.getElementById('profilFoto');

if (profilFoto) {
  profilFoto.addEventListener('click', () => {
    openModal('modal-foto');
  });
}