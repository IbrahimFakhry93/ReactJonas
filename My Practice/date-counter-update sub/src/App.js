import { useState } from "react";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}
// "june 21 2027"
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [resetMode, setResetMode] = useState(false);
  const date = new Date();
  date.setDate(date.getDate() + count);
 
function reset() {
  setStep(0);
  setCount(0);
}
  
function handleStep(e) {
  setStep(Number(e.target.value));
  setResetMode(true);
}
  
  function handleCount(e) {
    setCount(Number(e.target.value));
    setResetMode(true);
 }
  return (
    <div className="counter">
      
      <input type="range" min="0" max="100" step="1" value={step} onChange={handleStep} />
      <span>Step: {step}</span>
      <div>
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <input type='text' value={count} onChange={handleCount} />
        <button style={{margin:'10px'}} onClick={() => setCount((c) => c + step)}>+</button><br />

        {/* {resetMode ? <button onClick={reset}>Reset</button> : ''} */}
        {(count !==0 || step!==1) && <button onClick={reset}>Reset</button> }
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
