//! 375. Client-Side Filtering: Filtering Cabins

//^ open: filter.jsx

//* So basically we want the ability to filter this table here

//& Title: Filtering Cabins by Discount

//? Objective: Allow users to filter cabins or (Table in general) based on whether they have a discount.

//~ Approach:
//*   - Add buttons for "All Cabins," "Discounted Cabins," and "Non-Discounted Cabins."
//*   - Store the selected filter value in the URL for shareability.
//*   - Update the URL state from a separate filter component.
//*   - The filter component can be placed anywhere in the component tree.
//* since we can read that state from everywhere in the app,

//^ open: Cabins.jsx
//* and place at  <p>Filter / Sort</p> another component called
//* cabin table operations. So operations because we're gonna have filter and sort here.

//^ create: CabinTableOperations.jsx
//* As we click on each of FilterButtons,
//* we need to update the URL state.

//! add dashes to the values because they will end up in the url
//! so they shouldn't be dashes in there.

//^ open: Filter:
// const [searchParams, setSearchParams] = useSearchParams();
//* to store this value in the url, we use (useSearchParams hook)
//* This hook comes from ReactRouter

// useSearchParams hook is similar to use state
// because it also gives us the state.
// So the searchparams themselves, and then as a second value,
// it gives us a way to update them.

//* searchParams.set('discount',value);
//* setSearchParams(searchParams);

// Then here the first value is the name of the state.
// So of the field in the URL.
// And so that's gonna be called discount.
// And then second is the value itself.
// And so that's the one that we are receiving in the function(handleClick)

//? next step:
//* Get the data from url into the table and sort the data accordingly
//^ open: CabinTable.jsx
//* const [searchParams] = useSearchParams();

//* But now watch what happens
//* as we actually come to this page (Cabins) for the first time
//* (like navigate to bookings then return back), we get null.
//* Even what we will want in this situation is to show all the cabins with no filter applied.

//? so use ShortCircuiting:
//* const filterValue = searchParams.get("discount") || "all";

//& make a reusable filter:
//* so to be used for cabins and bookings
//* we need to pass all the data that might change as props

//^ look at Filter.jsx
//* searchParams.set("discount", value);
//* discount, it is the filterField
//* options parameter in Filter function will be an array of (in FilterButtons)
//* value and label (text in UI)

//^ open: CabinTableOperations.jsx
//* then pass these values( filterField, options) in the CabinTableOperations.jsx
//* which is where we include this filter component.

//& Display which button or option is selected or active
//* selected one will have blue background
//* use active prop (look at FilterButton style)
//* if active is true, display background
//* To check the boolean value of active (true or false) by using url

//~  disabled={option.value === currentFilter}
//* to disable the other non selected buttons and make them unclickable
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
//* so as we also receive them  here in our application from the API.

//^ open: Sort.jsx

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

//* Create another row in guests and booking

//^ open: apiBooking.js

//* Add one service to the apiBooking, to load all the bookings data from supabase
//* then we want to get the data to the bookings table

//^ open: BookingTable.jsx in bookings folder - Bookings.jsx in pages folder

//^ open: Empty.jsx
//* when there is no data return Empty component
// if (!bookings.length) return <Empty resourceName="Bookings" />;

//* add the same to CabinTable

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
//^ open: Bookings.jsx
//* place BookingTableOperations in Bookings

//? Filtration of Bookings will be different

//* We received all the data rom our supabase API in the table.
//* And then in the table is where we did the filtering and the sorting.
//* the operations happened already on the client side,
//* Filtration of Bookings will be different

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
//* as the dependency array of the use effect hook

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
//* Calculate number of results and pass it as a prop to BookingTable

//* 1) Length of Booking array (in useBooking)
//? or
//* 2) use second arg of supabase and pass in it object {count:exact} (in apiBooking)

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
