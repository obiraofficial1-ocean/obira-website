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
    updateWishlistBadge();
  } catch (e) {
    console.error("Error saving wishlist:", e);
  }
}

// =======================
// NOTIFICATIONS
// =======================
function showNotification(message) {
  let notification = document.getElementById("notification");
  if (!notification) {
    notification = document.createElement("div");
    notification.id = "notification";
    document.body.appendChild(notification);
  }
  notification.textContent = message;
  notification.classList.add("show");
  notification.style.display = "block";
  
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.style.display = "none";
    }, 300);
  }, 2500);
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
// WISHLIST BADGE UPDATE
// =======================
function updateWishlistBadge() {
  const wishlist = getWishlist();
  const badge = document.getElementById("wishlist-badge");
  const count = wishlist.length;
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline" : "none";
  }
}

// =======================
// CART QUANTITY FUNCTIONS
// =======================
function increaseQty(id) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += 1;
  } else {
    const product = products.find(p => p.id === id);
    if (product) {
      cart.push({ ...product, qty: 1 });
      showNotification("Added to cart!");
    }
  }
  saveCart(cart);
  loadStore();
}

function decreaseQty(id) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    if (item.qty > 1) {
      item.qty -= 1;
    } else {
      cart.splice(cart.indexOf(item), 1);
      showNotification("Removed from cart");
    }
  }
  saveCart(cart);
  loadStore();
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
          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${p.id}', event)" title="Add to wishlist">♥</button>
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
  updateWishlistBadge();
}

// =======================
// PRODUCT DETAIL PAGE
// =======================
function openProduct(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    sessionStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "product.html";
  }
}

function loadProduct() {
  const container = document.getElementById("product-detail");
  if (!container) return;
  
  const product = JSON.parse(sessionStorage.getItem("selectedProduct"));
  if (!product) {
    container.innerHTML = "<p>Product not found. <a href='store.html'>Back to Store</a></p>";
    return;
  }
  
  const cart = getCart();
  const cartItem = cart.find(i => i.id === product.id);
  const qty = cartItem ? cartItem.qty : 0;
  
  container.innerHTML = `
    <div class="product-detail-container">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h1>${product.name}</h1>
        <p class="price">₹${product.price}</p>
        <p class="category">Category: ${product.category}</p>
        <div class="qty-section">
          <label>Quantity:</label>
          <div class="qty-controls">
            <button onclick="decreaseQty('${product.id}')">−</button>
            <span id="product-qty">${qty}</span>
            <button onclick="increaseQty('${product.id}')">+</button>
          </div>
        </div>
        <button class="add-to-cart-btn" onclick="increaseQty('${product.id}'); showNotification('Added to cart!');">Add to Cart</button>
        <a href="store.html" class="back-link">← Back to Store</a>
      </div>
    </div>
  `;
}

// =======================
// WISHLIST PAGE
// =======================
function loadWishlist() {
  const container = document.getElementById("wishlist-items");
  if (!container) return;
  
  const wishlist = getWishlist();
  
  if (wishlist.length === 0) {
    container.innerHTML = "<p style='text-align:center; padding:40px;'>Your wishlist is empty. <a href='store.html'>Continue Shopping</a></p>";
    return;
  }
  
  let html = "<div class='wishlist-grid'>";
  
  wishlist.forEach(product => {
    const cart = getCart();
    const cartItem = cart.find(i => i.id === product.id);
    const qty = cartItem ? cartItem.qty : 0;
    
    html += `
      <div class="wishlist-item">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">₹${product.price}</p>
        <div class="qty-controls">
          <button onclick="decreaseQty('${product.id}')">−</button>
          <span>${qty}</span>
          <button onclick="increaseQty('${product.id}')">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromWishlist('${product.id}')">Remove from Wishlist</button>
      </div>
    `;
  });
  
  html += "</div>";
  container.innerHTML = html;
}

function removeFromWishlist(id) {
  const wishlist = getWishlist();
  const index = wishlist.findIndex(w => w.id === id);
  if (index !== -1) {
    wishlist.splice(index, 1);
    saveWishlist(wishlist);
    loadWishlist();
    showNotification("Removed from wishlist");
  }
}

// =======================
// WISHLIST FUNCTIONS
// =======================
function toggleWishlist(id, event) {
  if (event) event.stopPropagation();
  
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
  if (document.getElementById("store-products")) {
    loadStore();
  }
  if (document.getElementById("wishlist-items")) {
    loadWishlist();
  }
}

// =======================
// CART PAGE
// =======================
function loadCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;
  
  const cart = getCart();
  const total = document.getElementById("total");
  
  if (cart.length === 0) {
    container.innerHTML = "<p style='text-align:center; padding:40px;'>Your cart is empty. <a href='store.html'>Continue Shopping</a></p>";
    if (total) total.textContent = "0";
    return;
  }
  
  let html = "<div style='max-width:800px; margin:0 auto; padding:20px;'>";
  let subtotal = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    
    html += `
      <div style='display:flex; justify-content:space-between; align-items:center; padding:15px; border-bottom:1px solid #ddd; margin-bottom:10px;'>
        <div style='display:flex; gap:15px; align-items:center; flex:1;'>
          <img src="${item.image}" alt="${item.name}" style='width:80px; height:80px; object-fit:cover; border-radius:5px;'>
          <div>
            <h4 style='margin:0;'>${item.name}</h4>
            <p style='margin:5px 0; color:#666;'>₹${item.price} × ${item.qty}</p>
          </div>
        </div>
        <div style='text-align:right;'>
          <p style='font-weight:bold; margin-bottom:8px;'>₹${itemTotal}</p>
          <div class="qty-controls" style='margin-bottom:8px;'>
            <button onclick="decreaseQty('${item.id}')">−</button>
            <span>${item.qty}</span>
            <button onclick="increaseQty('${item.id}')">+</button>
          </div>
          <button class="remove-btn" onclick="removeFromCart('${item.id}')" style='padding:5px 10px; font-size:12px;'>Remove</button>
        </div>
      </div>
    `;
  });
  
  html += "</div>";
  container.innerHTML = html;
  
  // Calculate totals
  const tax = Math.round(subtotal * TAX_PERCENTAGE / 100);
  const finalTotal = subtotal + tax + SHIPPING_COST;
  
  if (total) total.textContent = finalTotal;
  
  // Update price summary
  const summary = document.getElementById("price-summary");
  if (summary) {
    summary.innerHTML = `
      <div style='max-width:800px; margin:20px auto; padding:20px; background:#f5f5f5; border-radius:8px;'>
        <p style='display:flex; justify-content:space-between;'><span>Subtotal:</span> <span>₹${subtotal}</span></p>
        <p style='display:flex; justify-content:space-between;'><span>Tax (${TAX_PERCENTAGE}%):</span> <span>₹${tax}</span></p>
        <p style='display:flex; justify-content:space-between;'><span>Shipping:</span> <span>₹${SHIPPING_COST}</span></p>
        <hr style='margin:10px 0;'>
        <p style='display:flex; justify-content:space-between; font-weight:bold; font-size:16px;'><span>Total:</span> <span>₹${finalTotal}</span></p>
      </div>
    `;
  }
}

function removeFromCart(id) {
  const cart = getCart();
  const index = cart.findIndex(i => i.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
    saveCart(cart);
    loadCart();
    showNotification("Removed from cart");
  }
}

// =======================
// CHECKOUT & PAYMENT
// =======================
function checkout() {
  const cart = getCart();
  
  if (cart.length === 0) {
    showNotification("Your cart is empty!");
    return;
  }
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = Math.round(subtotal * TAX_PERCENTAGE / 100);
  const finalTotal = subtotal + tax + SHIPPING_COST;
  
  // Razorpay Options
  const options = {
    key: RAZORPAY_KEY,
    amount: finalTotal * 100, // Convert to paise
    currency: "INR",
    name: "OBIRA",
    description: "Accessory Purchase",
    handler: function (response) {
      localStorage.removeItem("cart");
      sessionStorage.setItem("paymentId", response.razorpay_payment_id);
      updateCartBadge();
      window.location.href = "success.html";
    },
    prefill: {
      name: "",
      email: "",
      contact: ""
    },
    theme: {
      color: "#111"
    },
    modal: {
      ondismiss: function () {
        showNotification("Payment cancelled. Cart saved.");
      }
    }
  };
  
  const rzp = new Razorpay(options);
  rzp.open();
}

// =======================
// SUCCESS PAGE
// =======================
function loadSuccess() {
  const container = document.getElementById("success-container");
  if (!container) return;
  
  const paymentId = sessionStorage.getItem("paymentId");
  
  if (!paymentId) {
    container.innerHTML = "<p>No payment information found. <a href='index.html'>Back to Home</a></p>";
    return;
  }
  
  container.innerHTML = `
    <div style='text-align:center; padding:40px;'>
      <div style='font-size:60px; margin-bottom:20px;'>✓</div>
      <h1>Payment Successful!</h1>
      <p style='font-size:16px; color:#666; margin:20px 0;'>Thank you for your purchase!</p>
      <p style='font-size:14px; color:#999;'>Payment ID: ${paymentId}</p>
      <p style='margin:30px 0; color:#666;'>We'll process your order shortly. Check your email for order updates.</p>
      <div style='display:flex; gap:15px; justify-content:center;'>
        <a href="track.html" style='padding:12px 25px; background:#111; color:white; text-decoration:none; border-radius:5px;'>Track Order</a>
        <a href="index.html" style='padding:12px 25px; background:#ddd; color:#111; text-decoration:none; border-radius:5px;'>Back to Home</a>
      </div>
    </div>
  `;
  
  sessionStorage.removeItem("paymentId");
}

// =======================
// INIT
// =======================
window.addEventListener('load', function () {
  loadStore();
  loadProduct();
  loadCart();
  loadWishlist();
  loadSuccess();
  updateCartBadge();
  updateWishlistBadge();
  
  // Load Razorpay script
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  document.body.appendChild(script);
});
