/****************
 TODO: You can tweak colors and add custom animations here
*****************/
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui'],
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        navy: '#0b1020',
        neon: {
          blue: '#4dd5ff',
          violet: '#a78bfa',
          pink: '#ff6ad5',
        },
      },
      backgroundImage: {
        'grid-glow': "radial-gradient(circle at 50% -20%, rgba(77,213,255,0.15), transparent 40%), radial-gradient(circle at 20% 120%, rgba(167,139,250,0.12), transparent 35%), radial-gradient(circle at 120% 120%, rgba(255,106,213,0.08), transparent 40%)",
      },
      boxShadow: {
        glow: '0 0 20px rgba(77,213,255,0.35), 0 0 40px rgba(167,139,250,0.25)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
