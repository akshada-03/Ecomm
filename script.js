let container = document.getElementById("cnt");
let productData = [];

// Fetch products
fetch("https://fakestoreapi.com/products")
.then(res => res.json())
.then(data => {
    productData = data;
    displayData(data);
    updateCartCount();
});

// Display products
function displayData(data){
    let output = "";
    data.forEach(val => {
        output += `
            <div class="card">
                <img src="${val.image}" onclick="gotoProductPage(${val.id})">
                <h4>${val.title.split(" ").slice(0,5).join(" ")}</h4>
                <p class="price">₹ ${val.price}</p>
                <button onclick="addToCart(${val.id})">Add to Cart</button>
            </div>
        `;
    });
    container.innerHTML = output;
}


// Go to product page
function gotoProductPage(id){
    localStorage.setItem("id", id);
    window.location.href = "productView.html";
}

// Add to cart
function addToCart(id){
    let product = productData.find(p => p.id === id);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let exists = cart.find(p => p.id === id);
    if(!exists){
        cart.push(product);
        alert("Product added to cart");
    }else{
        alert("Product already in cart");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Cart count
function updateCartCount(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cartLink").textContent = `Cart (${cart.length})`;
}

// Search
document.getElementById("search").addEventListener("input", (e)=>{
    let value = e.target.value.toUpperCase();
    let result = productData.filter(p =>
        p.title.toUpperCase().includes(value)
    );
    displayData(result);
});
