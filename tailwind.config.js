/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('./preset-tailwind.config.ts')],
  content: ['./src/**/*.{html,ts}'],
  theme: { extend: {} },
  plugins: [],
};
