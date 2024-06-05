//! 262. Creating a Reducer: Bank Account

//? open:  store-v-1.js
//* model the bank account
//* but simpler. So without an account number
//* only with a balance, a loan and also a loan purpose.

//^===================================================================================

//* the goal of the reducer function is to calculate the new state based on the:
//* 1) current state.
//* 2) and on the received action.

//! it's also important to remember
//* that reducers functions are not allowed to modify the existing state
//* and they're also not allowed to do any asynchronous logic or other side effects.

//? one thing that is actually different
//* Difference between this reducer in redux and the reducer in the useReducer hook
//* is that usually we directly pass in the initialState as the default state.

//^======================================================================================
//* back in the day action types used to be written all uppercase.
//* For example, like this. Like SET_BALANCE or maybe DEPOSIT_ACCOUNT.

//*====================================================================================================================================
//! 263. Creating a Redux Store
//* npm i redux

//? open store-v-1.js
//* 1) import { createStore } from "redux";
//* 2) const store = createStore(reducer);
//* store.dispatch({ type: "account/deposit", payload: 500 });

//? open index.js:
//* import "./store";  to run the code of store.js in index.js
// console.log(store.getState());

//*====================================================================================================================================

//! 264. Working With Action Creators

//* in Redux we don't always manually write the type like this,
//* store.dispatch({ type: "account/deposit", payload: 500 });
// console.log(store.getState());

//? but instead we create something called an action creator to automate this process.

//* Action creators are nothing more than simply functions, that return actions.
//* So they are really not a Redux thing, and Redux would work perfectly fine without them,
//* but they are a useful convention

//* we are going to create one action creator for each possible action.

//& Action Creators for account:
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
//* in Redux we don't dispatch actions directly to the reducer but really to the store.
//^   store.dispatch(deposit(500));

//*====================================================================================================================================
//! 265. Adding More State: Customer

// we need to do is to combine all the reducers that we have in order to create
// one so-called root reducer.

// const rootReduce = combineReducers({
//     account: accountReducer,
//     customer: customerReducer,
//   });

// const store = createStore(rootReducer);
//*===================================================================

//! 266. Professional Redux File Structure: State Slices

//? Traditional Redux Structure
//* Initially, Redux developers created separate folders for reducers and actions,
//* with one file per reducer/action.
//* This led to a lot of jumping around in the code base.

//? Modern Redux Structure
//* The modern approach is to create a folder for each feature (e.g., account, customer),
//* making the code more organized.

//? Creating a Slice
//* A slice is a part of the total state in the store.
//* For each feature, we take one slice of that state.
//* In each slice, we co-locate as much Redux logic as possible in one file.
//* This includes the reducer, action creators, and initial state.
//* We then export these and put them back together in the store,
//* reducing the need to jump around between files.

//! store-v-1 => store-v-2

//*=============================================================================================================

//! 267. Back to React! Connecting our Redux App With React

//? open index.js

//* npm i react-redux
//* import {Provider} from "react-redux"
//* import store from "./store";

//* wrap our entire application in Provider just like context-API
//* pass store as prop to provider

```
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);```//* that will create the new customer. //? open: CreateCustomer.js component. // import { useDispatch } from "react-redux"; // import { createCustomer } from "./customerSlice"; //* need to complete handleClick logic //* in this function where we will want to dispatch now an action

// const dispatch = useDispatch();
// function handleClick() {
//   dispatch(createCustomer(fullName, nationalId));
// }

//* learn how to dispatch actions to the Redux store from within React components in next lecture

//*=============================================================================================================

//! 268. Dispatching Actions from Our React App

//* Redux implements performance optimizations behind the scenes, similar to those in the Context API.
//* When the store changes, the subscribed component (ex. customer) re-renders.
//* The useSelector hook in Redux creates a subscription to the store.

// const customer = useSelector((store) => store.customer.fullName); //* customer here is the name of customerReducer (open store.js)
//? Using useSelector Hook
//? open customer.js

//* This behavior is similar to the Context API,
//* which broadcasts global state into every component that wants to read it.

//? Context API Similarity
//* The application is aware of the Redux store,
//* allowing every component to read data from the store and dispatch actions.

//^=====================================================================

//* using the useDispatch hook, to get access to the dispatch function

//! const dispatch = useDispatch();
//! then pass action creator to dispatch function
//! dispatch(actionCreator)

//^====================================================================

// let's actually hide the form

// because once the customer has been created,

// there's no need to display that form anymore.

//* so open: App.js: where all components live
// we need, again,

// to get the information,

// so to get the current state from the store

// in this component.

// So that's easy enough, we already know how that works.

// So we use useSelector,

// which receives this callback function,

// and then here we say state.customer.fullName.
//^================================================================

//? open: AccountOperations.js - accountSlice

```
function handleDeposit() {
  if (!depositAmount) return;

  dispatch(deposit(depositAmount));
  setDepositAmount(""); 
//* make the input field empty again
}```;

//& Title: Dispatching Actions in Redux

//? Dispatching an Action
//* It's time to dispatch our action.
//* The action comes from the action creator. In this case, it's called 'deposit' and it comes from the 'accountSlice'.

//? Action Creator
//* The action creator 'deposit' only needs the amount.
//* It will automatically return an object which is then dispatched into our store.

//? Reducer and Store Update
//* The reducer receives the dispatched action, updates the store accordingly, and then re-renders our components.

//*=============================================================================================================

//! 269. The Legacy Way of Connecting Components to Redux

//? open: BalanceDisplay.js

//? The Old Way - Before React Hooks
//* Before React hooks existed, we connected React components to the Redux store using the Connect API.
// import { connect } from "react-redux";

//? Using mapStateToProps
//* The function 'mapStateToProps' receives the state object from the store.
//* We return an object from this function where we can define the name of a prop (ex. balance).
//* that our component (BalanceDisplay) should receive.

// function BalanceDisplay({ balance }) {
//   return <div className="balance">{balance}</div>;
// }

// function mapStateToProps(state) {
//   return {
//     balance: state.account.balance,
//   };
// }

// export default connect(mapStateToProps)(BalanceDisplay);

//*=============================================================================================================
//! 270. Redux Middleware and Thunks

//? Understanding Middleware and Thunks
//* Redux Middleware and Thunks are used for asynchronous operations, like data fetching.
//* They extend the functionality of Redux.

//? The Role of Middleware
//* With Middleware, we can do something with the action before it actually gets into the reducer.
//* This is the perfect place for our asynchronous API call and other operations such as setting timers,
//* logging to the console, or even pausing and canceling the action altogether.

//*=============================================================================================================

//!  271. Making an API Call With Redux Thunks
//? open: store-v-2 - accountSlice - accountOperations

//& Title: Redux Thunks for Currency Conversion

//? Feature Implementation
//* Redux Thunks are used to implement a feature where the user can deposit money in a foreign currency,
//* which is then converted via an external API.

//? User Deposits and Currency Selection
//* Users can deposit money and select the currency of the deposit.
//* If the selected currency is not US dollars, a conversion is needed before the deposit is made.

//? Action Dispatch
//* Before the deposit action is dispatched to the store, Redux Thunk is used.
//* This middleware sits between the action dispatch (triggered by a button click)
//* and the action reaching the store.

//^===========================================================================

//& Title: Using Redux Thunk Middleware

//? Installation
//* The first step is to install the middleware package.
//* This can be done using npm with the command `npm i redux-thunk`.

//? Applying Middleware
// import { thunk } from "redux-thunk";  open: store-v-2.js
//* The next step is to apply the middleware to our store.
//* This is typically done when creating the Redux store.

//? Using Middleware in Action Creators:  => accountSlice.js
//* Finally, we use the middleware in our action creator functions.
//* This allows us to write action creators that return a function instead of an action,
//* enabling us to perform asynchronous operations.

//^===========================================================================
//& Title: Dispatching Functions in Redux

//? Dispatching a Function  => accountOperations.js
//* In Redux, we can dispatch a function. When Redux sees that we're dispatching a function,
//* it knows that the function is a thunk.

//? Executing the Thunk     => store-v-2.js
//* Redux will execute the thunk function and not immediately dispatch the action to the store.
//* This allows us to perform asynchronous operations before dispatching an action.

//? Returning a Function    =>  accountSlice.js
//* If we return a function from our action creator, Redux knows that this is the asynchronous action
//* that we want to execute before dispatching anything to the store.

//^===========================================================================

//& Title: Redux Thunks and Data Encapsulation

//? Data Conversion and Encapsulation
//* The component is unaware of the behind-the-scenes amount conversion.
//* This conversion is encapsulated in the account slice, keeping the component (AccountOperations) clean.

//? Using Thunks
//* With Thunks, we return a new function from the action creator function instead of an action object.
//* Redux calls this function, passing in the dispatch function and getState.
//* We can delay the dispatching until the asynchronous operation has finished.
//* This function sits between the initial dispatching (in the component ex. accountOperations)
//* and the reducer in the store receiving the action.

//*=============================================================================================================

//!  272. The Redux DevTools

//* install redux chrome extension
//* npm i @redux-devtools/extension
//*=============================================================================================================

//! 274. Creating the Store With RTK
//? open: store.js
//* npm i @reduxjs/toolkit

//& Title: Configuring Store and Connecting React with Redux

//? Configuring Store
// import { configureStore } from "@reduxjs/toolkit";
//* The 'configureStore' function does a lot of things automatically for us.
//* It combines our reducers, adds the Thunk middleware, and even sets up the developer tools.

// const store = configureStore({
//   reducer: {
//     account: accountReducer,
//     customer: customerReducer,
//   },
// });

//? Connecting React with Redux
//* The part where we connect the React application with Redux works in the exact same way as before.
//* Nothing changes with the React Redux package that we use on the React side.

//*=============================================================================================================

//! 275. Creating the Account Slice
//? open: accountSliceRTK.js

//& Title: Redux Toolkit and createSlice Function

//? Introduction to createSlice
//* With Redux Toolkit, the idea of slices is baked into Redux itself.
//* We now have a function called 'createSlice' which we can import from Redux Toolkit.

//? Benefits of createSlice
//^ The 'createSlice' function provides three big benefits:
//* 1. It automatically creates action creators from our reducers.
//* 2. It simplifies the writing of reducers as we no longer need a switch statement
//* and the default case is automatically handled.
//* 3. It allows us to mutate our state inside reducers.

//? Immer Library and Immutable Logic
//* Behind the scenes, 'createSlice' uses a library called Immer which converts our logic back to immutable logic.
//* So, Redux still requires the kind of logic where we do not mutate the state,
//* but we can now convert this kind of logic to a mutating logic.
//* From Jonas's experience, this last point is the biggest advantage of using Redux Toolkit.

//*=============================================================================================================
//! 276. Back to Thunks
//? accountSliceRTK.js
//& Title: Creating Thunks in Redux Toolkit

//? Using createAsyncThunk
//* To create Thunks in Redux Toolkit, we can use the 'createAsyncThunk' function provided by Redux Toolkit.

//? Alternative to createAsyncThunk
//* However, using 'createAsyncThunk' can be a lot of extra work.
//* An easier solution is to simply use the action creator function that we already used before.
//* We can basically just reuse that function.

//*=============================================================================================================
//! 277. Creating the Customer Slice
//? open CustomerSliceRTK.js
