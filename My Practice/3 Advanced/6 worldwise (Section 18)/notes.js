//! video 227: Creating a CitiesContext

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
//! video 229:  Finishing the City View =>  flow of getting and rendering current city

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

//! video 230:

//* npm i react-leaflet leaflet

//* MapContainer is responsible for map rendering

//**===========================================================================================
//& Title: Context API Provider Order

//? Rule of Thumb
//* In the Context API, provider order typically doesn't matter.

//? Special Cases
//* Sometimes, `CitiesProvider` might need state from `AuthProvider`. In these cases, we can use a custom hook from `AuthProvider` inside `CitiesProvider`.

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
//*  In this small application, that's true.
//* Technically, we wouldn't have to create a new HTTP request
//*  and fetch this data from the server again because we do already have it in the cities array.

//? More Data in Single Objects
//* However, in real world web applications, it's quite common that the single objects have a lot more data than the entire collection.
//* This array would only have a small amount of data in each object,
//* while the objects that we get individually from the API have really all the data.

//? Making a Request
//* So let's pretend that we really need to do this. We would make a request to this URL and then slash the ID.
