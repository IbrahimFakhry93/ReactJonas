//! video 244. The Profiler Developer Tool

import { useCallback, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";

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
//* because they have been passed as children to PostContext,
//* but Lists and Header will be re-rendered because they consume contexts and context is updated

//*================================================================================================
//! video 247. Memo in Practice: memoization of components

//? App-memo.js - work in Archive comp

//* When search on search bar while archive is shown,
//* that typing in search bar, re-render the App (bec. update its state searchQuery) and also will render the archive comp
//* because it's a child of Parent comp (App)
//* so archive component is perfect candidate for memoization

//! why good candidate for memoization?
//* It re-renders very often and it does so with the same props.
//* So the only prop that it has is the show prop, which is always false

//*? always showing archive even with memo will take some time, why?
//* because memorizing a component has nothing to do
//* with updating state (posts). So memorizing only affects the props.
//* So that list still has to be rendered and so that still takes time

//*================================================================================================
//! video 249. useMemo in Practice: Memoization of Objects (Props as Objects)

//? App-memo, archiveOptions object
//* The callback function inside useMemo performs work on the initial render.
//* The result is then stored in memory (cache) so that React can remember it across re-renders.
//* In this case, we're returning an object, but useMemo could also handle more intensive calculations.
//* The dependency array determines when this calculation is executed again, similar to the useEffect hook.

function App() {
  const archiveOptions = useMemo(() => {
    return {
      title: "Archive posts",
      show: false,
    };
  }, []);

  return null;
}

//? Stale Closure
//* This function (useMemo callback function) is a stale closure because it was created initially
//* and now remembers all the variables that are referenced inside of it
//* as they were at the time that the function was created.

//? Create dependencies for useMemo
function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function App2() {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );

  //? UseMemo with dependency when Object contains stateful value
  //* By specifying an empty dependency array, this value (archiveOptions) will only be computed once
  //* in the beginning and will then never change, so it will never be recomputed.
  //* so we need to add the stateful value (posts.length) to the dependency array
  const archiveOptions2 = useMemo(() => {
    return {
      title: `Archive posts ${posts.length}`,
      show: false,
    };
  }, [posts.length]);
  return (
    <>
      <p>No. of Posts: {posts.length}</p>
    </>
  );
}

//? Archive Component Re-rendering
//* Whenever the archive is open, it will take a long time to re-render the application when we add a new post.
//* In the last state update, the archive had to re-render because our object here was recreated.
//* So we added a new post and therefore, posts.length was changed,
//* and then this object here became a new object, making it so that a prop changed
//* which, in turn, triggered the archive to be re-rendered as a result, even though it is memoized.

//*===================================================================

//! video 250. useCallback in Practice: Memoization of Functions

//? App-memo, handleAddPost function
//* Without memoization of onAddPost function prop for Archive component,
//* changing the dark mode will re-render the App,
//* then it will re-create this onAddPost function prop
//* causing re-render of the slow component (Archive).

function App3() {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const handleAddPost = useCallback(function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }, []);

  //? Memoization Considerations
  //* Some teams choose to wrap each function and value into a useCallback or a useMemo,
  //* but that might do more harm than good in most cases. Using useCallback has a cost as well.
  //* React needs to run this function and store it in memory.
  //* It's best to find slow components that have a visible bad performance and only optimize those.
}

//? Pass Setter Function from useState to Archive Component
//* Even though we did not memoize setIsFakeDark, the memoization is still working.
//* This is because React guarantees that the setter functions of the useState hook always have a stable identity,
//* which means they will not change on renders.
//* We can think of these state setter functions as being automatically memoized.
//* This is also why it's completely okay to omit them from the dependency array of all these hooks,
//* so from useEffect, useCallback, and useMemo.

//*===================================================================

//& Title: Optimizing Context Re-Renders

//? App.js - PostContext.js
//* We can use a few strategies to prevent wasted renders related to the context API.
//^ It's important to understand that you only need to optimize your context if three things are true at the same time:
//* 1. The state in the context changes all the time.
//* 2. The context has many consumers.
//* 3. The app is actually slow and laggy.

//? Why components consumed context re-rendered?
//* The reason is that the value here is an object. And this PostProvider is a child element of the App component.
//* Therefore, when the App component re-renders, then this post provider re-renders as well,
//* and therefore, this object (value) will be recreated.
//* If this object (value) is recreated, it means that the context value has changed and therefore,
//* all the components that consume that context are going to be re-rendered.
//* The solution for that is to memorize this object.

//? Multiple Variables in Context Value
//* If you have many components that are subscribed to a context,
//* it will become problematic to have so many different variables inside the context value.
//* Because as soon as you change one of these states, for example, the post or the search Query,
//* then all of the components that read at least one of these five values will get re-rendered.
//* This is not ideal and it's the reason why we usually create one context per state.
//* So we would have one post context and one search Query context.
//* In that situation, whenever we updated, for example, the search Query,
//* then all the components that consume the posts would not get re-rendered.
//* Some people even take it one step further. So inside the search Query context,
//* you could even create one context only for the search Query and one only for the state, update or function.
//* Or if you're using a reducer, you could then create one context for the state and one context for the dispatch function.
