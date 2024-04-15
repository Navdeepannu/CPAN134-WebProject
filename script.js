let cartCount = 0;

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

    // Attach click event to "Quick View" buttons for all items
    document.querySelectorAll('.btn-quick-view').forEach(button => {
        button.addEventListener('click', function() {
            openModal(this);
        });
    });

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

    // Add event listener to toppings checkboxes to trigger price calculation
    document.querySelectorAll('input[name="toppings"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            calculatePrice();
        });
    });

    // Add event listener to size radio buttons to trigger price calculation
    document.querySelectorAll('input[name="size"]').forEach(radioButton => {
        radioButton.addEventListener('change', function() {
            calculatePrice();
        });
    });

    // Add event listener to choose sandwich to trigger price calculation
    document.querySelectorAll('input[name="sandwichType"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            calculatePrice();
        });
    });

    // Add event listener to choose drink to trigger price calculation
    document.querySelectorAll('input[name="drinkType"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            calculatePrice();
        });
    });

    // Add event listener to choose sides to trigger price calculation
    document.querySelectorAll('input[name="sideType"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            calculatePrice();
        });
    });

    // Add event listener to plant radio buttons to trigger price calculation
    document.querySelectorAll('input[name="plantBasedItem"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            calculatePrice();
        });
    });

    // Add event listener to bread radio buttons to trigger price calculation
    document.querySelectorAll('input[name="breadType"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            calculatePrice();
        });
    });

    // Add event listener to sweet radio buttons to trigger price calculation
    document.querySelectorAll('input[name="sweetType"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            calculatePrice();
        });
    });

    // Add event listener to quantity input to trigger price calculation
    document.getElementById('modalQuantity').addEventListener('input', function() {
        calculatePrice();
    });

    // Add event listener to "Add to Cart" buttons for all modals
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            addToCart();
        });
    });


    // Function to calculate the total price based on selected options in the modal
    function calculatePrice() {
        // Get selected options from the modal
    const modalToppings = getSelectedToppings();
    const modalSize = document.querySelector('input[name="size"]:checked').value;
    let modalQuantity = parseInt(document.getElementById('modalQuantity').value) || 1;

    // Set base price based on size
    let basePrice;
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

    // Calculate total price including toppings and quantity
    let totalPrice = basePrice + (modalToppings.length * 2);

    // Double the total price for each additional quantity
    while (modalQuantity > 1) {
        totalPrice *= 2;
        modalQuantity--;
    }

    // Display total price in the modal
    document.getElementById('modalPrice').textContent = `$${totalPrice.toFixed(2)}`;
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
        cartCount++;
        document.getElementById('cartCount').textContent = cartCount;

        // Reset options to default
        resetOptions();

        // Add item to cart storage (localStorage)
        const cartItem = {
            image: document.getElementById('modalImage').src,
            title: document.getElementById('modalTitle').textContent,
            description: document.getElementById('modalDescription').textContent,
            price: document.getElementById('modalPrice').textContent
        };
        saveCartItem(cartItem);
    }

    // Generic function to calculate the total price for a given modal
    function calculateModalPrice(modalId, itemType) {
        const checkboxes = document.querySelectorAll(`#${modalId} input[name="${itemType}"]:checked`);
        let totalPrice = 0;

        checkboxes.forEach(checkbox => {
            totalPrice += parseFloat(checkbox.dataset.price);
        });

        // Additional logic for quantity
        const quantityInput = document.querySelector(`#${modalId} .modal-quantity`);
        const quantity = parseInt(quantityInput.value) || 1;
        totalPrice *= quantity;

        // Update the total price in the modal
        document.querySelector(`#${modalId} span[id="${itemType}Price"]`).textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Function to add event listeners for a given modal
    function addEventListeners(modalId, itemType) {
        document.querySelector(`#${modalId} .modal-quantity`).addEventListener('input', () => {
            calculateModalPrice(modalId, itemType);
        });

        document.querySelectorAll(`#${modalId} input[name="${itemType}"]`).forEach(input => {
            input.addEventListener('change', () => {
                calculateModalPrice(modalId, itemType);
            });
        });
    }
    // Add event listeners for each modal
    addEventListeners('sandwicheModal', 'sandwichType');
    addEventListeners('plantbasedModal', 'plantBasedItem');
    addEventListeners('breadsModal', 'breadType');
    addEventListeners('sidesModal', 'sideType');
    addEventListeners('sweetsModal', 'sweetType');
    addEventListeners('drinksModal', 'drinkType');



    // Function to reset options to default
    function resetOptions() {
        // Reset toppings checkboxes
        document.querySelectorAll('input[name="toppings"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Reset size radio buttons
        document.querySelectorAll('input[name="size"]').forEach(radioButton => {
            if (radioButton.value === 'small') {
                radioButton.checked = true; // Set small as default
            } else {
                radioButton.checked = false;
            }
        });

        // Reset dough radio buttons
        document.querySelectorAll('input[name="dough"]').forEach(radioButton => {
            if (radioButton.value === 'regular') {
                radioButton.checked = true; // Set thick as default
            } else {
                radioButton.checked = false;
            }
        });


        // Reset quantity input
        document.getElementById('modalQuantity').value = 1;

        // Recalculate price
        calculatePrice();
    }

    // Function to save cart item to localStorage
    function saveCartItem(item) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
});