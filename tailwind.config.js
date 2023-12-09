/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        primary: {
          blue: "#2F80ED",
          "gray-1": "#4F4F4F",
          "gray-2": "#828282",
          "gray-3": "#E0E0E0",
        },
        indicator: {
          orange: "#F8B76B",
          violet: "#8785FF",
          red: "#EB5757",
          yellow: "#F2C94C",
        },
        chat: {
          "orange-1": "#FCEED3",
          "orange-2": "#E5A443",
          "violet-1": "#EEDCFF",
          "violet-2": "#9B51E0",
          "green-1": "#D2F2EA",
          "green-2": "#43B78D",
        },
        sticker: {
          blue: "#E9F3FF",
          "orange-1": "#FDCFA4",
          "orange-2": "#F9E9C3",
          "green-1": "#AFEBDB",
          "green-2": "#CBF1C2",
          violet: "#CFCEF9",
          pink: "#F9E0FD",
          darkblue: "#9DD0ED",
        },
        gray: {
          1: "#333333",
          2: "#4F4F4F",
          3: "#828282",
          4: "#BDBDBD",
          5: "#E0E0E0",
          6: "#F2F2F2",
          7: "#F8F8F8",
        },
        violet: {
          1: "#8785FF",
        },
        blue: {
          1: "#2F80ED",
          2: "#F9F9F9",
          3: "#E5F1FF",
        },
      },
      transitionDuration: {},
    },
  },
  plugins: [],
};
