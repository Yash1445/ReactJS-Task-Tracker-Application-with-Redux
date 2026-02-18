/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        priority: {
          high: '#ef4444',
          medium: '#f59e0b',
          low: '#22c55e'
        }
      }
    }
  },
  plugins: []
};