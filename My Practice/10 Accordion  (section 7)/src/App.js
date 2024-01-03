import { useState } from "react";
import "./index.css";

//& Difference between v1 and this version:

//? State location
//* We need the three accordion has knowledge among them that one of them is open.
//* so we lift the state which was placed in each of accordion item, so they are independent pf each other.
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
      {/* {application of childern props} */}
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
          <li>Make components reusuable</li>
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

  const isOpen = num === curOpen; //* create isOpen boolean type by assiging to sth proudces boolean value

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
