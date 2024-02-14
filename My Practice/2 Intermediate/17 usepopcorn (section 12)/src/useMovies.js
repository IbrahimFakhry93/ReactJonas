import { useEffect, useState } from "react";

//* a custom hook actually needs to use at least one React hook, otherwise, it's just irregular function

export function useMovies(query, KEY) {
  const [movies, setMovies] = useState([]);
  const [isError, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      //*  use a native browser API to solve race condition issue (look up App features.js file)

      //! check if function is exist using optional chaining
      //~ for example check for existence a function is called callback
      //* callback?.()
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

      // closeMovieDetails(); //* to close the last movieDetails before start a new movie search
      fetchMovies(); //* call fetch function to start to fetch a movie
      return function () {
        controller.abort();
      };
    },
    [query, KEY]
  );

  return { movies, isLoading, isError };
}
