document.addEventListener('DOMContentLoaded', function() {
    initCalculator();
});

function initCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    const quantityInput = document.getElementById('productQuantity');
    const productSelect = document.getElementById('productSelect');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('quantityError');
    
    const numberRegex = /^\d+$/;
    
    calculateBtn.addEventListener('click', function() {
        calculateOrderCost();
    });
    
    quantityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calculateOrderCost();
        }
    });
    
    function calculateOrderCost() {
        const quantity = quantityInput.value.trim();
        const selectedOption = productSelect.options[productSelect.selectedIndex];
        const price = parseInt(selectedOption.value, 10);
        const productName = selectedOption.text.split(' - ')[0];
        
        errorDiv.style.display = 'none';
        resultDiv.style.display = 'none';
        
        if (!numberRegex.test(quantity)) {
            errorDiv.style.display = 'block';
            return;
        }
        
        const quantityNum = parseInt(quantity, 10);
        
        if (quantityNum <= 0) {
            errorDiv.style.display = 'block';
            return;
        }
        
        const totalCost = price * quantityNum;
        const formattedCost = totalCost.toLocaleString('ru-RU');
        
        resultDiv.innerHTML = `
            <strong>Стоимость заказа:</strong><br>
            Товар: ${productName}<br>
            Количество: ${quantityNum} шт.<br>
            Цена за единицу: ${price} руб.<br>
            <strong>Итого: ${formattedCost} руб.</strong>
        `;
        resultDiv.style.display = 'block';
    }
}