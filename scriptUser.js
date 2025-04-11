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
        
    });
    
    // Botón de editar perfil
    document.querySelector('.btn-primary').addEventListener('click', function() {
        
    });
    
    // Botón de cambiar contraseña
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        
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



document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const btnEditProfile = document.getElementById('btn-edit-profile');
    const btnSave = document.getElementById('btn-save');
    const btnCancel = document.getElementById('btn-cancel');
    const profileContainer = document.getElementById('profile-container');
    
    // Campos editables
    const fullnameValue = document.getElementById('fullname-value');
    const fullnameInput = document.getElementById('fullname-input');
    const emailValue = document.getElementById('email-value');
    const emailInput = document.getElementById('email-input');
    const phoneValue = document.getElementById('phone-value');
    const phoneInput = document.getElementById('phone-input');
    const birthdateValue = document.getElementById('birthdate-value');
    const birthdateInput = document.getElementById('birthdate-input');
    const addressValue = document.getElementById('address-value');
    const addressInput = document.getElementById('address-input');
    const profileName = document.getElementById('profile-name');

    // Formatear fecha para mostrar (YYYY-MM-DD -> DD/MM/YYYY)
    function formatDate(dateString) {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    // Activar modo edición
    btnEditProfile.addEventListener('click', function() {
        profileContainer.classList.add('edit-mode');
        
        // Formatear fecha para el input (DD/MM/YYYY -> YYYY-MM-DD)
        const [day, month, year] = birthdateValue.textContent.split('/');
        birthdateInput.value = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    });

    // Cancelar edición
    btnCancel.addEventListener('click', function() {
        profileContainer.classList.remove('edit-mode');
    });

    // Guardar cambios
    btnSave.addEventListener('click', function() {
        // Actualizar valores mostrados
        fullnameValue.textContent = fullnameInput.value;
        emailValue.textContent = emailInput.value;
        phoneValue.textContent = phoneInput.value;
        birthdateValue.textContent = formatDate(birthdateInput.value);
        addressValue.textContent = addressInput.value;
        profileName.textContent = fullnameInput.value;
        
        // Aquí deberías agregar código para enviar los cambios al servidor
        // Por ejemplo:
        /*
        fetch('/api/update-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullname: fullnameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                birthdate: birthdateInput.value,
                address: addressInput.value
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Perfil actualizado correctamente');
                profileContainer.classList.remove('edit-mode');
            } else {
                alert('Error al actualizar el perfil');
            }
        });
        */
        
        // Por ahora solo mostramos un mensaje y salimos del modo edición
        alert('Cambios guardados (simulación)');
        profileContainer.classList.remove('edit-mode');
    });

    // Cambiar contraseña (simulación)
    document.getElementById('btn-change-password').addEventListener('click', function() {
        const newPassword = prompt('Ingrese su nueva contraseña:');
        if (newPassword) {
            alert('Contraseña cambiada correctamente (simulación)');
        }
    });

    // Cerrar sesión (simulación)
    document.getElementById('btn-logout').addEventListener('click', function() {
        if (confirm('¿Está seguro que desea cerrar sesión?')) {
            alert('Sesión cerrada (simulación)');
            // Redireccionar al login
            // window.location.href = 'login.html';
        }
    });

    // Editar avatar (simulación)
    document.getElementById('btn-edit-avatar').addEventListener('click', function() {
        alert('Funcionalidad para cambiar avatar (simulación)');
    });
});

document.getElementById('btn-edit-avatar').addEventListener('click', function() {
    document.getElementById('avatar-upload').click();
});

document.getElementById('avatar-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('profile-avatar').src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const editButton = document.getElementById('btn-edit-profile');
    const saveButton = document.getElementById('btn-save');
    const cancelButton = document.getElementById('btn-cancel');
    const passwordValue = document.getElementById('password-value');
    const passwordInput = document.getElementById('password-input');

    // Habilitar edición
    editButton.addEventListener('click', () => {
        passwordValue.style.display = 'none';
        passwordInput.style.display = 'block';
    });

    // Guardar cambios
    saveButton.addEventListener('click', () => {
        passwordValue.textContent = '********'; // Opcional: puedes actualizar con lógica adicional
        passwordValue.style.display = 'block';
        passwordInput.style.display = 'none';
    });

    // Cancelar edición
    cancelButton.addEventListener('click', () => {
        passwordInput.style.display = 'none';
        passwordValue.style.display = 'block';
    });
});