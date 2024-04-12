// cart.js

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Reference to the cart items container
    const cartItemsContainer = document.getElementById('cart-items');

    // Function to generate HTML for a single cart item
    function generateCartItemHTML(item) {
        return `
            <div class="cart-item">
                <img src="${item.photo}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price}</p>
                    <p>Options: ${item.options}</p>
                </div>
            </div>
        `;
    }

    // Function to display cart items
    function displayCartItems() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const itemHTML = generateCartItemHTML(item);
            cartItemsContainer.innerHTML += itemHTML;
            totalPrice += item.price;
        });

        // Update total price
        document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Display cart items when the page loads
    displayCartItems();
});
