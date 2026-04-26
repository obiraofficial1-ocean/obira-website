// script.js

// Shopping Cart Management
let cart = [];

function addToCart(product) {
    cart.push(product);
    saveCart();
}

function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    saveCart();
}

function clearCart() {
    cart = [];
    saveCart();
}

function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function loadCart() {
    cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
}

// Wishlist Functionality
let wishlist = [];

function addToWishlist(product) {
    wishlist.push(product);
    saveWishlist();
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(product => product.id !== productId);
    saveWishlist();
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function loadWishlist() {
    wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
}

// Product Filtering and Sorting
function filterProducts(products, criteria) {
    return products.filter(product => product.category === criteria);
}

function sortProducts(products, property, order = 'asc') {
    return products.sort((a, b) => {
        if (order === 'asc') {
            return a[property] > b[property] ? 1 : -1;
        } else {
            return a[property] < b[property] ? 1 : -1;
        }
    });
}  

// On load
loadCart();
loadWishlist();
