import type { CurrentWeather, GeoLocation } from '../types';
import { formatTime, round } from '../utils/format';
import StatTile from './StatTile';

interface CurrentWeatherCardProps {
  location: GeoLocation;
  current: CurrentWeather;
}

const CurrentWeatherCard = ({ location, current }: CurrentWeatherCardProps) => {
  const isNight = current.icon.endsWith('n');

  return (
    <section
      className={`rounded-2xl border border-line p-6 ${
        isNight
          ? 'bg-gradient-to-br from-[#0E1830] to-[#0B1220]'
          : 'bg-gradient-to-br from-[#14253F] to-[#121C30]'
      }`}
    >
      <p className='font-mono text-xs uppercase tracking-widest text-mist'>
        {location.name}
        {location.state ? `, ${location.state}` : ''} · {location.country}
      </p>

      <div className='mt-4 flex items-center gap-4'>
        <img
          src={`https://openweathermap.org/img/wn/${current.icon}@2x.png`}
          alt={current.description}
          className='h-20 w-20'
        />
        <div>
          <p className='font-display text-6xl font-semibold text-cloud'>
            {round(current.temp)}°
          </p>
          <p className='capitalize text-mist'>
            {current.description} · feels like {round(current.feelsLike)}°
          </p>
        </div>
      </div>

      <div className='mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3'>
        <StatTile label='Humidity' value={`${current.humidity}%`} />
        <StatTile label='Wind' value={`${current.windSpeed.toFixed(1)} m/s`} />
        <StatTile label='Pressure' value={`${current.pressure} hPa`} />
        <StatTile label='Visibility' value={`${(current.visibility / 1000).toFixed(1)} km`} />
        <StatTile label='Sunrise' value={formatTime(current.sunrise)} />
        <StatTile label='Sunset' value={formatTime(current.sunset)} />
      </div>
    </section>
  );
};

export default CurrentWeatherCard;
