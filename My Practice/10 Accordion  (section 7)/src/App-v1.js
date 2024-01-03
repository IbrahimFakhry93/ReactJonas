import { useState } from "react";
import "./index.css";

//& Difference between v1 and this version:

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
  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem title={el.title} num={i} text={el.text} key={i} />
      ))}
    </div>
  );
}

//* the key can be key={el.title}  (anything unique)

function AccordionItem({ num, title, text }) {
  //? Note
  //* We can open and close components in React by using state.
  //* The process of applying state in a component involves three steps: defining it, using it, and updating it.

  //* Here is an example of a component called `AccordionItem` that uses state to toggle between an open and closed state:

  //~ 1) Define the state variable 'isOpen'
  //* We define a state variable called 'isOpen' using the useState hook. It's initially set to false.
  const [isOpen, setIsOpen] = useState(false);

  //~ 2) Update the state variable 'isOpen'
  //* We update 'isOpen' in the 'handleToggle' function. This function toggles the value of 'isOpen' each time it's called.
  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  //~ 3) Use the state variable 'isOpen'
  //* We use 'isOpen' to determine what to render. If 'isOpen' is true, we render the text content. If 'isOpen' is false, we don't render the text content.
  //* We also use 'isOpen' to apply a CSS class to the component. If 'isOpen' is true, we apply the 'open' class. If 'isOpen' is false, we don't apply the 'open' class.
  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : `${num + 1}`}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}

//*===========================================================================================================================

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
