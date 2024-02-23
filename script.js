let card = [];

function addToCart() {
    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);

    if (productName && !isNaN(productPrice) && productPrice >= 0) {
        const product = { name: productName, price: productPrice, quantity: 1 };
        const existingProduct = card.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            card.push(product);
        }
        updateCart();
    } else if (!productPrice >= 0) {
        alert("The price of the product cannot be negative!!!.");
    }
    else {
        alert('The product name must be entered and the price must be at least "0".');
    }
}

function updateCart() {
    const cartList = document.getElementById('cartList');
    const totalPriceElement = document.getElementById('totalPrice');

    cartList.innerHTML = '';
    let totalPrice = 0;

    card.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${product.name} - ${product.price} AZN x ${product.quantity} 
                <button onclick="removeOneFromCart('${product.name}')">-</button> 
                <button onclick="addOneToCart('${product.name}')">+</button>
                <button onclick="removeFromCart('${product.name}')">Sil</button>`;
        cartList.appendChild(listItem);

        totalPrice += product.price * product.quantity;
    });

    totalPriceElement.textContent = `Cəm: ${totalPrice.toFixed(2)} AZN`;
}

function removeOneFromCart(productName) {
    const productIndex = card.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        const product = card[productIndex];

        if (product.quantity > 1) {
            product.quantity--;
        } else {
            card.splice(productIndex, 1);
        }
        updateCart();
    }
}

function addOneToCart(productName) {
    const productIndex = card.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        const product = card[productIndex];
        product.quantity++;
        updateCart();
    }
}

function removeFromCart(productName) {
    const productIndex = card.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        card.splice(productIndex, 1);
        updateCart();
    }
}

function clearCart() {
    card = [];
    updateCart();
}
