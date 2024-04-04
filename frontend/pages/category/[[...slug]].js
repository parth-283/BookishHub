import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { categoryService } from "@/services/category.service";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const product = [
  {
    id: "9f90b5b4-487e-4e9e-b679-36a45a1d5cc7",
    slug: "literary-fiction",
    categoryName: "Literary Fiction",
    categoryID: 1001001,
    categoryShortDescription:
      "Explore the depth and beauty of human experiences.",
    unsplashImageURL:
      "https://source.unsplash.com/featured/?literaryfiction,books",
  },
  {
    UUID: "e0f81dc7-27fb-4e38-b18f-78a55f2f4652",
    categoryName: "Science Fiction (Sci-Fi)",
    categoryID: 1002002,
    categoryShortDescription:
      "Embark on adventures beyond the realms of possibility.",
    unsplashImageURL:
      "https://source.unsplash.com/featured/?sciencefiction,books",
  },
  {
    UUID: "c0e048f6-d44b-492a-b03c-356df60c9d9b",
    categoryName: "Fantasy",
    categoryID: 1003003,
    categoryShortDescription:
      "Enter worlds of magic, mythical creatures, and epic quests.",
    unsplashImageURL: "https://source.unsplash.com/featured/?fantasy,books",
  },
  {
    UUID: "e3bcbdcf-7d57-4c1c-a879-8fb2d4d3f7e3",
    categoryName: "Mystery",
    categoryID: 1004004,
    categoryShortDescription:
      "Unravel thrilling mysteries and solve perplexing cases.",
    unsplashImageURL: "https://source.unsplash.com/featured/?mystery,books",
  },
  {
    UUID: "f5ecceaf-63a6-475b-b5ff-cb059ba9c6ae",
    categoryName: "Thriller",
    categoryID: 1005005,
    categoryShortDescription:
      "Experience heart-pounding suspense and intense action.",
    unsplashImageURL: "https://source.unsplash.com/featured/?thriller,books",
  },
  {
    UUID: "f7a5c122-9387-4eac-b8e7-76f03dd7b5cb",
    categoryName: "Horror",
    categoryID: 1006006,
    categoryShortDescription:
      "Face your fears with chilling tales of horror and suspense.",
    unsplashImageURL: "https://source.unsplash.com/featured/?horror,books",
  },
  {
    UUID: "ebaf926b-5a80-45b5-a727-0cc98bcf406a",
    categoryName: "Romance",
    categoryID: 1007007,
    categoryShortDescription:
      "Indulge in love stories that warm the heart and stir the soul.",
    unsplashImageURL: "https://source.unsplash.com/featured/?romance,books",
  },
  {
    UUID: "ca6a3a1a-cdf4-4964-8133-b04276a7d1a9",
    categoryName: "Historical Fiction",
    categoryID: 1008008,
    categoryShortDescription:
      "Journey through the past with gripping tales set in historical eras.",
    unsplashImageURL:
      "https://source.unsplash.com/featured/?historicalfiction,books",
  },
  {
    UUID: "ca6a3a1a-cdf4-4964-8133-b04276a7d1a9",
    categoryName: "Biography/Autobiography",
    categoryID: 1008009,
    categoryShortDescription:
      "Discover the remarkable lives and experiences of real people.",
    unsplashImageURL: "https://source.unsplash.com/featured/?biography,books",
  },
  // Add more categories as needed
];

export default function Book({ book }) {
  const router = useRouter();
  const { slug } = router.query;
  const [category, setCategory] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (isDataLoaded) {
      if (slug) {
        getCategoryBySlug();
      } else {
        getCategory();
      }
    }
  }, [currentPage]);

  const getCategory = () => {
    categoryService
      .getCategoryByPagination(currentPage, limit)
      .then((res) => {
        setCategory(res.data);
        setTotalPages(res.totalPages);
        setIsDataLoaded(false);
      })
      .catch((errorMessage) => {
        setIsDataLoaded(false);
        console.log(errorMessage, "errorMessage");
      });
  };

  const getCategoryBySlug = () => {
    categoryService
      .getCategoryBySlug(slug, currentPage, limit)
      .then((res) => {
        setCategory(res);
        setIsDataLoaded(false);
      })
      .catch((errorMessage) => {
        console.log(errorMessage, "errorMessage");
        setIsDataLoaded(false);
      });
  };

  const handleScrollToCategoryDivider = () => {
    const categoryDivider = document.getElementById("category-divider");
    if (categoryDivider) {
      categoryDivider.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRedirect = (slug) => {
    router.push(`/book/${slug}`);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setIsDataLoaded(true);
      setCurrentPage((prevPage) => prevPage + 1);
      handleScrollToCategoryDivider()
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setIsDataLoaded(true);
      setCurrentPage((prevPage) => prevPage - 1);
      handleScrollToCategoryDivider()
    }
  };

  return (
    <>
      <div className="relative bg-white py-16 ">
        <div className="absolute inset-0 bg-black-700 opacity-50"></div>
        <div className="container mx-auto px-10 relative z-10">
          <div className="relative bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform scale-105 shadow-lg">
            <Image
              src="/Images/category-1.jpg"
              // src="https://source.unsplash.com/featured/?bookshelf"
              width={1000}
              height={250}
              alt="Category Name"
              className="w-full h-64 object-cover opacity-80"
            />
            <div className="absolute z-10 inset-0 flex text-center items-center justify-center">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Explore Our Book Worlds
                </h1>
                <p className="text-lg text-gray-300 mb-8">
                  Discover a diverse collection of genres, from timeless
                  classics to thrilling mysteries and everything in between.
                </p>
              </div>
            </div>
          </div>

          <hr id="category-divider" className="border-gray-700 border-2 my-8" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category?.length > 0 && category.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4"
                  onClick={() => handleRedirect(item.slug)}
                >
                  <div className="mb-4 relative rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-lg">
                    <Image
                      src={item.image}
                      width={500}
                      height={256}
                      alt="Book Title"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  {/* Book Title */}
                  <h2 className="text-lg font-semibold mb-2">{item.name}</h2>

                  {/* Description (optional) */}
                  <p className="text-sm text-gray-700 mb-4">
                    {item.description}
                  </p>

                  {/* Repeat the above card structure for each book */}
                </div>
              );
            })}
          </div>

          {!isDataLoaded && category?.length > 0 && <div className="flex justify-center items-center mt-8">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`flex justify-center items-center px-4 py-2 mr-2 ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'
                } rounded`}
            >
              <ChevronLeftIcon className="w-5 h-5 mr-1" /> Previous
            </button>
            ({currentPage})
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex justify-center items-center px-4 py-2 ml-2 ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'
                } rounded`}
            >
              Next <ChevronRightIcon className="w-5 h-5 ml-1" />
            </button>
          </div>}

          <>
            {isDataLoaded && (
              <div className="my-16 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
                <span className="ml-4">Loading...</span>
              </div>
            )}

            {!isDataLoaded && category?.length == 0 && (
              <div className="w-full flex justify-center">
                <div className="bg-gray-100 rounded-lg shadow-lg p-8 transform hover:scale-105 transition duration-300">
                  <h2 className="text-3xl font-bold text-gray-800">Category not found</h2>
                  <p className="mt-4 text-lg text-gray-600">
                    {`We couldn't find the category you're looking for. Please try again later.`}
                  </p>
                </div>
              </div>
            )}
          </>

        </div>
      </div>
    </>
  );
}
