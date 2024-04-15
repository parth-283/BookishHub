import { useState } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

const AddToCartModal = ({ isOpen, closeModal }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    // Perform add to cart logic here
    setIsAdded(true);
  };

  return (
    <Transition
      show={isOpen}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[30rem]">
          <div className="flex items-center justify-center mb-4">
            {isAdded ? (
              <CheckCircleIcon className="h-12 w-12 text-green-500" />
            ) : (
              <ShoppingCartIcon className="h-12 w-12 text-gray-500" />
            )}
          </div>
          <p className="text-lg text-center mb-4">
            {isAdded
              ? "Added to Cart!"
              : "Are you sure you want to add this item to your cart?"}
          </p>
          {!isAdded ? (
            <div className="flex justify-center">
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
              >
                Add to Cart
              </button>
              <button
                onClick={closeModal}
                className="text-blue-500 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                close
              </button>
            </div>
          )}
        </div>
      </div>
    </Transition>
  );
};

export default AddToCartModal;
