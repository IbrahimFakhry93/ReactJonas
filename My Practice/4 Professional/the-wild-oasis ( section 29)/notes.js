//! 375. Client-Side Filtering: Filtering Cabins

//^ open: filter.jsx

//* So basically we want the ability to filter this table here

//& Title: Filtering Cabins by Discount

//? Objective: Allow users to filter cabins or (Table in general) based on whether they have a discount.

//~ Approach:
//*   - Add buttons for "All Cabins," "Discounted Cabins," and "Non-Discounted Cabins."
//*   - Store the selected filter value in the URL for shareability.
//*   - Update the URL state from a separate filter component.
//*   - The filter component can be placed anywhere in the component tree. (can be used to filter cabins, bookings)
//* since we can read that state from everywhere in the app,

//^ open: Cabins.jsx
//* and place at  <p>Filter / Sort</p> another component called
//* cabin table operations. So operations because we're gonna have filter and sort here.

//^ create: CabinTableOperations.jsx
//* As we click on each of FilterButtons,
//* we need to update the URL state.

//! review the video
//! add dashes to the values because they will end up in the url
//! so they shouldn't be dashes in there.

//^ open: Filter:
// const [searchParams, setSearchParams] = useSearchParams();
//* to store this value in the url, we use (useSearchParams hook)
//* This hook comes from ReactRouter

// useSearchParams hook is similar to use state
// because it also gives us the state.
// So the searchparams themselves,
// and then as a second value, it gives us a way to update them (setSearchParams)
//^=============================================
//* searchParams.set('discount',value);
//* setSearchParams(searchParams);

// Then here the first value above is the name of the state.
// So of the field in the URL.  (discount)
// And then second is the one (value) that we are receiving in the function(handleClick)
//^=============================================

//? next step:
//* Get the data from url into the table and sort the data accordingly
//^ open: CabinTable.jsx
//* const [searchParams] = useSearchParams();

//! review the video
//* But now watch what happens
//* as we actually come to this page (Cabins) for the first time
//* (like navigate to bookings then return back), we get null (filterValue is null)
//* Even what we will want in this situation is to show all the cabins with no filter applied.

//? so use ShortCircuiting:
//* const filterValue = searchParams.get("discount") || "all";  (in CabinTable)
//* We assign the filterValue to determine the filtered data that will be displayed

//& make a reusable filter:
//* so to be used for cabins and bookings
//* we need to pass all the data that might change as props (filterField, options))

//^ look at Filter.jsx
//* searchParams.set("discount", value);
//* discount, it is the filterField
//* options parameter in Filter function inside Filter Component will be an array of (FilterButtons)
//* value and label (text in UI)

//^ open: CabinTableOperations.jsx
//* then pass these values( filterField, options) in the CabinTableOperations.jsx
//* which is where we include this filter component.

//& Read the filter field from the url
//* const currentFilter = searchParams.get(filterField) || options.at(0).value;
//& to display which button or option is selected or active
//*? active={option.value === currentFilter}
//* selected one will have blue background
//* use active prop (look at FilterButton style)
//* if active is true, display background
//* To check the boolean value of active (true or false) by using url

//~ disabled={option.value === currentFilter}
//* to disable the other non selected buttons and make them unClickable
//*=======================================================================================

//! 376. Client-Side Sorting: Sorting Cabins

//* So besides the filter up the table
//* we want to have a dropdown menu where we can select
//* which of these fields here we want to sort the data by.

//^ create: SortBy.jsx Component in UI Folder and include it in CabinTableOperations.jsx

//* Sort component same as Filter component will receive list of options (array)

//^ open: CabinTableOperations.jsx

// { value: "name-asc", label: "Sort by name (A-Z)" },
// { value: "name-desc", label: "Sort by name (Z-A)" },

//& Title: Sorting Information
//? We are encoding two types of information inside (value):
//*   1. The field by which we want to sort (ex. name, regularPrice, maxCapacity )
//*   2. The direction of sorting (ascending or descending).
//*   Keeping it simple by combining both in this value.

// { value: "regularPrice-asc", label: "Sort by price (low first)" },
// { value: "regularPrice-desc", label: "Sort by price (high first)" },

//~ Sort by the price:

//* the name of the fields (regularPrice as in the database (SupaBase Cabin Table),
//* so as we also receive them here in our application from the API.

//^ open: SortBy.jsx

//* We will have one select element with one option for each of these elements of the array.

//^ Open: select.jsx in UI folder
//* Since we want select element many times in the application
//* let's build a reusable one

//* Select will have active value in its parameters
//* because after all, they are controlled elements

// function Select({ options, value }) {
//   return (
//     <StyledSelect value={value}>
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </StyledSelect>
//   );
// }

//^ in SortBy.jsx
//* After creating the searchParams state and handle the select event in handleChange
//* we need to read the selected value in the CabinsTable and do the sorting

// const sortedCabins = filteredCabins.sort((a, b) => a[field] - b[field]); //* this sorting by ascending way
//* But if we want to sort it in a descending way we need to convert the positive number
//* that this here (field) is gonna create to a negative number or if this is a negative number
//* then we need to convert it to a positive number

//*==================================================================================

//! 377. Building the Bookings Table

//* Create another row in guests and booking in supabase

//^ open: apiBooking.js

//* Add one service to the apiBooking, to load all the bookings data from supabase
//* then we want to get the data to the bookings table

//^ open: BookingTable.jsx in bookings folder - Bookings.jsx in pages folder

//^ open: Empty.jsx
//* when there is no data return Empty component
//* if (!bookings?.length) return <Empty resourceName="Bookings" />;

//* Add the same to CabinTable

//^ Create: useBookings
//* Next, we want to connect booking table to getBookings in apiBooking
//* so we use react query to fetch bookings data and receive it in bookings table.

//& Flexibility of Supabase API:

//* we need to not only load the data about this booking, but also about this cabin, and this guest.
//* so open: apiBookings

//!   const { data, error } = await supabase.from("bookings").select("*");
//? rewrite it as follows:
//!   const { data, error } = await supabase.from("bookings").select("*, cabins(*), guests(*)");

//? or: write only the field or column that we want:

//! const { data, error } = await supabase.from("bookings").select("*, cabins(names), guests(fullName,email)");

//? or:

// const { data, error } = await supabase.from("bookings").select("id,created_at,startDate,endDate,numNights,numGuests,status,totalPrice, cabins(names), guests(fullName,email)");

//^ open Tag and BookingRow

//*=====================================================================================================================

//! 378. Uploading Sample Data

//^ open: data folder and check uploader file
//^ open: sidebar.jsx and place uploader there

//* change the policies for the bookings in supabase (insert, update, delete)
//* same for guests in supabase

//*==============================================================================================

//! 379. API-Side Filtering: Filtering Bookings
//^ open: Bookings.jsx  - BookingTableOperations
//* place BookingTableOperations in Bookings

//? Client side filtration of Cabins

//* We received all the data from our supabase API in the table.
//* And then in the table is where we did the filtering and the sorting.
//* the operations happened already on the client side,
//* Filtration of Bookings will be different

//? Filtration of Bookings will be different
//? Server Side (on API side of the data ) Filtration with the bookings,

//* for example. if I want to filter, for "checked out,"
//* then I want the API to only send me all the bookings
//* that have the "checked out" status.

//* So I don't want to receive all of them,
//* and then just filter them here on the client side.
//* But instead, really only that filtered data
//* should get downloaded from supabase.

//^ open: apiSettings.js  and look at getBookings

//? use eq method and gt (greater than) method or lt (less than)
// const { data, error } = await supabase
// .from("bookings")
// .select(
//   "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName,email)"
// ).eq("status","unconfirmed").gt('totalPrice',5000)

// But now of course, we want to get the data from url.
// and then filter for these values right here. So not having it hard coded

//* we can't use "use searchparams" hook inside regular function as getBookings

//^ open: useBookings.js
//* Instead, we can use it right here in "use bookings."
//* And so this really is the perfect place where we can now read the filtered value,
//* and then pass it into the "getBookings" function.

//^ go to apiBookings
//* pass filter object and sortBy object to getBookings function
//* filter object contains of (filter-field and value)

//* we will build the query there from scratch in multiple parts

//! problem:
//* it will works but when change the filtration field by clicking on filters buttons
//* it won't work, it will only show the new data when refreshing the page reloading the page

//! why is that?

//* because queryKey is set to 'bookings' only (depends on booking only)

//! solution:
//* add another dependent value in queryKey array (for ex. filter)
//* go to queryKey in useBookings    queryKey: ["bookings",filter],

//* so now, basically whenever this filter changes, then React Query will re-fetch the data.
//* queryKey is the dependency array of useQuery So this works exactly in the same way
//* as the dependency array of the useEffect hook

//*=======================================================================================================================

//! 380. API-Side Sorting: Sorting Bookings
//*=======================================================================================================================

//! 381. Building a Reusable Pagination Component

//* Build a reusable pagination

//* Render few buttons to set the current page state to the URL

//^ open: Pagination.jsx and BookingTable.jsx

//* place pagination in BookingTable.jsx under table body in the footer

//* Add Arrow next and previous buttons
//* Make the pagination get the number of results
//* so pass count prop to Pagination function

//* create nextPage and PrevPage function
//* Calculating the next page or the previous page
//* will always depend on the current page.
//* the current page is to get from the URL by useSearchParams hook
//*=======================================================================================================================

//! 382. API-Side Pagination: Paginating Bookings

//^ open: BookingTable.jsx , useBooking, apiBooking
//* then pass (count) it as a prop to BookingTable

//* 1) Length of Booking array (in useBooking)
//? or
//* 2) use second arg of supabase and pass in it object {count:exact} (in apiBooking)

//* So calculate number of results (count) in apiBooking in getBookings function
// let query = supabase
// .from("bookings")
// .select(
//   "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName,email)",
//!   { count: "exact" }

//* copy currentPage calculation logic to useBooking
//* pass the current page to queryKey to refetch the data when we change the page
//* and getBookings

//^ Create: constants.js
//* move PAGE_SIZE from Pagination to constants file (in case of easy maintenance if we need to modify PAGE_SIZE only from one place)
//* export and import PAGE_SIZE anywhere it is needed
//* We need PAGE_SIZE to calculate from and to for range method

//* Use Prefetching for better user experience when we move to a page hasn't fetched yet, but the behind pages
//* that had already fetched, will be cached

//*=======================================================================================================================
//! 383. Prefetching With React Query
// prefetching is all about fetching some data

// that we know might become necessary

// before we actually need that data to render it

// on the user interface.

// And in the context of pagination, usually that means

// that we fetch the next page before it is actually displayed.
// So in this case,

// that would mean that here in page number seven,

// we would already have page number eight here in the cache

// and so then when we move there,

// this data from page number eight could simply be get

// from the cache and rendered.

//^======

// the way this works is that we first need to QueryClient

// and then on there we call the Prefetch Query method.

// So to get that QueryClient, we need to use

// the use QueryClient hook.

//*=======================================================================================================================

//! 384. Building the Single Booking Page

//*=======================================================================================================================

//! 385. Checking In a Booking
//& Title: Hotel Check-In and Checkout Process
//? Confirming Payment and Guest Check-In:
//* - Hotel employees must verify payment receipt during guest check-in.
//* - Only after confirming payment can the guest be officially checked in.

//? Breakfast Purchase at Checkout:
//* - During checkout, guests can buy breakfast for their entire stay.
//* - If they haven't already purchased breakfast, this option is available.

// Let's proceed with implementing these features.
// Remember to handle payment confirmation and breakfast purchase logic.
// Happy coding!

//^=================================================

//& Title: Implementing Guest Check-In and Payment Confirmation

//? Guest Check-In Options:
//* - Guests can be checked in from the booking detail page.
//* - Alternatively, check-in can occur directly from the context menu.
//* - A link will also allow check-in for guests arriving on the same day in DashBoard

//^ File: BookingRow.jsx
//? Important Consideration:
//* - Not all bookings are eligible for check-in.
//* - Already checked-in or checked-out bookings cannot be checked in again.
//* - Only unconfirmed bookings can be checked in.

//^ File: BookingDetail.jsx
//* Place the check-in button within this component.

//^ File: App.jsx
//* Implement the check-in route in App.js.

//^ File: CheckIn.jsx (inside the "page" folder)
//^ Include CheckinBooking.jsx in CheckIn.jsx.
//! create confirmPaid state in checkinBooking,jsx
//! connect this state to the checkbox
//*=============
//? Payment Confirmation Feature:
//* - Hotel employees must confirm whether a booking has been paid.
//* - Add a checkbox for payment confirmation.
//* - The user must check the box before confirming.

//* - Initialize the checkbox state as false.
//* - Later, update the state with the actual payment status.

//^ File: CheckBox.jsx (in the "UI" folder)
//* Place the checkbox within the Box component in CheckInBooking.
//* Manage the checkbox state as a controlled element.

//? Initial State:
//* - Start with the checkbox unchecked (false).
//* - Later, an effect can set the value based on actual payment status.
// useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

//! Handling Nullish Values with Nullish Coalescing Operator
//? Note
//* The nullish coalescing operator (??) provides a concise way to handle null or undefined values.
//* It ensures safe access to properties and offers fallbacks when needed.
//* In the context of our useEffect hook, it guards against potential null or undefined values.

//? Example usage:
//~ useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

//? Disable Undo:
//* - Disable the checkbox once payment confirmation is true.

//! Bug Fix:
//* Data retrieval delay:
//* - Ensure data arrives promptly.
//^ open: useBooking.jsx
//* - Include bookingId in queryKey to refetch data when switching between bookings.

//? Check-In Process:
//* - Update the booking status from unconfirmed to checked in.
//* - Set "isPaid" to true.

//^ Custom Hook: useCheckin.js
//*=======================================================================================================================

//! 386. Adding Optional Breakfast

//^ open: CheckinBooking.jsx
//* Add new checkbox for breakfast
//* create new state (addBreakfast)

{
  /* <Checkbox
            checked={addBreakfast}
            onChange={() => {
            setAddBreakfast((add) => !add);
            setConfirmPaid(false);
            }}
            //* id="breakfast"
            >

            Want to add breakfast for x?
</Checkbox> */
}

//* We should also give Checkbox an ID so we can easily click there on that label as well.

//? Breakfast Price Calculation
//* Use settings table in supabase to calculate the breakfast price
// const optionalBreakfastPrice =
// settings.breakfastPrice * numGuests * numNights;

//*==================================================================================

//! 387. Checking Out a Booking (+ Fixing a Small Bug)

//^ open: BookingRow, BookingDetails, useCheckout
//& Title: Handling onClick Event for Check Out Button
//? Note
//* The onClick event handler for the "Check Out" button can be defined in different ways.
//* Let's explore the correct approach to ensure the bookingId is properly passed.

// Approach 1 (Problematic):
{
  /* <Menus.Button
  icon={<HiArrowUpOnSquare />}
  onClick={(bookingId) => checkOut(bookingId)}
  disabled={isCheckingOut}
>
  Check Out
</Menus.Button> */
}
// In this approach, you’re passing a function with an argument (bookingId) => checkOut(bookingId) directly to the onClick prop.
// The issue is that the bookingId is not being correctly passed to the checkOut function.

// Approach 2 (Working):
{
  /* <Menus.Button
  icon={<HiArrowUpOnSquare />}
  onClick={() => checkOut(bookingId)}
  disabled={isCheckingOut}
>
  Check Out
</Menus.Button> */
}

// In this approach, you’re using an arrow function without any arguments (() => checkOut(bookingId)).
// The bookingId is correctly captured from the surrounding scope (where it’s defined) and passed to the checkOut function.

// Explanation:
// When you use (bookingId) => checkOut(bookingId), it creates a new function that expects an argument (bookingId). However, the actual value of bookingId is not being passed to this function.
// In the working approach, the arrow function () => checkOut(bookingId) captures the correct value of bookingId from the outer scope.
// To fix the problematic approach, ensure that the bookingId is correctly accessible within the scope where the onClick handler is defined. The working approach should be used to pass the correct value to the checkOut function.

//! Bug Fix:
//* when clicking on filter buttons we get this error
//! An offset of 10 was requested, but there are only 5 rows.
//* solution: set pages to 1

//^ open: Filter

//* add inside handleClick function
//*  if (searchParams.get("page")) searchParams.set("page", 1);
//*==================================================================================
//! 388. Deleting a Booking

//^ useDeleteBooking.jsx - ConfirmDelete.jsx - BookingDetail.jsx - BookingRow.jsx
//* Use Modal and ConfirmDelete before deleting a booking

//* We can passing onSuccess, onError, onSettled to individual mutation
{
  /* <ConfirmDelete
resourceName="booking"
onConfirm={() =>
  deleteBooking(bookingId, { onSettled: () => navigate(-1) })
}
disabled={isDeleting}
/> */
}
//*==================================================================================
//! 389. Authentication: User Login With Supabase
// users actually need to be logged into the application

// in order to use it.

// And so now we're going to use Supabase

// to implement this super important part of this

// and of most other web applications.

// We will also use Supabase

// to sign up users in the first place,

// to update their data and password

// and even to upload a user avatar.

//^ open: LoginForm.jsx - Login.jsx

//* place LoginForm component in Login.jsx

//^ open: Heading.jsx and create h4

//^ Go to supabase and create first user
//* users are existed in authentication tab in supabase
//* go to providers tab - email - disable confirm email to ease developing
//* create the user with email and password then connect it with frontend
//* go to API docs then select authentication

//? user management:
//* user sign up
//* user login with email and password
//* use OAuth
//* get current logged in user
//* password reset
//* update and log out

//* copy user login logic from supabase

// let { data, error } = await supabase.auth.signInWithPassword({
//   email: 'someone@email.com',
//   password: 'IZKAUwcOZtooiBykgsBS'
// })

//^ open apiAuth and create async login function and paste user login logic from supabase

//! export async function login({ email, password }) {
//   let { data, error } = await supabase.auth.signInWithPassword({
//     email: "someone@email.com",
//     password: "IZKAUwcOZtooiBykgsBS",
//   });
// }

//! note:
//* pass object ({email,password}) to login function
// in modern front end development it's pretty common to not pass
// in multiple arguments into a function, but just one object.
// and immediately destructure it

//* so now we can go use this function to log that user

// that we created initially in.

// Now, in order to do this, we will again use React Query,

//* to test this function let's log it in handleSubmit function
//* check in console.log(data)
//* you will find session, user inside it, you will find the login email, and role:authenticated

// And so from now on, on all the next requests

// Supabase will automatically send this data to the server

// to basically let Supabase know

// that we are currently authenticated.

// So Supabase, I believe stores this data auth token (access token - refresh token) in local storage.

//* then direct the user to dashboard
// we also want to show some indicator here

// that login is actually happening right now.

// And so for all that it's best to again use React Query.

//^ create custom hook useLogin.js

//! use useMutation hook, why:
// and then here we will use a mutation actually

// to handle this login.

// So it's a mutation

// because actually something changes on the server.

// So basically a user gets authenticated

// and also it's gonna be a lot easier

// to then handle the success

// and error states if this is a mutation.

//*=======================================================================================
//! 390. Authorization: Protecting Routes

//* Implement authorization so that only logged in users can actually access our application.

//^ Open App: wrap the entire application (AppLayout route) in a protected route component

// that will mean that all of these different routes can only be accessed
// if the protected layout component determines that there is a currently logged in user.

//^ create in ui folder ProtectedRoute.jsx

//* Protected Route will only return the children components, if only the user is authenticated

//^ open: apiAuth.jsx
//! why create new function (getCurrentUser) to get user in apiAuth

// to load the authenticated user.

// And so for that, we once again will create a new function

// here in API auth.

// Now you might wonder why we actually need a function

// to load the user from Supabase again

// if we just saw the user here in the console

// right after logging in.

// Now the thing is that the user might want to access

// this page a bit later,

// so not only after they have logged in.

// So in a web application, even if you logged in

// like a day ago and if you then reload the page,

// you will still want to be logged in,

// not only immediately after you do that login process.

// And so then each time that you reload the page,

// for example, a day later, then that user

// will need to be refetched from the Supabase API.

// And so then we can check if that user exists

// and if they are still authenticated.

//^ inside getCurrentUser function
//*   const { data: session } = await supabase.auth.getSession();

// first we actually need to check

// whether there is an active session.

// So for that we use get session.

// And so this will actually get that data

// from local storage that I showed you earlier.

//^ go to ProtectedRoute and use the useUser custom hook

//* create fullPage styled component to render the loading spinner in the center of the page

// because in the beginning, while we are still loading,

// the user is also not authenticated yet.

// But that doesn't mean

// that we want to redirect them to the login page.

// And so here, let's also say and is not is loading.

// So basically when we are no longer loading

// and then the user is not authenticated,

// then that means that they are not allowed

// into the application.

// And so then we redirect them to the login page.

//! Reset the input field if the password or email are wrong
//^ so go to LoginForm, where the states and controlled input fields are exist
//* and remember that login function is a mutation function
//* so we can pass onSettled, onSuccess, onError
//* we pass onSettled whether the request is successful or not
//* so we capture the case where email or password are wrong
// login(
//   { email, password },
//   {
//     onSettled: () => {
//       setEmail("");
//       setPassword("");
//     },
//   }
// );

//*============================================================================================

//! 391. User Logout

//* Button logout in the header
//* Place Logout Comp in Header
//^ create Logout.jsx in authentication

//^ open Header.jsx

//^ open apiAuth.js
//* create function logout

//* navigate("/dashboard", { replace: true });
//*       navigate("/login", { replace: true });
// erase the place that we were earlier.

// So otherwise going back,

// using this back button here is not really gonna work.

//^=============================
// remove the current user

// from the React Query cache.

// So just logging out, we'll of course remove the user here

// from local storage and also from the server

// but they will stay inside the cache.

// So because we stored it right here.

// And so if, for some reason, some malicious actor gets access

// to that, that would be very bad.

// And so we can actually remove all queries.

// So actually not just the user, but really

// all queries that have been accumulated in that cache.

//*==================================================================

//!  392. Fixing an Important Bug
//*==================================================================

//! 393. Building the Sign Up Form
// in this application,

// not everyone can create a new account.

// So, not everyone can sign up for this application, unlike,

// for example, something like Twitter or Reddit.

// So here in this app, only employees

// of the hotel should actually be users of this app.

// that these users can only be created inside the application.

// And so this way new users are basically immediately verified

// by the existing hotel staff

// because only that stuff can actually create new users.

//^ open: Users.jsx in pages folder -  SignupForm.jsx

// Use the React hook form library in SignupForm

// So whenever we have a bigger form like this one here

// and which needs some important validation,

// it's a good idea to use a helper library like that one.

//^ use register with input fields

// use the register

// function here in each of these inputs to give them a name

// and basically manage this state.

// So then React hook form will actually manage the state

// and not us manually.

// {...register("fullName", { required: "This field is required" })}
//* field name is (fullName)
// calling register function here will basically create a few props

// which we then spread with this onto this input component.

//^ llok at confirm passowrd input field , we will use getValues there
//*   const { register, formState, getValues, handleSubmit ,reser } = useForm();

//* handleSubmit will us to register our custom handle function
//* inside handleSubmit is where we call function onSuccess and onError

//*===================================================================

//! 394. User Sign Up
// use the form that we just created

// in order to sign up users

// to our application and basically to our Superbase database

//* after testing sign up successfully
//* go to providers in Authentication and make email confirm email
//* also change all email templates

//* url configuration
//? site URL
//* whenever the user gets an email
//* so they can confirm their account,
//* we want them to then be redirected
//* to exactly this URL http://localhost:5173/dashboard instead of http://localhost:3000/

//? redirected URLs:
//* http://localhost:5173

// Just make sure to update these two URLs (site URL, redirected URLs:) again

// once you deploy this application to a production server.

//^ open site: temp-mail.org
//* create temp mail then sign up with it
//* then look this new created user by the temp mail in supabase
//* then you will find in last sign in column (waiting for verification)
//* so you can't log in with this email before verification
//* then return to temp mail site and look up the inbox
//* you will find confirm mail then confirm it
//* then return to supabase and reload

//? next video:

// There is just one thing that we need to do now

// which is actually related to Superbase,

// which is to change

// the row level security policies to only allow access

// to all of these resources here

// to users that are actually authenticated.

// So our application itself here is protected,

// but not the resources coming from the Superbase Api.

//*===================================================================

//! 395. Authorization on Supabase: Protecting Database (RLS)
