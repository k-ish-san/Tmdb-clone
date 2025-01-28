import React, { useEffect } from "react";
import { useState } from "react";
import genreids from "../utility/genre";

function Watchlist({ watchlist, setWatchlist, handleRemoveFromWatchlist }) {
  const [search, setSearch] = useState("");
  const [genrelist, setGenrelist] = useState(['All Genres']);
  const [currentGenre, setCurrentGenre] = useState("All Genres");

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleFilter = (genre) => {
    setCurrentGenre(genre);
  }

  let sortIncreasing = () => {
    let sortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchlist([...sortedIncreasing]);
  };

  let sortDecreasing = () => {
    let sortedDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchlist([...sortedDecreasing]);
  };

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });
    temp = new Set(temp);
    setGenrelist(["All Genres", ...temp]);
  }, [watchlist]);


  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        {genrelist.map((genre)=>{
          return <div onClick={()=>handleFilter(genre)} className= {currentGenre==genre?"flex justify-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold items-center mx-4" : "flex justify-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold items-center mx-4" }>
         {genre}
        </div> 
      })}
      </div>

      <div className="flex justify-center mt-4">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          className=" h-[3rem] w-[25rem] bg-gray-200 rounded-xl my-4 px-4"
          placeholder="Search for Movies"
        />
      </div>

      <div className="overflow-hidden  border border-gray-200 rounded-lg p-2 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>NAME</th>
              <th className="flex justify-center">
                <div onClick={sortIncreasing} className="p-2">
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
                <div className="p-2">RATINGS</div>
                <div onClick={sortDecreasing} className="p-2">
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th>POPULARITY</th>
              <th>GENRES</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.filter((movieObj) => {
              if (currentGenre == "All Genres") {
                return true;
              } else {
                return genreids[movieObj.genre_ids[0]] == currentGenre;
              }
              }).filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[6rem] w-[rem] rounded-lg"
                        src={`https://image.tmdb.org/t/p/w500${movieObj.poster_path}`}
                      />
                      <div className="mx-10">{movieObj.original_title}</div>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                    <td onClick={()=>{
                      handleRemoveFromWatchlist(movieObj)
                    }}className="text-red-800 font-bold">Delete</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
