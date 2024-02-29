import Link from "next/link";
const users = [
  {
    id: 1,
    name: "John Doe",
    username: "john_doe",
    email: "john@example.com",
    slug: "john-doe",
    coverImage: "/images/user1-cover.jpg",
    profileImage: "/images/user1-profile.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "jane_smith",
    email: "jane@example.com",
    slug: "jane-smith",
    coverImage: "/images/user2-cover.jpg",
    profileImage: "/images/user2-profile.jpg",
  },
  // Add more users as needed
];
const books = [
  {
    UUID: "1",
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

const UserProfilePage = ({ user, userBooks }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Cover Image */}
        <div className="relative">
          <img src={user.coverImage} alt="Cover" className="w-full h-auto" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8">
            <img
              src={user.profileImage}
              alt="User"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md"
            />
          </div>
        </div>

        {/* User Data */}
        <div className="p-6">
          <h1 className="text-3xl font-semibold mb-4">{user.name}</h1>
          <p className="text-gray-600 mb-2">Username: {user.username}</p>
          <p className="text-gray-600 mb-2">Email: {user.email}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center py-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">
            Save Changes
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Delete
          </button>
        </div>

        {/* User's Books */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Books</h2>
          {userBooks.map((book) => (
            <div
              key={book.id}
              className="border border-gray-200 rounded-md p-4 mb-4"
            >
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-600 mb-2">Author: {book.author}</p>
              <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
              <p className="text-gray-600 mb-2">Price: ${book.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// In getStaticPaths
export async function getStaticPaths() {
  const paths = users.map((user) => ({
    params: { slug: user.slug },
  }));

  return { paths, fallback: false };
}

// In getStaticProps
export async function getStaticProps({ params }) {
  const user = users.find((u) => u.slug === params.slug); // Change params.username to params.slug
  const userBooks = books.filter((book) => book.author === user.name);
  return { props: { user, userBooks } };
}

export default UserProfilePage;
