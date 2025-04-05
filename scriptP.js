// Variables globales
let products = [];
let categories = new Set();

// Elementos del DOM
const productList = document.getElementById('productList');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortProducts');
const categoryFilter = document.getElementById('categoryFilter');
const notification = document.getElementById('message');
const productForm = document.getElementById('productForm');
const productImage = document.getElementById('productImage');
const imagePreview = document.getElementById('imagePreview');
const fileName = document.getElementById('fileName');

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
    updateCartCount();
    
    // Evento para vista previa de imagen
    productImage.addEventListener('change', handleImageUpload);
    
    // Evento para enviar formulario
    productForm.addEventListener('submit', handleFormSubmit);
});

// Función para manejar la subida de imágenes
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        fileName.textContent = file.name;
        const reader = new FileReader();
        reader.onload = function(event) {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block';
            document.querySelector('.placeholder-preview').style.display = 'none';
        }
        reader.readAsDataURL(file);
    }
}

// Función para manejar el envío del formulario
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validar campos requeridos
    if (!validateForm()) {
        showMessage('Por favor complete todos los campos requeridos', true);
        return;
    }
    
    // Crear nuevo producto
    const newProduct = {
        id: generateId(),
        name: document.getElementById('productName').value.trim(),
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value),
        description: document.getElementById('productDescription').value.trim(),
        category: document.getElementById('productCategory').value.trim() || 'Sin categoría',
        image: imagePreview.src !== '#' ? imagePreview.src : null
    };
    
    // Agregar producto
    addProduct(newProduct);
    
    // Resetear formulario
    resetForm();
}

// Función para validar el formulario
function validateForm() {
    const name = document.getElementById('productName').value.trim();
    const price = document.getElementById('productPrice').value;
    const stock = document.getElementById('productStock').value;
    const description = document.getElementById('productDescription').value.trim();
    
    return name && price && stock && description;
}

// Función para agregar un producto
function addProduct(product) {
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    showMessage('Producto agregado correctamente');
    loadProducts();
}

// Función para resetear el formulario
function resetForm() {
    productForm.reset();
    imagePreview.style.display = 'none';
    fileName.textContent = 'Ningún archivo seleccionado';
    document.querySelector('.placeholder-preview').style.display = 'flex';
}

// Función para generar ID único
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Cargar productos desde localStorage
function loadProducts() {
    try {
        products = JSON.parse(localStorage.getItem('products')) || [];
        extractCategories();
        renderProducts(products);
        renderCategoryOptions();
        toggleEmptyState();
    } catch (error) {
        console.error('Error loading products:', error);
        showMessage('Error al cargar los productos', true);
    }
}

// Extraer categorías únicas
function extractCategories() {
    categories.clear();
    products.forEach(product => {
        if (product.category) {
            categories.add(product.category);
        }
    });
}

// Renderizar opciones de categoría
function renderCategoryOptions() {
    if (!categoryFilter) return;
    
    categoryFilter.innerHTML = '<option value="all">Todas las categorías</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Configurar event listeners
function setupEventListeners() {
    if (searchInput) searchInput.addEventListener('input', filterProducts);
    if (sortSelect) sortSelect.addEventListener('change', filterProducts);
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
}

// Filtrar y ordenar productos
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const sortValue = sortSelect.value;
    const categoryValue = categoryFilter.value;
    
    let filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            (product.description && product.description.toLowerCase().includes(searchTerm));
        const matchesCategory = categoryValue === 'all' || product.category === categoryValue;
        return matchesSearch && matchesCategory;
    });
    
    filtered = sortProducts(filtered, sortValue);
    renderProducts(filtered);
}

// Ordenar productos
function sortProducts(products, sortValue) {
    return [...products].sort((a, b) => {
        switch(sortValue) {
            case 'name': return a.name.localeCompare(b.name);
            case 'name-desc': return b.name.localeCompare(a.name);
            case 'price': return parseFloat(a.price) - parseFloat(b.price);
            case 'price-desc': return parseFloat(b.price) - parseFloat(a.price);
            case 'stock': return parseInt(a.stock) - parseInt(b.stock);
            case 'stock-desc': return parseInt(b.stock) - parseInt(a.stock);
            default: return 0;
        }
    });
}

// Renderizar productos
function renderProducts(productsToRender) {
    if (!productList) return;
    
    if (!productsToRender || productsToRender.length === 0) {
        productList.innerHTML = '';
        toggleEmptyState(true);
        return;
    }
    
    toggleEmptyState(false);
    
    productList.innerHTML = productsToRender.map(product => `
        <div class="product-item" data-id="${product.id}">
            <div class="product-img-container">
                ${product.image ? 
                    `<img src="${product.image}" alt="${product.name}" class="product-img">` : 
                    `<div class="no-image"><i class="fas fa-box-open"></i></div>`
                }
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <span class="product-price">$${product.price.toFixed(2)}</span>
                ${product.category ? `<span class="product-category">${product.category}</span>` : ''}
                <span class="product-stock">Disponibles: ${product.stock}</span>
                <p class="product-description">${product.description || 'Sin descripción'}</p>
                <div class="product-actions">
                    <button class="btn-cart" onclick="addToCart('${product.id}')">
                        <i class="fas fa-cart-plus"></i> Añadir
                    </button>
                    <button class="btn-delete" onclick="deleteProduct('${product.id}')">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Mostrar/ocultar estado vacío
function toggleEmptyState(show = false) {
    if (!emptyState || !productList) return;
    
    if (show) {
        emptyState.style.display = 'block';
        productList.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        productList.style.display = 'grid';
    }
}

// Añadir al carrito
function addToCart(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.productId == productId);
    
    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            showMessage(`No hay suficiente stock de "${product.name}"`, true);
            return;
        }
        existingItem.quantity++;
    } else {
        cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            maxStock: product.stock
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showMessage(`"${product.name}" añadido al carrito`);
}

// Eliminar producto
function deleteProduct(productId) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    
    products = products.filter(product => product.id != productId);
    localStorage.setItem('products', JSON.stringify(products));
    
    // Eliminar del carrito si existe
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.productId != productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
    loadProducts();
    showMessage('Producto eliminado correctamente');
}

// Actualizar contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = count;
}

// Mostrar notificación
function showMessage(text, isError = false) {
    if (!notification) return;
    
    notification.textContent = text;
    notification.style.backgroundColor = isError ? '#f72585' : '#4cc9f0';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);


    // Cuando agregas/eliminas items del carrito
function addToCart(productId) {
    // ... tu lógica actual para agregar al carrito
    
    // Después de modificar el carrito:
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Disparar evento personalizado para otras pestañas
    const event = new Event('cartUpdated');
    window.dispatchEvent(event);
}

// Escuchar cambios en otras pestañas
window.addEventListener('cartUpdated', updateCartCount);
window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        updateCartCount();
    }
});
}