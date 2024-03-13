import { createContext, useContext, useEffect, useReducer } from "react";
const Base_URL = `http://localhost:9000`;
const citiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload, //* to activate the current city on UI (green border around it)
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {}, //* to deactivate the current city
      };
    case "rejected":
      return { ...state, error: action.payload };
    default:
      throw new Error("unknown error");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  ); //* we don't really will use this error

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${Base_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "there was an error fetching the cities",
        });
      }
    }

    fetchCities();
  }, []);

  //! fetch (get) current city
  async function getCity(id) {
    //* if the ID that is being passed in is the same as the current city.
    //* And so basically we can check if the city that we want to load
    //* is already the current city. And so then there's no need to call the API (fetching) again.

    console.log(id, currentCity.id); //* id is string because is coming from url, but currentCity.id is number
    if (Number(id) !== currentCity.id) return;
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${Base_URL}/cities/${id}`);
      const data = await res.json();
      console.log(data);
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there is error getting the city",
      });
    }
  }
  //! Create new city: (used in form component)
  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${Base_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-type": "application/json" },
      });

      const data = await res.json();
      console.log(data);
      dispatch({ type: "city/created", payload: data }); //* the data which is the newly created city object.
    } catch {
      dispatch({
        type: "rejected",
        payload: "there is error creating the city",
      });
    }
  }
  //! Delete city:
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${Base_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there is error deleting the city",
      });
    }
  } //* refresh the cities list page after clicking delete to make sure that this city is deleted from API after refetching
  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity, //* pass it into the context here so to be used in the form comp
        deleteCity,
        error, //* we don't really will use this error
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(citiesContext);
  if (context === undefined)
    throw new Error("Post context was used outside of the PostProvider");
  return context;
}

export { CitiesProvider, useCities };

//*=======================

//! video 237: Advanced State Management System: Context + useReducer

//& Title: State Management and Reducer Function
//? Replacing Set State Functions
//* The set state functions are no longer defined.
//* We are going to replace those with the dispatch function.

//? Logic in Reducer Function
//* Inside our reducer function, we should put as much logic as possible.
//* This gives us a central place that handles all the business logic and state transitions.

//? Pure Functions and API Requests
//* Reducers need to be pure functions, which means we cannot do API requests inside the reducer function.

//& Title: Solution
//? Fetch Requests Outside Reducer
//* All we can do is to still make these fetch requests outside the reducer, in separate functions.

//? Dispatching Actions After Data Receipt
//* After the data has already been received, we can dispatch actions to the reducer.

//*=============================

//& Title: Using Reducer in Larger Applications
//? Importance of Naming Conventions
//* When we use a reducer in a larger application like this one,
//* it's very important to follow meaningful naming conventions for action types.

//? Modeling Actions as Events
//* It's usually a good idea to model these actions as events, not setters.
//* This makes it easier to see all related state transitions.

//? Example: Action Naming
//* For example, instead of 'set cities', we can call this 'cities/loaded'.
//* It's a bit of a naming convention to use a slash like this, at least in the Redux community,
//* which is similar to what we are implementing here.

//*====================
//& Title: Working with Asynchronous Data and Code
//? Dispatch Function Options
//* When working with asynchronous data, we have two options for the dispatch function.

//^ Option 1: Passing State and Dispatch Function
//* The first option is to pass in all the state plus the dispatch function into the value.
//* We can then use the dispatch function inside the components to update state.

//? Limitation with Reducer
//* However, since we're dealing with asynchronous data, we cannot have all the logic inside the reducer.

//? Dispatch Function in Context
//* If we were passing the dispatch function into the context,
//* we would have to have this function inside the component that dispatches the action.

//^ Option 2: Using Dispatch Inside Event Handlers
//* The second option, which we are using, is to not pass the dispatch function into the context
//* but instead to use it inside these event handler functions.

//& Title: Implementing Related State Updates
//? Advantage of Centralized State Updating Logic
//* With this structure in place, it is quite easy to implement more related state updates.
//* This is one of the huge advantages of having all the state updating logic in one central place.

//? Example: Active City Update
//* For example, as soon as a city is created, it should also become the currently active city.
//* We can easily do this by setting the current city equal to action.payload.

//? Example: Deleting a City
//* Similarly, when we delete a city, we can set it back to the original state.

//* so we updated two states together (cities, currentCity) in one action

//& Title: Conversion to Reducer
//? Successful Conversion
//* With this, we have successfully converted the use states to a reducer,
//* and even created a new state (the error), which we're not really using
//* but let's just pass it into the context as well.
