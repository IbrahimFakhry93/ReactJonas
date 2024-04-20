/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            // pizza: 'Roboto Mono, monospace',
            //? or better overwrite sans font, tp not apply font-pizza class everywhere
            sans: 'Roboto Mono, monospace',
        },
        //? to add new color:
        extend: {
            colors: {
                pizza: '#123456',
            },
            fontSize: {
                huge: ['5rem', { lineHeight: '1' }],
            },
            height: {
                screen: '100dvh',
            },
        },
    },

    plugins: [],
}

// to basically tell Tailwind

// where or index HTML file is located

// and also where all or JavaScript files are located.

// So by default they are inside this source folder

// but if for some reason we changed all of this right here

// then we would also have to change this config.

// But by default, this is how it works.

//* copy google font Roboto monospace to index.html
