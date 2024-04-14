//& 295. Setting Up Tailwind CSS

//* npm install -D tailwindcss postcss autoprefixer
//* npm install -D tailwindcss@3  postcss autoprefixer
//* npx tailwindcss init -p  : create the Tailwind  and the post CSS config files.

//? open: tailwind.config.js
// to basically tell Tailwind

// where or index HTML file is located

// and also where all or JavaScript files are located.

// So by default they are inside this source folder

// but if for some reason we changed all of this right here

// then we would also have to change this config.

// But by default, this is how it works.

//? open index.css

//* copy and paste this:

// @tailwind base;
// @tailwind components;
// @tailwind utilities;

//? open Home.jsx

//* install tailwind css intellisense vs code extension
//^ google: tailwind prettier extension => go to github link
//* npm install -D prettier prettier-plugin-tailwindcss

// this will do is to automatically sort the order

// of the class names in the way that Tailwind recommends it.

// And this is gonna be pretty helpful for you

// because then you will always find the same class names

// in the same position of this long string here.

//? create
//* prettier.config.cjs

// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

// /** @type {import("prettier").Config} */
// const config = {
//     plugins: ['prettier-plugin-tailwindcss'],
//     trailingComma: 'es5',
//     tabWidth: 4,
//     semi: false,
//     singleQuote: true,
// }

// module.exports = config

//* npx prettier --write .

//! This command tells Prettier to process all the files in your project and reformat them .

//^ Check for conflicts with other extensions:
//* If you’re using VS Code, there might be conflicts with other extensions.
//* Try disabling other formatting extensions to see if that resolves the issue.

//^ Reinstall the plugin:
//* There might be issues with the plugin installation. Try uninstalling and reinstalling the prettier-plugin-tailwindcss plugin.

//*==============================================================================================================================================================
