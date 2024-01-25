import { useEffect, useRef, useState } from "react";
import "./index.css";
import StarRating from "./starRating";

//& Section 13:
//? (look down in MovieDetails component)
//* 1) Break (violate) the rules of hook:
//! Call the hook conditionally
//! early return before the following hooks (look down in MovieDetails component)

//* 2) Initial value of useState is looked by react in initial render.
//*  (when the component is mounted)  (Ex. isTop) look down the MovieDetails
//* and this initial value will be ignored on subsequent re-renders.

//* 3) Proof that update a state is asynchronous. (avgRating)
//! so we need callback function to update the state in certain situation

//? (look down in App component: useState for watched state )
//* 4) Initialize state with a callback (Lazy initial state)

//* Persist watched list data in local storage (key / value pair storage) of the browser
//* Each time that the watch list state is updated we will update the local storage.
//* So we will store that data into local storage and then each time that the application loads
//* so when the app component first mounts we will read that data from local storage and store it into the watched state.

//~===========================================================================================

//! Ref lectures
//& feature required  (video 165)
//* check search component.
//* give input element in search component, focus each time that the Search component mounts.

//& feature required  (video 167)
//* Hit enter key, the input got focused
//* and after search when click enter again , it clears the input filed and the input got focused.

//& feature required  (video 168)  check Movie Details component
//* Second use case of ref which is to give a variable that is persisted across renders without triggering a re-render.
//* we want to count how many times the user selects a different rating.
//* So for example, let's say first I rate this three, then seven, and then nine.
//* So this means that it took me a long time to decide between the right rating of this movie.
//* And so let's say that in our application we somehow wanted to register that.
//* Now I said behind the scenes because we actually don't want this data to show up on the screen.

//& later application of Ref:
//* more real world use cases of refs, for example, storing the ID of a timer to stop it.

//~===========================================================================================
const KEY = `96390e05`;

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
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
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState("");

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
  //~===========================================================================================

  function handleIdSelection(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id)); //* to make the double click on the list cause closing for the movie details
  }

  function closeMovieDetails() {
    setSelectedId(null);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  console.log(watched);
  useEffect(
    function () {
      //*  use a native browser API to solve race condition issue (look up App features.js file)
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          console.log("HEY MOVIE SEarch");
          setIsLoading(true);
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
        } catch (err) {
          // console.error(err.message);
          if (err.name !== "AbortError") setError(err.message); //* When fetch request cancelled by clean up function, it throws error, so to fixed that, write this line of code
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        return;
      }

      closeMovieDetails(); //* to close the last movieDetails before start a new movie search
      fetchMovies(); //* call fetch function to start to fetch a movie
      return function () {
        controller.abort();
      };
    },
    [query]
  );
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
  //! this not ideal, because in React we follow declarative technique
  //* We don't touch the DOM
  // useEffect(function () {
  //   const input = document.querySelector(".search");
  //   input.focus();
  // }, []); //* also if we define query inside dep array, this input variable will be declared (select the element) over and over again when ever the query changed

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

function Main({ children }) {
  return (
    <main className="main">
      {children}
      {/* <WatchedMoviesBox /> */}
    </main>
  );
}

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

  //! Create Ref
  const countRef = useRef(0); //* this ref to store the amount of clicks that happened on the rating before the movie is added,
  //* but we don't want to render that information.  Or in other words, we do not want to create a re-render

  //! Use the ref inside useEffect:
  //* because remember that we are not allowed to mutate the ref in render logic.
  //* check the states in react devtools in browser to see the updated value of countRef

  //! if you tried to use normal variable instead of
  let count = 0;
  useEffect(
    function () {
      //* we have to add this condition because this useEffect will also run at first on mount so it will add one to the counter while still no useRating exists
      if (userRating)
        //* countRef.current = countRef.current + 1;
        //? or   countRef.current =+ 1;
        countRef.current++;
      count++; //* when it updates, it will re - render the component and it will reset the count again. (its value won't be persisted across rendered)
    },
    [userRating, count]
  ); //* we will count the times of rating a movie, of course when there will be a userRating

  //* So then each time the user rating was updated, the component was re-rendered.

  //* And so then after that re-render, this effect was executed which means that after the rating had been updated,

  //* then our ref would be updated as well. So we would update the current property to simply adding one.

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
  //* because useEffect executed after (render + commit + browser paint)

  //? Average State:
  const [avgRating, setAvgRating] = useState(0);

  function handleAdd() {
    const newWatchedMovie = {
      poster,
      title,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(" ").at(0),
      userRating,
      imdbID,
      countRatingDecisions: countRef.current,
      count, //* 1  (the value after last click)
    };
    console.log(newWatchedMovie.runtime);

    onAddWatchedMovie(newWatchedMovie);

    setAvgRating(Number(imdbRating));
    console.log(avgRating); //* still 0 why?

    //~ Example of:
    //* 3) Proof that update a state is asynchronous. (avgRating)
    //! Because only once React is done processing this event handler (handleAdd), it will then update all the state (ex.avgRating ) and re-render the UI
    setAvgRating((avgRating + imdbRating) / 2); //* avgRating is 0
    //* solution: use callback function
    setAvgRating((avgRating) => (avgRating + imdbRating) / 2);
  }

  //! Call imdbRating conditionally
  //! if( imdbRating > 8)  [isTop, setIsTop] = useState();

  //! Early return and that is wrong
  //! if (imdbRating > 8) return <p>Movie is great</p>

  //~ Example of:
  //* Initial value of useState is looked by react in initial render.
  const [isTop, setIsTop] = useState(imdbRating > 8);

  console.log(isTop); //* false

  //* false, even if the rating is > 8, why? because at initial render,
  //* the react looks at imbdRating and find it undefined (because API data still not fetched)

  //? Solution:
  //* useEffect
  //* run this Effect whenever imdbRating updates

  useEffect(
    function () {
      setIsTop(imdbRating > 8);
    },
    [imdbRating]
  );

  //* but in this case useEffect is not needed
  //* instead use derived state
  const isTop2 = imdbRating > 8; //* isTop2 it will be regenerated whenever the component is executed so after each render (subsequent render)

  useEffect(
    function () {
      // document.title = "test";
      //* We actually don't want to see the undefined in the browser tab in the beginning.
      //* so we don't want temporarily to be our movie set to undefined.
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "My usePopCorn";
        console.log(`Cleanup Effect for movie ${title}`); //* title: will show the name of last movie before go back because of closure Javascript effect
      };
    },
    [title]
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
          <p>{avgRating}</p>
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
