import { useNavigate } from "react-router-dom";

export default function TermsAndConditions() {
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

      <h1 className="text-3xl font-bold text-blue-700 text-center mb-6 mt-5 md: mt-0">
        Terms and Conditions
      </h1>
      <div className="text-gray-700 space-y-4 px-10 md:px-30">
        <p>
          Welcome to the CDM Piso WiFi Portal. By using our services, you agree
          to the following terms and conditions. Please read them carefully.
        </p>
        <h2 className="text-xl font-bold text-blue-700">1. Usage Policy</h2>
        <p>
          Users must ensure that the internet is used responsibly. Any misuse,
          including illegal activities, is strictly prohibited.
        </p>
        <h2 className="text-xl font-bold text-blue-700">
          2. Payment and Coupons
        </h2>
        <p>
          All payments are non-refundable. Coupons are valid for the specified
          duration and cannot be reused once redeemed.
        </p>
        <h2 className="text-xl font-bold text-blue-700">
          3. Service Availability
        </h2>
        <p>
          While we strive to provide uninterrupted service, there may be
          occasional downtimes due to maintenance or technical issues.
        </p>
        <h2 className="text-xl font-bold text-blue-700">4. Privacy Policy</h2>
        <p>
          We respect your privacy and ensure that your data is handled securely
          in accordance with our privacy policy.
        </p>
        <h2 className="text-xl font-bold text-blue-700">5. Changes to Terms</h2>
        <p>
          We reserve the right to update these terms and conditions at any time.
          Continued use of the service constitutes acceptance of the updated
          terms.
        </p>
      </div>
    </div>
  );
}
