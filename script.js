window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    const contactSection = document.querySelector('#page4');
    const rect = contactSection.getBoundingClientRect();
  
    if (rect.top <= 100 && rect.bottom >= 100) {
      nav.classList.add('white-nav');
    } else {
      nav.classList.remove('white-nav');
    }
  });
  
// Cart functionality
let cart = [];
let cartTotal = 0;

// DOM Elements
const cartIcon = document.getElementById('cartIcon');
const cartTab = document.getElementById('cartTab');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const counter = document.querySelector('.counter');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'cart-overlay';
document.body.appendChild(overlay);

// Toggle cart
cartIcon.addEventListener('click', () => {
  cartTab.classList.add('active');
  overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
  cartTab.classList.remove('active');
  overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
  cartTab.classList.remove('active');
  overlay.classList.remove('active');
});

// Add to cart functionality
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const product = e.target.closest('.products');
    const productName = product.querySelector('.name').textContent;
    const productPrice = parseFloat(product.querySelector('.price').textContent.replace('₱', '').replace(',', ''));
    const productImage = product.querySelector('img').src;

    addToCart(productName, productPrice, productImage);
    updateCartDisplay();
  });
});

function addToCart(name, price, image) {
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      image,
      quantity: 1
    });
  }
  
  updateCounter();
}

function updateCounter() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  counter.textContent = totalItems;
}

function updateCartDisplay() {
  cartItems.innerHTML = '';
  cartTotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    cartTotal += itemTotal;

    const cartItemElement = document.createElement('div');
    cartItemElement.className = 'cart-item';
    cartItemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₱${item.price.toLocaleString()}</div>
        <div class="cart-item-quantity">
          <button class="quantity-btn minus" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn plus" data-index="${index}">+</button>
        </div>
      </div>
      <button class="remove-item" data-index="${index}">
        <i class="fas fa-trash"></i>
      </button>
    `;
    cartItems.appendChild(cartItemElement);
  });

  cartTotalElement.textContent = `₱${cartTotal.toLocaleString()}`;

  // Add event listeners for quantity buttons and remove buttons
  document.querySelectorAll('.quantity-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      if (e.target.classList.contains('plus')) {
        cart[index].quantity += 1;
      } else if (e.target.classList.contains('minus')) {
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        } else {
          cart.splice(index, 1);
        }
      }
      updateCartDisplay();
      updateCounter();
    });
  });

  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.closest('.remove-item').dataset.index;
      cart.splice(index, 1);
      updateCartDisplay();
      updateCounter();
    });
  });
}

// Checkout functionality
document.querySelector('.checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  alert('Thank you for your purchase! Total: ₱' + cartTotal.toLocaleString());
  cart = [];
  updateCartDisplay();
  updateCounter();
  cartTab.classList.remove('active');
  overlay.classList.remove('active');
});
  
  