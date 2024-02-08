//& Title: Writing Components as Functions in React
//? Note: There are two important rules to follow when writing components as functions in React.

//* Rule 1: The function name must start with an uppercase letter.
function MyComponent() {
  // ...
}

//* Rule 2: The function must (return) some markup, usually in the form of JSX.
function MyComponent2() {
  return <div>My Component</div>;
}

//! Note: It is also possible to return nothing by returning `null`.
function MyComponent3() {
  return null;
}

//* Rule 3: Always declare function components in the top level
//! Never nest function declarations not function calls

//* nest function components, means to call a function component in another function component (this is true and allowable)

//? Example:

function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <Pizzas /> //* call Pizza component inside App component (possible)
    </div>
  );
}

function Pizzas() {
  return <h2>Pizza</h2>;
}

//*========================================================================================================================

//& Lec 2.Building our first react App
//* First App (Advice App)

import { useEffect, useState } from "react";

//* UI Components in React are just as functions which return JSX (like html and describe what in the screen)
//* React component is mainly a function which return JSX (html + JavaScript)

//~ note
//* To enter Javascript mode inside JSX (to add JS (like function or state variable) to JSX), use curly braces {}

//? state and useState
//* Whenever we need something to be changed in JSX, we create a state variable for that changeable thing.
//* So whenever state is updated, the jsx will also updated.

//* Whenever we need something to be changed in the UI, we change the (state)
//* useState returns array then we destruct this array into two variables
//* One is the state itself and other is the state function that updates the state.
//* Whenever the state is updated, the user interface is updated.

//? useEffect:  to call some logic function as (getAdvice) in the first initial rendering when dep array is empty
//! useEffect takes two arguments:
//* 1) A function that we want to get executed at the beginning. So when this component first gets loaded.
//* 2) Empty array which is called the dependency array.

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
  }

  useEffect(function () {
    getAdvice();
  }, []);

  return (
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>Get advice</button>
      <Message count={count} />
    </div>
  );
}

//* props are as parameters to a function
//* pass parameter to component by passing an object is called props
function Message(props) {
  return (
    <p>
      You have read <strong>{props.count}</strong> pieces of advice
    </p>
  );
}

//*========================================================================================================================

//& Lec 9. Why Front End Frameworks Exist
//? Note: Front end frameworks like React exist to solve problems with using Vanilla JavaScript to build large scale applications.
//* Before around 2010, all websites (webpages) were rendered on the server (server-side rendering).
//* The resulting HTML, CSS, and JavaScript code was sent to the client-side (web browser) to be displayed.
//* JavaScript was initially used to add simple dynamics to the page (e.g. animations, hover effects).
//* Over time, developers started writing more JavaScript code for the browser, leading to fully-fledged web applications (single-page applications).
//* Single-page applications are rendered on the client-side, not on the server.  (became web application instead of web pages in server rendering )
//* The application consumes data from an API and renders a screen for each view of the application.
//* Single-page applications feel like using a native desktop or phone application
//* (e.g. clicking links or submitting forms without reloading the page).
//* Server-side rendering is making a comeback with frameworks built on top of modern client-side rendering frameworks
//* (e.g. Next.js, Remix).

//? Note: Building a front-end application is about handling data and displaying it in a user interface.
//* The most important task is to keep the user interface in sync with the data
//* (i.e. make sure the UI displays the current state of the data).
//* Displaying the correct data and keeping it correct over time is a hard problem to solve.

//* In a complex interface like Airbnb, there are many pieces of data (e.g. list of apartments, search bar, filters, map).
//* All this data needs to be kept in sync with the user interface and other pieces of data
//* (e.g. changing location or dates updates the list of apartments and the map).
//* Each piece of data is called a piece of state.
//* Without a framework, it would be virtually impossible to keep a large amount of data in sync with a complex UI.

//? Note: There are two big problems with using Vanilla JavaScript to build large scale applications.
//! Building a complex front end with Vanilla JavaScript alone requires:
//* large amounts of direct DOM traversing and manipulation
//* (e.g.manual element selection, class toggling, DOM traversing, manipulation of text and CSS styles).
//* This can result in complex, hard-to-understand code (i.e. spaghetti code).

//* In typical Vanilla JavaScript apps, state is often stored in the DOM (i.e. HTML elements) rather than in a central place in the application.
//* This can result in many parts of the app accessing and changing the DOM state directly, making the code harder to understand and introducing bugs.

//* Trying to solve these problems on your own would result in creating your own framework, which would likely be worse than established frameworks like React.

//* Keeping a user interface in sync with data is hard and a lot of work.
//* Frameworks like Angular, React, or Vue take this hard work away from developers by synchronizing data with the user interface.
//* Different frameworks have different approaches, but they all keep the UI and data in sync over time.
//* Frameworks enforce a correct way of structuring and writing code, reducing spaghetti code.
//* Frameworks give developers and teams a consistent way of:
//* building web applications, resulting in a more consistent codebase and product.

//*========================================================================================================================

//& Lec 10. Comparing React and Vanilla JavaScript
//? Note: React keeps the user interface in sync with state, while Vanilla JavaScript requires manual synchronization.
//* The advice app built with React is compared to a Vanilla JavaScript implementation of the same app.
//* The Vanilla JavaScript implementation is in an HTML file, with all the HTML and JavaScript in one file.
//* In React, everything is done in JavaScript, including the JSX (i.e. HTML is written inside of JavaScript).
//* In Vanilla JavaScript, HTML is still in charge (i.e. the HTML file includes the JavaScript).
//* In Vanilla JavaScript, DOM elements must be manually selected (e.g. using classes), while in React this is not necessary.
//* In Vanilla JavaScript, an event listener must be attached manually to the button, while in React this is done using the on-click attribute.
//* In Vanilla JavaScript, updating state values does not automatically update the user interface, while in React it does.

//*========================================================================================================================

//& Title: Understanding React and JSX

//? Note
//* JSX is a special declarative syntax used in React.
//* It allows us to define what a component and the entire UI should look like based on the current state.

//? Note
//* React provides a high level of abstraction from the DOM.
//* We don't need to work with the DOM directly as in vanilla JavaScript.
//* We instruct React on our desired outcomes when data changes, without specifying how to achieve it.

//? Note
//* JSX combines elements of HTML, CSS, JavaScript.
//* It allows referencing other React components.

//? Note
//* React excels at keeping the user interface in sync with the state.
//* It re-renders or reacts when the state of a component changes.

//? Note
//* React uses various techniques such as a virtual DOM, a Fiber tree, one-way data flow, and others.
//*========================================================================================================================

//& Title: Introduction to React
//? Note: React is a JavaScript library for building user interfaces
//* It is an extremely popular, declarative, component-based, state-driven library
//* Created by Facebook

//*========================================================================================================================

//& Title: Component-based design
//? Note: React is all about components such as buttons, input fields, search bars, etc.
//* Components are the building blocks of user interfaces in React
//* Complex UIs are built by combining multiple components like LEGO pieces

//*========================================================================================================================

//& Title: Reusing components
//? Note: Components can be reused to create similar UI elements
//* For example, a listing component can be reused multiple times in a results panel

//*========================================================================================================================

//& Title: JSX syntax
//? Note: JSX is a special declarative syntax used to describe what each component looks like and how it works
//* It combines parts of HTML, CSS, and JavaScript and allows referencing other React components
//* Declarative means that we tell React what a component and ultimately the entire UI should look like based on the current state
//* JSX is just an extension of JavaScript, which means that there is a simple way
//* of converting JSX to JavaScript. This is done by a tool called Babel, which was automatically included
//* in our application by Create-React-App.

//*========================================================================================================================

//& Title: State and re-rendering
//? Note: The main goal of React is to keep the UI in sync with data (state)
//* Based on the initial state, React will render a user interface using the components written using JSX
//* When the state changes (e.g. more data is loaded from an API), we manually update the state in our app
//* React will then automatically re-render the user interface to reflect the latest state

//*========================================================================================================================

//& Title: Framework or library?
//? Note: There has been debate over whether React is a framework or just a library
//* The short answer is that React is actually just a library (the so-called view layer)

//*========================================================================================================================

//& Title: React as a view layer
//? Note: React itself is really only the so-called view layer
//* To build a complete real world application, multiple external libraries need to be added to the project
//* Frameworks have been built on top of React to include all the functionalities that React is missing out of the box
//* The most popular ones are called Next.js and Remix

//*========================================================================================================================

//& Title: Popularity of React
//? Note: React is extremely popular and the most used framework according to weekly download numbers from npm
//* Many large companies have adopted React, and more and more smaller companies are following in their footsteps
//* This has created a huge worldwide job market with high demand for qualified React developers

//*========================================================================================================================

//& Title: React developer community
//? Note: There is a very large and active React developer community
//* There are always lots of tutorials, Stack Overflow questions and answers, and support given to other React developers
//* A gigantic third-party library ecosystem has grown around React

//*========================================================================================================================

//& Title: Creation of React
//? Note: React was created in 2011 by Jordan Walke, an engineer working at Facebook at the time
//* It was first used on the newsfeed and chat app, then spread out to the entire Facebook and Instagram applications
//* In 2013, it was open-sourced for everyone to use

//*========================================================================================================================

//& Title: Summary of what React does

//? Note: To summarize, React is really good at two things:
//* 1) Rendering components on a webpage as a user interface based on their current state
//* 2) Keeping the user interface in sync with state by re-rendering when the state of one of the components changes

//*========================================================================================================================
//! interview
//& Title: Understanding React.StrictMode
//? Note: React.StrictMode is a tool for highlighting potential problems in an application during development.
//* Example:
<React.StrictMode>
  <App />
</React.StrictMode>;

//* React.StrictMode renders components twice during development to
//* 1) find certain bugs, such as unexpected side effects.
//* 2) checks if the application is using outdated parts of the React API and warns about their usage.

//*========================================================================================================================

//? set diff decoration to none by vs code settings

//*========================================================================================================================

//& Title: Start React Project:

//* To check your node version
//* node -v

//? To create react app
//* windows key + R
//* dir: to see the current content directory =>  "g:\React Course Jonas\My Practice\05 Steps" or cd "g:\React Course Jonas\My Practice\05 Steps"
//! npx create-react-app@5 pizza-menu

//? to start react project:
//! npm run start or just npm start

//? To stop and restart a program:
//* ^c: to stop, npm start

//* sometimes you need to install node modules in a pre created react app
//* by: npm install or npm i

//*======================================================================================================================================

//& in Debugging:
//* 1) make sure the react app is running, and if not apply this:
//* ^c: to stop, npm start

//* 2) hard refresh by refresh the browser
//* because this automatic reload, so the hot module replacement actually breaks all the time for some reason.

//* if prettier stops working, go to terminal then output then select prettier. and same for ESLint

//*======================================================================================================================================

//& Title: Managing Assets with Webpack
//? Note: In a typical Webpack setup, all the assets of the app are placed in the `public` folder.

//* Assets such as images, fonts, and stylesheets are placed in the `public` folder.
//* so Webpack, so the module bundler will then basically automatically get them from there.
//* web pack that will take care of the styles out of the CSS file and injecting them into our application.

//*========================================================================================================================
//! interview
//& Title: Understanding the Role of index.js in a React Project
//? Note: The index.js file is typically located in the src folder and serves as the entry point for the application.
//~ Example:
//* Inside the src folder of a React project, create a file called index.js
//* This file serves as the entry point for the application
//* Webpack, which is a module bundler commonly used in React projects, expects the entry point to be a file named index.js by default

//*========================================================================================================================

//& Title: props:
//* pass data to a component from outside we use props

//*========================================================================================================================
//& Title: Understanding React Hooks and Props

//? Note
//* Data is passed from parent component to child component in React.

//? Note
//* When passing a prop value as a number to another component, we enter JS mode as:  <Pizza price={10} />

//? Note
//* Functions that start with 'use', such as useEffect or useReducer, and useState, are React hooks.

//? Note
//* We will learn in detail what a React hook is later.
//*For now, it's important to know that we can only call hooks like useState at the top level of the function.

//? Note
//* Hooks like useState are not allowed to be called inside an if statement, another function, or inside a loop.

//*========================================================================================================================
//& Title: Understanding React's useState Hook

//~ When you use the useState hook in React, it returns a pair: the current state value and a function to update it.

//? 1. React schedules an update:
//* When you call the setter function from useState,
//* React schedules an update to re-render your component.

//? 2. React prepares to update the state:
//* Before it starts re-rendering, React prepares to update the state.
//* If you passed a callback function to the setter function,
//* React calls this function with the current state value as an argument.

//? 3. Callback function computes the new state:
//* The callback function should compute the new state value based on the current state and return it.
//* This is useful when the new state depends on the previous state, like when you're incrementing a counter.

//? 4. React updates the state:
//* React takes the value returned by the callback function and sets it as the new state.

//? 5. React re-renders the component:
//* Now that the state has been updated,
//* React proceeds to re-render your component (and potentially its child components) with the new state.

//~ Note:
//* This mechanism allows for efficient updates and predictable behavior,
//* as the state update and the subsequent re-render are managed by React in a consistent and optimized manner.
//! interview:
//* It also allows for state updates to be asynchronous, as React may batch multiple updates together for performance reasons.

//*========================================================================================================================

//& Title: State:

//* We need state to make the component interactive (change a UI to an action)
//* keeps the interface in sync with data.
//* state triggers the react to re-render the component. (re-render the component's view)

//* state variable === piece of state.

//* state (general term) is the condition of the component.

//*========================================================================================================================

//& Title: Understanding State in React Components

//? Note
//* Each box in the UI can open and close individually, which means each box holds its own state.
//* When a box is clicked, the UI changes. This indicates that we need a piece of state to track this change.

//? Note
//* Each box operates independently from the others. Opening one box does not affect the others.
//* This independence means that each box must hold its own state.

//? Note
//* Defining a state variable in each box allows each box to be open or closed independently of the others.
//* This is a fundamental concept in React - components can have their own state,
//* which allows them to operate independently and render based on their own state changes.

//*===========================================================================================================================
(function () {
  //& Title: React State Persistence

  //import React, { useState } from 'react';

  //? Note
  //* The 'useState' hook in React allows you to add React state to function components.
  //* State is a built-in object that stores property values that belong to a component.
  //* When the state object changes, the component re-renders.

  function Counter() {
    //* Here we declare a new state variable called 'count'
    //* 'useState' is called with the initial state argument and returns a pair of values: the current state and a function that updates it
    const [count, setCount] = useState(0);

    return (
      <div>
        <p>You clicked {count} times</p> //* The 'count' state variable is used
        here
        <button onClick={() => setCount(count + 1)}>
          Click me //* On button click, the 'setCount' function updates the
          'count' state variable
        </button>
      </div>
    );
  }

  // export default Counter;

  //? Note
  //* In this example, 'count' is a state variable, and 'setCount' is the corresponding setter function (which we call to update the state).
  //* We initialize 'count' to zero using 'useState(0)'.
  //* When you click the button, it calls the 'setCount' function, which updates the state variable 'count'.
  //* This causes the component to re-render, and the updated 'count' value is displayed on the screen.
  //* Even though local variables do not persist across renders, the 'count' state variable does.
  //* This is because React "remembers" its current value between re-renders, and provides the most recent one to our function.
  //* If we didn't use a state variable, the counter would not preserve its value and would reset to its initial value every time the component re-renders.
  //* This is a fundamental aspect of how state works in React: it allows us to preserve values across component renders.
  //* It's also what makes React components interactive: every time the state changes, the component re-renders, reflecting the most recent changes.
})();
//*========================================================================================================================

//& Title: State Management in React:

//* we can use the useState function to create multiple pieces of state in order to track data
//* that changes over the life cycle of an application.

//*======================================================================================================================================

//& remove color lines of gitub:
//* settings => diff decorations => none
//*======================================================================================================================================

//& Styling React component:

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

//! interview
//* Using map:
pizzaData.map((pizza) => <Pizza pizzaObj={pizza} />);

//* Using forEach:
pizzaData.forEach((pizza) => <Pizza pizzaObj={pizza} />); //! This will not work

//? Notes: The reason why using forEach will not work is because forEach returns undefined and undefined is falsy value.
//* React doesn't render true or false or boolean values
//* React renders truthy values

//* In order to render a list, we need to create a new array containing the JSX elements.
//* The map method creates a new array populated with the results of calling a provided function on every element in the calling array.

//*=====================================================================================

//& ReactFragment:
//* React Fragment basically lets us group some elements without leaving any trace in the HTML tree, so in the DOM.

//! short version: <></>
//* or long version: <React.Fragment key={pizza.name}></React.Fragment>
//! we need the long version to apply the key

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

//*=====================================================================================
//& Title: Conditional Rendering in React

//* early return by if statement outside JSX, can be useful to render entire component conditionally
//* not just a piece of JSX

function WelcomeMessage({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <h1>Please sign in.</h1>;
  }
  return <h1>Welcome back!</h1>;
}

//*=====================================================================================

//& Clean Ternary operator:

//? not clean code: rendering two span elements

{
  pizzaObj.soldOut ? <span>SOLD OUT</span> : <span>{pizzaObj.price}</span>;
}

//? Clean code: rendering content of one single span element
<span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>;

//*========================================================================================================================

//& Title: Using children prop in React for reusability

import React from "react";

//? Note
//* The 'children' prop in React allows components to be reused by passing elements
//* directly into components, which are then rendered through the component.

//? Here we define a reusable 'Button' component

//! this reusable component button is made up of open and close tag <button></button>
const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick}>
      {children} //* The 'children' prop is used here
    </button>
  );
};

//? Note
//* Below is an example of how to use the 'Button' component

const App = () => {
  const handleClick1 = () => {
    alert("Open button clicked!");
  };

  const handleClick2 = () => {
    alert("Close button clicked!");
  };

  return (
    <div>
      <Button onClick={handleClick1}>
        Open 📂 //* This is passed as 'children' to the first 'Button' component
      </Button>
      <Button onClick={handleClick2}>
        Close 🔒//* This is passed as 'children' to the second 'Button'
        component
      </Button>
    </div>
  );
};

// export default App;

//*========================================================================================================================

//& Form Submit

function Form() {
  function handleEvent(e) {
    e.preventDefault();
  }

  //*     <form className='add-form' onSubmit={handleEvent}>
  //! or:
  //*     <form className='add-form' onSubmit={e=>handleEvent(e)}>

  return (
    <form className="add-form" onSubmit={handleEvent}>
      <h3> What are you going to pack for you travel? ✈</h3>
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="item" />
      <button>add</button>
    </form>
  );

  //* Or apply Form submit by button onClick
  //   <form className='add-form' >
  //   <h3> What are you going to pack for you travel? ✈</h3>
  //   <select>
  //     {Array.from({ length: 20 }, (_, i) => i + 1).map(num => <option value={num} key={num}>{num}</option>)}
  //   </select>
  //   <input type='text' placeholder='item' />
  //   <button onClick={handleEvent}>add</button>  //! But the form won't be submitted by enter key
  // </form>
}

//*=====================================================================================================================================

//! "What do we call an input element that is completely synchronised with state?",
//*  "Controlled element"

//&  Title: Controlled Elements in React.js

//? Note:
//* By default, input fields like 'input' and 'select' maintain their own state inside the DOM.
//* This makes it hard to read their values and leaves the state in the DOM, which is not ideal.

//* In React, we prefer to keep all state in one central place, not inside the DOM.
//* To achieve this, we use a technique called 'Controlled Elements'.
//* With this technique, React controls and owns the state of these input fields, not the DOM.

//* To keep this data inside the application, we need some state because form data changes over time.
//* We also want to keep our application in sync with it.

//? Here are the steps to create a controlled element:

//~ Step 1: Create a piece of state
//* const [description, setDescription] = useState('');

//~ Step 2: Use that state as a value of the input field
//* <input type="text" value={description} />

//~ Step 3: Update that state variable when the input field changes
//* <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

//? Now, React is in charge of the state and the entire element, hence the term 'Controlled Element'.

//! note: e.target.value is always string

//! if you need to convert to a number use Number() as in here:
//* onChange={(e) => onSetBill(Number(e.target.value))}

//*=====================================================================================================================================

//! important interview Question
//& What is the difference between states and props:
//* check the slide
//* props read only means it can't be modified by the receiving child component

//* change in state, rerender the UI of the parent component (owning state)
//! and also rerender the receiving child component that received the state as a prop

//*=====================================================================================================================================

//& Title: Controlled Element

//* A controlled element is an element whose value is controlled by React state.
//* This means that the value of the element is always synchronized with the state.

//? Characteristics of a Controlled Element:
//* 1. The element's value is defined by some state as this:
//! const [stateValue, setStateValue] = useState('');
//! <input type="text" value={stateValue} />
//* 2. The element has an event handler that listens for changes.
//* 3. The event handler updates the state accordingly when the element's value changes.
//! <input type="text" value={stateValue} onChange={(e) => setStateValue(e.target.value)} />

//~ Example:
//* const [value, setValue] = useState('');
//* <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />

//*=====================================================================================================================================

//& Title: Prop Drilling

//* prop drilling means pass some prop through several nested child components
//* in order to get that data into some deeply nested component,

//! solution:
//? prop composition

//*=====================================================================================================================================
//* When we build a reusable component,  we should carefully think about what props the component needs.
//*=====================================================================================================================================
//* When working on components, it's important to remember that every component is created by someone and consumed by someone else.
//* The creator is the one who builds the component and defines what props it can accept.
//* The consumer, on the other hand, uses the component in the application by specifying values for the props.

//* As a component creator, the props we allow consumers to pass in define the public interface of our component.
//* By choosing these props, we decide how much of the component's complexity we expose to the API consumer.
//* Essentially, a component is an abstraction where we encapsulate a part of the UI and its associated logic.
//* Consumers interact with this encapsulated UI and logic through the props of the component.

//*=====================================================================================================================================
//* You may have heard that we should never initialize state from props.
//* This is generally true if you want the state to stay in sync with the props, i.e.,
//* if the state value should update when the prop value updates.
//* However, in this case, we're using 'defaultRating' as seed data for the initial state,
//* and we don't care if this prop value changes elsewhere in the application.
//* Therefore, initializing state from props in this context is perfectly acceptable and normal.

//*=====================================================================================================================================

//& Components vs instances vs elements
//! Interview Question, what is the difference among them?

//*=====================================================================================================================================
//& Title: Understanding React's Security Measures
//? React's Use of Symbols for Security
//* React uses a special property `$$typeof` in every React element
//* `$$typeof` is a JavaScript symbol, which is a unique and non-duplicable primitive value
//* This symbol is a security feature implemented by React to protect against cross-site scripting attacks

//? Symbols and JSON
//* Symbols cannot be transmitted via JSON
//* This means a symbol cannot come from an API call
//* If a hacker tries to send a fake React element from an API, React will not recognize it as a valid React element because the `$$typeof` property will not be a symbol

//? Example of a React Element
```jsx
const element = {
  $$typeof: Symbol.for('react.element'),
  type: 'div',
  props: { children: 'Hello, world!' }
};  ```;

//*=====================================================================================================================================

//& Title: Understanding Reconciliation in React
//? The Role of the Reconciler
//* Reconciliation is processed by a reconciler
//* The reconciler is the engine of React, like the heart of React

//? The Purpose of the Reconciler
//* The reconciler allows us to never touch the DOM directly
//* Instead, we simply tell React what the next snapshot of the UI should look like based on state

//? The Current Reconciler in React
//* The current reconciler in React is called Fiber

//*=====================================================================================================================================

//& Title: Understanding Fibers in React
//? Fibers and Re-rendering
//* Fibers are not recreated on every render
//* The Fiber tree is never destroyed, but is a mutable data structure
//* Once created during the initial render, it's mutated over and over again in future reconciliation steps

//? Role of Fibers
//* Fibers are the perfect place for keeping track of various component details
//* This includes the current component state, props, side effects, list of used hooks and more

//*=====================================================================================================================================

//& Title: Understanding the Commit Phase in React
//? Commit Phase vs Rendering Phase
//* The commit phase is synchronous, unlike the rendering phase, which can be paused
//* Committing cannot be interrupted, ensuring that the DOM never shows partial results
//* This ensures that the UI always stays consistent

//? Purpose of Dividing the Process
//* The entire process is divided into the render phase and the commit phase
//* This allows rendering to be paused, resumed, and discarded
//* The results of all that rendering can then be flushed to the DOM in one go

//? Post-Commit Phase
//* Once the commit phase is completed, the work in progress fiber tree becomes the current tree for the next render cycle
//* Fiber trees are never discarded and never recreated from scratch
//* Instead, they are reused to save precious rendering time

//? Closing the Commit Phase
//* After the commit phase, the browser will notice that the DOM has been changed
//* As a result, it will repaint the screen

//*=====================================================================================================================================

//& Title: Understanding Key Usage in React
//? React's Efficiency
//* React performs updates efficiently by batching them and applying them whenever it has some idle time

//? Resetting State
//* If you need to reset state, ensure that you give the element a key
//* Make sure that the key changes across renders, this will trigger a state reset

//*=====================================================================================================================================

//& Title: Understanding Side Effects in React
//? Focus on useEffect Hook
//* We learn all about side effects
//* The focus is on the useEffect Hook

//? Execution of Effects
//* We explore how and when effects are executed

//? Cleaning Up Effects
//* We learn how we can clean effects up

//? Loading External Data
//* We delve into loading external data into our applications

//*=========================================================================

//! we should never update state in render logic instead updated inside event handlers or useEffects
//*=========================================================================

//& Custom Hook:
//* So there are basically two strategies to decide if we want to create a new custom hook.
//* So the first one is that we want to reuse some part of our non-visual logic,
//* so just as we learned in the previous lecture. And the second factor might be
//* that we simply want to extract a huge part of our component out into some custom hook.
//* so in this lecture, I will show you how we can extract all the stateful logic
//* that belongs together into a nice and well-packaged custom hook.
