let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart = cart.map(item => ({
...item,
qty: item.qty || 1
}));

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

function openProduct(id){
localStorage.setItem("selectedProduct", id);
window.location.href="product.html";
}

function loadProduct(){
let id = localStorage.getItem("selectedProduct");
if(!id) return;

let p = products.find(x=>x.id===id);
if(!p) return;

document.getElementById("p-name").innerText=p.name;
document.getElementById("p-price").innerText="₹"+p.price;
document.getElementById("p-img").src=p.image;
}

function addToCart(id){
let existing = cart.find(item=>item.id===id);

if(existing){
existing.qty++;
}else{
let p = products.find(x=>x.id===id);
cart.push({...p, qty:1});
}

localStorage.setItem("cart", JSON.stringify(cart));
alert("Added to cart");
}

function addToCartFromPage(){
let id = localStorage.getItem("selectedProduct");
addToCart(id);
}

function loadCart(){
let container=document.getElementById("cart-items");
if(!container) return;

container.innerHTML="";
let total=0;

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
<button class="remove-btn" onclick="removeItem('${item.id}')">Remove</button>
</div>
</div>
`;
});

document.getElementById("total").innerText=total;
localStorage.setItem("cart", JSON.stringify(cart));
}

function increaseQty(id){
let item=cart.find(i=>i.id===id);
item.qty++;
loadCart();
}

function decreaseQty(id){
let item=cart.find(i=>i.id===id);

if(item.qty>1){
item.qty--;
}else{
cart=cart.filter(i=>i.id!==id);
}

loadCart();
}

function removeItem(id){
cart=cart.filter(i=>i.id!==id);
loadCart();
}

function checkout(){
let total=cart.reduce((sum,item)=>sum+(item.price*item.qty),0);

if(total===0){
alert("Cart is empty");
return;
}

var options={
"key":"rzp_test_SljBi0Hjg0lqGY",
"amount":total*100,
"currency":"INR",
"name":"OBIRA",
"description":"Order Payment",
"handler":function(){
localStorage.removeItem("cart");
window.location.href="success.html";
}
};

var rzp=new Razorpay(options);
rzp.open();
}

document.addEventListener("DOMContentLoaded", ()=>{
loadStore();
loadProduct();
loadCart();
});