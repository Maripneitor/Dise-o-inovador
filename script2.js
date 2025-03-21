document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');
    const imageInput = document.getElementById('productImage');
    const imagePreview = document.getElementById('imagePreview');

    // Vista previa de la imagen
    if (imageInput) {
        imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Agregar producto
    if (productForm) {
        productForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const product = {
                name: document.getElementById('productName').value,
                price: document.getElementById('productPrice').value,
                stock: document.getElementById('productStock').value,
                description: document.getElementById('productDescription').value,
                image: imagePreview.src
            };

            addProduct(product);
            productForm.reset();
            imagePreview.style.display = 'none';
            alert('Producto agregado correctamente');
        });
    }

    // Cargar productos al cargar la página
    if (productList) {
        loadProducts();
    }

    // Función para agregar un producto
    function addProduct(product) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Función para cargar y mostrar productos
    function loadProducts() {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        productList.innerHTML = ''; // Limpiar la lista antes de cargar
        products.forEach((product, index) => {
            displayProduct(product, index);
        });
    }

    // Función para mostrar un producto en la lista
    function displayProduct(product, index) {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
            <p>${product.description}</p>
            <button onclick="addToCart(${index})">Añadir al carrito</button>
            <button onclick="deleteProduct(${index})">Eliminar producto</button>
        `;

        productList.appendChild(productItem);
    }

    // Función para eliminar un producto
    window.deleteProduct = function(index) {
        if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            let products = JSON.parse(localStorage.getItem('products')) || [];
            if (index >= 0 && index < products.length) {
                products.splice(index, 1); // Eliminar el producto
                localStorage.setItem('products', JSON.stringify(products)); // Actualizar LocalStorage
                alert('Producto eliminado correctamente');
                loadProducts(); // Recargar la lista de productos
            } else {
                alert('Error: Índice de producto no válido');
            }
        }
    };

    // Función para añadir al carrito (puedes implementar esta funcionalidad más adelante)
    window.addToCart = function(index) {
        alert('Producto añadido al carrito');
    };
});