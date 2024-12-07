import React from "react";

const Card = ({ image, title, description, price, onClick }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-900 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:translate-y-2">
      <img className="w-full h-64 object-cover" src={image} alt={title} />
      
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-white">{title}</div>
        
        <p className="text-base text-gray-200 ">{description}</p>

        <div className="text-lg font-semibold text-yellow-500">{price} EGP</div>
      </div>

      <div className="px-6 pt-4 pb-3">
        {onClick && (
          <button
            onClick={onClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded hover:scale-110 transform transition-all duration-200"
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
