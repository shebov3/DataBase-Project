import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../images/Logo.png';

const Account = ({ searchData, setSearchData, userData, setUserData }) => {


  return (
      <div className="bg-gray-900 h-screen flex">
        <div className="w-1/4 bg-gray-800 p-4">
          <h2 className="text-white text-lg font-bold mb-4">Manage Your Account</h2>
          <ul className="flex flex-col gap-2">
            <Link to={'/account'} className="text-white text-sm mb-2 hover:text-blue-400 transition-colors duration-200">
              My Account
            </Link>
            <Link className="text-white text-sm mb-2 hover:text-blue-400 transition-colors duration-200">
              Orders
            </Link>
            <Link className="text-white text-sm mb-2 hover:text-blue-400 transition-colors duration-200">
              Personal Information
            </Link>
            <Link className="text-white text-sm mb-2 hover:text-blue-400 transition-colors duration-200">
              Shipping Information
            </Link>
            <Link className="text-white text-sm mb-2 hover:text-blue-400 transition-colors duration-200">
              Reward Points
            </Link>
          </ul>
        </div>

        <div className="w-3/4 p-8">
          <h2 className="text-white text-lg font-bold mb-4">Welcome Ahmed Ebrahim</h2>
          <p className="text-white text-sm mb-4">What would you like to do?</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 cursor-pointer rounded-lg transform transition-all duration-300 hover:bg-gray-700">
              <h3 className="text-white text-md font-bold mb-2">Orders</h3>
              <p className="text-white text-sm">Manage your orders.</p>
            </div>
            <div className="bg-gray-800 p-4 cursor-pointer rounded-lg transform transition-all duration-300 hover:bg-gray-700">
              <h3 className="text-white text-md font-bold mb-2">Personal Information</h3>
              <p className="text-white text-sm">Edit your personal information.</p>
            </div>
            <div className="bg-gray-800 p-4 cursor-pointer rounded-lg transform transition-all duration-300 hover:bg-gray-700">
              <h3 className="text-white text-md font-bold mb-2">Shipping</h3>
              <p className="text-white text-sm">Edit your delivery addresses.</p>
            </div>
            <div className="bg-gray-800 p-4 cursor-pointer rounded-lg transform transition-all duration-300 hover:bg-gray-700">
              <h3 className="text-white text-md font-bold mb-2">Cart</h3>
              <p className="text-white text-sm">Manage your Cart.</p>
            </div>
          </div>
        </div>
      </div>

  );
}

export default Account;
