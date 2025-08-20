// checker.js - MINIMAL TEST: Just write a timestamp and exit
const fs = require('fs');

const testData = {
  message: "Test write from GitHub Actions",
  timestamp: new Date().toISOString(),
  step: "writing file"
};

fs.writeFileSync('status.json', JSON.stringify(testData, null, 2));
console.log('✅ Test file written:', testData);

// Force exit
process.exit(0);