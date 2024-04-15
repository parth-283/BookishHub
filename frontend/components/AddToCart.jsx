// pages/cart.js

import React, { useState } from "react";
import PaymentFailedPopup from "./Popups/PaymentFailedPopup";
import PaymentSuccessPopup from "./Popups/PaymentSuccessPopup";
import CheckoutPopup from "./Popups/CheckoutPopup";

const CartPage = () => {
  // Sample books data
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Book 1",
      price: 10,
      quantity: 1,
      image: "https://source.unsplash.com/1600x1000/?book",
    },
    {
      id: 2,
      title: "Book 2",
      price: 15,
      quantity: 1,
      image: "https://source.unsplash.com/1600x1000/?book",
    },
    {
      id: 3,
      title: "Book 3",
      price: 20,
      quantity: 1,
      image: "https://source.unsplash.com/1600x1000/?book",
    },
  ]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Calculate subtotal and total
  const subtotal = books.reduce(
    (acc, book) => acc + book.price * book.quantity,
    0
  );
  const total = subtotal;

  // Function to handle quantity increment
  const handleIncrement = (id) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, quantity: book.quantity + 1 };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  // Function to handle quantity decrement
  const handleDecrement = (id) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id && book.quantity > 1) {
        return { ...book, quantity: book.quantity - 1 };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  // Function to handle book removal
  const handleRemoveBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
  };

  const handlePaymentFailed = () => {
    setPaymentFailed(true);
  };

  const handleCloseSuccessPopup = () => {
    setPaymentSuccess(false);
  };

  const handleCloseFailedPopup = () => {
    setPaymentFailed(false);
  };

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start justify-between space-y-6 md:space-x-8">
        {/* Left Column - Cart Items */}
        <div className="md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          {books.map((book) => (
            <div
              key={book.id}
              className="flex justify-between items-center border-b border-gray-300 py-2"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-gray-600">${book.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleDecrement(book.id)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <p>{book.quantity}</p>
                <button
                  onClick={() => handleIncrement(book.id)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveBook(book.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Subtotal and Checkout */}
        <div className="md:w-1/3">
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            <div className="flex justify-between items-center mb-2">
              <p>Subtotal:</p>
              <p>${subtotal}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p>Total:</p>
              <p>${total}</p>
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
              onClick={handleOpenCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      {paymentSuccess && (
        <PaymentSuccessPopup onClose={handleCloseSuccessPopup} />
      )}
      {paymentFailed && <PaymentFailedPopup onClose={handleCloseFailedPopup} />}
      
      <CheckoutPopup isOpen={isCheckoutOpen} onClose={handleCloseCheckout} />
    </div>
  );
};

export default CartPage;
