import { useEffect, useState } from "react";


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

function Message(props) {
  return (
    <p>
      You have read <strong>{props.count}</strong> pieces of advice
    </p>
  );
}


//& Title: Comparing React and Vanilla JavaScript
//? Note: React keeps the user interface in sync with state, while Vanilla JavaScript requires manual synchronization.
//* The advice app built with React is compared to a Vanilla JavaScript implementation of the same app.
//* The Vanilla JavaScript implementation is in an HTML file, with all the HTML and JavaScript in one file.
//* In React, everything is done in JavaScript, including the JSX (i.e. HTML is written inside of JavaScript).
//* In Vanilla JavaScript, HTML is still in charge (i.e. the HTML file includes the JavaScript).
//* In Vanilla JavaScript, DOM elements must be manually selected (e.g. using classes), while in React this is not necessary.
//* In Vanilla JavaScript, an event listener must be attached manually to the button, while in React this is done using the on-click attribute.
//* In Vanilla JavaScript, updating state values does not automatically update the user interface, while in React it does.


//* To check your node version
//* node -v

//? To create react app
//* windows key + R
//* dir "g:\React Course Jonas\My Practice\05 Steps" or cd "g:\React Course Jonas\My Practice\05 Steps"
//* npx create-react-app@5 pizza-menu

//* to start react project:
//* npm run start or just npm start



//& Title: Understanding the Role of index.js in a React Project
//? Note: The index.js file is typically located in the src folder and serves as the entry point for the application.
//* Example:
// Inside the src folder of a React project, create a file called index.js
// This file serves as the entry point for the application
// Webpack, which is a module bundler commonly used in React projects, expects the entry point to be a file named index.js by default

//Title: props:
//* pass data to a component from outside we use props

//& Title: State:

//* We need state to make the component interactive (change a UI to an action)
//* keeps the interface in sync with data.
//* state triggers the react to re-render the component. (re-render the component's view)

//* state variable === piece of state.

//* state (general term) is the condition of the component.


//&Title: State Management in React:

// we can use the useState function

// to create multiple pieces of state in order to track data

// that changes over the life cycle of an application.


