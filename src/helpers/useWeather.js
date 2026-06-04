import { useState, useEffect } from 'react';
import { fetchSummary } from '../api/weatherApi';

const useWeather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSummary()
      .then(res => setData(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

export default useWeather;