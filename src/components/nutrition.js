import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import GradientWheel from "./effect";
import ScanningLoader from "./scan";
import "./scanning.css";
import GradientWheel2 from "./effect2";
import robot from "../images/robot.jpeg";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { TbWindowMinimize } from "react-icons/tb";
import { IoMdExpand } from "react-icons/io";
import { LuScanLine } from "react-icons/lu";
import { GoHome } from "react-icons/go";
import { MdQrCodeScanner } from "react-icons/md";
import { MdOutlineHistory } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import imgflip from "../images/flipkart2.jpg";
import HistoryPopup from "./history";
import HistoryPopup2 from "./history2";
import { Link , useNavigate} from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import NutritionInfo from "./nutritiontable";
const name = localStorage.getItem("name");
 const backend_url="https://flipkart-grid-backend-2.onrender.com";
//const backend_url = "http://localhost:3001";

const Nutrition = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const navigate = useNavigate();
  const logoutfun=()=>{
    localStorage.setItem("name", "");
    navigate("/");
    }


  const [animatep, setanimatep] = useState("relative");
  const [activeForm, setActiveForm] = useState("grocery");
  const videoConstraints = {
    width: 1920, // Set high resolution
    height: 1080,
    facingMode: "user", // Use "environment" for back camera on mobile
  };

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  // const [currentBatchIndex, setCurrentBatchIndex] = useState(0); // Track the current batch
  const webcamRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);
    setResponse(null);
    setImage(URL.createObjectURL(file));
    setImage2(URL.createObjectURL(file));
    setIsCameraOpen(false); // Close camera if a file is selected
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "captured_image.jpg", {
            type: "image/jpeg",
          });
          setSelectedFile(file);
          setImage(URL.createObjectURL(file));
          setImage2(URL.createObjectURL(file));

          setIsCameraOpen(false); // Close camera after capture
        })
        .catch((err) => console.error("Error capturing image:", err));
    }
  };

  const isValidResponseData = (data) => {
    if (!Array.isArray(data)) {
      return false;
    }
  
    for (const item of data) {
      if (
        typeof item !== "object" || 
        !("Nutrient" in item) || 
        !("Value" in item) || 
        !("Ingredient" in item) || 
        typeof item.Nutrient !== "string" || 
        typeof item.Value !== "string" || 
        typeof item.Ingredient !== "string"
      ) {
        return false;
      }
    }
  
    return true;
  };
  

  const handleSubmit = async (event) => {
    setanimatep("loaderscan relative");

    event.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a file or capture an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log("formData", formData);
    // "https://apihosting-cvjf.onrender.com/",
    setLoading(true);
    try {
        const res = await axios.post(
          "https://nutrition-info.onrender.com/predict",
          
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      
        if (res.data.product_details) {

            if(isValidResponseData(res.data.product_details)){
                setResponse(res.data.product_details);

            }
            else{
                toast.error("Please give valid image, where details can be extracted")
            }
          
          console.log(res.data.product_details);
          setImage(null);
        } else {
          toast.error("Error: No relevant product details found.");
        }
    } catch (error) {
      toast.error("Error uploading file:", error);
      if (error.response) {
        setResponse(error.response.data);
      } else {
        setResponse("Error uploading file");
      }
    } finally {
      setLoading(false);
      setanimatep("relative");
    }
  };

  

  const generateOrderNumber = () => Math.floor(Math.random() * 1000000);

  // Helper function to switch to the next batch of saved products

  return (
    <div className=" flex w-full  h-[100vh] ">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-[#1e1f24] text-white h-full w-[220px] flex-shrink-0">
        <div className="h-[7rem] flex justify-center items-center">
          Flipkart Grid 6.0
        </div>
        <div className="flex flex-col space-y-6 px-4">
          <Link to="/dashboard" className="flex items-center px-2 py-2">
            <MdOutlineDashboard className="text-2xl" />
            <span className="pl-2">Dashboard</span>
          </Link>
          <Link to="/home" className="flex items-center px-2 py-2 ">
            <LuScanLine className="text-2xl " />
            <span className="pl-2 ">Scan</span>
          </Link>

          <Link
            to="/nutrition"
            className="flex items-center px-2 py-2 w-full bg-white rounded-lg"
          >
            <LuScanLine className="text-2xl text-[#141517]" />
            <span className="pl-2 text-[#141517] font-bold">Nutrition</span>
          </Link>

          <Link to='/barcode'  className="flex items-center px-2 py-2">
            <MdQrCodeScanner className="text-2xl" />
            <span className="pl-2">BAR-Code</span>
          </Link>
          <Link to="/history/products" className="flex items-center px-2 py-2">
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

      <div className=" overflow-y-scroll bg-[#141517] scrollbar-hide border-r-[2px] border-[#1e1f24] ">
        <img className="" src={imgflip}></img>

        <div className="m-[5rem] ">
            {response &&  <NutritionInfo image={image2} data={response} /> }
        
        </div>
      </div>

      <div className="max-w-7.5xl h-[100vh] mx-auto p-6 bg-[#141517] text-[#f0f0f0] flex shadow-md">
        <div className="flex flex-col pr-10 border-r-[1px] border-[#4d4d4d]">
          <div className=" flex  mb-[3.5rem]">
            {/* <img className="w-[10rem]" src={robot}></img>{" "} */}
            <h1 className="text-center text-2xl font-bold  ml-5 mt-4">
              Hi , {name}!
            </h1>
          </div>

          <div>
            <div className="flex justify-center mb-4"></div>

            <form
              onSubmit={handleSubmit}
              className="mb-6 flex mt-10 flex-col items-center"
            >
              {/* <h1 className='m-2'>Grocery</h1> */}
              <div className="flex mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mr-4 bg-[#333] text-[#f0f0f0] border border-gray-600 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setIsCameraOpen(!isCameraOpen)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  {isCameraOpen ? "Close " : <FaCamera />}
                </button>
              </div>
              {isCameraOpen && (
                <div className="mb-4">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                    className="w-64 h-64 object-contain border border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={handleCapture}
                    className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                  >
                    Take Photo
                  </button>
                </div>
              )}

              {image && (
                <div>
                  <div className={`${animatep}`}>
                    {loading && (
                      <p className="absolute z-[100] left-[30%] top-[46%] text-[#fdfcfc] font-bold">
                        Scanning Image...
                      </p>
                    )}

                    <img
                      src={image}
                      className="z-[1] opacity-40"
                      alt="Selected"
                      style={{ width: "300px", height: "300px" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 mt-5 py-2 flex bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Upload <MdOutlineFileUpload className="mt-1 ml-2" />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center ">
            <GradientWheel2 />
          </div>
        )}

        {/* Render saved results */}
      </div>
    </div>
  );
};
export default Nutrition;
