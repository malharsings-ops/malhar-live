import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C9B892',
        'primary-dark': '#A89470',
        secondary: '#5A1B2C',
        'secondary-dark': '#3D1428',
        accent: '#F5F1E8',
        dark: '#0f1419',
        burgundy: '#5A1B2C',
        gold: '#C9B892',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant', 'serif'],
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-in': 'slideIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
