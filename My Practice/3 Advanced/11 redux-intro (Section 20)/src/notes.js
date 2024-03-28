//! 262. Creating a Reducer: Bank Account

//? open:  store.js
//* model the bank account
//* but simpler. So without an account number
//* only with a balance, a loan and also a loan purpose.

//^=============

//* the goal of the reducer function is to calculate the new state based on the current state
//* and on the received action.

//* it's also important to remember
//* that reducers are not allowed to modify the existing state
//* and they're also not allowed to do any asynchronous logic or other side effects.

// one thing that is actually different

// between this reducer and the reducer in the useReducer hook

// is that usually we directly pass in the initialState

// as the default state.

// back in the day

// action types used to be written all uppercase.

// For example, like this.

// Like SET_BALANCE or maybe DEPOSIT_ACCOUNT.

//*====================================================================================================================================
//! 263. Creating a Redux Store
//* npm i redux

//? open store.js
//* 1) import { createStore } from "redux";
//* 2) const store = createStore(reducer);
//* store.dispatch({ type: "account/deposit", payload: 500 });

//? open index.js:
//* import "./store";  to run the code of store.js in index.js
// console.log(store.getState());

//*====================================================================================================================================

//! 264. Working With Action Creators

// in Redux we don't always manually write the type like this,
// store.dispatch({ type: "account/deposit", payload: 500 });
// console.log(store.getState());

// but instead we create something called an action
// creator to automate this process.

// Action creators are nothing more than simply functions, that return actions.
// So they are really not a Redux thing, and Redux would work perfectly fine without them,
// but they are a useful convention

// we are going to create one action creator for each possible action.

//& Action Creators for account:
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
//* in Redux we don't dispatch actions directly to the reducer but really to the store.
//^   store.dispatch(deposit(500));

//*====================================================================================================================================
//! 265. Adding More State: Customer

// we need to do is to combine

// all the reducers that we have in order to create

// one so-called root reducer.
// const rootReduce = combineReducers({
//     account: reducerAccount,
//     account: reducerAccount,
//   });

//*===================================================================

//! 266. Professional Redux File Structure: State Slices

// a few years ago, so basically at the beginning of Redux,

// developers would usually create one reducers folder

// and then create one file per reducer,

// and the same with the action creators.

// So they would create one actions folder

// and then one file for each action creator.

// So you will definitely see that

// if you look at some older Redux code base.

// However, this leads to a lot of jumping around

// in the code base.

// So jumping between different files

// which is really not useful once you're writing your code.

// And so this is no longer the recommended approach.

//* instead we create folder for each feature : account, customer

//? create slice
// a slice is basically a piece,

// so just a part of the total state.

// So the entire state lives in the store.

// And so here we then basically take one slice of that state.

// And so this one here is gonna be everything related

// to the account,

// and then we will also have one customer slice.

// And so now the idea is that in each slice,

// we co-locate as much as the Redux logic as possible

// in one file so that we don't have to jump around

// all the time between files,

// which is really annoying, trust me.

// So usually, here replace the reducer, the action creators,

// and the initial state, and we then export those

// and put them back together here in the store.
