//& Section 6: State, Events, and Forms: Interactive Components

//& Date Counter App

//& input of type range
```<input
type="range"
min="0"
max="100"
step="1"
value={step}
onChange={handleStep}
/>```;

//& using numeric values comparison rather than direct boolean values to apply conditional rendering
//*  {(count !== 0 || step !== 1) && <button onClick={reset}>Reset</button>}
