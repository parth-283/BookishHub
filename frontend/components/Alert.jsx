import React from 'react';

const Alert = ({ type, message, onClose }) => {
  let bgColor = '';
  let icon = '';
  switch (type) {
    case 'error':
      bgColor = 'bg-red-100';
      icon = '❌';
      break;
    case 'success':
      bgColor = 'bg-green-100';
      icon = '✅';
      break;
    case 'warning':
      bgColor = 'bg-yellow-100';
      icon = '⚠️';
      break;
    case 'info':
      bgColor = 'bg-cyan-100';
      icon = 'ℹ️';
      break;
    default:
      break;
  }

  return (
    <div className={`flex items-center justify-between px-4 py-2 mb-4 border-l-4 ${bgColor} border-${type}-500`}>
      <div className="flex items-center">
        <span className="mr-2">{icon}</span>
        <p className={`text-${type}-800`}>{message}</p>
      </div>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 19a9 9 0 100-18 9 9 0 000 18zm-1.414-8.586a1 1 0 011.414-1.414L10 8.586l1.414-1.414a1 1 0 111.414 1.414L11.414 10l1.414 1.414a1 1 0 11-1.414 1.414L10 11.414l-1.414 1.414a1 1 0 01-1.414-1.414L8.586 10 7.172 8.586a1 1 0 111.414-1.414L10 8.586z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Alert;
