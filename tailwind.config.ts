import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        neon: "0 0 35px rgba(69,255,142,.18)",
      },
    },
  },
  plugins: [],
} satisfies Config;
