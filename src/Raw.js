import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Raw.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseUrl = "https://image.tmdb.org/t/p/original";

export default function Raw({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  console.log(movies);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.original_title || "")
        .then((url) => {
          let urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams.get("v"));
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  // const handleClick = (movie) => {
  //   if (trailerUrl) {
  //     setTrailerUrl("");
  //   } else {
  //     movieTrailer(movie.name)
  //       .then((url) => {
  //         let urlParams = URLSearchParams(new URL(url).search);
  //         setTrailerUrl(urlParams.get("v"));
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // };

  return (
    <div className="raw">
      <h2>{title}</h2>
      <div className="raw_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`raw_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.title}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}
