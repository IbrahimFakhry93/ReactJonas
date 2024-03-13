//! video 227: Creating a CitiesContext
//? comp: App- CitiesContext
//& Title: Context API Usage
//* The context API is not always the ideal solution for state management.
//* However, for small applications like our current project (worldWise),
//* where performance isn't a concern, it's a great tool.

//* 1) Create context folder
//* 2) Create citiesContext.jsx
//* 3) create CitiesContext and Cities provider function comp
//* 4) Grab all state code and state updating code from App.jsx
//* and place inside Cities provider function comp
//*========================================
//! video 228:
//? comp: App- CitiesContext  - citiesList - countriesList
//*========================================
//! video 229:  Finishing the City View =>  flow of getting and rendering current city
//! means clicking on of the cities on the list and fetch the data for the city.
//? comp: CitiesContext - City - CityItem
//& Title: Component Interaction and State Management

//? URL Change and ID Retrieval
//* When we click on a link, the URL changes, giving us a new ID. This ID is read into the city component.

//? Calling the getCity Function
//* Upon component mounting, we call the `getCity` function, which comes from our context.

//? Fetching City Data
//* The `getCity` function immediately starts fetching the city data for that ID.

//? Storing Fetched Data
//* When the data arrives, it gets stored into the `setCurrentCity` state.
//* This state variable is also passed into the context value.

//? Updating the City Component
//* The city component immediately receives the updated value.
//* We destructure it and display everything in the UI.

//? Child to Parent Communication
//* We call a function that updates the current city.
//* The updated city then comes back down into this component where we can use it.

//*========================================

//! video 230:  Including a Map With the Leaflet Library
//! video 231:
//! video 232:
//! video 233:
//? comp:  Map - index.css - Map.module.css
//* npm i react-leaflet leaflet

// @import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
// @import "https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap";

//* MapContainer is responsible for map rendering

//**===========================================================================================
//& Title: Context API Provider Order

//? Rule of Thumb
//* In the Context API, provider order typically doesn't matter.

//? Special Cases
//* Sometimes, `CitiesProvider` might need state from `AuthProvider`.
//* In these cases, we can use a custom hook from `AuthProvider` inside `CitiesProvider`.

//? Provider Structure
//* If such a dependency exists, `AuthProvider` should be the parent of `CitiesProvider`.
import React, { createContext, useContext, useState, useEffect } from "react";

// Create two contexts
const AuthContext = createContext();
const CitiesContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ user: "John Doe", isLoggedIn: true });

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function CitiesProvider({ children }) {
  const auth = useContext(AuthContext);
  const [cities, setCities] = useState(["New York", "Los Angeles", "Chicago"]);

  // Imagine we have a function that fetches cities based on the user
  function fetchCities(user) {
    // Fetch cities for the user...
  }

  // If auth changes, we fetch the cities for the user
  useEffect(() => {
    fetchCities(auth.user);
  }, [auth]);

  return (
    <CitiesContext.Provider value={cities}>{children}</CitiesContext.Provider>
  );
}

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>{/* Rest of the app */}</CitiesProvider>
    </AuthProvider>
  );
}

export default App;
//**======================================================================================================

//* Not important info down, skip if you want

//! video 229: Finishing the City View

//& Title: Fetching Data in Real World Applications

//? Fetching Individual Objects
//* You might be wondering why we need to fetch an object if we could simply get it from the array we already have.
//* In this small application, that's true.
//* Technically, we wouldn't have to create a new HTTP request
//* and fetch this data from the server again because we do already have it in the cities array.

//? More Data in Single Objects
//* However, in real world web applications,
//* it's quite common that the single objects have a lot more data than the entire collection.
//* This array would only have a small amount of data in each object,
//* while the objects that we get individually from the API have really all the data.

//? Making a Request
//* So let's pretend that we really need to do this.
//* We would make a request to this URL and then slash the ID.
//**======================================================================================================
//! video 234: fetching data city in the form (form component)
//? comp: Form - useUrlPosition

//* Prevent Form component to be loaded if there are no lat,lng
//**======================================================================================================
//! video 235: Creating new city:
//? comp: Form - useUrlPosition

//**======================================================================================================
//! video 236: delete city:
//? comp: cityItem - citiesContext
// create a function that will delete a city from the API
// and here from the state, and then just call that function when we click on this button.
//**======================================================================================================

//! video 237: Advanced State Management System: Context + useReducer
//? comp: citiesContextRed
// to do next is to convert

// this state management that we have going on here

// to a reducer.

// So, that's a common pattern that you will see together

// with the context API.
//**======================================================================================================
//! Title: Video 238 - Fake Authentication
//~ open components: App - fakeAuthContext - User - AppLayout - ProtectedRoute - Login - HomePage

//? Typical Frontend Authentication
//* In a typical frontend application like a React application,
//* user authentication usually works in three steps.

//^ Step 1: User Credential Verification
//* First, we get the user's email and password from a login form and check with an API endpoint
//* if the password for the given user is correct.

//^ Step 2: Redirect and State Update
//* Then, if the credentials are correct, we redirect the user to our main application
//*  and save the user object in our state.

//^ Step 3: Protecting from Unauthorized Access
//* Finally, we need to protect the application from unauthorized access,
//* i.e., from users who are not currently logged in.

//~ Title: Storing User and Authentication State
//? Storing User in State
//* We're going to store the user that is logged in into state.

//? Storing Authentication Status in State
//* We will also store into state whether the user is currently logged in or not.
//* This is to protect our application from unauthorized access.

//? Creating Context for State  (fakeAuthContext)
//* Create (fakeAuthContext) another context where we can store that state
//* and give the entire application tree access to that state.

//~ Adding Fake Authentication: Setting Up Context
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

//**======================================================================================================

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
//**======================================================================================================
//! Title: Video 240 - Adding Fake Authentication: Protecting a Route
//? Protecting Application Against Unauthorized Access
//* The third part of the authentication flow is to protect the application against unauthorized access.
//* We want to redirect the user back to the homepage
//* whenever they reach one of the routes that they should not reach when they are not logged in.

//? Creating ProtectedRoute Component
//* We will create a specialized component (ProtectedRoute) which will handle this redirecting
//* and then wrap the entire application in that component.
