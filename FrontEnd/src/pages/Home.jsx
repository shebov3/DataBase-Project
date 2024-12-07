import React from "react";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import imageSrc from "../images/images.jpeg";  // Import the image

const Home = ({ setGameId, gameId }) => {

  return (
    <>
      <div className="flex justify-center gap-5 mt-11">
      <Card
        image={imageSrc}
        price={100}
        title="Title"
        description="some description some description "
        onClick={() => setGameId("uncharted-nathan-drake")}
      />
      <Card
        image={imageSrc}
        title="Title"
        price={100}
        description="some description some description "
        onClick={() => setGameId("uncharted-nathan-drake")}
      />
      <Card
        image={imageSrc}
        title="Title"
        price={100}
        description="some description some description "
        onClick={() => setGameId("uncharted-nathan-drake")}
      />
      <Card
        image={imageSrc}
        title="Title"
        price={100}
        description="some description some description "
        onClick={() => setGameId("uncharted-nathan-drake")}
      />
    </div>
    </>
  );
};

export default Home;
