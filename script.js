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

    // Attach click event to "Quick View" buttons
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
    }
});

// Add to cart function
let cartCounter = 0;

function addtoCart() {
    // Increment the cart counter
    cartCounter++;
    updateCartCounter();
}

// Update the cart counter
function updateCartCounter() {
    const cartCounterElement = document.getElementById('cartCounter');
    if (cartCounterElement) {
        cartCounterElement.textContent = cartCounter;
    }
}