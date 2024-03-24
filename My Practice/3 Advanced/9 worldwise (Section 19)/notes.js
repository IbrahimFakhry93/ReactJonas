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

//& Title: Identifying Performance Issues

//? Ranked Tab
//* To identify poorly performing components, it's best to use the ranked tab in the React Profiler.

//? Memorization
//* There's no need to memorize this value here. If there's no component above this provider in the component tree that might cause it to re-render, memorization isn't necessary.

//^ open City.jsx and CitiesContextRed

//* look at the useEffect

//& Title: Optimizing Context Re-Renders with useCallback

//? Issue with getCity function
//* We left out the getCity function in the useEffect, which created an infinite loop of HTTP requests to our API. This is because the getCity function gets recreated every time it gets updated, causing the effect to rerun.

//? Understanding the Problem
//* The getCity function lives in the context and is created in the city's provider. This function updates the state each time it is executed, leading to an infinite loop. When the getCity function is called, it updates the state in the component, causing the component to re-render and the function to be recreated. Since the function is in the dependency array, getCity gets called again, updating the state and causing the effect to run over and over again.

//? Solution: useCallback
//* The solution is not to remove this from the dependency array, but to make this function stable so it is not recreated on each re-render. This can be achieved by using the useCallback hook. We create a new variable, which will be the new getCity function, and this will be the result of calling useCallback. The dependency array will need the currentCity.

//* This shows a real-world use case of the useCallback hook. It’s one of the situations where you will really need to reach for this tool. It’s important to remember that when we first introduced these hooks, this was exactly one of the three use cases we talked about: memorizing values that are used in the dependency array of another hook in order to prevent infinite loops.
// ```javascript
// const getCity = useCallback(function getCity(city) {
// function body
// }, [currentCity.id]);
