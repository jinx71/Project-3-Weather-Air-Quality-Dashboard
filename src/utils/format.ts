export const formatTime = (unixSeconds: number): string =>
  new Date(unixSeconds * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

export const formatDayHour = (unixSeconds: number): string => {
  const d = new Date(unixSeconds * 1000);
  return `${d.toLocaleDateString([], { weekday: 'short' })} ${d.getHours()}:00`;
};

export const round = (n: number): number => Math.round(n);
