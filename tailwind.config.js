/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        base: '#030303',
        surface: '#0A0A0A',
        line: '#1E1E1E',
        primary: '#E2E2E2',
        muted: '#737373',
        accent: '#E11D48', // Swapped to Crimson Red for martial arts theme
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}