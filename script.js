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
// ... rest of your script.js remains unchanged ...
// =======================
// INIT
// =======================
window.addEventListener('load', function () {
  loadStore();
  loadProduct();
  loadCart();
  updateCartBadge();
  updateWishlistBadge();
  // Load Razorpay script
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  document.body.appendChild(script);
});
