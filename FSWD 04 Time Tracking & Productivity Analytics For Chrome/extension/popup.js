fetch('http://localhost:5000/api/tracker/guestUser/today')
  .then(res => res.json())
  .then(data => {
    const stats = document.getElementById('stats');
    data.forEach(entry => {
      const div = document.createElement('div');
      div.textContent = `${entry.hostname}: ${(entry.timeSpent / 1000).toFixed(1)}s`;
      stats.appendChild(div);
    });
  });
