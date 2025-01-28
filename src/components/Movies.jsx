import React, { useEffect } from "react";
import MovieCard from "./MovieCard";
import { useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({handleAddtoWatchlist, handleRemoveFromWatchlist, watchlist}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => {
    if (pageNo === 1) return;
    else setPageNo(pageNo - 1);
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=8fa1559caf186a3b19bb9283979b2615&include_adult=false&include_video=false&language=en-US&page=${pageNo}&sort_by=popularity.desc`
      )
      .then(function (res) {
        setMovies(res.data.results);
        console.log(res.data.results);
      });
  }, [pageNo]);

  return (
    <div className="p-5">
      <div className="text-2xl font-bold text-center">
        Trending movies
      </div>

      <div className="flex flex-row flex-wrap justify-around gap-5">
        {movies.map((movieObj) => {
          return (
            <MovieCard
              key = {movieObj.id} 
              movieObj={movieObj}
              poster_path={movieObj.poster_path}
              name={movieObj.original_title}
              handleAddtoWatchlist={handleAddtoWatchlist}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              watchlist={watchlist}
            />
          );
        })}
      </div>

      <Pagination
        pageNo={pageNo}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </div>
  );
}

export default Movies;

//https://api.themoviedb.org/3/discover/movie?api_key=8fa1559caf186a3b19bb9283979b2615&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc
