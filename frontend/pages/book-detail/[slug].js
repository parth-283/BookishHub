import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { booksService } from "@/services/books.service";

const books = [
  {
    id: "1",
    title: "Book Title 1",
    slug: "book-title-1",
    author: "Author 1",
    genre: "Fantasy",
    description: "Description of Book 1",
    publicationDate: "2022-01-01",
    coverImage: "https://source.unsplash.com/featured/?biography,books",
    isbn: "978-1-2345-6789-0",
    publisher: "Publisher 1",
    totalPages: 300,
    format: "Paperback",
    price: 20,
    availability: "In Stock",
    tags: ["Fantasy", "Adventure"],
    references: "References for Book 1",
    weight: 400,
    editionDate: "2021-12-01",
    editionLanguage: "English",
    country: "United States",
    dimensions: {
      Height: "10 inches",
      Width: "8 inches",
      Thickness: "1 inch",
    },
  },
];

const BookDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [book, setBook] = useState({});

  useEffect(() => {
    if (slug) {
      getBookBySlug(slug);
    }
  }, [slug]);

  const getBookBySlug = async (slug) => {
     await booksService.getBookBySlug(slug).then((res) => {
        setBook(res);
      }).catch((errorMessage)=>{
        console.error("Error fetching book:", errorMessage);
      })
  };

  return (
 <>
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-semibold mb-4">{book.title}</h1>
            <p className="text-gray-600 mb-2">Author: {book.author}</p>
            <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
            <p className="text-gray-600 mb-4">{book.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <p className="text-gray-600 mb-2">Publication Date:</p>
                <p>{book.publicationDate}</p>
              </div>
              <div className="col-span-1">
                <p className="text-gray-600 mb-2">ISBN:</p>
                <p>{book.isbn}</p>
              </div>
              <div className="col-span-1">
                <p className="text-gray-600 mb-2">Publisher:</p>
                <p>{book.Publisher}</p>
              </div>
              <div className="col-span-1">
                <p className="text-gray-600 mb-2">Total Pages:</p>
                <p>{book.totalPages}</p>
              </div>
              <div className="col-span-1">
                <p className="text-gray-600 mb-2">Format:</p>
                <p>{book.format}</p>
              </div>
              <div className="col-span-1">
                <p className="text-gray-600 mb-2">Price:</p>
                <p>${book.price}</p>
              </div>
              <div className="col-span-1">
                <p className="text-gray-600 mb-2">Availability:</p>
                <p>{book.availability}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600 mb-2">Tags:</p>
                <p>{book?.tags?.join(", ")}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600 mb-2">References:</p>
                <p>{book.references}</p>
              </div>
              <div className="col-span-1">
                <p className="text-gray-600 mb-2">Weight:</p>
                <p>{book.weight} grams</p>
              </div>
              <div className="col-span-1">
                <p className="text-gray-600 mb-2">Edition Date:</p>
                <p>{book.editionDate}</p>
              </div>
              <div className="col-span-1">
                <p className="text-gray-600 mb-2">Edition Language:</p>
                <p>{book.editionLanguage}</p>
              </div>
              <div className="col-span-1">
                <p className="text-gray-600 mb-2">Country:</p>
                <p>{book.country}</p>
              </div>
              {book?.dimensions&&<div className="col-span-1">
                <p className="text-gray-600 mb-2">Dimensions:</p>
                <ul className="list-disc ml-8">
                  {Object.entries(book.dimensions).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </div>}
            </div>
            <div className="mt-6 flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">
                Update
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>

          <div className="md:w-1/2 relative">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-auto rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>
        </div>
        {/* Additional content */}
        <div className="p-4 bg-gray-100 text-center mt-4">
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
 </>
  );
};

export default BookDetailPage;
