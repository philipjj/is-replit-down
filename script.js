// script.js - Load status.json with retry & better error handling
function loadStatus() {
  fetch('/status.json?t=' + new Date().getTime())
    .then(response => {
      if (!response.ok) throw new Error('Failed to load: ' + response.status);
      return response.json();
    })
    .then(data => {
      const statusEl = document.getElementById('status');
      const detailsEl = document.getElementById('details');
      const updatedEl = document.getElementById('updated');

      const lastUpdate = new Date(data.timestamp).toLocaleTimeString();
      updatedEl.textContent = lastUpdate;

      if (data.isUp === true) {
        statusEl.textContent = "✅ UP";
        statusEl.className = "green";
        detailsEl.textContent = `Replit is online! Response time: ${data.responseTime}ms`;
      } else if (data.isUp === false) {
        statusEl.textContent = "❌ DOWN";
        statusEl.className = "red";
        detailsEl.textContent = `Replit is currently unreachable.`;
      } else {
        statusEl.textContent = "❓ UNKNOWN";
        detailsEl.textContent = `Status unknown: ${data.error || 'No data'}`;
      }
    })
    .catch(err => {
      console.error("Error loading status:", err);
      document.getElementById('status').textContent = "❓ UNKNOWN";
      document.getElementById('status').className = "";
      document.getElementById('details').textContent = "Could not load status (network error)";
    });
}

// Load once
loadStatus();

// Optional: Auto-refresh every 30 seconds
// setInterval(loadStatus, 30000);