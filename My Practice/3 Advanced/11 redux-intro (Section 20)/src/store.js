import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
//& create Root reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//& create Store:
const store = createStore(rootReducer);

export default store;
//* next we will inject this store in our React application
