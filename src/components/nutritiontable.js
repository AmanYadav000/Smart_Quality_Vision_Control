import React from "react";

const NutritionInfo = ({ image, data }) => {
  // Separate nutrients and ingredients from the data array
  const nutrients = data.filter((item) => item.Nutrient !== "nan");
  const ingredients = data.filter((item) => item.Ingredient !== "nan");

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
        {/* Nutrients Table */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Nutrients</h2>
          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-[#2f3038]">
                <th className="border border-gray-700 p-2">Nutrient</th>
                <th className="border border-gray-700 p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {nutrients.map((nutrient, index) => (
                <tr key={index} className="hover:bg-[#27272e]">
                  <td className="border border-gray-700 p-2">
                    {nutrient.Nutrient}
                  </td>
                  <td className="border border-gray-700 p-2">
                    {nutrient.Value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ingredients Table */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-[#2f3038]">
                <th className="border border-gray-700 p-2">Ingredients</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="hover:bg-[#27272e]">
                  <td className="border border-gray-700 p-2">
                    {ingredient.Ingredient}
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

export default NutritionInfo;
