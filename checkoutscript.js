document.addEventListener('DOMContentLoaded', function() {
    const promoCodes = {
        "SAVE10": 0.1, // 10% discount
        "10OFF": 10 // $10 off
    };

    function addNewItem() {
        const productItems = document.getElementById('productItems');
        const newItem = document.createElement('div');
        newItem.className = 'cart-item d-flex justify-content-between align-items-center mb-3';
        newItem.innerHTML = `
            <div class="item-details flex-grow-1 d-flex align-items-center">
                <button class="remove-item btn btn-danger btn-sm mr-2">Remove</button>
                Item : <input type="text" class="form-control mb-2 ml-2 mr-2 item-name" placeholder="Item Name" style="width: auto;">
                Price: $<input type="number" class="form-control item-price-input mb-2 mr-2" value="0" min="0" step="0.01" placeholder="Price" style="width: 100px;">
                Qty: <input type="number" class="form-control quantity-input mb-2" value="1" min="1" style="width: 60px;">
            </div>
        `;
        productItems.appendChild(newItem);

        newItem.querySelector('.remove-item').addEventListener('click', function() {
            newItem.remove();
            calculateAndUpdate();
        });

        const priceInput = newItem.querySelector('.item-price-input');
        const quantityInput = newItem.querySelector('.quantity-input');

        [priceInput, quantityInput].forEach(input => {
            input.addEventListener('input', calculateAndUpdate);
        });
    }

    function calculateAndUpdate() {
        let items = document.querySelectorAll('.cart-item');
        let subtotal = 0;
        items.forEach(item => {
            const price = parseFloat(item.querySelector('.item-price-input').value);
            const quantity = parseInt(item.querySelector('.quantity-input').value, 10);
            subtotal += price * quantity;
        });

        const total = subtotal - calculateDiscount(subtotal, document.getElementById('promoCode').value.toUpperCase());

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    function calculateDiscount(subtotal, promoCode) {
        let discount = 0;
        if (promoCodes[promoCode]) {
            discount = (promoCode === "10OFF") ? promoCodes[promoCode] : subtotal * promoCodes[promoCode];
            if(!document.getElementById('applyPromoCode').classList.contains('applied')) {
                alert("Promo code applied successfully!");
                document.getElementById('applyPromoCode').classList.add('applied');
            }
        }
        return discount;
    }

    function generateReceipt() {
        let items = document.querySelectorAll('.cart-item');
        let receipt = "Receipt\n\n";
        items.forEach((item, index) => {
            const name = item.querySelector('.item-name').value || `Item ${index + 1}`;
            const price = parseFloat(item.querySelector('.item-price-input').value).toFixed(2);
            const quantity = item.querySelector('.quantity-input').value;
            receipt += `${name} x${quantity} - $${price}\n`;
        });

        const subtotal = document.getElementById('subtotal').textContent;
        const total = document.getElementById('total').textContent;
        receipt += `\nSubtotal: ${subtotal}\nTotal: ${total}\n\nThanks for Shopping with Us :)`;

        alert(receipt);
    }

    document.getElementById('addItem').addEventListener('click', addNewItem);
    document.getElementById('applyPromoCode').addEventListener('click', function() {
        this.classList.remove('applied');
        calculateAndUpdate();
    });
    document.getElementById('placeOrder').addEventListener('click', function() {
        calculateAndUpdate();
        generateReceipt();
    });

    addNewItem();
});
