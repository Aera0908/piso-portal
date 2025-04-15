import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
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
        Privacy Policy
      </h1>
      <div className="text-gray-700 space-y-4 px-10 md:px-30">
        <p>
          At CDM Piso WiFi Portal, we value your privacy and are committed to
          protecting your personal information. This Privacy Policy outlines how
          we collect, use, and safeguard your data.
        </p>
        <h2 className="text-xl font-bold text-blue-700">
          1. Information We Collect
        </h2>
        <p>
          We may collect personal information such as your name, email address,
          and payment details when you use our services. Additionally, we may
          collect non-personal information such as your device type and IP
          address.
        </p>
        <h2 className="text-xl font-bold text-blue-700">
          2. How We Use Your Information
        </h2>
        <p>
          Your information is used to provide and improve our services, process
          payments, and communicate with you. We do not sell or share your
          personal information with third parties without your consent.
        </p>
        <h2 className="text-xl font-bold text-blue-700">3. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your data
          from unauthorized access, disclosure, or destruction.
        </p>
        <h2 className="text-xl font-bold text-blue-700">4. Cookies</h2>
        <p>
          Our website uses cookies to enhance your browsing experience. You can
          disable cookies in your browser settings, but this may affect the
          functionality of our services.
        </p>
        <h2 className="text-xl font-bold text-blue-700">
          5. Changes to This Policy
        </h2>
        <p>
          We reserve the right to update this Privacy Policy at any time. We
          encourage you to review this page periodically for any changes.
        </p>
        <h2 className="text-xl font-bold text-blue-700">6. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at cdmpisowifi@example.com.
        </p>
      </div>
    </div>
  );
}
