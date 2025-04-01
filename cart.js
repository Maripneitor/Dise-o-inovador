document.addEventListener('DOMContentLoaded', function() {
    // Cargar carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const cartCount = document.getElementById('cart-count');
    
    // Mostrar u ocultar estado vacío
    function checkEmptyCart() {
        if (cart.length === 0) {
            emptyCart.style.display = 'block';
            cartContent.style.display = 'none';
        } else {
            emptyCart.style.display = 'none';
            cartContent.style.display = 'flex';
        }
        updateCartCount();
    }
    
    // Actualizar contador del carrito
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
    }
    
    // Calcular totales
    function calculateTotals() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 500 ? 0 : 50; // Envío gratis para compras mayores a $500
        const total = subtotal + shipping;
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Renderizar productos del carrito
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image || 'https://via.placeholder.com/80'}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn minus" data-index="${index}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                            <button class="quantity-btn plus" data-index="${index}">+</button>
                        </div>
                        <button class="remove-item" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Agregar event listeners a los nuevos elementos
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', updateQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });
    }
    
    // Funciones para manipular cantidades
    function decreaseQuantity(e) {
        const index = e.target.dataset.index;
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
            updateCart();
        }
    }
    
    function increaseQuantity(e) {
        const index = e.target.dataset.index;
        cart[index].quantity++;
        updateCart();
    }
    
    function updateQuantity(e) {
        const index = e.target.dataset.index;
        const newQuantity = parseInt(e.target.value);
        
        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
            updateCart();
        } else {
            e.target.value = cart[index].quantity;
        }
    }
    
    function removeItem(e) {
        const index = e.target.closest('.remove-item').dataset.index;
        cart.splice(index, 1);
        updateCart();
    }
    
    // Actualizar carrito
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
        calculateTotals();
        checkEmptyCart();
    }
    
    // Botón de pago
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        alert('Redirigiendo a pasarela de pago...');
        // Aquí iría la lógica para procesar el pago
    });
    
    // Inicializar
    checkEmptyCart();
    renderCartItems();
    calculateTotals();
});