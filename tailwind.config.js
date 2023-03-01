/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'razzle-rose': {
          DEFAULT: '#FF48C4',
          50: '#FFFFFF',
          100: '#FFEBF9',
          200: '#FFC2EB',
          300: '#FF9ADE',
          400: '#FF71D1',
          500: '#FF48C4',
          600: '#FF10B2',
          700: '#D70092',
          800: '#9F006C',
          900: '#670046'
        },
        'energy-yellow': {
          DEFAULT: '#F3EA5F',
          50: '#FFFFFF',
          100: '#FEFEF7',
          200: '#FCF9D1',
          300: '#F9F4AB',
          400: '#F6EF85',
          500: '#F3EA5F',
          600: '#EFE32B',
          700: '#D2C610',
          800: '#9E950C',
          900: '#6A6408'
        },
        'bright-blue': {
          DEFAULT: '#2BD1FC',
          50: '#E0F8FF',
          100: '#CCF4FE',
          200: '#A4EBFE',
          300: '#7BE2FD',
          400: '#53DAFD',
          500: '#2BD1FC',
          600: '#03BCEC',
          700: '#0390B4',
          800: '#02647D',
          900: '#013746'
        },
        'heliotrope': {
          DEFAULT: '#C04DF9',
          50: '#FFFFFF',
          100: '#F8EBFE',
          200: '#EAC3FD',
          300: '#DC9CFC',
          400: '#CE74FA',
          500: '#C04DF9',
          600: '#AD17F7',
          700: '#8D07CF',
          800: '#680599',
          900: '#430362'
        },
        'coral-red': {
          DEFAULT: '#FF3F3F',
          50: '#FFF7F7',
          100: '#FFE2E2',
          200: '#FFB9B9',
          300: '#FF9191',
          400: '#FF6868',
          500: '#FF3F3F',
          600: '#FF0707',
          700: '#CE0000',
          800: '#960000',
          900: '#5E0000'
        },
      },
    },
  },
  plugins: [],
}