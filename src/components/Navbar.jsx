import React from "react";
import { Link } from "react-router-dom";
import movieLogo from "../assets/movieLogo.png";
const Navbar = () => {
  return (
    <div className="flex border space-x-9 items-center pl-3 py-4 ">
      <Link to="/">
        <img
          src={movieLogo}
          className="rounded-full shadow-lg"
          alt="logo"
          style={{ maxHeight: "60px" }}
        />
      </Link>
      <Link to="/" className="text-blue-500 text-3xl font-bold">
        Movies
      </Link>
      <Link to="/Watchlist" className="text-blue-500 text-3xl font-bold">
        Watchlist
      </Link>
    </div>
  );
};

export default Navbar;
