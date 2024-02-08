import { useState } from "react";
import "./index.css";

//& Open and closing accordion
//? State location
//* We need the three accordion has knowledge among them that one of them is open.
//* so we lift the state which was placed in each of accordion item, so they are independent pf each other.
//* we lift this state (isOpen) to the parent accordion component and also replaced by new state (curOpen)

//? Use advantage of children props

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos.",
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
          text={el.text}
          num={i}
          key={i}
        />
      ))}
    </div>
  );
}

//* the key can be key={el.title}  (anything unique)

function AccordionItem({ num, title, curOpen, onOpen, text }) {
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
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}
