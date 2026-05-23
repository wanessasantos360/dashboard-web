// ============================
// INICIALIZAÇÃO
// ============================
document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  fetchCurrency();
  renderMetas();
  updateMetrics();
  startClock();

  // Atualiza cotação a cada 60 segundos
  setInterval(fetchCurrency, 60000);
});

// ============================
// MÉTRICAS DOS CARDS
// ============================
function updateMetrics() {
  // Valores baseados no dataset Olist
  document.getElementById('totalOrders').textContent   = '99.441';
  document.getElementById('totalRevenue').textContent  = 'R$ 15,4M';
  document.getElementById('avgTicket').textContent     = 'R$ 154,10';
  document.getElementById('cancelRate').textContent    = '0,63%';
}

// ============================
// RELÓGIO EM TEMPO REAL
// ============================
function startClock() {
  const el = document.getElementById('clock');
  const update = () => {
    el.textContent = new Date().toLocaleString('pt-BR');
  };
  update();
  setInterval(update, 1000);
}