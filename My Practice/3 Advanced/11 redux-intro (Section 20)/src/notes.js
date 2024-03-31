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

//*===================================================================

//! 266. Professional Redux File Structure: State Slices

//? Traditional Redux Structure
//* Initially, Redux developers created separate folders for reducers and actions, with one file per reducer/action.
//*  This led to a lot of jumping around in the code base.

//? Modern Redux Structure
//* The modern approach is to create a folder for each feature (e.g., account, customer), making the code more organized.

//? Creating a Slice
//* A slice is a part of the total state in the store. For each feature, we take one slice of that state.
//* In each slice, we co-locate as much Redux logic as possible in one file.
//* This includes the reducer, action creators, and initial state.
//* We then export these and put them back together in the store, reducing the need to jump around between files.

//*=============================================================================================================

//! 267. Back to React! Connecting our Redux App With React

//? open index.js

//* npm i react-redux
//* import {Provider} from "react-redux"

//* wrap our entire application in Provider just like context-API
//* pass store as prop to provider

//? Redux Store
//* The application is aware of the Redux store, allowing every component to read data from the store and dispatch actions.

//? Context API Similarity
//* This behavior is similar to the Context API, which broadcasts global state into every component that wants to read it.

//^==========================================================================================================

//? open customer.js

//? Using useSelector Hook
//* The useSelector hook in Redux creates a subscription to the store.
//* When the store changes, the subscribed component (ex. customer) re-renders.
//* Redux implements performance optimizations behind the scenes, similar to those in the Context API.

//*======================================================================================================================

//! 268. Dispatching Actions from Our React App
//* learn how to dispatch actions to the Redux store from within React components.

//? open: CreateCustomers component.
//* need to complete handleClick logic
//* in this function where we will want to dispatch now an action
//* that will create the new customer.

// const dispatch = useDispatch();
// function handleClick() {
//   dispatch(createCustomer(fullName, nationalId));
// }

//^==========================================================================================================

//* using the useDispatch hook, to get access to the dispatch function

//! const dispatch = useDispatch();
//! then pass action creator to dispatch function
//! dispatch(actionCreator)

//^=============================

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

//? Using mapStateToProps
//* The function 'mapStateToProps' receives the state object from the store.
//* We return an object from this function where we can define the name of a prop.
//* that our component should receive.

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
//? open: store - accountSlice - accountOperations
// use Redux Thunks

// to implement a feature where the user can deposit money

// into the account in a foreign currency,

// which will then be converted by calling an external API.

// So basically, whenever the user deposits some money here,

// they can select which currency that money is.

// So for example, euro.

// And so if that currency is different from US dollar,

// then we need to convert these 500 euros back to US dollars

// before they actually get deposited into the account.

// So before that deposit action is actually dispatched

// to the store.

// And so that's where now the Redux thunk comes into play.

// So we will have that middleware sitting

// between dispatching the action,

// as we click here on the button,

// and that action actually reaching the store.

//^==========================

// In order to use this middleware,

// we need to follow three steps.

// First, we install the middleware package.  npm i redux-thunk

// Then we apply that middleware to our store.

// And finally, we use the middleware

// in our action creator functions.
//^============

// So basically, we will dispatch a function.

// And so when Redux sees that,

// it will know that that function is the thunk.

// And so it will then execute that function

// and not immediately dispatch the action to the store.

// All right?

// So again, if we return a function here,

// then Redux knows that this is the asynchronous action

// that we want to execute before dispatching anything

// to the store.

//^===========================

// the beauty of what we just implemented here is

// that this component here actually has no idea

// that the amount is converted behind the scenes.

// So that conversion is completely hidden from our component.

// And instead, it is encapsulated right here

// in the account slice.

// So it's happening here in the centralized place.

// And if we had other API calls

// or other asynchronous operations

// in these other action creators,

// then, of course, they would also be in this file.

// So again, they would then all be

// in this one centralized place,

// not spread all over the application.

// And so with this,

// we can keep this component here really tidy and clean.

// I mean, it's not really that clean

// because we chose to have all this JSX in one file,

// which usually we would probably split up.

// But you get the point.

// So we don't have the data fetching anymore here

// in the component.

// So I hope this wasn't all too confusing.

// And what I mostly want you to retain

// is that when we are using Thunks,

// instead of returning an action object

// from the action creator function,

// we return a new function.

// And so then the result of this becomes a function

// and no longer an object.

// And so then Redux,

// when it sees that we are dispatching a function,

// it will call that function,

// and into that function,

// it'll pass in the dispatch function and getState,

// which we didn't even use, in this case.

// And so then we can use that dispatch function

// inside here to delay that dispatching

// until the asynchronous operation

// that we want to implement has finished.

// And so therefore, we can think of this function here sitting

// between the initial dispatching and the reducer

// in the store receiving the action.

//*===========================================================================

//!  272. The Redux DevTools

//* install redux chrome extension
//* npm i @redux-devtools/extension
//*===========================================================================

//! 274. Creating the Store With RTK
//? store.js
//* npm i @reduxjs/toolkit

// configure store does a lot of things

// automatically for us

// so it automatically will combine our reducers,

// it will automatically add the Thunk middleware,

// and it will even automatically set up the developer tools,

//^=============

// Now then the part where we connect the React application

// with Redux works in the exact same way as before

// so nothing changes with the React Redux package

// that we use on the React site.
