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
//! video 249. useMemo in Practice:  memoization of objects (props as objects)
//? App-memo, archiveOptions object
// so this callback function here is basically

// to work that should be performed on the initial render

// and which result should be then stored in the cache,

// so should be stored in memory

// so that React can remember it across re-renders.

// in this case, all we're doing

// is to return an object here, but there could be also

// some more intensive calculation going on,

// which is the reason why useMemo takes in a function

// and not just a value.

// the dependency array, which will basically determine

// when this whole calculation here is executed again.

// So just like the useEffect hook
function App() {
  const archiveOptions = useMemo(() => {
    return {
      title: "Archive posts",
      show: false,
    };
  }, []);

  return null;
}

// by specifying an empty dependency array here, that means

// that this value (archiveOptions) will only be computed once in the beginning

// and will then never change, so it will never be recomputed.

// And so this should actually already have fixed it.
//! stale closure:

// a stale closure because this function (useMemo callback function) here

// was created initially and from there on,

// it now remembers all the variables that are referenced

// inside of it as they were at the time

// that the function was created.

// So that's what a closure is,

// and it is a stale closure because it never run again,

// and so it is still remembering the old values.

//^=======================

//* create dependencies for useMemo:
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
  const archiveOptions = useMemo(() => {
    return {
      title: "Archive posts",
      show: false,
    };
  }, []);

  const archiveOptions2 = useMemo(() => {
    return {
      title: `Archive posts ${posts.length}`,
      show: false,
    };
  }, [posts.length]);
  return null;
}

// whenever this archive is open, it will then take a long time

// to re-render the application when we add a new post, right?

// So let's check that.

// And now I will just call something very short

// so that we don't get all those re-renders in the profiler.

// And then notice how that took some time.

// And so indeed, we can see that here

// in this last state update, where now the archive,

// of course, still had to re-render because now this time,

// our object here actually has been recreated.

// So we edit a new post and therefore,

// posts.length was changed, and so then this object here

// became a new object, making it so that a prop changed

// which, in turn, triggered the archive to be re-rendered

// as a result, even though it is memoized.

//*===================================================================

//! video 250. useCallback in Practice:  (memoization of functions)
//? App-memo, handleAddPost function
//* without memoization of onAddPost function prop for archive comp
//* changing the dark mode will re-render the App, then it will re-create this onAddPost function prop
//* causing re-render of the slow component (Archive)

function App3() {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const handleAddPost = useCallback(function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }, []);
}

// some teams, for some reason,

// choose to wrap each and every function and value

// into a useCallback or a useMemo,

// but that actually makes very little sense

// and it might even do more harm than good

// in most of these cases.

// Using one of these functions here, like useCallback,

// actually has a cost as well.

// React needs to run this function

// and needs to store the function in memory.

//  it's best to just find some slow components

// that do actually have a visible bad performance

// and then using the tools that we just learned about

// to only optimize those.

//^=======================

//? pass setter function that return from useState tp archive Comp
//? such as: setIsFakeDark

// so the memorization is indeed still working,

// so even though we did not memorize setIsFakeDark.

// Why do you think that is?

// Well, basically React guarantees that the setter functions

// of the use state hook always have a stable identity,

// which means that they will not change on renders.

// We can basically think of these state setter functions

// as being automatically memorized.

// And in fact, this is also the reason

// why it's completely okay to omit them

// from the dependency array of all these hooks,

// so from useEffect, useCallback, and useMemo.

//*===================================================================

//! video 251. Optimizing Context Re-Renders

//? App.js - PostContext.js

// take a look at a few strategies

// that we can use

// in order to prevent wasted renders related

// to the context API.

// it's actually very important to understand

// that you only need to optimize your context

// in case that three things are true at the same time.

// So first of all, the state

// in the context needs to change all the time.

// Second, the context has many consumers

// and third, and probably most importantly

// the app is actually slow and laggy.

// we would expect the same to also happen

// in the list.

// However, the list did actually re-render

// because the context changed.

// Well, that's strange, right?

// Because this state right here with the dark mode

// actually has nothing to do with context.

// But still all the components that consume the context

// did now re-render because of context.

// So the same thing here

// and the same thing in the archive, as well.

// And just keep in mind that we are now working

// with a different app where we no longer

// have the archive memorized, remember?

// So we memorized the archive earlier

// but now we are back in the other APP.js file.

//! why components consumed context re-rendered?
// the reason is that

// this value right here is an object, right?

// And this post provider is a child element

// of the app component.

// And so therefore, when the app component re-renders

// then this post provider re-renders, as well

// and therefore, this object will be recreated.

// And so, if this object will be recreated

// it means that the context value has changed

// and therefore, all the components that consume that context

// are going to be re-rendered.

// All right, so that's the reason why here we see

// that the context has changed

// because actually it did change because this value here

// so this object did update.

// So, the solution for that is to memorize this object.

//^ ================

// if you have many, many components

// that are subscribed to a context

// so that read data from a context

// it will become problematic

// to have so many different variables

// inside the context value.

// Because as soon as you change one of these states

// for example, the post or the search Query

// then all of the components that read

// at least one of these five values will get re-rendered.

// And so, again, this is not ideal

// and it's the reason why in the beginning I told you

// that we usually create one context per state.

// So we would have one post context

// and one search Query context.

// And so, in that situation, whenever we updated

// for example, the search Query, then all the components

// that consume the posts would not get re-rendered.

// While in this case, all of them are

// because it is enough for one value here to change

// to re-render the entire thing.

// Now, I'm not gonna do that right here, but again

// you can basically create one context

// for this part and one context for this.

// And then, what some people do

// is to even take it one step further.

// So inside the search Query context

// you could even create one context only for the search Query

// and one only for the state, update or function.

// Or if you're using a reducer

// you could then create one context

// for the state and one context for the dispatch function.

// And again, I cannot really show you that here

// in this example because it'll depend so much

// on your own situation

// so, on your own application that you're building.

// So these were just a few general guidelines

// that I hope will become useful for you in the future.
