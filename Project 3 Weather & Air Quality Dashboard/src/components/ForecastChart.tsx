import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ForecastPoint } from '../types';
import { formatDayHour } from '../utils/format';

interface ForecastChartProps {
  forecast: ForecastPoint[];
}

interface ChartPoint {
  label: string;
  temp: number;
  rain: number;
}

const ForecastChart = ({ forecast }: ForecastChartProps) => {
  const data: ChartPoint[] = forecast.map((p) => ({
    label: formatDayHour(p.dt),
    temp: Math.round(p.temp * 10) / 10,
    rain: Math.round(p.pop * 100),
  }));

  return (
    <section className='rounded-2xl border border-line bg-panel p-6'>
      <p className='font-mono text-xs uppercase tracking-widest text-mist'>
        5-day forecast · 3-hour intervals
      </p>
      <div className='mt-4 h-64'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id='tempFill' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='#6FC7EA' stopOpacity={0.35} />
                <stop offset='100%' stopColor='#6FC7EA' stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke='#1F2D47' strokeDasharray='3 3' vertical={false} />
            <XAxis
              dataKey='label'
              tick={{ fill: '#8CA0BE', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
              tickLine={false}
              axisLine={{ stroke: '#1F2D47' }}
              interval={7}
            />
            <YAxis
              tick={{ fill: '#8CA0BE', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
              tickLine={false}
              axisLine={false}
              unit='°'
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0B1220',
                border: '1px solid #1F2D47',
                borderRadius: '0.5rem',
                fontFamily: 'IBM Plex Mono',
                fontSize: 12,
              }}
              labelStyle={{ color: '#8CA0BE' }}
              formatter={(value: number, name: string) =>
                name === 'temp' ? [`${value}°C`, 'Temp'] : [`${value}%`, 'Rain chance']
              }
            />
            <Area
              type='monotone'
              dataKey='temp'
              stroke='#6FC7EA'
              strokeWidth={2}
              fill='url(#tempFill)'
            />
            <Area type='monotone' dataKey='rain' stroke='transparent' fill='transparent' />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ForecastChart;
