const axios = require('axios');

// Simple in-memory cache { key: { data, expiresAt } }
const cache = new Map();
const CACHE_TTL = Number(process.env.WEATHER_CACHE_TTL_MS || 10 * 60 * 1000); // default 10 minutes

function cacheKeyForQuery(query) {
  return String(query).trim().toLowerCase();
}

exports.getWeather = async (req, res) => {
  const { city, force } = req.query;

  if (!city) {
    return res.status(400).json({ message: 'City name is required' });
  }

  const key = cacheKeyForQuery(city);
  const cached = cache.get(key);
  if (!force && cached && cached.expiresAt > Date.now()) {
    return res.json({ ...cached.data, cached: true });
  }

  try {
    const apiKey = process.env.WEATHERSTACK_API_KEY;
    const query = city; // WeatherStack accepts city names or "lat,lon"
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(query)}`;
    const response = await axios.get(url, { timeout: Number(process.env.WEATHERSTACK_TIMEOUT_MS) || 10000 });
    const data = response.data;

    if (data.error) {
      console.warn('WeatherStack returned an error for query', query, data.error);
      return res.status(400).json({ message: data.error.info });
    }

    const payload = {
      city: data.location && data.location.name ? data.location.name : query,
      temperature: data.current && typeof data.current.temperature !== 'undefined' ? data.current.temperature : null,
      description: data.current && data.current.weather_descriptions && data.current.weather_descriptions[0] ? data.current.weather_descriptions[0] : '',
      humidity: data.current && typeof data.current.humidity !== 'undefined' ? data.current.humidity : null,
      latitude: data.location?.lat || null,
      longitude: data.location?.lon || null,
      provider: 'weatherstack'
    };

    // Save to cache
    try {
      cache.set(key, { data: payload, expiresAt: Date.now() + CACHE_TTL });
    } catch (err) {
      console.warn('Failed to set weather cache', err);
    }

    res.json({ ...payload, cached: false });
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('Weather request timed out for query', city);
      return res.status(504).json({ message: 'Weather provider timeout' });
    }
    console.error('Error fetching weather data:', error.message, error.code || '');
    res.status(500).json({ message: 'Failed to fetch weather data' });
  }
};