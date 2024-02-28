import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages2/Homepage.jsx";
import Product from "./pages2/Product.jsx";
import Pricing from "./pages2/Pricing.jsx";
import Login from "./pages2/login.jsx";
import AppLayout from "./pages2/AppLayout.jsx";
import PageNotFound from "./pages2/PageNotFound.jsx";
import CityList from "./Components/CityList.jsx";
import CountryList from "./Components/CountryList.jsx";
import City from "./Components/City.jsx";
import Form from "./Components/Form.jsx";
import "./index.css";
import { CitiesProvider } from "./Contexts/citiesContext.jsx";

// how clean our application component now has become.

// So all it does really for now is to define these routes

// and match them simply to the components.

// So without any props.
function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
