module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Josefin Sans', 'sans-serif'],
      },
    },
    colors: {
      black: '#313131',
      blue: '#125F83',
      lightblue: '#9FE4FF',
      whiteish: '#F1FCFF',
      sand: '#E7C7B4',
      greyish: '#F8F8F8',
    },
  },
  plugins: [],
};
