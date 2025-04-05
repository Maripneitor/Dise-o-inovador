document.addEventListener('DOMContentLoaded', function() {
  // Menu toggle functionality
  const menuToggle = document.getElementById('menu-toggle');
  const hamburger = document.querySelector('.hamburger');
  const navbar = document.querySelector('.navbar');
  const navItems = document.querySelectorAll('.navbar ul li');
  
  // Add index to each nav item for staggered animation
  navItems.forEach((item, index) => {
      item.style.setProperty('--i', index);
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.navbar a').forEach(link => {
      link.addEventListener('click', () => {
          if (window.innerWidth <= 992) {
              menuToggle.checked = false;
              document.body.style.overflow = 'auto';
              navbar.classList.remove('active');
          }
      });
  });
  
  // Toggle body overflow when menu is open
  menuToggle.addEventListener('change', function() {
      if (this.checked) {
          document.body.style.overflow = 'hidden';
          navbar.classList.add('active');
      } else {
          document.body.style.overflow = 'auto';
          navbar.classList.remove('active');
      }
  });
  
  // Add scroll effect to navbar
  window.addEventListener('scroll', function() {
      const menu = document.querySelector('.menu');
      if (window.scrollY > 50) {
          menu.classList.add('scrolled');
      } else {
          menu.classList.remove('scrolled');
      }
  });
  
  // Initialize cart count
  updateCartCount();
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Add animation to elements when they come into view
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.coffee-1, .services-1, .blog-1');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;
          
          if (elementPosition < screenPosition) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
          }
      });
  };
  
  // Set initial state for animated elements
  document.querySelectorAll('.coffee-1, .services-1, .blog-1').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load
});

function updateCartCount() {
  // Simulate cart items (in a real app, this would come from your cart system)
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  document.getElementById('cart-count').textContent = cartItems.length;
  
  // Update cart count every 2 seconds (simulation)
  setInterval(() => {
      const randomChange = Math.random() > 0.8 ? 1 : 0;
      const currentCount = parseInt(document.getElementById('cart-count').textContent);
      const newCount = Math.max(0, currentCount + randomChange);
      document.getElementById('cart-count').textContent = newCount;
      
      // Add animation when count changes
      if (randomChange) {
          const cartIcon = document.querySelector('.active-cart');
          cartIcon.classList.add('pulse');
          setTimeout(() => {
              cartIcon.classList.remove('pulse');
          }, 500);
      }
  }, 2000);
}

// Function to handle product clicks (for demo purposes)
function handleProductClick(productId) {
  // In a real app, this would add the product to cart
  console.log(`Product ${productId} added to cart`);
  
  // Update cart count
  const currentCount = parseInt(document.getElementById('cart-count').textContent);
  document.getElementById('cart-count').textContent = currentCount + 1;
  
  // Add to localStorage (simulation)
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(productId);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
  // Show feedback
  const feedback = document.createElement('div');
  feedback.className = 'cart-feedback';
  feedback.textContent = '¡Producto añadido al carrito!';
  document.body.appendChild(feedback);
  
  setTimeout(() => {
      feedback.classList.add('show');
  }, 10);
  
  setTimeout(() => {
      feedback.classList.remove('show');
      setTimeout(() => {
          document.body.removeChild(feedback);
      }, 300);
  }, 2000);
}