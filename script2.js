// Funciones principales
function showMessage(text, isError = false) {
    const msgElement = document.getElementById('message');
    if (!msgElement) return;
    
    msgElement.textContent = text;
    msgElement.style.display = 'block';
    msgElement.style.backgroundColor = isError ? '#ffdddd' : '#ddffdd';
    msgElement.style.padding = '10px';
    msgElement.style.borderRadius = '4px';
    msgElement.style.margin = '10px 0';
    
    setTimeout(() => {
        msgElement.style.display = 'none';
    }, 3000);
}

function getProductsFromStorage() {
    try {
        return JSON.parse(localStorage.getItem('products')) || [];
    } catch (error) {
        console.error('Error al leer productos:', error);
        return [];
    }
}

function saveProduct(product) {
    try {
        const products = getProductsFromStorage();
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    } catch (error) {
        console.error('Error al guardar producto:', error);
        return false;
    }
}

function renderProducts(products) {
    const productList = document.getElementById('productList');
    if (!productList) return;

    if (products.length === 0) {
        productList.innerHTML = '<p class="no-products">No hay productos registrados.</p>';
        return;
    }

    productList.innerHTML = products.map((product, index) => `
        <div class="product-item">
            ${product.image ? `<img src="${product.image}" alt="${product.name}" class="product-img">` : ''}
            <div class="product-info">
                <h3>${product.name}</h3>
                <p><strong>Precio:</strong> $${parseFloat(product.price).toFixed(2)}</p>
                <p><strong>Stock:</strong> ${product.stock}</p>
                <p class="description">${product.description}</p>
                <div class="product-actions">
                    <button onclick="addToCart(${index})" class="btn-cart">Añadir al carrito</button>
                    <button onclick="deleteProduct(${index})" class="btn-delete">Eliminar</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Funciones globales
window.addToCart = function(index) {
    const products = getProductsFromStorage();
    const product = products[index];
    showMessage(`"${product.name}" añadido al carrito`);
};

window.deleteProduct = function(index) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        const products = getProductsFromStorage();
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts(products);
        showMessage('Producto eliminado correctamente');
    }
};

// Eventos
document.addEventListener('DOMContentLoaded', function() {
    // Configurar vista previa de imagen
    const imageInput = document.getElementById('productImage');
    const imagePreview = document.getElementById('imagePreview');
    
    if (imageInput && imagePreview) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Configurar formulario de producto
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const product = {
                name: document.getElementById('productName').value,
                price: document.getElementById('productPrice').value,
                stock: document.getElementById('productStock').value,
                description: document.getElementById('productDescription').value,
                image: imagePreview ? imagePreview.src : ''
            };

            if (saveProduct(product)) {
                showMessage('Producto agregado correctamente');
                productForm.reset();
                if (imagePreview) imagePreview.style.display = 'none';
            } else {
                showMessage('Error al guardar el producto', true);
            }
        });
    }

    // Cargar productos en la página de lista
    if (document.getElementById('productList')) {
        const products = getProductsFromStorage();
        renderProducts(products);
    }

    // Configurar búsqueda
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const term = e.target.value.toLowerCase();
            const products = getProductsFromStorage();
            
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(term) || 
                (p.description && p.description.toLowerCase().includes(term))
            );
            
            renderProducts(filtered);
        });
    }

    // Configurar ordenación
    const sortSelect = document.getElementById('sortProducts');
    if (sortSelect) {
        sortSelect.addEventListener('change', function(e) {
            const value = e.target.value;
            const products = getProductsFromStorage();
            
            const sorted = [...products].sort((a, b) => {
                if (value === 'name') return a.name.localeCompare(b.name);
                if (value === 'name-desc') return b.name.localeCompare(a.name);
                if (value === 'price') return a.price - b.price;
                if (value === 'price-desc') return b.price - a.price;
                if (value === 'stock') return a.stock - b.stock;
                if (value === 'stock-desc') return b.stock - a.stock;
                return 0;
            });
            
            renderProducts(sorted);
        });
    }
});