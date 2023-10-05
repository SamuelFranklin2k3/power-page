// Define the Google Sheets API URL with your provided API key, spreadsheet ID, and column
const apiKey = 'AIzaSyBcdVDzoyAqNQKxIC5DhdBXz25mbkjJ4M8'; // Use your API key
const spreadsheetId = '1c_n-dIbP0L7fFSG67Ge09wY7lsOU2C9N6hufLmJbtFE'; // Replace with your actual spreadsheet ID
const column = 'E'; // Specify the column 'E' from which you want to fetch data

const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${column}:${column}?key=${apiKey}`;

// Function to fetch data from the Google Sheet
function fetchData() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Extract values from the response (skip the header)
        const values = data.values.slice(1).map(row => parseFloat(row[0]));

        // Create a chart using Chart.js
        const ctx = document.getElementById('lineChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: values.map((_, index) => index + 1),
            datasets: [{
              label: 'Data from Google Sheet',
              data: values,
              borderColor: 'rgba(54, 162, 235, 1)', // Blue color for the chart line
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderWidth: 1,
            }],
          },
          options: {
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        // Update the "Current Power" box with the last row data
        const currentPowerValue = document.getElementById('currentPowerValue');
        if (values.length > 0) {
          currentPowerValue.textContent = `${values[values.length - 1]} kWh`;
        } else {
          currentPowerValue.textContent = 'No data available';
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
}

// Call the fetchData function when the page loads
window.onload = fetchData;
