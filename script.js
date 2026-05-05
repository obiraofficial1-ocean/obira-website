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

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// CART
function addToCart(id){
let product = products.find(p=>p.id===id);
cart.push(product);
localStorage.setItem("cart", JSON.stringify(cart));
updateCartCount();
alert("Added to cart");
}

function updateCartCount(){
document.querySelectorAll("#cart-count").forEach(el=>{
el.innerText = cart.length;
});
}

// STORE LOAD
function loadStore(){
let container = document.getElementById("store-products");
if(!container) return;

container.innerHTML = "";

products.forEach(p=>{
container.innerHTML += `
<div class="product-card">
<img src="${p.image}" onclick="openProduct('${p.id}')">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<button onclick="addToCart('${p.id}')">Add to Cart</button>
</div>
`;
});
}

// PRODUCT PAGE
function openProduct(id){
window.location.href = "product.html?id="+id;
}

function loadProduct(){
let id = new URLSearchParams(window.location.search).get("id");
let p = products.find(x=>x.id===id);
if(!p) return;

document.getElementById("p-name").innerText = p.name;
document.getElementById("p-price").innerText = "₹"+p.price;
document.getElementById("p-img").src = p.image;
}

// CART PAGE
function loadCart(){
let container = document.getElementById("cart-items");
let total = 0;

if(!container) return;

container.innerHTML="";

cart.forEach(item=>{
total+=item.price;
container.innerHTML+=`
<div class="cart-item">
<img src="${item.image}">
<p>${item.name}</p>
<p>₹${item.price}</p>
</div>
`;
});

document.getElementById("total").innerText = total;
}

// PAYMENT
function checkout(){

let total = cart.reduce((s,i)=>s+i.price,0);

var options = {
"key": "rzp_test_SljBi0Hjg0lqGY",
"amount": total*100,
"currency": "INR",
"name": "OBIRA",
"description": "Order Payment",
"handler": function (){
localStorage.removeItem("cart");
window.location.href="success.html";
}
};

var rzp = new Razorpay(options);
rzp.open();
}

// INIT
document.addEventListener("DOMContentLoaded", ()=>{
updateCartCount();
loadStore();
loadProduct();
loadCart();
});