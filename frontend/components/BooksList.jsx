import Image from "next/image";
import Link from "next/link";
import React from "react";

const BooksList = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* <Link href={`/books/${book.UUID}`} className="mb-4 relative rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-lg"> */}
      <div className="mb-4 relative rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-lg">
        <Image
          src={book?.image?.secure_url}
          alt="Book Title"
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
        <p className="text-gray-600 mb-2">Author: {book.author}</p>
        <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
        <p className="text-gray-600 mb-2">Price: ${book.price}</p>
        <p className="text-gray-600 mb-2">Availability: {book.availability}</p>
        <div className="flex justify-between">
          <Link
            href={`/book-detail/${book.slug}`}
            className="text-blue-500 hover:underline"
          >
            View Details
          </Link>
          {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Show more
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default BooksList;
