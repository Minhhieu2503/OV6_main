/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark backgrounds
        'rich-black': '#080808',
        'surface-dark': '#0d0d0d',
        // Gold palette
        'gold': '#F5C518',
        'gold-light': '#FFD700',
        'gold-dark': '#B8860B',
        'gold-muted': '#8B6914',
        // Legacy (keep for safety)
        'neon-blue': '#F5C518', // remapped so any leftover neon-blue refs turn gold
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      dropShadow: {
        'glow-gold': '0 0 30px rgba(245, 197, 24, 0.55)',
        'glow': '0 0 20px rgba(245, 197, 24, 0.4)',
      },
      boxShadow: {
        'gold-sm': '0 0 12px rgba(245,197,24,0.25)',
        'gold-md': '0 0 25px rgba(245,197,24,0.35)',
        'gold-lg': '0 0 45px rgba(245,197,24,0.45)',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245,197,24,0.4), 0 0 40px rgba(245,197,24,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(245,197,24,0.8), 0 0 80px rgba(245,197,24,0.4)' },
        },
      },
    },
  },
  plugins: [],
}
