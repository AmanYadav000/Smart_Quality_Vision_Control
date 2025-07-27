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
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
const name = localStorage.getItem("name");

const backend_url="https://flipkart-grid-backend-2.onrender.com";
//const backend_url = "http://localhost:3001";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedResults, setSavedResults] = useState([]);
  const [savedResults2, setSavedResults2] = useState([]);
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [expandedIndices2, setExpandedIndices2] = useState([]);
  const [image, setImage] = useState(null);
  const [animatep, setanimatep] = useState("relative");
  const [activeForm, setActiveForm] = useState("grocery");
  const navigate = useNavigate();
  const logoutfun = () => {
    localStorage.setItem("name", "");
    navigate("/");
  };

  const formatDescription = (text) => {
    // Split the description into an array of points
    return text.split(".").filter((point) => point.trim() !== "");
  };

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  // const [currentBatchIndex, setCurrentBatchIndex] = useState(0); // Track the current batch
  const webcamRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);
    setImage(URL.createObjectURL(file));
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

          setIsCameraOpen(false); // Close camera after capture
        })
        .catch((err) => console.error("Error capturing image:", err));
    }
  };

  // useEffect(() => {
  //   if (response && response.product_details) {
  //     const allMatched = savedProducts[currentBatchIndex].batch.every((savedProduct) =>
  //       response.product_details.some((productFromResponse) =>
  //         isMatching(productFromResponse, savedProduct)
  //       )
  //     );
  //     setAllMatched(allMatched);
  //   }
  // }, [response, currentBatchIndex]);

  // const handleSubmit = async (event) => {
  //   setanimatep("loaderscan relative");

  //   event.preventDefault();

  //   if (!selectedFile) {
  //     alert("Please select a file or capture an image first!");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", selectedFile);
  //   console.log("formData", formData);

  //   setLoading(true);
  //   try {
  //     const res = await axios.post(
  //       "https://apihosting-cvjf.onrender.com/predict",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     setResponse(res.data);

  //     if (activeForm === "grocery") {
  //       const { product_details } = res.data;

  //       if (product_details && product_details.length > 0) {
  //         axios
  //           .post(`${backend_url}/add-product`, product_details[0], {
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //           })
  //           .then(() => {
  //             console.log("Product details saved to the database.");
  //           })
  //           .catch((error) => {
  //             console.error("Failed to save product details:", error.message);
  //           });
  //       }

  //       setSavedResults((prevResults) => [
  //         { ...res.data,image: URL.createObjectURL(selectedFile), expanded: true, isNew: true }, // New element
  //         ...prevResults.map((item) => ({ ...item, isNew: false })), // Previous elements
  //       ]);

  //       setExpandedIndices((prevIndices) => [
  //         ...prevIndices,
  //         savedResults.length, // Automatically expand the new result
  //       ]);

  //     } else {
  //       const { fruit_vegetable_details } = res.data;

  //       if (fruit_vegetable_details && fruit_vegetable_details.length > 0) {
  //         axios
  //           .post(
  //             `${backend_url}/add-fruit`,
  //             fruit_vegetable_details[0],
  //             {
  //               headers: {
  //                 "Content-Type": "application/json",
  //               },
  //             }
  //           )
  //           .then(() => {
  //             console.log("Product details saved to the database.");
  //           })
  //           .catch((error) => {
  //             console.error("Failed to save product details:", error.message);
  //           });
  //       }

  //       setSavedResults2((prevResults) => [
  //         { ...res.data,image: URL.createObjectURL(selectedFile), expanded: true, isNew: true }, // New element
  //         ...prevResults.map((item) => ({ ...item, isNew: false })), // Previous elements
  //       ]);

  //       setExpandedIndices2((prevIndices) => [
  //         ...prevIndices,
  //         savedResults2.length, // Automatically expand the new result
  //       ]);

  //     }

  //     console.log(res.data);
  //     setImage(null);

  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     if (error.response) {
  //       setResponse(error.response.data);
  //     } else {
  //       setResponse("Error uploading file");
  //     }
  //   } finally {
  //     setLoading(false);
  //     setanimatep("relative");
  //   }
  // };

  // Validation function for grocery response
  const isValidGroceryResponse = (response) => {
    const requiredFields = [
      "timestamp",
      "product_name",
      "brand",
      "MRP",
      "expiry_date",
      "product_count",
      "is_expired",
      "category",
      "expected_life_span",
    ];
    return requiredFields.every((field) => field in response);
  };

  // Validation function for fruit/vegetable response
  const isValidFruitResponse = (response) => {
    console.log("resppppp222", response);
    const requiredFields = [
      "name",
      "freshness_index",
      "expected_life_span",
      "description",
      "timestamp",
    ];
    return requiredFields.every((field) => field in response);
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
        "https://apihosting-cvjf.onrender.com/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponse(res.data);

      if (activeForm === "grocery") {
        const { product_details } = res.data;

        // Validate grocery response
        if (
          product_details &&
          product_details.length > 0 &&
          isValidGroceryResponse(product_details[0])
        ) {
          console.log(product_details);
          axios
            .post(`${backend_url}/add-product`, product_details, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then(() => {
              toast.success("Product details saved to the database.");
            })
            .catch((error) => {
              toast.error("Failed to save product details:", error.message);
            });

          setSavedResults((prevResults) => [
            {
              ...res.data,
              image: URL.createObjectURL(selectedFile),
              expanded: true,
              isNew: true,
            },
            ...prevResults.map((item) => ({ ...item, isNew: false })),
          ]);

          setExpandedIndices((prevIndices) => [
            ...prevIndices,
            savedResults.length,
          ]);
        } else {
          toast.error(
            "Invalid input format , Please select photo corresponding to selected category"
          );
          return;
        }
      } else {
        const { fruit_vegetable_details } = res.data;

        // Validate fruit/vegetable response
        if (
          fruit_vegetable_details &&
          fruit_vegetable_details.length > 0 &&
          isValidFruitResponse(fruit_vegetable_details[0])
        ) {
          axios
            .post(`${backend_url}/add-fruit`, fruit_vegetable_details, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then(() => {
              toast.success("Product details saved to the database.");
            })
            .catch((error) => {
              toast.error("Failed to save product details:", error.message);
            });

          setSavedResults2((prevResults) => [
            {
              ...res.data,
              image: URL.createObjectURL(selectedFile),
              expanded: true,
              isNew: true,
            },
            ...prevResults.map((item) => ({ ...item, isNew: false })),
          ]);

          setExpandedIndices2((prevIndices) => [
            ...prevIndices,
            savedResults2.length,
          ]);
        } else {
          toast.error(
            "Invalid input format , Please select photo corresponding to selected category."
          );
          return;
        }
      }

      console.log(res.data);
      setImage(null);
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

  const toggleExpand = (index) => {
    setExpandedIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index]
    );
  };
  const toggleExpand2 = (index) => {
    setExpandedIndices2((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index]
    );
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
          <Link
            to="/home"
            className="flex items-center px-2 py-2 w-full bg-white rounded-lg"
          >
            <LuScanLine className="text-2xl text-[#141517]" />
            <span className="pl-2 text-[#141517] font-bold">Scan</span>
          </Link>

          <Link to="/nutrition" className="flex items-center px-2 py-2">
            <LuScanLine className="text-2xl" />
            <span className="pl-2">Nutrition</span>
          </Link>

          <Link to="/barcode" className="flex items-center px-2 py-2">
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
        {/* {activeForm === "grocery" ? <HistoryPopup /> : <HistoryPopup2 />} */}
        {activeForm === "fruits" ? (
          <div>
            {savedResults2.map((result, index) => (
              <div
                key={index}
                className={
                  result.isNew
                    ? "border border-[#494949]  rounded-md m-4 "
                    : "border border-gray-600  m-6 rounded-md"
                }
              >
                <div className="flex justify-between p-4 border-b-[5px] text-[white] border-[#2d2f36] bg-[#1e1f24]">
                  <div className="flex ">
                    <h3 className="font-bold text-[1rem]">
                      Order Number: {generateOrderNumber()}
                    </h3>
                    <h3 className="text-xl font-semibold ml-5 text-[1rem]">
                      Time Stamp: {result.fruit_vegetable_details[0].timestamp}
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleExpand2(index)}
                    className="text-blue-400"
                  >
                    {expandedIndices2.includes(index) ? (
                      <TbWindowMinimize className="text-[1.5rem]" />
                    ) : (
                      <IoMdExpand className="text-[1.5rem]" />
                    )}
                  </button>
                </div>

                {expandedIndices2.includes(index) && (
                  <div className="p-4 bg-[#1e1f24]">
                    <div className="grid grid-cols-[1fr,2fr] gap-6 ">
                      <div className="space-y-4 border-r-[1px] pr-4 border-gray-600">
                        <div className="border-b-[1px] pb-4 border-gray-600">
                          {result.image && (
                            <div className="">
                              <img
                                src={result.image}
                                alt="Uploaded"
                                className="w-64 h-64 object-contain mx-auto rounded-md"
                              />
                            </div>
                          )}
                        </div>

                        {/* Order Number */}
                      </div>

                      {/* Right Side: Product Matching Table */}
                      <div className="space-y-4">
                        <div className="border-b pb-4 border-gray-600">
                          <h4 className="text-[white]  mb-2 text-center">
                            Image Details
                          </h4>
                          <table className="w-full table-auto border-collapse border border-gray-600">
                            <thead>
                              <tr className="bg-[#33353d] text-[white]">
                                <th className="border px-4 py-2 text-left">
                                  fruit Name
                                </th>

                                <th className="border px-4 py-2 text-left">
                                  Freshness Index
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Expected Life Span
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {result.fruit_vegetable_details.map(
                                (product, i) => (
                                  <tr key={i} className="text-gray-300">
                                    <td className="border px-4 py-2">
                                      {product.name}
                                    </td>

                                    <td className="border px-4 py-2">
                                      {product.freshness_index}
                                    </td>
                                    <td className="border px-4 py-2">
                                      {product.expected_life_span}
                                    </td>
                                    <td className="border px-4 py-2">
                                      {formatDescription(product.description).map(
                                        (point, index) => (
                                          <p key={index}>
                                            {index + 1}. {point.trim()}
                                          </p>
                                        )
                                      )}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>

                        {/* {allMatched && (
            <div className="text-center text-[green] font-semibold">
              <h3>Order processed successfully!</h3>
            </div>
          )}
          {!allMatched && (
            <div className="text-center text-[#fd1d1d] font-semibold">
              <h3>Order Incomplete!</h3>
            </div>
          )} */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>
            {savedResults.map((result, index) => (
              <div
                key={index}
                className={
                  result.isNew
                    ? "border border-[#494949]  rounded-md m-4 "
                    : "border border-gray-600  m-6 rounded-md"
                }
              >
                <div className="flex justify-between text-[white] border-b-[2px] border-[#35363f] p-4 bg-[#1e1f24]">
                  <div className="flex ">
                    <h3 className="font-bold text-[1rem]">
                      Order Number: {generateOrderNumber()}
                    </h3>
                    <h3 className="text-xl font-semibold ml-5 text-[1rem]">
                      Time Stamp: {result.product_details[0].timestamp}
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleExpand(index)}
                    className="text-blue-400"
                  >
                    {expandedIndices.includes(index) ? (
                      <TbWindowMinimize className="text-[1.5rem]" />
                    ) : (
                      <IoMdExpand className="text-[1.5rem]" />
                    )}
                  </button>
                </div>

                {expandedIndices.includes(index) && (
                  <div className="p-4 bg-[#1e1f24]">
                    <div className="grid grid-cols-[1fr,2fr] gap-6 ">
                      <div className="space-y-4 border-r-[1px] pr-4 border-gray-600">
                        <div className="border-b-[1px] pb-4 border-gray-600">
                          {result.image && (
                            <div className="">
                              <img
                                src={result.image}
                                alt="Uploaded"
                                className="w-64 h-64 object-contain mx-auto rounded-md"
                              />
                            </div>
                          )}
                        </div>

                        {/* Order Number */}
                      </div>

                      {/* Right Side: Product Matching Table */}
                      <div className="space-y-4">
                        <div className="border-b pb-4 border-gray-600">
                          <h4 className="text-[white]  mb-2 text-center">
                            Image Details
                          </h4>
                          <table className="w-full table-auto border-collapse border border-gray-600">
                            <thead>
                              <tr className="bg-[#33353d]">
                                <th className="border px-4 py-2 text-left">
                                  Product Name
                                </th>

                                <th className="border px-4 py-2 text-left">
                                  Brand
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  MRP
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Quantity
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Expired
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Expiry Date
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Expected Life Span
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {result.product_details.map((product, i) => (
                                <tr key={i} className="text-gray-300">
                                  <td className="border px-4 py-2">
                                    {product.product_name}
                                  </td>

                                  <td className="border px-4 py-2">
                                    {product.brand}
                                  </td>
                                  <td className="border px-4 py-2">
                                    {product.MRP}
                                  </td>
                                  <td className="border px-4 py-2">
                                    {product.product_count}
                                  </td>
                                  <td className="border px-4 py-2">
                                    {product.is_expired}
                                  </td>
                                  <td className="border px-4 py-2">
                                    {product.expiry_date}
                                  </td>
                                  <td className="border px-4 py-2">
                                    {product.expected_life_span}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* {allMatched && (
                      <div className="text-center text-[green] font-semibold">
                        <h3>Order processed successfully!</h3>
                      </div>
                    )}
                    {!allMatched && (
                      <div className="text-center text-[#fd1d1d] font-semibold">
                        <h3>Order Incomplete!</h3>
                      </div>
                    )} */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
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
            <div className="flex justify-center mb-4">
              <button
                className={`px-[4rem] py-2  ${
                  activeForm === "grocery"
                    ? "border-b-[3px] border-blue-500 text-white"
                    : " text-[#6d6d6d]"
                } rounded-md`}
                onClick={() => setActiveForm("grocery")}
              >
                Grocery
              </button>

              <a
                className={`px-8 py-2 cursor-pointer ${
                  activeForm === "fruits"
                    ? "border-b-[3px] border-blue-500 text-white"
                    : " text-[#6d6d6d]"
                } rounded-md`}
                // href="https://huggingface.co/spaces/kriskeshav/Product_Classification"
                onClick={() => setActiveForm("fruits")}
              >
                Fruits and Veggies
              </a>
            </div>

            {activeForm === "grocery" && (
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
            )}

            {activeForm === "fruits" && (
              <form
                onSubmit={handleSubmit}
                className="mb-6 flex mt-10 flex-col items-center"
              >
                {/* <h1 className='m-2'>Fruits and veges</h1> */}
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
                    {isCameraOpen ? "Close" : <FaCamera />}
                  </button>
                </div>
                {isCameraOpen && (
                  <div className="mb-4">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
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
                        <p className="absolute z-[100] left-[35%] top-[48%] text-[#fdfcfc] font-bold">
                          Scanning Image...
                        </p>
                      )}

                      <img
                        src={image}
                        className="z-[1] opacity-20"
                        alt="Selected"
                        style={{ width: "300px", height: "300px" }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 mt-5 flex py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Upload <MdOutlineFileUpload className="mt-1 ml-2" />
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* 
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col items-center">
        <h1>grocery</h1>
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
            {isCameraOpen ? 'Close Camera' : 'Capture from Camera'}
          </button>
        </div>
        {isCameraOpen && (
          <div className="mb-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="imagde/jpeg"
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
        <div className={`${animatep}`} >
         {loading && <p className='absolute z-[100] left-[35%] top-[48%] text-[#fdfcfc] font-bold'>Scanning Image...</p>}
         
          <img src={image} className='z-[1] opacity-20'   alt="Selected" style={{ width: '300px', height: '300px' }} />
        </div>
      )}
        <button
          type="submit"
          className="px-4 mt-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Upload and Predict
        </button>
      </form> */}
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
export default Home;
