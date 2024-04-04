import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { userService } from "@/services/user.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserProfileEditPage from "@/components/UserProfileEditPage";
import { HeartIcon, StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import AddBookForm from "@/components/AddBookForm";
import ReactStars from "react-rating-stars-component";
import Image from "next/image";

// Define validation schema using Yup
export const userProfileValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  dob: Yup.string().required("Date of birth is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string().required("Phone number is required"),
  about: Yup.string().required("About is required"),
});

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

const bookRating = {
  size: 30,
  edit: false
};

const UserProfilePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [userProfile, setUserProfile] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const fileInputRef = useRef(null);
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors } = {}, // Use optional chaining here
    isDirty,
    isSubmitting,
    touchedFields,
    submitCount,
  } = useFormik({
    initialValues: {
      firstName: userProfile?.firstName || "",
      lastName: userProfile?.lastName || "",
      email: userProfile?.email || "",
      city: userProfile?.city || "",
      state: userProfile?.state || "",
      country: userProfile?.country || "",
      dob: userProfile?.dob || "",
      address: userProfile?.address || "",
      phone: userProfile?.phone || "",
      about: userProfile?.about || "",
    },
    validationSchema: userProfileValidationSchema,
    onSubmit: async (values) => {
      try {
        await userService.updateUserProfile(slug, values);
        getUserProfileData();
        setIsEdit(false);
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    },
  });

  useEffect(() => {
    getUserProfileData();
  }, [slug]);

  const handleCancelEdit = () => {
    setIsEdit(false);
    // Reset the form values
  };

  const getUserProfileData = async () => {
    await userService
      .GetUserProfile(slug)
      .then((res) => {
        setUserProfile(res.data);
      })
      .catch((errorMessage) => { });
  };

  const handleUploadImage = async (image, coverImage) => {
    let profileImage = await userService.UpdateUserProfile(
      userProfile.id,
      image,
      coverImage
    );
    getUserProfileData();
    console.log(profileImage, "profileImage");
  };

  const handleImageUpload = (e, coverImage) => {
    const file = e.target.files[0];
    handleUploadImage(file, coverImage);
  };

  const handleEdit = (e) => {
    setIsEdit(true);
  };

  const handleAddBookClick = () => {
    setShowAddBookModal(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Cover Image */}
          <div className="relative">
            {/* Cover Image */}
            <Image
              src={
                userProfile?.coverImage?.secure_url ||
                "https://source.unsplash.com/featured/800x200/?user,cover"
              }
              alt="Cover"
              className="w-full h-96"
            />
            {/* Edit icon for Cover Image */}
            {isEdit && (
              <>
                <div
                  className="absolute bottom-0 right-0 flex items-center justify-center cursor-pointer bg-white rounded-full p-1 mr-8 mb-8"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Image
                    src="/Images/camera.png"
                    accept="image/*"
                    alt="camera"
                    className="bg-black bg-opacity-60 rounded-lg w-5"
                  />
                  {/* Hidden file input */}
                  <input
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, true)}
                  />
                </div>
              </>
            )}

            {/* Profile Image */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8">
              <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-md">
                <Image
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
                    <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                      <Image
                        src="/Images/camera.png"
                        accept="image/*"
                        alt="camera"
                        className="bg-black bg-opacity-60 rounded-lg w-5"
                        onClick={() => fileInputRef.current.click()}
                      />
                      {/* Hidden file input */}
                      <input
                        type="file"
                        name="image"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, false)}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* User Data */}
          <div className="p-6 bg-gray-100 rounded-lg">
            {!isEdit && (
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
            )}

            {isEdit ? (
              <UserProfileEditPage
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                userProfile={userProfile}
              />
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-10">
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
                  <p className="text-gray-800 font-semibold">
                    {userProfile?.dob}
                  </p>
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
            )}
          </div>

          {/* User's Books */}
          <div className="p-6 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Your books</h2>
              <button
                onClick={handleAddBookClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add New Book
              </button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userProfile?.books.map((book) => (
                <div
                  key={book.id}
                  className="border border-gray-200 rounded-md overflow-hidden"
                >
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                    <p className="text-gray-600 mb-2">Author: {book.author}</p>
                    <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
                    <p className="text-gray-600 mb-2">Price: ${book.price}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <HeartIcon className="h-5 w-5 text-blue-500 mr-1" />
                        <span className="text-gray-600">{book.likes ? book.likes : 0}</span>
                      </div>
                      <ReactStars {...bookRating} value={book.rating} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Modal for adding a new book */}
            {showAddBookModal && (
              <>
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  {/* Background overlay */}
                  {/* Modal content */}
                  <div className="bg-white rounded-lg p-8 max-h-[calc(100vh-6rem)] overflow-y-auto mt-12 mb-12">
                    <AddBookForm setShowAddBookModal={setShowAddBookModal} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

UserProfilePage.auth = true;

export default UserProfilePage;
