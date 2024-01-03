//& Apply The children Prop: Making a Reusable Button

import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
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

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button bgColor="#7950f2" color="#fff" onClick={handleBack}>
              <span>👈</span> Previous
            </Button>
            <Button bgColor="#7950f2" color="#fff" onClick={handleNext}>
              Next <span>👉</span>
              <span>😉</span>
            </Button>
          </div>

          {/* <StepMessage step={step}>
            {messages[step - 1]}
            <Button bgColor="#7950f2" color="#fff" onClick={handleBack}>
              <span>👈</span> Previous
            </Button>
          </StepMessage> */}
        </div>
      )}
    </>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <span>{step}:</span>
      {children}
    </div>
  );
}

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default App;

//*=====================================================================================

//& Title: Using children prop in React for reusability

const Appp = () => {
  return (
    <Card>
      <h1>Hello World</h1> //* This is passed as 'children' to the 'Card'
      component
      <p>Welcome to my app!</p> //* This is also passed as 'children'
    </Card>
  );
};

//? Note
//* The 'children' prop in React allows components to be reused by passing elements
//* directly into components, which are then rendered through the component.

// Here we define a reusable 'Card' component
const Card = ({ children }) => {
  return (
    <div className="card">{children} //* The 'children' prop is used here</div>
  );
};

//? Note
//* Below is an example of how to use the 'Card' component

//export default Appp;
