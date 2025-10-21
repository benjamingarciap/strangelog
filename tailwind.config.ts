module.exports = {
  darkMode: 'class', // allows manual toggling
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // typical React setup
  theme: {
    extend: {
      screens: {
        xs: '532px',
      },
      fontFamily: {
        techovier: ['Techovier', 'monospace'],
      },
    },
  },
  plugins: [],
}
