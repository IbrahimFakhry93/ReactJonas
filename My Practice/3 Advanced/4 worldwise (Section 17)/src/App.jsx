import { useEffect, useState } from "react";
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
        {/* //! OR: <Route path="/" element={<HomePage />} />  as down  */}
        <Route path="/" element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          {/* <Route
            index
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          /> */}

          {/* Consider Navigate component as redirect, use replace so you can go back by back button in the browser */}
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//& Role of App component:
//* Our app component basically deciding which page should be displayed in the UI.

// So that's all this component here is going to do.

// It will not really have its own output.

// All it will do is, yeah, as I just said, displaying here one

// of the pages, which is the one that matches the route.

//! Download React router package:
//* npm i react-router-dom   (latest version)
//* for Jonas course download this:
//* npm i react-router-dom@6

//! Call <PageNav/> in every page component (homePage, pricing, product), not in <App/>

//& NavLink instead of Link when??
//* to display the visited link, use NavLink

//! note:
//* Pages are structural components that will match the URLs in the path in Route and in (to) in Link

//! note:
//* It is better to derive countries from the cities array inside CountryList not inside the App
//* because this deriving process of countries from the cities will happen everytime App component re-rendered
//* but if it's derived inside CountryList comp, the process will happen only there.

{
  /* //* <a></a> anchor element will cause page reload  */
}
{
  /* <a href="/pricing">Pricing</a> */
}
//! insteadÖ
{
  /* <Link to="/pricing">Pricing</Link> */
}
