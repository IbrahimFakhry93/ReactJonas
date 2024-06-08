//! 328. Setting Up the Project: "The Wild Oasis"

//^ open:  .eslintrc.json
```
{
    "extends": "react-app"
}
```;
//& Title: ESLint Configuration for React Applications

//* Start creating the .eslintrc.json file.
//* This file is where we instruct ESLint about our preferences.

//? Extending ESLint with React Application Rules
//* We want to extend ESLint with the React application rules.
//* These rules are being installed currently.

//? React-Specific ESLint Rules
//* The React-specific ESLint rules will be informed by this extension.
//* For example, rules about the useEffect dependency array will be included.

//^ then open vite.config.js
//! add import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), eslint()],   //! add eslint() inside the plugins array
// });

//^ delete all files from src except main.jsx and App.jsx

//^ open App.jsx and delete all then type rfc to create App comp showing hello world for example
function App() {
  return <div>Hello World</div>;
}

export default App;

//^ then type npm run dev

//? Pages Folder
//& Title: Project Structure and Conventions

//* We have our Pages folder.
//* This wasn't present in the previous project, but it's going to be helpful for this larger project.

//? Subtitle: Purpose of Pages Folder
//* The Pages folder will contain all the pages.
//* Essentially, we will have one component file per route here.

//? Subtitle: Convention for Pages
//* An important convention we set is that each of these pages will not have any side effects.
//* Instead, they will delegate all their functionality to the components associated with the feature.

//? Subtitle: Creating and Using Pages
//* We just need to create these pages once and then completely forget about them.
//* More details will be provided once we start writing the code.

//? UI Folder

//& Title: UI Folder Structure

//* We have the UI folder.
//* This folder is for all the components that do not belong to one of the features.
//* These components might be reused in many different features.

//* The UI folder is for generic things like inputs, forms, buttons, tables, and so on.

//*==================================================================================================================================================

//! 329. Introduction to Styled Components

//& Title: Styling the Application

//* We are going to style the application using a library called Styled Components.
//? Styled Components allow us to write CSS right inside our JavaScript component files.

//~ Working of Styled Components

//* We take a regular HTML element and using the styled function, we create a new React component with some CSS styles applied to it.
//* We can then use and reuse that new component instead of the regular HTML element.

//~ Advantages of Styled Components

//* The CSS we write is only scoped to the exact component, eliminating problems of global CSS such as name collisions between class names.
//* This prevents issues like another developer changing the class without some other developer knowing about it, which could create problems.

//~ Applying Styles

//* This CSS will only be available for this exact component which we can then use all over the place in our application.
//* In order for this CSS to have this styling, where it looks like actual CSS, we need a special VS code extension.
//* Let's install the Styled Components extension.

//^ npm i styled-components

//^ open: App.jsx

//~ Styled Components and Props

//* Styled components can receive all the same props that regular HTML or JSX elements can receive.
//* For example, we can use the onClick prop to attach an event handler.

//~  Event Handling with Styled Components

//* If we click on a styled component, it triggers the event handler.
//* We don't need to do any additional work, like manually accepting the onClick prop and passing it to the HTML element.

//? Example: <Button onClick={() => alert("check in")}>Check In</Button>

//~ Upcoming Lecture

//* We will build on this foundation and learn how to include global styles using styled components.
//* This includes things like CSS resets that need to apply to the entire page.

//*===========================================================================================

//! 330. Global Styles With Styled Components
