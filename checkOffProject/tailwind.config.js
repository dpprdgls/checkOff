/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './client/index.html', 
    './client/src/**/*.{js,jsx,ts,tsx}' // Correctly includes all JS/JSX/TS/TSX files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        'nav-gray': '#4B5563',        // Custom gray color for the navbar
        'nav-hover-gray': '#374151',  // Hover color for the navbar
      },
      borderRadius: {
        nav: '8px',                   // Reusable border-radius class for navigation
      },
    },
  },
  plugins: [],
};