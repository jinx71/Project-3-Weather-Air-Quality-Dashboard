import axios from 'axios';
import type {
  GeoLocation,
  CurrentWeather,
  ForecastPoint,
  AirQuality,
  DashboardData,
} from '../types';

const API_KEY = import.meta.env.VITE_OWM_API_KEY as string;

const owm = axios.create({
  baseURL: 'https://api.openweathermap.org',
  params: { appid: API_KEY },
});

const geocodeCity = async (query: string): Promise<GeoLocation> => {
  const { data } = await owm.get('/geo/1.0/direct', {
    params: { q: query, limit: 1 },
  });
  if (!data.length) {
    throw new Error(`No location found for "${query}". Check the spelling and try again.`);
  }
  const { name, lat, lon, country, state } = data[0];
  return { name, lat, lon, country, state };
};

const reverseGeocode = async (lat: number, lon: number): Promise<GeoLocation> => {
  const { data } = await owm.get('/geo/1.0/reverse', {
    params: { lat, lon, limit: 1 },
  });
  if (!data.length) {
    return { name: 'Current location', lat, lon, country: '' };
  }
  const { name, country, state } = data[0];
  return { name, lat, lon, country, state };
};

const fetchCurrent = async (lat: number, lon: number): Promise<CurrentWeather> => {
  const { data } = await owm.get('/data/2.5/weather', {
    params: { lat, lon, units: 'metric' },
  });
  return {
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    visibility: data.visibility,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
  };
};

const fetchForecast = async (lat: number, lon: number): Promise<ForecastPoint[]> => {
  const { data } = await owm.get('/data/2.5/forecast', {
    params: { lat, lon, units: 'metric' },
  });
  return data.list.map((p: { dt: number; main: { temp: number }; pop: number }) => ({
    dt: p.dt,
    temp: p.main.temp,
    pop: p.pop,
  }));
};

const fetchAirQuality = async (lat: number, lon: number): Promise<AirQuality> => {
  const { data } = await owm.get('/data/2.5/air_pollution', {
    params: { lat, lon },
  });
  const entry = data.list[0];
  return {
    aqi: entry.main.aqi,
    components: {
      co: entry.components.co,
      no2: entry.components.no2,
      o3: entry.components.o3,
      so2: entry.components.so2,
      pm2_5: entry.components.pm2_5,
      pm10: entry.components.pm10,
    },
  };
};

const loadForLocation = async (location: GeoLocation): Promise<DashboardData> => {
  // Independent requests — fire them in parallel instead of awaiting sequentially
  const [current, forecast, air] = await Promise.all([
    fetchCurrent(location.lat, location.lon),
    fetchForecast(location.lat, location.lon),
    fetchAirQuality(location.lat, location.lon),
  ]);
  return { location, current, forecast, air };
};

export const loadDashboardByCity = async (query: string): Promise<DashboardData> => {
  const location = await geocodeCity(query);
  return loadForLocation(location);
};

export const loadDashboardByCoords = async (
  lat: number,
  lon: number
): Promise<DashboardData> => {
  const location = await reverseGeocode(lat, lon);
  return loadForLocation(location);
};
