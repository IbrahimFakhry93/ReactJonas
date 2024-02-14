//& Title: User Story
//? Search and Display
//* The user can search for movies using the search bar. The search results are displayed as a list of movies.
//* The user can click on a movie from the search results to view more details about the movie.

//? Watched List and Rating
//* The user can add a movie to their watched list and rate it.
//* The watched list shows the user's rating, the IMDb rating, and the runtime of each movie.
//* The user can remove a movie from their watched list.

//? Watched Summary
//* The user can view a summary of their watched movies,
//* including the total number of movies, the average IMDb rating, the average user rating, and the average runtime.

//!=======================================================================================================================================

//& Title: Data Flow
//? State Management
//* The `App` component maintains the state of the application,
//* including the search query, the list of movies fetched from the API, the list of watched movies, and the selected movie.

//? Search Functionality
//* When the user types in the search bar, the `setQuery` function is called to update the search query state in the `App` component.
//* The `useEffect` hook in the `App` component listens for changes in the search query. When the query changes, it fetches new movies from the API and updates the `movies` state.

//? Movie Selection and Details
//* The `MoviesList` component receives the `movies` state as a prop and renders a list of `Movie` components.
//* When a movie is clicked in the `MoviesList`,
//* the `handleIdSelection` function is called to update the `selectedId` state in the `App` component.
//* This triggers the `MovieDetails` component to fetch and display more details about the selected movie.

//? Watched List Management
//* In the `MovieDetails` component, the user can rate the movie and add it to their watched list.
//*  This calls the `handleAddWatchedMovie` function to update the `watched` state in the `App` component.
//* The `WatchedMoviesList` component receives the `watched` state as a prop and renders a list of `WatchedMovie` components.
//* Each `WatchedMovie` can be removed from the watched list by clicking the delete button,
//* which calls the `handleDeleteWatchedMovie` function to update the `watched` state in the `App` component
//* by filtering the id that corresponds to the movie who we click on its list the close button

//!=======================================================================================================================================

//& Title: App Features
//? Movie Search
//* The user can search for movies by typing in the search bar.
//* The search results are fetched from the OMDB API and displayed as a list of movies.

//? Movie Details
//* The user can view more details about a movie by clicking on it in the search results.
//* The details include the title, release year, runtime, genre, IMDb rating, plot, actors, and director.

//? Watched List
//* The user can add movies to their watched list and rate them.
//* The watched list shows the user's rating, the IMDb rating, and the runtime of each movie.
//* The user can also remove movies from their watched list.

//? Watched Summary
//* The user can view a summary of their watched movies,
//* including the total number of movies, the average IMDb rating, the average user rating, and the average runtime.

//? Error Handling and Loading State
//! Error handling:
//* The app handles errors such as failed API requests and displays an error message to the user.
//~ Loading state:
//* The app shows a loading message while it is fetching data from the API.
