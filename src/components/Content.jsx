import Rates from "./Rates.jsx";
import React, { useState } from "react";

export default function Content() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

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
    alert(`Submitted Code: ${code.join("")}`);
  };

  return (
    <main className="flex-1 p-4 bg-gray-100 text-black">
      <h2 className="text-xl font-bold mb-4">Welcome to Piso Wifi Portal</h2>
      <p className="mb-4">This is a simple portal for Piso WiFi users.</p>

      {/* Coupon Code Input Form */}
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

      {/* Rates Component */}
      <Rates />
    </main>
  );
}
