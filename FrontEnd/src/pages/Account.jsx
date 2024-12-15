import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../images/Logo.png';


const Default = ({setPage})=>{
  return(
    <div className="w-3/4 p-8">
      <h2 className="text-white text-lg font-bold mb-4">Welcome Ahmed Ebrahim</h2>
      <p className="text-white text-sm mb-4">What would you like to do?</p>

      <div className="grid grid-cols-2 gap-4">
        <div onClick={()=>setPage('orders')} className="bg-gray-800 p-4 cursor-pointer rounded-lg transform transition-all duration-300 hover:bg-gray-700">
          <h3 className="text-white text-md font-bold mb-2">Orders</h3>
          <p className="text-white text-sm">Manage your orders.</p>
        </div>
        <div onClick={()=>setPage('personalInfo')} className="bg-gray-800 p-4 cursor-pointer rounded-lg transform transition-all duration-300 hover:bg-gray-700">
          <h3 className="text-white text-md font-bold mb-2">Personal Information</h3>
          <p className="text-white text-sm">Edit your personal information.</p>
        </div>
        <div onClick={()=>setPage('shipping')} className="bg-gray-800 p-4 cursor-pointer rounded-lg transform transition-all duration-300 hover:bg-gray-700">
          <h3 className="text-white text-md font-bold mb-2">Shipping</h3>
          <p className="text-white text-sm">Edit your delivery addresses.</p>
        </div>
        <Link to={'/cart'} className="bg-gray-800 p-4 cursor-pointer rounded-lg transform transition-all duration-300 hover:bg-gray-700">
          <h3 className="text-white text-md font-bold mb-2">Cart</h3>
          <p className="text-white text-sm">Manage your Cart.</p>
        </Link>
      </div>
    </div>
  )
}

const Orders = ()=>{
  return(
    <></>
  )
}


const PersonalInformation = ()=>{
  return(
    <></>
  )
}

const ShippingInformation = ()=>{
  return(
    <></>
  )
}


const Account = ({ }) => {
  const [page, setPage] = useState('default');  // Initialize as a string to determine which component to render

  const renderPage = () => {
    switch (page) {
      case 'orders':
        return <Orders />;
      case 'personalInfo':
        return <PersonalInformation />;
      case 'shipping':
        return <ShippingInformation />;
      default:
        return <Default setPage={setPage} />;
    }
  };


  return (
      <div className="bg-gray-900 h-screen flex">
        <div className="w-1/4 bg-gray-800 p-4">
          <h2 className="text-white text-lg font-bold mb-4">Manage Your Account</h2>
          <div className="flex flex-col gap-2">
            <div onClick={()=>setPage('default')} className="text-white cursor-pointer text-sm mb-2 hover:text-blue-400 transition-colors duration-200">
              <span to={'/account'}>My Account</span>
            </div>
            <div onClick={()=>setPage('orders')} className="text-white cursor-pointer text-sm mb-2 hover:text-blue-400 transition-colors duration-200">
              <span>Orders</span>
            </div>
            <div onClick={()=>setPage('personalInfo')} className="text-white cursor-pointer text-sm mb-2 hover:text-blue-400 transition-colors duration-200">
              <span>Personal Information</span>
            </div>
            <div onClick={()=>setPage('shipping')} className="text-white cursor-pointer text-sm mb-2 hover:text-blue-400 transition-colors duration-200">
              <span>Shipping Information</span>
            </div>
            <div className="text-white text-sm mb-2 hover:text-blue-400 transition-colors duration-200">
              <Link to={'/cart'}>Cart</Link>
            </div>
          </div>
        </div>
        {renderPage()}
      </div>

  );
}

export default Account;
