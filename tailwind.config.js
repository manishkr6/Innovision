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
        // All pairings meet WCAG AA: white on 500 = 5.2:1, 600/700 text on paper >= 6.9:1, 400 on night = 8:1
        ink: { DEFAULT: '#1C1917', soft: '#3F3A36', muted: '#5F5852', line: '#E2D9CC' },
        // Deep Himalayan saffron. 400 = accent on dark surfaces, 500 = fill under white text, 600/700 = accent text on light
        marigold: { 50: '#FFF4EC', 100: '#FDE3D0', 400: '#FB923C', 500: '#C2410C', 600: '#9A3412', 700: '#7C2D12' },
        flag: { blue: '#2456A6', red: '#C2412D', green: '#2F7D4F', yellow: '#D99A0B', redText: '#9B2C1C', greenText: '#24603D' },
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
