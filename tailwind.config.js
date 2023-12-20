/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FA9A05'
        },
        gray: {
          custom: '#212121'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

