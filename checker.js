// checker.js - Live Replit status checker
async function checkService() {
  const url = 'https://replit.com';
  const startTime = Date.now();

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'IsReplitDownChecker/1.0 (https://is-replit-down.vercel.app)'
      }
    });

    const status = response.status;
    const responseTime = Date.now() - startTime;

    const statusData = {
      isUp: status >= 200 && status < 300,
      status,
      responseTime,
      timestamp: new Date().toISOString()
    };

    const fs = require('fs');
    fs.writeFileSync('status.json', JSON.stringify(statusData, null, 2));
    console.log('✅ Status updated:', statusData);
  } catch (error) {
    const errorData = {
      isUp: false,
      error: error.message.substring(0, 100), // Keep it short
      timestamp: new Date().toISOString()
    };
    require('fs').writeFileSync('status.json', JSON.stringify(errorData, null, 2));
    console.log('❌ Service down or error:', errorData);
  }

  // 🔥 Critical: Exit cleanly so GitHub Actions doesn't hang
  process.exit(0);
}

// Run the check
checkService();