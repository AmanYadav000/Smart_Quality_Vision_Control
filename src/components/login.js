import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { Toaster, toast } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // React Router's navigation function

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      toast.error("Email and Password are required!");
      return;
    }

    try {
      const response = await fetch("https://flipkart-grid-backend-2.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the name from the token to localStorage
        // const decodedToken = jwtDecode(data.token); // Use jwt-decode to decode the token
        const userName = data.name;
        console.log("data",data);
  
        // Save the name in localStorage
        localStorage.setItem("name", userName);

        toast.success("Login successful!");
        navigate("/home"); // Redirect to home page
      } else {
        toast.error(data.message || "Invalid login credentials!");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e] text-gray-200">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md bg-[#333] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Staff Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 p-2 rounded bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative mb-5">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full mt-1 p-2 rounded bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full  py-3 mt-5 bg-blue-600 rounded text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
