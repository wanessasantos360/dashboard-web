// Dados simulados baseados no dataset Olist

function initCharts() {
  // 1. Pedidos por Mês (Line Chart)
  const ordersCtx = document.getElementById('ordersChart').getContext('2d');
  new Chart(ordersCtx, {
    type: 'line',
    data: {
      labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
      datasets: [{
        label: 'Pedidos 2017',
        data: [300, 420, 510, 480, 600, 720, 690, 750, 810, 900, 1100, 980],
        borderColor: '#0d6efd',
        backgroundColor: 'rgba(13,110,253,0.1)',
        fill: true,
        tension: 0.4
      }, {
        label: 'Pedidos 2018',
        data: [500, 620, 710, 680, 800, 920, 890, 950, 1010, 1100, 1300, 1180],
        borderColor: '#198754',
        backgroundColor: 'rgba(25,135,84,0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: { responsive: true, plugins: { legend: { position: 'top' } } }
  });

  // 2. Status dos Pedidos (Doughnut)
  const statusCtx = document.getElementById('statusChart').getContext('2d');
  new Chart(statusCtx, {
    type: 'doughnut',
    data: {
      labels: ['Entregue', 'Cancelado', 'Em Trânsito', 'Processando', 'Outros'],
      datasets: [{
        data: [96478, 625, 1107, 301, 300],
        backgroundColor: ['#198754','#dc3545','#0dcaf0','#ffc107','#6c757d']
      }]
    },
    options: { responsive: true, plugins: { legend: { position: 'right' } } }
  });

  // 3. Top Categorias (Bar Chart)
  const catCtx = document.getElementById('categoryChart').getContext('2d');
  new Chart(catCtx, {
    type: 'bar',
    data: {
      labels: ['Cama/Mesa/Banho', 'Beleza e Saúde', 'Esporte/Lazer', 'Informática', 'Utilidades'],
      datasets: [{
        label: 'Nº de Pedidos',
        data: [11115, 9672, 8641, 7827, 6964],
        backgroundColor: ['#0d6efd','#6610f2','#0dcaf0','#ffc107','#fd7e14']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  // 4. Avaliações (Bar Chart)
  const reviewCtx = document.getElementById('reviewChart').getContext('2d');
  new Chart(reviewCtx, {
    type: 'bar',
    data: {
      labels: ['⭐ 1', '⭐⭐ 2', '⭐⭐⭐ 3', '⭐⭐⭐⭐ 4', '⭐⭐⭐⭐⭐ 5'],
      datasets: [{
        label: 'Avaliações',
        data: [11424, 3244, 8179, 19142, 57328],
        backgroundColor: ['#dc3545','#fd7e14','#ffc107','#0dcaf0','#198754']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}