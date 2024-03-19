import { useEffect } from "react";
import { useQuiz } from "../../context/QuizContext";

function Timer() {
  const { dispatch, remainingSeconds } = useQuiz();
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  //* useEffect here because we want the timer to start once the time mount and it will mount in the status: 'start'
  //* if we put useEffect in the App, it will start when the App is mounted , the whole application starts not the quiz itself
  useEffect(
    function () {
      //* every setInterval return a unique ID
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      //* use this id to clear the function
      //* this cleanup function will run between re-renders and at unmount
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div>
      <p className="timer">
        {mins < 10 && "0"}
        {mins}: {secs < 10 && "0"}
        {secs}
      </p>
    </div>
  );
}

export default Timer;

//! why we need clean up function:
// And the reason for that

// is that our timer actually does never stop right now.

// So we have no cleanup function.

// And so therefore our timer here

// will keep running even after this component has unmounted.
