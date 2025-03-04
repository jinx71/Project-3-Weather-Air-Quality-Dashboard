import type { AqiLevel } from '../types';

export interface AqiMeta {
  label: string;
  color: string;
  advice: string;
}

// OpenWeatherMap uses a 1–5 scale (CAQI-style), not the US EPA 0–500 index
export const AQI_SCALE: Record<AqiLevel, AqiMeta> = {
  1: { label: 'Good', color: '#4ADE80', advice: 'Air quality is satisfactory. Enjoy outdoor activities.' },
  2: { label: 'Fair', color: '#A3E635', advice: 'Acceptable air quality for most people.' },
  3: { label: 'Moderate', color: '#FACC15', advice: 'Sensitive groups should limit prolonged outdoor exertion.' },
  4: { label: 'Poor', color: '#FB923C', advice: 'Reduce outdoor activity; sensitive groups stay indoors.' },
  5: { label: 'Very Poor', color: '#F87171', advice: 'Avoid outdoor exertion. Keep windows closed.' },
};

export interface PollutantMeta {
  key: 'pm2_5' | 'pm10' | 'no2' | 'o3' | 'so2' | 'co';
  label: string;
  guideline: number; // WHO 2021 24h guideline, µg/m³
}

export const POLLUTANTS: PollutantMeta[] = [
  { key: 'pm2_5', label: 'PM2.5', guideline: 15 },
  { key: 'pm10', label: 'PM10', guideline: 45 },
  { key: 'no2', label: 'NO₂', guideline: 25 },
  { key: 'o3', label: 'O₃', guideline: 100 },
  { key: 'so2', label: 'SO₂', guideline: 40 },
  { key: 'co', label: 'CO', guideline: 4000 },
];

export const ratioColor = (ratio: number): string => {
  if (ratio <= 1) return '#4ADE80';
  if (ratio <= 2) return '#FACC15';
  return '#F87171';
};
