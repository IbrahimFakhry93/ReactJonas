import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

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

function App() {
  return (
    <div>
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

//& Using array length (numOfPizzas) to conditionally render JSX

function Menu() {
  const pizzas = pizzaData;
  const numOfPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {numOfPizzas > 1 ? (
        <React.Fragment>
          <p>Here is our Menu</p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </React.Fragment>
      ) : (
        <p>Our Menu is not ready yet</p>
      )}
    </main>
  );
}

//& Title: Rendering List
//? Note: When rendering a list in React, we need to return JSX.

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

//& Applying destructing props and use boolean value (soldOut) to conditionally style li element
//& and conditionally render content of span element
//& using template literals with JS logic inside it in JSX

//! Note:
//* When using template literals `` so it is Javascript
//* So to use javascript inside JSX we have to enter JS mode first by using {}
//* so wrap the `` inside {} as down
function Pizza({ pizzaObj }) {
  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "Sold Out" : pizzaObj.price + 3}</span>
      </div>
    </li>
  );
}

//& Get the current Hour and use it with && operator to produce a boolean value
//& Use the boolean value isOpen to conditionally render the content of the footer

function Footer() {
  const currHour = new Date().getHours();

  const openHour = 12;
  const closeHour = 22;
  const isOpen = currHour >= openHour && currHour < closeHour;
  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We are open from {openHour} till {closeHour}
        </p>
      )}
    </footer>
  );
}

//* Applying destructing props

function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>
        We're open NOW at {openHour} until {closeHour}, come visit us
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//& ReactFragment:
//* React Fragment basically lets us group some elements without leaving any trace in the HTML tree, so in the DOM.

//! short version: <></>
//* or long version: <React.Fragment key={pizza.name}></React.Fragment>
//! we need the long version to apply the key

//*======================================================================================================================================
