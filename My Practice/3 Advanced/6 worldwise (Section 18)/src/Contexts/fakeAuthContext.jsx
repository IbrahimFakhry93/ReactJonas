import { createContext, useContext, useReducer } from "react";
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error("action is unknown");
  }
}
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  //& Title: User Authentication
  //? Checking User Credentials
  //* Now, we can check whether the incoming email and password are correct.

  //? Typical API Call
  //* Typically, this is where we would have an API call to verify the credentials.

  //? Comparing with Fake User
  //* But for now, we will just compare them to a fake user. Let's get that fake user object.

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };

//*=======================
//! Title: Video 238 - Adding Fake Authentication: Setting Up Context
//? Login and Logout Functions
//* When the user clicks on a button, our application should call a login function.
//* This function will check if the user's credentials are correct.

//? Login Function
//* We need a login function here, which will perform the authentication check.

//? Logout Button
//* In our final application, we have a logout button. We also need a function for that.

//? Actions on Button Click
//* Clicking these two buttons will create the actions
//* I mentioned earlier - setting the user to authenticated and storing the user in state.

//==========

//^  Using Reducer for Required States
//? Two State Variables
//* We need two state variables - (user, isAuthenticated)
//* one that contains the user object and another that stores whether the user is currently authenticated or not.

//? Using Reducer
//* We will use a reducer for these two state variables (user, isAuthenticated)
//* as they will always be updated at the same time.
//* Even if it's a small reducer, using a reducer in this situation is beneficial.

//? State Spread Operator
//* We should always keep the state spread operator ( ...state) in our code. This makes our code more future proof.
//* If we add some other state variable in the future, we would have to remember to add this ( ...state) back.

//*===============

//* copy to code snippet file:

// import { createContext, useContext } from "react";

// const AuthContext = createContext();

// function AuthProvider({ children }) {
//   return <AuthContext.Provider value={}>{children}</AuthContext.Provider>;
// }

// function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined)
//     throw new Error("AuthContext was used outside AuthProvider");
// return context;
// }

//*================================

//! Title: Video 239 - Adding Fake Authentication: Implementing "Login"
//? Implementing Login and Logout
//* We are implementing the actual login and logout functionalities in the application.

//? Warning: Fake User in Real World Applications
//* When you build your own applications,
//*  you should never have a fake user in your code that contains the plain word password.
//* With this, anyone who inspects your code can get access to your application.

//? Code Availability
//* All the code that you write inside your React application will be available on the front end,
//*  so the browsers will download it.
//* Any malicious attacker will be able to find this combination of email and password in your source code.

//? Security Risk
//* This means they will get access to your application. Again, never, never do this.

//? Learning Purpose
//* We are just doing it here because I want you to learn the mechanics of authentication in isolation,
//* without having all that stuff, like an actual API call
//* and implementing your own authentication system based on a database
