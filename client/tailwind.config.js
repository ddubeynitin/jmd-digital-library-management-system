/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
        surface: '#ffffff',
        'surface-dark': '#f8f9fa',
        'on-surface': '#1a1a1a',
        'on-surface-variant': '#666666',
      },
      fontFamily: {
        bebas: ["Bebas Neue", "sans-serif"],
        barlow: ["Barlow", "sans-serif"],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
