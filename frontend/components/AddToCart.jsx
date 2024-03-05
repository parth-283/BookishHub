import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const AddToCart = () => {
  const [booksInCart, setBooksInCart] = useState([
    { id: 1, name: "Book 1", image: "/book1.jpg", quantity: 1 },
    { id: 2, name: "Book 2", image: "/book2.jpg", quantity: 2 },
    // Add more books as needed
  ]);

  const stripe = useStripe();
  const elements = useElements();

  const handleIncrement = (index) => {
    const updatedBooks = [...booksInCart];
    updatedBooks[index].quantity++;
    setBooksInCart(updatedBooks);
  };

  const handleDecrement = (index) => {
    const updatedBooks = [...booksInCart];
    if (updatedBooks[index].quantity > 1) {
      updatedBooks[index].quantity--;
      setBooksInCart(updatedBooks);
    }
  };

  const handleRemove = (index) => {
    const updatedBooks = [...booksInCart];
    updatedBooks.splice(index, 1);
    setBooksInCart(updatedBooks);
  };

  const totalPrice = booksInCart.reduce(
    (acc, book) => acc + book.quantity * 10,
    0
  );

  const handleSubmitPayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log(paymentMethod);
      // Handle successful payment (e.g., send paymentMethod.id to your server)
    }
  };

  return (
    <div className="container mx-auto">
      <Head>
        <title>Cart</title>
      </Head>
      <div className="mt-8 mb-4 flex items-center">
        <Link href="/books">
          <p className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 inline-block"
            >
              <path
                fill="currentColor"
                d="M20 11H7.41l5.3-5.29a1 1 0 1 0-1.42-1.42l-7 7a1 1 0 0 0 0 1.42l7 7a1 1 0 0 0 1.42-1.42L7.41 13H20a1 1 0 0 0 0-2z"
              />
            </svg>
            <span className="text-lg">Back to Book List</span>
          </p>
        </Link>
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>
      {booksInCart.length === 0 ? (
        <p className="text-xl">Your cart is empty</p>
      ) : (
        <div>
          {booksInCart.map((book, index) => (
            <div
              key={book.id}
              className="flex items-center border-b border-gray-300 py-4"
            >
              <div className="w-24 h-24 mr-4">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow mr-4">
                <p className="text-lg font-semibold">{book.name}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleDecrement(index)}
                    className="bg-gray-200 text-gray-600 px-3 py-1 rounded-md mr-2"
                  >
                    -
                  </button>
                  <p className="font-semibold">{book.quantity}</p>
                  <button
                    onClick={() => handleIncrement(index)}
                    className="bg-gray-200 text-gray-600 px-3 py-1 rounded-md ml-2"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemove(index)}
                className="text-red-500 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Total Price: ${totalPrice}
            </h2>
            <form onSubmit={handleSubmitPayment}>
              <CardElement className="border border-gray-300 rounded-md p-2 mb-4" />
              <button
                type="submit"
                disabled={!stripe}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Pay Now
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
