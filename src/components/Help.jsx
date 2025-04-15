import { useNavigate } from "react-router-dom";

export default function Help() {
  const navigate = useNavigate(); // Hook to navigate between routes

  return (
    <div className="p-6 w-full mx-auto bg-white relative">
      {/* Go Back Button */}
      <button
        onClick={() => navigate("/")} // Navigate back to the index page
        className="relative mx-auto md:absolute md:top-4 md:left-4 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition duration-200"
      >
        Go Back
      </button>

      <h1 className="text-3xl font-bold text-blue-700 text-center mb-6 mt-5 md:mt-0">
        Help
      </h1>
      <div className="text-gray-700 space-y-4 px-10 md:px-30 justify-items-start text-left">
        <h2 className="text-xl font-bold text-blue-700">1. How to Connect</h2>
        <p>
          To connect to the Piso WiFi, simply enter your coupon code on the
          portal page and click "Connect." Ensure your device is connected to
          the WiFi network before entering the code.
        </p>
        <h2 className="text-xl font-bold text-blue-700">
          2. How to Purchase Coupons
        </h2>
        <p>
          Coupons can be purchased from authorized vendors or directly from the
          Piso WiFi machine. Follow the instructions on the machine to insert
          coins and receive your coupon code.
        </p>
        <h2 className="text-xl font-bold text-blue-700">3. Troubleshooting</h2>
        <p>
          If you encounter issues, try the following:
          <ul className="list-disc ml-6">
            <li>Ensure your device is connected to the WiFi network.</li>
            <li>Check if your coupon code is valid and not expired.</li>
            <li>Restart your device and try again.</li>
          </ul>
        </p>
        <h2 className="text-xl font-bold text-blue-700">4. Contact Support</h2>
        <p>
          If you need further assistance, please contact us at:
          <br />
          <strong>Phone:</strong> 09123456789
          <br />
          <strong>Email:</strong> cdmpisowifi@example.com
        </p>
      </div>
    </div>
  );
}
