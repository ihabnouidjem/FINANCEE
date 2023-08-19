/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black50: "rgb(0 0 0 / 50%)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        archivo: ["Archivo", "sans-serif"],
        nunito_sans: ["Nunito Sans", "sans-serif"],
      },
      gridTemplateColumns: {
        "1fr": "1fr",
        repCards: "repeat(auto-fill, minmax(300px,1fr))",
        repPrflCards: "repeat(auto-fill, minmax(332px,1fr))",
        repAuto: "repeat(auto-fill, 1fr)",
      },
      gridColumn: {
        "1/2": "1/2",
      },
      gridTemplateRows: {
        "1fr": "1fr",
      },
      gridRow: {
        "1/2": "1/2",
      },
      animation: {
        h_Campaigns: "campaigns 5s linear infinite",
        pop: "pop 150ms linear",
        loading: "loading 250ms linear infinite",
      },
      keyframes: {
        campaigns: {
          "0%": {
            left: "0",
          },
          "40%": {
            left: "0",
          },
          "50%": {
            left: "calc(-16px - 100%)",
          },
          "90%": {
            left: "calc(-16px - 100%)",
          },
          "100%": {
            left: "calc(-32px - 200%)",
          },
        },
        pop: {
          "0%": {
            "margin-top": "128px",
          },
          "100%": {
            "margin-top": "0",
          },
        },
        loading: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
