//? video 150:
//& Select Movie to display its details

//* 1) Create state variable for selectedID in the top level of App to be used in different components
//* 2) Pass this ID to the component which will display the movie details
//* 3) Create Handling Movie selection function in the same place id state is created (at the top level of the app)
//! this function receives the id of the movie as an argument to fetch an other api to get the selected move to display its details
//* 4) Pass this function to the movie list component, so we can trigger this function by clicking the li element in the list component
//* 5) pass the movie id as parameter to the handling click function by passing the movie object that was used before to display the selected list

//*===================================================================================================

//? video 151:
//& ShowMovie Details:
//* Create useEffect inside MovieDetails comp that should be sync with selectedId update
//* why inside it? because we want this useEffect to be created once the MovieDetails comp is mounted
//* and it is mounted once a movie from a list selected and selectedId got the movie id value
//* fetchMovieDetails by the movie id to get the movie details object
//* Extract the needed or all movie details properties from the movie details object

//*===================================================================================================
//? video 152:
//& Adding watched Movie
//* WatchedSummary, WatchMovieList, MoviesList components: all depend on watched array
//* Create a function (handleAddWatch) that add the movie object to this watched array (array of objects)
//* this function is located at the top App comp, because it will be used in different components
//* handleAddWatched will recieve this movie object as argument, the watched array will be updated by spread operator as always
//* Pass this handleAddWatched function as prop to the component where it will be triggered like by click on a button in that component
//* this component will be MovieDetails

//& Creating the new watched movie object inside MovieDetails Component
//* Create a function (handleAdd) that will create the newWatchedMovie object by assigning the values of movie details object to the newWatchedMovie object
//* then pass this newWatchedMovie object as a parameter to the handleAddWatched function that we passed as prop to the current MovieDetails Component as before
//* call the close function that we passed as a prop before to the the current MovieDetails Component, inside (handleAdd) after the handleAddWatched function call
//* so we close the movie details window right after click on add to list button

//& Getting userRating state from the StarRating comp to MovieDetails comp
//* Create a state for userRating comp inside MovieDetails comp
//* Pass the setUserRating as a prop to StarRating comp
//* add the state userRating as a property to the newWatchedMovie object

//& Allow the user to add watchedMovie object to the watchedList only if the user add rating to the movie
//* use userRating state to conditionally display the button

//& Enusre the user doesn't add the same movie to the watchedList more than one time
//* check if this movie is already in the watched list so the starRating doesn't display and instead displayed (contional rendering) the pre given userRating for that movie

//~ Solution:
//* 1) Pass watched array state as a prop to MovieDetails comp
//* 2) Convert this watched arr to array of IDs and create boolean value (isWatched) to check if the current or selectedId exists in this array as follows
//* const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
//* 3) use this boolean value for conditional redndering'
//* 4) Search inside watched array that there is existed or pre added movie to
//!   const watchedMovieRating = watched.find(
//!     (movie) => movie.imdbID === selectedId
//!   )?.userRating;

//* use optional chaining (?.userRating), because in other cases where the movie hasn't been added to watchedList before so userRating won't be accessed and give error
//* so use optional chaining

//~ or: intead of optional chaining:
//* use the boolean value (isWatched) before conduct the find method as this:
//* if(isWatched):
//!   const watchedMovieRating = watched.find(
//!     (movie) => movie.imdbID === selectedId
//!   )?.userRating;

//& Add delete feature for watched movie from watched lists

//*===================================================================================================
//? video 153:

//& Change the page title in the browser to the movie that we are currently watching.
//* changing the page title in the browser, so outside here of the application, is a side effect
//* because we are very clearly going to interact with the outside world, so basically with the world outside
//* of our React application. And so again, this is then considered a side effect.
//* So what this means is that we will want to register a side effect using, again, the useEffect hook.

//* We want the browser title to change as soon as we click on one of these movies,
//* which will then trigger the movie details component to mount, and so it's in exactly that situation
//* where we want to change the browser title. And so that component is where we want that effect.

//! each useEffect do one thing one purpose

//*===================================================================================================
//? video 154:

//& Set the browser title to usePopcorn when we click on button back (which technically means unmount MovieDetails component)

//* How can we ensure that the page title stays synchronized with the application,
//* even after the component has disappeared?
//* Well, basically what we need is a way to execute some code as the component unmounts.
//* And we can do that by: returning a so-called cleanup function from the effect.

//* We need a cleanup function. Whenever the side effect that we introduced in the effect keeps happening after the component
//* has already been unmounted.

//~ the needed case of cleanup in our application:
//* we no longer have the inception movie here but the side effect is still happening.

//* So the title is still showing that old movie that we had selected before.

//* And so the cleanup function is the perfect solution for this case.

//* a cleanup function is simply a function that we return from an effect.

//! Understanding JavaScript Closures in React's useEffect Hook
//? The cleanup function in useEffect has a peculiar behavior
//* It runs after the component has already unmounted.
//! This might seem strange that the function can still remember variables (like 'title') even after they've been destroyed

/*
useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
  
      //* The cleanup function remembers 'title' due to a JavaScript concept called closure
      //* A closure means a function will always remember all variables present at the time and place the function was created
      //* In this case, the cleanup function was created when this effect was first created, at which time 'title' was defined
      //* Therefore, the cleanup function 'closed over' the 'title' variable and will remember it in the future
      return function () {
        document.title = "My usePopCorn";
        console.log(`Cleanup Effect for movie ${title}`);   //* title will show the name of last movie before go back because of closure Javascript effect
      };
    },
    [title]
  );
  
*/
//*===================================================================================================
//? video 156:

//& clean up data fetching and solve race conditions issue

//* we're actually creating way too many HTTP requests as we search for movies.

//~ to inspect all these requests
//* Go to network tab, add throttling (Fast3G)
//* click Fetch/XHR tab to see all the requests have been made for each keystroke (when search a movie)

//! the problem:
//* that for each keystroke (writing movie name inspection in search field) (inc, ince, incep) created all these API different requests
//* that were basically happening at the same time.

//! that cause three problems:
//* 1) Having so many requests at the same time will slow each of them down.
//* 2) We will end up downloading way too much data. (check Size tab)
//* so we're not interested in the data for all of these other queries.

//* 3) Concurrent Requests in React
//?  Multiple requests happening at the same time can lead to unexpected results
//* If a request takes longer than others, its results might overwrite the state, even if it wasn't the last request made
//* This is a common problem known as a race condition, where requests are "racing" to see which finishes first

//~ Solution:
//* We can clean up our fetch requests so as soon as a new request is fired off, the previous one will stop. So it will get canceled.

//? Note: To solve this issue, we can use the AbortController, a native browser API
//* The AbortController allows us to cancel requests, which we can use in our cleanup function to cancel any outstanding requests when the component unmounts

//* 1) Create AbortController inside useEffect of fetching data by search query in App comp as this: const controller = new AbortController()
//* 2) Pass an object as second parameter to res.
//   const res = await fetch(
//     `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
//     { signal: controller.signal }
//   );
//* 3) When fetch request cancelled by clean up function, it throws error, so to handle it write this line of code
//! if (err.name !== "AbortError") setError(err.message);

//* 4) Call the abort method in cleanup function after calling the fetch function
// fetchMovies();            //* fetch function
//   return function () {    //* cleanup function
//     controller.abort();   //* call abort method
//   };

//* Each time a new keystroke triggers a re-render, the cleanup function in useEffect gets called
//* note that cleanup functions is called between re-renders
//* This cleanup function aborts the current fetch request using the AbortController
//* This is desirable because we want to cancel the current request each time a new one comes in
//* The cleanup function is the perfect place to handle this kind of work between renders

//*===================================================================================================

//? video 157:

//* listen globally to a keypress event.
//* to apply a keypress event in the entire app is basically by simply attaching an event listener to the entire document.
//* this is clearly a side effect because we will be directly touching the DOM.

//~ Solution:
//* apply keypress event inside useEffect inside movieDetails so it only fired when MovieDetails is mounted
//* in other word whenever we have the movieDetails comp in our tree.

//! problem:
//* Each time a new MovieDetails component mounts, a new event listener is added to the document
//* This can lead to multiple identical event listeners attached to the document
//* This is not desirable and can become a memory problem in larger applications

//? To solve this issue, we need to clean up our event listeners in the cleanup function of useEffect
//* The cleanup function will remove the event listener from the document when the component unmounts
//* This prevents multiple identical event listeners from accumulating in the DOM

//~ The function passed to removeEventListener must be exactly the same as the one passed to addEventListener
//* Therefore, we define the function (callback) outside and use it in both places

// useEffect(
//     function () {
//       function callback(e) {
//         if (e.code === "Escape") {
//           onCloseMovie();
//         }
//       }

//       document.addEventListener("keydown", callback);

//! The cleanup function removes the event listener, ensuring it's only executed once
//       return function () {
//         document.removeEventListener("keydown", callback);
//       };
//     },
//     [onCloseMovie]
//   );

//*===================================================================================================

//! tip:
//* whenever you see some warning inside the square brackets of dep arr, coming from ESLint about a missing dependency,
//* you must include that in the array.

//~ note:
//* inside useEffect we are stepping really outside of React here,
//* which is the reason why the React team also calls the useEffect hook here an escape hatch.
//* So basically a way of escaping having to write all the code using the React way like doing some DOM manipulation.

//*===================================================================================================

//& Title: User Story
//? Note: The user story describes the interactions between the user and the app.
//* The user opens the app.
//* The user can search for movies in the search bar.
//* The user can view a list of movies that match their search query.
//* The user can select a movie to view more details.
//* The user can add a movie to their watched list.
//* The user can view a summary and a list of their watched movies.
//* The user can remove a movie from their watched list.

//& Title: Data Flow
//? Note: The data flow describes how data moves through the app.
//* The user's search query is stored in the `query` state.
//* The `fetchMovies` function uses the `query` state to fetch matching movies from the OMDB API.
//* The fetched movies are stored in the `movies` state and displayed to the user.
//* When a movie is selected, its ID is stored in the `selectedId` state and the movie's details are displayed.
//* When a movie is added to the watched list, it's added to the `watched` state.
//* When a movie is removed from the watched list, it's removed from the `watched` state.

//& Title: App Features
//? Note: The features are the functionalities provided by the app.
//* Feature 1: Movie search - The app allows the user to search for movies.
//* Feature 2: Movie details - The app displays detailed information about the selected movie.
//* Feature 3: Watched list - The app allows the user to add movies to and remove movies from their watched list.
//* Feature 4: Error handling - The app displays an error message if the movie search fails.
//* Feature 5: Loading state - The app displays a loader while fetching movies.
