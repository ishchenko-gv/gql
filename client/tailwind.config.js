/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      lineHeight: {
        reset: "0",
      },
    },
  },
  // eslint-disable-next-line
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
