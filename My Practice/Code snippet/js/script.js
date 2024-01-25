(function () {
  const data = [
    {
      id: 1,
      title: "The Lord of the Rings",
      publicationDate: "1954-07-29",
      author: "J. R. R. Tolkien",
      reviews: {
        goodreads: {
          rating: 4.52,
          ratingsCount: 630994,
          reviewsCount: 13417,
        },
        librarything: {
          rating: 4.53,
          ratingsCount: 47166,
          reviewsCount: 452,
        },
      },
    },
    {
      id: 2,
      title: "The Cyberiad",
      author: "Stanislaw Lem",
      reviews: {
        goodreads: {
          rating: 4.16,
          ratingsCount: 11663,
          reviewsCount: 812,
        },
      },
    },
  ];
  const getBook = (id) => data.find((book) => book.id === id);

  const book = getBook(2);
  book;
  const getReviewsCount = (book) =>
    book.reviews.goodreads.reviewsCount +
    (book.reviews.librarything?.reviewsCount ?? 0); //* use ?? to return 0 instead of undefined
  const totalCounts = getReviewsCount(book);
  totalCounts;

  //! note: The addition operator (+) has higher precedence than the nullish coalescing operator (??), so it is evaluated first.
  //* This means that when you try to add the reviewsCount property of the goodreads object (which is a number) to the result of the optional chaining expression (which is undefined),
  //* you get NaN.

  //? note: undefined + number = NaN
})();

//*===========================================================================================================================

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
