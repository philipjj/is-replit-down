// checker.js
const fetch = require('node-fetch');

async function checkService() {
  const url = 'https://replit.com';
  const startTime = Date.now();

  try {
    const response = await fetch(url, { method: 'GET' });
    const status = response.status;
    const responseTime = Date.now() - startTime;

    const statusData = {
      isUp: status >= 200 && status < 300,
      status,
      responseTime,
      timestamp: new Date().toISOString(),
    };

    // Write to JSON file
    const fs = require('fs');
    fs.writeFileSync('status.json', JSON.stringify(statusData, null, 2));
    console.log('Status updated:', statusData);
  } catch (error) {
    const errorData = {
      isUp: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
    require('fs').writeFileSync('status.json', JSON.stringify(errorData, null, 2));
    console.log('Error:', errorData);
  }
}

checkService();