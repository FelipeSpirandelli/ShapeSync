import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'azul_escuro': '#264653'
      }
    },

  },
  plugins: [],
} satisfies Config;
