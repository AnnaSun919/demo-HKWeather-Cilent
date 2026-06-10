import { useState, useEffect } from 'react';
import { fetchSummary } from '../api/weatherApi';

const WeatherPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSummary()
      .then(res => setData(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: '2rem', color: '#888' }}>Loading weather...</p>;
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>Failed to load weather.</p>;

  const time = new Date(data.updatedAt).toLocaleTimeString('en-HK', { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '2rem 1.5rem', fontFamily: 'sans-serif' }}>

      {/* Location */}
      <p style={{ fontSize: 13, color: '#888', marginBottom: '1rem' }}>
        Hong Kong Observatory
      </p>
      <p style={{ fontSize: 20, color: 'black', marginBottom: '1rem' }}>
        Current Weather
      </p>
      {/* Warning banner */}
      {data.warnings?.length > 0 && (
        <div style={{ background: '#FAEEDA', borderRadius: 8, padding: '10px 14px', marginBottom: '1.5rem' }}>
          <p style={{ fontSize: 13, color: '#633806', lineHeight: 1.5 }}>{data.warnings[0]}</p>
        </div>
      )}

      {/* Main card */}
      <div style={{ border: '0.5px solid #e5e5e5', borderRadius: 12, padding: '2rem 1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
        <img
          src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${data.icons[0]}.png`}
          alt={data.weather}
          style={{ width: 72, height: 72, marginBottom: '1rem' }}
        />
        <p style={{ fontSize: 15, color: '#888', marginBottom: 8 }}>{data.weather}</p>
        <p style={{ fontSize: 56, fontWeight: 500, lineHeight: 1 }}>
          {data.temperature}
        </p>
        <p style={{ fontSize: 12, color: '#aaa', marginTop: '1rem' }}>Updated {time}</p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: data.uvIndex != null ? '1fr 1fr' : '1fr', gap: 10, marginBottom: '1rem' }}>
        <div style={{ background: '#f7f7f7', borderRadius: 8, padding: '1rem' }}>
          <p style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>Humidity</p>
          <p style={{ fontSize: 22, fontWeight: 500 }}>{data.humidity}%</p>
        </div>

        {data.uvIndex != null && (
          <div style={{ background: '#f7f7f7', borderRadius: 8, padding: '1rem' }}>
            <p style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>UV Index</p>
            <p style={{ fontSize: 22, fontWeight: 500 }}>{data.uvIndex?.value}</p>
            <p style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{data.uvIndex?.desc}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;