document.addEventListener('DOMContentLoaded', function() {
    // Actualizar contador del carrito
    updateCartCount();
    
    // Cargar datos del usuario desde localStorage
    loadUserData();
    
    // Configurar event listeners
    setupEventListeners();
});

function loadUserData() {
    // Aquí iría la lógica para cargar datos reales del usuario
    // Por ahora usamos datos de ejemplo
    const userData = {
        name: "Juan Pérez Balam",
        email: "juan.balam@example.com",
        phone: "+52 55 1234 5678",
        address: "Calle Falsa 123, Col. Centro, CDMX, 06000",
        birthDate: "15/03/1990",
        joinDate: "15/03/2023",
        orders: 15,
        rating: 4.8,
        favorites: 24
    };
    
    // Actualizar la UI con los datos del usuario
    document.querySelector('.profile-name').textContent = userData.name;
    document.querySelector('.profile-bio p').textContent = `Miembro desde ${userData.joinDate} | ${userData.orders} pedidos realizados`;
    // ... y así con los demás campos
}

function setupEventListeners() {
    // Botón de editar avatar
    document.querySelector('.btn-edit-avatar').addEventListener('click', function() {
        alert('Funcionalidad de editar avatar en desarrollo');
    });
    
    // Botón de editar perfil
    document.querySelector('.btn-primary').addEventListener('click', function() {
        alert('Funcionalidad de editar perfil en desarrollo');
    });
    
    // Botón de cambiar contraseña
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        alert('Funcionalidad de cambiar contraseña en desarrollo');
    });
    
    // Botón de cerrar sesión
    document.querySelector('.btn-danger').addEventListener('click', function() {
        if(confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            // Aquí iría la lógica para cerrar sesión
            window.location.href = 'index.html';
        }
    });
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}