const BASE = 'http://localhost:3000/api/weather';

export const fetchSummary = () =>
  fetch(`${BASE}/summary`).then(r => r.json());