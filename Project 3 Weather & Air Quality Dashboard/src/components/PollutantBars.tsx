import type { AirQuality } from '../types';
import { POLLUTANTS, ratioColor } from '../utils/aqi';

interface PollutantBarsProps {
  components: AirQuality['components'];
}

const PollutantBars = ({ components }: PollutantBarsProps) => (
  <div className='mt-6'>
    <p className='font-mono text-[10px] uppercase tracking-widest text-mist'>
      Pollutants vs WHO 2021 guideline
    </p>
    <ul className='mt-3 space-y-3'>
      {POLLUTANTS.map(({ key, label, guideline }) => {
        const value = components[key];
        const ratio = value / guideline;
        const width = Math.min(ratio / 2, 1) * 100; // bar full at 2× guideline
        return (
          <li key={key} className='grid grid-cols-[3.5rem_1fr_4.5rem] items-center gap-3'>
            <span className='font-mono text-xs text-cloud'>{label}</span>
            <div className='h-1.5 overflow-hidden rounded-full bg-ink'>
              <div
                className='h-full rounded-full transition-all duration-500'
                style={{ width: `${width}%`, backgroundColor: ratioColor(ratio) }}
              />
            </div>
            <span className='text-right font-mono text-xs text-mist'>
              {value.toFixed(1)} µg/m³
            </span>
          </li>
        );
      })}
    </ul>
  </div>
);

export default PollutantBars;
