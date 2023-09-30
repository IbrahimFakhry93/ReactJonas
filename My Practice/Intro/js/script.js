
//* UI Components in React are just as functions which return JSX (like html and describe what in the screen)
//* naming convention for UI component starts with capital letter.

//* Whenever we need something to be changed in the UI, we change the (state)
//* useState returns array then we destruct this array into two variables
//* One is the state itself and other is the state function that updates the state.

//* Whenever the state is updated, the user interface is updated.
//* to add javascript into jsx we use curly braces {}

//* useEffect we use it to render something at the beginning of the App
//? useEffect has two parameters:
//* 1) a function that we want to get executed at the beginning. So when this component first gets loaded.
//* 2) Empty array which is called the dependency array.


//* pass parameter to component by passing an object is called props



//& Title: Why Front End Frameworks Exist
//? Note: Front end frameworks like React exist to solve problems with using Vanilla JavaScript to build large scale applications.
//* Before around 2010, all websites were rendered on the server (server-side rendering).
//* The resulting HTML, CSS, and JavaScript code was sent to the client-side (web browser) to be displayed.
//* JavaScript was initially used to add simple dynamics to the page (e.g. animations, hover effects).
//* Over time, developers started writing more JavaScript code for the browser, leading to fully-fledged web applications (single-page applications).
//* Single-page applications are rendered on the client-side, not on the server.
//* The application consumes data from an API and renders a screen for each view of the application.
//* Single-page applications feel like using a native desktop or phone application (e.g. clicking links or submitting forms without reloading the page).
//* Server-side rendering is making a comeback with frameworks built on top of modern client-side rendering frameworks (e.g. Next.js, Remix).


//? Note: Building a front-end application is about handling data and displaying it in a user interface.
//* The most important task is to keep the user interface in sync with the data (i.e. make sure the UI displays the current state of the data).
//* Displaying the correct data and keeping it correct over time is a hard problem to solve.


//* In a complex interface like Airbnb, there are many pieces of data (e.g. list of apartments, search bar, filters, map).
//* All this data needs to be kept in sync with the user interface and other pieces of data (e.g. changing location or dates updates the list of apartments and the map).
//* Each piece of data is called a piece of state.
//* Without a framework, it would be virtually impossible to keep a large amount of data in sync with a complex UI.

//? Note: There are two big problems with using Vanilla JavaScript to build large scale applications.
//! Building a complex front end with Vanilla JavaScript alone requires:
//* large amounts of direct DOM traversing and manipulation(e.g.manual element selection, class toggling, DOM traversing, manipulation of text and CSS styles).
//* This can result in complex, hard-to-understand code (i.e. spaghetti code).

//* In typical Vanilla JavaScript apps, state is often stored in the DOM (i.e. HTML elements) rather than in a central place in the application.
//* This can result in many parts of the app accessing and changing the DOM state directly, making the code harder to understand and introducing bugs.


//* Trying to solve these problems on your own would result in creating your own framework, which would likely be worse than established frameworks like React.

//* Keeping a user interface in sync with data is hard and a lot of work.
//* Frameworks like Angular, React, or Vue take this hard work away from developers by synchronizing data with the user interface.
//* Different frameworks have different approaches, but they all keep the UI and data in sync over time.
//* Frameworks enforce a correct way of structuring and writing code, reducing spaghetti code.
//* Frameworks give developers and teams a consistent way of building web applications, resulting in a more consistent codebase and product.



//& Title: Comparing React and Vanilla JavaScript
//? Note: React keeps the user interface in sync with state, while Vanilla JavaScript requires manual synchronization.
//* The advice app built with React is compared to a Vanilla JavaScript implementation of the same app.
//* The Vanilla JavaScript implementation is in an HTML file, with all the HTML and JavaScript in one file.
//* In React, everything is done in JavaScript, including the JSX (i.e. HTML is written inside of JavaScript).
//* In Vanilla JavaScript, HTML is still in charge (i.e. the HTML file includes the JavaScript).
//* In Vanilla JavaScript, DOM elements must be manually selected (e.g. using classes), while in React this is not necessary.
//* In Vanilla JavaScript, an event listener must be attached manually to the button, while in React this is done using the on-click attribute.
//* In Vanilla JavaScript, updating state values does not automatically update the user interface, while in React it does.




//& Title: Introduction to React
//? Note: React is a JavaScript library for building user interfaces
//* It is an extremely popular, declarative, component-based, state-driven library
//* Created by Facebook

//& Title: Component-based design
//? Note: React is all about components such as buttons, input fields, search bars, etc.
//* Components are the building blocks of user interfaces in React
//* Complex UIs are built by combining multiple components like LEGO pieces

//& Title: Reusing components
//? Note: Components can be reused to create similar UI elements
//* For example, a listing component can be reused multiple times in a results panel

//& Title: JSX syntax
//? Note: JSX is a special declarative syntax used to describe what each component looks like and how it works
//* It combines parts of HTML, CSS, and JavaScript and allows referencing other React components
//* Declarative means that we tell React what a component and ultimately the entire UI should look like based on the current state

//& Title: State and re-rendering
//? Note: The main goal of React is to keep the UI in sync with data (state)
//* Based on the initial state, React will render a user interface using the components written using JSX
//* When the state changes (e.g. more data is loaded from an API), we manually update the state in our app
//* React will then automatically re-render the user interface to reflect the latest state

//& Title: Framework or library?
//? Note: There has been debate over whether React is a framework or just a library
//* The short answer is that React is actually just a library (the so-called view layer)



//& Title: React as a view layer
//? Note: React itself is really only the so-called view layer
//* To build a complete real world application, multiple external libraries need to be added to the project
//* Frameworks have been built on top of React to include all the functionalities that React is missing out of the box
//* The most popular ones are called Next.js and Remix

//& Title: Popularity of React
//? Note: React is extremely popular and the most used framework according to weekly download numbers from npm
//* Many large companies have adopted React, and more and more smaller companies are following in their footsteps
//* This has created a huge worldwide job market with high demand for qualified React developers

//& Title: React developer community
//? Note: There is a very large and active React developer community
//* There are always lots of tutorials, Stack Overflow questions and answers, and support given to other React developers
//* A gigantic third-party library ecosystem has grown around React

//& Title: Creation of React
//? Note: React was created in 2011 by Jordan Walke, an engineer working at Facebook at the time
//* It was first used on the newsfeed and chat app, then spread out to the entire Facebook and Instagram applications
//* In 2013, it was open-sourced for everyone to use

//& Title: Summary of what React does
//? Note: To summarize, React is really good at two things:
//* Rendering components on a webpage as a user interface based on their current state
//* Keeping the user interface in sync with state by re-rendering when the state of one of the components changes


//* To check your node version
//* node -v

//* To create react app
//* npx create-react-app@5 pizza-menu
//* create-react-app: automatically set up the project as Github repo 

//* to start react project:
//* npm run start or just npm start

//& Title: Understanding the Role of index.js in a React Project
//? Note: The index.js file is typically located in the src folder and serves as the entry point for the application.
//~ Example:
//* Inside the src folder of a React project, create a file called index.js
//* This file serves as the entry point for the application
//* Webpack, which is a module bundler commonly used in React projects, expects the entry point to be a file named index.js by default



//& Title: Understanding React.StrictMode
//? Note: React.StrictMode is a tool for highlighting potential problems in an application during development.
//* Example:
<React.StrictMode>
  <App />
</React.StrictMode>

//* React.StrictMode renders components twice during development to find certain bugs, such as unexpected side effects.
//* It also checks if the application is using outdated parts of the React API and warns about their usage.


//? set diff decoration to none by vs code settings

//* to enter javascript mode in react jsx use {}


//& Props:

//* Data passed from parent component to child component