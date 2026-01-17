import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
      screens: {
        xs: "24rem",
        md: "54rem",
      },
      containers: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
