// Smooth scroll saat klik menu
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
