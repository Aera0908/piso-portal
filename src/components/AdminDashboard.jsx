import coupons from "../data/coupons.json"; // Import coupons data

export default function AdminDashboard() {
  // Convert coupons object to an array for easier manipulation
  const couponList = Object.entries(coupons).map(([code, details]) => ({
    code,
    value: details.value,
    status: details.status, // Use the status from coupons.json
  }));

  // Calculate total revenue from active coupons
  const totalRevenue = couponList
    .filter((coupon) => coupon.status === "Active")
    .reduce((sum, coupon) => sum + coupon.value, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
        Admin Dashboard
      </h1>

      {/* Total Revenue */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-gray-700">Total Revenue</h2>
        <p className="text-2xl font-bold text-green-600">
          ₱{totalRevenue.toFixed(2)}
        </p>
      </div>

      {/* Internet Speed Status */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-gray-700">Internet Speed</h2>
        <p className="text-lg text-blue-700">50 Mbps</p> {/* Mock speed */}
      </div>

      {/* List of Coupons */}
      <div className="bg-white p-4 rounded-lg shadow-md text-black">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Generated Coupons
        </h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-center">
                Code
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Value (₱)
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {couponList.map((coupon, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {coupon.code}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ₱{coupon.value.toFixed(2)}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    coupon.status === "Active"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {coupon.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
