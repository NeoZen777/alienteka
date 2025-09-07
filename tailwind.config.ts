import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Alien Theme Colors
        alien: {
          primary: "#00FF00",      // Verde lima brillante
          secondary: "#003300",    // Verde oscuro
          accent: "#39FF14",       // Verde neón
          cyan: "#00FFFF",         // Cyan
          dark: "#000000",         // Negro profundo
          gray: "#1a1a1a",         // Gris oscuro
          light: "#90EE90",        // Verde claro
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'orbitron': ['var(--font-orbitron)', 'sans-serif'],
        'exo': ['var(--font-exo)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'alien-glow': '0 0 20px #00FF00',
        'alien-glow-sm': '0 0 10px #00FF00',
        'alien-glow-lg': '0 0 30px #00FF00',
        'neon': '0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 15px #39FF14',
      },
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00FF00' },
          '100%': { boxShadow: '0 0 20px #00FF00, 0 0 30px #00FF00' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
