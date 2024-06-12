//! 346. What is React Query?

//*======================================================

//! 347. Setting Up React Query

//* npm i @tanstack/react-query@4

//^ open App.jsx

//& Title: Setting up React Query in App.jsx
//* Step 1: Create a place where the data lives
//* - This is similar to what we did with the Context API or Redux.
//* - In the case of React Query, we set up the cache and the Query client using "new QueryClient."

//* const queryClient = new QueryClient({});

//? staleTime
//* - "staleTime" is the amount of time that the data in the cache will stay fresh until it is refetched again.

//? Note:
//* - With this, we have created our "QueryClient," which sets up the cache behind the scenes.

//* Step 2: Provide this to the application
//* - We want to provide our Query data to the entire application tree.
//* - We make this a parent component of our entire tree and pass the created client as a prop to the provider component.

//* npm i @tanstack/react-query-devtools

//*================================================================================

//! 349. Fetching Cabin Data

//^ open: CabinTable.jsx - CabinRow.jsx - apiCabins.js - Cabins.jsx -helpers.js

// function CabinTable() {
//   const x = useQuery({
//     queryKey: ["cabins"],
//     queryFn: getCabins,
//   });

// console.log(x)

//* useQuery hook: it is used to fetch and store data in the cache
//* queryFn: what we specify here need to return a promise same as in getCabins function, we use it instead of using fetch(url)

//* in console: you will find isLoading, status
//* you can use status it changes to success, loading

// return <div>Table</div>;
//}

//* npm i date-fns

//*================================================================================

//! 350. Mutations: Deleting a Cabin

//* let's learn how we can use the power of React Query to Delete a cabin and automatically re-render the user interface.

//^ open: apiCabins - CabinRow

//* you have to change row level security policies to be able to delete a cabin

//*================================================================================

//! 351. Displaying Toasts (Notifications)

//* npm i react-hot-toast

//^ CabinRow, apiCabins, AppLayout
