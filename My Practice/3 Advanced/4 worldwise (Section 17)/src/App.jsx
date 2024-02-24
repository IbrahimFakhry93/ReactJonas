import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages2/Homepage.jsx";
import Product from "./pages2/Product.jsx";
import Pricing from "./pages2/Pricing.jsx";
import Login from "./pages2/login.jsx";
import AppLayout from "./pages2/AppLayout.jsx";
import PageNotFound from "./pages2/PageNotFound.jsx";
import CityList from "./Components/CityList.jsx";
import CountryList from "./Components/CountryList.jsx";

import "./index.css";
import City from "./Components/City.jsx";
function App() {
  const Base_URL = `http://localhost:9000`;
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
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<HomePage />} />   //& index route */}
        <Route path="/" element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<p>form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//! note:
//* It is better to derive countries from the cities array inside CountryList not inside the App
//* because this deriving process of countries from the cities will happen everytime App component re-rendered
//* but if it's derived inside CountryList comp, the process will happen only there.
