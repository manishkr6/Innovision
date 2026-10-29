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
