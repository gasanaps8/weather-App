import React, { useState } from 'react';

const CitySearch: React.FC = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=lisbon&appid=${apiKey}`
      );

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();

      if (data.length > 0) {
        setCoords({ lat: data[0].lat, lon: data[0].lon });
      } else {
        setError('No data found.');
      }
    } catch (err) {
      setError('Error fetching coordinates.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Lisbon Coordinates</h1>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : 'Show Latitude & Longitude'}
      </button>
      {coords && (
        <p>
          Latitude: {coords.lat}, Longitude: {coords.lon}
        </p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CitySearch;
