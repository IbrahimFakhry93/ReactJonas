(function () {
  const data = [
    {
      id: 1,
      title: "The Lord of the Rings",
      publicationDate: "1954-07-29",
      author: "J. R. R. Tolkien",
      reviews: {
        goodreads: {
          rating: 4.52,
          ratingsCount: 630994,
          reviewsCount: 13417,
        },
        librarything: {
          rating: 4.53,
          ratingsCount: 47166,
          reviewsCount: 452,
        },
      },
    },
    {
      id: 2,
      title: "The Cyberiad",
      author: "Stanislaw Lem",
      reviews: {
        goodreads: {
          rating: 4.16,
          ratingsCount: 11663,
          reviewsCount: 812,
        },
      },
    },
  ];
  const getBook = (id) => data.find((book) => book.id === id);

  const book = getBook(2);
  book;
  const getReviewsCount = (book) =>
    book.reviews.goodreads.reviewsCount +
    (book.reviews.librarything?.reviewsCount ?? 0); //* use ?? to return 0 instead of undefined
  const totalCounts = getReviewsCount(book);
  totalCounts;

  //! note: The addition operator (+) has higher precedence than the nullish coalescing operator (??), so it is evaluated first.
  //* This means that when you try to add the reviewsCount property of the goodreads object (which is a number) to the result of the optional chaining expression (which is undefined),
  //* you get NaN.

  //? note: undefined + number = NaN
})();

//*===========================================================================================================================

//^===========================  Fundamental Level =========================================================


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

//~=============================================================================

//& Pizza App

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

//& Get the current Hour and use it with && operator to produce a boolean value (isOpen)
//& Use the boolean value (isOpen) to conditionally render the content of the footer

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


//*======================================================================================================================================

//& ReactFragment:
//* React Fragment basically lets us group some elements without leaving any trace in the HTML tree, so in the DOM.

//! short version: <></>
//* or long version: <React.Fragment key={pizza.name}></React.Fragment>
//! we need the long version to apply the key

//*======================================================================================================================================

//& Section 6: State, Events, and Forms: Interactive Components

//& Step App:

//& Looping on array of messages by increment a state (step) , close feature by toggling and inverting operator (!)

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const [step, setStep] = useState(1);

  const [isOpen, setIsOpen] = useState(true);

  function handleBack() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }

  return (
    <>
      <div className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </div>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            {step}:{messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: " #fff" }}    //* first two braces are for injecting JS and second two braces are object braces
              onClick={handleBack}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: " #fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

//*======================================================================================================================================

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


//& Section 6: State, Events, and Forms: Interactive Components

//& Date Counter App:
//& State value (counter) depends on another state (step) / Derived state (date) / Update and style Date

//! use of const date = new Date("june 21 2027");
//!  date.setDate(date.getDate() + count);
//!  {date.toDateString()}

export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  return (
    <div>
      <div>
        <button onClick={() => setStep((s) => s - 1)}>-</button>
        <span>Step: {step}</span>
        <button onClick={() => setStep((s) => s + 1)}>+</button>
      </div>

      <div>
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <span>Count: {count}</span>
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>

      <p>
        <span>
          {count === 0
            ? "Today is "
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>
    </div>
  );
}

//*==============================================================================================================================
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
        Close 🔒//* This is passed as 'children' to the second 'Button' component
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

//! "What do we call an input element that is completely synchronized with state?",
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

//& Section 6: State, Events, and Forms: Interactive Components
//& Travel App:

//& Form process, submit and add an object with default values (packed, id) using spread operator
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 12, packed: true },
];

function handleAddItems(item) {
  //* item here is the resulted object (new item) from the form submission in the Form component
  //! check Form Component
  ` setItems((items) => [...items, item]);```; //* use spread operator to create new array rather than push inside original state, don't mutate state directly

  //* The reason for using a callback function here inside setItems
  //* is to ensure that you always have the most recent state when updating it.
  //* and the new state depends on the current state,

  //* The reason why (item) is defined inside setItems callback, is because of how JavaScript handles function scopes and closures.
  //* When you define a function inside another function (like you’re doing here),
  //* the inner function has access to the variables in the outer function’s scope.
  //* This includes parameters of the outer function, like (item) in this case.
}

function Form({ handleAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleEvent(e) {
    e.preventDefault();

    //? to prevent form to be submitted if the input item field is empty
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    handleAddItems(newItem); //* this method is received by props

    //? reset the form input fields after submit
    setDescription("");
    setQuantity(1);
  }
  //! note: e.target.value is always string
  return (
    <form className="add-form" onSubmit={handleEvent}>
      <h3> What are you going to pack for you travel? ✈</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>add</button>
    </form>
  );
}

//~===========================================================================================

//& Create list of options tags for select tag by Array.from and map method

```<select
value={quantity}
onChange={(e) => setQuantity(Number(e.target.value))}
>
{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
  <option value={num} key={num}>
    {num}
  </option>
))}
</select>```;

//~===========================================================================================

//& Sort Data and render list it / clear the list:

function handleClearList() {
  const confirmed = window.confirm("Are sure you want to delete all items?");
  // if (confirmed) setItems([]);
}

function PackingList({ items, onDeleteItems, onCheckItems, onClearList }) {
  const [sortBy, setSortby] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems?.map((item) => (
          <Item
            item={item}
            onDeleteItems={onDeleteItems}
            onCheckItems={onCheckItems}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortby(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button className="button" onClick={onClearList}>
          Clear List
        </button>
      </div>
    </div>
  );
}

//~===========================================================================================

//& Delete and toggle item and conditional style rendering textDecoration: "line-through"

function handleDeleteItems(id) {
 //   setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    // setItems((items) =>
    //   items.map((item) =>
    //     item.id === id ? { ...item, packed: !item.packed } : item
    //   )
    // );
  }

function Item({ item, onDeleteItems, onCheckItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onCheckItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

//~===========================================================================================

//& Display some statistics

function Stats({ items }) {
  //* apply early return
  if (!items)
    return (
      <p>
        <em>Add items to travel</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  console.log(numPacked);
  const percentagePack = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentagePack === 100
          ? `Everything is done✈️`
          : `You have ${numItems} items on your list and you have already packed ${numPacked} (${percentagePack}%) 💼`}
      </em>
    </footer>
  );
}
//*======================================================================================================================================

//& Section 6: State, Events, and Forms: Interactive Components

//& Flash Cards:
const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
];

export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

function FlashCards() {
  //! If you want the previously selected card to revert back to its question state when a new card is selected,
  //* you would need to lift the state (selectedId) up to the parent component (FlashCards).
  //* This way, the parent component can keep track of which card is selected and control the state of all cards.
  //* When a new card is selected, the parent component can reset the state of the previously selected card.

  const [selectedId, setSelectedId] = useState(null);
  function handleClick(id) {
    //* id !== selectedId ? setSelectedId(id) : setSelectedId(null);

    //? or jonas
    setSelectedId(id !== selectedId ? id : null);
  }
  return (
    <>
      <div className="flashcards">
        {questions.map((question) => (
          <div
            key={question.id}
            className={question.id === selectedId ? "selected" : ""}
            onClick={() => handleClick(question.id)}
          >
            {question.id === selectedId ? (
              <p>{question.answer}</p>
            ) : (
              <p>{question.question}</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

//* Jonas Solution:

//? to avoid the return keyword in map method put ()
//? as here
//~ questions.map(question => (<div>
//~ </div >))

// {questions.map(question =>(
//   <div key={question.id} className={question.id === selectedId ? 'selected' : ''} onClick={() => handleClick(question.id)}>
//   {question.id === selectedId? <p>{question.answer}</p> : <p>{question.question}</p>}
//  </div>)
// )
// }

//! Very important note:

//? My bug of flash cards in App.js (App.js is my work):

//! bug
//! when click on a second flash card after the first selected one,
//! the first flash card keeps its style on answer style (isn't flipped to question again)

//* This bug occurs because each Card component maintains its own state.
//* When you click on a card, you’re changing the state of that specific card,
//* not the state of all cards.

//* The selected state is unique to each card. When you select a new card,
//* the previously selected card retains its state.
//* Since nothing is causing the previous card to re-render (like a click event),
//* it remains in its current state, which is displaying the answer.

//? Jonas solution in App2.js as above solves this bug:

//! If you want the previously selected card to revert back to its question state when a new card is selected,
//* you would need to lift the state up to the parent component (FlashCards).
//* This way, the parent component can keep track of which card is selected and control the state of all cards.
//* When a new card is selected, the parent component can reset the state of the previously selected card
//* BESIDES, the whole component will be rendered so the loop of map method will be executed again.

//*======================================================================================================================================
//& Section 6: State, Events, and Forms: Interactive Components

//& Date Counter App

//& input of type range
```<input
type="range"
min="0"
max="100"
step="1"
value={step}
onChange={handleStep}
/>```;

//& using numeric values comparison rather than direct boolean values to apply conditional rendering
//* use comparison to initial states values (count, step) to render reset button
//*  {(count !== 0 || step !== 1) && <button onClick={reset}>Reset</button>}


//*======================================================================================================================================

//& Section 7: Thinking In React: State Management

//& Accordion App

//? State location
//* We need the three accordion has knowledge among them that one of them is open.
//* so we lift the state which was placed in each of accordion item, so they are independent of each other.
//* we lift this state (isOpen) to the parent accordion component and also replaced by new state (curOpen)

//? Use advantage of children props

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          title={el.title}
          num={i}
          key={i}
        >
          {el.text}
        </AccordionItem>
      ))}
      {/* {application of children props} */}
      <AccordionItem
        curOpen={curOpen}
        onOpen={setCurOpen}
        title="test-1"
        num={3}
      >
        {/* Those p and ul will be passed as children prop */}
        <p>Allows React developers to:</p>
        <ul>
          <li>Break up UI into components</li>
          <li>Make components reusable</li>
          <li>Place state efficiently</li>
        </ul>
      </AccordionItem>
    </div>
  );
}

//* the key can be key={el.title}  (anything unique)

function AccordionItem({ num, title, curOpen, onOpen, children }) {
  //* children for AccordionItems from map method will be el.text
  //* children for AccordionItem out map method will be <p></p> and <ul>including the three <li></li></ul>

  const isOpen = num === curOpen; //* create isOpen boolean type by assigning to sth produces boolean value

  function handleToggle() {
    onOpen(isOpen ? null : num);
  }

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : `${num + 1}`}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}
//*======================================================================================================================================


//& Section 7: Thinking In React: State Management
//& Tip Calculator App

export default function App() {
  const [bill, setBill] = useState(""); //* to show the placeholder 'Bill value'
  const [tipPer1, setTipPer1] = useState(0);
  const [tipPer2, setTipPer2] = useState(0);

  const tip = bill * ((tipPer1 + tipPer2) / 2);

  function handleReset() {
    setBill(""); //* to show the placeholder 'Bill value'
    setTipPer1(0);
    setTipPer2(0);
  }

  return (
    <div className="App">
      <Bill onSetBill={setBill} bill={bill} />
      <Service onSetTipPer={setTipPer1} tipPer={tipPer1}>
        How did you like the service?
      </Service>
      <Service onSetTipPer={setTipPer2} tipPer={tipPer2}>
        How did your friend like the service?
      </Service>
      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset onRest={handleReset} />
        </>
      )}
    </div>
  );
}

function Bill({ bill, onSetBill }) {
  return (
    <>
      <p>How much was the bill?</p>
      <input
        type="text"
        value={bill}
        placeholder="Bill value"
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </>
  );
}

function Service({ children, onSetTipPer, tipPer }) {
  return (
    <>
      <p>{children}</p>
      <select
        type="text"
        value={tipPer}
        onChange={(e) => onSetTipPer(Number(e.target.value))}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={0.05}>It is okay (5%)</option>
        <option value={0.1}>It was good (10%)</option>
        <option value={0.2}>Absolutely amazing! (20%)</option>
      </select>
    </>
  );
}

function Output({ bill, tip }) {
  return (
    <>
      <p>
        You pay ${tip + bill} (${bill} + ${tip} tip)
      </p>
    </>
  );
}

function Reset({ onRest }) {
  return <button onClick={onRest}>Reset</button>;
}


//*======================================================================================================================================


//&  Eat and Split App

import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
];

export default function App() {
  const [friendsList, setFriendsList] = useState(initialFriends);

  const [showAddFriend, setShowAddFriend] = useState(false);

  const [selectedFriend, setSelectedFriend] = useState(null);

  //& Adding a new object to array of objects by spread operator
  function handleAddFriend(friend) {
    //? to achieve immutability for the  state array (friendsList)
    //! instead of using push method which will mutate the original state array
    //* create new array by []
    //* spread all the original array elements by ... inside the new array bracket [...]
    //* add the new element (friend) by this:  [...friendsList, friend]
    setFriendsList((friendsList) => [...friendsList, friend]);
    setShowAddFriend(false);
  }

  //& toggle a display of a piece of UI
  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  //& select a single list member and handle the double click on it
  function handleFriendSelection(friend) {
    //* note the argument passed to the arrow call back function is the current state(automatically passed to state setter function)
    //* the first condition this:  curSelectedFriend?.id === friend.id  to achieve the feature if I click on the same button again the split form closed
    //! before thinking about this condition, setting selected friend was simply like that setSelectedFriend(friend);
    setSelectedFriend((curSelectedFriend) =>
      curSelectedFriend?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  //& Overwriting and updating object property (balance)
  function handleSplitBill(oweValue) {
    //* you don't have to pass object here, because we already selected the object (selectedFriend)
    //* when we clicked on select button in friend component.

    setFriendsList(
      friendsList.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + oweValue }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  //! JSX
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friendsList={friendsList}
          onFriendSelection={handleFriendSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        {/* here the onClick is the name of the prop  */}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

//& Button Component

//* Button component here doesn't have the onclick property, right?
//* Only the native HTML elements, the actual button element <button></button>, does have the onclick property.

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

//& FriendList Component
function FriendsList({ friendsList, onFriendSelection, selectedFriend }) {
  return (
    <ul>
      {friendsList.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onFriendSelection={onFriendSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

//~ Friend Child Component

//& using object property (friend.balance) to activate selection by set class style (selected)
//& produce boolean value for conditional style setting and content setting by
//& comparing values of state or prop (selectedFriend) and the object of the list member
function Friend({ friend, onFriendSelection, selectedFriend }) {
  console.log(selectedFriend);
  //* use optional chaining so when click on the same button again, selectedFriend will be null
  //* so in null you can't read (id property)
  //* friend will be always exist so no need for optional chaining
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt="person" />
      <h3>{friend.name}</h3>

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}€
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      {/* Check button Component Above */}
      <Button onClick={() => onFriendSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

//& FormAddFriend Component:

//& Setting a random value for id for every added object (friend)
function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
    if (!name || !image) return;
    const id = Math.floor(Math.random() * 900000) + 100000;
    //? or to create random (id):
    //* const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };
    console.log(newFriend);
    //* Pass the new created object friend to the function will update the state array (friend list)
    onAddFriend(newFriend);

    //? reset the input fields
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <label>🌄 Img URL</label>
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        type="text"
      />
      <Button>Add</Button>
    </form>
  );
}

//& FormSplitBill Component:

//& Prevent overpayment
function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState(""); //* we use empty strings because they are text input elements
  const [myExpense, setMyExpense] = useState("");
  const friendExpense = bill ? bill - myExpense : ""; //* check first the value of the bill
  const [payer, setPayer] = useState("user"); //* put the default value, the default value of options (user === you), look down the option tag

  //* put the handle submit function inside the same component where the submitted form is located
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !myExpense) return;
    const oweValue = payer === "user" ? friendExpense : -myExpense;
    onSplitBill(oweValue);

    //? or directly:
    //* onSplitBill(payer === "user" ? friendExpense : -myExpense);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>split bill with {selectedFriend.name}</h2>
      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🕴️ Your Expense</label>
      <input
        type="text"
        value={myExpense}
        onChange={(e) =>
          //! Preventing Overpayment:
          //* The Number(e.target.value) > bill ? myExpense : Number(e.target.value) line ensures that a user cannot enter an expense that is greater than the total bill.
          setMyExpense(
            Number(e.target.value) > bill ? myExpense : Number(e.target.value)
          )
        }
      />

      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s Expense</label>
      //! Automatic assigning value to input
      <input type="text" disabled value={friendExpense} />
      <label>🤑 Who is paying the bill</label>
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

 //& Automatic assigning value to input
 //! use disabled attribute
 <input type="text" disabled value={friendExpense} />

//^===========================================================================================================================================================



//^====================================================  Intermediate Level =========================================================


//& usePopCorn App

//& Section 10: Thinking in React: Components, Composition, and Reusability

//& Component Composition to solve prop drilling:

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  return (
    <>
     <Navbar>
      //& Composition
        <Search />
        <SearchResults movies={movies} />     //* we pass movies prop directly to SearchResults comp without prop drilling
      </Navbar>
      <Main>
        <Box>
          <MoviesList movies={movies}></MoviesList>
        </Box>
        <Box>
          <WatchedMoviesSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );

  
}

//! NavBar:

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}


//*====================================================================================================================
//& usePopCorn App:

//& using composition to achieve component 


export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  return (
    <>
      <Main>
        <Box>
          <MoviesList movies={movies}></MoviesList>
        </Box>
        <Box>
          <WatchedMoviesSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}


function Main({ children }) {
  return (
    <main className="main">
      {children}
    </main>
  );
}

//!================================================================
//& Component Similarities:
//* If we take a look at this (moviesBox) component (currently Box),
//* it is very similar to that other box (WatchedMoviesBox).
//* Both of them have this state here of 'isOpen'.
//* They both have a div with the class of 'box'.
//* They both have this button which is also exactly the same.
//* In the end, they both render their children conditionally based on the 'isOpen' state.

// function WatchedMoviesBox() {

//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen((open) => !open)}
//       >
//         {isOpen ? "–" : "+"}
//       </button>
//       {isOpen&& (
//         <>
             //* Here was the logic of MoviesList, WatchedMoviesSummary and WatchedMoviesList
//         </>
//       )}
//     </div>
//   );
// }

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MoviesList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

//!===============================================================


function WatchedMoviesSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}



//& Section 10: Thinking in React: Components, Composition, and Reusability

//& StarRating App

//* The consumer might need to access the 'movieRating' state outside of the 'StarRating' component.
//* For instance, in a 'Test' component that includes the 'StarRating', they might want to display the movieRating in their UI.
//* To do this, they need access to the 'movieRating' state inside the 'StarRating' component, but from within the 'Test' component.
//* They need some state, say 'movieRating', which is initially set to zero.
//* However, 'movieRating' won't change when we rate the movie in the 'StarRating' component.
//* To update 'movieRating' when the state inside 'StarRating' is updated, we allow the consumer to pass in a set function, 'onSetRating'.
//* In the 'handleRating' function, we not only set the internal rating but also set the external rating using 'onSetRating'.
//* This gives the 'Test' component access to the internal state of 'StarRating'.

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating maxRating={7} color={"blue"} onMovieRating={setMovieRating} />
      <p>This movie is rated at {movieRating} ratings </p>
    </div>
  );
}

//const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Test />
    <StarRating
      maxRating={5}
      messages={["terrible", "Bad", "okay", "Good", "Amazing"]}
    />
    <StarRating
      maxRating={7}
      size={24}
      color={"red"}
      className="test"
      defaultRating={3}
    />
  </React.StrictMode>
);

//* This additional configuration is crucial because without it, 'StarRating' would be a presentational component,
//* and its state couldn't be used inside the 'Test' component.
//* This makes 'StarRating' more useful and maintains a good balance of configuration options.


//~==================================================
const containerStyle = {
  margin: "100px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starsContainerStyle = {
  display: "flex",
  gap: "4px",
};

StarRating.prototype = {
  maxRating: PropTypes.number, //* so maxRating should be entered as number, if will be entered as string for ex. so it will trigger error in the console.
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  onMovieRating: PropTypes.func,
  className: PropTypes.string,
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onMovieRating,
}) {
  //* Since we now want the UI to re-render based on an event,
  //* so we want something to happen on the screen, we need state.
  const [rating, setRating] = useState(defaultRating);

  //& Temporary Rating:
  //* The functionality we're implementing allows for a temporary rating to be displayed when hovering over the stars.
  //* This temporary rating, which is the number of stars currently being hovered over, is independent of the actual set rating.
  //* For example, the set rating could be five, but if we hover over three stars, the temporary rating changes to three.
  //* To implement this, we need a new piece of state to store the temporary rating.
  //* This is necessary because we want the component to re-render and display the temporary rating whenever a hover event occurs.

  const [tempRating, setTempRating] = useState(0);
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  //* The 'textStyle' object needs to be defined within the 'StarRating' component.
  //* This is because we're specifying some properties in 'textStyle' that depend on the component's props.
  //* Since props are only accessible inside the component, 'textStyle' must also reside inside the component.

  //! create handling state function
  function handleRating(rating) {
    setRating(rating);
    onMovieRating(rating); //* set the movie Rating that is needed outside Star Component check Test comp above
  }

  return (
    <div style={containerStyle} className={className}>
      <div style={starsContainerStyle}>
        {Array.from(
          { length: maxRating },
          (
            _,
            i //!  because the Array.from is zero indexed
          ) => (
            //* We're creating a handler function in the 'StarRating' component, which owns the state.
            //* This handler function is passed as a prop to the 'Star' component, which wants to update the state.
            //* This allows the 'Star' component to trigger state updates in the 'StarRating' component.
            <Star
              key={i}
              onRating={() => handleRating(i + 1)}
              onHoverIn={() => setTempRating(i + 1)}
              onHoverOut={() => setTempRating(0)}
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1} //* >= to insure all the current star (temp rating) and the stars behind are highlighted by render the full solid star
              //* same concept of steps button in steps App in fundamental section (check it)
              size={size}
              color={color}
            />
          )
        )}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1] //* because the messages array is zero indexed
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

//* there is no hover event, but there is mouse enter and mouse leave and we have to handle both to get the hover effect
function Star({ onRating, onHoverIn, onHoverOut, full, size, color }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };
  return (
    <span
      role="button"
      style={starStyle}
      //* We need to listen for the click event on a JSX element, such as an HTML element like a 'span'.
      //* The event handling always needs to occur on the JSX element itself.
      onClick={onRating}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

//*===========================================================================================================================================================
//& Section 10: Thinking in React: Components, Composition, and Reusability

//& Text Expander App

//! this App is application on: 

//* Using composition to achieve usable components
//* Using props as component API

export default function App() {
  return (
    <div>
      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={true} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  );
}

function TextExpander({
  collapsedNumWords = 10,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  buttonColor = "#1f09cd",
  expanded = false,
  className,
  children,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

  const buttonStyle = {
    background: "none",
    border: "none",
    font: "inherit",
    cursor: "pointer",
    marginLeft: "6px",
    color: buttonColor,
  };

  return (
    <div className={className}>
      <span>{displayText}</span>
      <button onClick={() => setIsExpanded((exp) => !exp)} style={buttonStyle}>
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}
//*===========================================================================================================================================================




//& Calculate Average using reduce method

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
const avgRuntime = average(watched.map((movie) => movie.runtime));

const avgUserRating = average(watched.map((movie) => movie.userRating));
<span>{avgUserRating.toFixed(2)}</span>; //* tofixed(2), 2:define number of numbers after decimal sign (,)

//*===========================================================================================================================

//& Get the unique countries list from a list of cities

 const countries = cities.reduce((arr, city) => {
   if (!arr.map((city) => city.country).includes(city.country))   //* means if arr doesn't include a repeated same country
     return [...arr, { country: city.country, emoji: city.emoji }];
   else return arr;
 });

//*===========================================================================================================================

//& Check if data as an array coming from API is empty

 //* if (!cities.length) return <Message message="click on the map" />;

//*===========================================================================================================================

//& to make the double click on the list cause closing for the movie details

function handleIdSelection(id) {
  setSelectedId((selectedId) => (selectedId === id ? null : id));
}

//*===========================================================================================================================

//& using ID value to close a component or simulate back button
const [selectedId, setSelectedId] = useState(null);
//* by setting ID value to null
function closeMovieDetails() {
  setSelectedId(null);
}

//*===========================================================================================================================

//& conditional rendering using selectedId value
``` selectedId ? (
  <MovieDetails
    selectedId={selectedId}
    onCloseMovieDetails={closeMovieDetails}
    onAddWatchedMovie={handleAddWatchedMovie}
    watched={watched}
  />
) ```;

//*===========================================================================================================================
//& Update list of items such as movies: using spread operator
const [watched, setWatched] = useState([]);
function handleAddWatchedMovie(movie) {
  setWatched((watched) => [...watched, movie]);
}

//*===========================================================================================================================
//& Delete an item from a list:

function WatchedMovie({ movie, handleDeleteWatchedMovie }) {
  return (
    <li className="list-watched">
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <button
        className="btn-delete"
        onClick={() => handleDeleteWatchedMovie(movie.imdbID)}
      >
        x
      </button>
    </li>
  );
}
//* By updating the whole array list by filtering the id of the required item to delete
//* like building a new array but without the required id to delete (the id of the list that has delete button to be clicked)
function handleDeleteWatchedMovie(id) {
  setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
}

//*==============================================================================================================

//& How to fetch a data using async / await, handling its error

const [query, setQuery] = useState("");
const [movies, setMovies] = useState([]);

//! useEffect sync with query

useEffect(
  function () {
    //*  use a native browser API to solve race condition issue (look up App features.js file)
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true); //! Display loading while data is fetching
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        //! handling loss internet connection error
        if (!res.ok) throw new Error("Internet connection lost");

        const data = await res.json();

        //! handling not found a Movie
        if (data.Response === "False") throw new Error("Movie Not Found");

        //! Enters the fetched movies data in the movies array to display it
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message); //! When fetch request cancelled by clean up function, it throws error, so to fixed that, write this line of code
      } finally {
        setIsLoading(false); //! Hide loading once data is fetched
      }
    }

    //! Preventing starting fetching when writes less than 3 letters in the search input field
    if (query.length < 3) {
      setMovies([]);
      return;
    }

    closeMovieDetails(); //* to close the last movieDetails before start a new movie search
    fetchMovies(); //* call fetch function to start to fetch a movie

    //! clean up function to remove the thrown error happened after canceling a fetch request
    return function () {
      controller.abort();
    };
  },
  [query]
);

//*==============================================================================================================

//& Conditional rendering between Loading comp, Display fetched data comp, Error comp

const [isLoading, setIsLoading] = useState(false);
const [isError, setError] = useState("");

<Box>
  {!isLoading && !isError && (
    <MoviesList onSelectedId={handleIdSelection} movies={movies}></MoviesList>
  )}
  {isLoading && <Loader />}
  {isError && <ErrorMessage error={isError} />}
</Box>;

//*==============================================================================================================

//& Display list of components by map:

function MoviesList({ movies, onSelectedId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectedId={onSelectedId} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectedId }) {
  return (
    <li onClick={() => onSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

//*==============================================================================================================

//& Show and hide button for a component

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

<Main>
  <Box>
    {!isLoading && !isError && (
      <MoviesList onSelectedId={handleIdSelection} movies={movies}></MoviesList>
    )}
    {isLoading && <Loader />}
    {isError && <ErrorMessage error={isError} />}
  </Box>
  <Box>
    {selectedId ? (
      <MovieDetails
        selectedId={selectedId}
        onCloseMovieDetails={closeMovieDetails}
        onAddWatchedMovie={handleAddWatchedMovie}
        watched={watched}
      />
    ) : (
      <>
        <WatchedMoviesSummary watched={watched} />
        <WatchedMoviesList
          watched={watched}
          onDeleteWatchedMovie={handleDeleteWatchedMovie}
        />
      </>
    )}
  </Box>
</Main>;
//*==============================================================================================================

function MovieDetails({
  selectedId,
  onCloseMovieDetails,
  onAddWatchedMovie,
  watched,
}) {
  const [movieDetails, setMovieDetails] = useState({}); //* type of {} because that is the returned type from api call in fetchMovieDetails

  const [userRating, setUserRating] = useState();

  //& Display another content after clicking on same element
  //* By producing boolean value using looping and includes then use this boolean value for conditional rendering
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  //& Using (find method with optional chaining) to loop and find a certain object (if exists) to get a certain property (userRating)
  const watchedMovieRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  //* use optional chaining, because in other cases where the movie hasn't been added to watchedList before so userRating won't be accessed and give error
  //* so use optional chaining

  //& Using destructing to edit object properties names
  const {
    Title: title,
    Year: year,
    Poster: poster, //* look down
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbID,
  } = movieDetails;

  console.log(title, year); //* at first it will give undefined,undefined (in case dependency array was [] as in the beginning of the tutorial)
  //* because useEffect executed after (render + commit + browser paint)

  //& Creating a new object based on other properties
  function handleAdd() {
    const newWatchedMovie = {
      poster, //* poster:poster (the one above loo up)
      title,
      imdbRating: Number(imdbRating), //! convert string to number
      runtime: runtime.split(" ").at(0), //! extract the number from the string (runtime = '120 min')
      userRating,
      imdbID,
    };
    console.log(newWatchedMovie.runtime);

    onAddWatchedMovie(newWatchedMovie);
    onCloseMovieDetails(); //* close the movie details window after adding the movie to watched list
  }

  //& Changing a browser tab title when ,mounting a certain component
  //* use UseEffect inside this mounted component
  useEffect(
    function () {
      // document.title = "test";
      //* We actually don't want to see the undefined in the browser tab in the beginning.
      //* so we don't want temporarily to be our movie set to undefined.
      if (!title) return;
      document.title = `Movie | ${title}⭐${imdbRating}`;

      return function () {
        document.title = "My usePopCorn";
        console.log(`Cleanup Effect for movie ${title}`); //* title: will show the name of last movie before go back because of closure Javascript effect
      };
    },
    [title, imdbRating]
  ); //* if dep arr is [], the title will be: 'Movie | undefined' because this UseEffect will be triggered only at mount

  //& Close Feature using Escape key:
  useEffect(
    function () {
      const callback = function (e) {
        if (e.code === "Escape") {
          onCloseMovieDetails();
        }
      };

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback); //! use cleanup function to avoid duplicate same handling function callback, causing memory issue
      };
    },
    [onCloseMovieDetails]
  ); //* learn about passing onCloseMovieDetails to dep arr later

  //& Conditional Rendering using boolean value (isWatch) and ternary operator and truthy value (userRating) and && operator
  <div className="rating">
    {isWatched ? (
      <p>You rated this movie {watchedMovieRating}</p>
    ) : (
      <>
        <StarRating maxRating={10} size={24} onUserRating={setUserRating} />
        {userRating && (
          <button className="btn-add" onClick={handleAdd}>
            + add to list
          </button>
        )}
      </>
    )}
  </div>;
}
//*==============================================================================================================

//& Title: Store and read in localStorage of the browser:

//? Application of initialize state with a callback (Lazy initial state)

export default function App() {
  // const [watched, setWatched] = useState([]);

  //~ Example of:
  //* Initialize state with a callback (Lazy initial state)
  //* Read data from local storage in initial rendering:
  //* by passing pure (must be without any arguments) call back function as initial value to useState
  //* we can then initialize the state with whatever value this callback function will return.

  const [watched, setWatched] = useState(function () {
    const stored = localStorage.getItem("watched");
    return JSON.parse(stored);
  });

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);

    //* first solution option to save watched list in local storage
    //~ localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  //* second solution: (better)
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  //* whenever the initial value of the use data depends on some sort of computation
  //* we should always pass in a function like this. So function that React can execute on its initial render.
  //! note:
  //* we can not call function in useState
  //* only we can pass a function in useState

  //! useState(localStorage.getItem("watched"))
}

//*==============================================================================================================

//& Title: Don't use querySelector:
//! this not ideal, because in React we follow declarative technique
//* We don't touch the DOM
useEffect(function () {
  const input = document.querySelector(".search");
  input.focus();
}, []);
//* also if we define query inside dep array, this input variable will be declared (select the element) over and over again whenever the query changed

//? Solution:
//* Use useRef
//*==============================================================================================================

//& Title: Using Ref to apply focus on input element:

function Search({ query, setQuery }) {
  //? Solution:
  //* Use useRef
  //~ 1) Create Ref:
  const inputEl = useRef(null); //* null is the initial value and in case of DOM element we pass null

  //~ 3) Use Ref inside useEffect:
  //! Why we use inputEl inside useEffect?

  //* Because the ref only gets added to this DOM element here after the DOM has already loaded.
  //* And so therefore we can only access it in effect which also runs after the DOM has been loaded.
  //* So this is the perfect place for using a ref that contains a DOM element.

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return; //* to avoid pressing enter and remove the search query while we still focus on the input element (check video 167)
        console.log(inputEl.current); //* the selected element itself (<input/>)

        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery(""); //* empty the input field after focus
        }
      }
      document.addEventListener("keydown", callback);
    },
    [setQuery]
  ); //* when jonas forgot to add setQuery to dep arr, he was forced to reload the page.

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      //~ 2) Connect Ref to the input Element (the element we want to select):
      //~ by ref prop
      ref={inputEl}
    />
  );
}

//*==============================================================================================================

//&  Currency converter App:

//& Loading and disable the input field:  (Currency converter App)

//? Disable these three fields for:

//* showing the user that something is happening.
//* prevents the user from typing and creating multiple HTTP requests at the same time.

function App() {
  const [money, setMoney] = useState(1);
  const [currency1, setCurrency1] = useState("EUR");
  const [currency2, setCurrency2] = useState("USD");
  const [output, setOutput] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convertCurr() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${money}&from=${currency1}&to=${currency2}`
        );

        const data = await res.json();
        const { rates } = data;
        if (!rates) throw new Error("can not exchange from same unit");
        setOutput(rates[currency2]);

        setIsLoading(false);
      }
      if (currency1 === currency2) return setOutput(1);
      convertCurr();
    },
    [money, currency1, currency2]
  );

  return (
    <div>
      <input
        type="number"
        value={money}
        onChange={(e) => setMoney(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={currency1}
        onChange={(e) => setCurrency1(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>

      <p>
        {output} {currency2}
      </p>
    </div>
  );
}


//*==================================================================================================================

//& Classy Weather App:

//& Title: using Map Data Structure:

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

//& Title: Format day / Date:

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

//& Conditional render based on property existence of a state object (weather)
const [weather, setWeather] = useState({});
{
  weather.weathercode && (
    <Weather weather={weather} displayLocation={displayLocation} />
  );
}

//& Title: Initialize state by local storage value:

const [location, setLocation] = useState(
  localStorage.getItem("location") || ""
);

//* no need of .json method because we want to receive te value as string not object
//* .json() convert json (Javascript string object notation) to object.

//! Why localStorage.getItem("location") || "" ?
//* when we run this up for the first time there won't be no local storage yet
//* at least not with this key ("location"). And so let's then set a default off an empty string.

//& Title: Looping on multiple array by map method index (i), object destructing, conditional rendering

function Weather({ weather }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: code,
  } = weather;
  return (
    <div>
      <ul className="weather">
        //* Looping on multiple array by map method index (i)
        {dates.map((date, i) => (
          <Day
            day={date}
            max={max.at(i)}
            min={min.at(i)}
            code={code.at(i)}
            key={date}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
}

function Day({ day, max, min, code, isToday }) {
  return (
    <li className="day">
      //* conditional content rendering by boolean value of isToday={i === 0}
      <p>{isToday ? "Today" : formatDay(day)}</p>
      <p>
        {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}</strong>&deg;
      </p>
    </li>
  );
}


//*==================================================================================================================

//^====================================================  Advanced Level =========================================================

//& setup Vite Project:

// npm create vite@latest
// or for jonas course
// npm create vite@4

// Project-name: worldWise
// choose react
// choose javascript

// npm i

// npm run dev


// npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev

// .eslintrc.json

// {
 
//   extends: 
//     "react-app",
// }

// vite.config.js

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), eslint()],
// });

//*==================================================================================================================


//& Routing  (Worldwise App)
//* npm i react-router-dom@latest
//* for jonas
//* npm i react-router-dom@6
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//& Link instead of anchor (<a></a>) why??
{
  /* //* <a></a> anchor element will cause page reload  */
}
{
  /* <a href="/pricing">Pricing</a> */
}
//! instead:
{
  /* <Link to="/pricing">Pricing</Link> */
}


  {/* <Route index element={<HomePage />} />   //& index route */}
  {/* //! OR: <Route path="/" element={<HomePage />} />  as down  */}
//*================================


//& NavLink instead of Link when??
//* <NavLink></NavLink> to highlighted the selected link with class='active'



//! Video 212

//& Usage of nested routes:

//* we need nested routes when we want a part of the user interface to be controlled by a part of the URL.

//* show a part of the UI  based on some part of the URL.

// in the URL, we have slash app and then slash cities.

// And so basically this cities part here is displayed because in the URL we have cities.

// eslint-disable-next-line no-lone-blocks
{
  /* 

<Route path="app" element={<AppLayout />}>    //& Parent Route
    <Route index element={<p>List of cities</p>} />    //& index Route
    <Route path="cities" element={<p>List of cities</p>} />    //& Child Route
    <Route path="countries" element={<p>List of countries</p>} />   //& element can be any JSX or component
    <Route path="form" element={<p>form</p>} />
</Route> 


*/
}

//=====================================================================

//& Usage of Outlet Component routes:  <Outlet />
//* how to display one component or one element inside another component
//* that's where the outlet component provided by React Router comes into play.

//* as in sidebar (outlet)

//=====================================================================

//& Usage of index route:
//* index route is the default child route that is going to be matched
//* if none of these other routes here matches.

//*=====================================================================

//& Title: React Router vs Use state hook

//* Now if we think about this, what we just implemented here is actually very similar to something like a tabs component, but implemented in a very different way.

//? Implementing a Tab Component
//* So before, if we wanted to implement a tab component where we have these tabs here and then the content changes according to which is the active tab
//* we would've implemented that using the Use state hook to manage the currently active tab.

//? Using React Router
//* But here with React Router, we do the same thing, but in a very different way. So instead of using the Use state hook to manage state,
//* we basically allow React Router enter URL to store that state of the active tab.
//* And so then whenever this URL here changes, then we change which tab is currently active.

//? React Router: A New Way of Thinking
//* So React Router is a whole new way of thinking about how we built an application.

//? The Value of Previous Learning
//* So we still build components like accordions or tabbed components like the one I just mentioned using the U state hook all the time.

//? Navigation in Real World Applications
//* But from now on, the overall navigation of the application is in the real world always managed by something like React Router.
//* And so that includes a small sub navigation like this one.  (cities and countries tabs)

//*=====================================================================
//& Title: Implementing Nested Routes

//? Implementing Nested Routes
//* So how we implemented our nested routes here inside another route element.
//*  Then we rendered whatever the nested route wants to render inside the outlet component here.

//? Switching Between Nested Routes
//* And then to actually switch between the nested routes we implemented
//* yet another navigation with these Nav link components to basically link between the different URLs, which in this case are these sub URLs.

//? Sub Routes Example
//* So with the sub routes of cities and countries.

//*=====================================================================
//& another usefulness of react router
//* storing state in the URL so that we can use it in different places of the application (use it globally)

//*=====================================================================

//! Video 216
//& Title: React Route with Params

//? Using Params with React Router
//! To use params with React Router, we basically do it in three steps.

//* Step 1: Create a New Route
//~ <Route path="cities/:id" element={<City />} />

//~ path="cities/:parameter"  above parameter is id

//* Step 2: Link to the Route
//~ const { cityName, emoji, date, id, position } = city;
// eslint-disable-next-line no-lone-blocks

//? CityList Comp
{
  /* 
<li>
    <Link
      className={styles.cityItem}
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}
    >
      <h3 className={styles.name}>{cityName}</h3>
    </Link>
</li> */
}

//* Step 3: Read the State from the URL  ( get that data from the URL)
//~ const { id } = useParams();

//~ id variable name in destruction, must match the name in the path in Route
//~ <Route path="cities/:id" element={<City />} />

//*=====================================================================
//! Video 217
//& Query String

//^ Create query string by passing it to (to prop) in the link
//~ general form: to={`${parameter}?querystring1=${value1}&querystring2=${value2}`} >

//? CityItem Comp
//* <Link
//*  className={styles.cityItem}
//*  to={`${id}?lat=${position.lat}&lng=${position.lng}`} >

//^ to read the query string in other component, use hook (useParams)
//? Map Comp and also in City Comp
//* const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();
//! 'lat' inside get, must match the parameter name in the to attribute in link jsx element in CityItem (to={`${id}?${position.lat}&${position.lng}`})
//   const lat = searchParams.get("lat");
//   const lng = searchParams.get("lng");

//^ set or update Query string
//* by setSearchParams, we pass new query string in an object as follows

// eslint-disable-next-line no-lone-blocks
{
  /* <button
onClick={() => {
  setSearchParams({ lat: 23, lng: 50 });
}}
>
Change Pos
</button> */
}

//*=====================================================================
//! Video 218
//& Title: Programmatic Navigation

//? Imperative Way
//* Programmatic navigation basically means to move to a new URL without the user having to click on any link.
//* A common use case of this behavior is right after submitting a form.
//* Many times when the user submits a form, we want them to move to a new page in our application automatically, without having to click on any link.
//* We can use programmatic navigation to achieve that.

//! const navigate = useNavigate();

//~ EXAMPLE 1:
//* Move to form comp to enter city details of a location when click on that location on the Map

//^ imperative way to move to form
//* navigate("form"); "form" must match same value of Path in route element in App.jsx
//! <Route path="form" element={<Form />} />

//? Map Comp

// eslint-disable-next-line no-lone-blocks
{
  /* <div
className={styles.mapContainer}
onClick={() => {
  navigate("form");
}}
>
<h1>Map</h1>
<h1>
  Position: {lat},{lng}
</h1>
<button
  onClick={() => {
    setSearchParams({ lat: 23, lng: 50 });
  }}
>
  Change Pos
</button>
</div> */
}

//~ EXAMPLE 2:
//* Back button
// eslint-disable-next-line no-lone-blocks
{
  /*
 
<Button
type="back"
onClick={(e) => {
  e.preventDefault(); //* to prevent form reload
  //* navigate(-1);   (-1) one step backwards
}}
>  &larr; Back
</Button> 

*/
}

//*===================================================================
//! Video 218
//& Customized button component:

//* children represents the content
//* onClick
//* type for custom css style ( to conditionally add a CSS class )

//~ import styles from "./Button.module.css";
//? Button comp
// .btn {
//   color: inherit;
//   text-transform: uppercase;
//   padding: 0.8rem 1.6rem;
//   font-family: inherit;
//   font-size: 1.5rem;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// }

// .primary {
//   font-weight: 700;
//   background-color: var(--color-brand--2);
//   color: var(--color-dark--1);
// }

// .back {
//   font-weight: 600;
//   background: none;
//   border: 1px solid currentColor;
// }

//* function Button({ children, onClick, type }) {
//*   return (
//!     <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
//*       {children}
//*     </button>
//*   );
//* }

//*=====================================================================
//! Video 219
//& Declarative Way: Navigate Component
//* The Navigate component that we're going to learn about now is not so much used anymore,
//* but there is still one very important use case for it, which is inside nested routes.

//? App Comp
// eslint-disable-next-line no-lone-blocks

{
  /* <Route
index
path="cities"
element={<Navigate replace to="cities" />}
/> */
}

//* replace prop is : replace the current element in the history stack.


