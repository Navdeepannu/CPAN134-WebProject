// Initialize cart count
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

    // Attach click event to "Quick View" buttons for pizza
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

    // Add event listener to quantity input to trigger price calculation
    document.getElementById('modalQuantity').addEventListener('input', function() {
        calculatePrice();
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
    document.getElementById('modalPrice').textContent = `$${totalPrice}`;
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

// Function to increment cart count and update the cart sign
function addToCart() {
    cartCount++;
    document.getElementById('cartCount').textContent = cartCount;

    // Add item to cart storage (localStorage)
    const cartItem = {
        image: document.getElementById('modalImage').src,
        title: document.getElementById('modalTitle').textContent,
        description: document.getElementById('modalDescription').textContent,
        price: document.getElementById('modalPrice').textContent
    };
    saveCartItem(cartItem);
}

// Function to save cart item to localStorage
function saveCartItem(item) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
