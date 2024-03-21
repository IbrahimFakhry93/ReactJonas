//! video 244. The Profiler Developer Tool

import { useState } from "react";

//& Title: Profiler Tool

//* The profiler tool is used to analyze renders and re-renders.

//* inspect => record => change anything in UI (ex. type in search bar) => stop recording => frame

//? Rendered Components
//* We can see which components have rendered.

//? Reasons for Rendering
//* a state update, a context update, or a parent re-rendering.

//? Render Duration
//* We can also measure how long each render took.

//*================================================================================================

//! video 245. A Surprising Optimization Trick With children:

//* simple performance optimization technique which leverages the children prop
//* in order to prevent some components from re-rendering.

//? open Test.js  , App.js (place Test or Test2 in List comp in App)

//^====================

//? open PostContext.js

//* when search on search bar, Main comp and Posts comp won't be re-rendered
//* because they have been passed a s children to PostContext,
//* but Lists and Header will be re-rendered because they consume contexts and context is updated

//*================================================================================================
//! video 247. Memo in Practice:

//? App-memo.js - work in Archive comp

//* When search on search bar while archive is shown,
//* that typing in search bar, re-render the App and also will render the archive comp because it's a child of Parent comp (App)
//* so archive component is perfect candidate for memoization

// It re-renders very often and it does so with the same props.

// So the only prop that it has is the show prop,

// which is always false

//* always showing archive even with memo will take some time, why?
// because memorizing a component has nothing to do

// with updating state.

// So memorizing only affects the props.

// So that list still has to be rendered

// and so that still takes time
