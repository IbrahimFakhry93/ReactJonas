import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

// import { CitiesProvider } from "./Contexts/citiesContext.jsx";
import { CitiesProvider } from "./Contexts/citiesContextRed.jsx";
import { AuthProvider } from "./Contexts/fakeAuthContext.jsx";

import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import CityList from "./Components/CityList.jsx";
import CountryList from "./Components/CountryList.jsx";
import City from "./Components/City.jsx";
import Form from "./Components/Form.jsx";
import SpinnerFullPage from "./Components/SpinnerFullPage.jsx";

import "./index.css";

// import HomePage from "./pages2/Homepage.jsx";
// import Product from "./pages2/Product.jsx";
// import Pricing from "./pages2/Pricing.jsx";
// import Login from "./pages2/Login.jsx";
// import AppLayout from "./pages2/AppLayout.jsx";
// import PageNotFound from "./pages2/PageNotFound.jsx";

const HomePage = lazy(() => import("./pages2/Homepage.jsx"));
const Product = lazy(() => import("./pages2/Product.jsx"));
const Pricing = lazy(() => import("./pages2/Pricing.jsx"));
const Login = lazy(() => import("./pages2/Login.jsx"));
const AppLayout = lazy(() => import("./pages2/AppLayout.jsx"));
const PageNotFound = lazy(() => import("./pages2/PageNotFound.jsx"));

//& Title: Clean Application Component

//? Simplified Application Component
//* Our application component has become quite clean.
//* All it does for now is define these routes
//* and match them to the components, without any props. (because we created citiesContext)

function App() {
  return (
    //& Title: Context API Provider Order

    //? Rule of Thumb
    //* In the Context API, provider order typically doesn't matter.

    //? Special Cases
    //* Sometimes, `CitiesProvider` might need state from `AuthProvider`.
    //* In these cases, we can use a custom hook from `AuthProvider` inside `CitiesProvider`.

    //? Provider Structure
    //* If such a dependency exists, `AuthProvider` should be the parent of `CitiesProvider`.

    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
                {/* <Route path="app" element={<AppLayout />}> */}
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;

//! Title: Video 238 - Fake Authentication
//~ open components: App - fakeAuthContext - User - ProtectedRoute

//? Typical Frontend Authentication
//* In a typical frontend application like a React application,
//* user authentication usually works in three steps.

//^ Step 1: User Credential Verification
//* First, we get the user's email and password from a login form and check with an API endpoint
//* if the password for the given user is correct.

//^ Step 2: Redirect and State Update
//* Then, if the credentials are correct, we redirect the user to our main application
//*  and save the user object in our state.

//^ Step 3: Protecting from Unauthorized Access
//* Finally, we need to protect the application from unauthorized access,
//* i.e., from users who are not currently logged in.

//~ Storing User and Authentication State
//? Storing User in State
//* We're going to store the user that is logged in into state.

//? Storing Authentication Status in State
//* We will also store into state whether the user is currently logged in or not.
//* This is to protect our application from unauthorized access.

//? Creating Context for State  (fakeAuthContext)
//* Create (fakeAuthContext) another context where we can store that state
//* and give the entire application tree access to that state.

//~ Adding Fake Authentication: Setting Up Context
//? Login and Logout Functions
//* When the user clicks on a button, our application should call a login function.
//* This function will check if the user's credentials are correct.

//? Login Function
//* We need a login function here, which will perform the authentication check.

//? Logout Button
//* In our final application, we have a logout button. We also need a function for that.

//? Actions on Button Click
//* Clicking these two buttons will create the actions
//* I mentioned earlier - setting the user to authenticated and storing the user in state.
