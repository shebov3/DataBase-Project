import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const breakPoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};


const NavBar = ({ searchData, setSearchData, userName }) => {

  return (
    <>
      <nav className="bg-white relative flex h-[70px] w-[100%]">
        <div className="m-4 ">Logo</div>
      </nav>   
    </>
  );
};

export default NavBar;
