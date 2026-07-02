import type { AirQuality, AqiLevel } from '../types';
import { AQI_SCALE } from '../utils/aqi';
import PollutantBars from './PollutantBars';

interface AirQualityCardProps {
  air: AirQuality;
}

const LEVELS: AqiLevel[] = [1, 2, 3, 4, 5];

const AirQualityCard = ({ air }: AirQualityCardProps) => {
  const meta = AQI_SCALE[air.aqi];

  return (
    <section className='rounded-2xl border border-line bg-panel p-6'>
      <p className='font-mono text-xs uppercase tracking-widest text-mist'>Air quality index</p>

      <div className='mt-4 flex items-baseline gap-3'>
        <p className='font-display text-6xl font-semibold' style={{ color: meta.color }}>
          {air.aqi}
        </p>
        <p className='font-display text-xl text-cloud'>{meta.label}</p>
      </div>
      <p className='mt-2 text-sm text-mist'>{meta.advice}</p>

      {/* Spectrum gauge: 5 colour bands, marker sits on the current level */}
      <div className='mt-5'>
        <div className='flex h-2 overflow-hidden rounded-full'>
          {LEVELS.map((level) => (
            <div
              key={level}
              className='flex-1 transition-opacity'
              style={{
                backgroundColor: AQI_SCALE[level].color,
                opacity: level === air.aqi ? 1 : 0.25,
              }}
            />
          ))}
        </div>
        <div
          className='mt-1 h-2 w-2 -translate-x-1/2 rotate-45 border-r border-t border-cloud'
          style={{ marginLeft: `${(air.aqi - 0.5) * 20}%`, transform: 'translateX(-50%) rotate(-45deg)' }}
          aria-hidden='true'
        />
        <div className='flex justify-between font-mono text-[10px] uppercase tracking-wider text-mist'>
          <span>Good</span>
          <span>Very poor</span>
        </div>
      </div>

      <PollutantBars components={air.components} />
    </section>
  );
};

export default AirQualityCard;
