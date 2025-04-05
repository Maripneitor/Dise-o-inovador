document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const wrapper = document.querySelector('.wrapper');
  const registerLink = document.querySelector('.register-link');
  const loginLink = document.querySelector('.login-link');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  // Toggle entre login y registro
  registerLink.onclick = (e) => {
    e.preventDefault();
    wrapper.classList.add('active');
  };

  loginLink.onclick = (e) => {
    e.preventDefault();
    wrapper.classList.remove('active');
  };

  // Validación de formulario de registro
  if(registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if(validateRegisterForm()) {
        // Simular envío exitoso
        alert('Registro exitoso. Bienvenido a B´ALAM Café');
        registerForm.reset();
        wrapper.classList.remove('active');
      }
    });
  }

  // Validación de formulario de login
  if(loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if(validateLoginForm()) {
        // Simular login exitoso
        alert('Inicio de sesión exitoso');
        window.location.href = 'index.html';
      }
    });
  }

  // Inicializar indicadores de fuerza de contraseña
  initPasswordStrengthMeters();
  
  // Configurar animaciones
  setupAnimations();

  // Funciones de validación
  function validateRegisterForm() {
    let isValid = true;
    const requiredFields = registerForm.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if(!field.value.trim()) {
        showError(field, 'Este campo es obligatorio');
        isValid = false;
      } else {
        clearError(field);
      }
    });

    // Validación específica para email
    const email = document.getElementById('email');
    if(email && !validateEmail(email.value)) {
      showError(email, 'Ingresa un email válido');
      isValid = false;
    }

    // Validación específica para contraseña
    const password = document.getElementById('password');
    if(password && password.value.length < 8) {
      showError(password, 'La contraseña debe tener al menos 8 caracteres');
      isValid = false;
    }

    // Validación de términos
    const terms = document.getElementById('terms');
    if(terms && !terms.checked) {
      alert('Debes aceptar los términos y condiciones');
      isValid = false;
    }

    return isValid;
  }

  function validateLoginForm() {
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');
    let isValid = true;

    if(!email.value.trim()) {
      showError(email, 'Ingresa tu email o usuario');
      isValid = false;
    }

    if(!password.value.trim()) {
      showError(password, 'Ingresa tu contraseña');
      isValid = false;
    }

    return isValid;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showError(input, message) {
    const inputBox = input.closest('.input-box');
    if(inputBox) {
      inputBox.classList.add('error');
      
      let errorMessage = inputBox.querySelector('.error-message');
      if(!errorMessage) {
        errorMessage = document.createElement('small');
        errorMessage.className = 'error-message';
        inputBox.appendChild(errorMessage);
      }
      
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
    }
  }

  function clearError(input) {
    const inputBox = input.closest('.input-box');
    if(inputBox) {
      inputBox.classList.remove('error');
      const errorMessage = inputBox.querySelector('.error-message');
      if(errorMessage) {
        errorMessage.style.display = 'none';
      }
    }
  }

  function initPasswordStrengthMeters() {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const strengthMeters = document.querySelectorAll('.strength-meter');

    passwordInputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        const strength = calculatePasswordStrength(input.value);
        if(strengthMeters[index]) {
          strengthMeters[index].style.width = `${strength}%`;
          
          if(strength < 30) {
            strengthMeters[index].style.background = '#ff4757';
          } else if(strength < 70) {
            strengthMeters[index].style.background = '#ffa502';
          } else {
            strengthMeters[index].style.background = '#2ed573';
          }
        }
      });
    });
  }

  function calculatePasswordStrength(password) {
    let strength = 0;
    
    // Longitud contribuye hasta 40%
    strength += Math.min(40, (password.length / 12) * 40);
    
    // Presencia de diferentes tipos de caracteres
    if (password.match(/[a-z]/)) strength += 10;
    if (password.match(/[A-Z]/)) strength += 10;
    if (password.match(/[0-9]/)) strength += 20;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 20;
    
    return Math.min(100, strength);
  }

  function setupAnimations() {
    document.querySelectorAll('.animation').forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
    });
  }

  // Mejorar accesibilidad
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
      this.closest('.input-box').classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.closest('.input-box').classList.remove('focused');
    });
  });
});