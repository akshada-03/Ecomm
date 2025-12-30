function displayCart(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let output = "";
    let total = 0;

    if(cart.length === 0){
        document.getElementById("cartContainer").innerHTML =
        `<h2 class='emptyCart'>Cart is empty</h2>
        <img src= "https://cdn-icons-png.flaticon.com/512/11329/11329060.png">`
        updateCartCount();
        return;
    }

    cart.forEach((val, index)=>{
        total += val.price;

        output += `
            <div class="card">
                <img src="${val.image}">
                <h4>${val.title.split(" ").slice(0,4).join(" ")}</h4>
                <p class="price">₹ ${val.price}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    output += `<h2>Total Price : ₹ ${total.toFixed(2)}</h2>`;

    document.getElementById("cartContainer").innerHTML = output;
    updateCartCount();
}

function removeItem(index){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function updateCartCount(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cartLink").textContent = `Cart (${cart.length})`;
}

displayCart();
