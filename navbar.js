// navbar.js
document.addEventListener('DOMContentLoaded', function() {
    // Crear la estructura del navbar
    const navbarHTML = `
        <div class="menu container">
            <a href="#" class="logo">B´ALAM</a>
            
            <input type="checkbox" id="menu-toggle" />
            <label for="menu-toggle" class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </label>
            
            <nav class="navbar">
                <ul>
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="index2.html">Registro</a></li>
                    <li><a href="detalleProducto.html">Productos</a></li>
                    <li><a href="productos.html">Registrar Productos</a></li>
                    <li><a href="carrito.html" class="active-cart"><i class="fas fa-shopping-cart"></i> <span id="cart-count">0</span></a></li>
                    <li><a href="detalleusuario.html"><i class="fas fa-user"></i> Cuenta</a></li>
                </ul>
            </nav>
        </div>
    `;

    // Insertar el navbar en el header de cada página
    const header = document.querySelector('header.header');
    if (header) {
        header.insertAdjacentHTML('afterbegin', navbarHTML);
    } else {
        // Si no hay header con clase 'header', crear uno
        const body = document.querySelector('body');
        const newHeader = document.createElement('header');
        newHeader.className = 'header';
        newHeader.innerHTML = navbarHTML;
        body.insertAdjacentElement('afterbegin', newHeader);
    }

    // Resaltar la página activa en el navbar
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
        
        // Cerrar el menú al hacer clic en un enlace (para móviles)
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                document.getElementById('menu-toggle').checked = false;
            }
        });
    });
});