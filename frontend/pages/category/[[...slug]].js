import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useRouter } from "next/router";
import Link from "next/link";

const product = [
  {
    UUID: "9f90b5b4-487e-4e9e-b679-36a45a1d5cc7",
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
  // const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  // const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

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
            {product.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4"
                  onClick={() => handleRedirect(item.categoryName)}
                >
                  <div className="mb-4 relative rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-lg">
                    <img
                      src={item.unsplashImageURL}
                      alt="Book Title"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  {/* Book Title */}
                  <h2 className="text-lg font-semibold mb-2">
                    {item.categoryName}
                  </h2>

                  {/* Description (optional) */}
                  <p className="text-sm text-gray-700 mb-4">
                    {item.categoryShortDescription}
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

// <div classNameName="bg-white">
//   <div classNameName="pt-6">
//     <nav aria-label="Breadcrumb">
//       <ol
//         role="list"
//         classNameName="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
//       >
//         {product.breadcrumbs.map((breadcrumb) => (
//           <li key={breadcrumb.id}>
//             <div classNameName="flex items-center">
//               <a
//                 href={breadcrumb.href}
//                 classNameName="mr-2 text-sm font-medium text-gray-900"
//               >
//                 {breadcrumb.name}
//               </a>
//               <svg
//                 width={16}
//                 height={20}
//                 viewBox="0 0 16 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//                 classNameName="h-5 w-4 text-gray-300"
//               >
//                 <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
//               </svg>
//             </div>
//           </li>
//         ))}
//         <li classNameName="text-sm">
//           <a
//             href={product.href}
//             aria-current="page"
//             classNameName="font-medium text-gray-500 hover:text-gray-600"
//           >
//             {product.name}
//           </a>
//         </li>
//       </ol>
//     </nav>

//     {/* Image gallery */}
//     <div classNameName="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
//       <div classNameName="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
//         <img
//           src={product.images[0].src}
//           alt={product.images[0].alt}
//           classNameName="h-full w-full object-cover object-center"
//         />
//       </div>
//       <div classNameName="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
//         <div classNameName="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
//           <img
//             src={product.images[1].src}
//             alt={product.images[1].alt}
//             classNameName="h-full w-full object-cover object-center"
//           />
//         </div>
//         <div classNameName="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
//           <img
//             src={product.images[2].src}
//             alt={product.images[2].alt}
//             classNameName="h-full w-full object-cover object-center"
//           />
//         </div>
//       </div>
//       <div classNameName="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
//         <img
//           src={product.images[3].src}
//           alt={product.images[3].alt}
//           classNameName="h-full w-full object-cover object-center"
//         />
//       </div>
//     </div>

//     {/* Product info */}
//     <div classNameName="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
//       <div classNameName="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
//         <h1 classNameName="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
//           {product.name}
//         </h1>
//       </div>

//       {/* Options */}
//       <div classNameName="mt-4 lg:row-span-3 lg:mt-0">
//         <h2 classNameName="sr-only">Product information</h2>
//         <p classNameName="text-3xl tracking-tight text-gray-900">
//           {product.price}
//         </p>

//         {/* Reviews */}
//         <div classNameName="mt-6">
//           <h3 classNameName="sr-only">Reviews</h3>
//           <div classNameName="flex items-center">
//             <div classNameName="flex items-center">
//               {[0, 1, 2, 3, 4].map((rating) => (
//                 <StarIcon
//                   key={rating}
//                   classNameName={classNameNames(
//                     reviews.average > rating
//                       ? "text-gray-900"
//                       : "text-gray-200",
//                     "h-5 w-5 flex-shrink-0"
//                   )}
//                   aria-hidden="true"
//                 />
//               ))}
//             </div>
//             <p classNameName="sr-only">{reviews.average} out of 5 stars</p>
//             <a
//               href={reviews.href}
//               classNameName="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
//             >
//               {reviews.totalCount} reviews
//             </a>
//           </div>
//         </div>

//         <form classNameName="mt-10">
//           {/* Colors */}
//           <div>
//             <h3 classNameName="text-sm font-medium text-gray-900">Color</h3>

//             <RadioGroup
//               value={selectedColor}
//               onChange={setSelectedColor}
//               classNameName="mt-4"
//             >
//               <RadioGroup.Label classNameName="sr-only">
//                 Choose a color
//               </RadioGroup.Label>
//               <div classNameName="flex items-center space-x-3">
//                 {product.colors.map((color) => (
//                   <RadioGroup.Option
//                     key={color.name}
//                     value={color}
//                     classNameName={({ active, checked }) =>
//                       classNameNames(
//                         color.selectedClassName,
//                         active && checked ? "ring ring-offset-1" : "",
//                         !active && checked ? "ring-2" : "",
//                         "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
//                       )
//                     }
//                   >
//                     <RadioGroup.Label as="span" classNameName="sr-only">
//                       {color.name}
//                     </RadioGroup.Label>
//                     <span
//                       aria-hidden="true"
//                       classNameName={classNameNames(
//                         color.className,
//                         "h-8 w-8 rounded-full border border-black border-opacity-10"
//                       )}
//                     />
//                   </RadioGroup.Option>
//                 ))}
//               </div>
//             </RadioGroup>
//           </div>

//           {/* Sizes */}
//           <div classNameName="mt-10">
//             <div classNameName="flex items-center justify-between">
//               <h3 classNameName="text-sm font-medium text-gray-900">Size</h3>
//               <a
//                 href="#"
//                 classNameName="text-sm font-medium text-indigo-600 hover:text-indigo-500"
//               >
//                 Size guide
//               </a>
//             </div>

//             <RadioGroup
//               value={selectedSize}
//               onChange={setSelectedSize}
//               classNameName="mt-4"
//             >
//               <RadioGroup.Label classNameName="sr-only">
//                 Choose a size
//               </RadioGroup.Label>
//               <div classNameName="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
//                 {product.sizes.map((size) => (
//                   <RadioGroup.Option
//                     key={size.name}
//                     value={size}
//                     disabled={!size.inStock}
//                     classNameName={({ active }) =>
//                       classNameNames(
//                         size.inStock
//                           ? "cursor-pointer bg-white text-gray-900 shadow-sm"
//                           : "cursor-not-allowed bg-gray-50 text-gray-200",
//                         active ? "ring-2 ring-indigo-500" : "",
//                         "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
//                       )
//                     }
//                   >
//                     {({ active, checked }) => (
//                       <>
//                         <RadioGroup.Label as="span">
//                           {size.name}
//                         </RadioGroup.Label>
//                         {size.inStock ? (
//                           <span
//                             classNameName={classNameNames(
//                               active ? "border" : "border-2",
//                               checked
//                                 ? "border-indigo-500"
//                                 : "border-transparent",
//                               "pointer-events-none absolute -inset-px rounded-md"
//                             )}
//                             aria-hidden="true"
//                           />
//                         ) : (
//                           <span
//                             aria-hidden="true"
//                             classNameName="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
//                           >
//                             <svg
//                               classNameName="absolute inset-0 h-full w-full stroke-2 text-gray-200"
//                               viewBox="0 0 100 100"
//                               preserveAspectRatio="none"
//                               stroke="currentColor"
//                             >
//                               <line
//                                 x1={0}
//                                 y1={100}
//                                 x2={100}
//                                 y2={0}
//                                 vectorEffect="non-scaling-stroke"
//                               />
//                             </svg>
//                           </span>
//                         )}
//                       </>
//                     )}
//                   </RadioGroup.Option>
//                 ))}
//               </div>
//             </RadioGroup>
//           </div>

//           <button
//             type="submit"
//             classNameName="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             Add to bag
//           </button>
//         </form>
//       </div>

//       <div classNameName="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
//         {/* Description and details */}
//         <div>
//           <h3 classNameName="sr-only">Description</h3>

//           <div classNameName="space-y-6">
//             <p classNameName="text-base text-gray-900">
//               {product.description}
//             </p>
//           </div>
//         </div>

//         <div classNameName="mt-10">
//           <h3 classNameName="text-sm font-medium text-gray-900">
//             Highlights
//           </h3>

//           <div classNameName="mt-4">
//             <ul role="list" classNameName="list-disc space-y-2 pl-4 text-sm">
//               {product.highlights.map((highlight) => (
//                 <li key={highlight} classNameName="text-gray-400">
//                   <span classNameName="text-gray-600">{highlight}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div classNameName="mt-10">
//           <h2 classNameName="text-sm font-medium text-gray-900">Details</h2>

//           <div classNameName="mt-4 space-y-6">
//             <p classNameName="text-sm text-gray-600">{product.details}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// This function gets called at build time
// export async function getStaticPaths() {
//   // Fetch all book slugs from your data source
//   // const paths = await getAllBookSlugs();

//   // Map the slugs to the params object required by Next.js
//   const dynamicPaths = [].map((slug) => ({
//     params: { slug },
//   }));

//   return {
//     paths: dynamicPaths,
//     fallback: true, // Set fallback to true to enable incremental static regeneration
//   };
// }

// This function gets called at build time
// It fetches the book data based on the slug
// export async function getStaticProps({ params }) {
//   // const book = await getBookBySlug(params.slug); // Fetch book data based on the slug
//   return {
//     props: {
//       [],
//     },
//   };
// }
