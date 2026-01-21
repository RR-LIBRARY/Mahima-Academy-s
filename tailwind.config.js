export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#FF9933', // Primary: Energy
          light: '#FFB366',
          dark: '#CC7A29',
        },
        navy: {
          DEFAULT: '#000080', // Secondary: Depth
          light: '#1A1A99',
          deep: '#000066',
        },
        paper: '#FAFAFA', // Background: Calm
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['"Merriweather"', 'serif'], // For reading content
      },
    },
  },
  plugins: [],
}