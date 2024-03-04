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

  // And now here we can check whether the

  // coming in email and password are correct.

  // And so again, this is where we would

  // typically have an API call

  // but now we will just compare them to a fake user.

  // So let's get that fake user object,
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
//! video 238:
//* login and logout function:

// when the user clicks on this button here

// is for our application to call a login function.

// And so that login function is where we will then check

// if the user's credentials are correct.

// So we need a login function, probably here,

// which will do that.

// And also we can see here in our final application

// that we have a logout button.

// And so we also need that.

// So clicking those two buttons will then

// create the actions that I mentioned earlier.

// So setting the user to authenticate it

// and storing the user in state.

//==========

//* use reducer for the two required states:
// And then we need those two state variables

// where one contains the user object

// and the other one stores whether the user

// is currently authenticated or not.

// So let's actually do that again using a reducer

// because these two state variables

// will always be updated at the same time.

// So I really like to use a reducer in this situation,

// even though if it's a really small reducer.

//======================
// { ...state, user: action.payload, isAuthenticated: true}  === { user: action.payload, isAuthenticated: true}

// However, we should always, always keep this ( ...state) here

// because this makes our code more future proof.

// So imagine that in the future

// we add some other state variable here

// and so then we would have everywhere to remember

// to then add this ( ...state) back.

//*===============

//* copy to code snippet:

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

//! video 239:
//* implement the actual login and log out functionalities in the application.

//* don't do fake user in real world
// when you build your own applications,

// you should never ever do this,

// so you should never have a fake user in your code like this

// which contains the plain word password,

// because with this, everyone who inspects your code

// can get access to your application.

// All the code that you write inside your React application

// will be available on the front end,

// so the browsers will download it.

// And so, any malicious attacker will be able

// to find this combination of email and password

// in your source code.

// And so then, they will get access to your application.

// Again, never, never do this.

// We are just doing it here

// because I just want you to learn the mechanics

// of authentication in isolation,

// so basically without having all that stuff,

// like an actual API call and implementing your own database
