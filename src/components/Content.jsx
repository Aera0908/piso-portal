import Rates from "./Rates.jsx";
import React, { useState, useEffect } from "react";
import coupons from "../data/coupons.json"; // Import the JSON file
import ratesData from "../data/rates.json"; // Import rates.json

export default function Content() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds
  const [isTimeUp, setIsTimeUp] = useState(false); // Tracks if time is up

  // Function to calculate time based on money
  const calculateTime = (amount) => {
    let totalTime = 0;

    // Sort rates by value in descending order to prioritize higher denominations
    const sortedRates = ratesData.sort((a, b) => b.value - a.value);

    // Iterate through the rates and calculate the total time
    for (const rate of sortedRates) {
      while (amount >= rate.value) {
        totalTime += rate.time;
        amount -= rate.value;
      }
    }

    return totalTime; // Total time in seconds
  };

  // Save state to localStorage
  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Load state from localStorage
  const loadFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  // Remove coupon from JSON
  const removeCoupon = (couponCode) => {
    delete coupons[couponCode]; // Remove the coupon from the object
    console.log(`Coupon ${couponCode} has been removed.`);
  };

  // Load saved data on component mount
  useEffect(() => {
    const savedCode = loadFromLocalStorage("couponCode");
    const savedTimeLeft = loadFromLocalStorage("timeLeft");
    const savedRemainingTime = loadFromLocalStorage("remainingTime");
    const savedIsVerified = loadFromLocalStorage("isVerified");

    if (savedCode && savedTimeLeft > 0) {
      setCode(savedCode.split(""));
      setTimeLeft(savedTimeLeft);
      setRemainingTime(savedRemainingTime);
      setIsVerified(savedIsVerified);
    }
  }, []);

  // Countdown logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          saveToLocalStorage("timeLeft", newTime); // Save updated time
          return newTime;
        });
      }, 1000);
      return () => clearInterval(timer); // Cleanup timer
    } else if (timeLeft === 0 && isVerified) {
      setIsTimeUp(true); // Trigger time-up state
      removeCoupon(code.join("")); // Remove the coupon from the JSON
      localStorage.clear(); // Clear localStorage when time is up
    }
  }, [timeLeft, isVerified]);

  const handleInputChange = (value, index) => {
    if (/^[a-zA-Z0-9]?$/.test(value)) {
      // Allow letters and numbers
      const newCode = [...code];
      newCode[index] = value.toUpperCase(); // Convert to uppercase
      setCode(newCode);

      // Automatically focus the next input
      if (value && index < 5) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredCode = code.join("");
    if (coupons[enteredCode]) {
      const value = coupons[enteredCode];
      setIsVerified(true);
      const totalTime = calculateTime(value);
      setRemainingTime(totalTime); // Set total time in seconds
      setTimeLeft(totalTime); // Start countdown
      setIsTimeUp(false); // Reset time-up state

      // Save data to localStorage
      saveToLocalStorage("couponCode", enteredCode);
      saveToLocalStorage("timeLeft", totalTime);
      saveToLocalStorage("remainingTime", totalTime);
      saveToLocalStorage("isVerified", true);
    } else {
      alert("Invalid coupon code. Please try again.");
    }
  };

  // Reset all states and clear localStorage
  const handleReset = () => {
    setCode(["", "", "", "", "", ""]);
    setIsVerified(false);
    setRemainingTime(null);
    setTimeLeft(0);
    setIsTimeUp(false);
    localStorage.clear();
  };

  // Convert seconds to HH:MM:SS format
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  // Calculate strokeDashoffset for the circular progress bar
  const calculateStrokeDashoffset = () => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    return timeLeft > 0
      ? circumference - (timeLeft / remainingTime) * circumference
      : circumference;
  };

  // Determine the color of the progress circle based on the remaining time percentage
  const getCircleColor = () => {
    const percentage = (timeLeft / remainingTime) * 100;
    if (percentage > 30) return "blue"; // More than 50% time left
    if (percentage > 10) return "yellow"; // Between 20% and 50% time left
    return "red"; // Less than 20% time left
  };

  return (
    <main className="flex-1 p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 mt-2 px-5 text-center">
        Welcome to Piso WiFi Portal
      </h2>
      <p className="mb-4 text-gray-600 max-w-2xl mx-auto text-center px-5">
        Connect to high-speed internet with our affordable prepaid WiFi service.
        Enter your code below to start browsing.
      </p>

      {!isVerified ? (
        <form
          onSubmit={handleSubmit}
          className=" text-black bg-gradient-to-r from-sky-100 to-yellow-50 p-6 rounded-xl shadow-md w-100% max-w-4xl mx-auto mb-6 border border-sky-100"
        >
          <div className="mb-4 text-center">
            <label className="block text-blue-700 font-medium mb-2">
              Enter Your 6-Character Code
            </label>
            <div className="flex justify-center space-x-2">
              {code.map((char, index) => (
                <input
                  key={index}
                  id={`code-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={char}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-9 h-10 text-center border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-36 bg-gradient-to-r from-blue-800  to-blue-500 text-white py-2 rounded-4xl hover:bg-blue-600 transition duration-200 flex flex-row px-2 items-center justify-center mx-auto"
          >
            Connect
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </button>
        </form>
      ) : (
        <div className="bg-gradient-to-r from-sky-100 to-yellow-50 p-6 rounded shadow-md w-100% max-w-4xl mx-auto mb-6 text-center text-blue-900">
          <h3 className="text-xl font-bold text-green-600 mb-4">
            {isTimeUp ? "Time's Up!" : "Coupon Verified!"}
          </h3>
          {!isTimeUp && (
            <div className="relative w-40 h-40 mx-auto mb-4">
              <svg className="w-full h-full">
                {/* Background circle */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="70"
                  stroke="gray"
                  strokeWidth="5"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="70"
                  stroke={getCircleColor()} // Dynamic color
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 70}
                  strokeDashoffset={calculateStrokeDashoffset()}
                  style={{
                    transition: "stroke-dashoffset 1s linear, stroke 1s linear",
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                {formatTime(timeLeft)}
              </div>
            </div>
          )}
          {isTimeUp && (
            <div>
              <p className="text-red-500 mb-4">Your session has ended.</p>
              <button
                onClick={handleReset}
                className="w-46 bg-gradient-to-r from-blue-800  to-blue-500 text-white py-2 rounded-4xl hover:bg-blue-600 transition duration-200 flex flex-row justify-center items-center mx-auto px-5"
              >
                Enter New Coupon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M15 5l0 2" />
                  <path d="M15 11l0 2" />
                  <path d="M15 17l0 2" />
                  <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleReset}
        className="w-50 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200 mt-4"
      >
        Reset
      </button>
      <Rates />
      <div className="text-center mt-8 px-3">
        <p className="text-gray-600 mb-4">
          For more information, please contact us.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-700">
          {/* Phone Section */}
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"
              />
            </svg>
            <span className="text-lg font-medium">09123456789</span>
          </div>

          {/* Email Section */}
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"
              />
              <path d="M3 7l9 6l9 -6" />
            </svg>
            <span className="text-lg font-medium">cdmpisowifi@example.com</span>
          </div>
        </div>
      </div>
    </main>
  );
}
