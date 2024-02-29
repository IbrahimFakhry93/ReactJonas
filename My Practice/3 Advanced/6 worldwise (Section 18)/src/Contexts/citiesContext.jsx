import { createContext, useContext, useEffect, useState } from "react";
const Base_URL = `http://localhost:9000`;
const citiesContext = createContext();

// Add children prop to the provider so we can then use this provider component

// as the top level component in the app component.

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //! video 229:
  const [currentCity, setCurrentCity] = useState({}); //* if you forgot {}, currentCity will be undefined in City comp
  //! note: current city is global state because it's needed in citiesList comp.
  //! to mark the active current city on the list (UI Feature)
  //* so place currentCity in the context.
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${Base_URL}/cities`);
        const data = await res.json();
        console.log(data);
        setCities(data);
      } catch {
        alert("there is error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  //* GET CURRENT CITY
  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${Base_URL}/cities/${id}`);
      const data = await res.json();
      console.log(data);
      setCurrentCity(data);
    } catch {
      alert("there is error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
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
