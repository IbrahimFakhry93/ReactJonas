import { Children, createContext, useContext, useState } from "react";

//* 1. Create Context
const CounterContext = createContext();

//* 2) Create Parent Component
function Counter({ children, className }) {
  const [count, setCount] = useState(0);
  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => c - 1);

  // return <span>Counter</span>;

  //? use the context here to provide the state to all our child components
  return (
    <CounterContext.Provider value={{ count, increase, decrease }}>
      <div className={className}> {children}</div>
    </CounterContext.Provider>
  );
}

//* 3) Create Child Components to help implementing the common task of this overall compound component

function Count() {
  //* call the useContext hook and pass the context itself
  const { count } = useContext(CounterContext);
  //! use span element instead of <p></p> to avoid any line breaks
  return <span>{count}</span>;
}
function Label({ children }) {
  return <span>{children}</span>;
}
function Increase({ icon }) {
  const { increase } = useContext(CounterContext);
  return <button onClick={increase}>{icon}</button>;
}
function Decrease({ icon }) {
  const { decrease } = useContext(CounterContext);
  return <button onClick={decrease}>{icon}</button>;
}

//* 4) Add child components as properties to parent component
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;
export default Counter;
