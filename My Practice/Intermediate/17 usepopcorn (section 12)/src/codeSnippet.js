import React from "react";
import ReactDOM from "react-dom/client";

import { useEffect, useRef, useState } from "react";
import "./index.css";
import StarRating from "./starRating";

//& Calculate Average using reduce method

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
const avgRuntime = average(watched.map((movie) => movie.runtime));

const avgUserRating = average(watched.map((movie) => movie.userRating));
<span>{avgUserRating.toFixed(2)}</span>; //* tofixed(2), 2:define number of numbers after decimal sign (,)

//*===========================================================================================================================

//& to make the double click on the list cause closing for the movie details

function handleIdSelection(id) {
  setSelectedId((selectedId) => (selectedId === id ? null : id));
}

//*===========================================================================================================================

//& using ID value to close a component or simulate back button
const [selectedId, setSelectedId] = useState(null);
//* by setting ID value to null
function closeMovieDetails() {
  setSelectedId(null);
}

//*===========================================================================================================================

//& conditional rendering using selectedId value
``` selectedId ? (
  <MovieDetails
    selectedId={selectedId}
    onCloseMovieDetails={closeMovieDetails}
    onAddWatchedMovie={handleAddWatchedMovie}
    watched={watched}
  />
) ```;

//*===========================================================================================================================
//& Update list of items such as movies:
const [watched, setWatched] = useState([]);
function handleAddWatchedMovie(movie) {
  setWatched((watched) => [...watched, movie]);
}

//*===========================================================================================================================
//& Delete an item from a list:

function WatchedMovie({ movie, handleDeleteWatchedMovie }) {
  return (
    <li className="list-watched">
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <button
        className="btn-delete"
        onClick={() => handleDeleteWatchedMovie(movie.imdbID)}
      >
        x
      </button>
    </li>
  );
}
//* By updating the whole array list by filtering the id of the required item to delete
//* like building a new array but without the required id to delete (the id of the list that has delete button to be clicked)
function handleDeleteWatchedMovie(id) {
  setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
}

//*==============================================================================================================

//& How to fetch a data using async / await, handling its error

const [query, setQuery] = useState("");
const [movies, setMovies] = useState([]);

//! useEffect sync with query

useEffect(
  function () {
    //*  use a native browser API to solve race condition issue (look up App features.js file)
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true); //! Display loading while data is fetching
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        //! handling loss internet connection error
        if (!res.ok) throw new Error("Internet connection lost");

        const data = await res.json();

        //! handling not found a Movie
        if (data.Response === "False") throw new Error("Movie Not Found");

        //! Enters the fetched movies data in the movies array to display it
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message); //! When fetch request cancelled by clean up function, it throws error, so to fixed that, write this line of code
      } finally {
        setIsLoading(false); //! Hide loading once data is fetched
      }
    }

    //! Preventing starting fetching when writes less than 3 letters in the search input field
    if (query.length < 3) {
      setMovies([]);
      return;
    }

    closeMovieDetails(); //* to close the last movieDetails before start a new movie search
    fetchMovies(); //* call fetch function to start to fetch a movie

    //! clean up function to remove the thrown error happened after canceling a fetch request
    return function () {
      controller.abort();
    };
  },
  [query]
);

//*==============================================================================================================

//& Conditional rendering between Loading comp, Display fetched data comp, Error comp

const [isLoading, setIsLoading] = useState(false);
const [isError, setError] = useState("");

<Box>
  {!isLoading && !isError && (
    <MoviesList onSelectedId={handleIdSelection} movies={movies}></MoviesList>
  )}
  {isLoading && <Loader />}
  {isError && <ErrorMessage error={isError} />}
</Box>;

//*==============================================================================================================

//& Display list of components by map:

function MoviesList({ movies, onSelectedId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectedId={onSelectedId} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectedId }) {
  return (
    <li onClick={() => onSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

//*==============================================================================================================

//& Show and hide button for a component

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

<Main>
  <Box>
    {!isLoading && !isError && (
      <MoviesList onSelectedId={handleIdSelection} movies={movies}></MoviesList>
    )}
    {isLoading && <Loader />}
    {isError && <ErrorMessage error={isError} />}
  </Box>
  <Box>
    {selectedId ? (
      <MovieDetails
        selectedId={selectedId}
        onCloseMovieDetails={closeMovieDetails}
        onAddWatchedMovie={handleAddWatchedMovie}
        watched={watched}
      />
    ) : (
      <>
        <WatchedMoviesSummary watched={watched} />
        <WatchedMoviesList
          watched={watched}
          onDeleteWatchedMovie={handleDeleteWatchedMovie}
        />
      </>
    )}
  </Box>
</Main>;
//*==============================================================================================================

function MovieDetails({
  selectedId,
  onCloseMovieDetails,
  onAddWatchedMovie,
  watched,
}) {
  const [movieDetails, setMovieDetails] = useState({}); //* type of {} because that is the returned type from api call in fetchMovieDetails

  const [userRating, setUserRating] = useState();

  //& Display another content after clicking on same element
  //* By producing boolean value using looping and includes then use this boolean value for conditional rendering
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  //& Using (find method with optional chaining) to loop and find a certain object (if exists) to get a certain property (userRating)
  const watchedMovieRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  //* use optional chaining, because in other cases where the movie hasn't been added to watchedList before so userRating won't be accessed and give error
  //* so use optional chaining

  //& Using destructing to edit object properties names
  const {
    Title: title,
    Year: year,
    Poster: poster, //* look down
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbID,
  } = movieDetails;

  console.log(title, year); //* at first it will give undefined,undefined (in case dependency array was [] as in the beginning of the tutorial)
  //* because useEffect executed after (render + commit + broswer paint)

  //& Creating a new object based on other proeprties
  function handleAdd() {
    const newWatchedMovie = {
      poster, //* poster:poster (the one above loo up)
      title,
      imdbRating: Number(imdbRating), //! convert string to number
      runtime: runtime.split(" ").at(0), //! extract the number from the string (runtime = '120 min')
      userRating,
      imdbID,
    };
    console.log(newWatchedMovie.runtime);

    onAddWatchedMovie(newWatchedMovie);
    onCloseMovieDetails(); //* close the movie details window after adding the movie to watched list
  }

  //& Changing a browser tab title when ,ounting a certain component
  //* use Useffect inside this mounted component
  useEffect(
    function () {
      // document.title = "test";
      //* We actually don't want to see the undefined in the browser tab in the beginning.
      //* so we don't want temporarily to be our movie set to undefined.
      if (!title) return;
      document.title = `Movie | ${title}⭐${imdbRating}`;

      return function () {
        document.title = "My usePopCorn";
        console.log(`Cleanup Effect for movie ${title}`); //* title: will show the name of last movie before go back because of closure Javascript effect
      };
    },
    [title, imdbRating]
  ); //* if dep arr is [], the title will be: 'Movie | undefined' because this UseEffect will be triggered only at mount

  //& Close Feature using Escape key:
  useEffect(
    function () {
      const callback = function (e) {
        if (e.code === "Escape") {
          onCloseMovieDetails();
        }
      };

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback); //! use cleanup function to avoid duplicate same handling function callback, causing memory issue
      };
    },
    [onCloseMovieDetails]
  ); //* learn about passing onCloseMovieDetails to dep arr later

  //& Conditional Rendering using boolean value (isWatch) and ternary operator and truthy value (userRating) and && operator
  <div className="rating">
    {isWatched ? (
      <p>You rated this movie {watchedMovieRating}</p>
    ) : (
      <>
        <StarRating maxRating={10} size={24} onUserRating={setUserRating} />
        {userRating && (
          <button className="btn-add" onClick={handleAdd}>
            + add to list
          </button>
        )}
      </>
    )}
  </div>;
}
//*==============================================================================================================

//& Title: Store and read in localStorage of the browser:

//? Application of initialize state with a callback (Lazy initial state)

export default function App() {
  // const [watched, setWatched] = useState([]);

  //~ Example of:
  //* Initialize state with a callback (Lazy initial state)
  //* Read data from local storage in initial rendering:
  //* by passing pure (must be without any arguments) call back function as initial value to useState
  //* we can then initialize the state with whatever value this callback function will return.

  const [watched, setWatched] = useState(function () {
    const stored = localStorage.getItem("watched");
    return JSON.parse(stored);
  });

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);

    //* first solution option to save watched list in local storage
    //~ localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  //* second solution: (better)
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  //* whenever the initial value of the use data depends on some sort of computation
  //* we should always pass in a function like this. So function that React can execute on its initial render.
  //! note:
  //* we can not call function in useState
  //* only we can pass a function in useState

  //! useState(localStorage.getItem("watched"))
}

//*==============================================================================================================

//& Title: Don't use querySelector:
//! this not ideal, because in React we follow declarative technique
//* We don't touch the DOM
useEffect(function () {
  const input = document.querySelector(".search");
  input.focus();
}, []);
//* also if we define query inside dep array, this input variable will be declared (select the element) over and over again whenever the query changed

//? Solution:
//* Use useRef
//*==============================================================================================================

//& Title: Using Ref to apply focus on input element:

function Search({ query, setQuery }) {
  //? Solution:
  //* Use useRef
  //~ 1) Create Ref:
  const inputEl = useRef(null); //* null is the initial value and in case of DOM element we pass null

  //~ 3) Use Ref inside useEffect:
  //! Why we use inputEl inside useEffect?

  //* Because the ref only gets added to this DOM element here after the DOM has already loaded.
  //* And so therefore we can only access it in effect which also runs after the DOM has been loaded.
  //* So this is the perfect place for using a ref that contains a DOM element.

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return; //* to avoid pressing enter and remove the search query while we still focus on the input element (check video 167)
        console.log(inputEl.current); //* the selected element itself (<input/>)

        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery(""); //* empty the input field after focus
        }
      }
      document.addEventListener("keydown", callback);
    },
    [setQuery]
  ); //* when jonas forgot to add setQuery to dep arr, he was forced to reload the page.

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      //~ 2) Connect Ref to the input Element (the element we want to select):
      //~ by ref prop
      ref={inputEl}
    />
  );
}

//*==============================================================================================================
