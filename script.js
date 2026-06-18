document.addEventListener('DOMContentLoaded', () => {
    
    // 1. VARIABLES DEL DOM
    // Almacenamos las referencias a los elementos HTML interactivos
    const form = document.getElementById('converter-form');
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const swapBtn = document.getElementById('swap-btn'); 
    const amountError = document.getElementById('amount-error');
    const loading = document.getElementById('loading');
    const finalResultDisplay = document.getElementById('final-result-display'); 
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');

    // Endpoint base para obtener la lista de divisas disponibles
    const API_URL = `https://v6.exchangerate-api.com/v6/${CONFIG.API_KEY}/latest/USD`;

    // 2. FUNCIONES PRINCIPALES
    // Consumo la API de ExchangeRate para obtener todas las divisas disponibles.
    async function fetchCurrencies() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data.result === "success") {
                // Extraemos solo las claves (nombres de las divisas: USD, MXN, etc.)
                const currencies = Object.keys(data.conversion_rates);
                populateSelects(currencies);
            } else {
                console.error("Error en la API:", data['error-type']);
            }
        } catch (error) {
            console.error("Error al conectar con la API:", error);
        }
    }

    // Manipulación del DOM para llenar los selects de divisas con las opciones obtenidas de la API
    function populateSelects(currencies) {
        currencies.forEach(currency => {
            // Opción para la divisa de origen
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            if (currency === 'USD') option1.selected = true;
            fromCurrency.appendChild(option1);

            // Opción para la divisa de destino
            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            if (currency === 'MXN') option2.selected = true;
            toCurrency.appendChild(option2);
        });
    }

    // Función para el botón de intercambio rápido (swap) que invierte las divisas seleccionadas y limpia los resultados previos
    function swapCurrencies() {
        const temp = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = temp;
        finalResultDisplay.value = '';
        resultContainer.classList.add('hidden');
    }

    // Evento clic para el botón de intercambiar (flechas)
    swapBtn.addEventListener('click', swapCurrencies);

    // Evento submit para el formulario principal
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario

        // Limpieza de estados previos (errores y resultados ocultos)
        amountError.textContent = '';
        finalResultDisplay.value = ''; 
        resultContainer.classList.add('hidden');
        resultContainer.classList.remove('bounce-in'); // Resetea la animación

        const amount = parseFloat(amountInput.value);

        // Validación Frontend del formulario
        if (isNaN(amount) || amount <= 0) {
            amountError.textContent = 'Ingresa una cantidad numérica mayor a 0.';
            amountInput.classList.add('error');
            return; // Detiene la ejecución de la función si hay error
        }

        const from = fromCurrency.value;
        const to = toCurrency.value;

        // Mostrar indicador de carga interactivo
        loading.classList.remove('hidden');

        // Consumo de la API para el cálculo exacto Endpoint "Pair" que devuelve el resultado de la conversión directamente
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${CONFIG.API_KEY}/pair/${from}/${to}/${amount}`);
            const data = await response.json();

            loading.classList.add('hidden'); // Ocultar indicador de carga

            if (data.result === "success") {
                const convertedAmount = data.conversion_result.toFixed(2);
                
                // Formateo del número para que luzca como moneda
                const formatter = new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2 });
                const formattedResult = formatter.format(convertedAmount);

                // Manipulación del DOM para inyectar los resultados. Actualiza el campo de la tarjeta principal.
                finalResultDisplay.value = formattedResult;
                
                // Actualiza el texto grande en la parte inferior
                resultText.textContent = `${amount} ${from} = ${formattedResult} ${to}`;
                resultContainer.classList.remove('hidden');
                
                // Forza el "reflow" del DOM para que la animación CSS se reinicie y ejecute
                void resultContainer.offsetWidth; 
                resultContainer.classList.add('bounce-in');
            } else {
                amountError.textContent = 'Error al calcular la conversión.';
            }
        } catch (error) {
            loading.classList.add('hidden');
            amountError.textContent = 'Error de red. Inténtalo más tarde.';
        }
    });

    // Se ejecuta de inmediato al cargar la página para rellenar los selects
    fetchCurrencies();
});