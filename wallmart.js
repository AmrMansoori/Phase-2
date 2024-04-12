function showQuantity(productName, pricePerUnit) {
    document.getElementById('quantityModalLabel').innerText = 'Select Quantity - ' + productName;
    document.getElementById('quantityInput').value = 1; // Reset quantity input to 1
    updateTotalPrice(); // Update total price initially
    $('#quantityModal').modal('show');
}

function updateTotalPrice() {
    const quantity = parseInt(document.getElementById('quantityInput').value);
    const pricePerUnit = parseFloat(document.querySelector('.product-price').innerText.replace('$', ''));
    const totalPrice = quantity * pricePerUnit;
    document.getElementById('totalPrice').innerText = 'Total Price: $' + totalPrice.toFixed(2);
}

function calculateTotal() {
    const quantity = parseInt(document.getElementById('quantityInput').value);
    const pricePerUnit = parseFloat(document.querySelector('.product-price').innerText.replace('$', ''));
    const totalPrice = quantity * pricePerUnit;
    alert('Added ' + quantity + ' item(s) to cart. Total Price: $' + totalPrice.toFixed(2));
    $('#quantityModal').modal('hide');
}

function closeQuantityModal() {
    $('#quantityModal').modal('hide');
}
