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
      colors: {
        white: "#fff", 
        black: "#000",
        transparent: "#ffffff00",
        richblack: {
          5: "#F1F2FF",
          25: "#DBDDEA",
          50: "#E3E5ED",
          100: "#D0D3E0",
          200: "#A9ADBD",
          300: "#83889A",
          400: "#666C7E", 
          500: "#4A5061",
          600: "#2C333F",
          700: "#1F2937", 
          800: "#1A202C", 
          900: "#000814"
        },
        yellow: {
          50: "#FEF9C3",
          100: "#FEF5AA",
          200: "#FEF08A",
          300: "#FDE86A", 
          400: "#FDE047",
          500: "#FFD60A", // This maps to the active-icon color in your CSS
          600: "#FACC15",
          700: "#EAB308", 
          800: "#CA8A04",
          900: "#A16207"
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712'
        }
      }
    }
  },
  // Remove the preset if the file doesn't exist
  // presets: [require('./tailwind.preset.cjs')],
  plugins: [],
};
