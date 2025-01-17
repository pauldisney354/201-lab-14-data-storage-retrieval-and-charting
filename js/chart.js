function renderChart() {
  const appState = new AppState();
  appState.loadItems();

  if (!appState.allProducts || appState.allProducts.length === 0) {
    console.error('No product data available for rendering the chart.');
    return;
  }

  const productNames = appState.allProducts.map(product => product.name);
  const productClicks = appState.allProducts.map(product => product.timesClicked);
  const productViews = appState.allProducts.map(product => product.timesShown);

  const chartData = {
    labels: productNames,
    datasets: [
      {
        label: 'Times Clicked',
        data: productClicks,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Times Shown',
        data: productViews,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartConfig = {
    type: 'bar',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true
        }
      }
    }
  };

  const canvasElem = document.getElementById('chart');
  new Chart(canvasElem, chartConfig);
}

renderChart();
