import React, { useState } from "react";

const Table = ({ data }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedField, setSortedField] = useState(null);
  const [sortedData, setSortedData] = useState(data);

  const handleSort = (field) => {
    const newSortOrder =
      sortedField === field ? (sortOrder === "asc" ? "desc" : "asc") : "asc";
    setSortOrder(newSortOrder);
    setSortedField(field);

    const sorted = [...sortedData].sort((a, b) => {
      if (field === "id") {
        return newSortOrder === "asc" ? a.id - b.id : b.id - a.id;
      } else if (field === "date") {
        return newSortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (field === "amount") {
        return newSortOrder === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      } else if (field === "bookTitle" || field === "category") {
        return newSortOrder === "asc"
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      }
    });

    setSortedData(sorted);
  };

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th
            className="px-4 py-2 cursor-pointer w-32"
            onClick={() => handleSort("id")}
          >
            ID {sortedField === "id" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th
            className="px-4 py-2 cursor-pointer w-40"
            onClick={() => handleSort("date")}
          >
            Date {sortedField === "date" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th
            className="px-4 py-2 cursor-pointer w-40"
            onClick={() => handleSort("amount")}
          >
            Amount{" "}
            {sortedField === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th
            className="px-4 py-2 cursor-pointer w-96"
            onClick={() => handleSort("bookTitle")}
          >
            Book Title{" "}
            {sortedField === "bookTitle" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th
            className="px-4 py-2 cursor-pointer w-40"
            onClick={() => handleSort("category")}
          >
            Category{" "}
            {sortedField === "category" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th className="px-4 py-2">Invoice</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-2">{item.id}</td>
            <td className="px-4 py-2">{item.date}</td>
            <td className="px-4 py-2">{item.amount}</td>
            <td className="px-4 py-2">{item.bookTitle}</td>
            <td className="px-4 py-2">{item.category}</td>
            <td className="px-4 py-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDownload(item.id)}
              >
                Download
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
