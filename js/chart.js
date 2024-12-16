function renderChart() {
  // Step 1: Instantiate a new AppState
  const appState = new AppState();

  // Step 2: Load data from localStorage into the AppState instance
  appState.loadItems();

  // Step 3: Prepare the chart data object
  const productNames = appState.allProducts.map(product => product.name);
  const productClicks = appState.allProducts.map(product => product.timesClicked);
  const productViews = appState.allProducts.map(product => product.timesShown);

  // Step 4: Configure the chart data and options
  const chartData = {
    labels: productNames,  // Names of the products as chart labels
    datasets: [
      {
        label: 'Times Clicked',  // First dataset (Clicks)
        data: productClicks,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',  // Light Blue color for clicks
        borderColor: 'rgba(54, 162, 235, 1)',  // Dark Blue border for clicks
        borderWidth: 1
      },
      {
        label: 'Times Shown',  // Second dataset (Views)
        data: productViews,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',  // Light Red color for views
        borderColor: 'rgba(255, 99, 132, 1)',  // Dark Red border for views
        borderWidth: 1
      }
    ]
  };

  // Step 5: Chart.js configuration object
  const chartConfig = {
    type: 'bar',  // You can change this to 'line', 'pie', etc., depending on your preference
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
              return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;  // Custom tooltip formatting
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

  // Step 6: Create the chart using Chart.js
  new Chart(canvasElem, chartConfig);
}

renderChart();
