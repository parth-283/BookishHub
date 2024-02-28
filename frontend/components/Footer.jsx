import React from "react";

function Footer() {
  return (
    <>
      <footer className="bg-gray-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* <!-- Footer Section 1 --> */}
            <div>
              <h2 className="text-xl font-bold mb-4">About Us</h2>
              <p className="text-sm">
                BookishHub is your ultimate destination for discovering and
                exploring a wide range of books from various genres.
              </p>
            </div>

            {/* <!-- Footer Section 2 --> */}
            <div>
              <h2 className="text-xl font-bold mb-4">Quick Links</h2>
              <ul className="list-none">
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-gray-400 transition duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-gray-400 transition duration-300"
                  >
                    Categories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-gray-400 transition duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-gray-400 transition duration-300"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Footer Section 3 --> */}
            <div>
              <h2 className="text-xl font-bold mb-4">Connect With Us</h2>
              <ul className="list-none">
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-gray-400 transition duration-300"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-gray-400 transition duration-300"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-gray-400 transition duration-300"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-gray-400 transition duration-300"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Footer Section 4 --> */}
            <div>
              <h2 className="text-xl font-bold mb-4">Subscribe</h2>
              <form className="flex">
                <input
                  type="email"
                  className="w-full py-2 px-3 rounded-l-md"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600 transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <hr className="border-gray-700 my-8" />
          <p className="text-sm text-center">
            &copy; 2024 BookishHub. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
