import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineHistory } from "react-icons/md";
import { Link } from "react-router-dom";

const OrderHistory = ({ historyData }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Format date to match the schema's date format (YYYY-MM-DD)
  const formatDate = (date) => date?.toISOString().split("T")[0];

  // Filter history based on the selected date
  const filteredHistory = selectedDate
    ? historyData.filter((order) => order.date === formatDate(selectedDate))
    : historyData;

  return (
    <div className="flex w-full bg-[#141517] text-gray-200">
      <div className="flex flex-col w-3/4 h-screen overflow-y-scroll p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-gray-100">Order History</h1>
        {filteredHistory.length > 0 ? (
          filteredHistory.map((order) => (
            <div
              key={order._id}
              className="bg-[#1e1f24] shadow-lg rounded-lg p-6 border border-gray-700"
            >
              <h3 className="text-lg font-medium text-gray-100 mb-4">
                <span className="font-bold">Order ID:</span> {order._id} |{" "}
                <span className="font-bold">Date:</span> {order.date} |{" "}
                <span className="font-bold">Time:</span> {order.time}
              </h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b-2 border-gray-600 p-2 text-sm text-gray-400">
                      Product Name
                    </th>
                    <th className="border-b-2 border-gray-600 p-2 text-sm text-gray-400">
                      Brand
                    </th>
                    <th className="border-b-2 border-gray-600 p-2 text-sm text-gray-400">
                      Product Count
                    </th>
                    <th className="border-b-2 border-gray-600 p-2 text-sm text-gray-400">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-700">
                      <td className="border-b border-gray-700 p-2 text-gray-300">
                        {product.product_name}
                      </td>
                      <td className="border-b border-gray-700 p-2 text-gray-300">
                        {product.brand}
                      </td>
                      <td className="border-b border-gray-700 p-2 text-gray-300">
                        {product.product_count}
                      </td>
                      <td className="border-b border-gray-700 p-2 text-gray-300">
                        {product.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 bg-[#1e1f24] shadow-md rounded-lg p-6">
            No history available for the selected day.
          </div>
        )}
      </div>
      <div className="flex flex-col items-center w-1/4 h-screen bg-[#1e1f24] p-6 shadow-inner">



       <div className="flex flex-col space-y-6 px-4 mb-10" >
               <Link
                 to="/history/products"
                 className="flex items-center px-2 py-2 w-full bg-white  rounded-lg"
               >
                 < MdOutlineHistory className="text-2xl text-[#141517]" />
                 <span className="pl-2 text-[#141517] font-bold">Products History</span>
               </Link>
               <Link to="/history/fruits" className="flex items-center px-2 py-2 w-full bg-[#373942]  rounded-lg">
                 < MdOutlineHistory className="text-2xl" />
                 <span className="pl-2">Fruits History</span>
               </Link>
               
             </div>





        <h2 className="text-xl font-semibold text-gray-100 mb-4">
          Select a Date
        </h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Choose a date"
          className="w-full text-gray-300 bg-gray-900 border border-gray-700 rounded-md shadow-sm p-2"
        />
      </div>
    </div>
  );
};

export default OrderHistory;
