const axios = require('axios');

exports.getWeather = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: 'City name is required' });
  }

  try {
    const apiKey = process.env.WEATHERSTACK_API_KEY;
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
    const response = await axios.get(url);
    const data = response.data;

    if (data.error) {
      return res.status(400).json({ message: data.error.info });
    }

    res.json({
      city: data.location.name,
      temperature: data.current.temperature,
      description: data.current.weather_descriptions[0],
      humidity: data.current.humidity,
    });
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ message: 'Failed to fetch weather data' });
  }
};