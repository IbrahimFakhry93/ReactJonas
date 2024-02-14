import { useReducer } from "react";

//& In the first two lectures, we will look at the mechanics of useReducer hook

//* In the first two lectures, we will only be working with a DateCounter.
//* Replace two useState hooks (count, step) with useReducer hooks
//* useReducer hook is a more advanced and more complex way of managing state instead of the useState hook.
//* the useReducer hook works with a so-called reducer function, which is a pure function
//* that will always take in the previous state and the so-called action as an argument and will then return the next state.

const initialState = { count: 0, step: 1 };

//! VIP:
//* useReducer is used to centralize all state updating logic in one central place, which is the reducer function.

// it's ultimately this reducer function

// that will be updating the state object.

// So in a way.

// it's a bit like the setState function in useState

// but with superpowers.

function reducer(state, action) {
  //! state: current state
  //! action: action dispatched to reducer function
  // console.log(state, action); //* 0  , 1
  //* the idea of the reducer is to take these two things,
  //* so the current state plus the action, and based on that, return the next state.
  // return state + action; //! whatever we return here, will be the new state

  //* reducer function takes the current state nd all the information that is contained in the action
  //* in order to compute the next state.
  //* So usually based on the action type, the reducer then takes some kind of decision.

  //~ For example:
  //* if it's Inc, so increment, then it simply adds one.
  //* If it's decrement, then it subtracts one from the current state.
  //* And if it's set count, then it will simply set the new state

  //& account for the three types of actions
  // if ((action.type = "inc")) return state + action.payload;
  // if ((action.type = "dec")) return state - action.payload;
  // if ((action.type = "setCount")) return action.payload;

  //~ or:
  // if ((action.type = "inc")) return state + 1;
  // if ((action.type = "dec")) return state - 1;
  // if ((action.type = "setCount")) return action.payload;

  // So basically we have all the possible state updates that can happen in our application in this one central place here.
  // And so this makes it really easy to understand the entire application
  // without having to go into all the different components and all the different functions.

  //~ or switch and return object adapts to same properties in initial state

  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  //& useReducer:
  //* dispatch function can also be used to update the state. It just works in a slightly different way.
  // const [state, dispatch] = useReducer(reducer, 0); //* was 0: initial state value
  //! call dispatch inside inc function
  //* we use Reducers when we have some more complex state to manage.
  //* So not just one single value as we have been doing here.
  //* Usually the state is going to be an object and not just one single value (like 0).
  //  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });
  const [state, dispatch] = useReducer(reducer, initialState); //* was 0: initial state value
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  //* it's time to actually start thinking about actions here.
  //* So basically in this case, we have three actions.
  //* We have decreasing the count, we have increasing it, and we have setting it.
  //* And so we should actually name these actions.
  //* So what we're going to do is to not just pass in this value (1 or -1 as in inc or dec) to dispatch
  //* but an object which contains the action as well as this value.

  const dec = function () {
    //& dispatching action (call dispatch function)
    //~ pass action as a value
    //dispatch(-1);

    //~ pass action as object
    // dispatch({ type: "dec", payload: -1 });

    // setCount((count) => count - 1);
    // setCount((count) => count - step);

    //^ or:
    dispatch({ type: "dec" });
  };

  const inc = function () {
    //& dispatching action (call dispatch function)
    //~ pass action as a value
    // dispatch(1);
    //! check  console.log(state, action) in reducer, it will be  ( 0 , 1)
    //* 1 in dispatch argument is action

    //~ pass action as object
    // dispatch({ type: "inc", payload: 1 });
    //^ or:
    dispatch({ type: "inc" });

    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({ type: "reset" });
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default App;

//* all event handlers in onchange are just dispatching actions to one centralized function (reducer) which contain the real logic of these event handlers
//* and this one of big advantages of using reducer hook
