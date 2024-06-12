//! 328. Setting Up the Project: "The Wild Oasis"

import styled, { css } from "styled-components";

//& Title: ESLint Configuration for React Applications

//* Start creating the .eslintrc.json file.
//* This file is where we instruct ESLint about our preferences.

//? Extending ESLint with React Application Rules
//* We want to extend ESLint with the React application rules.
//* These rules are being installed currently.

//? React-Specific ESLint Rules
//* The React-specific ESLint rules will be informed by this extension.
//* For example, rules about the useEffect dependency array will be included.

//^ open:  .eslintrc.json
```
{
    "extends": "react-app"
}
```;

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

//? Purpose of Pages Folder
//* The Pages folder will contain all the pages.
//* Essentially, we will have one component file per route here.

//? Convention for Pages
//* An important convention we set is that each of these pages will not have any side effects.
//* Instead, they will delegate all their functionality to the components associated with the feature.

//? Creating and Using Pages
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

//^ open: App v-1.jsx

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

//*===========================================================================================================================================================

//! 330. Global Styles With Styled Components

//^ create GlobalStyles.js inside styles folder
//^ open index.css  App v-1.jsx

//* after we created these global styles,

// but now, in order to actually apply them,

// let's come back to our app component here,

// and then include them right here.

// And the way that this works is

// that the GlobalStyles component

// that we just exported needs to be added

// to the component tree,

// but it cannot accept any children.

// So, basically, we want this to be

// a sibling of this styled app.

//^ open: index.html to copy and paste the font links in the head

//?==============================================================================================
// next up, I want to turn our attention

// to all of these CSS variables in GlobalStyles.js like --color-brand-50: #eef2ff; that we have right here.

// So basically, the idea of these is to have

// all the different design tokens in one central place,

// so that we can then use them in all,

// or different, styled-components that we're gonna build.

//?====================================

// Now, instead of using all of these CSS variables

// that we have right here,

// the styled-components library actually also gives us

// its own way of providing variables like these

// to our entire application,

// by using a mechanism that it calls themes.

// So basically, with styled-components, themes,

// we can also inject design tokens like these

// into our application.

// However, this mechanism was designed

// before CSS variables were really popular,

// and really usable, in modern CSS.

// And so I think that it's actually a lot better

// to just stick to native CSS,

// instead of relying to this JavaScript way,

// which the themes are off injecting

// these variables into our code.

// But of course, if you want to learn more about themes,

// you can as always go to

// the styled-component documentation.

//?===============================================

// Move the styles of button, h1 and input to their files in Ui Folder

// we now want to actually export

// these components (H1, Button, Input) in App into their own files in UI Folder

// So we really want to reuse

// these components that we just wrote here

// throughout the entire application.

//*===========================================================================================================================================================

//! 331. Styled Component Props and the "css" Function

// In this lecture, we'll build a reusable heading component by learning

// about some more advanced-styled component topics such as accepting props and the CSS function.

// So let's say that we wanted to make a more reusable

// heading component similar to this one,

// but instead of the component just working for the H1 element

// we also want it to work as an H2 and an H3 element.

//^ Create Heading.jsx  and move H1 from App to there

// const H1 = styled.h1`
//   font-size: 30px;
//   font-weight: 600;
//   background-color: yellow;
// `;

//* remember `` in H1 after h1 is template literals so we can write JavaScript inside it
//* and pass some props to this Heading component and use them to conditionally set some styles

const test = css`
  text-align: center;
`;

//* css keyword here to get the syntax highlighting

// eslint-disable-next-line no-unused-vars
const Heading = styled.h1`
  font-size: 30px;
  font-size: ${(props) => (props.large ? "30px" : "5px")};
  font-weight: 600;
  background-color: yellow;
  ${test}
`;

//? as prop:

// a special prop to our components

// to tell them as which HTML element they should be rendered,

// and that special prop is called the (as) prop.

// eslint-disable-next-line no-unused-vars
// const Heading2 = styled.h1`
//   ${(props) =>
//     props.as === "h1" &&
//     css`
//       font-size: 3rem;
//       font-weight: 600;
//     `}
//   ${(props) =>
//     props.as === "h2" &&
//     css`
//       font-size: 2rem;
//       font-weight: 600;
//     `}
//   ${(props) =>
//     props.as === "h3" &&
//     css`
//       font-size: 2rem;
//       font-weight: 500;
//     `}

//   line-height:1.4
// `;

//? Steps to use props in styled components

//* use ${} inside template literals to enter Javascript to write JS inside ${}
//* pass props as a parameter to arrow function
//* set condition and use && operator to render css string
//* use css keyword to get styling highlight

//*======================================================================================================================================================

//! 332. Building More Reusable Styled Components

//^ Create Row.jsx in ui folder

//? to apply default props"

/* 
Row.defaultProps = {
  type: "vertical",
}; 
*/

//*======================================================================================================================================================

//! 333. Setting Up Pages and Routes

//^ install react router: npm i react-router-dom@6

//^ to uninstall: npm uninstall react-router-dom

//* You can verify the installation by checking the version in your package.json file or
//* by running npm list react-router-dom in your terminal. It should display the version as 6.x.x.

//* Rename the old App to App v-1
//* Create new App.

// it's time to set up our routes.

// And in this application

// we will not use the data loading features

// of React Router that we used in the previous project.

// And so therefore, we can go back to setting up all routes

// in the way that we did it in the world wise application.

// So basically in a declarative way.

//? Declarative Navigate to set default route wen open the App

// we use the navigate component provided

// by React Router, then replace so that the URL

// gets replaced in the history stack.

// And then here, just the route again.

// So this is a little bit cleaner, and the result is the same

{
  /* Route with index: means the component we want to see when we open the App */
}
{
  /* <Route index element={<Dashboard />} /> */
}
{
  /* or more cleaner use the declarative redirect */
}
//*   <Route index element={<Navigate replace to="dashboard" /> }/>

//*======================================================================================================================================================

//! 334. Building the App Layout

//^ Create AppLayout.jsx - open: App.jsx

//? Using App layout in Route definition:

// remember that the way we setup a layout route

// is by placing all the routes that should be rendered

// inside the layout as child routes of the layout route.

{
  /* this:  <Route element={<AppLayout />}></Route>  it is called Layout route because it doesn't have the path probe  */
}

//^ Create: Header.jsx, Sidebar.jsx

// let's place this outlet

// inside like, a main component.

// And so, the reason for that is that then,

// we can have all these pages, basically with the same style.

// Because later we will style this element here,

// and then, whatever content is gonna come here

// from the pages, so which is going to be this,

// will simply be placed all inside the main.
{
  /* 
  
<main>
<Outlet />
</main> 

*/
}

//^ open: Account.jsx

//* you will find fragment <></>
// we are returning this fragment,
// because we then want all of these elements here
// to be placed directly into the main element. without adding unnecessary div <div></div>

//? next lecture:

// some links so that we can actually jump

// between the different pages.

// And so usually, those kinds of links are what appear

// here in an application sidebar.

// And so, in the next lecture, let's build our main navigation

// right here in the sidebar.

//*======================================================================================================================================================

//! 335. Building the Sidebar and Main Navigation

//^ open Sidebar.jsx - MainNav.jsx - Logo.jsx

//* We use NavLink instead of <a></a> or <Link></Link>
//* to avoid page reloading or any page transition which it is not required
//* in single page application.
//! don't forget to use replace href attribute by to attribute

// const StyledNavLink = styled.a`
//   &:link,
//   &:visited {
//     display: flex;
//     align-items: center;
//     gap: 1.2rem;

//     color: var(--color-grey-600);
//     font-size: 1.6rem;
//     font-weight: 500;
//     padding: 1.2rem 2.4rem;
//     transition: all 0.3s;
//   }

// But now the problem is how do we actually

// style these NavLink components?

// Because they are coming from a third party library

// but we still want to style them somehow.

//* instead of a element we pass NavLink component to style it
// const StyledNavLink = styled(NavLink)`
//   &:link,
//   &:visited {
//     display: flex;
//     align-items: center;
//     gap: 1.2rem;

//     color: var(--color-grey-600);
//     font-size: 1.6rem;
//     font-weight: 500;
//     padding: 1.2rem 2.4rem;
//     transition: all 0.3s;
//   }

/*


function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />  
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/bookings">
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

 */

//? Add icons to nav Links

//* npm i react-icons

//* google react icons, got their github repo
//* use Heroicons2 set from Tailwind and their components are above such as <HiOutlineHome/>

//*====================================================================================

//! 343. Connecting Supabase With Our React App

//*  npm install --save @supabase/supabase-js

//^ create supabase.js in services folder

// So supabase.js is basically a supabase client

// where we will initialize the supabase API

// and create a client so that we can then start querying our database.

//^ create apiCabins.js in services folder

//& Title: Understanding Supabase.js and Database Querying

//? Note:
//* - A "client" refers to a software application that communicates with a server.
//* - "Querying our database" means sending requests to the database to retrieve, insert, update, or delete data. These requests are known as queries.

//! Initialize the Supabase API:
//* - This is where you set up your connection to the Supabase service by providing your unique Supabase URL and public anon key.
//* - This allows your application to communicate with the Supabase server.
//! Create a client:
//* - Once the API is initialized, you create a client.
//* - This client is an object that contains methods for interacting with your database.
//* - For example, it could have methods for creating a new user, fetching data, updating data, etc.
//! Start querying our database:
//* - Now that you have a client, you can start sending queries to your database.
//* - For example, you might send a query to fetch all users, or to insert a new record.

//*====================================================================================

//! 344. Setting Up Storage Buckets

//* upload cabins images from data folder in src folder to the bucket in supabase
// in one of the lectures a bit later,

// we will also learn how to programmatically upload images

// to one of our buckets
