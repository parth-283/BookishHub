import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { categoryService } from "@/services/category.service";

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
  const [category, setCategory] = useState([]);
  const [isDataLoadded, setIsDataLoadded] = useState(true);

  useEffect(() => {
    if (isDataLoadded) {
      getCategory();
    }
  }, []);

  const getCategory = () => {
    categoryService
      .getCategory()
      .then((res) => {
        setCategory(res);
        setIsDataLoadded(false);
      })
      .catch((errorMessage) => {
        console.log(errorMessage, "errorMessage");s
      });
  };

  const handleRedirect = (slug) => {
    router.push(`/book/${slug}`);
  };

  return (
    <>
      <div className="relative bg-white py-16 ">
        <div className="absolute inset-0 bg-black-700 opacity-50"></div>
        <div className="container mx-auto px-10 relative z-10">
          <div className="relative bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform scale-105 shadow-lg">
            <img
              src="/Images/category-1.jpg"
              // src="https://source.unsplash.com/featured/?bookshelf"
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

          <hr className="border-gray-700 border-2 my-8" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4"
                  onClick={() => handleRedirect(item.slug)}
                >
                  <div className="mb-4 relative rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-lg">
                    <img
                      src={item.image}
                      alt="Book Title"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  {/* Book Title */}
                  <h2 className="text-lg font-semibold mb-2">
                    {item.name}
                  </h2>

                  {/* Description (optional) */}
                  <p className="text-sm text-gray-700 mb-4">
                    {item.description}
                  </p>

                  {/* Repeat the above card structure for each book */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
