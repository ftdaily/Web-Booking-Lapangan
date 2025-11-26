// import React, { useState } from 'react';
// import axios from 'axios';

// const WeatherPage = () => {
//   const [city, setCity] = useState('');
//   const [weather, setWeather] = useState(null);

//   const fetchWeather = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
//       setWeather(response.data);
//     } catch (error) {
//       console.error('Error fetching weather data:', error.message);
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Weather Information</h1>
//       <input
//         type="text"
//         placeholder="Enter city name"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         style={{ marginRight: '10px', padding: '5px' }}
//       />
//       <button onClick={fetchWeather} style={{ padding: '5px 10px' }}>
//         Get Weather
//       </button>

//       {weather && (
//         <div style={{ marginTop: '20px' }}>
//           <h2>Weather in {weather.city}</h2>
//           <p>Temperature: {weather.temperature}°C</p>
//           <p>Description: {weather.description}</p>
//           <p>Humidity: {weather.humidity}%</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WeatherPage;