import { useEffect, useState } from "react";
import "./index.css";
import StarRating from "./starRating";

//* OMDB API is a open source version of IMDB API

//& Title: Understanding Variable Scope in React Components

//? Defining Variables outside the Component
//* Variables that don't depend on anything inside the component should be declared outside the component function
//* This is because each time the component gets re-rendered, the entire function (and all the render logic) is executed again
//* If a variable is part of the render logic, it'll be recreated each time the component renders
//* While this might not be a big deal for some variables, it's a good habit to avoid unnecessary variable recreations
//* So, let's define our variable 'key' outside the component function

const KEY = `96390e05`;

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

//*====================================================================================================================

export default function App() {
  //* All this code that is here, at the top level of the function is
  //* a code that will run as the component first mounts and therefore it is called render logic.
  //* And so again, here (in render logic) we should have no side effects.

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState("");

  function handleIdSelection(id) {
    // console.log(id);
    setSelectedId((selectedId) => (selectedId === id ? null : id)); //* to make the double click on the list cause closing for the movie details
  }

  function closeMovieDetails() {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  console.log(watched);

  //? problem
  //! This fetch process in the render logic, causes side effect in the component
  //! which means it's interaction with outside world

  //* this also will case infinie fetch request, you can check that in network tab in the browser inspector
  //* because setMovies updates the state, causes in result re-render of the app or the component
  //* so the component will execute its render logic again including the fetch function which will reset the state again causing render again and so on.

  //! so it is not allowed to set state inside the render logic of the component
  // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //   .then((res) => res.json())
  //   .then((data) => setMovies(data));

  // setWatched([]); //! will cause error in the console (too many renders)

  //? solution:
  //* use (useEffect)

  //~ Using .then method
  // useEffect(function () {
  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //     .then((res) => res.json())
  //     .then((data) => setMovies(data.Search));
  // }, []);

  //*====================================================================================================================

  //? trial exp:

  /*
  //* the rest of useEffects will render after render phase
  useEffect(function () {
    console.log("run during initial Render in mounting"); //* second one: (only at the starting of App)
  }, []);

  useEffect(function () {
    console.log("run with any prop or state udpate"); //* third one: (will always triggered after any render)
  }); //! because no dependency array

  useEffect(
    function () {
      console.log("run during updating query"); //* fourth one: will run whenever the state query is changed
    },
    [query]
  );

  console.log("run during render phase"); //* first one: render during render phase before any useEffects runs
  */
  //*====================================================================================================================

  //~ using async/await:
  //& useEffect sync with query
  //* You can use event handler with keydown event for example instead of useEffect
  useEffect(
    function () {
      //*  use a native browser API to solve race condition issue (look up App features.js file)
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          console.log("HEY MOVIE SEarch");
          setIsLoading(true); //* Display loading while data is fetching
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Internet connection lost");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie Not Found");
          setMovies(data.Search);
          setError(""); //* clear error again after movie fetch  why? ask chatgpt🤷‍♂️
          // console.log(movies);   //* [] because update the state (movies) is asynchronous
          //   console.log(data);   //* the results is duplicated because of react.strict
        } catch (err) {
          // console.error(err.message);
          if (err.name !== "AbortError") setError(err.message); //* When fetch request cancelled by clean up function, it throws error, so to fixed that, write this line of code
        } finally {
          setIsLoading(false); //* Hide loading once data is fetched
        }
      }

      if (query.length < 3) {
        setMovies([]);
        return;
      }

      closeMovieDetails(); //* to close the last movieDetails before start a new movie search
      fetchMovies(); //* call fetch function to start to fetch a movie

      //! clean up function
      return function () {
        controller.abort();
      };
    },
    [query]
  ); //* VS code will give warning (useEffect hook missing dependency) if query is not added

  //& useEffect sync with selectedId

  // useEffect(
  //   function () {
  //     async function fetchMovieDetails() {
  //       try {
  //         if (!selectedId) return;
  //         setIsLoading(true);
  //         setError("");
  //         const res = await fetch(
  //           `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
  //         );

  //         if (!res.ok) throw new Error("Internet connection lost");

  //         const data = await res.json();
  //         if (data.Response === "False") throw new Error("Movie Not Found");
  //         // setMovies(data.Search);

  //         console.log(data); //* the results is duplicated because of react.strict
  //       } catch (err) {
  //         // console.error(err.message);
  //         setError(err.message);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //     fetchMovieDetails();
  //   },
  //   [selectedId]
  // );

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MoviesList movies={movies}></MoviesList>} */}
          {!isLoading && !isError && (
            <MoviesList
              onSelectedId={handleIdSelection}
              movies={movies}
            ></MoviesList>
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
      </Main>
    </>
  );
}

//*====================================================================================================================

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ error }) {
  return (
    <div className="error">
      <span>⛔</span>
      {error}
    </div>
  );
}

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

//*====================================================================================================================

function Main({ children }) {
  return (
    <main className="main">
      {children}
      {/* <WatchedMoviesBox /> */}
    </main>
  );
}

//!================================================================

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

function MovieDetails({
  selectedId,
  onCloseMovieDetails,
  onAddWatchedMovie,
  watched,
}) {
  const [movieDetails, setMovieDetails] = useState({}); //* type of {} because that is the returned type from api call in fetchMovieDetails
  const [isLoading, setIsLoading] = useState("");
  const [userRating, setUserRating] = useState();
  const [isError, setError] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedMovieRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating; //* use optional chaining, because in other cases where the movie hasn't been added to watchedList before so userRating won't be accessed and give error
  //* so use optional chaining
  console.log(watchedMovieRating);

  const {
    Title: title,
    Year: year,
    Poster: poster,
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

  function handleAdd() {
    const newWatchedMovie = {
      poster,
      title,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(" ").at(0),
      userRating,
      imdbID,
    };
    console.log(newWatchedMovie.runtime);

    onAddWatchedMovie(newWatchedMovie);
    onCloseMovieDetails(); //* close the movie details window after adding the movie to watched list
  }

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

  useEffect(
    function () {
      const callback = function (e) {
        if (e.code === "Escape") {
          onCloseMovieDetails();
        }
      };

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovieDetails]
  ); //* learn about passing onCloseMovieDetails to dep arr later

  useEffect(
    function () {
      async function fetchMovieDetails() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          if (!res.ok) throw new Error("Internet Lost");
          const data = await res.json();
          console.log(data); //* the results is duplicated because of react.strict
          setMovieDetails(data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovieDetails();
    },
    [selectedId]
  ); //* if []: so when select another movie so (NO) another fetch for movie details will be executed
  //* because [] means only at the inital render or mount of the MovieDetails

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovieDetails}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of movie ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐{imdbRating} IMDb Rating</span>
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {isWatched ? (
                <p>You rated this movie {watchedMovieRating}</p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onUserRating={setUserRating}
                  />
                  {userRating && (
                    <button className="btn-add" onClick={handleAdd}>
                      + add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Actors: {actors}</p>
            <p>Directed by: {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

//!===============================================================
// function WatchedMoviesBox() {

//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen((open) => !open)}
//       >
//         {isOpen ? "–" : "+"}
//       </button>
//       {isOpen&& (
//         <>

//         </>
//       )}
//     </div>
//   );
// }

function WatchedMoviesSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

//* tofixed(2), 2:define number of numbers after decimal sign (,)

function WatchedMoviesList({ watched, onDeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatchedMovie }) {
  return (
    <li className="list-watched">
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={() => onDeleteWatchedMovie(movie.imdbID)}
      >
        x
      </button>
    </li>
  );
}

//*====================================================================================================================

//& Title: Understanding the useEffect Hook in React
//? The Idea of useEffect
//* The useEffect hook provides a place where we can safely write side effects, such as data fetching

//? Execution of Side Effects
//* Side effects registered with the useEffect hook are executed after certain renders
//* For example, they can be set to run only right after the initial render
//*====================================================================================================================
//& Title: Understanding the Dependency Array in React's useEffect Hook
//? The Role of the Empty Array
//* The empty array as a second argument to useEffect means that the effect will only run on mount
//* It will only run when the component renders for the very first time

//*====================================================================================================================
//& Title: Understanding Dependency Array and Cleanup Function in React's useEffect Hook
//? Dependency Array
//* The exact moment at which the effect is executed depends on its dependency array

//? Cleanup Function
//* The cleanup function is a function that will be called before the component re-renders or unmounts
//*====================================================================================================================
//& Title: Understanding the Function in React's useEffect Hook
//? The Function in useEffect
//* This function contains the side effect that we want to register
//* Registering a side effect means that we want this code not to run as the component renders
//* Instead, it should run after the component has been painted onto the screen
//* This is exactly what useEffect does
//*====================================================================================================================

//& Title: Understanding the Effect Function in React's useEffect Hook
//? ESLint Warning
//* We immediately get a warning from ESLint when we try to make the effect function asynchronous
//* The warning tells us that effect callbacks are synchronous to prevent race conditions

//? The Effect Function
//* The effect function that we place into useEffect cannot return a promise
//* This is because an async function returns a promise, and useEffect expects a synchronous function

//*====================================================================================================================

//& Title: Understanding Strict Mode in React 18
//? Effect of Strict Mode on Effects
//* When strict mode is activated in React 18, our effects will not run only once, but actually twice
//* React will call our effects twice, but only in development

//? Strict Mode in Production
//* When our application is in production, this double-calling of effects will no longer be happening

//? Purpose of Strict Mode
//* The purpose of this feature is to help React identify if there are any problems with our effects

//*====================================================================================================================
//& Title: Understanding Error Handling in Fetch API
//? Error Handling in Fetch
//* Reacting to errors is not built into the fetch function itself
//* We have to handle errors manually

//? Displaying Error Messages
//* err.message displays the text message or string that we pass in new Error
