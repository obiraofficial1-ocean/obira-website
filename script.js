// =======================
// CONSTANTS & CONFIG
// =======================
const RAZORPAY_KEY = "rzp_test_SljBi0Hjg0lqGY";
const TAX_PERCENTAGE = 5;
const SHIPPING_COST = 50;

// =======================
// STORAGE HELPERS
// =======================
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch (e) {
    console.error("Error parsing cart:", e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
  } catch (e) {
    console.error("Error saving cart:", e);
  }
}

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  } catch (e) {
    console.error("Error parsing wishlist:", e);
    return [];
  }
}

function saveWishlist(wishlist) {
  try {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  } catch (e) {
    console.error("Error saving wishlist:", e);
  }
}

// =======================
// CART BADGE UPDATE
// =======================
function updateCartBadge() {
  const cart = getCart();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.textContent = cartCount;
    badge.style.display = cartCount > 0 ? "inline" : "none";
  }
}

// =======================
// STORE PAGE
// =======================
function loadStore() {
  const container = document.getElementById("store-products");
  if (!container) return;

  const cart = getCart();
  const wishlist = getWishlist();
  container.innerHTML = "";

  if (!products || products.length === 0) {
    container.innerHTML = "<p>No products available</p>";
    return;
  }

  products.forEach(p => {
    const cartItem = cart.find(i => i.id === p.id);
    const qty = cartItem ? cartItem.qty : 0;
    const isWishlisted = wishlist.some(w => w.id === p.id);

    container.innerHTML += `
      <div class="product-card">
        <div class="product-image-container">
          <img src="${p.image}" alt="${p.name}" onclick="openProduct('${p.id}')" class="product-img">
          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${p.id}', event)" title="Add to wishlist">
            ♥
          </button>
        </div>

        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>

        <div class="qty-controls">
          <button onclick="decreaseQty('${p.id}')">−</button>
          <span>${qty}</span>
          <button onclick="increaseQty('${p.id}')">+</button>
        </div>
      </div>
    `;
  });

  updateCartBadge();
}

// =======================
// WISHLIST FUNCTIONS
// =======================
function toggleWishlist(id, event) {
  event.stopPropagation();
  const wishlist = getWishlist();
  const index = wishlist.findIndex(w => w.id === id);

  if (index === -1) {
    const product = products.find(p => p.id === id);
    if (product) {
      wishlist.push(product);
      showNotification("Added to wishlist! ♥");
    }
  } else {
    wishlist.splice(index, 1);
    showNotification("Removed from wishlist");
  }

  saveWishlist(wishlist);
  loadStore();
}

// =======================
// PRODUCT PAGE
// =======================
let productQty = 1;

function openProduct(id) {
  localStorage.setItem("selectedProduct", id);
  window.location.href = "product.html";
}

function loadProduct() {
  const id = localStorage.getItem("selectedProduct");
  if (!id) return;

  const p = products.find(x => x.id === id);
  if (!p) return;

  const nameEl = document.getElementById("p-name");
  const priceEl = document.getElementById("p-price");
  const imgEl = document.getElementById("p-img");

  if (nameEl) nameEl.innerText = p.name;
  if (priceEl) priceEl.innerText = "₹" + p.price;
  if (imgEl) imgEl.src = p.image;

  loadSuggestions(p.category);
  updateCartBadge();
}

function increaseQtyFromProduct() {
  productQty++;
  const el = document.getElementById("p-qty");
  if (el) el.innerText = productQty;
}

function decreaseQtyFromProduct() {
  if (productQty > 1) {
    productQty--;
    const el = document.getElementById("p-qty");
    if (el) el.innerText = productQty;
  }
}

function addToCartFromProduct() {
  const id = localStorage.getItem("selectedProduct");
  const cart = getCart();
  const existing = cart.find(i => i.id === id);

  if (existing) {
    existing.qty += productQty;
  } else {
    const p = products.find(x => x.id === id);
    if (p) {
      cart.push({ ...p, qty: productQty });
    }
  }

  saveCart(cart);
  showNotification("✓ Added to cart!");
  productQty = 1;
  const el = document.getElementById("p-qty");
  if (el) el.innerText = "1";
}

// =======================
// CART PAGE
// =======================
function loadCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  const cart = getCart();
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px 20px;">
        <p style="font-size: 18px; color: #666;">Your cart is empty</p>
        <a href="store.html" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #111; color: #fff; text-decoration: none; border-radius: 8px;">Continue Shopping</a>
      </div>
    `;
    document.getElementById("total").innerText = "0";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">

        <div class="cart-info">
          <p class="item-name"><strong>${item.name}</strong></p>
          <p class="item-price">₹${item.price}</p>

          <div class="qty-controls">
            <button onclick="decreaseQty('${item.id}')">−</button>
            <span>${item.qty}</span>
            <button onclick="increaseQty('${item.id}')">+</button>
          </div>

          <p class="item-total">Subtotal: ₹${itemTotal}</p>
          <button class="remove-btn" onclick="removeItem('${item.id}')">🗑 Remove</button>
        </div>
      </div>
    `;
  });

  const tax = Math.round(total * TAX_PERCENTAGE / 100);
  const shipping = total > 500 ? 0 : SHIPPING_COST;
  const finalTotal = total + tax + shipping;

  const totalEl = document.getElementById("total");
  if (totalEl) totalEl.innerText = finalTotal;

  // Update summary
  const summary = document.getElementById("cart-summary");
  if (summary) {
    summary.innerHTML = `
      <div class="summary-row">
        <span>Subtotal:</span>
        <span>₹${total}</span>
      </div>
      <div class="summary-row">
        <span>Tax (${TAX_PERCENTAGE}%):</span>
        <span>₹${tax}</span>
      </div>
      <div class="summary-row">
        <span>Shipping:</span>
        <span>${shipping === 0 ? 'FREE' : '₹' + shipping}</span>
      </div>
      <div class="summary-row total">
        <span><strong>Total:</strong></span>
        <span><strong>₹${finalTotal}</strong></span>
      </div>
    `;
  }

  updateCartBadge();
}

// =======================
// CART ACTIONS
// =======================
function increaseQty(id) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);

  if (item) {
    item.qty++;
  } else {
    const p = products.find(x => x.id === id);
    if (p) {
      cart.push({ ...p, qty: 1 });
    }
  }

  saveCart(cart);
  loadStore();
  loadCart();
}

function decreaseQty(id) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);

  if (!item) return;

  if (item.qty > 1) {
    item.qty--;
  } else {
    cart.splice(cart.indexOf(item), 1);
  }

  saveCart(cart);
  loadStore();
  loadCart();
}

function removeItem(id) {
  const cart = getCart();
  const index = cart.findIndex(i => i.id === id);
  if (index > -1) {
    cart.splice(index, 1);
  }

  saveCart(cart);
  loadCart();
  showNotification("Item removed from cart");
}

// =======================
// CHECKOUT & PAYMENT
// =======================
function checkout() {
  const cart = getCart();
  const total = calculateTotal(cart);

  if (total === 0) {
    alert("Your cart is empty!");
    return;
  }

  if (!window.Razorpay) {
    alert("Payment gateway is loading. Please try again.");
    return;
  }

  const options = {
    key: RAZORPAY_KEY,
    amount: total * 100,
    currency: "INR",
    name: "OBIRA",
    description: "Order Payment",
    image: "logo.png",
    handler: function (response) {
      completeOrder(response.razorpay_payment_id);
    },
    prefill: {
      email: "customer@example.com",
      contact: "9999999999"
    },
    theme: {
      color: "#111"
    }
  };

  const rzp = new Razorpay(options);
  rzp.on('payment.failed', function (response) {
    alert("Payment failed: " + response.error.description);
  });
  rzp.open();
}

function calculateTotal(cart) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = Math.round(subtotal * TAX_PERCENTAGE / 100);
  const shipping = subtotal > 500 ? 0 : SHIPPING_COST;
  return subtotal + tax + shipping;
}

function completeOrder(paymentId) {
  const cart = getCart();
  const orderData = {
    orderId: generateOrderId(),
    paymentId: paymentId,
    cart: cart,
    total: calculateTotal(cart),
    timestamp: new Date().toISOString()
  };

  localStorage.setItem("lastOrder", JSON.stringify(orderData));
  localStorage.removeItem("cart");
  updateCartBadge();
  window.location.href = "success.html";
}

function generateOrderId() {
  return "ORD-" + Date.now();
}

// =======================
// SUGGESTIONS
// =======================
function loadSuggestions(category) {
  const container = document.getElementById("suggested-products");
  if (!container) return;

  container.innerHTML = "";

  let suggested = [];

  if (category === "bracelets") {
    suggested = products.filter(p => p.category === "chains" || p.category === "clips");
  } else if (category === "chains") {
    suggested = products.filter(p => p.category === "bracelets" || p.category === "clips");
  } else {
    suggested = products.slice(0, 8);
  }

  suggested.slice(0, 4).forEach(p => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}" onclick="openProduct('${p.id}')" style="cursor:pointer;">
        <p><strong>${p.name}</strong></p>
        <p class="price">₹${p.price}</p>
      </div>
    `;
  });
}

// =======================
// NOTIFICATIONS
// =======================
function showNotification(message) {
  const notif = document.createElement("div");
  notif.className = "notification";
  notif.textContent = message;
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.classList.add("show");
  }, 10);

  setTimeout(() => {
    notif.classList.remove("show");
    setTimeout(() => notif.remove(), 300);
  }, 2000);
}

// =======================
// SEARCH FUNCTIONALITY
// =======================
function searchProducts(query) {
  if (!query || query.length < 2) {
    loadStore();
    return;
  }

  const container = document.getElementById("store-products");
  if (!container) return;

  const results = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  container.innerHTML = "";

  if (results.length === 0) {
    container.innerHTML = "<p>No products found</p>";
    return;
  }

  results.forEach(p => {
    const cart = getCart();
    const cartItem = cart.find(i => i.id === p.id);
    const qty = cartItem ? cartItem.qty : 0;

    container.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}" onclick="openProduct('${p.id}')">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>

        <div class="qty-controls">
          <button onclick="decreaseQty('${p.id}')">−</button>
          <span>${qty}</span>
          <button onclick="increaseQty('${p.id}')">+</button>
        </div>
      </div>
    `;
  });
}

// =======================
// FILTER FUNCTIONALITY
// =======================
function filterByPrice(maxPrice) {
  const container = document.getElementById("store-products");
  if (!container) return;

  const filtered = products.filter(p => p.price <= maxPrice);
  container.innerHTML = "";

  filtered.forEach(p => {
    const cart = getCart();
    const cartItem = cart.find(i => i.id === p.id);
    const qty = cartItem ? cartItem.qty : 0;

    container.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}" onclick="openProduct('${p.id}')">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>

        <div class="qty-controls">
          <button onclick="decreaseQty('${p.id}')">−</button>
          <span>${qty}</span>
          <button onclick="increaseQty('${p.id}')">+</button>
        </div>
      </div>
    `;
  });
}

// =======================
// INIT
// =======================
window.addEventListener('load', function () {
  loadStore();
  loadProduct();
  loadCart();
  updateCartBadge();

  // Load Razorpay script
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  document.body.appendChild(script);
});