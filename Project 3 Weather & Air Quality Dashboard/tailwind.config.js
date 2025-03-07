/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B1220',        // page background — pre-dawn sky
        panel: '#121C30',      // card surface
        line: '#1F2D47',       // hairline borders
        mist: '#8CA0BE',       // secondary text
        cloud: '#E6EDF7',      // primary text
        skylight: '#6FC7EA',   // accent — clear-sky cyan
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
