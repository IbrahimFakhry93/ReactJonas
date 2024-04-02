import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

//*  return { ...state, balance: state.balance + action.payload };
// So spreading all the current state into this new state
// that will be returned from here as this:
//* return { ...state, balance: state.balance + action.payload };
// payload is basically the data that gets passed into the reducer
// when the action is dispatched.

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    //* 'domainName/eventName'
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      if (state.balance < action.payload) return state;
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

// default: return state;
// Return state in default so in case that the reducer receives an action
// that it doesn't know about
// it will simply return the original state back.

//! const store = createStore(accountReducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 300 });
// console.log(store.getState());
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buy a car" },
// });
// console.log(store.getState());
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

//*===================================================================================================================
//& Action Creators for account:
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
//* in Redux we don't dispatch actions directly to the reducer but really to the store.
// store.dispatch(deposit(500));
// console.log(store.getState());

//^====================================
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
// store.dispatch(withdraw(500));
// console.log(store.getState());
//^====================================
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
// store.dispatch(requestLoan(500, "buy a car"));
// console.log(store.getState());
//^====================================
function payLoan() {
  return { type: "account/payLoan" };
}
// store.dispatch(payLoan);
// console.log(store.getState());

//*=====================================================================================================================================

//& Action Creators for customer:

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: { fullName },
  };
}

//& Create reducer function for customer
function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

//& create Root reducer
// const rootReducer = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });

//& create Store:
// const store = createStore(rootReducer);

//& Dispatch create actions to reducer by store
// store.dispatch(createCustomer("Jonas Schmidtmann", "234334343"));
// store.dispatch(deposit(400));
// console.log(store.getState());
