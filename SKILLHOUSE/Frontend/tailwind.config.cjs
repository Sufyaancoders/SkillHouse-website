/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "edu-sa": ["Edu SA Beginner", "cursive"],
        mono: ["Roboto Mono", "monospace"],
      },
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px"
      },
    },
    // Instead of overriding all colors, extend them
    extend: {
      colors: {
        white: "#fff",  // Make sure white is included
        black: "#000",
        transparent: "#ffffff00",
        // Your other colors...
        richblack: {
          5: "#F1F2FF",
          // Other values...
        },
        // Other color definitions...
        slate: {
          50: '#f8fafc',
          // Other values...
        },
        gray: {
          50: '#f9fafb',
          // Other values...
        },
      }
    }
  },
  // Use the preset properly
  presets: [require('./tailwind.preset.cjs')],
  plugins: [],
};
