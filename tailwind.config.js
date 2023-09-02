/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.jsx",
    "./public/*.jsx",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": { min: "2100px" },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        movingLine: {
          "0%, 100%": { opacity: "0", width: "0" },
          "33.3%, 66%": { opacity: "0.8", width: "100%" },
          "85%": { width: "0", left: "initial", right: "0", opacity: "1" },
        },
        moveLetters: {
          "0%": { opacity: "0", transform: "translateX(-5vw)" },
          "33.3%, 66%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(5vw)" },
        },
      },
      animation: {
        movingLine: "movingLine 2.4s infinite ease-in-out",
        moveLetters: "moveLetters 2.4s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
