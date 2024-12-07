import React from "react";

const Card = ({ image, title, description, price, onClick }) => {
  return (
    <div className="max-w-sm cursor-pointer rounded overflow-hidden shadow-lg bg-slate-900 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:translate-y-2">
      <img className="w-full h-64 object-cover" src={image} alt={title} />
      
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-[rgb(149,171,82)]">{title}</div>
        
        <p className="text-base text-gray-200 ">{description}</p>

        <div className="text-lg font-semibold text-yellow-500">{price} EGP</div>
      </div>
    </div>
  );
};

export default Card;
