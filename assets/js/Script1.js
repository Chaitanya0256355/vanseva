document.addEventListener("DOMContentLoaded", function () {
    // Fetch plants from the server
    fetchPlants();
});

// Function to fetch plants from the server
function fetchPlants() {
    var plantList = document.getElementById("plant-list");

    // Using Fetch API to make an AJAX request
    fetch('get_plants.php')
        .then(response => response.json())
        .then(plants => {
            // Display plants dynamically
            var plantsHTML = "<ul>";
            plants.forEach(plant => {
                plantsHTML += `<li>${plant.name} - $${plant.price.toFixed(2)} <button onclick="addToCart(${plant.id})">Add to Cart</button></li>`;
            });
            plantsHTML += "</ul>";
            plantList.innerHTML = plantsHTML;
        })
        .catch(error => console.error('Error fetching plants:', error));
}

// Function to add a plant to the cart
function addToCart(plantId) {
    // AJAX request to add the plant to the cart on the server
    fetch(`add_to_cart.php?plantId=${plantId}`)
        .then(response => response.json())
        .then(cartData => {
            updateCart(cartData);
        })
        .catch(error => console.error('Error adding to cart:', error));
}

// Function to update the cart on the page
function updateCart(cartData) {
    var cartItems = document.getElementById("cart-items");
    var totalElement = document.getElementById("total");

    // Clear current cart items
    cartItems.innerHTML = "";

    // Populate cart items
    cartData.items.forEach(item => {
        var li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });

    // Update total
    totalElement.textContent = `Total: $${cartData.total.toFixed(2)}`;
}

// Function to simulate checkout (reset the cart)
function checkout() {
    // AJAX request to handle checkout on the server
    fetch('checkout.php')
        .then(response => response.json())
        .then(cartData => {
            updateCart(cartData);
            alert("Checkout successful! Thank you for your donation.");
        })
        .catch(error => console.error('Error checking out:', error));
}
