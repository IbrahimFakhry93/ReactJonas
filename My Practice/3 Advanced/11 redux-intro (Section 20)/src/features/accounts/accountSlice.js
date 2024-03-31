//& initial state:

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

//& reducer function:

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    //* 'domainName/eventName'
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      if (state.balance < action.payload) return;
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return;
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
    case "account/converting":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

//& Action Creators for account:
export function deposit(amount, currency) {
  console.log(currency);
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/converting" });
    //* API Call:
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data);
    const converted = data.rates.USD;
    //* dispatch Action:
    dispatch({ type: "account/deposit", payload: converted });
  };
}

//^====================================
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

//^====================================
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

//^====================================
export function payLoan() {
  return { type: "account/payLoan" };
}

//*=====================================================================================================================================
