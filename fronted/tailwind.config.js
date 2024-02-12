/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        palanquin: ["Palanquin", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        wide: "1440px",
      },
      colors: {
        firstColor: "#01D293",
        secondColor: "#0E1630",
        thirdColor: "#111827",
        fourthColor: "#808DAD",
        "coral-red": "#FF6452",
        "slate-gray": "#333333",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
      },
      boxShadow: {
        "3xl": "0 0 40px rgba(0, 0, 0, 0.8)",
        "custom-shadow": "2px 2px 8px rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
};
