import Rates from "./Rates.jsx";
import React, { useState, useEffect } from "react";

export default function Content() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds
  const [isTimeUp, setIsTimeUp] = useState(false); // Tracks if time is up

  // Placeholder coupon with its value
  const coupons = {
    111111: 15.0, // ₱15.00
    222222: 30.0, // ₱30.00
    333333: 1.0, // ₱1.00
    444444: 0.1, // ₱0.10
  };

  // Function to calculate time based on money
  const calculateTime = (amount) => {
    const timePerPeso = 5; // 5 minutes per ₱1.00
    return amount * timePerPeso * 60; // Convert minutes to seconds
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
      localStorage.clear(); // Clear localStorage when time is up
    }
  }, [timeLeft, isVerified]);

  const handleInputChange = (value, index) => {
    if (/^[A-Z0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value.toUpperCase();
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
    const radius = 45;
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
    <main className="flex-1 p-4 bg-gray-100 text-black">
      <h2 className="text-xl font-bold mb-4">Welcome to Piso Wifi Portal</h2>
      <p className="mb-4">This is a simple portal for Piso WiFi users.</p>

      {!isVerified ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md max-w-sm mx-auto mb-6"
        >
          <div className="mb-4 text-center">
            <label className="block text-gray-700 font-medium mb-2">
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
                  className="w-10 h-10 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Connect
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded shadow-md max-w-sm mx-auto mb-6 text-center">
          <h3 className="text-xl font-bold text-green-600 mb-4">
            {isTimeUp ? "Time's Up!" : "Coupon Verified!"}
          </h3>
          {!isTimeUp && (
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full">
                {/* Background circle */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="45"
                  stroke="gray"
                  strokeWidth="5"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="45"
                  stroke={getCircleColor()} // Dynamic color
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 45}
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
          {isTimeUp && <p className="text-red-500">Your session has ended.</p>}
          {!isTimeUp && (
            <p className="text-gray-500">Enjoy your internet connection!</p>
          )}
        </div>
      )}

      <button
        onClick={handleReset}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200 mt-4"
      >
        Reset
      </button>

      <Rates />
    </main>
  );
}
