//! 282. Setting Up a New Project: "Fast React Pizza Co."

//* npm create vite@4
//? or:
//* npm create vite@latest
//* project name: react-fast-pizza
//* npm i

//* npm i eslint vite-plugin-eslint eslint-config-react-app --save-dev

//* create: .eslintrc.json
// {
//     "extends": "react-app"
// }

//* then open vite.config.js
//! add import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), eslint()],   //! add eslint() inside the plugins array
// });

//* npm run dev
//*======================================================================================================================
//! 283. Application Planning (slides)

//*======================================================================================================================
//! 284. Setting Up a Professional File Structure

//* ui for reusable ui components: such as buttons, inputs, and so on.
//* services for reusable code for API interaction
//* utilities for helper functions: stateless helper functions that don't create any side effects,

//*======================================================================================================================

//! 285. A New Way Of Implementing Routes

//* React version 6.4 introduced a whole new way of defining routes and of working with React Router.
// So from now on we can use some powerful mechanisms

// inside React Router for fetching data

// into pages and for submitting data using forms,

// so all within React Router.

//* npm i react-router-dom@6

// import { createBrowserRouter } from "react-router-dom";

// this is a function now where we define all routes,

// and we do that by passing in an array of objects

// where each object is one route.
// createBrowserRouter();

//*======================================================================================================================

//! 286.  Building the App Layout
//? open: App, AppLayout, Header, CartOverview

//* We're implementing a global application layout using React Router.
//* The layout will work for both large and small screens.

//? Layout Structure
//* The layout will have a header with the company name, a link to the homepage, and possibly the username.
//* The main part of the page will be for the content itself (like the pizza menu or the current cart view).
//* There will be a cart overview at the bottom that is always visible on all pages.
//* It will display the number of items in the cart and a link to the cart.

//? Rendering Nested Routes
//* We render the content of a nested route inside another route using the outlet component.

//& Recap
//* We created an app layout component to use as the parent route of every other route in our application.
//* All other routes are now child routes of the app layout (nested routes).
//* Inside the parent route, we use the outlet component to render the current nested route.
//*======================================================================================================================

//! 287. Fetching Data With React Router "Loaders": Pizza Menu

//? open: App.jsx , Menu.jsx, apiRestaurant.js

//& Title: Implementing a Loader
//* The idea behind a loader is to create a function that fetches data from an API.
//* This loader function is provided to a route, which fetches the data as soon as the application navigates to that route.
//* Once the data has arrived, it is provided to the page component using a custom hook.

//? Fetching Menu Data
//* We start by fetching the menu data in three steps: create a loader, provide the loader, and provide the data to the page.
//* The data loader can be placed anywhere in our code base,
//* but the convention is to place the loader for the data of a certain page inside the file of that page.

//? Render as You Fetch Strategy
//* We implemented a 'render as you fetch' strategy.
//* React Router starts fetching the data at the same time as it starts rendering the correct route.
//* This is different from a 'fetch on render' approach where we render the component first and then start to fetch the data,
//* which can create data loading waterfalls.

//& Recap
//* React Router is responsible not only for matching components to URLs in the browser, but also for providing the necessary data for each page.
//* This is useful because URLs, pages, and the data that pages require are often tightly coupled together.
//* It is practical to get both the page and the data all in one place, nicely integrated within React Router.
//*======================================================================================================================

//! 288. Displaying a Loading Indicator
//? AppLayout.jsx  - loader.jsx - index.css

```  AppLayout.jsx
const navigation = useNavigation();
console.log(navigation);
const isLoading = navigation.state === "loading";

```;
//& Navigation State
//* The navigation state is universal for the entire application.
//* The loading indicator is placed in the app layout to render our loader whenever something in the app is loading.

//*======================================================================================================================
//! 289. Handling Errors With Error Elements
//? open: Error.jsx, App.jsx, apiRestaurant.js

//& Error Handling
//* Specify the error element in the parent route.
//* Errors in nested routes bubble up to the parent route.
//*======================================================================================================================

//! 290. Fetching Orders
//? open: order.jsx - Header.jsx  - searchOrder - App  - apiRestaurant
//& Implementing Order Search and Data Fetching
//* We aim to read the order ID from the URL and display all related data on our page.
//* The first step is to implement a search field in the Header Comp for inputting the order ID,
//* accessible from everywhere.

//? Creating a New Component  (SearchOrder)
//* We create a new component related to searching an order, which is part of the order feature.

//? Fetching Data from API
//* Next, we fetch data from the API using the existing getOrder function that receives the order ID (in apiRestaurant)
//* We create a loader function inside the Order component.
//* We connect the loader function with the route definition in the App, and then in the Order component itself.

//*==================================================================================

//!  291. Writing Data With React Router "Actions"
//? open: CreateOrder  - App
// we can use React Router's actions

// to write data or to mutate data on the server.

// So while the loaders that we used earlier are to read data,

// actions are used to write data or to mutate data.

// So a state that is stored on some server.

// Or in other words, actions allow us

// to manage this remote server state using action functions

// and forms that we then wire up to routes

// similar to what we did earlier with the loaders.
// from the project requirements

// that orders are made by sending a post request

// with the order data to the API.

// And so these actions and forms

// that we just talked about are ideal to create new orders.

//* we will create the form and action in CreateOrder comp

// So when we submit a new order,

// we need to submit the user data

// plus the selected pizzas which are stored in the cart.

// to make this form in CreateOrder work nicely with React Router,

// we need to replace this with a form component

// that React Router gives us.

// So let's replace this form with the uppercase form

// that we can again import from react-router-dom.
//^============================================================

// Then we could also specify the action

// where we could then write the path

// that this form should be submitted to.

// But this is not going to be necessary, because by default,

// React Router will simply match the closest route,

// so there's no need to write order/new,
//^============================================================
// as soon as we submit this special form (Form) here,

// that will then create a request that will basically

// be intercepted by this action function

// as soon as we have it connected with React Router.

// So here with this route in the App Comp

// So again, whenever this form here will be submitted,

// behind the scenes, React Router will then call

// this action function and it will pass in the request

// that was submitted.

// And so here we can then get access to that.
///^===========

//* connect the action to react router in App Comp

// so now whenever there will be a new form submission

// on this route right here , so on this path ( path: "/order/new",)

// then this action (createOrderAction) that we specified here will be called
//^=================

// what matters here is that it was really,

// really easy to get all this data

// out of the form here into this function.

// So notice how this entire form right here

// works completely without any JavaScript

// and without any onSubmit handlers, for example.

// So all we have is this form here,

// and then React Router takes care of the rest.

// We also didn't have to create any state variables here

// for each of these input fields,

// and we didn't even have to create a loading state.

// So React Router will do all of this automatically

// without us having to do anything.

// And the idea behind all this is to basically allow us

// to go back to the basics, so to the way HTML used to work

// back in the day before everyone started using JavaScript

// for the front end.

// So back then, we simply created HTML forms

// similar to this one, and then when we submitted them,

// a request was sent to the server,

// which then did the work that it needed to.

// So this here is now very similar.

// The only difference is that the data then gets

// into this action where we can then do our action.

// Well, just as the name says.

// The only thing that we need to do, again, to make this work,

// is to connect this URL here with the action.

//^======================

// Now next up we also want to get our cart data

// here into this action.

// So the cart is right here in this component,

// but we also now want to basically submit it in the form

// so that we can then get access to it in the action.
///^=====================
// we need to model the raw data in the action
// then we have the data now in the shape

// that we want it to be, and so now we can use it

// to create a new order.

// So we already, once again, have an API endpoint

// for that inside a function right here in APIRestaurant.

// So we have the createOrder function,

// which receives a new order object as an argument.

// then after receive the data from CreateOrder which will be the new Order

// then what we will want to do

// is to immediately redirect the page to the order/ID.

// So basically showing the user all the information

// about that new order
// but we cannot do it

// using the navigate function, because the navigate function

// comes from calling the useNavigate hook,

// but we cannot call hooks inside this function (action function)

// So hooks can only be called inside components.

// And so here we need to use another function,

// which is called redirect.

// So this is basically another function that is provided to us

// by React Router, which basically will just create

// a new response or a new request.

// I'm not really sure, but it's also not so important.

// What matters is that behind the scenes,

// all of this really works with the web API's

// standard request and response API's.

// And so if from here we return a new response,

// then React Router will automatically go

// to the URL that is contained in that new response.

// So again, this redirect here will actually create

// that response, which we can see right here

// in this TypeScript definition.

// But anyway, long story short, all we have to do here

// is to now specify basically this new URL.

// So order/slash and then newOrder.id,

// which will have been created on the server by the API.

// So again, this new order that we get here

// is already the new object that is coming back

// from the API as a response of calling this function here.

// And so this will then already contain the ID,

// which will then be placed here in the URL,

// which will then fetch that new order immediately

// from the server and display it here.

// So that's again what we implemented in the previous lecture.

// So let's try this now again, and nothing happened.

// So let's see here our network tab to see...

// Well, maybe we should clear all of this and try that again.

// So just to see if any request was created.

// And indeed, it actually was.

// Ah, and now it did work.

// So then we quickly saw the loader here,

// and then we just got our brand new order.

// So mine is here on May 1st, but you will see

// exactly the date that you are on right now.

// And these prizes here will be the same,

// because we are all using still this fake cart here,

// of course.

// Beautiful.

// So that worked really nicely.

// And so once again, this is really,

// really an amazing pattern for doing data manipulation

// and also for writing new data simply using these actions

// and React Router's form component.

// So without writing all the boilerplate code

// that we used to write earlier.

// So where we had to create state variables

// for all these inputs, then we had to handle

// the request here.

// We had to prevent default, and really all that stuff.

// But with this, we kind of go back to the roots.

// All we do is to have a form and then we submit this form,

// and then since we wired up this action that we created

// to this URL, then we catch that request

// right here in this action and do whatever work

// that we have to do.

// So in this case, we get all the data from the form,

// which is probably always going to be

// these two lines of code here,

// which might change in the future, I think,

// but for now, this is just how it works.

// Then we create our new order object

// and submit it with a post request

// to this createOrder right here.

// So the post request is really made here.

// So here in this fetch request,

// where we have this post method,

// this is where, actually, the new order is created.

// All right, then we get back that new order object

// and we redirect immediately to order/ the newOrder.id.

// So the ID of this newly created order is exactly this,

// and for you, it's going to be another one.

// So let's just copy this here.

// Let's go back to the homepage,

// and then we can of course paste this in here, hit enter,

// and then we will get exactly that order

// that we just created right here.

// So in other words, the user can now search

// for the order that they created.

// Great, so I hope that this made sense.

// And now all we have to do in the next lecture

// is some error handling here.
