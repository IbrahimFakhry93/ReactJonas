import "./index.css";
import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState(""); //* to show the placeholder 'Bill value'
  const [tipPer1, setTipPer1] = useState(0);
  const [tipPer2, setTipPer2] = useState(0);

  const tip = bill * ((tipPer1 + tipPer2) / 2);

  function handleReset() {
    setBill(""); //* to show the placeholder 'Bill value'
    setTipPer1(0);
    setTipPer2(0);
  }

  return (
    <div className="App">
      <Bill onSetBill={setBill} bill={bill} />
      <Service onSetTipPer={setTipPer1} tipPer={tipPer1}>
        How did you like the service?
      </Service>
      <Service onSetTipPer={setTipPer2} tipPer={tipPer2}>
        How did your friend like the service?
      </Service>
      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset onRest={handleReset} />
        </>
      )}
    </div>
  );
}

function Bill({ bill, onSetBill }) {
  return (
    <>
      <p>How much was the bill?</p>
      <input
        type="text"
        value={bill}
        placeholder="Bill value"
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </>
  );
}

function Service({ children, onSetTipPer, tipPer }) {
  return (
    <>
      <p>{children}</p>
      <select
        type="text"
        value={tipPer}
        onChange={(e) => onSetTipPer(Number(e.target.value))}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={0.05}>It is okay (5%)</option>
        <option value={0.1}>It was good (10%)</option>
        <option value={0.2}>Absolutely amazing! (20%)</option>
      </select>
    </>
  );
}

function Output({ bill, tip }) {
  return (
    <>
      <p>
        You pay ${tip + bill} (${bill} + ${tip} tip)
      </p>
    </>
  );
}

function Reset({ onRest }) {
  return <button onClick={onRest}>Reset</button>;
}
