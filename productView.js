let id = localStorage.getItem("id");
let mainCnt = document.getElementById("mainCnt");

if(id){
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(product => {
        mainCnt.innerHTML = `
            <div class="productImage">
                <img src="${product.image}">
            </div>
            <div class="productDetails">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p class="price">₹ ${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

function addToCart(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(product => {
        let exists = cart.find(p => p.id === id);
        if(!exists){
            cart.push(product);
            alert("Product added to cart");
        }else{
            alert("Product already in cart");
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    });
}

function updateCartCount(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cartLink").textContent = `Cart (${cart.length})`;
}

updateCartCount();
