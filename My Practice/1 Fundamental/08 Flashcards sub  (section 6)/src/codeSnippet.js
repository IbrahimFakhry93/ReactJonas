import "./index.css";
import { useState } from "react";
//& Section 6: State, Events, and Forms: Interactive Components
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
  //* you would need to lift the state up to the parent component (FlashCards).
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
