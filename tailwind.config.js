module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./page-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'landing-bg': "url('/images/landing-bg.png')",
      }
    },
  },
  plugins: [],
}
