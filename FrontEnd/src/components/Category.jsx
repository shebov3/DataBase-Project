import React from "react";
import Card from "./Card";

const Categories = ({ title, items }) => {
  return (
  <div className="container mx-auto px-10 py-8">
  <h2 className="text-3xl font-semibold text-white mb-6">{title}</h2>

      <div className="flex flex-wrap justify-center gap-6">
        {items.map((item, index) => (
          <Card
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}
            onClick={item.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
