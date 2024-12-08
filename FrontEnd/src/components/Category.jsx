import { useState, useEffect } from 'react';
import Card from './Card';
import axios from "axios";

const Categories = ({ sort, title, data }) => {
  const [sortedData, setData] = useState([]);
  useEffect(() => {
    const getSortedData = async () => {
      if (!sort){
        return
      }
      if (title === 'AllGames') {
        const data = await axios.get(
          `http://localhost:3000/api/v1/products`
        );
        setData(data.data.games)
      }
      else if (title === 'Under 500 EGP') {
        const data = await axios.get(
          `http://localhost:3000/api/v1/products`
        );
  
        setData(data.data.games.filter((item)=>item.Price <= 500))
      }else{
        const data = await axios.get(
          `http://localhost:3000/api/v1/products?${sort}=${title}`
        );
        setData(data.data.games)
      }
    };

    getSortedData()
  }, [sort, title, data]) 

  return (
    <div className="container mx-auto px-10 py-8">
      <h2 className="text-3xl font-semibold text-white mb-6">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?data.map((item) => (
          <Card
            key={item.ProductId}
            image={'https://via.placeholder.com/600x300'}
            title={item.Name}
            description={item.Description}
            price={item.Price}
          />
        )):sortedData.map((item) => (
          <Card
            key={item.ProductId}
            image={'https://via.placeholder.com/600x300'}
            title={item.Name}
            description={item.Description}
            price={item.Price}
          />
        ))}
      </div>

    </div>
  );
};

export default Categories;
