import React from "react";
import { Link, useLocation } from "react-router-dom";
import Category from "../components/Category"


const Products = ({ searchData, setSearchData }) => {
  const location = useLocation();
  let platform = location.pathname.split('/')
  platform = platform[platform.length - 1]
  console.log(platform)
  return (
    <>
      <div>
        <Category sort = "Platform" title = {platform} />
      </div>
    </>

  );
};

export default Products;