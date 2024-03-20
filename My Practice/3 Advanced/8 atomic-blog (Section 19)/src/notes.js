//! video 244. The Profiler Developer Tool

import { useState } from "react";

//& Title: Profiler Tool

//* The profiler tool is used to analyze renders and re-renders.

//? Rendered Components
//* We can see which components have rendered.

//? Reasons for Rendering
//* We can understand why they're rendered.
//* This could be due to a state update, a context update, or a parent re-rendering.

//? Render Duration
//* We can also measure how long each render took.

//*================================================================================================

//! video 245. A Surprising Optimization Trick With children:

//* simple performance optimization technique which leverages the children prop
//* in order to prevent some components from re-rendering.

//? open Test.js  , App.js (place Test or Test2 in List comp in App)

//^=======================================================================

//? open PostContext.js

//* when search on search bar, Main comp and Posts comp won't be re-rendered
//* because they have been passed a s children to PostContext,
//* but Lists and Header will be re-rendered because they consume contexts and context is updated
