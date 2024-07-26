import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
				"purple-hover-color": "#BEADFF",
				purple: "#633CFF",
				white: "#FFF"
			},
			boxShadow: {
				custom: "0px 0px 32px 0px rgba(99, 60, 255, 0.25)"
      },
      screens: {
        'custom-medium': {'min': '640px', 'max': '768px'}
      },


    },
  },
  plugins: [],
};
export default config;
