import React, { useState, useEffect } from 'react';
import logo from '../images/Logo.png';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



const Login = ({setUserData}) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[gmail.com]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid Gmail address (e.g., example@gmail.com)');
      return;
    }

    try {
      const url = `http://localhost:3000/api/v1/auth/login`
      const user = await axios.post(url, {
        email: email,
        password: password,
      });
      localStorage.setItem('user', JSON.stringify(user.data));
      setUserData({
        user:JSON.parse(localStorage.getItem('user')),
      })
      navigate('/')
    } catch (error) {
      alert('Email or password wrong')
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-10 rounded-lg w-96">
        <div className="text-center mb-8 flex justify-center">
          <img src={logo} alt="Your Logo" className="w-48 h-48" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          
          <button type="submit" className="w-full text-white bg-[rgb(149,171,82)] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-300">Don't have an account? <Link to={'/register'} className="text-[rgb(149,171,82)] hover:underline">Register Now</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;