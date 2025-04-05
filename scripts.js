document.addEventListener('DOMContentLoaded', function() {
    // Cerrar el menú al hacer clic en un enlace en móviles
    const navLinks = document.querySelectorAll('.navbar a');
    const menuCheckbox = document.getElementById('menu');
    const navbar = document.querySelector('.navbar');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                menuCheckbox.checked = false;
                navbar.classList.remove('active');
            }
        });
    });
    
    // Efecto smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80; // Ajuste para el header fijo
                    window.scrollTo({
                        top: target.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Efecto de scroll para el navbar
    window.addEventListener('scroll', function() {
        const menu = document.querySelector('.menu');
        if (window.scrollY > 100) {
            menu.classList.add('scrolled');
        } else {
            menu.classList.remove('scrolled');
        }
    });
    
    // Lazy loading para imágenes
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    img.removeAttribute('loading');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px' // Carga antes de que entren al viewport
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Actualizar contador del carrito (ejemplo)
    function updateCartCount() {
        // Esto es solo un ejemplo - deberías integrarlo con tu lógica real del carrito
        const cartCount = localStorage.getItem('cartCount') || 0;
        document.getElementById('cart-count').textContent = cartCount;
    }
    
    updateCartCount();


    
});