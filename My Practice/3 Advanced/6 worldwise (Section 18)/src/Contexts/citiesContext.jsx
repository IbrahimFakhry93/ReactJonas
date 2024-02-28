import { createContext, useContext, useEffect, useState } from "react";
const Base_URL = `http://localhost:9000`;
const citiesContext = createContext();

// Add children prop to the provider so we can then use this provider component

// as the top level component in the app component.

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
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
