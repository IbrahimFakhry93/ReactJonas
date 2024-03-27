//! 256. CHALLENGE #1: Fix Performance Issues in "Workout Timer"
//* Memoize Components: Calculator, ToggleSound ( to solve children render when Parent (App) re-renders)

import { useEffect } from "react";

//* Memoize Workout object as it's a prop to Calculator,
//* causing Calculator to re-render when App Parent Component re-renders,
//* causing a change (re-creation) of Prop (workout) because it's object
//* causing Calculator to re-render
//* move formatTime out of App, to avoid re-creation of FormatTime in every App re-render

//*======================================================================================================

//! 257. Setting State Based on Other State Updates

//& Title: Setting State Based on Other State Updates

//? Duration (Derived State)
//* The 'duration' needs to be turned into a new piece of state, to update it by clicking on a button.
//* We want to calculate this duration each time we click on one of these buttons,
//* but also each time that one of these state variables here changes.

//? Using useEffect Hook
//* We use the useEffect Hook to keep this 'duration' state in sync with all these other state variables updates.
//* This is a perfectly fine use case for the useEffect Hook, because there are so many state variables involved,
//* that it just becomes very impractical, and even unreadable and confusing to do it in another way.

```Impractical solution
onChange={(e) => {
  setSets(e.target.value);
  setDuration((number * sets * speed) / 60 + (e.target.value - 1) * durationBreak)
}}

practical solution
useEffect(() => {
  setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
}, [number,sets,speed,durationBreak]);
```;

//^==================
//& Title: Using useEffect to Update State Based on Other State Updates

//? Transforming 'duration' into a State Variable
//* In order to make the buttons work, we needed to transform 'duration' into a state variable.
//* We created an effect that listens for the state change in any one of these four state variables.
//* [number,sets,speed,durationBreak]
//* If that happens, it will then calculate our new duration.

```javascript
useEffect(() => {
  setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
}, [number,sets,speed,durationBreak]);
```;

//^===========

//* downside of using effect
//& Title: Understanding useEffect Hook in State Updates

//? Initial Render
//* Initially, we might think that updating once only gives us one render.
//* But in reality, we do have two renders. The calculator comp is rendered, and then again.

//? Problem with useEffect Hook
//* The problem with the useEffect Hook to update states is that it only runs after the render has already happened.
//* So, when we set the state here (duration) again, we get a second render.

```javascript
useEffect(() => {
  setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
}, [number,sets,speed,durationBreak]);
```;

//*======================================================================================================

//! 258. Using Helper Functions In Effects

//& Title: Understanding useEffect and its Dependencies
//^ open Calculator.js

//? Defining playSound Function
```const playSound = function () {
    if (!allowSound) return;
    const sound = new Audio(clickSound);
    sound.play();
  }; ``` //? Using playSound in useEffect //* so playSound should be added to useEffect dependency array //* playSound is a reactive value because it has state variable (allowSound)
``` useEffect(() => {
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak); 
    playSound();
  }, [number, sets, speed, durationBreak, playSound]);```;
//!  Adding playSound to useEffect causes a flicker problem

//? Understanding the Flicker Problem
//* Each time we click the increment button (+) or dec btn (-), it sets the duration state and plays the sound.
//* Updating the state (duration) re-renders the calculator component, which recreates playSound function.
//* React sees a new function (playSound), and since it's part of the dependency array of the effect, it runs the effect.
//* The duration is then set again using the current values, which haven't changed.
//* When we click the button, none of these four values changes.
//* So, the duration is set here for the second time,
//* it uses these values again, causing the duration to immediately revert.
//* This is why we see the flashing.
//* For a fraction of a second, it goes to 53, but then immediately goes back.
//* This is also why we hear the sound twice. We hear it once when we click the button, and then again from this effect.

//? Solution: wrap the playSound in useCallback function to memoize playSound
//? or: to move playSound out of the calculator component, but here it can't because
//? it has a stateful value (allowSound)
//? or: move playSound func inside effect, but it doesn't work also because we need this function
//? in other event handlers like handleInc and handleDec, so we have to memoize playSound function
//? so then the function will not be recreated between these renders.

```const playSound = useCallback(
    function () {
      //* it's a reactive value because it has allowSound
      if (!allowSound) return;
      const sound = new Audio(clickSound); //* Audio is a browser feature.
      sound.play();
    },
    [allowSound]
  );```;

//! but here another problem, that when we click on sound icon, it will reset the allowSound
//! that will recreate PlaySound func again , that will cause the useEffect to reset the duration again

//! solution:
//? Synchronizing Sound Play with Duration State

//* We want the sound to play whenever the duration changes. That's why we placed this function in three places.
//* However, there is a better, more clear and intentional way of doing that.
//* We can simply synchronize this side effect of playing the sound with the duration state.

//^===================
//^ open Calculator2.js

//* synchronize this side effect of playing the sound with the duration state update
```useEffect(() => {
    const playSound = function () {
      if (!allowSound) return;
      const sound = new Audio(clickSound); 
      sound.play();
    };
    playSound();
  }, [duration, allowSound]);```;

//?: Managing Side Effects in useEffect

//* This time, we were able to finally move the helper function into the effect.
//* This is a great demonstration that we should have one effect for each side effect that we want to have.
//* In other words, this effect here should only be responsible for setting the duration, not for setting the duration and playing a sound.
//* Instead, we create one effect that is responsible for playing the sound, and we do that whenever the duration changes.

//*===========================================================================

//! closures in effect:
//^ open Calculator2.js
//* useEffect to explain stale closure
//   useEffect(() => {
//     console.log(sets, duration);
//     document.title(`Your ${number}-exercises workout`);
//   }, [number, sets, duration]);

//& Title: Understanding useEffect and Closures in JavaScript

//? Subtitle: Why useEffect needs a dependency array
//*  When we first learned about useEffect,
//*  we might have wondered why useEffect actually needs the dependency array in order to know when it should execute the effect.
//*  Why can't the effect not simply rerun automatically?

//& Title: Closure Definition
//* In JavaScript, a closure is basically the fact that a function captures all the variables from its Lexile scope.
//* So from the place that it was defined at the time that the function was created.
//* Whenever a function is created, it closes over the effect of that Lexile environment at the time.
//* And so it'll always have access to the variables from the place where it was defined.
