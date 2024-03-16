//! Video 212

//& Usage of nested routes:

//* we need nested routes when we want a part of the user interface to be controlled by a part of the URL.
//* show a part of the UI based on some part of the URL.
//* in the URL, we have slash app and then slash cities.  (app/cities)
//* And so basically these cities part here is displayed because in the URL we have cities.
//* (app/cities) , (app/countries) , (app/form)

// eslint-disable-next-line no-lone-blocks
{
  /* 

<Route path="app" element={<AppLayout />}>    //& Parent Route
    <Route index  element={<HomePage /> />    //& index Route
    <Route path="cities" element={<p>List of cities</p>} />    //& Child Route
    <Route path="countries" element={<p>List of countries</p>} />   //& element can be any JSX or component
    <Route path="form" element={<p>form</p>} />
</Route> 


*/
}

//=====================================================================

//& Usage of index route:
//* index route is the default child route that is going to be matched
//* if none of these other routes here matches.
//eslint-disable-next-line no-lone-blocks
{
  /* <Route index element={<HomePage />} />   //& index route */
  /* //! OR: <Route path="/" element={<HomePage />} />  as down  */
}

//eslint-disable-next-line no-lone-blocks
//! <Route path="app" element={<AppLayout />}>
//*  Consider Navigate component as redirect, use replace so you can go back by back button in the browser
// <Route index element={<Navigate replace to="cities" />} />  //& index + Navigate
// <Route
//   path="cities"
//   element={<CityList cities={cities} isLoading={isLoading} />}
// />
// <Route path="cities/:id" element={<City />} />
// <Route
//   path="countries"
//   element={<CountryList cities={cities} isLoading={isLoading} />}
// />
// <Route path="form" element={<Form />} />
//! </Route>
// <Route path="*" element={<PageNotFound />} />

//*=====================================================================

//& Title: React Router vs Use state hook

//& Understanding React Router and Tab Components

//* Realized that the implementation of protected routes is similar to a tabs component, but with a different approach.

//? Traditional Tab Component Implementation
//* Previously, to implement a tab component where the content changes based on the active tab,
//*  we would use the useState hook to manage the active tab.

//? Using React Router for Tab Management
//* With React Router, we manage tabs differently.
//* Instead of using useState to manage the active tab, we allow the URL to store the state of the active tab.
//* When the URL changes, the active tab changes accordingly.

//? A New Perspective with React Router
//* React Router introduces a new way of thinking about application building.

//? The Relevance of Previous Knowledge
//* Despite the new approach, we still frequently build components like accordions or tabbed components using the useState hook.

//? Navigation in Real-World Applications
//* Going forward, the overall navigation of real-world applications is typically managed by a tool like React Router.
//* This includes managing sub-navigation like tabs.

//* (cities and countries tabs)

//*=====================================================================
//& Title: Implementing Nested Routes

//? Implementing Nested Routes
//* Nested routes were implemented inside another route element.
//*  The content to be rendered by the nested route is placed inside the 'Outlet' component.

//? Switching Between Nested Routes
//* To switch between the nested routes, another navigation was implemented using 'NavLink' components.
//* These link to the different URLs, which in this case are sub-URLs, as in AppNav comp

//? Sub Routes Example
//* An example of this implementation can be seen with the sub-routes of 'cities' and 'countries'.

//*=====================================================================

//& Usage of Outlet Component routes:  <Outlet />
//* how to display one component or one element inside another component
//* that's where the outlet component provided by React Router comes into play.

//* as in sidebar (outlet)

//*=====================================================================
//& another usefulness of react router
//* storing state in the URL so that we can use it in different places of the application (use it globally)

//*=====================================================================

//! Video 216:  Dynamic Routes With URL Parameters
//& Title: React Route with Params

//? Using Params with React Router
//! To use params with React Router, we basically do it in three steps.

//* Step 1: Create a New Route
//~ <Route path="cities/:id" element={<City />} />

//~ path="cities/:parameter"  above parameter is id

//* Step 2: Link to the Route
//~ const { cityName, id, position } = city;
// eslint-disable-next-line no-lone-blocks
{
  /*
 <li>
          <Link
     
            to={`${id}?lat=${position.lat}&lng=${position.lng}`}
          >
            <h3>{cityName}</h3>
          </Link>
  </li> 
*/
}

//* Step 3: Read the State from the URL in another component  ( get that data from the URL)
//~ const { id } = useParams();

//~ id variable name in destruction, must match the name in the path in Route
//~ <Route path="cities/:id" element={<City />} />

//*=====================================================================
//! Video 217. Reading and Setting a Query String
//& Query String

//^ Create query string by passing it to (to prop) in the link
//~ general form: to={`${parameter}?querystring1=${value1}&querystring2=${value2}`} >

//? CityItem Comp
//* <Link
//*  className={styles.cityItem}
//*  to={`${id}?lat=${position.lat}&lng=${position.lng}`} >

//^ to read the query string in other component, use hook (useSearchParams)
//? Map Comp and also in City Comp
//* const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();
//! 'lat' inside get, must match the parameter name in the to attribute in link jsx element in CityItem (to={`${id}?${position.lat}&${position.lng}`})
//   const lat = searchParams.get("lat");
//   const lng = searchParams.get("lng");

//^ set or update Query string
//* by setSearchParams, we pass new query string in an object as follows

// eslint-disable-next-line no-lone-blocks
{
  /*
<button
onClick={() => {
 //* setSearchParams({ lat: 23, lng: 50 });
}}
>
Change Position
</button> */
}

//*=====================================================================
//! Video 218
//& Title: Programmatic Navigation

//? Imperative Way
//* Programmatic navigation basically means to move to a new URL without the user having to click on any link.
//* A common use case of this behavior is right after submitting a form.
//* Many times when the user submits a form, we want them to move to a new page in our application automatically,
//* without having to click on any link.
//* We can use programmatic navigation to achieve that.

//! const navigate = useNavigate();

//~ EXAMPLE 1:
//* Move to form comp to enter city details of a location when click on that location on the Map

//^ imperative way to move to form
//* navigate("form"); "form" must match same value of Path in route element in App.jsx
//! <Route path="form" element={<Form />} />
// eslint-disable-next-line no-lone-blocks
{
  /* <div
className={styles.mapContainer}
onClick={() => {
  navigate("form");
}}
>
<h1>Map</h1>
<h1>
  Position: {lat},{lng}
</h1>
<button
  onClick={() => {
    setSearchParams({ lat: 23, lng: 50 });
  }}
>
  Change Pos
</button>
</div> */
}

//~ EXAMPLE 2:
//* Back button
// eslint-disable-next-line no-lone-blocks
{
  /*
 
<Button
type="back"
onClick={(e) => {
  e.preventDefault(); //* to prevent form reload
  //* navigate(-1);   (-1) one step backwards
}}
>  &larr; Back
</Button> 

*/
}

//*===================================================================
//! Video 218
//& Customized button component:
//? Customization parameters
//* children represents the content
//* onClick
//* type for custom css style ( to conditionally add a CSS class )

//~ import styles from "./Button.module.css";

// .btn {
//   color: inherit;
//   text-transform: uppercase;
//   padding: 0.8rem 1.6rem;
//   font-family: inherit;
//   font-size: 1.5rem;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// }

// .primary {
//   font-weight: 700;
//   background-color: var(--color-brand--2);
//   color: var(--color-dark--1);
// }

// .back {
//   font-weight: 600;
//   background: none;
//   border: 1px solid currentColor;
// }

//* function Button({ children, onClick, type }) {
//*   return (
//!    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
//*       {children}
//!    </button>
//*   );
//* }

//*=====================================================================
//! Video 219
//& Declarative Way: Navigate Component
//* The Navigate component that we're going to learn about now is not so much used anymore,
//* but there is still one very important use case for it, which is inside nested routes.

// eslint-disable-next-line no-lone-blocks

{
  /* <Route
index
path="cities"
element={<Navigate replace to="cities" />}
/> */
}

//* replace prop is : replace the current element in the history stack.
