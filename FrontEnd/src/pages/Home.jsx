import React from "react";
import Card from "../components/Card";
import Category from "../components/Category"
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import imageSrc from "../images/images.jpeg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Home = ({ setGameId, gameId }) => {
  const [data, setData] = useState([]);
  
  
  useEffect(() => {
      const getData = async () => {
        const data = await axios.get(
          `http://localhost:3000/api/v1/products`
        );
        setData(data.data.games);
      };
      getData();  
    }, []);

    const settings = {
      dots: true, // Show navigation dots
      infinite: true, // Infinite looping
      speed: 500, // Transition speed
      slidesToShow: 1, // Number of slides to display
      slidesToScroll: 1, // Number of slides to scroll
      autoplay: true, // Enable autoplay
      autoplaySpeed: 3000, // Time between slide transitions in milliseconds
    }

  return (
    <>
      {/* <Category title = "Action" items = {cardData}/>
      <Category title = "Adventure" items = {cardData}/>
      <Category title = "RPG" items = {cardData}/> */}
      <div className="flex justify-center mt-4">
        <Slider className="w-[50rem]" {...settings}>
          {data.map((game) => (
            <div key={game.ProductId} className="">
              <img
                src={"https://via.placeholder.com/600x300"}
                alt={game.Name}
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-center text-lg font-medium mt-2">{game.Name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </>
    
  );
};

export default Home;
