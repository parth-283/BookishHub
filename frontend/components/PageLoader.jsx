import React from "react";

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-800 rounded-full animate-spin"></div>
    </div>
  );
};

export default PageLoader;
