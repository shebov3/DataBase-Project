import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const Product = () => {
  const [data, setData] = useState("");
  const { gameId } = useParams();
  useEffect(() => {
    const getData = async ()=>{
      const url = `http://localhost:3000/api/v1/products/${gameId}`
      const response = await axios.get(url);
      setData(response.data.game[0]);
      console.log(data)
    }
    getData()

  }, [gameId]);

  const addToCart = async ()=>{
    const url = `http://localhost:3000/api/v1/cart/${gameId}`
    const response = await axios.get(url);
    setData(response.data.game[0]);
    console.log(data)
  }


  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Details */}
        <div className="flex-1 ms-10">
          {/* Main Image */}
          <img
            src="https://via.placeholder.com/600x300"
            alt="Product"
            className="rounded-lg shadow-lg"
          />
          <h1 className="text-3xl font-bold mt-4">{data.Name}</h1>

          {/* Smaller Images */}
          <div className="flex gap-4 mt-6">
            <img
              src="https://via.placeholder.com/150x100"
              alt="Thumbnail 1"
              className="rounded-lg shadow-lg w-1/5"
            />
            <img
              src="https://via.placeholder.com/150x100"
              alt="Thumbnail 2"
              className="rounded-lg shadow-lg w-1/5"
            />
            <img
              src="https://via.placeholder.com/150x100"
              alt="Thumbnail 3"
              className="rounded-lg shadow-lg w-1/5"
            />
          </div>
        </div>

        {/* Product Info Sidebar */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold mb-4">{data.Name}</h2>
          <p className="text-[rgb(149,171,82)] text-3xl font-bold mb-4">{data.Price}$</p>
          <button onClick={addToCart} className="bg-[rgb(149,171,82)] hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full mb-4">
            ADD TO CART
          </button>
          <h3 className="text-lg font-semibold mb-3">Product Information</h3>
          <ul className="text-sm space-y-2">
            <li><strong>Condition:</strong> New</li>
            <li><strong>Studio:</strong> {data?.Brand}</li>
            <li><strong>Genre:</strong> {data?.CategoryName}</li>
            <li><strong>Release Date:</strong> {data?.ReleaseDate?.split('T')[0]}</li>
            <li><strong>Age Rating:</strong> Adults Only 18+</li>
            <li><strong>Platform:</strong> {data.Platform}</li>
            <li><strong>Description:</strong> {data?.Description}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Product;
