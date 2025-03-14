import { useState, useEffect } from "react";

const KEY = "25441af3";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    // callBack?.();
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error(
            "Something went wrong with fetching movies, Please try again later ⌛"
          );

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);

        setError("");
      } catch (err) {
        if (err.name !== "AbortError") return;
        if (
          err.message === "Movie not found" ||
          err.message === "Something went wrong with fetching movies"
        ) {
          setError(err.message);
          console.log(err.message);
        } else if (err.name !== "AbortError") {
          setError(
            "Oops ! Something went wrong , please check your internet connection . 🛜"
          );
          console.log(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
