// =======================
// CART STORAGE (ALWAYS FRESH)
// =======================
function getCart(){
return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
localStorage.setItem("cart", JSON.stringify(cart));
}

// =======================
// STORE PAGE
// =======================
function loadStore(){

let container = document.getElementById("store-products");
if(!container) return;

let cart = getCart();

container.innerHTML = "";

products.forEach(p=>{

let item = cart.find(i=>i.id===p.id);
let qty = item ? item.qty : 0;

container.innerHTML += `
<div class="product-card">

<img src="${p.image}" onclick="openProduct('${p.id}')">

<h3>${p.name}</h3>
<p class="price">₹${p.price}</p>

<div class="qty-controls">
<button onclick="decreaseQty('${p.id}')">-</button>
<span>${qty}</span>
<button onclick="increaseQty('${p.id}')">+</button>
</div>

</div>
`;

});

}

// =======================
// PRODUCT PAGE
// =======================
function openProduct(id){
localStorage.setItem("selectedProduct", id);
window.location.href="product.html";
}

// =======================
// CART FUNCTIONS
// =======================
function increaseQty(id){

let cart = getCart();

let item = cart.find(i=>i.id===id);

if(item){
item.qty++;
}else{
let p = products.find(x=>x.id===id);
cart.push({...p, qty:1});
}

saveCart(cart);
loadStore();
loadCart();
}

function decreaseQty(id){

let cart = getCart();

let item = cart.find(i=>i.id===id);

if(!item) return;

if(item.qty > 1){
item.qty--;
}else{
cart = cart.filter(i=>i.id!==id);
}

saveCart(cart);
loadStore();
loadCart();
}

function removeItem(id){

let cart = getCart();
cart = cart.filter(i=>i.id!==id);

saveCart(cart);
loadStore();
loadCart();
}

// =======================
// LOAD CART PAGE (FIXED)
// =======================
function loadCart(){

let container = document.getElementById("cart-items");
if(!container) return;

let cart = getCart();

container.innerHTML = "";

let total = 0;

cart.forEach(item=>{

total += item.price * item.qty;

container.innerHTML += `
<div class="cart-item">

<img src="${item.image}">

<div class="cart-info">
<p>${item.name}</p>
<p>₹${item.price}</p>

<div class="qty-controls">
<button onclick="decreaseQty('${item.id}')">-</button>
<span>${item.qty}</span>
<button onclick="increaseQty('${item.id}')">+</button>
</div>

<button class="remove-btn" onclick="removeItem('${item.id}')">🗑</button>

</div>

</div>
`;

});

document.getElementById("total").innerText = total;

}

// =======================
// CHECKOUT
// =======================
function checkout(){

let cart = getCart();

let total = cart.reduce((sum,item)=> sum + item.price * item.qty, 0);

if(total === 0){
alert("Cart is empty");
return;
}

var options = {
"key":"rzp_test_SljBi0Hjg0lqGY",
"amount": total * 100,
"currency":"INR",
"name":"OBIRA",
"description":"Order Payment",
"handler":function(){
localStorage.removeItem("cart");
window.location.href="success.html";
}
};

var rzp = new Razorpay(options);
rzp.open();
}

// =======================
// INIT
// =======================
window.onload = function(){
loadStore();
loadCart();
};




// =======================
// PRODUCT PAGE FIX
// =======================
let productQty = 1;

function loadProduct(){

let id = localStorage.getItem("selectedProduct");
if(!id) return;

let p = products.find(x => x.id === id);
if(!p) return;

document.getElementById("p-name").innerText = p.name;
document.getElementById("p-price").innerText = "₹" + p.price;
document.getElementById("p-img").src = p.image;

loadSuggestions(p.category);
}

function increaseQtyFromProduct(){
productQty++;
document.getElementById("p-qty").innerText = productQty;
}

function decreaseQtyFromProduct(){
if(productQty > 1){
productQty--;
document.getElementById("p-qty").innerText = productQty;
}
}

function addToCartFromProduct(){

let id = localStorage.getItem("selectedProduct");
let cart = getCart();

let existing = cart.find(i=>i.id===id);

if(existing){
existing.qty += productQty;
}else{
let p = products.find(x=>x.id===id);
cart.push({...p, qty: productQty});
}

saveCart(cart);
alert("Added to cart");
}

// =======================
// SUGGESTIONS SYSTEM
// =======================
function loadSuggestions(category){

let container = document.getElementById("suggested-products");
if(!container) return;

container.innerHTML = "";

let suggested = [];

if(category === "bracelets"){
suggested = products.filter(p=>p.category === "chains");
}
else if(category === "chains"){
suggested = products.filter(p=>p.category === "clips");
}
else{
suggested = products.slice(0,4);
}

suggested.slice(0,4).forEach(p=>{
container.innerHTML += `
<div class="product-card">
<img src="${p.image}" onclick="openProduct('${p.id}')">
<p>${p.name}</p>
<p>₹${p.price}</p>
</div>
`;
});

}