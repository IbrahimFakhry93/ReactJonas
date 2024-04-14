/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

// to basically tell Tailwind

// where or index HTML file is located

// and also where all or JavaScript files are located.

// So by default they are inside this source folder

// but if for some reason we changed all of this right here

// then we would also have to change this config.

// But by default, this is how it works.
