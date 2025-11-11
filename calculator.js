document.addEventListener('DOMContentLoaded', function() {
    initCalculator();
});

function initCalculator() {
    const quantityInput = document.getElementById('productQuantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const optionsContainer = document.getElementById('optionsContainer');
    const optionsSelect = document.getElementById('optionsSelect');
    const propertyContainer = document.getElementById('propertyContainer');
    const propertyCheckbox = document.getElementById('propertyCheckbox');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('quantityError');
    
    const numberRegex = /^\d+$/;
    

    const servicePrices = {
        type1: 1000,
        type2: 1500,
        type3: 2000
    };
    

    const type2Options = [
        { value: 0, text: 'Без дополнительных опций' },
        { value: 300, text: 'Уклон на лингвистику (+300 руб.)' },
        { value: 500, text: 'Уклон на информатику (+500 руб.)' },
        { value: 800, text: 'Уклон на математику(+800 руб.)' }
    ];
    

    const propertyPrice = 400;

    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateFormVisibility();
            calculatePrice();
        });
    });

    quantityInput.addEventListener('input', calculatePrice);
    optionsSelect.addEventListener('change', calculatePrice);
    propertyCheckbox.addEventListener('change', calculatePrice);
    

    function updateFormVisibility() {
        const selectedType = document.querySelector('input[name="serviceType"]:checked');
        
        if (!selectedType) {
            optionsContainer.style.display = 'none';
            propertyContainer.style.display = 'none';
            return;
        }
        
        const serviceType = selectedType.value;
        

        if (serviceType === 'type1') {
            optionsContainer.style.display = 'none';
            propertyContainer.style.display = 'none';
        }

        else if (serviceType === 'type2') {
            optionsContainer.style.display = 'block';
            propertyContainer.style.display = 'none';

            optionsSelect.innerHTML = '';
            type2Options.forEach(option => {
                const optElement = document.createElement('option');
                optElement.value = option.value;
                optElement.textContent = option.text;
                optionsSelect.appendChild(optElement);
            });
        }

        else if (serviceType === 'type3') {
            optionsContainer.style.display = 'none';
            propertyContainer.style.display = 'block';
            propertyCheckbox.checked = false;
        }
    }

    function calculatePrice() {
        const quantity = quantityInput.value.trim();
        const selectedType = document.querySelector('input[name="serviceType"]:checked');

        errorDiv.style.display = 'none';
        resultDiv.style.display = 'none';

        if (!selectedType) {
            return;
        }

        if (!quantity) {
            return;
        }
        
        if (!numberRegex.test(quantity)) {
            errorDiv.style.display = 'block';
            return;
        }
        
        const quantityNum = parseInt(quantity, 10);
        
        if (quantityNum <= 0) {
            errorDiv.style.display = 'block';
            return;
        }

        const serviceType = selectedType.value;
        let basePrice = servicePrices[serviceType];
        let serviceName = selectedType.nextElementSibling.textContent;

        let additionalCost = 0;
        let additionalInfo = '';
        
        if (serviceType === 'type2' && optionsContainer.style.display !== 'none') {
            const selectedOption = optionsSelect.options[optionsSelect.selectedIndex];
            additionalCost = parseInt(selectedOption.value, 10);
            if (additionalCost > 0) {
                additionalInfo = `<br>Опция: ${selectedOption.text}`;
            }
        }
        else if (serviceType === 'type3' && propertyCheckbox.checked) {
            additionalCost = propertyPrice;
            additionalInfo = `<br>Дополнительное свойство: +${propertyPrice} руб.`;
        }

        const totalPricePerUnit = basePrice + additionalCost;

        const totalCost = totalPricePerUnit * quantityNum;
        const formattedCost = totalCost.toLocaleString('ru-RU');

        resultDiv.innerHTML = `
            <strong>Стоимость заказа:</strong><br>
            Услуга: ${serviceName}<br>
            Количество: ${quantityNum} шт.<br>
            Базовая цена: ${basePrice} руб.${additionalInfo}<br>
            Цена за единицу: ${totalPricePerUnit} руб.<br>
            <strong>Итого: ${formattedCost} руб.</strong>
        `;
        resultDiv.style.display = 'block';
    }

    updateFormVisibility();
}
