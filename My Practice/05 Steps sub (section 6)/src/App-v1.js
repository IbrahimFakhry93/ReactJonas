// this data (messages) doesn't depend on anything

import { useState } from "react";

// that is inside the component.

// And so it should be located outside

// because otherwise each time that function (App) here

// is executed, this data (messages), so this array will be created again
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  //* const arr = useState(default-value);
  //* useState returns array that contains [default value,updating func];
  //* use destructing to extract these data
  //* const [state default value,setState] = useState(default-value);

  //! Don't call react hooks like useState inside a loop or if statement.
  //! call it only on the top level of the function component.

  //* update state only by setState function not manually.
  //* Because React provides immutability.

  //* each time the component is rendered, React calls the component function again

  //& Title: Understanding React Component State

  //? Note
  //* React preserves the component state throughout re-renders.
  //* This means that even though a component can be rendered and re-rendered many times, the state will not be reset.

  //? Note
  //* The only time the state is reset is when the component disappears from the UI entirely. This is known as unmounting.

  //? Note
  //* When the state of a component is updated, the component is automatically re-rendered.
  //* This is one of the key features of React that makes it powerful for building dynamic user interfaces.

  //* state is isolated in each component.

  const [step, setStep] = useState(1);

  const [isOpen, setisOpen] = useState(true);

  function handleBack() {
    //* if (step > 1) setStep(step - 1);

    //* update the state by a callback function

    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) {
      //* setStep(step + 1);
      //* setStep(step + 1);
      //! state will not be updated again

      //? so pass callback function to the setter function
      setStep((s) => s + 1);
      // setStep((s) => s + 1); //* state will be updated again
    }
  }
  //* we <> fragment outside to start JSX, so then inside the JSX we can enter JavaScript mode
  return (
    <>
      <div className="close" onClick={() => setisOpen((is) => !is)}>
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
              style={{ backgroundColor: "#7950f2", color: " #fff" }}
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

export default App;
