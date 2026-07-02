export interface GeoLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  visibility: number;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
}

export interface ForecastPoint {
  dt: number;
  temp: number;
  pop: number; // probability of precipitation, 0–1
}

export type AqiLevel = 1 | 2 | 3 | 4 | 5;

export interface AirQuality {
  aqi: AqiLevel;
  components: {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
  };
}

export interface DashboardData {
  location: GeoLocation;
  current: CurrentWeather;
  forecast: ForecastPoint[];
  air: AirQuality;
}
