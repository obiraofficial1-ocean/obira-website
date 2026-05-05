let cart = JSON.parse(localStorage.getItem("cart")) || [];

// LOAD STORE
function loadStore(){
let container = document.getElementById("store-products");
if(!container) return;

container.innerHTML = "";

products.forEach(p=>{
container.innerHTML += `
<div>
<img src="${p.image}" width="150" onclick="openProduct('${p.id}')">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<button onclick="addToCart('${p.id}')">Add to Cart</button>
</div>
`;
});
}

// OPEN PRODUCT
function openProduct(id){
localStorage.setItem("selectedProduct", id);
window.location.href="product.html";
}

// LOAD PRODUCT PAGE
function loadProduct(){
let id = localStorage.getItem("selectedProduct");
let p = products.find(x=>x.id===id);
if(!p) return;

document.getElementById("p-name").innerText = p.name;
document.getElementById("p-price").innerText = "₹"+p.price;
document.getElementById("p-img").src = p.image;
}

// ADD FROM PRODUCT PAGE
function addToCartFromPage(){
let id = localStorage.getItem("selectedProduct");
addToCart(id);
}

// ADD TO CART
function addToCart(id){
let p = products.find(x=>x.id===id);
cart.push(p);
localStorage.setItem("cart", JSON.stringify(cart));
alert("Added to cart");
}

// LOAD CART
function loadCart(){
let container = document.getElementById("cart-items");
if(!container) return;

let total = 0;
container.innerHTML = "";

cart.forEach(i=>{
total += i.price;

container.innerHTML += `
<div>
<img src="${i.image}" width="100">
<p>${i.name}</p>
<p>₹${i.price}</p>
</div>
`;
});

document.getElementById("total").innerText = total;
}

// PAYMENT
function checkout(){

let total = cart.reduce((sum,i)=>sum+i.price,0);

var options = {
"key": "rzp_test_SljBi0Hjg0lqGY",
"amount": total * 100,
"currency": "INR",
"name": "OBIRA",
"description": "Test Payment",
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
loadStore();
loadProduct();
loadCart();
});