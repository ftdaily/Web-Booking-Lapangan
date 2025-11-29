import React, { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import WeatherIcon from './WeatherIcon';

const mapDescriptionToType = (desc = '') => {
  const d = String(desc || '').toLowerCase();
  if (d.includes('sun') || d.includes('clear')) return 'clear';
  if (d.includes('cloud')) return 'cloud';
  if (d.includes('rain') || d.includes('shower') || d.includes('drizzle')) return 'rain';
  if (d.includes('storm') || d.includes('thunder')) return 'storm';
  if (d.includes('snow')) return 'snow';
  if (d.includes('fog') || d.includes('mist')) return 'mist';
  return 'clear';
};

const DEFAULT_TTL_MINUTES = 5;
const DEFAULT_COORDS_FALLBACK = '-6.1786756038843125,106.78531952865309'; // Cibubur fallback

const Weather = ({ city: initialCity = 'Jakarta', coords, defaultCoords = DEFAULT_COORDS_FALLBACK, compact = false, ttlMinutes = DEFAULT_TTL_MINUTES }) => {
  // city is the query string used to call the backend (either a name or "lat,lon")
  const [city, setCity] = useState(coords || initialCity);
  const [autoDetected, setAutoDetected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mounted = useRef(false);
  const fetchedGeo = useRef(false);

  const getCache = (key) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      return obj;
    } catch (err) {
      return null;
    }
  };

  const setCache = (key, obj) => {
    try {
      localStorage.setItem(key, JSON.stringify(obj));
    } catch (err) {
      // ignore
    }
  };

  const cacheKey = (q) => `weather_cache_${q}`;

  const fetchWeatherQuery = async (qCity, force = false) => {
    if (!qCity) return;
    setLoading(true);
    setError(null);
    try {
      const cKey = cacheKey(qCity);
      const cached = getCache(cKey);
      const now = Date.now();
      const ttl = (ttlMinutes || DEFAULT_TTL_MINUTES) * 60 * 1000;
      if (!force && cached && cached.ts && (now - cached.ts) <= ttl) {
        setData(cached.data);
        setLoading(false);
        return;
      }
      const res = await api.get('/weather', { params: { city: qCity, force: force ? '1' : undefined }, timeout: 20000 });
      setData(res.data);
      setCache(cKey, { ts: Date.now(), data: res.data });
    } catch (err) {
      console.warn('Failed to fetch weather', err);
      // axios timeout has code ECONNABORTED and message contains 'timeout'
      if (err?.code === 'ECONNABORTED' || (err?.message || '').toLowerCase().includes('timeout')) {
        setError('Permintaan cuaca melebihi batas waktu (timeout). Silakan coba lagi.');
      } else {
        setError(err?.response?.data?.message || err.message || 'Gagal mengambil data cuaca');
      }
      // If backend timed out but we have cached client data, use that
      if (err?.response?.status === 504) {
        const cKey2 = cacheKey(qCity);
        const cached2 = getCache(cKey2);
        if (cached2 && cached2.data) {
          setData(cached2.data);
          setError('Menampilkan data cached karena penyedia cuaca tidak merespon (timeout)');
          if (mounted.current) setLoading(false);
          return;
        }
      }
      setData(null);
    } finally {
      if (mounted.current) setLoading(false);
    }
  };

  useEffect(() => {
    mounted.current = true;
    // If coords prop is provided, prefer it over geolocation
    if (coords) {
      fetchWeatherQuery(coords);
      return () => { mounted.current = false; };
    }

    const tryGeo = async () => {
      if (typeof window !== 'undefined' && navigator && navigator.geolocation) {
        try {
          const p = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              resolve,
              reject,
              { timeout: 5000 }
            );
          });

          if (p && p.coords) {
            const latlon = `${p.coords.latitude},${p.coords.longitude}`;
            await fetchWeatherQuery(latlon);
            setCity(latlon);
            setAutoDetected(true);
            fetchedGeo.current = true;
            return;
          }
        } catch (err) {
          // ignore and fallback
        }
      }
      // fallback: use default coords if geolocation not available or denied
      await fetchWeatherQuery(defaultCoords);
      setCity(defaultCoords);
      setAutoDetected(false);
    };

    tryGeo();

    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!city) return;
    if (fetchedGeo.current) {
      fetchedGeo.current = false;
      return;
    }
    fetchWeatherQuery(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const onCityChange = (e) => setCity(e.target.value);

  const onUseLocation = async () => {
    if (typeof window === 'undefined' || !navigator?.geolocation) {
      setError('Geolocation tidak didukung pada perangkat Anda');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const p = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 7000 }));
      if (p && p.coords) {
        const latlon = `${p.coords.latitude},${p.coords.longitude}`;
        setCity(latlon);
        await fetchWeatherQuery(latlon, true);
      }
    } catch (err) {
      console.warn('Geolocation failed', err);
      setError('Tidak dapat memperoleh lokasi. Pastikan Anda mengizinkan akses lokasi.');
    } finally {
      setLoading(false);
    }
  };

  const forceRefresh = async () => {
    setError(null);
    await fetchWeatherQuery(city, true);
  };

  const type = data ? mapDescriptionToType(data.description) : 'clear';

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-20 h-20 rounded-md bg-blue-50 text-2xl">
            {loading ? '...' : (data ? <WeatherIcon type={type} size={compact ? 28 : 36} /> : '❓')}
          </div>
          <div>
            <div className="text-sm text-gray-600">Cuaca di</div>
            <div className="text-lg md:text-xl font-semibold text-gray-800">{data?.city || city}</div>
            {data?.latitude && data?.longitude && (
              <div className="text-xs text-gray-400">Koordinat: {parseFloat(data.latitude).toFixed(6)}, {parseFloat(data.longitude).toFixed(6)}</div>
            )}
              <div className="text-sm text-gray-500">
                {loading ? 'Memuat...' : (data ? data.description : (error || ''))}
                {data?.cached && (
                  <div className="text-xs text-gray-400 mt-1">(cached)</div>
                )}
                {autoDetected && (
                  <div className="text-xs text-gray-400 mt-1">(Lokasi terdeteksi otomatis)</div>
                )}
              </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {loading ? (
            <div className="text-sm text-gray-500">Memuat suhu...</div>
          ) : data ? (
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">{data.temperature}°C</div>
              <div className="text-xs text-gray-500">Kelembaban: {data.humidity}%</div>
            </div>
          ) : (
            <div className="text-sm text-red-500">
              {error}
              <div className="mt-2">
                <button onClick={forceRefresh} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Retry</button>
              </div>
            </div>
          )}

            <div className="mt-2 flex items-center gap-2">
              <button onClick={forceRefresh} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Update</button>
              <button onClick={onUseLocation} className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm">Deteksi Ulang Lokasi</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
