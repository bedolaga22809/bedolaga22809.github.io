document.addEventListener('DOMContentLoaded', function() {
    initCalculator();
    initServiceCalculator();
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

function initServiceCalculator() {
    const services = {
        'service1': {
            name: 'Консультация',
            basePrice: 1000,
            hasOptions: false,
            hasProperties: false
        },
        'service2': {
            name: 'Разработка сайта',
            basePrice: 15000,
            hasOptions: true,
            hasProperties: false,
            options: {
                'option1': { name: 'Лендинг', price: 5000 },
                'option2': { name: 'Многостраничный сайт', price: 10000 },
                'option3': { name: 'Интернет-магазин', price: 20000 }
            }
        },
        'service3': {
            name: 'Техническая поддержка',
            basePrice: 5000,
            hasOptions: false,
            hasProperties: true,
            properties: {
                'property1': { name: 'Срочный заказ', price: 2000 }
            }
        }
    };

    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const optionsContainer = document.getElementById('serviceOptionsContainer');
    const optionsSelect = document.getElementById('serviceOptions');
    const propertiesContainer = document.getElementById('servicePropertiesContainer');
    const propertyCheckbox = document.getElementById('serviceProperty');
    const quantityInput = document.getElementById('serviceQuantity');
    const priceDisplay = document.getElementById('servicePrice');
    const calculateServiceBtn = document.getElementById('calculateServiceBtn');

    updateServiceForm();
    calculateServicePrice();

    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateServiceForm();
            calculateServicePrice();
        });
    });

    if (optionsSelect) {
        optionsSelect.addEventListener('change', calculateServicePrice);
    }

    if (propertyCheckbox) {
        propertyCheckbox.addEventListener('change', calculateServicePrice);
    }

    if (quantityInput) {
        quantityInput.addEventListener('input', calculateServicePrice);
    }

    if (calculateServiceBtn) {
        calculateServiceBtn.addEventListener('click', calculateServicePrice);
    }

    function updateServiceForm() {
        const selectedService = document.querySelector('input[name="serviceType"]:checked').value;
        const service = services[selectedService];

        if (optionsContainer) {
            optionsContainer.style.display = service.hasOptions ? 'block' : 'none';
        }

        if (propertiesContainer) {
            propertiesContainer.style.display = service.hasProperties ? 'block' : 'none';
        }

        if (service.hasOptions && optionsSelect) {
            optionsSelect.innerHTML = '';
            for (const [key, option] of Object.entries(service.options)) {
                const optionElement = document.createElement('option');
                optionElement.value = key;
                optionElement.textContent = `${option.name} (+${option.price} руб.)`;
                optionsSelect.appendChild(optionElement);
            }
        }
    }

    function calculateServicePrice() {
        const selectedService = document.querySelector('input[name="serviceType"]:checked').value;
        const service = services[selectedService];
        let totalPrice = service.basePrice;

        if (service.hasOptions && optionsSelect) {
            const selectedOption = optionsSelect.value;
            if (selectedOption && service.options[selectedOption]) {
                totalPrice += service.options[selectedOption].price;
            }
        }

        if (service.hasProperties && propertyCheckbox && propertyCheckbox.checked) {
            totalPrice += service.properties.property1.price;
        }

        const quantity = parseInt(quantityInput.value) || 1;
        totalPrice *= quantity;
   
        if (priceDisplay) {
            priceDisplay.textContent = totalPrice.toLocaleString('ru-RU') + ' руб.';
        }
    }
}
