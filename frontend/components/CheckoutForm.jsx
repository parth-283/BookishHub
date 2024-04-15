import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        address: {
          line1: address,
        },
        phone: contactNumber,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Send payment method to your server to complete the payment
      console.log(paymentMethod);
      setLoading(false);
      setSuccess(true);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {!success ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 mb-1">Address</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactNumber" className="block text-gray-700 mb-1">Contact Number</label>
            <input
              id="contactNumber"
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter your contact number"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cardElement" className="block text-gray-700 mb-1">Card Details</label>
            <CardElement id="cardElement" className="border border-gray-300 rounded p-2 w-full focus:outline-none" />
          </div>
          <button
            type="submit"
            disabled={!stripe || loading}
            className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : 'Pay'}
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
      ) : (
        <div className="text-green-500 mt-4 animate-pulse">Payment successful! 🎉</div>
      )}
    </div>
  );
};

export default CheckoutForm;
