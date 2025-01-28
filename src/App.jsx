import "./App.css";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import { useEffect, useState } from "react";

function App(){
  let [watchlist, setWatchlist] = useState([]);

  let handleAddtoWatchlist = (movieObj) => {
    let newWatchlist = [...watchlist, movieObj]
    localStorage.setItem("moviesApp", JSON.stringify(newWatchlist))
    setWatchlist(newWatchlist)
    console.log(newWatchlist)
  }

  let handleRemoveFromWatchlist = (movieObj) => {
    let filteredWatchlist = watchlist.filter((movie) => {
      return movie.id != movieObj.id
    })
    setWatchlist(filteredWatchlist)
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchlist))
  }

  useEffect(() => {
    let data = localStorage.getItem("moviesApp")
    if(!data){
      return
    }
      setWatchlist(JSON.parse(data))
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies watchlist={watchlist} handleAddtoWatchlist={handleAddtoWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist}/>
              </>
            }
          />
          <Route path="/Watchlist" element={<Watchlist watchlist={watchlist} setWatchlist={setWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
