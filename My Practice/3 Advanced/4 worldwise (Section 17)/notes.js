//! Video 212

//& Usage of nested routes:

//* we need nested routes when we want a part of the user interface to be controlled by a part of the URL.

//* show a part of the UI  based on some part of the URL.

// in the URL, we have slash app and then slash cities.

// And so basically this cities part here is displayed because in the URL we have cities.

// eslint-disable-next-line no-lone-blocks
{
  /* 

<Route path="app" element={<AppLayout />}>    //& Parent Route
    <Route index element={<p>List of cities</p>} />    //& index Route
    <Route path="cities" element={<p>List of cities</p>} />    //& Child Route
    <Route path="countries" element={<p>List of countries</p>} />   //& element can be any JSX or component
    <Route path="form" element={<p>form</p>} />
</Route> 


*/
}

//=====================================================================

//& Usage of Outlet Component routes:  <Outlet />
//* how to display one component or one element inside another component
//* that's where the outlet component provided by React Router comes into play.

//* as in sidebar (outlet)

//=====================================================================

//& Usage of index route:
//* index route is the default child route that is going to be matched
//* if none of these other routes here matches.

//*=====================================================================

//& Title: React Router vs Use state hook

//* Now if we think about this, what we just implemented here is actually very similar to something like a tabs component, but implemented in a very different way.

//? Implementing a Tab Component
//* So before, if we wanted to implement a tab component where we have these tabs here and then the content changes according to which is the active tab
//* we would've implemented that using the Use state hook to manage the currently active tab.

//? Using React Router
//* But here with React Router, we do the same thing, but in a very different way. So instead of using the Use state hook to manage state,
//* we basically allow React Router enter URL to store that state of the active tab.
//* And so then whenever this URL here changes, then we change which tab is currently active.

//? React Router: A New Way of Thinking
//* So React Router is a whole new way of thinking about how we built an application.

//? The Value of Previous Learning
//* So we still build components like accordions or tabbed components like the one I just mentioned using the U state hook all the time.

//? Navigation in Real World Applications
//* But from now on, the overall navigation of the application is in the real world always managed by something like React Router.
//* And so that includes a small sub navigation like this one.  (cities and countries tabs)

//*=====================================================================
//& Title: Implementing Nested Routes

//? Implementing Nested Routes
//* So how we implemented our nested routes here inside another route element.
//*  Then we rendered whatever the nested route wants to render inside the outlet component here.

//? Switching Between Nested Routes
//* And then to actually switch between the nested routes we implemented
//* yet another navigation with these Nav link components to basically link between the different URLs, which in this case are these sub URLs.

//? Sub Routes Example
//* So with the sub routes of cities and countries.

//*=====================================================================
//& another usefulness of react router
//* storing state in the URL so that we can use it in different places of the application (use it globally)

//*=====================================================================

//! Video 216
//& Title: React Route with Params

//? Using Params with React Router
//! To use params with React Router, we basically do it in three steps.

//* Step 1: Create a New Route
//~ <Route path="cities/:id" element={<City />} />

//~ path="cities/:parameter"  above parameter is id

//* Step 2: Link to the Route
//~ const { cityName, emoji, date, id, position } = city;
// eslint-disable-next-line no-lone-blocks
{
  /* <li>
<Link
  className={styles.cityItem}
  to={`${id}?lat=${position.lat}&lng=${position.lng}`}
>
  <h3 className={styles.name}>{cityName}</h3>
</Link>
</li> */
}

//* Step 3: Read the State from the URL  ( get that data from the URL)
//~ const { id } = useParams();

//~ id variable name in destruction, must match the name in the path in Route
//~ <Route path="cities/:id" element={<City />} />

//*=====================================================================
//! Video 217
//& Query String

//^ Create query string by passing it to (to prop) in the link
//~ general form: to={`${parameter}?querystring1=${value1}&querystring2=${value2}`} >

//? CityItem Comp
//* <Link
//*  className={styles.cityItem}
//*  to={`${id}?lat=${position.lat}&lng=${position.lng}`} >

//^ to read the query string in other component, use hook (useParams)
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
  /* <button
onClick={() => {
  setSearchParams({ lat: 23, lng: 50 });
}}
>
Change Pos
</button> */
}

//*=====================================================================
//! Video 218
//& Title: Programmatic Navigation

//? Imperative Way
//* Programmatic navigation basically means to move to a new URL without the user having to click on any link.
//* A common use case of this behavior is right after submitting a form.
//* Many times when the user submits a form, we want them to move to a new page in our application automatically, without having to click on any link.
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
//!     <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
//*       {children}
//*     </button>
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
