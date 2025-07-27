import React, { useEffect, useState } from "react";
import axios from "axios";
import MyPieChart from "./pichart";
import LineGraph from "./linegraph";
import { Toaster, toast } from "react-hot-toast";
import { Link , useNavigate} from "react-router-dom";
import { LuScanLine } from "react-icons/lu";
import { GoHome } from "react-icons/go";
import { MdQrCodeScanner } from "react-icons/md";
import { GiFruitBowl } from "react-icons/gi";

import { MdLogout } from "react-icons/md";
import { MdOutlineHistory } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import StackedBarChart from "./bargraph";
import DonutChart from "./pichart";
import OrdersBarGraph from "./bargraph2";
export default function Dashboard() {
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("https://flipkart-grid-backend-2.onrender.com/order-data"); // Replace with your API endpoint
        const data = await response.json();
        console.log("dataaaa", data);
        setGraphData(
          data.map((item) => ({
            date: item.date,
            products: item.products, // Replace with actual key from your API response
            fruits: item.fruits,
            rotten: item.rotten, // Replace with actual key from your API response
          }))
        );
      } catch (error) {
        toast.error("Failed to fetch graph data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const navigate = useNavigate();
  const logoutfun=()=>{
    localStorage.setItem("name", "");
    navigate("/");
    }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://flipkart-grid-backend-2.onrender.com/category-piechart"
        ); // Adjust API URL as needed
        const chartData = response.data;

        // Separate data and colors
        setData(chartData.map(({ name, value }) => ({ name, value })));
        setColors(chartData.map(({ color }) => color));
      } catch (error) {
        toast.error("Failed to fetch pie chart data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" flex h-[100vh] w-[100%] bg-[#141517] text-white">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-[#1e1f24] text-white h-full w-[220px] flex-shrink-0">
        <div className="h-[7rem] flex justify-center items-center">
          Flipkart Grid 6.0
        </div>
        <div className="flex flex-col space-y-6 px-4">
          <Link
            to="/dashboard"
            className="flex items-center px-2 py-2 w-full bg-white rounded-lg"
          >
            <MdOutlineDashboard className="text-2xl text-[#141517]" />
            <span className="pl-2 text-[#141517] font-bold">Dashboard</span>
          </Link>
          <Link to="/home" className="flex items-center px-2 py-2">
            <LuScanLine className="text-2xl" />
            <span className="pl-2">Scan</span>
          </Link>

                    <Link to='/nutrition' className="flex items-center px-2 py-2">
                    <LuScanLine className="text-2xl" />
                      <span className="pl-2">Nutrition</span>
                    </Link>
          <Link to='/barcode'  className="flex items-center px-2 py-2">
            <MdQrCodeScanner className="text-2xl" />
            <span className="pl-2">BAR-Code</span>
          </Link>
          <Link to='/history/products' className="flex items-center px-2 py-2">
            <MdOutlineHistory className="text-2xl" />
            <span className="pl-2">History</span>
          </Link>
        </div>
        <div className="w-full h-px bg-[#7e7e7e] my-6"></div>
        <div onClick={logoutfun} className="flex items-center px-4">
          <MdLogout className="text-2xl" />
          <span className="pl-4">Log-Out</span>
        </div>
      </div>

      <div className="p-[2.5rem] flex-grow  overflow-y-scroll flex-wrap ">
        






















        <div className=" flex flex-wrap w-[100%] ">
          <div className="w-[60%] flex flex-col flex-wrap">
            <div className=" flex  w-[100%] justify-around">
              {loading ? (
                <p>Loading...</p>
              ) : graphData.length > 0 ? (
                <>
                  <div className="mb-4  flex flex-col items-center w-[21%]  rounded-[20px] bg-[#1e1f24] ">
                    <div className="p-3 rounded-[100%] bg-[#08a0f8] mt-5 ">
                      <AiOutlineProduct className="text-[white] text-[2rem] " />
                    </div>
                    <p className="text-[2rem]">
                      {" "}
                      {graphData[graphData.length - 1]?.products +
                        graphData[graphData.length - 1]?.fruits}
                    </p>
                    <p className="text-[#6a6d7e] mb-2 w-[70%] text-center">
                      Total Processed Today{" "}
                    </p>
                  </div>
                  <div className="mb-4  flex flex-col items-center w-[21%]  rounded-[20px] bg-[#1e1f24] ">
                    <div className="p-3 rounded-[100%] bg-[#e76468] mt-5 ">
                      <GiFruitBowl className="text-[white] text-[2rem] " />
                    </div>
                    <p className="text-[2rem]">
                      {" "}
                      {graphData[graphData.length - 1]?.fruits}
                    </p>
                    <p className="text-[#6a6d7e] mb-2 w-[70%] text-center">
                      Fruits Processed Today{" "}
                    </p>
                  </div>

                  <div className="mb-4  flex flex-col items-center w-[21%] rounded-[20px] bg-[#1e1f24] ">
                    <div className="p-3 rounded-[100%] bg-[#ed9836] mt-5 ">
                      <AiOutlineProduct className="text-[white] text-[2rem] " />
                    </div>
                    <p className="text-[2rem]">
                      {" "}
                      {graphData[graphData.length - 1]?.products}
                    </p>
                    <p className="text-[#6a6d7e] mb-2 w-[70%] text-center">
                      Products Processed Today{" "}
                    </p>
                  </div>
                  <div className="mb-4  flex flex-col items-center w-[21%] rounded-[20px] bg-[#1e1f24] ">
                    <div className="p-3 rounded-[100%] bg-[#ed7b38] mt-5 ">
                      <AiOutlineProduct className="text-[white] text-[2rem] " />
                    </div>
                    <p className="text-[2rem]">
                      {" "}
                      {graphData[graphData.length - 1]?.rotten}
                    </p>
                    <p className="text-[#6a6d7e] mb-2 w-[70%] text-center">
                      Rotten fruits or veggies Today{" "}
                    </p>
                  </div>
                </>
              ) : (
                <p>No data available</p>
              )}
            </div>

            <div className="  w-[100%] mt-5 flex flex-wrap justify-around">
              {loading ? (
                <p>Loading...</p>
              ) : graphData.length > 0 ? (
                <>
                  <div className="mb-10   flex w-[55%] mr-10 justify-center items-center flex-grow bg-[#1e1f24] rounded-[20px]">
                    <LineGraph data={graphData} />
                  </div>
                </>
              ) : (
                <p>No data available</p>
              )}

              <div className="bg-[#1e1f24] relative mb-10 rounded-[20px] flex  flex-grow justify-center items-center text-[white] ">
               <OrdersBarGraph data={graphData}/>
              </div>
            </div>
          </div>

          <div className="bg-[#1e1f24] ml-10 mb-10 flex-grow max-w-[35%] min-w-[25%]  rounded-[20px] flex  justify-between items-center ">
          <DonutChart data={data} colors={colors} />
          </div>
        </div>
        {/* <div className="bg-[#1e1f24] rounded-[20px] flex justify-between items-center my-10">
          <StackedBarChart data={graphData} />
        </div> */}
      </div>
    </div>
  );
}
