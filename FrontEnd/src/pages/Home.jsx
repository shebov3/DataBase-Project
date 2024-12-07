import React from "react";
import Card from "../components/Card";
import Category from "../components/Category"
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import imageSrc from "../images/images.jpeg";

const Home = ({ setGameId, gameId }) => {
  // dummy data
  const cardData = [
    {
      image: imageSrc,
      title: "Action Game",
      price: "1699",
      description: "some description",
      onClick: () => setGameId("action-game-1"),
    },
    {
      image: imageSrc,
      title: "Action Game",
      price: "1699",
      description: "some description",
      onClick: () => setGameId("action-game-2"),
    },
    {
      image: imageSrc,
      title: "Action Game",
      price: "1699",
      description: "some description",
      onClick: () => setGameId("action-game-3"),
    },
    {
      image: imageSrc,
      title: "Action Game",
      price: "1699",
      description: "some description",
      onClick: () => setGameId("action-game-4"),
    },
    {
      image: imageSrc,
      title: "Action Game",
      price: "1699",
      description: "some description",
      onClick: () => setGameId("action-game-4"),
    },
    {
      image: imageSrc,
      title: "Action Game",
      price: "1699",
      description: "some description",
      onClick: () => setGameId("action-game-4"),
    },
    
  ];

  return (
    <>
    <Category title = "Action" items = {cardData}/>
    <Category title = "Adventure" items = {cardData}/>
    <Category title = "RPG" items = {cardData}/>
    </>
  );
};

export default Home;
