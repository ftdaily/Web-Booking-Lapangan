import React, { useState, useEffect } from "react";

const Weather = () => {
  const [city, setCity] = useState("Jakarta");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const mockWeatherData = {
    Jakarta: {
      city: "Jakarta",
      temperature: 28,
      description: "Cerah berawan",
      humidity: 75,
      windSpeed: 15,
      icon: "⛅",
      recommendation: "Cuaca bagus untuk olahraga outdoor!",
    },
    Surabaya: {
      city: "Surabaya",
      temperature: 30,
      description: "Cerah",
      humidity: 70,
      windSpeed: 12,
      icon: "☀️",
      recommendation: "Cuaca sangat baik untuk bermain futsal atau basket!",
    },
    Bandung: {
      city: "Bandung",
      temperature: 25,
      description: "Berawan",
      humidity: 80,
      windSpeed: 10,
      icon: "☁️",
      recommendation: "Cuaca sejuk, cocok untuk badminton indoor!",
    },
    Yogyakarta: {
      city: "Yogyakarta",
      temperature: 27,
      description: "Cerah",
      humidity: 65,
      windSpeed: 8,
      icon: "☀️",
      recommendation: "Cuaca sempurna untuk tennis outdoor!",
    },
  };

  const sportRecommendations = [
    { sport: "Badminton", weather: ["Berawan", "Hujan"], location: "Indoor" },
    {
      sport: "Futsal",
      weather: ["Cerah", "Cerah berawan"],
      location: "Indoor/Outdoor",
    },
    {
      sport: "Tennis",
      weather: ["Cerah", "Cerah berawan"],
      location: "Outdoor",
    },
    {
      sport: "Basketball",
      weather: ["Cerah", "Cerah berawan", "Berawan"],
      location: "Indoor/Outdoor",
    },
  ];

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Silakan masukkan nama kota");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulasi API call dengan delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const weatherData = mockWeatherData[city] || {
        city: city,
        temperature: Math.floor(Math.random() * 15) + 20,
        description: ["Cerah", "Berawan", "Cerah berawan"][
          Math.floor(Math.random() * 3)
        ],
        humidity: Math.floor(Math.random() * 30) + 60,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        icon: ["☀️", "☁️", "⛅"][Math.floor(Math.random() * 3)],
        recommendation: "Cek kondisi cuaca untuk aktivitas olahraga!",
      };

      setWeather(weatherData);
    } catch (err) {
      setError("Gagal mengambil data cuaca");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getRecommendedSports = (weatherDesc) => {
    return sportRecommendations.filter((sport) =>
      sport.weather.includes(weatherDesc)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Informasi Cuaca & Rekomendasi Olahraga
          </h1>
          <p className="text-blue-100 text-lg">
            Dapatkan info cuaca terkini dan rekomendasi olahraga yang tepat
          </p>
        </div>

        {/* Weather Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Masukkan nama kota..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={fetchWeather}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Cek Cuaca"}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Weather Display */}
        {weather && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold">{weather.city}</h2>
                    <p className="text-blue-100">{weather.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-6xl">{weather.icon}</div>
                    <div className="text-4xl font-bold">
                      {weather.temperature}°C
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">💧</div>
                    <div className="text-gray-600">Kelembaban</div>
                    <div className="text-xl font-bold">{weather.humidity}%</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">💨</div>
                    <div className="text-gray-600">Kecepatan Angin</div>
                    <div className="text-xl font-bold">
                      {weather.windSpeed} km/h
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">🌡️</div>
                    <div className="text-gray-600">Suhu</div>
                    <div className="text-xl font-bold">
                      {weather.temperature}°C
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">
                    💡 Rekomendasi
                  </h3>
                  <p className="text-green-700">{weather.recommendation}</p>
                </div>
              </div>
            </div>

            {/* Sport Recommendations */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Olahraga yang Direkomendasikan
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {getRecommendedSports(weather.description).map(
                  (sport, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-green-400 to-green-600 text-white p-4 rounded-lg"
                    >
                      <h4 className="font-bold text-lg mb-2">{sport.sport}</h4>
                      <p className="text-green-100 text-sm mb-2">
                        Lokasi: {sport.location}
                      </p>
                      <div className="text-2xl">
                        {sport.sport === "Badminton" && "🏸"}
                        {sport.sport === "Futsal" && "⚽"}
                        {sport.sport === "Tennis" && "🎾"}
                        {sport.sport === "Basketball" && "🏀"}
                      </div>
                    </div>
                  )
                )}
              </div>

              {getRecommendedSports(weather.description).length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-lg mb-2">🌧️</div>
                  <p className="text-gray-600">
                    Cuaca kurang mendukung aktivitas outdoor. Pertimbangkan
                    olahraga indoor seperti badminton atau gym.
                  </p>
                </div>
              )}
            </div>

            {/* Quick City Buttons */}
            <div className="mt-8 text-center">
              <h4 className="text-white text-lg mb-4">Kota Populer</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {Object.keys(mockWeatherData).map((cityName) => (
                  <button
                    key={cityName}
                    onClick={() => {
                      setCity(cityName);
                      setTimeout(fetchWeather, 100);
                    }}
                    className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors"
                  >
                    {cityName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
