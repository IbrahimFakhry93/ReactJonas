//& Title: Understanding the Role of index.js in a React Project
//? Note: The index.js file is typically located in the src folder and serves as the entry point for the application.
//* Example:
//* Inside the src folder of a React project, create a file called index.js
//* This file serves as the entry point for the application
//* Webpack, which is a module bundler commonly used in React projects, expects the entry point to be a file named index.js by default

//*======================================================================================================================================

//& Title: Understanding React.StrictMode
//? Note: React.StrictMode is a tool for highlighting potential problems in an application during development.
//* Example:
{
  /* <React.StrictMode>
  <App />
</React.StrictMode> */
}

//* React.StrictMode renders components twice during development to find certain bugs, such as unexpected side effects.
//* It also checks if the application is using outdated parts of the React API and warns about their usage.

//*======================================================================================================================================

//& To stop and restart a program:
//* ^c: to stop, npm start

//*======================================================================================================================================

//& Title: Writing Components as Functions in React
//? Note: There are two important rules to follow when writing components as functions in React.

//* Rule 1: The function name must start with an uppercase letter.
function MyComponent() {
  // ...
}

//* Rule 2: The function must return some markup, usually in the form of JSX.
function MyComponent2() {
  return <div>My Component</div>;
}

//! Note: It is also possible to return nothing by returning `null`.
function MyComponent3() {
  return null;
}

//* Rule 3: Always declare function components in the top level
//! Never nest function declarations

//*======================================================================================================================================

//& Title: Managing Assets with Webpack
//? Note: In a typical Webpack setup, all the assets of the app are placed in the `public` folder.

//* Assets such as images, fonts, and stylesheets are placed in the `public` folder.
//* web pack that will take care of the styles out of the CSS file and injecting them into our application.
//*======================================================================================================================================

//* to enter javascript mode in react use {}

//! note inline style is stronger than class style
const style = { color: "red", fontSize: "16px", textTransform: "upperCase" };

//? note all css properties are written in JSX as camel case

function Header() {
  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

//*======================================================================================================================================
//& Title: Rendering List
//? Note: When rendering a list in React, we need to return JSX.
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
];

function Menu() {
  return (
    <main className="menu">
      <h2>Our menu</h2>
      <ul className="pizzas">
        {pizzaData.map((pizza) => (
          <Pizza pizzaObj={pizza} />
        ))}
      </ul>
    </main>
  );
}

function Pizza(props) {
  console.log(props);
  return (
    <div className="pizza">
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>{props.pizzaObj.price + 3}</span>
      </div>
    </div>
  );
}

//* Using map:
pizzaData.map((pizza) => <Pizza pizzaObj={pizza} />);

//* Using forEach:
pizzaData.forEach((pizza) => <Pizza pizzaObj={pizza} />); // This will not work

//? Notes: The reason why using forEach will not work is because forEach returns undefined.
//? Notes: In order to render a list, we need to create a new array containing the JSX elements.
//? Notes: The map method creates a new array populated with the results of calling a provided function on every element in the calling array.

//* React doesn't render true or false or boolean values
//* React renders truthy values

//*=====================================================================================

//* React Fragment basically lets us group some elements without leaving any trace in the HTML tree, so in the DOM.

//* <></>   or <React.Fragment></React.Fragment>

//*=====================================================================================
function PizzaCondition(props) {
  console.log(props);
  return (
    //! Note:
    //* When using template literals `` so it is Javascript
    //* So to use javascript inside JSX we have to enter JS mode first by using {}
    //* so wrap the `` inside {} as down
    <div className={`pizza ${props.pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>{props.pizzaObj.price + 3}</span>
      </div>
    </div>
  );
}

//* hello

//*----------------------------------

//*==================
