import { useCallback, useEffect, useState } from 'react';
import type { DashboardData } from '../types';
import { loadDashboardByCity, loadDashboardByCoords } from '../services/weatherApi';

interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

const getErrorMessage = (err: unknown): string => {
  if (err instanceof Error) return err.message;
  return 'Something went wrong while fetching data. Try again in a moment.';
};

export const useWeatherDashboard = (initialCity = 'Dublin') => {
  const [state, setState] = useState<DashboardState>({
    data: null,
    loading: true,
    error: null,
  });

  const run = useCallback(async (task: () => Promise<DashboardData>) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await task();
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: getErrorMessage(err) }));
    }
  }, []);

  const searchCity = useCallback(
    (query: string) => run(() => loadDashboardByCity(query)),
    [run]
  );

  const useMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: 'Geolocation is not supported by this browser.' }));
      return;
    }
    setState((s) => ({ ...s, loading: true, error: null }));
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => run(() => loadDashboardByCoords(coords.latitude, coords.longitude)),
      () =>
        setState((s) => ({
          ...s,
          loading: false,
          error: 'Location access was denied. Search for a city instead.',
        }))
    );
  }, [run]);

  useEffect(() => {
    searchCity(initialCity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...state, searchCity, useMyLocation };
};
