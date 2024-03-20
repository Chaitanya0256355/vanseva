function addToCart(plantId) {
    // Use AJAX or fetch to send the plantId to the server and update the cart
    // For simplicity, let's use session storage for the cart on the client side

    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let cartDetails = JSON.parse(sessionStorage.getItem('cartDetails')) || {};

    if (!cart.includes(plantId)) {
        cart.push(plantId);
        cartDetails[plantId] = {
            name: document.querySelector(`.plantItem[data-id="${plantId}"]`).getAttribute('data-name'),
            price: parseFloat(document.querySelector(`.plantItem[data-id="${plantId}"]`).getAttribute('data-price')),
            quantity: 1
        };

        sessionStorage.setItem('cart', JSON.stringify(cart));
        sessionStorage.setItem('cartDetails', JSON.stringify(cartDetails));

        // Update the UI
        updateCartUI();
    } else {
        // If the item is already in the cart, update quantity
        cartDetails[plantId].quantity++;
        sessionStorage.setItem('cartDetails', JSON.stringify(cartDetails));

        // Update the UI
        updateCartUI();
    }
}

function updateCartUI() {
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartDetails = JSON.parse(sessionStorage.getItem('cartDetails')) || {};
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceContainer = document.getElementById('totalPrice');

    // Clear existing items
    cartItemsContainer.innerHTML = '';

    // Display current cart items
    let total = 0;

    cartItems.forEach(itemId => {
        const listItem = document.createElement('li');
        const itemDetails = cartDetails[itemId];
        const itemTotal = itemDetails.quantity * itemDetails.price;

        listItem.textContent = `${itemDetails.name} - Quantity: ${itemDetails.quantity} - Price: $${itemDetails.price.toFixed(2)} - Total: $${itemTotal.toFixed(2)}`;
        cartItemsContainer.appendChild(listItem);

        total += itemTotal;
    });

    // Display total price
    totalPriceContainer.textContent = `Total: $${total.toFixed(2)}`;
}

function checkout() {
    // Redirect to a checkout or confirmation page
    window.location.href = 'checkout.php';
}

// Initial UI update
updateCartUI();
