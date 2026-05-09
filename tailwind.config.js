/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f7fbff',
          100: '#e3f5fb',
          200: '#bfe8f2',
          300: '#8bd6e8',
          400: '#30add4',
          500: '#0aa7d9',
          600: '#44439a',
          700: '#393580',
          800: '#2d285f',
          900: '#241f47',
          950: '#16112b',
          accent: '#c93343',
          hover: '#a92635',
          cyan: '#0aa7d9',
          magenta: '#ec1381',
          green: '#8cc63f',
          orange: '#f7941d'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
