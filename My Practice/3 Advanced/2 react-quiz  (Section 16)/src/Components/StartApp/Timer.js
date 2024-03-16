import { useEffect } from "react";

function Timer({ dispatch, remainingSeconds }) {
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  //* useEffect here because we want the timer to start once the timer mount and it will mount in the status: 'start'
  //* if we put useEffect in the App, it will start when the App is mounted , when the whole application starts not the quiz itself
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
      <p class="timer">
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

//? Importance of Cleanup Function
//* When the `Timer` component unmounts
//* (for example, if the user navigates away from the page where the timer is running),
//* the interval you've set up with `setInterval` keeps running. This is because `setInterval` operates independently of React.

//* If the interval keeps running after the component has unmounted,
//* it will continue trying to update the state of a component that no longer exists in the DOM.
//* This can lead to memory leaks and strange behavior in your app.

//* The cleanup function returned by `useEffect` is run when the component unmounts,
//* and also before the component re-renders. In this case, it clears the interval,
//* effectively stopping the timer when the component is no longer in use.

//* Without this cleanup function, the interval would keep running indefinitely,
//* even after the `Timer` component has unmounted.
//* This could lead to errors and performance issues.
