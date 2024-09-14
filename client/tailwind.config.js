/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#363062",
        secondary: "#4D4C7D",
        accent: "#F99417",
        base: "#F5F5F5",
      },
      fontFamily: {
        interThin: ["Inter_100Thin"],
        interLight: ["Inter_300Light"],
        interRegular: ["Inter_400Regular"],
        interMedium: ["Inter_500Medium"],
        interSemi: ["Inter_600SemiBold"],
        interBold: ["Inter_700Bold"],
        interBlack: ["Inter_900Black"],
        // bold: ["Inter_900Black"],
      },
    },
  },
  plugins: [],
};
