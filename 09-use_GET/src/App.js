import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError] = useState(null);

  //Fetch API, fetch가 프로미스 객체를 반환해서 then 사용, json이 프로미스 객체 반환하여 then 사용
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoding(true);
    setError(null);
    try {
      const res = await fetch("https://swapi.dev/api/films/");

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await res.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id, // episode_id 를 id로 바꿈
          title: movieData.title, // title은 안바꿈
          openingText: movieData.opening_crawl, // opening_crawl 를 openingText 바꿈
          releaseDate: movieData.release_date, // release_date 를 releaseDate 바꿈
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoding(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoding) {
    content = <p>Loding...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
