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

//* duration need to be turned into state, to update it by clicking on button

// to use the useEffect Hook

// to keep this duration state here in sync

// with all these other state variables.

// and this is a perfectly fine use case for the useEffect Hook,

// because there are so many state variables here involved,

// that it just becomes very impractical,

// and even unreadable and confusing to do it in a way

// that I just demonstrated you as this:
// onChange={(e) => {

//     setSets(e.target.value);
//     setDuration((number * sets * speed) / 60 + (e.target.value - 1) * durationBreak)

// }}

// useEffect(() => {
//   setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
// }, [number,sets,speed,durationBreak]);

//^==================
// So these buttons now work.

// And again, in order to do that,

// we needed to transform this duration here

// into a state variable.

// And so then, to update that state variable in an easy way,

// we created this effect which lists for the state change

// in any one of these four state variables.

// And if that happens,

// it will then calculate our new duration.

// And so, here, we have the classic example

// of using an effect to update state

// based on another state update,

// which again, is not always desirable

// and it's not always the best solution.

// But here, I think it is perfectly fine

// because otherwise, we would have to spread this logic here

// into four different event handler functions

// which wouldn't be really nice.

//^===========

//* downside of using effect
// So, only updating once, which we would think

// only gives us one render.

// But actually, we do have two renders.

// So the calculator is rendered.

// And then again, and so this is exactly the problem

// of the useEffect Hook to update states.

// So, right here.

// So basically, this first state update

// is this number of sets updating,

// which will then trigger this effect here.

// But the effect only runs

// after the render has already happened.

// And so then when we set the state here again,

// we get a second render.

// So React is not able to batch these two renders in one,

// simply because, again, the effect actually runs

// way after the render has already happened.

// And so just be aware of that issue

// whenever you do something like this.

// So, whenever you can, again, avoid this.

// But when you have so many state variables here

// that influence the value of another state,

// then you can do this.

//*======================================================================================================

//! 258. Using Helper Functions In Effects

//* when add PlaySound to useEffect, it causes a flicker

//* Problem:

// So each time that we click here on this button,

// it will set the duration and it will play the sound.

// Now updating the state will

// of course re-render the component,

// which will recreate this function here.

// So React will see a brand new function.

// And since this function is part of the dependency array

// of this effect, it will then run this effect as well.

// And so that's where the duration is

// then set again but using the current values,

// which actually haven't changed.

// So when we click here, none of these four values changes.

// And so when the duration is then set here

// for the second time, it will use these values again,

// which will make it so that the duration

// immediately goes back.

// And so that's why we see that flashing.

// So for a fraction of a second it'll go to 53,

// but then immediately it'll go back.

// So saw that here.

// So that is the reason why this is happening

// and also why we kind of hear the sound twice.

// So we hear it here

// and we then hear it again from this effect.

//*===========================================================================

//! closures in effect:

// when we first learned about use effect

// maybe you have wondered why use effect actually

// needs the dependency array

// in order to know when it should execute the effect.

// So why can't the effect not simply rerun automatically

//^ closure definition:

// So in JavaScript, a closure is basically the fact

// that a function captures all the variables

// from its Lexile scope.

// So from the place that it was defined

// at the time that the function was created.

// So again, whenever a function is created, it closes

// over the effect of that Lexile environment at the time.

// And so it'll always have access to the variables

// from the place where it was defined.So in JavaScript, a closure is basically the fact

// that a function captures all the variables

// from its Lexile scope.

// So from the place that it was defined

// at the time that the function was created.

// So again, whenever a function is created, it closes

// over the effect of that Lexile environment at the time.

// And so it'll always have access to the variables

// from the place where it was defined.
