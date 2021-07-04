module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', 'styleconstants.js'],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary-bg': '#232931',
        'secondary-bg': '#393e46',
        'primary-tf': '#eeeeee',
        'secondary-tf': '#4ecca3'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('precss'),
    require('autoprefixer')
  ],
}
