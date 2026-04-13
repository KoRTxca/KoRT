/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        kort: {
          bg: '#08080f',
          bg2: '#0a0a1a',
          gold: '#c9a84c',
          'gold-light': '#e8d5a3',
          text: '#e8e8e8',
          muted: '#888888',
          danger: '#c0392b',
          success: '#27ae60',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
