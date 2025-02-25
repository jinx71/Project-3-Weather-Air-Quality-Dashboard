interface StatTileProps {
  label: string;
  value: string;
}

const StatTile = ({ label, value }: StatTileProps) => (
  <div className='rounded-lg border border-line bg-ink/40 px-3 py-2'>
    <p className='font-mono text-[10px] uppercase tracking-widest text-mist'>{label}</p>
    <p className='mt-1 font-mono text-sm text-cloud'>{value}</p>
  </div>
);

export default StatTile;
