import { createContext, useContext, useEffect, useState } from "react";

//* Add children prop to the provider so we can then use this provider component
//* as the top level component in the app component.
const Base_URL = `http://localhost:9000`;

//^ 1) Create Context:
const citiesContext = createContext();

//^ 2) Create Provider:
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //! video 229:
  const [currentCity, setCurrentCity] = useState({}); //* if you forgot {}, currentCity will be undefined in City comp
  //! note:
  //* current city is global state because it's needed in citiesList comp.
  //* to mark the active current city on the list (UI Feature)
  //* so place currentCity here in the context.

  //! fetching list of cities
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${Base_URL}/cities`);
        const data = await res.json();
        console.log(data);
        setCities(data);
      } catch {
        alert("there is error fetching list of cities");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  //! fetch (get) current city
  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${Base_URL}/cities/${id}`);
      const data = await res.json();
      console.log(data);
      setCurrentCity(data);
    } catch {
      alert("there is error getting current city");
    } finally {
      setIsLoading(false);
    }
  }

  //! Create new city: (used in form component)
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${Base_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-type": "application/json" },
      });

      const data = await res.json();
      console.log(data);

      setCities((cities) => [...cities, data]);
    } catch {
      alert("there is error creating the city");
    } finally {
      setIsLoading(false);
    }
  }
  //! Delete city:
  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${Base_URL}/cities/${id}`, {
        method: "DELETE",
      });
      //* in delete sth we use filter, because we want our data array to be shorter
      //* so here we want all the cities where the city.id is different from the one that was passed in.
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("there is error deleting the city");
    } finally {
      setIsLoading(false);
    }
  } //* refresh the cities list page after clicking delete to make sure that this city is deleted from API after refetching
  //^ 3) Pass states, handling function in the value of Provider
  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity, //* pass it into the context here so to be used in the form comp
        deleteCity,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}
//^ 4) Use Context:
function useCities() {
  const context = useContext(citiesContext);
  if (context === undefined)
    throw new Error("citiesContext was used outside of the PostProvider");
  return context;
}
//^ 5) Export the context and provider
export { CitiesProvider, useCities };

//^ 6) Wrap the whole App inside citiesProvider (in App.jsx)
//^ 7) Consume the context wherever, it's needed like in cityList.jsx for ex.