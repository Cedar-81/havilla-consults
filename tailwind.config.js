/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#091F44',
        'brand-light': '#02D8F0',
        'white': '#FFFFFF',
        'gray-dark': '#C5C5C5',
        'gray-light': '#F7F7F7',
        'black': '#2B2B2B',
      },
    }
  },
  plugins: []
};

