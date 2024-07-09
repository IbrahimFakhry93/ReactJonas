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
