import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { userService } from "@/services/user.service";
import { useFormik } from "formik";
import * as Yup from "yup";

const users = [
  {
    id: 1,
    name: "John Doe",
    username: "john_doe",
    email: "john@example.com",
    slug: "john-doe",
    coverImage: "https://source.unsplash.com/featured/800x200/?user,cover",
    profileImage: "https://source.unsplash.com/featured/?user,profile",
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "jane_smith",
    email: "jane@example.com",
    slug: "parth-kathiriya",
    coverImage: "https://source.unsplash.com/featured/800x200/?user,cover",
    profileImage: "https://source.unsplash.com/featured/?user,profilepage",
  },
  // Add more users as needed
];

const books = [
  {
    id: "1",
    title: "Book Title 1",
    slug: "book-title-1",
    author: "John Doe",
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
  // Add more books as needed
];

const UserProfilePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [userProfile, setuserProfile] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      image: null,
    },
    validationSchema: Yup.object().shape({
      image: Yup.mixed().required("Please upload an image"),
    }),
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    getUserPrifleData();
  }, [slug]);

  const getUserPrifleData = async () => {
    await userService
      .GetUserProfile(slug)
      .then((res) => {
        setuserProfile(res.data);
      })
      .catch((errorMessage) => {});
  };

  const handleUploadImage = async (image, coverImage) => {
    let profileImage = await userService.UpdateUserProfile(
      userProfile.id,
      image,
      coverImage
    );
    getUserPrifleData()
    console.log(profileImage, "profileImage");
  };

  const handleImageUpload = (e, coverImage) => {
    const file = e.target.files[0];
    handleUploadImage(file, coverImage);
  };

  const handleEdit = (e) => {
    setIsEdit(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Cover Image */}
        <div className="relative">
          {/* Cover Image */}
          <img
            src={
              userProfile?.coverImage?.secure_url ||
              "https://source.unsplash.com/featured/800x200/?user,cover"
            }
            alt="Cover"
            className="w-full h-auto"
          />
          {/* Edit icon for Cover Image */}
          {isEdit && (
            <>
              <div
                className="absolute bottom-0 right-0 flex items-center justify-center cursor-pointer bg-white rounded-full p-1 mr-8 mb-8"
                onClick={() => fileInputRef.current.click()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 5a1 1 0 00-1-1h-3.586l-.707-.707A1 1 0 0012.586 3H7.414a1 1 0 00-.707.293L5.707 4.293 2.707 1.293A1 1 0 002 2v13a1 1 0 001 1h14a1 1 0 001-1V5zM6 16H4v-2h2v2zM4 4V2h4.586l1 1H15a1 1 0 011 1v9h-2V8a1 1 0 00-1-1h-1V5a1 1 0 00-1-1H7.414l-1-1H4v2H2v12h2v-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {/* Hidden file input */}
              <input
                type="file"
                name="image"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => handleImageUpload(e, true)}
              />
            </>
          )}

          {/* Profile Image */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8">
            <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-md">
              <img
                src={
                  userProfile?.profileImage?.secure_url ||
                  "https://source.unsplash.com/featured/800x200/?user,profileImage"
                }
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
              {/* Edit icon for Profile Image */}
              {isEdit && (
                <>
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 5a1 1 0 00-1-1h-3.586l-.707-.707A1 1 0 0012.586 3H7.414a1 1 0 00-.707.293L5.707 4.293 2.707 1.293A1 1 0 002 2v13a1 1 0 001 1h14a1 1 0 001-1V5zM6 16H4v-2h2v2zM4 4V2h4.586l1 1H15a1 1 0 011 1v9h-2V8a1 1 0 00-1-1h-1V5a1 1 0 00-1-1H7.414l-1-1H4v2H2v12h2v-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {/* Hidden file input */}
                  <input
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, false)}
                  />
                </>
              )}
            </div>
          </div>

          {/* Hidden file input for Cover Image */}
          {isEdit && (
            <input
              type="file"
              name="coverImage"
              className="hidden"
              onChange={(e) => handleCoverImageChange(e)} // Add your function to handle cover image change
            />
          )}
        </div>

        {/* User Data */}
        <div className="p-6 bg-gray-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="mr-4">
              <h1 className="text-3xl font-semibold mb-4">
                {userProfile?.firstName} {userProfile?.lastName}
              </h1>
              <p className="text-gray-800 font-semibold">
                {userProfile?.about}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Edit button */}
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
                onClick={(e) => handleEdit(e)}
              >
                Edit
              </button>
              {/* Delete button */}
              {/* <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300">
                Delete
              </button> */}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 mb-2">Email:</p>
              <p className="text-gray-800 font-semibold">
                {userProfile?.email}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Location:</p>
              <p className="text-gray-800 font-semibold">
                {userProfile?.city}, {userProfile?.state},{" "}
                {userProfile?.country}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Date of Birth:</p>
              <p className="text-gray-800 font-semibold">{userProfile?.dob}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Address:</p>
              <p className="text-gray-800 font-semibold">
                {userProfile?.address}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Phone:</p>
              <p className="text-gray-800 font-semibold">
                {userProfile?.phone}
              </p>
            </div>
            {/* <div>
              <p className="text-gray-600 mb-2">About:</p>
              <p className="text-gray-800 font-semibold">{userProfile?.about}</p>
            </div> */}
          </div>
        </div>

        {/* User's Books */}
        <div className="p-6 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Books</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {userProfile?.books.map((book) => (
              <div
                key={book.id}
                className="border border-gray-200 rounded-md overflow-hidden"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-2">Author: {book.author}</p>
                  <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
                  <p className="text-gray-600 mb-2">Price: ${book.price}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 0l2.07 6.284H20l-5.315 3.855 2.072 6.286L10 13.842l-6.757 4.583 2.073-6.286L0 6.284h7.93L10 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-600 mr-4">{book.rating}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 0c2.76 0 5 2.244 5 5s-2.24 5-5 5-5-2.244-5-5 2.24-5 5-5zm0 2a3 3 0 100 6 3 3 0 000-6zm0 7c1.302 0 2.37 1.041 2.37 2.317V13H12v-1.683C12 10.041 13.168 9 14.7 9c.828 0 1.473.257 1.9.696A1.784 1.784 0 0017 10.474C17 8.636 15.612 7 13.7 7 11.923 7 11.185 7.706 11 8.172 10.815 7.706 10.077 7 8.3 7c-1.912 0-3.3 1.636-3.3 3.474v1.843H5v2.317C5 14.041 6.168 15 7.7 15h4.6c1.532 0 2.7-.959 2.7-2.183v-2.317h-1.4V13H10v1h1v1H9v1h2.3c.828 0 1.5.624 1.5 1.317S12.128 18 11.3 18c-.328 0-.744-.06-1.2-.183-.98-.274-2.1-.883-2.6-1.317A2.284 2.284 0 015 14.317C5 13.624 5.672 13 6.5 13h.4V11.83H6.5c-.828 0-1.5-.585-1.5-1.317 0-.732.672-1.317 1.5-1.317.328 0 .744.06 1.2.183.98.274 2.1.883 2.6 1.317.636.534 1.8 1.317 3.2 1.317h2.2v-1H11v-1h2v-1h-2V11H13v-.317C13 10.041 11.832 9 10.3 9h-4.6C4.168 9 3 9.959 3 11.183v2.317H1v-2.317C1 9.041 2.24 7 4.5 7c1.424 0 2.41.972 2.8 1.548.403-.565 1.402-.688 1.402-.688zM14 15v1h-4v-1h4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-600">{book.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

export async function getStaticPaths() {
  const paths = users.map((user) => ({
    params: { slug: user.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const user = users.find((u) => u.slug === params.slug);
  const userBooks = books.filter((book) => book.author === user.name);
  return { props: { user, userBooks } };
}
