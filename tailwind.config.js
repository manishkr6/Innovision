/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Homepage palette: warm paper + ink, marigold accent, prayer-flag track colours
        paper: { DEFAULT: '#FBF8F3', deep: '#F3EDE3' },
        ink: { DEFAULT: '#1C1917', soft: '#44403C', muted: '#78716C', line: '#E7E0D5' },
        marigold: { 50: '#FFF8EB', 100: '#FDEBC8', 400: '#F7A928', 500: '#EE8E0B', 600: '#C96F06', 700: '#9A5309' },
        flag: { blue: '#2456A6', red: '#C2412D', green: '#2F7D4F', yellow: '#D99A0B' },
        night: '#17151F',
        cyber: {
          dark: '#0B0F19',
          darker: '#07090E',
          card: '#0D111C',
          cardHover: '#131B2E',
          surface: '#111726',
          border: 'rgba(255, 255, 255, 0.08)',
          purple: '#6366F1',
          blue: '#3B82F6',
          cyan: '#38BDF8',
          pink: '#818CF8',
          glow: '#3B82F6',
          lightBg: '#F8FAFC',
          lightCard: '#FFFFFF',
          lightBorder: 'rgba(0, 0, 0, 0.08)'
        }
      },
      fontFamily: {
        heading: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Bebas Neue"', '"Anton"', 'sans-serif'],
        anton: ['"Anton"', 'sans-serif'],
        body: ['"Space Grotesk"', '"Poppins"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-fast': 'float 3.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
