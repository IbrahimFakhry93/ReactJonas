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
//! add import eslint from "vite-plugin-eslint";

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

//*======================================================================================================================

//! 285. A New Way Of Implementing Routes

//* React version 6.4 introduced a whole new way of defining routes and of working with React Router.
// So from now on we can use some powerful mechanisms

// inside React Router for fetching data

// into pages and for submitting data using forms,

// so all within React Router.

//* npm i react-router-dom@6

// import { createBrowserRouter } from "react-router-dom";

// this is a function now where we define all routes,

// and we do that by passing in an array of objects

// where each object is one route.
// createBrowserRouter();

//*======================================================================================================================

//! 286.  Building the App Layout
//? open: App, AppLayout, Header, CartOverview

//* We're implementing a global application layout using React Router.
//* The layout will work for both large and small screens.

//? Layout Structure
//* The layout will have a header with the company name, a link to the homepage, and possibly the username.
//* The main part of the page will be for the content itself (like the pizza menu or the current cart view).
//* There will be a cart overview at the bottom that is always visible on all pages.
//* It will display the number of items in the cart and a link to the cart.

//? Rendering Nested Routes
//* We render the content of a nested route inside another route using the outlet component.

//& Recap
//* We created an app layout component to use as the parent route of every other route in our application.
//* All other routes are now child routes of the app layout (nested routes).
//* Inside the parent route, we use the outlet component to render the current nested route.
//*======================================================================================================================

//! 287. Fetching Data With React Router "Loaders": Pizza Menu

//? open: App.jsx , Menu.jsx, apiRestaurant.js

//& Title: Implementing a Loader
//* The idea behind a loader is to create a function that fetches data from an API.
//* This loader function is provided to a route, which fetches the data as soon as the application navigates to that route.
//* Once the data has arrived, it is provided to the page component using a custom hook.

//? Fetching Menu Data
//* We start by fetching the menu data in three steps: create a loader, provide the loader, and provide the data to the page.
//* The data loader can be placed anywhere in our code base,
//* but the convention is to place the loader for the data of a certain page inside the file of that page.

//? Render as You Fetch Strategy
//* We implemented a 'render as you fetch' strategy.
//* React Router starts fetching the data at the same time as it starts rendering the correct route.
//* This is different from a 'fetch on render' approach where we render the component first and then start to fetch the data,
//* which can create data loading waterfalls.

//& Recap
//* React Router is responsible not only for matching components to URLs in the browser, but also for providing the necessary data for each page.
//* This is useful because URLs, pages, and the data that pages require are often tightly coupled together.
//* It is practical to get both the page and the data all in one place, nicely integrated within React Router.
//*======================================================================================================================

//! 288. Displaying a Loading Indicator
//? AppLayout.jsx  - loader.jsx - index.css

//*======================================================================================================================
//! 289. Handling Errors With Error Elements
//? open: Error.jsx, App.jsx, apiRestaurant.js

//& Error Handling
//* Specify the error element in the parent route.
//* Errors in nested routes bubble up to the parent route.
