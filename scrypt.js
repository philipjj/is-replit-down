// script.js
fetch('status.json?t=' + new Date().getTime())
  .then(res => res.json())
  .then(data => {
    const statusEl = document.getElementById('status');
    const detailsEl = document.getElementById('details');
    const updatedEl = document.getElementById('updated');

    const lastUpdate = new Date(data.timestamp).toLocaleTimeString();
    updatedEl.textContent = lastUpdate;

    if (data.isUp === true) {
      statusEl.textContent = "✅ UP";
      statusEl.className = "green";
      detailsEl.textContent = `Fast and live! Response time: ${data.responseTime}ms`;
    } else if (data.isUp === false) {
      statusEl.textContent = "❌ DOWN";
      statusEl.className = "red";
      detailsEl.textContent = `Service is unreachable.`;
    } else {
      statusEl.textContent = "⚠️ ERROR";
      detailsEl.textContent = `Could not check status.`;
    }
  })
  .catch(err => {
    console.error("Failed to load status:", err);
    document.getElementById('status').textContent = "❓ UNKNOWN";
  });