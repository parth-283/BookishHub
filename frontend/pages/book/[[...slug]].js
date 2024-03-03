import BooksList from "@/components/BooksList";
import { booksService } from "@/services/books.service";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
  {
    id: "2",
    title: "Book Title 2",
    slug: "book-title-2",
    author: "Author 2",
    genre: "Mystery",
    description: "Description of Book 2",
    publicationDate: "2022-02-01",
    coverImage: "https://source.unsplash.com/featured/?biography,books",
    isbn: "978-1-2345-6790-0",
    publisher: "Publisher 2",
    totalPages: 250,
    format: "Hardcover",
    price: 25,
    availability: "Out of Stock",
    tags: ["Mystery", "Suspense"],
    references: "References for Book 2",
    weight: 450,
    editionDate: "2021-11-01",
    editionLanguage: "English",
    country: "United Kingdom",
    dimensions: {
      Height: "9 inches",
      Width: "7 inches",
      Thickness: "1.5 inches",
    },
  },
  // Add more books as needed
];
export default function book() {
  const router = useRouter();
  const { slug } = router.query;
  const [bokksList, setbokksList] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(true);

  useEffect(() => {
    if(isDataLoaded){getBooks();}
  }, []);

  const getBooks = async () => {
    booksService
      .getBooks()
      .then((res) => {
        setbokksList(res);
        setIsDataLoaded(false)
      })
      .catch((errorMessage) => {
        console.log(errorMessage, "errorMessage");
      });
  };

  return (
    <div>
      <Head>
        <title>Books Page</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
          integrity="sha512-0NKFME9sUoN3W9ZIS00ymGkXxOcF2bafhpk9BRaIlPIoXphIZMY/7Th4XItTd+rU6uW8KTXDoyWCB9tr2rSxEQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <div className="relative bg-white py-16 ">
        <div className="absolute inset-0 bg-black-700 opacity-50"></div>
        <div className="container mx-auto px-10 relative z-10">
          <div className="relative bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform scale-105 shadow-lg">
            <img
              src="/Images/category-2.jpg"
              alt="Category Name"
              className="w-full h-64 object-cover opacity-80"
            />
            <div className="absolute z-10 inset-0 flex text-center items-center justify-center">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Enter the World of Books
                </h1>
                <p className="text-lg text-gray-300 mb-8">
                  Dive into our library of stories, where every page holds a new
                  adventure waiting to unfold.
                </p>
              </div>
            </div>
          </div>

          <hr className="border-gray-700 border-2 my-8" />

          {/* Book cards */}
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {bokksList.map((book) => (
                <BooksList key={book.id} book={book} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}