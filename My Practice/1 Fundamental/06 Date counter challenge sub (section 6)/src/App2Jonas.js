import { useState } from "react";
import "./styles.css";
//& Section 6: State, Events, and Forms: Interactive Components
export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count); //* new date is derived state, means its value is derived from count and step.

  //* add count not step because we add the whole new count value after each increment to the value of the first date (today === date === new Date())

  //* In this example, the date is derived from the `count` state variable,
  //* so it is not necessary to store it in a separate state variable.
  //* Instead, the date is calculated and updated whenever the `count` value changes.
  //* This approach can make the code simpler and easier to understand,
  //* as it avoids having to manage multiple state variables that depend on each other.

  //* However, if the date calculation was more complex or if it was used in multiple places in the component,
  //* it might make sense to store it in a separate state variable and update it using a `useEffect` hook whenever the `count` value changes.
  //* This would allow you to encapsulate the date calculation logic and avoid recalculating the date unnecessarily.

  //* Ultimately, whether or not to store derived data in a state variable depends on the specific use case and the complexity of the data calculation.
  //* In this example, the date calculation is simple and only used in one place,
  //* so it makes sense to calculate it directly without storing it in a separate state variable.

  return (
    <div>
      <div>
        <button onClick={() => setStep((c) => c - 1)}>-</button>
        <span>Step: {step}</span>
        <button onClick={() => setStep((c) => c + 1)}>+</button>
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
