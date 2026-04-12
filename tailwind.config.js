/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'shield-dark': '#08080f',
        'gold-primary': '#c9a84c',
        'dragon-blue': '#0033a0',
        'silver-blade': '#e0e0e0',
        card: '#0a0a1a'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Cinzel', 'serif']
      }
    },
  },
  plugins: [],
}
