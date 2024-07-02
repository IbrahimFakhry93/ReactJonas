import Counter from "./Counter";
import "./styles.css";

export default function App() {
  return (
    <div>
      <h1>Compound Component Pattern</h1>
      {/* <Counter
        iconIncrease="+"
        iconDecrease="-"
        label="My NOT so flexible counter"
        hideLabel={false}
        hideIncrease={false}
        hideDecrease={false}
        positionCount="top"
      /> */}

      <Counter className="counter">
        <Counter.Decrease icon="-" />
        <Counter.Count />
        <Counter.Increase icon="+" />
        <Counter.Label>My Super Flexible Counter</Counter.Label>
      </Counter>
      <div>
        <Counter className="counter">
          <Counter.Decrease icon="⬅️" />
          <Counter.Count />
          <Counter.Increase icon="➡️" />
        </Counter>
      </div>
    </div>
  );
}
