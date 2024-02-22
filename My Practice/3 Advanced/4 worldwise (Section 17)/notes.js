//& Usage of nested routes:

//* we need nested routes when we want a part of the user interface to be controlled by a part of the URL.

//* show a part of the UI  based on some part of the URL.

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

//& Usage of Outlet Component routes:  <Outlet />
//* how to display one component or one element inside another component
//* that's where the outlet component provided by React Router comes into play.

//& Usage of index route:
//* index route is the default child route that is going to be matched
//* if none of these other routes here matches.

// Now if we think about this,

// then what we just implemented here

// is actually very similar to something like a tabs component,

// but implemented in a very different way.

// So before, if we wanted to implement a tab component

// where we have these tabs here

// and then the content changes

// according to which is the active tab,

// we would've implemented that using the U state hook

// to manage the currently active tab.

// But here with React Router, we do the same thing,

// but in a very different way.

// So instead of using the U state hook to manage state,

// we basically allow React Router

// enter URL to store that state of the active tab.

// And so then whenever this URL here changes,

// then we change which tab is currently active.

// So React Router is a whole new way

// of thinking about how we built an application.

// Now of course that doesn't mean at all

// that all we have learned before is useless.

// So we still build components like accordions

// or tabbed components like the one I just mentioned

// using the U state hook all the time.

// But from now on, the overall navigation of the application

// is in the real world always managed

// by something like React Router.

// And so that includes a small sub navigation like this one.

//*=====================================================================

// So hopefully this wasn't too confusing

// but just make sure to review all we just did.

// So how we implemented our nested routes here

// inside another route element.

// Then we rendered whatever the nested route

// wants to render inside the outlet component here.

// And then to actually switch between the nested routes

// we implemented yet another navigation

// with these Nav link components to basically link

// between the different URLs,

// which in this case are these sub URLs.

// So with the sub routes of cities and countries.
