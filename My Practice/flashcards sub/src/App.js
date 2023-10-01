import "./index.css";
import { useState } from "react";

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript"
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components"
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX"
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props"
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook"
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element"
  }
];


export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}


function FlashCards() {
  return (
    <>
      <div className="flashcards">
        {questions.map(card => <Card card={card} key={card.id} />)} 
      </div>
    
    
    </>
  );
}


function Card({ card }) {
  const [selected, setSelected] = useState(false);
  console.log(card);
  return (
    <>  
      <div className={selected? 'selected':''} onClick={ ()=>setSelected(!selected)}>
        { selected? <p>{card.answer}</p>:<p>{card.question}</p>}
      </div>
    </>
  );
}