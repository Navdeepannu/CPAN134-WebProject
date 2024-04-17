document.addEventListener('DOMContentLoaded', function() {
    // Function to display cart items
    function displayCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartContainer = document.getElementById('cartItems');
        cartContainer.innerHTML = ''; // Clear previous content

        cartItems.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');

            // Image
            const itemImage = document.createElement('img');
            itemImage.src = item.image;
            itemImage.alt = item.title;
            cartItemDiv.appendChild(itemImage);

            // Details
            const itemDetailsDiv = document.createElement('div');
            itemDetailsDiv.classList.add('item-details');

            // Title
            const itemTitle = document.createElement('h4');
            itemTitle.textContent = item.title;
            itemDetailsDiv.appendChild(itemTitle);

            // Description
            const itemDescription = document.createElement('p');
            itemDescription.textContent = item.description;
            itemDetailsDiv.appendChild(itemDescription);

            // Price
            const itemPrice = document.createElement('p');
            itemPrice.textContent = item.price;
            itemDetailsDiv.appendChild(itemPrice);

            // Quantity
            const itemQuantity = document.createElement('span');
            itemQuantity.textContent = `Quantity: ${item.quantity}`;
            itemDetailsDiv.appendChild(itemQuantity);

            // Remove Button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function() {
                removeCartItem(item.title);
            });
            itemDetailsDiv.appendChild(removeButton);

            cartItemDiv.appendChild(itemDetailsDiv);
            cartContainer.appendChild(cartItemDiv);
        });

        // Calculate and display total price
        calculateTotalPrice(cartItems);
    }

    // Function to remove item from cart
    function removeCartItem(title) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems = cartItems.filter(item => item.title !== title);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems(); // Update cart display
    }

    // Function to calculate total price
    function calculateTotalPrice(cartItems) {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += parseFloat(item.price.replace('$', '')) * item.quantity;
        });

        const totalPriceElement = document.getElementById('totalPrice');
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Load cart items and display them
    displayCartItems();

    // Add event listener to quantity input field in the modal
    const modalQuantityInput = document.getElementById('modalQuantity');
    modalQuantityInput.addEventListener('input', function() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const selectedItemIndex = cartItems.findIndex(item => item.title === document.getElementById('modalTitle').textContent);
        if (selectedItemIndex !== -1) {
            cartItems[selectedItemIndex].quantity = parseInt(this.value) || 1;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            displayCartItems(); // Update cart display
        }
    });
});
