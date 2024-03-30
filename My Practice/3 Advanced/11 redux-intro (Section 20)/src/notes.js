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

//*==================================================================

//! 267. Back to React! Connecting our Redux App With React

//? open index.js

//* npm i react-redux
//* import {Provider} from "react-redux"

//* wrap our entire application in Provider just like context-API
//* pass store as prop to provider

// now our application knows about the Redux store

// which means that every single component

// in the application can now read data from the store

// and can dispatch actions to it.

// So, that is once again very similar

// to the behavior that we see in the Context API.

// So, it's basically broadcasting global state

// into every component that actually wants to read it.

//^=====================================================

//? open customer.js

//* to read data from redux store in a component, use (useSelector) hook

//* this useSelector basically creates a subscription

// to the store.

// And so just like we are already used to,

// whenever the store changes,

// then this component (ex. Customer )that is subscribed

// to that store will re-render.

// Now, behind the scenes,

// Redux also implements some performance optimizations

// which are probably similar to the ones

// that we talked about earlier in the Context API.

// But what matters is that the mechanism here is similar

//*================================================================================

//! 268. Dispatching Actions from Our React App
//* learn how to dispatch actions to the Redux store from within React components.

//? open: CreateCustomers component.
//* need to complete handleClick logic
//* in this function where we will want to dispatch now an action
//* that will create the new customer.

//^=================

// before, when we wanted to dispatch an action,

// we called the dispatch method on the Redux store.

// Remember that?

// However, that's not how we do it inside React.

// Instead, we get access to the dispatch function

// by using the useDispatch hook.
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

// And so now it is time to dispatch our action.

// And once again, our action is going to come

// from the action creator.

// So in this case that is called deposit,

// so coming from the accountSlice,

// so this one right here.

// And so all this one needs is the amount

// and then it will automatically return

// this object right here,

// which is then gonna be dispatched into our store.

// And so then the reducer receives that,

// updates the store and then re-renders our components,

//*================================================================

//! 269. The Legacy Way of Connecting Components to Redux

//? open: BalanceDisplay.js

// the old way.

// So before React hooks existed

// of connecting React components to the Redux store.

// So before hooks existed, we had to use the Connect API

function mapStateToProps(state) {
  return {};
}

// this function here

// receives the state object from the store.

// And then here, all we have to do is to return an object

// in which we can define the name of a prop

// that our component should receive.

//*================================================================
//! 270. Redux Middleware and Thunks

// Redux Middleware and Thunks,

// which we can use for asynchronous operations,

// like data fetching.

// extend the functionality of Redux

// by using something called Middleware.

//^=================================================================

// But with a Middleware, we can do something with the action

// before that action actually gets into the reducer.

// And therefore, this is the perfect place

// for our asynchronous API call, as well as other operations,

// such as setting timers, logging to the console,

// or even pausing and canceling the action altogether.
