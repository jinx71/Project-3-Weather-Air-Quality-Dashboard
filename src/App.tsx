import SearchBar from './components/SearchBar';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import AirQualityCard from './components/AirQualityCard';
import ForecastChart from './components/ForecastChart';
import ErrorBanner from './components/ErrorBanner';
import SkeletonCard from './components/SkeletonCard';
import { useWeatherDashboard } from './hooks/useWeatherDashboard';

const App = () => {
  const { data, loading, error, searchCity, useMyLocation } = useWeatherDashboard('Dublin');

  return (
    <div className='min-h-screen bg-ink px-4 py-8 text-cloud sm:px-8'>
      <div className='mx-auto max-w-5xl'>
        <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='font-display text-2xl font-semibold tracking-tight'>
              Air<span className='text-skylight'>Sense</span>
            </h1>
            <p className='font-mono text-xs uppercase tracking-widest text-mist'>
              Weather · Air quality · Forecast
            </p>
          </div>
          <SearchBar onSearch={searchCity} onUseLocation={useMyLocation} disabled={loading} />
        </header>

        <main className='mt-8 space-y-4'>
          {error && <ErrorBanner message={error} />}

          {loading && (
            <>
              <div className='grid gap-4 lg:grid-cols-2'>
                <SkeletonCard className='h-72' />
                <SkeletonCard className='h-72' />
              </div>
              <SkeletonCard className='h-80' />
            </>
          )}

          {!loading && data && (
            <>
              <div className='grid gap-4 lg:grid-cols-2'>
                <CurrentWeatherCard location={data.location} current={data.current} />
                <AirQualityCard air={data.air} />
              </div>
              <ForecastChart forecast={data.forecast} />
            </>
          )}
        </main>

        <footer className='mt-10 text-center font-mono text-[10px] uppercase tracking-widest text-mist'>
          Data: OpenWeatherMap · Built by Md. Sazed Ul Karim
        </footer>
      </div>
    </div>
  );
};

export default App;
