import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdQrCodeScanner } from "react-icons/md";
import { GiFruitBowl } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import { MdOutlineHistory } from "react-icons/md";
import { LuScanLine } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import OrderHistory from "./producthistory";
const backend_url = "https://flipkart-grid-backend-2.onrender.com";

const HistoryPopup = () => {
  const [loading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const navigate = useNavigate();
  const logoutfun=()=>{
    localStorage.setItem("name", "");
    navigate("/");
    }
 // React Router's navigation function

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backend_url}/products-history`);
      setHistoryData(res.data);
    } catch (error) {
      console.error("Error fetching history:", error.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    // Fetch data from the API
    fetchHistory();
  }, []);


  return (
    <div className="h-[100vh] w-full">
      {/* Popup Modal */}

      <div className="h-[100vh] w-full flex  bg-black     ">
        <div className="bg-[#1e1f24] text-white h-full w-[220px] flex-shrink-0">
          <div className="h-[7rem] flex justify-center items-center">
            Flipkart Grid 6.0
          </div>
          <div className="flex flex-col space-y-6 px-4">
            <Link to="/dashboard" className="flex items-center px-2 py-2">
              <MdOutlineDashboard className="text-2xl" />
              <span className="pl-2">Dashboard</span>
            </Link>
            <Link to="/home" className="flex items-center px-2 py-2">
              <LuScanLine className="text-2xl" />
              <span className="pl-2">Scan</span>
            </Link>
             <Link to='/nutrition' className="flex items-center px-2 py-2">
                                <LuScanLine className="text-2xl" />
                                  <span className="pl-2">Nutrition</span>
                                </Link>

            <Link  to='/barcode' className="flex items-center px-2 py-2">
              <MdQrCodeScanner className="text-2xl" />
              <span className="pl-2">BAR-Code</span>
            </Link>

            <Link
              to="/history/products"
              className="flex items-center px-2 py-2 w-full bg-white rounded-lg"
            >
              <MdOutlineHistory className="text-2xl text-[#141517]" />
              <span className="pl-2 text-[#141517] font-bold">History</span>
            </Link>
          </div>
          <div className="w-full h-px bg-[#7e7e7e] my-6"></div>
          <div onClick={logoutfun} className="flex items-center px-4">
            <MdLogout className="text-2xl" />
            <span className="pl-4">Log-Out</span>
          </div>
        </div>



        <div className="h-[100vh] w-full  text-[white]">

        {loading ? (
              <div className="h-[100vh] flex items-center justify-center">
                <div className="loader  rounded-full  animate-spin"></div>
              </div>
            ) : (
         
          <OrderHistory historyData={historyData} />

        )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPopup;
