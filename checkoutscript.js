document.addEventListener('DOMContentLoaded', function() {
    // Dummy product data with added quantity
    const products = [{name: "Example Product", price: 59.99, quantity: 1}];
    const taxRate = 0.07; // 7% tax
    const promoCode = "SAVE10"; // Dummy promo code for a 10% discount
    let promoApplied = false;

    function updatePriceSummary() {
        let subtotal = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);

        // Apply promo code discount if applicable
        if (promoApplied) {
            subtotal *= 0.9; // Apply 10% discount
        }

        const taxes = subtotal * taxRate;
        const total = subtotal + taxes;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('taxes').textContent = `$${taxes.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    function addProductToReview() {
        const productItems = document.getElementById('productItems');
        productItems.innerHTML = ''; // Clear existing items

        products.forEach((product, index) => {
            const item = document.createElement('div');
            item.className = 'product-review-item';
            item.innerHTML = `
                <p>${product.name}: $${product.price} x <input type="number" value="${product.quantity}" min="1" id="product-quantity-${index}" style="width: 50px;"></p>
            `;
            productItems.appendChild(item);

            // Add event listener to product quantity input
            document.getElementById(`product-quantity-${index}`).addEventListener('change', (event) => {
                const newQuantity = parseInt(event.target.value, 10) || 1;
                products[index].quantity = newQuantity;
                updatePriceSummary();
            });
        });
    }

    // Example form validation (simplified)
    document.getElementById('placeOrder').addEventListener('click', function(event) {
        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) {
            alert("Please enter your name.");
            event.preventDefault(); // Prevent form submission
        } else {
            // Proceed with form submission or AJAX call here
            alert("Order placed successfully!");
        }
    });

    // Example promo code application
    document.getElementById('applyPromoCode').addEventListener('click', function() {
        const promoInput = document.getElementById('promoCode');
        if (promoInput.value === promoCode && !promoApplied) {
            promoApplied = true;
            updatePriceSummary();
            alert("Promo code applied successfully!");
        } else {
            alert("Invalid promo code.");
        }
    });

    addProductToReview();
    updatePriceSummary();
});
document.addEventListener('DOMContentLoaded', function() {
    // Assuming existing code for productItems and updatePriceSummary here
    
    // Add event listeners for quantity changes and item removal
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function(event) {
            // Logic to update the product quantity and recalculate the subtotal
            updatePriceSummary();
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function(event) {
            // Logic to remove the item from the cart and update the UI
            event.target.closest('.cart-item').remove();
            updatePriceSummary();
        });
    });
});
