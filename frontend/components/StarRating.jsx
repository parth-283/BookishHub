import { useState } from "react";

const StarRating = ({ rating }) => {
  const [stars, setStars] = useState(rating);

  const handleMouseOver = (index) => {
    setStars(index + 1);
  };

  const handleMouseOut = () => {
    setStars(rating);
  };

  const handleClick = (index) => {
    // Handle click event (e.g., submit user's rating)
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          onMouseOver={() => handleMouseOver(index)}
          onMouseOut={handleMouseOut}
          onClick={() => handleClick(index)}
          className={`${
            index < stars ? "text-yellow-500" : "text-gray-300"
          } focus:outline-none`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 11l7-7 7 7M5 19l7-7 7 7"
            />
          </svg>
        </button>
      ))}
      <span className="ml-1">{stars} stars</span>
    </div>
  );
};

export default StarRating;
