import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Product = () => {
  const [data, setData] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { gameId } = useParams();
  const [currentImage, setCurrentImage] = useState(""); // state for the main image

  useEffect(() => {
    const getData = async () => {
      const url = `http://localhost:3000/api/v1/products/${gameId}`;
      const response = await axios.get(url);
      setData(response.data.game[0]);
      console.log(response.data.game[0]);
      if (response.data.game[0]?.Images?.length > 0) {
        setCurrentImage(response.data.game[0].Images[0]); // set initial image
      }
    };
    getData();
  }, [gameId]);

  const addToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const url = `http://localhost:3000/api/v1/user/cart/${gameId}`;
    if (!user) {
      alert("Please Log In");
      return;
    }
    try {
      await axios.post(
        url,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert("Game added to Cart");
    } catch (error) {
      alert("Game already in Cart");
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Details */}
        <div className="flex-1 ms-10">
          {/* Main Image */}
          <div className="relative mb-6">
            <img

              src={currentImage}
              alt="Product"
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>

          {/* Smaller Images */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {data.Images?.map((image, index) => (
              <img

                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => setCurrentImage(image)} // Update main image on click
              />
            ))}
          </div>
        </div>

        {/* Product Info Sidebar */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">{data.Name}</h2>
          <p className="text-[rgb(149,171,82)] text-3xl font-bold mb-4">
            {data.Price}$
          </p>

          {/* Quantity Input */}
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="text-white mr-3">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} // Update quantity
              className="w-20 px-2 py-1 text-black rounded"
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="bg-[rgb(149,171,82)] hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full mb-4"
          >
            ADD TO CART
          </button>

          <h3 className="text-lg font-semibold mb-3">Product Information</h3>
          <ul className="text-sm space-y-2">
            <li>
              <strong>Condition:</strong> New
            </li>
            <li>
              <strong>Studio:</strong> {data?.Brand}
            </li>
            <li>
              <strong>Genre:</strong> {data?.CategoryName}
            </li>
            <li>
              <strong>Release Date:</strong> {data?.ReleaseDate?.split("T")[0]}
            </li>
            <li>
              <strong>Age Rating:</strong> Adults Only 18+
            </li>
            <li>
              <strong>Platform:</strong> {data.Platform}
            </li>
            <li>
              <strong>Description:</strong> {data?.Description}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Product;
