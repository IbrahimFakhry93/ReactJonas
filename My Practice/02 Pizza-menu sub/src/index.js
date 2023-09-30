import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

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
    <header className='header'>
      <h1 >Fast React Pizza Co.</h1>
    </header>  
    )
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
  const numOfPizzas = pizzas.length;
  // const numOfPizzas = 0;
  return (
     
  <main className='menu'>
   <h2>Our menu</h2>
      {numOfPizzas > 1 ? (
      
      <React.Fragment>
      <p>Here is our Menu</p>
      <ul className='pizzas'>
        {pizzaData.map(pizza => <Pizza pizzaObj={pizza} key={pizza.name} />)}  
      </ul>
      </React.Fragment>
      ) : (<p>Our Menu is not ready yet</p>)
   }
  </main>
  )
}



// function Pizza(props) {
//   console.log(props);
//   return (
//     <div className='pizza'>
//       <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
//       <div>
//         <h3>{props.pizzaObj.name}</h3>
//         <p>{props.pizzaObj.ingredients}</p>
//         <span>{props.pizzaObj.price+ 3}</span>
//       </div>
//     </div>
//   );
// }


//* Applying destructing props
function Pizza({pizzaObj}) {
 
  return (
    <li className={`pizza ${pizzaObj.soldOut ? 'sold-out' : ''}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ?   'Sold Out':pizzaObj.price+ 3}</span>
      </div>
    </li>
  );
}



function Footer() {
  // const currHour = new Date().getHours();
  const currHour = 14;
  const openHour = 12;
  const closeHour = 22;
  const isOpen = currHour >= openHour && currHour < closeHour;
  return (
    <footer className='footer'>
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>We are open from {openHour} till {closeHour}</p>
      )}
    </footer>
  );
}

//* Applying destructing props

function Order({closeHour,openHour}) {

  return( <div className='order'>
  <p>We're open NOW at {openHour} until {closeHour}, come visit us</p>
  <button className='btn'>Order</button>
  </div>)
  
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
        <App />
  </React.StrictMode>

)

//  React before 18:
//  React.render(<App/>,document.getElementById('root'));




