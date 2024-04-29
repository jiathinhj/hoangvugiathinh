const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: '#6C3A57',
      secondary: '#5FFBF1',
      background: '#161E2D',
    },
    fontFamily: {
      body: ['Dosis', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
});