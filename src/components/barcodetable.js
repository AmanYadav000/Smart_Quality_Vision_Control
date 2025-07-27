import React from "react";

const BarcodeInfo = ({ image, data }) => {
  return (
    <div className="bg-[#1e1f24] text-white p-6 rounded-lg shadow-md flex space-x-4">
      {/* Left Image Section */}
      <div className="w-1/3">
        <img
          src={image}
          alt="Product"
          className="rounded-lg w-full h-auto object-cover"
          style={{ width: "300px", height: "300px" }}
        />
      </div>

      {/* Right Content Section */}
      <div className="w-2/3 flex flex-col space-y-6">
        {/* Barcodes Table */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Barcodes</h2>
          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-[#2f3038]">
                <th className="border border-gray-700 p-2">Type</th>
                <th className="border border-gray-700 p-2">Content</th>
                <th className="border border-gray-700 p-2">Location</th>
                <th className="border border-gray-700 p-2">Quality</th>
              </tr>
            </thead>
            <tbody>
              {data.barcodes.map((barcode, index) => (
                <tr key={index} className="hover:bg-[#27272e]">
                  <td className="border border-gray-700 p-2">{barcode.type}</td>
                  <td className="border border-gray-700 p-2">
                    {barcode.content}
                  </td>
                  <td className="border border-gray-700 p-2">
                    {barcode.location}
                  </td>
                  <td className="border border-gray-700 p-2">
                    {barcode.quality}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BarcodeInfo;
