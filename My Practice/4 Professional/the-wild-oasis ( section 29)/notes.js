//! 375. Client-Side Filtering: Filtering Cabins

import { supabaseUrl } from "./src/services/supabase";

//^ open: Filter.jsx

//* So basically we want the ability to filter this table here

//& Title: Filtering Cabins by Discount

//? Objective:
//* Allow users to filter cabins or (Table in general)
//* based on whether they have a discount.

//~ Approach:
//*   - Add buttons for "All Cabins," "Discounted Cabins," and "Non-Discounted Cabins."
//*   - Store the selected filter value in the URL for shareability.
//*   - Update the URL state from a separate filter component.
//*   - The filter component can be placed anywhere in the component tree.
//*  (can be used to filter cabins, bookings) since we can read that state from everywhere in the app,

//? Note:
//* URL state is the filterField
//* filterField in cabins is discount
//* filterField in bookings is status

//? const [searchParams, setSearchParams] = useSearchParams();
//* to store this value in the url, we use (useSearchParams hook)
//* This hook comes from ReactRouter

//* useSearchParams hook is similar to use state
//* because it also gives us the state.
//* So the searchparams themselves are the state
//* and then as a second value, it gives us a way to update them (setSearchParams)

//* searchParams.set('discount',value);
//* setSearchParams(searchParams);

//* Then here the first value above is the name of the state.
//* So of the field in the URL.  (discount)
//* And then second is the one (value) that we are receiving in the function(handleClick)

//^ open: Cabins.jsx
//* and place at  <p>Filter / Sort</p> another component called (cabin table operations.)
//* So operations because we're gonna have filter and sort here.

//^ create: CabinTableOperations.jsx
//* As we click on each of FilterButtons,
//* we need to update the URL state.

//! review the video
//! add dashes to the values because they will end up in the url
//! so they shouldn't be dashes in there.

//^=============================================

//^ open: CabinTable.jsx
//? next step:
//* Get the data from url into the table and filter the data accordingly
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
//* value (will pass to handleClick) and label (text in UI)

//^ open: CabinTableOperations.jsx
//* then pass these values( filterField, options) in the CabinTableOperations.jsx
//* which is where we include this filter component.

//^  open: Filter
//& Read the filter field from the url
//! current filter is used for activation after clicking
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

//& Title: Sorting Information
//? We are encoding two types of information inside (value):
//*   1. The field by which we want to sort (ex. name, regularPrice, maxCapacity )
//*   2. The direction of sorting (ascending or descending).
//*   Keeping it simple by combining both in this value. (value: "regularPrice-asc")

// { value: "name-asc", label: "Sort by name (A-Z)" },
// { value: "name-desc", label: "Sort by name (Z-A)" },
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

//^ Open: CabinTable.jsx
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

//^ Create: useBookings.js
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

//! in bookingRow
// const statusToTagName = {
//   unconfirmed: "blue",
//   "checked-in": "green",
//   "checked-out": "silver",
// };

//* <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

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

//^ open: apiBookings.js  and look at getBookings

//? use eq method and gt (greater than) method or lt (less than)
// const { data, error } = await supabase
// .from("bookings")
// .select(
//   "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName,email)"
// ).eq("status","unconfirmed").gt('totalPrice',5000)

// But now of course, we want to get the data from url.
// and then filter for these values right here. So not having it hard coded

//* we can't use "use searchparams" hook inside regular function as getBookings
//* Instead, we can use it right here in "useBookings.js" custom hook

//^ open: useBookings.js
//* And so this really is the perfect place where we can now read the filtered value,
//* and then pass it into the "getBookings" function.

//^ go to apiBookings
//* pass filter object and sortBy object to getBookings function
//* filter object contains of (filter-field and value)

//* we will build the query there from scratch in multiple parts

//! problem:
//* it will works but when change the filtration field by clicking on filters buttons
//* it won't work, it will only show the new data just when refreshing the page reloading the page

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
//^ apiBookings.js

//^ look at getBookings function , sort part

//& In Supabase, the .order() method
//* It is used to sort the results of a query in either ascending or descending order.

// You specify the column you want to sort by (e.g., "id" in your example).
// You can choose whether the sorting direction is ascending (smallest to largest) or descending (largest to smallest).
// For instance, in your code snippet:

// const { data: cabinsIds } = await supabase
//   .from("cabins")
//   .select("id")
//   .order("id", { ascending: false });

//*=======================================================================================================================

//! 381. Building a Reusable Pagination Component

//* Build a reusable pagination

//* Render few buttons to set the current page state to the URL

//^ open: Pagination.jsx and BookingTable.jsx - constants in utils

//* place pagination in BookingTable.jsx under table body in the footer

//* Add Arrow next and previous buttons
//* Make the pagination get the number of results
//* so pass count prop to Pagination function

//* create nextPage and PrevPage function
//* Calculating the next page or the previous page
//* will always depend on the current page.
//* the current page is to get from the URL by useSearchParams hook

//^ look at nextPage:

//* const next = currentPage === pageCount  (means last page in next direction)
//* const prev = currentPage === 1   (means first page in back direction)
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
//^ open: useBooking.js and look at Prefetching part

//& Prefetching Data for Pagination

//? Overview:
//* Prefetching involves fetching data in advance, even before it's needed for rendering on the user interface.
//* This strategy is commonly used in pagination scenarios.

//! Example Scenario:
//* Imagine we're on page number seven of a paginated list.
//* By prefetching, we already have data for page number eight in our cache.
//* When the user navigates to page eight, we can simply retrieve the data from the cache and render it.

//^ How It Works:
//* 1. We start by obtaining the QueryClient (usually via the useQueryClient hook).
//* 2. Next, we call the Prefetch Query method on the QueryClient.
//*    This fetches the data in the background, making it available for future use.

//? Key Takeaways:
//* - Prefetching optimizes performance by reducing wait times when transitioning between pages.
//* - It ensures smoother user experiences by having necessary data ready ahead of time.

//& Implementation Steps:
//* 1. Obtain the QueryClient using the useQueryClient hook.
//* 2. Call the Prefetch Query method to fetch data for the next page.
//* 3. When the user navigates to that page, use the cached data for rendering.

//? Example Usage:
//* const queryClient = useQueryClient();
//* queryClient.prefetchQuery("myPaginationKey", fetchNextPageData);

//* Note: Replace "myPaginationKey" with an appropriate key for your pagination data.
//* Replace fetchNextPageData with your actual data-fetching function.

//*=======================================================================================================================

//! 384. Building the Single Booking Page

//^ App.jsx

//*  <Route path="bookings/:bookingId" element={<Booking />} />

//^ Booking.jsx

//* place BookingDetail.jsx in Booking.jsx

//^ BookingDetail
//* It needs booking data to display or render it by passing booking data
//* to
//* so it retrieves booking data from useBooking custom hook
// const { booking, isLoading } = useBooking();

//^ useBooking

// export function useBooking() {
// const { bookingId } = useParams();

// const {
//   isLoading,
//   data: booking,
//   error,
// } = useQuery({
//   queryKey: ["booking", bookingId],
//   queryFn: () => getBooking(bookingId),
// retry: false,
// });

// return { isLoading, booking, error };
// }

//* useBooking use (useParams) to get the bookingId
//* and pass it to getBooking function by useQuery to get the booking data
//* from supabase database
//*=======================================================================================================================

//! 385. Checking In a Booking

//& Title: Hotel Check-In and Checkout Process
//? Confirming Payment and Guest Check-In:
//* - Hotel employees must verify payment receipt during guest check-in.
//* - Only after confirming payment can the guest be officially checked in.

//? Breakfast Purchase at Checkout:
//* - During checkout, guests can buy breakfast for their entire stay.
//* - If they haven't already purchased breakfast, this option is available.

//& Title: Implementing Guest Check-In and Payment Confirmation

//? Guest Check-In Options:
//* 1) Guests can be checked in from the booking detail page.
//* 2) Alternatively, check-in can occur directly from the context menu.
//* 3) Or also by Dashboard, a link will allow check-in for guests arriving on the same day.

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
//* <Route path="checkin/:bookingId" element={<CheckIn />} />

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
//* the bottom line, it converts (undefined or null to false value)
//? Example usage:
//~ useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

//? Disable Undo:
//* - Disable the checkbox once payment confirmation is true.

//! Bug Fix:
//* Data retrieval delay:
//* - Ensure data arrives promptly.
//^ open: useBooking.jsx
//* - Include bookingId in queryKey to refetch data when switching between bookings.

//^ Custom Hook: useCheckin.js
//? Check-In Process:
//* - Update the booking status from unconfirmed to checked in.
//* - Set "isPaid" to true.

//* and this process is a mutation so we use (useMutation)

//& Invalidate the Queries:
//~!  queryClient.invalidateQueries({ active: true });
//* previously what we did here in invalidateQueries was to pass in the Query key,
//* but we can also do it in another way, which is simply to pass active: true.
//* And so this will then invalidate all the queries that are currently active on the page.
//* So, this is a bit easier, because then we don't have to remember any Query keys.

//& Navigate from BookingDetail to checkIn:
//
// const { booking, isLoading } = useBooking();
// const { status, id: bookingId } = booking;
// <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check In</Button>;

//*=======================================================================================================================

//! 386. Adding Optional Breakfast

//^ open: CheckinBooking.jsx - apiBooking (updateBooking)
//* Add new checkbox for breakfast
//* create new state (addBreakfast)

//*   {!hasBreakfast && (
//     <Box>
//  <Checkbox
//            //* checked={addBreakfast}
//             onChange={() => {
//           //*   setAddBreakfast((add) => !add);
//             setConfirmPaid(false); //* so cancel the payment confirmation because there is a new fee (breakfast payment) is added
//             }}
//             //* id="breakfast"
//             >

//            //* Want to add breakfast for x?
// </Checkbox>
// </Box>
//       )}

//* And this box is conditionally rendered by hasBreakfast and it's property in the booking object

//* We should also give Checkbox an ID so we can easily click there on its label ( Want to add breakfast for x?)

//? Breakfast Price Calculation
//* Use settings table in supabase to calculate the breakfast price
// const optionalBreakfastPrice =
// settings.breakfastPrice * numGuests * numNights;

//*==================================================================================

//! 387. Checking Out a Booking (+ Fixing a Small Bug)

//^ open: BookingRow, BookingDetails, useCheckout, apiBooking (updateBooking)
//& Title: Handling onClick Event for Check Out Button
//? Note
//* The onClick event handler for the "Check Out" button can be defined in different ways.
//* Let's explore the correct approach to ensure the bookingId is properly passed.

//? Approach 1 (Problematic):
{
  /* <Menus.Button
  icon={<HiArrowUpOnSquare />}
  //* onClick={(bookingId) => checkOut(bookingId)}
  disabled={isCheckingOut}
>
  Check Out
</Menus.Button> */
}
// In this approach, you’re passing a function with an argument (bookingId) => checkOut(bookingId) directly to the onClick prop.
// The issue is that the bookingId is not being correctly passed to the checkOut function.

//? Approach 2 (Working):
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
//!  if (searchParams.get("page")) searchParams.set("page", 1);
//*==================================================================================
//! 388. Deleting a Booking

//^ useDeleteBooking.jsx - ConfirmDelete.jsx - BookingDetail.jsx - BookingRow.jsx
//* Use Modal and ConfirmDelete before deleting a booking

//* We can passing onSuccess, onError, onSettled to individual mutation
{
  /* <ConfirmDelete
resourceName="booking"
onConfirm={() =>
 //* deleteBooking(bookingId, { onSettled: () => navigate(-1) })
}
disabled={isDeleting}
/> */
}
//*==================================================================================
//! 389. Authentication: User Login With Supabase

//& Authentication Definition:
//* Process of verifying the identity of the user.
//* Answer of question: (Who are you?)

//* users actually need to be logged into the application in order to use it.
//* And so now we're going to use Supabase to apply this feature
//* We will also use Supabase to sign up users in the first place,
//* to update their data and password and even to upload a user avatar.

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

//* copy user login logic from supabase and paste inside login function in apiAuth
//^ open apiAuth and create async login function and paste user login logic from supabase

// let { data, error } = await supabase.auth.signInWithPassword({
//   email: 'someone@email.com',
//   password: 'IZKAUwcOZtooiBykgsBS'
// })

//! export async function login({ email, password }) {
//   let { data, error } = await supabase.auth.signInWithPassword({
//     email,
//    password,
//   });
// }

//! note:
//? pass object ({email,password}) to login function
//* in modern front end development it's pretty common to not pass
//* in multiple arguments into a function, but just one object.
//* and immediately destructure it

//* so now we can go use this function to log that user
//* that we created initially in.
//* Now, in order to do this, we will again use React Query,

//^ open LoginForm
//* to test this function let's log it in handleSubmit function
//* check in console.log(data)
//* you will find session, user inside it, you will find the login email, and role:authenticated

//* And so from now on, on all the next requests
//* Supabase will automatically send this data to the server
//* to basically let Supabase know that we are currently authenticated.
//* So Supabase stores this data auth token (access token - refresh token) in local storage.

//^ open: useLogin.js
//* then direct the user to dashboard
// navigate("/dashboard", { replace: true });

//* we also want to show some indicator here
//* that login is actually happening right ow.
//* And so for all that it's best to again use React Query.

//^ create custom hook useLogin.js

//! use useMutation hook, why:
//* and then here we will use a mutation actually
//* to handle this login. So it's a mutation
//* because actually something changes on the server.
//* So basically a user gets authenticated
//* and also it's gonna be a lot easier
//* to then handle the success and error states if this is a mutation.

//*=======================================================================================
//! 390. Authorization: Protecting Routes

//& Authorization Definition:
//* Process of granting or denying access to specific resources.
//* once your identity is confirmed
//* Answer to question: (What can you do?)

//* Implement authorization so (that only logged in users) can actually access our application.

//^ Open App: wrap the entire application (AppLayout route) in a protected route component
{
  /* <Route
element={
  <ProtectedRoute>
    <AppLayout />
  </ProtectedRoute>
}
> */
}

//* that will mean that all of these different routes can only be accessed
//* if the protected layout component determines that there is a currently logged in user.

//^ create in ui folder ProtectedRoute.jsx

//* Protected Route will only return the children components, if only the user is authenticated

//^ open: apiAuth.jsx
//! why create new function (getCurrentUser) to get user in apiAuth

//& Loading Authenticated User

//? Purpose:
//* To load the authenticated user, we create a function in apiAuth
//* This function ensures that even if the user accesses a page later (not immediately after login),
//* their authentication status remains intact.

//? Scenario:
//* Imagine a web application where a user logs in and then reloads the page a day later.
//* In such cases, we need to refetch the user from the Supabase API to verify their existence
//* and authentication status.

//^ Implementation Steps:
//* 1. Create a function (e.g., `getCurrentUser`) in apiAuth
//* 2. This function fetches the user data from Supabase.
//* 3. Use the fetched data to check if the user exists and is still authenticated.

//^ inside getCurrentUser function
//* const { data: session } = await supabase.auth.getSession();

// first we actually need to check whether there is an active session.
// So for that we use get session. And so this will actually get that data
// from local storage that I showed you earlier.

//^ go to ProtectedRoute and use the useUser custom hook

//* create fullPage styled component in ProtectedRoute.jsx
//* to render the loading spinner in the center of the page

//& Handling User Authentication and Redirection

//? Scenario:
// When loading a web application, the user might not be authenticated immediately after login.
// However, we don't want to redirect them to the login page again during this initial loading phase.

//* Approach:
// - Check if the user is no longer loading (i.e., data has been fetched).
// - If the user is not authenticated, redirect them to the login page.

//^ Implementation Steps:
// 1. Consider both loading state and authentication status.
// 2. If not loading and not authenticated, perform redirection.

//* 2. If there is No authenticated user, redirect to the /login
//! useEffect(
//   function () {
//     if (!isAuthenticated && !isLoading) {
//!       navigate("/login");
//     }
//   },
//!   [isAuthenticated, isLoading, navigate]
// );

//! note:
//! why using useEffect?
//* const navigate = useNavigate();
//* we are only allowed to call this function (Navigate)
//* inside some other function like in: a callback or in a use effect.
//! So not at the top level of the ProtectedRoute component.

//! Reset the input field if the password or email are wrong
//^ so go to LoginForm, where the states and controlled input fields are exist
//* and remember that login function is a mutation function
//* so we can pass onSettled, onSuccess, onError
//* we pass onSettled whether the request is successful or not
//* so we can capture the case where email or password are wrong
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

//^ open Header.jsx
//* Button logout in the header
//* Place Logout Comp in Header
//^ create Logout.jsx in authentication

//^ open apiAuth.js
//* create function logout

//* navigate("/dashboard", { replace: true });
//* navigate("/login", { replace: true });  --- { replace: true } to deactivate browser back button
//* erase the place that we were earlier.
//* So otherwise going back, using this back button here is not really gonna work.

//^=============================

//& Clearing User Data from React Query Cache
// onSuccess: () => {
//!   queryClient.removeQueries();
//   navigate("/login", { replace: true }); //* to deactivate browser back button
// },

//? Purpose:
//* When logging out a user, we need to remove their data from the React Query cache.
//* Simply logging them out removes the user from local storage and the server,
//* but their data remains in the cache.

//? Approach:
//* - To prevent unauthorized access, we should clear all queries related to the user.
//* - This ensures that no sensitive information is retained in the cache.

//*==================================================================

//!  392. Fixing an Important Bug
//*==================================================================

//! 393. Building the Sign Up Form

//& Managing User Creation and Verification
//^ open: Users.jsx in pages folder -  SignupForm.jsx
//? Context:
//* In this application, not everyone can create a new account.
//* Only hotel employees should be users of this app.
//* New users must be verified by existing hotel staff.

//? Implementation Steps:
//* 1. Open Users.jsx in the pages folder.
//* 2. Look for SignupForm.jsx.
//* 3. Utilize the React Hook Form library for form handling.
//*    It's especially useful for larger forms with validation needs.
//* 4. Use the register function for each input field to manage state.
//*    React Hook Form will handle state management automatically.

{
  /* <Input
  type="text"
//*  id="fullName"
  disabled={isLoading}
//*  {...register("fullName", { required: "This field is required" })}
/>; */
}

//* field name is (fullName)
//* calling register function here will basically create a few props
//* which we then spread with this onto this input component.

//^ look at confirm password input field , we will use getValues there
//* const { register, formState, getValues, handleSubmit ,reset} = useForm();

//* handleSubmit will help us to register our custom handle function
//* inside handleSubmit is where we call function onSuccess and onError

//*=============================================================================

//! 394. User Sign Up

//^ apiAuth.js - useSignUp

// Use the form that we just created in order to sign up users
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

//* Just make sure to update these two URLs (site URL, redirected URLs:) again
//* once you deploy this application to a production server.

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
// which is to change the row level security policies to only allow access
// to all of these resources here to users that are actually authenticated.
// So our application itself here is protected,
// but not the resources coming from the Superbase Api.

//*===================================================================================

//! 395. Authorization on Supabase: Protecting Database (RLS)

//& Implementing Row Level Security (RLS) for API Protection

//? Context:
// Currently, anyone can fetch and modify data from our API, even if they can't log into the UI.
// We need to enhance security by implementing authorization directly in Supabase using RLS.
// RLS (row level security) ensures that even if malicious actors discover the API URL, they can't compromise data.
// even if they cannot see this graphical user interface.
// So just from reading our front end code,
// They could for example, delete all of our bookings,

// or all of our cabins, and really destroy our entire app.

//* Implementation Steps:
// 1. Enable RLS on relevant tables using the "enable row level security" clause.
//    This prevents data access via the public anon key until policies are created.
// 2. Create policies that define who can access or modify data.
//    Policies act like WHERE clauses for every query.
// 3. Map requests to Postgres roles (anon for unauthenticated, authenticated for logged-in users).
//    Use these roles within policies to control access.

// Example Usage:
// - Enable RLS: alter table "table_name" enable row level security;
// - Create a policy allowing authenticated users to view profiles:
//   create policy "Profiles are viewable by everyone"
//   on profiles for select to authenticated using (true);

// Note: Customize policies based on your specific use case.

//? Case example:

//^ open: Login and place CabinTable, then it will be shown

//! solution:
//* Go to policies and update all of them to only apply to authenticated users

//*===================================================================================

//! 396. Building The App Header

//* let's build our application's header which will contain the username and an avatar and also a small menu.

//^ open Header
//^ create HeaderMenu in UI

//^ open UserAvatar in authentication folder
//* in this component, we need to get the current user
//* so use useUser custom hook
//* we don't need loading because if the page is loaded, so the user is already loaded as well

//*===================================================================================

//! 397. Updating User Data and Password

//* We are going to build that feature where we allow our users to update their passwords,
//* their full name, and even upload an avatar image.

//^ open: UpdatePasswordForm - UpdateUserDataForm - Account (in pages)
//^ place UpdateUserDataForm.jsx in the Account

//^ open: App.jsx - Header.jsx - HeaderMenu.jsx
//? Note:
//* Account page has path in App.jsx
//* Navigate to account page which contain UpdateUserDataForm and UpdatePasswordForm
//* through HeaderMenu which contains button icon that navigate to account

{
  /* 
  //* <ButtonIcon onClick={() => navigate("/account")}>
        <HiOutlineUser />
  //* </ButtonIcon> */
}

//^ in UpdateUserDataForm
// const {
//   user: {
//     email,
//     user_metadata: { fullName: currentFullName },
//   },
// } = useUser();

//! const [fullName, setFullName] = useState(currentFullName);
//* const [avatar, setAvatar] = useState(null);

//* the default value of the full name
//* can actually immediately be set with the current full name
//* coming from user data because here in this component,
//* we already know that the user will have already been loaded
//* and therefore, we don't need any loading states
//* and we can immediately use this data right here,
//* for example, to set it as a default state value.

//^ open: apiAuth.js
//^ create async updateCurrentUser()

//* go to supabase to set policy for avatars

//! 3. Update avatar in the user
//* add the url added to the uploaded image
export async function updateCurrentUser({ fullName, password, avatar }) {
  const { data: updatedUser, error: error2 } = supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  return updatedUser;
}

//! note:
//* there is an error above that we didn't (await) the updateUser function above
//* and so we return (updatedUser) as undefined and before calling the updateUser func
//* so we couldn't destructure the user in onSuccess in useUpdateUser func in useUpdateUser custom hook
//* so we receive this error in the console:

//! TypeError: Cannot destructure property 'user' of 'undefined' as it is undefined.
//! at Object.onSuccess (useUpdateUser.js?t=1721546383655:11:19)

//? so solution:
//* add await

//? image uploading
//* to know how the url of uploaded image looks like
//* upload an image to the avatars (bucket) in the supabase

//^ create: useUpdateUser.js
//* consume updateCurrentUser function in another custom hook (useUpdateUser.js)

//^  UpdateUserDataForm
{
  /* <Button
type="reset"
variation="secondary"
disabled={isUpdating}
onClick={handleCancel}
> */
}

//& Handling Form Reset Button
//? Explanation:
//* The button in question has the 'type' attribute set to 'reset',
//* which is an HTML5 attribute. As a result, clicking this button
//* will not automatically submit the form.
//* Since the button clears the file upload field, there's no need
//* to prevent the default behavior (e.g., using preventDefault()).
//* Our task is straightforward: reset the full name input field
//* to its original value and set the avatar selection back to 'none'.

//^ copy from UpdatePasswordForm to SignupForm this:
{
  /* <Button onClick={reset} type="reset" variation="secondary">
         Cancel
</Button> */
}

//* even though this is a button with a type of reset,
//* it will actually only clear all the input fields, but not the error messages as down

{
  /* <FormRow
label="New Password (min 8 chars)"
! error={errors?.password?.message}
>
<Input
  type="password"
  id="password"
  autoComplete="current-password"
  disabled={isUpdating}
  {...register("password", {
    required: "This field is required",
    minLength: {
      value: 8,
      message: "Password needs a minimum of 8 characters",
    },
  })}
/>
</FormRow> */
}

//* But this built-in (reset function) (onClick={reset}) from React hook form
//* will actually do that as well.
//* const { register, handleSubmit, formState, getValues, reset } = useForm();

//*======================================================

//! 398. Implementing Dark Mode With CSS Variables

//^ open: GlobalStyles.js
//& Title: Implementing Dark Mode
//? Overview:
//* To implement dark mode, we'll define CSS variables
//* for different class names on the HTML element.
//?
//? Steps:
//* 1. Create a class for light mode and another for dark mode.
//* 2. Set CSS variables (e.g., --background-color, --text-color)
//*    differently for each mode.
//* 3. Apply the appropriate class to the HTML element.
//* 4. The CSS variables will adjust based on the active class.

//^ create: darkModeToggle in ui folder
//^ open: HeaderMenu
//* then add the created toggle button to HeaderMenu

//? Create state for dark-mode
//& Title: Managing Dark Mode State
//? Overview:
//* To implement dark mode, we need to manage a state variable
//* that indicates whether dark mode is active or not.

//? Steps:
//* 1. Create a context to store the dark mode state.
//* 2. Provide this context to the entire application tree.
//* 3. Use the context to toggle dark mode and update UI elements.
//* 4. This global UI state is separate from React Query's remote state.

//^ create context folder and inside create DarkModeContext.jsx

//^ open useLocalStorage.jsx in Hooks folder
//^ open: App.jsx
//* Add the provider to the entire application in App.jsx
//* use the created context in the DarkModeToggle.jsx

//^ open: Logo
//* add the isDarkMode state

//*==================================================================================

//! 399. Building the Dashboard Layout

//^ open: DashboardLayout.jsx in Dashboard folder in features
//^ open: Dashboard in pages folder

//^ open: DashboardFilter
//* We will need filter, because we will need statistics for data in different intervals for 7, 30, 90 days

//*=========================================================

//! 400. Computing Recent Bookings and Stays

// before we can start building our statistics and charts
// we first need to compute the latest bookings and stays
// from our super base bookings table.

//? Difference between booking and stays;

//& Distinguishing Bookings and Stays
//? Understanding the Difference
//* - Bookings represent actual sales.
//* - Stays are guest check-ins at the hotel.
//* - Bookings may occur well in advance.
//* - Stays are identified by start date and check-in or checkout status.

// Example:
const booking1 = {
  id: 1,
  guestName: "John Doe",
  bookingDate: "2023-05-01",
  checkInDate: "2023-06-15", // Future check-in
};

const stay1 = {
  id: 101,
  guestName: "Jane Smith",
  startDate: "2023-06-15",
  status: "checkedIn", // Guest has arrived
};

//^ open: apiBooking.js

//^ look at getBookingsAfterDate
// const { data, error } = await supabase
// .from("bookings")
// .select("created_at, totalPrice, extrasPrice")
// .gte("created_at", date)
// .lte("created_at", getToday({ end: true }));

//? gte and lte are filters to get the date between today (current day)
//? and the selected data (ex. last 30 days)
// .gte("created_at", date)
// .lte("created_at", getToday({ end: true }));

//^ look at getStaysAfterDate
// const { data, error } = await supabase
// .from("bookings")
//! .select("*, guests(fullName)")
//! .gte("startDate", date)
//! .lte("startDate", getToday());

//* startDate when the user started to check-in

//^ open: useRecentBooking.js
//* As always we will get this data
//* by consuming these two function by ReactQuery inside a custom hook

//* All these bookings data will be stored in cache after they received
//* so we won't see the spinner again after clicking between the tabs

//* we will use these booking later in the Stats, see next lecture (Displaying Statistics)

//*===================================================================

//! 401. Displaying Statistics
//* let's now calculate and display statistics
//* on recent bookings, recent sales, check-ins and the total occupancy rate.

//^ open: Stats.jsx - stat.jsx  - DashboardLayout.jsx - useCabins.jsx

//* place Stats in DashboardLayout
//*===================================================================
//! 402. Displaying a Line Chart With the Recharts Library

//? Sales Chart
//* there are many chart libraries in the React ecosystem but one of the most popular ones
//* and the most easy-to-use one as well is called Recharts.
//!  npm i recharts@2

//^ open: SalesChart.jsx in Dashboard folder and place it in DashboardLayout.jsx
//* dataKey is the data that Area should be based on

//* fakeData are 30 objects for 30 days
//* label is the state
//* extrasSales: breakfast

//& Creating a Time Series Data Structure
//? Objective: Compute an array with one object per day.
//* - Each object represents a day, even if there are no sales.
//* - Ensure one entry per day for consistent time series representation.

//! Just example
const dailySalesData = [
  { date: "2023-05-01", sales: 10 },
  { date: "2023-05-02", sales: 0 }, // No sales on this day
  { date: "2023-05-03", sales: 5 },
  // ... more entries ...
];

//*===================================================================

//! 403. Displaying a Pie Chart

//^ open: SalesChart.jsx
//* add dates (from - to) to the title or the Heading of the chart

//? Duration Chart
//^ open: DurationChart.jsx

//* startDataLight and startDataDark are data objects, that will be updated based
//* on the space that we get into the component

//* the value property will updated by some functions down

//^ open: DashboardLayout.jsx

//* place DurationChart in DashboardLayout.jsx

//* Duration is the nameKey
//* value is the dataKey

//* nameKey="duration" dataKey="value"

// you could call all these different

// fields anything that you wanted,

// and the same in the area chart

// that we built in the previous lecture.

// the function that we have here even removes all the objects that have zero nights,

// and so they don't appear in the pie chart.

//*===================================================================

//! 404. Displaying Stays for Current Day

// we will list all the guests that arrive at the hotel for check-in at the current day

// or that leave the hotel and need to check-out.

//^ open: TodayActivity in check-in-out folder

//* place TodayActivity in DashboardLayout.jsx

//* in our application, an activity basically means that
//* there is a guest arriving or leaving at that day.

//^====================================

//^ open: apiBooking.js

//^ look at getStaysTodayActivity
// the activity is either this  (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) or

// this.  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

// So basically a guest arriving

// with a booking that isn't checked-in yet

// is one where the status is unconfirmed

// and the start date is today.

// So it's the current day right now.

// And so this here means a guest ready to arrive

// and check-in at the current day.

// So that's one of the possible activities.

// And the other one is the check-out,

// which is a booking that is currently checked-in, but the end date is today.

//? Problem:
//* But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
// (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
// (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

//? Solution
// const { data, error } = await supabase
// .from("bookings")
// .select("*, guests(fullName, nationality, countryFlag)")
//! .or(
//!   `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
//! )
// .order("created_at");

//! comma , and() as above are eqv to:
//* and() === &&
//* , === ||

//? (or) method eqv to this down
// (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
// (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

//^ create useTodayActivity
//* manage the data or the state that we will receive using ReactQuery in a custom hook.
//^ go to TodayActivity.jsx
//* then use (useTodayActivity) in the TodayActivity comp

//^ open: TodayItem
//* inside TodayList, we want to render one <TodayItem/> for each of the activities

//! note: activity at the end is a booking

//* we need to render a tag here whether the user is arriving or departing
//* so that tag is going to depend on whether the status is unconfirmed or checked-in.

//? Check in and Check out button:

// {status === "unconfirmed" && (
//   <Button
//     type="small"
//     variation="primary"
//     as={Link}
//     to={`/checkin/${id}`}
//   >
//     Check in
//   </Button>

//* use (as) to convert button to anchor link (a) by passing as={Link}

//^ open: CheckoutButton
