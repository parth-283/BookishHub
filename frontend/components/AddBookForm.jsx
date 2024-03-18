import { categoryService } from "@/services/category.service";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddBookForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    if (isDataLoaded) {
      getCategoryList();
    }
  }, []);

  const getCategoryList = () => {
    categoryService.categoryList().then((res) => {
      setCategoryList(res);
      setIsDataLoaded(true);
    });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      booksService
        .addBook(data)
        .then((res) => {
          setSuccess(true);
          setError(null);
        })
        .catch(async (error) => {
          setError(error.message || "Failed to add book");
        });
    } catch (error) {
      setError("Failed to add book");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
  };

  return (
    <>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-semibold mb-6">Add New Book</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
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
              placeholder="Title"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
            />
            {errors?.title && (
              <p className="text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Author */}
          <div className="mb-6">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Author
            </label>
            <input
              type="text"
              name="author"
              {...register("author", { required: "Author is required" })}
              placeholder="Author"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
            />
            {errors?.author && (
              <p className="text-red-500 mt-1">{errors.author.message}</p>
            )}
          </div>

          {/* Genre */}
          <div className="mb-6">
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Genre
            </label>
            <select
              name="genre"
              {...register("genre", { required: "Genre is required" })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Genre</option>
              {categoryList.map((item) => {
               return( <option value={item.id}>{item.name}</option>)
              })}
              {/* Add options for different genres */}
            </select>
            {errors?.genre && (
              <p className="text-red-500 mt-1">{errors.genre.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              name="description"
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Description"
              rows={4}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
            />
            {errors?.description && (
              <p className="text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Publication Date */}
          <div className="mb-6">
            <label
              htmlFor="publicationDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Publication Date
            </label>
            <input
              type="date"
              name="publicationDate"
              {...register("publicationDate", {
                required: "Publication Date is required",
              })}
              placeholder="Publication Date"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
            />
            {errors?.publicationDate && (
              <p className="text-red-500 mt-1">
                {errors.publicationDate.message}
              </p>
            )}
          </div>

          {/* ISBN */}
          <div className="mb-6">
            <label
              htmlFor="isbn"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ISBN
            </label>
            <input
              type="text"
              name="isbn"
              {...register("isbn", { required: "ISBN is required" })}
              placeholder="ISBN"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
            />
            {errors?.isbn && (
              <p className="text-red-500 mt-1">{errors.isbn.message}</p>
            )}
          </div>

          {/* Publisher */}
          <div className="mb-6">
            <label
              htmlFor="publisher"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Publisher
            </label>
            <input
              type="text"
              name="publisher"
              {...register("publisher", { required: "Publisher is required" })}
              placeholder="Publisher"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
            />
            {errors?.publisher && (
              <p className="text-red-500 mt-1">{errors.publisher.message}</p>
            )}
          </div>

          {/* Total Pages */}
          <div className="mb-6">
            <label
              htmlFor="totalPages"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Total Pages
            </label>
            <input
              type="number"
              name="totalPages"
              {...register("totalPages", {
                required: "Total Pages is required",
              })}
              placeholder="Total Pages"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
            />
            {errors?.totalPages && (
              <p className="text-red-500 mt-1">{errors.totalPages.message}</p>
            )}
          </div>

          {/* Format */}
          <div className="mb-6">
            <label
              htmlFor="format"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Format
            </label>
            <input
              type="text"
              name="format"
              {...register("format", { required: "Format is required" })}
              placeholder="Format"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
            />
            {errors?.format && (
              <p className="text-red-500 mt-1">{errors.format.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              {...register("price", { required: "Price is required" })}
              placeholder="Price"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
            />
            {errors?.price && (
              <p className="text-red-500 mt-1">{errors.price.message}</p>
            )}
          </div>

          {/* Availability */}
          <div className="mb-6">
            <label
              htmlFor="availability"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Availability
            </label>
            <input
              type="text"
              name="availability"
              {...register("availability", {
                required: "Availability is required",
              })}
              placeholder="Availability"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
            />
            {errors?.availability && (
              <p className="text-red-500 mt-1">{errors.availability.message}</p>
            )}
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags
            </label>
            <input
              type="text"
              name="tags"
              {...register("tags", { required: "Tags are required" })}
              placeholder="Tags"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
            />
            {errors?.tags && (
              <p className="text-red-500 mt-1">{errors.tags.message}</p>
            )}
          </div>

          {/* References */}
          <div className="mb-6">
            <label
              htmlFor="references"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              References
            </label>
            <textarea
              name="references"
              {...register("references", {
                required: "References are required",
              })}
              placeholder="References"
              rows={4}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
            />
            {errors?.references && (
              <p className="text-red-500 mt-1">{errors.references.message}</p>
            )}
          </div>

          {/* Weight */}
          <div className="mb-6">
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Weight
            </label>
            <input
              type="number"
              name="weight"
              {...register("weight", { required: "Weight is required" })}
              placeholder="Weight"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
            />
            {errors?.weight && (
              <p className="text-red-500 mt-1">{errors.weight.message}</p>
            )}
          </div>

          {/* Edition Date */}
          <div className="mb-6">
            <label
              htmlFor="editionDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Edition Date
            </label>
            <input
              type="date"
              name="editionDate"
              {...register("editionDate", {
                required: "Edition Date is required",
              })}
              placeholder="Edition Date"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
            />
            {errors?.editionDate && (
              <p className="text-red-500 mt-1">{errors.editionDate.message}</p>
            )}
          </div>

          {/* Edition Language */}
          <div className="mb-6">
            <label
              htmlFor="editionLanguage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Edition Language
            </label>
            <input
              type="text"
              name="editionLanguage"
              {...register("editionLanguage", {
                required: "Edition Language is required",
              })}
              placeholder="Edition Language"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
            />
            {errors?.editionLanguage && (
              <p className="text-red-500 mt-1">
                {errors.editionLanguage.message}
              </p>
            )}
          </div>

          {/* Country */}
          <div className="mb-6">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Country
            </label>
            <input
              type="text"
              name="country"
              {...register("country", { required: "Country is required" })}
              placeholder="Country"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
            />
            {errors?.country && (
              <p className="text-red-500 mt-1">{errors.country.message}</p>
            )}
          </div>

          {/* Dimensions */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dimensions
            </label>
            <div className="grid grid-cols-3 gap-2">
              {/* Height */}
              <input
                type="text"
                name="dimensions.Height"
                {...register("dimensions.Height", {
                  required: "Height is required",
                })}
                placeholder="Height"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
              />
              {errors && errors["dimensions.Height"] && (
                <p className="text-red-500 mt-1">
                  {errors["dimensions.Height"].message}
                </p>
              )}
              {/* Width */}
              <input
                type="text"
                name="dimensions.Width"
                {...register("dimensions.Width", {
                  required: "Width is required",
                })}
                placeholder="Width"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
              />
              {errors && errors["dimensions.Width"] && (
                <p className="text-red-500 mt-1">
                  {errors["dimensions.Width"].message}
                </p>
              )}
              {/* Thickness */}
              <input
                type="text"
                name="dimensions.Thickness"
                {...register("dimensions.Thickness", {
                  required: "Thickness is required",
                })}
                placeholder="Thickness"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full transition duration-300 focus:outline-none focus:border-blue-500"
              />
              {errors && errors["dimensions.Thickness"] && (
                <p className="text-red-500 mt-1">
                  {errors["dimensions.Thickness"].message}
                </p>
              )}
            </div>
          </div>

          {/* Display error message if submission fails */}
          {error && <p className="text-red-500 col-span-2">{error}</p>}
          {/* Submit button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Adding Book..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBookForm;
