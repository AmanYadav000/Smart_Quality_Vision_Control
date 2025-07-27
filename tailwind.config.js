module.exports = {
  content: [
    "./src/App.js",
    "./src/components/history.js",
    "./src/components/history2.js",
    "./src/components/home.js",
    "./src/components/login.js",
    "./src/components/dashboard.js",
        "./src/components/producthistory.js",
         "./src/components/fruithistory.js",
           "./src/components/nutrition.js",
             "./src/components/nutritiontable.js"

  ],
  theme: {
    extend: {
      animation: {
        scan: 'scan 1.5s infinite linear',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
