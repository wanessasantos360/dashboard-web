// API Pública: AwesomeAPI (Cotações gratuita, sem autenticação)
async function fetchCurrency() {
  try {
    const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL');
    const data = await res.json();

    document.getElementById('usd').textContent =
      `💵 USD: R$ ${parseFloat(data.USDBRL.bid).toFixed(2)}`;
    document.getElementById('eur').textContent =
      `💶 EUR: R$ ${parseFloat(data.EURBRL.bid).toFixed(2)}`;
    document.getElementById('btc').textContent =
      `₿ BTC: R$ ${parseFloat(data.BTCBRL.bid).toLocaleString('pt-BR')}`;
  } catch (err) {
    document.getElementById('currencyInfo').textContent = 'Erro ao carregar cotações.';
  }
}