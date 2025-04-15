import { useState, useEffect } from "react";
import ratesData from "../data/rates.json"; // Import rates.json

export default function Rates() {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    // Load rates from the JSON file
    setRates(ratesData);
  }, []);

  return (
    <div className="rates-carousel p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
        Rates
      </h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {rates.map((rate, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-blue-700">
                {rate.duration}
              </h3>
              {rate.badge && (
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${rate.badgeColor}`}
                >
                  {rate.badge}
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-blue-700 text-left">
              {rate.price}
            </p>
            <p className="text-sm text-gray-500 text-left">
              {rate.description}
            </p>
            <div className="flex mt-4">
              <img
                src="/wifi_icon.svg"
                alt="WiFi Icon"
                className="h-6 w-6 ml-0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
