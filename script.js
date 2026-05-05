// =======================
// CART STORAGE
// =======================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =======================
// LOAD STORE PAGE
// =======================
function loadStore(){

let container = document.getElementById("store-products");
if(!container) return;

container.innerHTML = "";

products.forEach(p=>{

container.innerHTML += `
<div class="product-card">

<img src="${p.image}" onclick="openProduct('${p.id}')">

<h3>${p.name}</h3>

<p class="price">₹${p.price}</p>

<button onclick="addToCart('${p.id}')">Add to Cart</button>

</div>
`;

});

}

// =======================
// OPEN PRODUCT PAGE
// =======================
function openProduct(id){
localStorage.setItem("selectedProduct", id);
window.location.href = "product.html";
}

// =======================
// LOAD PRODUCT PAGE
// =======================
function loadProduct(){

let id = localStorage.getItem("selectedProduct");
if(!id) return;

let p = products.find(x=>x.id === id);
if(!p) return;

document.getElementById("p-name").innerText = p.name;
document.getElementById("p-price").innerText = "₹" + p.price;
document.getElementById("p-img").src = p.image;

}

// =======================
// ADD TO CART
// =======================
function addToCart(id){

let p = products.find(x=>x.id === id);
if(!p) return;

cart.push(p);

localStorage.setItem("cart", JSON.stringify(cart));

alert("Added to cart");

}

// =======================
// ADD FROM PRODUCT PAGE
// =======================
function addToCartFromPage(){

let id = localStorage.getItem("selectedProduct");
if(!id) return;

addToCart(id);

}

// =======================
// LOAD CART PAGE
// =======================
function loadCart(){

let container = document.getElementById("cart-items");
if(!container) return;

container.innerHTML = "";

let total = 0;

cart.forEach(item=>{

total += item.price;

container.innerHTML += `
<div>

<img src="${item.image}">

<div>
<p>${item.name}</p>
<p>₹${item.price}</p>
</div>

</div>
`;

});

document.getElementById("total").innerText = total;

}

// =======================
// CHECKOUT (RAZORPAY TEST)
// =======================
function checkout(){

let total = cart.reduce((sum, item)=> sum + item.price, 0);

if(total === 0){
alert("Cart is empty");
return;
}

var options = {
"key": "rzp_test_SljBi0Hjg0lqGY",
"amount": total * 100,
"currency": "INR",
"name": "OBIRA",
"description": "Order Payment",

"handler": function (){
localStorage.removeItem("cart");
window.location.href = "success.html";
}
};

var rzp = new Razorpay(options);
rzp.open();

}

// =======================
// INIT ALL PAGES
// =======================
document.addEventListener("DOMContentLoaded", ()=>{

loadStore();
loadProduct();
loadCart();

});