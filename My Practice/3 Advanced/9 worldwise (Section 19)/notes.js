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

//*==========================================================================

//! video 253.  Bundle Size:

//? App.jsx
// there are many ways in which we can split the bundle,

// so in which we can lazily load our components.

// But the most common one is to split the bundle

// at the route level or, in other words, at the page level.
// So basically what we're gonna do is to take

// all the components that represent a page

// and load each of them separately,

// let's first identify our pages.

// So it's the Homepage, the Product, the Pricing, the Login,

// then here the application itself, which is an AppLayout.

// And finally, PageNotFound.

// So those are our six pages.

// this lazy function here is actually a feature

// that is built into React.

// And then Vite or Webpack, they will automatically split

// the bundle when they see this lazy function.

//^============
//! to see the bundles
//? npm run build
// which will then create our JavaScript bundle.

// And so we can then take this bundle

// and actually deploy it on a web server.

// (!) Some chunks are larger than 500 kBs after minification. Consider:
// - Using dynamic import() to code-split the application
// dist/assets/index-2f0603c0.css   29.93 kB │ gzip:   5.05 kB
// dist/assets/index-597d341e.js   513.65 kB │ gzip: 148.03 kB

//^==========
// now we also want to display a loading spinner

// while we go from one page to the other one.

// So basically, while these pages are gonna be loaded

// in the background.

// this is now where the React's Suspense API

// comes into play for the first time.

// Suspense

// is a concurrent feature that is part of modern React,

// and that allows certain components to suspend,

// which basically means that it allows them to wait

// for something to happen.

// And in our case right here,

// basically these lazy components are gonna be suspended

// while they're loading.

// And so we can then use the built-in Suspense component

// to show a fallback, which, in our case,

// is gonna be that loading indicator that I just mentioned.

// add Suspense Element above routes in App.jsx

//^=====
// recape:
// recap here

// before we actually try this out.

// So here with this lazy loading, we will now load

// each of these components here as we need them,

// which will basically automatically split

// our bundle into separate chunks.
// And it is Vite, in our case here,

// that's gonna take care of that.

//^========
// nice feature.

// And yeah, again, powered by both the bundler,

// so Vite or Webpack,

// and the lazy function provided by React

// plus the import function provided by JavaScript,

// and then also this Suspense component.
