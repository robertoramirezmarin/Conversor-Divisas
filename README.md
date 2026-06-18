# Conversor de Divisas - Actividad Final

Aplicación web estática para la conversión de divisas en tiempo real, interactiva y moderna. Desarrollada como Actividad Final de la carrera de Ingeniería en Sistemas Computacionales en el Tecnológico de Estudios Superiores de Ecatepec.

## Características y Requerimientos Cumplidos

* **Consumo de API Externa (JSON):** Integración con la API de ExchangeRate-API (https://www.exchangerate-api.com/) para obtener tasas de cambio actualizadas en tiempo real.
* **Manipulación Avanzada del DOM:** Relleno dinámico de opciones de divisas, manejo de estados de carga, y actualización de resultados y errores sin recargar la página.
* **Validación de Formularios:** Validación estricta que previene la ejecución de conversiones con datos vacíos, nulos o menores a cero.
* **Interactividad:** Botón flotante para el intercambio rápido de divisas origen/destino.
* **Formato Internacional:** Aplicación de la API `Intl.NumberFormat` nativa de JavaScript para presentar los resultados matemáticos en formato monetario estructurado.
* **Animaciones CSS:** Incorporación de animaciones (`fade-in` y `bounce-in`) para mejorar la Experiencia de Usuario (UX) al visualizar la información.
* **Despliegue Serverless:** Arquitectura preparada para despliegue estático en Azure Blob Storage.

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica.
* **CSS3:** Variables CSS, Flexbox, UI/UX orientada a diseño de componentes tipo tarjeta, animaciones clave (`@keyframes`).
* **Vanilla JavaScript (ES6+):** Funciones asíncronas (`async/await`), Fetch API, manipulación del Modelo de Objetos del Documento (DOM), manejo de eventos.

## 📁 Estructura del Proyecto
conversor-divisas/
├── index.html         # Archivo principal de estructura y vistas
├── README.md          # Documentación general del proyecto
├── css/
│   └── styles.css     # Hoja de estilos principal y animaciones
├── js/
│   └── script.js      # Lógica de validación, cálculos y consumo de la API
└── env/
    └── config.js      # Archivo de configuración (API Key)