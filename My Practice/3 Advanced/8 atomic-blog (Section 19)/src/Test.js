import { useState } from "react";

function SlowComponent() {
  // If this is too slow on your machine, reduce the `length`  100_000

  //* create 1000 words and place them in an array
  const words = Array.from({ length: 1000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

export function Test() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      <SlowComponent />
    </div>
  );
}
//& Title: Problem with SlowComponent

//? Issue
//* Clicking the button updates the state (count), causing the Test component to re-render.
//* This leads to the SlowComponent also re-rendering each time the button is clicked.

//? Dependency
//* SlowComponent isn't dependent on the state (count).
//* But it's re-rendered because it's inside the Test component.

//? Solution
//* If a SlowComponent is inside another component that updates without needing it,
//* An optimization technique can be used to prevent unnecessary re-renders.

//*======================================================================================

//? Solution:

//& Title: Optimization with SlowComponent

//? Children Prop
//* SlowComponent is passed as a children prop.
//* This means it's created before Counter re-renders, so it's not affected by Counter's state change.

//? Component Creation
//* React creates SlowComponent immediately when it sees the JSX, and passes it into Counter during rendering.

//? Re-rendering
//* When the button is clicked, Counter re-renders.
//* But SlowComponent, already created and passed as a prop, isn't affected by this state update.

//? React's Decision
//* React avoids re-rendering the children component (SlowComponent) because it knows nothing could have changed inside it.

function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}

export function Test2() {
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <Counter>
        <SlowComponent />
      </Counter>

      {/* //? Alternative
      //* Same result can be achieved with: <Counter slowComp={<SlowComponent />}/> */}
    </div>
  );
}
