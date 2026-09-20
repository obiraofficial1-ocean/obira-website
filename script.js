// =======================
// CONSTANTS & CONFIG
// =======================
const RAZORPAY_KEY = "rzp_test_SljBi0Hjg0lqGY";
const TAX_PERCENTAGE = 2;
const SHIPPING_COST = 49;

// =======================
// STORAGE HELPERS
// =======================
function normalizeWishlist(rawWishlist) {
  if (!Array.isArray(rawWishlist)) return [];

  const seen = new Set();
  const sanitized = [];

  rawWishlist.forEach((item) => {
    if (!item || typeof item !== 'object') return;

    const candidateId = item.id;
    if (candidateId === undefined || candidateId === null || candidateId === '') return;

    const product = products.find(p => String(p.id) === String(candidateId));
    if (!product) return;

    const productId = String(product.id);
    if (seen.has(productId)) return;

    seen.add(productId);
    sanitized.push({
      ...product,
      id: product.id,
      name: product.name || 'Unnamed Product',
      price: Number(product.price) || 0,
      image: product.image || '',
      category: product.category || 'general'
    });
  });

  return sanitized;
}

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
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const sanitizedWishlist = normalizeWishlist(storedWishlist);

    if (sanitizedWishlist.length !== storedWishlist.length) {
      localStorage.setItem("wishlist", JSON.stringify(sanitizedWishlist));
      updateWishlistBadge();
    }

    return sanitizedWishlist;
  } catch (e) {
    console.error("Error parsing wishlist:", e);
    return [];
  }
}

function saveWishlist(wishlist) {
  try {
    const sanitizedWishlist = normalizeWishlist(wishlist);
    localStorage.setItem("wishlist", JSON.stringify(sanitizedWishlist));
    updateWishlistBadge();
  } catch (e) {
    console.error("Error saving wishlist:", e);
  }
}

function showNotification(message) {
  let notification = document.getElementById("notification");
  if (!notification) {
    notification = document.createElement("div");
    notification.id = "notification";
    notification.classList.add("notification");
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

function updateCartBadge() {
  const cart = getCart();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.textContent = cartCount;
    badge.style.display = cartCount > 0 ? "inline" : "none";
  }
}

function updateWishlistBadge() {
  const wishlist = getWishlist();
  const badge = document.getElementById("wishlist-badge");
  const count = wishlist.length;
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline" : "none";
  }
}

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
  if (typeof loadStore === 'function') loadStore();
  if (typeof loadCart === 'function') loadCart();
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
  if (typeof loadStore === 'function') loadStore();
  if (typeof loadCart === 'function') loadCart();
}

function getDiscountedPrice(price) {
  const rate = getCouponRate();
  return Math.max(0, Math.round(price * (1 - rate / 100)));
}

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
    const salePrice = getDiscountedPrice(p.price);

    container.innerHTML += `
      <div class="product-card">
        <div class="product-image-container">
          <img src="${p.image}" alt="${p.name}" onclick="openProduct('${p.id}')" class="product-img">
          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${p.id}', event)" title="Add to wishlist">♥</button>
        </div>
        <h3>${p.name}</h3>
        <div class="price-stack">
          <span class="price">₹${salePrice}</span>
          <span class="original-price">₹${p.price}</span>
          <span class="discount-badge">${getCouponRate() || 8}% OFF</span>
        </div>
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
  const salePrice = getDiscountedPrice(product.price);

  container.innerHTML = `
    <div class="product-detail-container">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h1>${product.name}</h1>
        <div class="price-stack">
          <p class="product-price">₹${salePrice}</p>
          <span class="original-price">₹${product.price}</span>
          <span class="discount-badge">${getCouponRate() || 8}% OFF</span>
        </div>
        <p>${product.description || 'Signature OBIRA styling with premium finish.'}</p>
        <div class="pairing-panel" id="pairing-slot"></div>
        <div class="qty-section">
          <label>Quantity:</label>
          <div class="qty-controls">
            <button onclick="decreaseQty('${product.id}')">−</button>
            <span id="product-qty">${qty}</span>
            <button onclick="increaseQty('${product.id}')">+</button>
          </div>
        </div>
        <div class="detail-actions">
          <button class="add-to-cart-btn" onclick="increaseQty('${product.id}'); showNotification('Added to cart!');">Add to Cart</button>
          <button class="secondary-action" onclick="toggleWishlist('${product.id}', event)">♥</button>
        </div>
        <a href="store.html" class="back-link">← Back to Store</a>
      </div>
    </div>
  `;

  if (typeof obiraLoadProductEnhancement === 'function') obiraLoadProductEnhancement();
}

function loadWishlist() {
  const container = document.getElementById("wishlist-items");
  if (!container) return;

  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    container.innerHTML = "<div class='empty-state'>Your wishlist is empty. <a href='store.html'>Continue Shopping</a></div>";
    return;
  }

  let html = "<div class='wishlist-grid'>";

  wishlist.forEach(product => {
    if (!product || !product.id || !product.name) return;

    const cart = getCart();
    const cartItem = cart.find(i => i.id === product.id);
    const qty = cartItem ? cartItem.qty : 0;
    const salePrice = getDiscountedPrice(product.price);

    html += `
      <div class="wishlist-item">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">₹${salePrice}</p>
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
  if (!id) return;

  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter(w => String(w.id) !== String(id));

  if (updatedWishlist.length === wishlist.length) return;

  saveWishlist(updatedWishlist);
  loadWishlist();
  showNotification("Removed from wishlist");
}

function toggleWishlist(id, event) {
  if (event) event.stopPropagation();
  if (!id) return;

  const wishlist = getWishlist();
  const index = wishlist.findIndex(w => String(w.id) === String(id));

  if (index === -1) {
    const product = products.find(p => String(p.id) === String(id));
    if (product) {
      wishlist.push(product);
      showNotification("Added to wishlist! ♥");
    }
  } else {
    wishlist.splice(index, 1);
    showNotification("Removed from wishlist");
  }

  saveWishlist(wishlist);
  if (document.getElementById("store-products")) loadStore();
  if (document.getElementById("wishlist-items")) loadWishlist();
}

function loadCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  const cart = getCart();
  const total = document.getElementById("total");

  if (cart.length === 0) {
    container.innerHTML = "<div class='empty-state'>Your cart is empty. <a href='store.html'>Continue Shopping</a></div>";
    if (total) total.textContent = "0";
    if (document.getElementById("price-summary")) {
      document.getElementById("price-summary").innerHTML = `
        <div class='summary-card'>
          <h3>Order summary</h3>
          <p class='summary-row'><span>Subtotal</span><strong>₹0</strong></p>
          <p class='summary-row'><span>Tax (2%)</span><strong>₹0</strong></p>
          <p class='summary-row'><span>Shipping</span><strong>₹${SHIPPING_COST}</strong></p>
          <p class='summary-row total'><span>Total</span><strong>₹${SHIPPING_COST}</strong></p>
        </div>
      `;
    }
    return;
  }

  let html = "<div class='cart-items-list'>";
  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = getDiscountedPrice(item.price) * item.qty;
    subtotal += itemTotal;

    html += `
      <div class='cart-item-card'>
        <img class='cart-item-image' src='${item.image}' alt='${item.name}'>
        <div class='cart-item-info'>
          <h3>${item.name}</h3>
          <p>₹${getDiscountedPrice(item.price)} × ${item.qty}</p>
        </div>
        <div class='cart-item-actions'>
          <div class='price'>₹${itemTotal}</div>
          <div class='qty-controls'>
            <button onclick="decreaseQty('${item.id}')">−</button>
            <span>${item.qty}</span>
            <button onclick="increaseQty('${item.id}')">+</button>
          </div>
          <button class='remove-btn' onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
      </div>
    `;
  });

  html += "</div>";
  container.innerHTML = html;

  const pairSaving = cart.some(i => i.category === 'bracelets') && cart.some(i => i.category === 'chains') ? Math.round(subtotal * 0.1) : 0;
  const couponSaving = Math.round((subtotal - pairSaving) * getCouponRate() / 100);
  const taxable = subtotal - pairSaving - couponSaving;
  const tax = Math.round(taxable * TAX_PERCENTAGE / 100);
  const finalTotal = taxable + tax + SHIPPING_COST;

  if (total) total.textContent = finalTotal;

  const summary = document.getElementById("price-summary");
  if (summary) {
    summary.innerHTML = `
      <div class='summary-card'>
        <h3>Order summary</h3>
        <p class='summary-row'><span>Subtotal</span><strong>₹${subtotal}</strong></p>
        <p class='summary-row'><span>Pairing savings</span><strong>-₹${pairSaving}</strong></p>
        <p class='summary-row'><span>Coupon <small data-coupon-label>${getCoupon() ? `${getCoupon()} · ${getCouponRate()}% off` : 'No coupon applied'}</small></span><strong>-₹${couponSaving}</strong></p>
        <p class='summary-row'><span>Tax (${TAX_PERCENTAGE}%)</span><strong>₹${tax}</strong></p>
        <p class='summary-row'><span>Shipping</span><strong>₹${SHIPPING_COST}</strong></p>
        <p class='summary-row total'><span>Total</span><strong>₹${finalTotal}</strong></p>
        <div class='coupon-box'>
          <input id='coupon-code' placeholder='Coupon code' value='${getCoupon() || ''}'>
          <button onclick="applyCoupon()">Apply</button>
        </div>
        <div id='coupon-message' data-coupon-label>${getCoupon() ? `${getCoupon()} applied` : 'Try the wheel or enter a coupon.'}</div>
        <button class='checkout-btn' onclick='checkout()'>Proceed to Payment</button>
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

function checkout() {
  const cart = getCart();

  if (cart.length === 0) {
    showNotification("Your cart is empty!");
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (getDiscountedPrice(item.price) * item.qty), 0);
  const pairSaving = cart.some(i => i.category === 'bracelets') && cart.some(i => i.category === 'chains') ? Math.round(subtotal * 0.1) : 0;
  const couponSaving = Math.round((subtotal - pairSaving) * getCouponRate() / 100);
  const taxable = subtotal - pairSaving - couponSaving;
  const tax = Math.round(taxable * TAX_PERCENTAGE / 100);
  const finalTotal = taxable + tax + SHIPPING_COST;

  sessionStorage.setItem("orderCart", JSON.stringify(cart));

  const options = {
    key: RAZORPAY_KEY,
    amount: finalTotal * 100,
    currency: "INR",
    name: "OBIRA",
    description: "Accessory Purchase",
    handler: function (response) {
      sessionStorage.setItem("paymentId", response.razorpay_payment_id);
      sessionStorage.setItem("orderCart", JSON.stringify(cart));
      window.location.href = "shipping-details.html";
    },
    prefill: { name: "", email: "", contact: "" },
    theme: { color: "#111" },
    modal: {
      ondismiss: function () {
        showNotification("Payment cancelled. Cart saved.");
      }
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}

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
        <a href='track.html' style='padding:12px 25px; background:#111; color:white; text-decoration:none; border-radius:5px;'>Track Order</a>
        <a href='index.html' style='padding:12px 25px; background:#ddd; color:#111; text-decoration:none; border-radius:5px;'>Back to Home</a>
      </div>
    </div>
  `;

  sessionStorage.removeItem("paymentId");
}

window.addEventListener('load', function () {
  loadStore();
  loadProduct();
  loadCart();
  loadWishlist();
  loadSuccess();
  updateCartBadge();
  updateWishlistBadge();

  if (typeof obiraInitShowcase === 'function') obiraInitShowcase();
  if (typeof obiraLoadProductEnhancement === 'function') obiraLoadProductEnhancement();
  if (typeof updateCouponLabels === 'function') updateCouponLabels();

  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  document.body.appendChild(script);
});
