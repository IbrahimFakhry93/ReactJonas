import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages2/Homepage.jsx";
import Product from "./pages2/Product.jsx";
import Pricing from "./pages2/Pricing.jsx";
import Login from "./pages2/Login.jsx";
import AppLayout from "./pages2/AppLayout.jsx";
import PageNotFound from "./pages2/PageNotFound.jsx";
import CityList from "./Components/CityList.jsx";
import CountryList from "./Components/CountryList.jsx";
import City from "./Components/City.jsx";
import Form from "./Components/Form.jsx";
import "./index.css";
import { CitiesProvider } from "./Contexts/citiesContext.jsx";
import { AuthProvider } from "./Contexts/fakeAuthContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

// how clean our application component now has become.

// So all it does really for now is to define these routes

// and match them simply to the components.

// So without any props.
function App() {
  return (
    //* order of providers doesn't matter but
    //     Now in some situations,

    // we might actually need inside the CitiesProvider

    // some state from the AuthProvider,

    // which would perfectly be possible.

    // We could, of course, call that custom hook from here

    // also inside the CitiesProvider.

    // And so, in that case, the AuthProvider

    // really would have to be the parent of this one,
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />

            <Route path="login" element={<Login />} />

            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
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
    </AuthProvider>
  );
}

export default App;

//! Video 238: Fake Authentication:
// in a typical front end application

// like a typical React application,

// user authentication usually works in three steps.

// First we get the user's email and password

// from a login form and check with an API endpoint

// if the password for the given user is correct.

// Then in the second step,

// if the credentials are actually correct,

// we then redirect the user to our main application

// and we save the user object in our state.

// And finally, as a third step

// we need to protect the application from unauthorized access,

// so from users who are not currently logged in.
///=========

// So remember how I said earlier

// that we're going to store the user

// that is logged in into state

// and we will also store into state

// whether the user is currently logged in or not,

// so that we can protect our application

// from unauthorized access.
// let's create another context

// where we can store that state

// and give the entire application tree access to that state.
