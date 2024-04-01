import { createSlice } from "@reduxjs/toolkit";

//& initial state:

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

//& reducer function:

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      // state.balance=state.balance+action.payload;
      //? or
      state.balance += action.payload;
    },
    withdraw(state, action) {
      if (state.balance < action.payload) return;
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return state;
        state.balance = state.balance + action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state) {
      //* if state.loan = 0; is first,
      //* so balance will stay the same,
      //* that is one of pitfalls of mutating the state in reduxtoolkit
      //* so order is important
      state.loan = 0;
      state.loanPurpose = "";
      state.balance -= state.loan;

      //^==========================
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

console.log(accountSlice);

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  console.log(currency);
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
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

export default accountSlice.reducer;
