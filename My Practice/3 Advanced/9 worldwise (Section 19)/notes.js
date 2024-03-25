//! video 252.  Back to The "WorldWise" App:

//& Title: Identifying Performance Issues

//? Ranked Tab
//* To identify poorly performing components, it's best to use the ranked tab in the React Profiler.

//? Memorization
//* There's no need to memorize the value of citiesProvider in CitiesContext.
//* because if there's no component above this provider in the component tree that might cause it to re-render,
//* so memorization isn't necessary.

// <AuthProvider>
// <CitiesProvider>
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="product" element={<Product />} />
//       <Route path="pricing" element={<Pricing />} />
//       <Route path="login" element={<Login />} />
//     </Routes>
//   </BrowserRouter>
// </CitiesProvider>
// </AuthProvider>

//^ open City.jsx and CitiesContextRed

//* look at the useEffect

//& Title: Optimizing Context Re-Renders with useCallback

//? Issue with getCity function
//* We left out the getCity function in the useEffect,
//* which created an infinite loop of HTTP requests to our API.
//* This is because the getCity function gets recreated every time it gets updated,
//* causing the effect to rerun.

//? Understanding the Problem
//* The getCity function lives in the context and is created in citiesProvider Component.
//* This function updates the state (currentCity) each time it is executed, leading to an infinite loop.
//* When the getCity function is called, it updates the state in the citiesProvider Component,
//* causing the citiesProvider Component to re-render and the function to be recreated.
//* Since the function is in the dependency array, getCity gets called again (because it's re-created in the citiesProvider component),
//* updating the state and causing the effect to run over and over again.

//? Solution: useCallback
//* The solution is not to remove this from the dependency array,
//* but to make this function stable so it is not recreated on each re-render.
//* This can be achieved by using the useCallback hook.
//* We create a new variable, which will be the new getCity function,
//* and this will be the result of calling useCallback. The dependency array will need the currentCity.

//* This shows a real-world use case of the useCallback hook.
//* It’s one of the situations where you will really need to reach for this tool.
//* It’s important to remember that when we first introduced these hooks,
//* this was exactly one of the three use cases we talked about:
//* memorizing values that are used in the dependency array of another hook in order to prevent infinite loops.
// ```javascript
// const getCity = useCallback(function getCity(city) {
// function body
// }, [currentCity.id]);

//*==========================================================================

//! video 253.  Bundle Size:
//& Title: Code Splitting and Lazy Loading in React

//? Code Splitting
//* There are many ways to split the bundle and lazily load components.
//*  The most common one is to split the bundle at the route level or, in other words, at the page level.
//*  We can take all the components that represent a page and load each of them separately.

//? Pages
//* The pages in our application are Homepage, Product, Pricing, Login, AppLayout, and PageNotFound.

//? Lazy Function
//* The lazy function is a feature built into React.
//* Vite or Webpack will automatically split the bundle when they see this lazy function.

//? Building the Bundle
//* We can create our JavaScript bundle using the command 'npm run build'.
//* This bundle can then be deployed on a web server.
//* Some chunks might be larger than 500 kB after minification.
//* In such cases, consider using dynamic import() to code-split the application.

//? Loading Spinner
//* While these pages are being loaded in the background, we want to display a loading spinner.
//* This is where React's Suspense API comes into play for the first time.

//? Suspense API
//* Suspense is a concurrent feature that is part of modern React,
//* and that allows certain components to suspend, which basically means that it allows them to wait for something to happen.
//* In our case, these lazy components are going to be suspended while they're loading.
//* We can then use the built-in Suspense component to show a fallback, which, in our case, is going to be that loading indicator.

// ```javascript
// <Suspense fallback={<div>Loading...</div>}>
// Routes go here
// </Suspense>

//^=======================================================================================
//& Recap

//? Lazy Loading
//* With **lazy loading**, each component is loaded as needed, which automatically splits the bundle into separate chunks.

//? Bundlers
//* **Vite** or **Webpack** (the bundlers) take care of this automatic splitting.

//? Tools
//* This feature is powered by both the bundler and the `lazy` function provided by **React**,
//*  plus the `import` function provided by **JavaScript**.

//? Suspense Component
//* The **Suspense** component from React is also used in this process.
//* It allows certain components to "suspend" their rendering while they're waiting for some data to load,
//* providing a better user experience.
