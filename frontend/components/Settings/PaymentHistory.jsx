import React from "react";
import Table from "./Table"; // Assuming Table component is in the same directory

const PaymentHistoryPage = () => {
  // Dummy payment history data
  const paymentHistory = [
    {
      id: 1,
      date: "2022-03-25",
      amount: 50,
      bookTitle: "Book 1",
      category: "Fiction",
    },
    {
      id: 2,
      date: "2022-03-18",
      amount: 30,
      bookTitle: "Book 2",
      category: "Non-fiction",
    },
    {
      id: 3,
      date: "2022-03-10",
      amount: 25,
      bookTitle: "Book 3",
      category: "Mystery",
    },
  ];

  const handleDownload = (bookId) => {
    // Handle download logic
    console.log("Downloading book with ID:", bookId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>
      <Table data={paymentHistory} />
    </div>
  );
};

export default PaymentHistoryPage;
