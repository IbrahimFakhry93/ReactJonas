import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//& Pizza-menu Application:

//* This React project appears to be a simple pizza ordering application.
//* Here are the key learning objectives and concepts that this project is likely designed to teach:

//* 1. React Components: The project uses functional components (`Header`, `Menu`, `Pizza`, `Footer`) to structure the application.
//* This teaches how to create and use React components.

//* 2. Props in React: The `Pizza` component receives properties (props) and uses them to display each pizza's information.
//* This demonstrates how to pass and use props in React.

//* 3. JavaScript Array Methods: The `map` method is used to create a list of `Pizza` components.
//* This shows how to use JavaScript array methods in React.

//* 4. Conditional Rendering: The `Menu` component uses a conditional (`numOfPizzas > 1`) to decide whether to render the list of pizzas.
//* This introduces conditional rendering in React.

//* 5. Working with Data: The project uses an array of pizza objects, each with properties like:
//* `name`, `ingredients`, `price`, etc. This teaches how to work with data in React.

//* 6. Dynamic Styling: The `Footer` component uses a condition to dynamically render content based on the current time.
//* This shows how to apply dynamic styling in React

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
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

// function App() {
//   return (
//     <div>

//       <Header />
//       <Menu />
//       <Footer />
//     </div>
//   );
// }

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

// function Menu() {
//   return (

//     <main className='menu'>
//       <h2>Our menu</h2>
//       <Pizza name='Pizza Italia' ingredients='Tomato, mozarella, spinach, and ricotta cheese' price={10} srcImg='pizzas/spinaci.jpg' />
//       <Pizza name='Pizza Mexico' ingredients='Chili, Mohito' price={10} srcImg='pizzas/funghi.jpg'/>
//     </main>
//   )
// }

// function Pizza(props) {
//   console.log(props);
//   return (
//     <div className='pizza'>
//       <img src={props.photoName} alt={props.name} />
//       <div>
//         <h3>{props.name}</h3>
//         <p>{props.ingredients}</p>
//         <span>{props.price+ 3}</span>
//       </div>
//     </div>
//   );
// }

function Menu() {
  const pizzas = pizzaData;
  const numOfPizzas = pizzas.length();
  // const numOfPizzas = 0;
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {numOfPizzas > 1 && (
        <ul className="pizzas">
          {pizzaData.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
        </ul>
      )}
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

function Footer() {
  const currHour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = currHour >= openHour && currHour < closeHour;
  return (
    <footer className="footer">
      {isOpen && (
        <div className="order">
          <p>We 're open. until {closeHour}, come visit us</p>
          <button className="btn">Order</button>
        </div>
      )}
    </footer>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(

//   <React.StrictMode>
//         <App />
//   </React.StrictMode>

// )

//  React before 18:
//  React.render(<App/>,document.getElementById('root'));
