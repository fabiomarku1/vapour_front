
const confirmButton = document.getElementById('confirm-button');
    confirmButton.addEventListener('click', function() {
    window.location.href = 'thankyou.html';
});

const price = 19.99; // From backend!!!
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');

quantityInput.addEventListener('input', () => {
    const quantity = quantityInput.value;
    const newPrice = price * quantity;
    priceInput.value = '$' + newPrice.toFixed(2);
});