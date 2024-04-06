//! 282. Setting Up a New Project: "Fast React Pizza Co."

//* npm create vite@4
//? or:
//* npm create vite@latest
//* project name: react-fast-pizza
//* npm i

//* npm i eslint vite-plugin-eslint eslint-config-react-app --save-dev

//* create: .eslintrc.json
// {
//     "extends": "react-app"
// }

//* then open vite.config.js
//! add import eslint from "@vitejs/plugin-eslint";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), eslint()],   //! add eslint() inside the plugins array
// });

//* npm run dev
//*======================================================================================================================
//! 283. Application Planning (slides)

//*======================================================================================================================
//! 284. Setting Up a Professional File Structure

//* ui for reusable ui components: such as buttons, inputs, and so on.
//* services for reusable code for API interaction
//* utilities for helper functions: stateless helper functions that don't create any side effects,
