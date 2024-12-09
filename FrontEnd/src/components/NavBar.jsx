import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../images/Logo.png';
import { useState, useEffect } from "react";


const NavBar = ({ searchData, setSearchData, userName }) => {
  const navigate = useNavigate();
  const [searchBarData, setSearchBarData] = useState('');

  const search = ()=>{
    console.log(searchBarData)
    setSearchData(searchBarData);
    console.log(searchData)
    navigate(`/search`)
  }

  return (
    <>
      <nav className="bg-[rgb(28,34,52)] shadow-lg">
        <div className="mx-auto flex justify-between items-center h-[70px] px-4 lg:px-20">
          <div className="text-xl text-white font-semibold">
            <Link to="/"><img className="w-10" src={logo} /></Link>
          </div>
          <div className="flex-grow mx-4 outline-none">
            <input
              type="text"
              value={searchBarData}
              onKeyDown={(e) => e.key === "Enter"? search() : null}
              onChange={(e) => setSearchBarData(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Search..."
            />
          </div>

          {/* Sign In Button */}
          <div className="flex items-center space-x-4">
            {userName ? (
              <span className="text-gray-600">Welcome, {userName}</span>
            ) : (
              <Link
                to="/login"
                className="bg-[rgb(149,171,82)] text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Sign In
              </Link>
            )}

            {/* Cart Button */}
            <Link to="/cart" className="text-gray-600 hover:text-gray-900">
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">
                <i className="fa-solid fa-cart-shopping"></i>

              </button>
            </Link>
          </div>
        </div>

        {/* Links */}
        <div className="">
          <div className="flex justify-center gap-5 mt-5 py-2 text-white">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/Products/PS5" className="hover:text-gray-300">PlayStation 5</Link>
            <Link to="/Products/PS4" className="hover:text-gray-300">PlayStation 4</Link>
            <Link to="/Products/PS3" className="hover:text-gray-300">PlayStation 3</Link>
            <Link to="/Products/Switch" className="hover:text-gray-300">Switch</Link>
            <Link to="/Products/AllGames" className="hover:text-gray-300">All Games</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
