import React, { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 20.0,
      quantity: 1,
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 35.0,
      quantity: 2,
      image: 'https://via.placeholder.com/80',
    },
  ]);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="min-h-screen px-8 py-10">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Your Shopping Cart
        </h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b py-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg shadow-md"
                    />
                    <div className="ml-4">
                      <h2 className="font-medium text-lg text-gray-700">
                        {item.name}
                      </h2>
                      <p className="text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-lg font-medium text-gray-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between text-gray-700 mb-2">
                <p>Subtotal</p>
                <p>${calculateTotal().toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-gray-700 mb-4">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-xl font-bold text-gray-800">
                <p>Total</p>
                <p>${calculateTotal().toFixed(2)}</p>
              </div>
              <button className="mt-6 w-full py-3 bg-[rgb(149,171,82)] text-white text-lg rounded-lg hover:bg-blue-600">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
