// Lazy load images
document.querySelectorAll('img').forEach(i=>i.loading='lazy');

// Fetch and display live financial data
async function fetchExchangeRates() {
    const tickerElement = document.getElementById('finance-ticker');
    if (!tickerElement) return;

    try {
        // Using a free, no-key-required API from the European Central Bank
        const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=TRY,EUR');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const usdTry = data.rates.TRY;

        // To get EUR/TRY, we need another fetch or a calculation if base is EUR
        const eurResponse = await fetch('https://api.frankfurter.app/latest?from=EUR&to=TRY');
        const eurData = await eurResponse.json();
        const eurTry = eurData.rates.TRY;

        // Simple placeholder for gold price as most free APIs require keys
        const goldPrice = 2350.55; // Placeholder static value

        tickerElement.innerHTML = `
            <span>USD/TRY: ${usdTry.toFixed(4)} <span class="currency-up">▲</span></span>
            <span>EUR/TRY: ${eurTry.toFixed(4)} <span class="currency-down">▼</span></span>
            <span>Altın (XAU): $${goldPrice.toFixed(2)} <span class="currency-up">▲</span></span>
        `;
    } catch (error) {
        console.error("Could not fetch exchange rates:", error);
        tickerElement.innerHTML = "<span>Canlı veriler yüklenemedi.</span>";
    }
}

// Run the function when the page content is loaded
document.addEventListener('DOMContentLoaded', fetchExchangeRates);
