document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.wrapper');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const strengthMeters = document.querySelectorAll('.strength-meter');
  
    // Toggle between login and register forms
    registerLink.onclick = (e) => {
      e.preventDefault();
      wrapper.classList.add('active');
    };
  
    loginLink.onclick = (e) => {
      e.preventDefault();
      wrapper.classList.remove('active');
    };
  
    // Password strength indicator
    passwordInputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        const strength = calculatePasswordStrength(input.value);
        strengthMeters[index].style.width = `${strength}%`;
        
        if(strength < 30) {
          strengthMeters[index].style.background = '#ff4757';
        } else if(strength < 70) {
          strengthMeters[index].style.background = '#ffa502';
        } else {
          strengthMeters[index].style.background = '#2ed573';
        }
      });
    });
  
    function calculatePasswordStrength(password) {
      let strength = 0;
      
      // Length contributes up to 40%
      strength += Math.min(40, (password.length / 12) * 40);
      
      // Presence of different character types
      if (password.match(/[a-z]/)) strength += 10;
      if (password.match(/[A-Z]/)) strength += 10;
      if (password.match(/[0-9]/)) strength += 20;
      if (password.match(/[^a-zA-Z0-9]/)) strength += 20;
      
      return Math.min(100, strength);
    }
  
    // Add animation delays dynamically
    document.querySelectorAll('.animation').forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
    });
  });