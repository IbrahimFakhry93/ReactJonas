import { useSelector } from "react-redux";
function Customer() {
  //* useSelector to read the data from store
  const customer = useSelector((store) => store.customer.fullName); //* customer here is the name of customerReducer (open store.js)
  console.log(customer);
  //* note:
  //! the name customer in (store) => store.customer is the name provided down:
  // const rootReducer = combineReducers({
  //   account: accountReducer,
  //   customer: customerReducer,
  // });
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
