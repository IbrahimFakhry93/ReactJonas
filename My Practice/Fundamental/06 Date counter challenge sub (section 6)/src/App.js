import { useState } from "react";
//& Section 6: State, Events, and Forms: Interactive Components
function App() {
  return (
    <>
      <Counter />
    </>
  );
}

function Counter() {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const now = new Date();
  const [step, setStep] = useState(1);
  const [counter, setCounter] = useState(0);
  const [date, setDate] = useState(now);

  function updateDate(step) {
    setCounter((c) => c + step);
    setDate((d) => {
      const newDate = new Date(d);
      newDate.setDate(newDate.getDate() + step);
      return newDate;
    });
  }

  //* Directly updates the date of the current value of date.
  //* This can lead to different behavior depending on how these functions are used in your application.
  //* It’s important to note that directly mutating state in React is not recommended and can lead to unexpected behavior.
  //* It’s generally better to create a new object (newDate) or array when updating state.

  //! Read App2.jsx (Important)

  return (
    <>
      <div className="counter">
        <div>
          <button onClick={() => setStep((s) => s - 1)}>-</button>
          <span> Step:{step} </span>
          <button onClick={() => setStep((s) => s + 1)}>+</button>
        </div>

        <div style={{ marginTop: "15px" }}>
          <button onClick={() => updateDate(-step)}>-</button>
          <span> Counter:{counter} </span>
          <button onClick={() => updateDate(step)}>+</button>
        </div>
        <div style={{ marginTop: "15px" }}>
          <span>
            {counter === 0 &&
              `Today is ${date.toLocaleDateString("en-US", options)}`}
            {counter >= 1 &&
              `${counter} days from today is ${date.toLocaleDateString(
                "en-US",
                options
              )} `}
            {counter < 0 &&
              `${Math.abs(counter)} days ago was ${date.toLocaleDateString(
                "en-US",
                options
              )}`}
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
