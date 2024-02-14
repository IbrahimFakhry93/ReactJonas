import { useEffect, useRef, useState } from "react";
import "./index.css";
import StarRating from "../starRating";

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

//*======================================

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const [selectedId, setSelectedId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState("");

  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(function () {
    const stored = localStorage.getItem("watched");
    return JSON.parse(stored);
  });

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

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
          setError("");
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
  const inputEl = useRef(null); //* null is the initial value and in case of DOM element we pass null

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

  useEffect(
    function () {
      //* we have to add this condition because this useEffect will also run at first on mount so it will add one to the counter while still no useRating exists
      if (userRating) countRef.current++;
    },
    [userRating]
  );

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
    };
    console.log(newWatchedMovie.runtime);

    onAddWatchedMovie(newWatchedMovie);

    setAvgRating((avgRating) => (avgRating + imdbRating) / 2);
  }

  useEffect(
    function () {
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
  //* because [] means only at the initial render or mount of the MovieDetails

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
