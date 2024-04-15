// components/PaymentSuccessPopup.js

const PaymentSuccessPopup = ({ onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-green-500 mb-4">Payment Successful</h2>
          <p className="text-gray-700 mb-4">Your payment was successful. Thank you for your purchase!</p>
          <button onClick={onClose} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Close</button>
        </div>
      </div>
    );
  };
  
  export default PaymentSuccessPopup;
  