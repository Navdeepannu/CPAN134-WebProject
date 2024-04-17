document.addEventListener('DOMContentLoaded', function() {
    // Function to open the modal and populate it with data
    function openModal(button) {
        const modal = document.querySelector(button.dataset.modalTarget);
        const imageSrc = button.dataset.image;
        const title = button.dataset.title;
        const description = button.dataset.description;

        document.getElementById('modalImage').src = imageSrc;
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDescription').textContent = description;

        modal.style.display = 'block';
    }

    // Close the modal when the user clicks on <span> (x)
    document.querySelectorAll('.modal .close').forEach(closeButton => {
        closeButton.onclick = function() {
            this.parentElement.parentElement.style.display = 'none';
        }
    });

    // Also close the modal when the user clicks anywhere outside of the modal content
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    };

    // Function to calculate the total price based on selected options in the modal
    function calculatePrice() {
        const modalToppings = getSelectedToppings();
        const modalSize = document.querySelector('input[name="size"]:checked').value;
        let modalQuantity = parseInt(document.getElementById('modalQuantity').value) || 1;

        let basePrice;

        // Calculate base price based on size
        switch (modalSize) {
            case 'small':
                basePrice = 10;
                break;
            case 'medium':
                basePrice = 12;
                break;
            case 'large':
                basePrice = 15;
                break;
            case 'x-large':
                basePrice = 18;
                break;
            default:
                basePrice = 10;
        }

        // Calculate total price for pizza
        let totalPrice = basePrice + (modalToppings.length * 2);
        while (modalQuantity > 1) {
            totalPrice *= 2;
            modalQuantity--;
        }

        // Display total price
        document.getElementById('pizzaPrice').textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Function to reset options to default values
    function resetOptions() {
        document.querySelectorAll('input[name="toppings"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Set default size option
        const smallSize = document.querySelector('input[name="size"][value="small"]');
        if (smallSize) {
            smallSize.checked = true;
        }

        // Set default quantity
        document.getElementById('modalQuantity').value = 1;

        // Calculate and display default price
        calculatePrice();
    }

    // Function to get selected toppings
    function getSelectedToppings() {
        const toppings = document.querySelectorAll('input[name="toppings"]:checked');
        const selectedToppings = [];
        toppings.forEach(topping => {
            selectedToppings.push(topping.value);
        });
        return selectedToppings;
    }
    
    // Function to add item to cart
    function addToCart() {
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalPrice = document.getElementById('pizzaPrice');

        if (modalImage && modalTitle && modalDescription && modalPrice) {
            const imageSrc = modalImage.src;
            const title = modalTitle.textContent;
            const description = modalDescription.textContent;
            const price = modalPrice.textContent;

            const cartItem = {
                image: imageSrc,
                title: title,
                description: description,
                price: price,
                quantity: 1
            };

            // Retrieve cart items from local storage
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            // Check if the item already exists in the cart
            const existingCartItem = cartItems.find(item => item.title === cartItem.title);

            if (existingCartItem) {
                existingCartItem.quantity++;
            } else {
                cartItems.push(cartItem);
            }

            // Save cart items to local storage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Update cart count
            updateCartCount();

            // Reset options
            resetOptions();
        } else {
            console.error('One or more required elements not found.');
        }
    }

    // Function to update cart count
    function updateCartCount() {
        let cartCount = 0;
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.forEach(item => {
            cartCount += item.quantity;
        });
        document.getElementById('cartCount').textContent = cartCount;
    }

    // Attach click event to "Quick View" buttons for all items
    document.querySelectorAll('.btn-quick-view').forEach(button => {
        button.addEventListener('click', function() {
            openModal(this);
        });
    });

    // Add event listener to "Add to Cart" button in the modal
    document.getElementById('modalAddToCart').addEventListener('click', function() {
        addToCart(); // Call the addToCart function when the button is clicked
    });

    // Add event listeners for toppings checkboxes, size radio buttons, and quantity input to trigger price calculation
    document.querySelectorAll('input[name="toppings"], input[name="size"], #modalQuantity').forEach(input => {
        input.addEventListener('change', function() {
            calculatePrice();
        });
    });

    // Call resetOptions() to set default options and display default price when the modal is opened
    resetOptions();
});
