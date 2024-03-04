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

  //* GET CURRENT CITY
  async function getCity(id) {
    //* if the ID that is being passed in is the same as the current city. And so basically we can check if the city that we
    //* want to load is already the current city. And so then there's no need to call the API again.

    console.log(id, currentCity.id); //* id is string because is coming from url, but currentCity.id is number
    if (Number(id) !== currentCity.id) return;
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${Base_URL}/cities/${id}`);
      const data = await res.json();
      console.log(data);
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      alert("there is error getting the city");
    }
  }
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
      alert("there is error creating the city");
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${Base_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/created", payload: id });
    } catch {
      alert("there is error deleting the city");
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

//! video 237:

// these set state functions here are no longer defined.

// And so we are now going to replace those basically

// with the dispatch function.

// Now here inside our reducer function, remember

// that we should put as many logic

// as possible so that we have this central place

// that handles all the business logic

// and basically all the state transitions.

// Now the problem in this case here is

// that reducers need to be pure functions,

// which means that we cannot do these API requests

// that we do right here inside the reducer function.
//? solution:
// So all we can do is to still make

// these fetch requests out here.

// So in separate functions.

// And then after the data has already been received

// then we can dispatch actions to the reducer.

//*=============================

// when we use a reducer

// in a bit larger application like this one

// it's very important to follow a meaningful

// naming conventions when it comes to the action types.

// So it's usually a good idea to model these actions as events

// and not as setters because this makes it easier

// to see all the related state transitions.

// For example, it shouldn't be set cities

// but instead we can call this cities/loaded

// or we can also do this, but it's a bit

// of a naming convention to use a slash like this

// at least in the Redux community

// which is actually similar to what we are implementing here.

//*====================

// when we are working with asynchronous data and code

// we have two options when it comes to the dispatch function.

// So the first option is to pass

// in all the state plus the dispatch function into the value.

// And then we can use the dispatch function

// inside the components to update state.

// However, since we're dealing with asynchronous data

// we cannot have all the logic inside the reducer.

// And so in the case that we were passing

// the dispatch function into the context

// then we would have to have this function here

// inside the component that dispatches the action.

// And you can try that out for yourself, of course.

// So you can remove this function from here

// and not pass it into the context,

// but instead pass in dispatch.

// But then you would have to pass all this data fetching logic

// into that component

// which is not really what we want if we want

// to keep the components nice and clean

// and therefore we are using the second option

// which is to not pass the dispatch function into the context

// but instead to use it here inside

// these event handler functions, which these are.

// So these are event handler functions that are called

// for example, here on the click of this delete button.

// And so then this time we use the dispatch inside

// of these functions.

// And then it is these functions that we pass here

// into the context, okay?

// But if we were not dealing with asynchronous data

// then it would be better to just pass the dispatch function

// and then create the actions right inside the components.

// But anyway, let's make sure that this actually works.

// So let's come to some city here

// and let's see.

// And beautiful, that just works exactly as before.

// And the same probably here

// for loading and also for deleting.

// Nice.

// And so now with this structure in place, it is actually

// quite easy to implement some more related state updates.

// So that's one of the huge advantages

// of having all the state updating logic in one central place.

// For example, we can say that as soon as a city is created

// it should also become the currently active city.

// And so again, it's now very easy to do that.

// So we can just say current city is equal to action.payload.

// And so then if we somewhere here create a new one

// then we should see that immediately

// with this green outline right here.

// And the same thing actually when we delete a city.

// So there's no need to then keep it in the current city

// and so we can set it back to the original state.

// Great. And this is actually it.

// So with this

// we successfully converted the use states that we had here

// to a reducer, and we even created a new state.

// So we even created the error, which we're not really using

// but well, let's just pass it into the context as well.
