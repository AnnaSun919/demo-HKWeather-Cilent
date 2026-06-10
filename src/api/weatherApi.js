const BASE = 'http://localhost:3000/api/weather';

export const fetchSummary = () =>
  fetch(`${BASE}/summary`)
    .then(res => {
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      return res.json();
    });