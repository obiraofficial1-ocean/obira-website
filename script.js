// ======================
// STORE PAGE PRODUCTS
// ======================

const storeProducts = document.getElementById("store-products");

if (storeProducts) {

    storeProducts.innerHTML = "";

    products.forEach(product => {

        storeProducts.innerHTML += `

        <div class="product-card">

            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
            </a>

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>

        </div>

        `;
    });
}



// ======================
// PRODUCT PAGE
// ======================

let selectedQty = 1;

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (productId) {

    const product = products.find(
        p => p.id == productId
    );

    if (product) {

        document.getElementById("p-img").src =
            product.image;

        document.getElementById("p-name").innerText =
            product.name;

        document.getElementById("p-price").innerText =
            "₹" + product.price;



        // SUGGESTIONS

        const suggestionBox =
            document.getElementById("suggested-products");

        if (suggestionBox) {

            const suggestions = products.filter(
                p =>
                p.category !== product.category
            );

            suggestions.forEach(item => {

                suggestionBox.innerHTML += `

                <div class="suggest-card">

                    <a href="product.html?id=${item.id}">
                        <img src="${item.image}">
                    </a>

                    <p>${item.name}</p>

                    <span>₹${item.price}</span>

                </div>

                `;
            });
        }
    }
}



// ======================
// PRODUCT QTY
// ======================

function increaseQtyFromProduct() {

    selectedQty++;

    document.getElementById("p-qty").innerText =
        selectedQty;
}

function decreaseQtyFromProduct() {

    if (selectedQty > 1) {

        selectedQty--;

        document.getElementById("p-qty").innerText =
            selectedQty;
    }
}



// ======================
// ADD TO CART
// ======================

function addToCart(id, qty = 1) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const existing =
        cart.find(item => item.id == id);

    if (existing) {

        existing.qty += qty;

    } else {

        cart.push({
            id: id,
            qty: qty
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Added to cart");
}



// ======================
// ADD FROM PRODUCT PAGE
// ======================

function addToCartFromProduct() {

    addToCart(productId, selectedQty);
}



// ======================
// CART PAGE
// ======================

const cartItems =
    document.getElementById("cart-items");

const totalElement =
    document.getElementById("total");

if (cartItems) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach(cartItem => {

        const product =
            products.find(
                p => p.id == cartItem.id
            );

        if (!product) return;

        total += product.price * cartItem.qty;

        cartItems.innerHTML += `

        <div class="cart-card">

            <img src="${product.image}">

            <div class="cart-info">

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

                <div class="qty-controls">

                    <button onclick="changeQty(${product.id}, -1)">
                        -
                    </button>

                    <span>${cartItem.qty}</span>

                    <button onclick="changeQty(${product.id}, 1)">
                        +
                    </button>

                </div>

                <button class="delete-btn"
                    onclick="removeItem(${product.id})">

                    <i class="fas fa-trash"></i>

                </button>

            </div>

        </div>

        `;
    });

    totalElement.innerText = total;
}



// ======================
// CHANGE QTY
// ======================

function changeQty(id, change) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const item =
        cart.find(i => i.id == id);

    if (!item) return;

    item.qty += change;

    if (item.qty <= 0) {

        cart = cart.filter(i => i.id != id);
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    location.reload();
}



// ======================
// REMOVE ITEM
// ======================

function removeItem(id) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(item => item.id != id);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    location.reload();
}



// ======================
// SHARE PRODUCT
// ======================

function shareProduct() {

    navigator.share({
        title: document.getElementById("p-name").innerText,
        url: window.location.href
    });
}



// ======================
// WISHLIST
// ======================

function addWishlist() {

    alert("Added to Wishlist");
}



// ======================
// PAYMENT
// ======================

function checkout() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {

        const product =
            products.find(
                p => p.id == item.id
            );

        if (product) {

            total += product.price * item.qty;
        }
    });

    const options = {

        key: "YOUR_RAZORPAY_KEY",

        amount: total * 100,

        currency: "INR",

        name: "OBIRA",

        description: "Order Payment",

        handler: function () {

            alert("Payment Successful");
        }
    };

    const rzp =
        new Razorpay(options);

    rzp.open();
}