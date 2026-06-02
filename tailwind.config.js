/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bebas Neue'", "cursive"],
        heading: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        dark: {
          50: "#f8f8f8",
          100: "#e8e8e8",
          200: "#c0c0c0",
          300: "#8a8a8a",
          400: "#555555",
          500: "#333333",
          600: "#222222",
          700: "#1a1a1a",
          800: "#111111",
          900: "#0a0a0a",
          950: "#050505",
        },
        accent: {
          DEFAULT: "#C8A96E",
          light: "#E8C98E",
          dark: "#A8893E",
        },
        neon: {
          gold: "#FFD700",
          amber: "#FFA500",
          cyan: "#00D4FF",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh":
          "radial-gradient(at 40% 20%, hsla(40,80%,50%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(35,60%,40%,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(45,70%,55%,0.1) 0px, transparent 50%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marqueeReverse 30s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(200, 169, 110, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(200, 169, 110, 0.7)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
