document.addEventListener('DOMContentLoaded', function() {
    // Load cart items from localStorage and display them
    displayCartItems();
});

// Function to load cart items from localStorage and display them
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = ''; // Clear previous content

    cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        const itemImage = document.createElement('img');
        itemImage.src = item.image;
        itemImage.alt = item.title;
        cartItemDiv.appendChild(itemImage);

        const itemDetailsDiv = document.createElement('div');
        itemDetailsDiv.classList.add('item-details');

        const itemTitle = document.createElement('h4');
        itemTitle.textContent = item.title;
        itemDetailsDiv.appendChild(itemTitle);

        const itemDescription = document.createElement('p');
        itemDescription.textContent = item.description;
        itemDetailsDiv.appendChild(itemDescription);

        const itemPrice = document.createElement('p');
        itemPrice.textContent = item.price;
        itemDetailsDiv.appendChild(itemPrice);

        cartItemDiv.appendChild(itemDetailsDiv);

        cartContainer.appendChild(cartItemDiv);
    });

    // Calculate and display total price
    calculateTotalPrice(cartItems);
}

// Function to calculate and display total price
function calculateTotalPrice(cartItems) {
    let totalPrice = 0;
    cartItems.forEach(item => {
        totalPrice += parseFloat(item.price.replace('$', ''));
    });

    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}
