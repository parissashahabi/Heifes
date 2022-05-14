module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./page-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // colors: {
    //   'light-purple': "#A989AE",
    //   'purple': "#99769C",
    //   'dark-purple': "#673D6D",
    //   'peach': "#EE5D6C",
    //   'light-peach': "#F28077",
    //   'red': "#FF0F27",
    //   'light-gray': "#7E7E7E",
    //   'gray': "#707070",
    //   'dark-gray': "#5F5F5F",
    //   'oil': "#374151",
    //   'orange': "#F5AE52",
    //   'light-orange': "#FF9800",
    //   'dark-orange': "#FE863C",
    // },
    extend: {
      backgroundImage: {
        'landing-bg': "url('/images/landing-bg.png')",
        'logo': "url('/images/logo.png')",
      }
    },
  },
  plugins: [],
}
