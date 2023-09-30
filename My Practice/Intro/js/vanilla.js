
//& Title: Comparing React and Vanilla JavaScript
//? Note: React keeps the user interface in sync with state, while Vanilla JavaScript requires manual synchronization.
//* The advice app built with React is compared to a Vanilla JavaScript implementation of the same app.
//* The Vanilla JavaScript implementation is in an HTML file, with all the HTML and JavaScript in one file.
//* In React, everything is done in JavaScript, including the JSX (i.e. HTML is written inside of JavaScript).
//* In Vanilla JavaScript, HTML is still in charge (i.e. the HTML file includes the JavaScript).
//* In Vanilla JavaScript, DOM elements must be manually selected (e.g. using classes), while in React this is not necessary.
//* In Vanilla JavaScript, an event listener must be attached manually to the button, while in React this is done using the on-click attribute.
//* In Vanilla JavaScript, updating state values does not automatically update the user interface, while in React it does.


// Manually selecting DOM elements (which require a class or ID in markup)
const adviceEl = document.querySelector(".advice");
const btnEl = document.querySelector(".btn");
const countEl = document.querySelector(".count");

const getAdvice = async function () {
  const res = await fetch("https://api.adviceslip.com/advice");
  const data = await res.json();

  // Updating values
  advice = data.slip.advice;
  count = count + 1;

  // Manually updating DOM elements
  countEl.textContent = count;
  adviceEl.textContent = advice;
};

// Setting initial values
let count = 0;
let advice;
getAdvice();

// Attaching an event listener
btnEl.addEventListener("click", getAdvice);

