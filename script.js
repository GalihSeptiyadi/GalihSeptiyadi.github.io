// ========================================
// DOM Elements
// ========================================
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle'); // tombol dalam
const sidebarOverlay = document.getElementById('sidebarOverlay');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// ========================================
// Create Mobile Toggle Button
// ========================================
function createMobileToggle() {
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.id = 'mobileToggle';
    mobileToggle.innerHTML = '<span></span><span></span><span></span>';
    document.body.appendChild(mobileToggle);
    return mobileToggle;
}

const mobileToggle = createMobileToggle();

// ========================================
// Toggle Sidebar (SIMPLE VERSION)
// ========================================
function toggleSidebar() {
    sidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');

    // Lock scroll saat sidebar buka (mobile)
    if (sidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// Navigation Functions
// ========================================
function switchSection(targetId) {
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === targetId) {
            link.classList.add('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// Event Listeners
// ========================================

// Mobile toggle
mobileToggle.addEventListener('click', toggleSidebar);

// Sidebar toggle (opsional, desktop klik juga bisa)
sidebarToggle.addEventListener('click', toggleSidebar);

// Klik overlay = tutup
sidebarOverlay.addEventListener('click', closeSidebar);

// Klik menu
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.dataset.section;
        switchSection(targetSection);

        // Auto close di HP
        if (window.innerWidth <= 768) {
            closeSidebar();
        }
    });
});

// Resize fix
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        // Reset ke normal desktop
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSidebar();
    }
});

// ========================================
// INIT
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    switchSection('home');
});
