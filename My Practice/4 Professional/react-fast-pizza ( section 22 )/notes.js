//! 282. Setting Up a New Project: "Fast React Pizza Co."

//* npm create vite@4
//? or:
//* npm create vite@latest
//* project name: react-fast-pizza
//* npm i

//* npm i eslint vite-plugin-eslint eslint-config-react-app --save-dev

//^ create: .eslintrc.json
// {
//     "extends": "react-app"
// }

//^ then open vite.config.js
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
//? open: App.jsx

//* React version 6.4 introduced a whole new way of defining routes and of working with React Router.

//~ inside React Router has some powerful mechanisms for:

//* fetching data into pages and for submitting data using forms,

//^ npm i react-router-dom@6

//^ import { createBrowserRouter } from "react-router-dom";

//* createBrowserRouter is a function to define all routes,
//* by passing in an array of objects

//* where each object is one route.
//^ createBrowserRouter();

//* element is the component that should be rendered when we go the url mentioned in the path.

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

//* nested
//*======================================================================================================================

//! 287. Fetching Data With React Router "Loaders": Pizza Menu

//? open: App.jsx , Menu.jsx, apiRestaurant.js

//& Title: Implementing a Loader
//* The idea behind a loader is to create a function that fetches data from an API.
//* This loader function is provided to a route,
//* which fetches the data as soon as the application navigates to that route.
//* Once the data has arrived, it is provided to the page component using a custom hook (useLoaderData)

//? Fetching Menu Data
//^ We start by fetching the menu data in three steps:
//* 1) create a loader inside the involved component (Menu)
//* 2) provide the loader to a route. (in App.js)
//* 3) provide the data to the page (menu component) by a custom hook (useLoaderData)

//* The data loader can be placed anywhere in our code base,
//* but the convention is to place the loader for the data of a certain page inside the file of that page.

//? Render as You Fetch Strategy
//* We implemented a 'render as you fetch' strategy.
//* React Router starts fetching the data at the same time as it starts rendering the correct route.
//* This is different from a 'fetch on render' approach where we render the component first and then start to fetch the data,
//* which can create data loading waterfalls.

//& Recap
//* React Router is responsible not only for matching components to URLs in the browser,
//* but also for providing the necessary data for each page.
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
//* The loading indicator is placed in the app layout
//* to render our loader whenever something in the app is loading.

//*======================================================================================================================
//! 289. Handling Errors With Error Elements
//? open: Error.jsx, App.jsx, apiRestaurant.js

//& Error Handling
//? in App.jsx:
//* Specify the error element in the parent route
//* Errors in nested routes bubble up to the parent route.
//*======================================================================================================================

//! 290. Fetching Orders
//? open: order.jsx - Header.jsx  - searchOrder - App  - apiRestaurant
//& Implementing Order Search and Data Fetching
//* We aim to read the order ID from the URL and display all related data on our page.
//* The first step is to implement a search field in the Header Comp for inputting the order ID,
//* accessible from everywhere.

//? Creating a New Component  (SearchOrder)  inside Header component
//* We create a new component related to searching an order, which is part of the order feature.

//? Fetching Data from API
//* Next, we fetch data from the API using the existing getOrder function
//* that receives the order ID (in apiRestaurant)
//* We create a loader function inside the Order component (that will call getOrder function inside)
//* We connect the loader function with the route definition ("/order/:orderId") in the App,
//* and then in the Order component itself.

//*==================================================================================

//! 291. Writing Data With React Router "Actions"
//? open: CreateOrder  - App  - apiRestaurant

//* React Router's actions can be used to write or mutate data on the server.
//* While loaders are used to read data, actions are used to write or mutate data.
//* In other words, actions allow us to manage remote server state using action functions
//* and forms that we wire up to routes, similar to what we did earlier with the loaders.

//? From the project requirements
//* Orders are made by sending a post request with the order data to the API.
//* These actions and forms that we just talked about are ideal to create new orders.

//? In CreateOrder Component
//* We will create the form and action.
//* When we submit a new order, we need to submit the user data
//* plus the selected pizzas which are stored in the cart.
//* To make this form in CreateOrder work nicely with React Router,
//* we need to replace this with a form component (Form) that React Router gives us.
//* Let's replace this form with the uppercase Form that we can import from react-router-dom.

//? About Action
//* We could also specify the action where we could then write the path
//* that this form should be submitted to.
//* But this is not necessary, because by default, React Router will simply match the closest route,
//* so there's no need to write order/new.

//^ <Form method="POST" action="/order/new">
//^ <Form method="POST"></Form>

//? About Form Submission
//* As soon as we submit this special form (Form) here,
//* that will then create a request that will basically be intercepted
//* by this action function as soon as we have it connected with React Router.
//* So here with this route in the App Component, whenever this form here will be submitted,
//* behind the scenes, React Router will then call this action function
//* and it will pass in the request that was submitted.
//* And so here we can then get access to that.

//& Connecting Action to React Router in App Component

//* Whenever there will be a new form submission on this route (path: "/order/new"),
//* the action (createOrderAction) that we specified will be called.

//? Form Submission
//* It was really easy to get all this data out of the form into this function.
//* This entire form works completely without any JavaScript and without any onSubmit handlers.
//* React Router takes care of the rest.
//* We didn't have to create any state variables for each of these input fields,
//* and we didn't even have to create a loading state.
//* The idea behind all this is to allow us to go back to the basics,
//* to the way HTML used to work before everyone started using JavaScript for the front end.
//* The only thing that we need to do to make this work is to connect this URL here with the action.

//? Cart Data
//* We also want to get our cart data here into this action.
//* The cart is right here in this component,
//* but we also now want to submit it in the form so that we can then get access to it in the action.

//? Modelling Raw Data in Action
//* We need to model the raw data in the action.
//* Then we have the data now in the shape that we want it to be,
//* and so now we can use it to create a new order.
//* We already have an API endpoint for that inside a function (createOrder) in APIRestaurant.
//* We have the createOrder function, which receives a new order object as an argument.

//? Redirecting to Order Page
//* After receiving the data from CreateOrder which will be the new Order,
//* we will want to immediately redirect the page to the order/Id.
//* We cannot do it using the navigate function,
//* because the navigate function comes from calling the useNavigate hook,
//* but we cannot call hooks inside this function (action function).
//* So here we need to use another function, which is called redirect.
//* This is another function that is provided to us by React Router,
//* which will just create a new response or a new request.
//* If from here we return a new response,
//* then React Router will automatically go to the URL that is contained in that new response.
//* All we have to do here is to now specify this new URL.
//* So order/newOrder.id, newOrder is which will have been created on the server by the API.

//& Implementing and Testing the Form Submission

//? Benefits of Using Actions and React Router's Form Component
//* This is an amazing pattern for doing data manipulation
//* and also for writing new data simply using these actions and React Router's form component.
//* It eliminates the need for writing all the boilerplate code that we used to write earlier.
//* We don't have to create state variables for all these inputs, handle the request, or prevent default.
//* All we do is to have a form and then we submit this form.
//* Since we wired up this action that we created to this URL,
//* we catch that request right here in this action and do whatever work that we have to do.

//? Form Data and New Order Creation
//* In this case, we get all the data from the form,
//* which is probably always going to be these two lines of code here.
//* Then we create our new order object and submit it with a post request to this createOrder right here.
//* The post request is really made here in this fetch request, where we have this post method.
//* This is where the new order is created.

//? Redirecting to the New Order
//* We get back that new order object and we redirect immediately to order/ the newOrder.id.
//* id is The ID of this newly created order,
//* The user can now search for the order that he created.

//? Next Steps
//* The next step is to handle errors.

//*==================================================================================================================

//! Concise way of above notes of 291 video:

//& Title: Writing Data With React Router "Actions"

//* React Router's actions are used for server data mutation.
//* Actions manage remote server state via action functions and forms.

//? Project Requirements
//* Orders are created by sending a post request with order data to the API.

//? In CreateOrder Component
//* A form and action are created for new orders.
//* The form submits user data and selected pizzas.
//* The form component from React Router is used for compatibility.

//* note createOrder exists in App comp

//? About Action
//* Actions can specify the path for form submission.
//* By default, React Router matches the closest route.

//? Form Submission
//* Form submission creates a request intercepted by the action function.
//* React Router calls this action function and passes in the request.

//^=================================================================

//& Connecting Action to React Router in App Component

//* The action (createOrderAction) is called for new form submissions on the route (path: "/order/new").

//? Form Submission
//* Data is easily retrieved from the form into the function.
//* The form operates without JavaScript or onSubmit handlers.
//* React Router handles state variables and loading state.

//? Cart Data
//* Cart data is also submitted in the form for access in the action.

//? Modelling Raw Data in Action
//* Raw data is modelled in the action for new order creation.
//* The createOrder function in APIRestaurant receives a new order object.

//& Title: Redirecting to Order Page

//* After data is received from CreateOrder, redirect to order/ID.
//* The navigate function isn't used due to hook restrictions in action functions.
//* Instead, use the redirect function from React Router to create a new response or request.
//* The new URL is specified as order/newOrder.id, where newOrder.id is created on the server.

//& Title: Implementing and Testing the Form Submission

//? Benefits of Actions and React Router's Form Component
//* This pattern simplifies data manipulation and writing new data.
//* It eliminates the need for boilerplate code, state variables for inputs, request handling,
//* and default prevention.
//* The form submits and the action catches the request.

//? Form Data and New Order Creation
//* Data is retrieved from the form and a new order object is created.
//* The new order is submitted with a post request to createOrder.
//* The post request is made in the fetch request, where the new order is created.

//? Redirecting to the New Order
//* The new order object is received and redirected to order/newOrder.id.
//* The ID of the newly created order is unique.
//* The user can now search for the order they created.

//*==================================================================================================================

//! 292. Error Handling in Form Actions

//& Title: Providing User Feedback During Form Submission
//? Open: CreateOrder - App

//* Provide user feedback during form submission by disabling the submit button.
//* Use the useNavigation hook to determine the navigation state (idle, loading, or submitting).
//* Create a variable isSubmitting that checks if navigation.state is equal to submitting.
//* Use isSubmitting to conditionally disable the button and set its text.
//* Use the required attribute in form fields for standard HTML5 form validation.
//* React Router encourages the use of HTML5 form validation.
//* Filling in the form is necessary for submission.
//* Upon clicking Order Now, the button is grayed out until order confirmation is received.

//^==========================================
//& Title: Error Handling in Form Submission

//* Errors might occur during form submission, such as an invalid phone number.
//* We can check the phone number in our action
//* and if it's not correct, we can inform our form that there is an error in this field.
//* We create an errors object and if the phone number is not valid,
//* we add a phone property to the errors object with an error message.
//* If there is at least one property in the errors object,
//* we return the errors object immediately and no new order is created on the server.
//* We don't get redirected to the other order page if there are errors.

//? Displaying Errors
//* In the component (createOrder) wired up with this action,
//* we can get access to the data returned from the action.
//* We use another custom hook, useActionData, to get the result.
//* If there is formErrors.phone, we render a paragraph with that text.
//* When we try this with an invalid phone number, we see our error message.

//*========================================================================================
