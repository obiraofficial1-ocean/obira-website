// ================= GLOBAL STORAGE =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// ================= SAVE FUNCTIONS =================

function saveCart() {
localStorage.setItem("cart", JSON.stringify(cart));
updateCartCount();
}

function saveWishlist() {
localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// ================= CART =================

function addToCart(id) {
const product = products.find(p => p.id === id);
cart.push(product);
saveCart();
alert("Added to cart");
}

function updateCartCount() {
const count = document.getElementById("cart-count");
if(count) count.innerText = cart.length;
}

// ================= WISHLIST =================

function toggleWishlist(id) {
if(wishlist.includes(id)) {
wishlist = wishlist.filter(item => item !== id);
} else {
wishlist.push(id);
}
saveWishlist();
renderStore(); // refresh hearts
}

// ================= SHARE =================

function shareProduct(product) {
const url = window.location.origin + "/product.html?id=" + product.id;

if(navigator.share) {
navigator.share({
title: product.name,
text: product.name,
url: url
});
} else {
navigator.clipboard.writeText(url);
alert("Link copied!");
}
}

// ================= NAVIGATION =================

function openProduct(id) {
window.location.href = "product.html?id=" + id;
}

// ================= STORE PAGE =================

function renderStore() {
const container = document.getElementById("store-products");
if(!container) return;

container.innerHTML = "";

products.forEach(product => {

const isWish = wishlist.includes(product.id);

container.innerHTML += `
<div class="product-card">
<img src="${product.image}" onclick="openProduct('${product.id}')">

<h3>${product.name}</h3>
<p>₹${product.price}</p>

<div class="product-actions">
<button onclick="addToCart('${product.id}')">Add to Cart</button>

<span class="heart ${isWish ? 'active' : ''}" onclick="toggleWishlist('${product.id}')">❤</span>

<span class="share" onclick='shareProduct(${JSON.stringify(product)})'>🔗</span>
</div>
</div>
`;
});

updateCartCount();
}

// ================= PRODUCT PAGE =================

function loadProductPage() {
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const product = products.find(p => p.id === id);
if(!product) return;

document.getElementById("product-name").innerText = product.name;
document.getElementById("product-price").innerText = "₹" + product.price;
document.getElementById("product-main-img").src = product.image;
document.getElementById("product-desc").innerText = product.desc;

// gallery
const gallery = document.getElementById("product-gallery");
gallery.innerHTML = "";

product.images.forEach(img => {
gallery.innerHTML += `<img src="${img}" onclick="changeImage('${img}')">`;
});

updateCartCount();
}

// change image
function changeImage(src) {
document.getElementById("product-main-img").src = src;
}

// ================= INIT =================

document.addEventListener("DOMContentLoaded", () => {
renderStore();
loadProductPage();
updateCartCount();
});