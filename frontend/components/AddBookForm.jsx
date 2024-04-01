import { categoryService } from "@/services/category.service";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";

const AddBookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    if (!isDataLoaded) {
      getCategoryList();
    }
  }, [isDataLoaded]);

  const getCategoryList = async () => {
    await categoryService.categoryList().then((res) => {
      setCategoryList(res);
      setIsDataLoaded(true);
    });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Your form submission logic here
    } catch (error) {
      setError("Failed to add book");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold mb-6">Add New Book</h1>
          <button
            onClick={() => props.setShowAddBookModal(false)}
            className=" m-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-2"
          >
            {/* Close icon */}
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          <div>
            {/* Title */}
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                {...register("title", { required: "Title is required" })}
                placeholder="Enter title"
                className="mt-1 p-2 border border-gray-300 rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
              />
              {errors?.title && (
                <p className="text-red-500 mt-1">{errors.title.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="author" className="text-gray-600">
                Author
              </label>
              <input
                type="text"
                name="author"
                {...register("author", { required: "Author is required" })}
                placeholder="Enter author"
                className="mt-1 p-2 border border-gray-300 rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
              />
              {errors?.author && (
                <p className="text-red-500 mt-1">{errors.author.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="genre" className="text-gray-600">
                Genre
              </label>
              <select
                name="genre"
                {...register("genre", { required: "Genre is required" })}
                className="mt-1 p-2 border border-gray-300 rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Genre</option>
                {categoryList.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors?.genre && (
                <p className="text-red-500 mt-1">{errors.genre.message}</p>
              )}
            </div>
            {/* Add more input fields for other book details */}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Adding Book..." : "Add Book"}
          </button>
        </Form>
      </div>
    </>
  );
};

export default AddBookForm;
