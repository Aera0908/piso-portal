import { Bar, Pie } from "react-chartjs-2"; // Import Bar and Pie charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import coupons from "../data/coupons.json"; // Import coupons data

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  // Convert coupons object to an array for easier manipulation
  const couponList = Object.entries(coupons).map(([code, details]) => ({
    code,
    value: details.value,
    status: details.status,
    date: details.date,
  }));

  // Sort coupons by date (most recent first)
  const sortedCouponList = couponList.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const couponsPerPage = 10;

  // Count coupon statuses
  const unusedCount = couponList.filter(
    (coupon) => coupon.status === "Unused"
  ).length;
  const activeCount = couponList.filter(
    (coupon) => coupon.status === "Active"
  ).length;
  const expiredCount = couponList.filter(
    (coupon) => coupon.status === "Expired"
  ).length;

  // Pagination logic
  const indexOfLastCoupon = currentPage * couponsPerPage;
  const indexOfFirstCoupon = indexOfLastCoupon - couponsPerPage;
  const currentCoupons = sortedCouponList.slice(
    indexOfFirstCoupon,
    indexOfLastCoupon
  );

  const totalPages = Math.ceil(sortedCouponList.length / couponsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate data for the last 7 days
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split("T")[0]); // Format: YYYY-MM-DD
    }
    return days;
  };

  const last7Days = getLast7Days();

  // Calculate daily revenue for the last 7 days
  const dailyRevenue = last7Days.map((day) => {
    return couponList
      .filter((coupon) => coupon.date === day)
      .reduce((sum, coupon) => sum + coupon.value, 0);
  });

  // Calculate total weekly revenue (all coupons generated this week)
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Get the start of the week (Sunday)
  const weeklyRevenue = couponList
    .filter((coupon) => new Date(coupon.date) >= startOfWeek)
    .reduce((sum, coupon) => sum + coupon.value, 0);

  // Calculate total monthly revenue (all coupons generated this month)
  const currentMonth = new Date().toISOString().split("T")[0].slice(0, 7); // Format: YYYY-MM
  const monthlyRevenue = couponList
    .filter((coupon) => coupon.date.startsWith(currentMonth))
    .reduce((sum, coupon) => sum + coupon.value, 0);

  // Chart.js data for daily revenue
  const barChartData = {
    labels: last7Days, // Dates for the last 7 days
    datasets: [
      {
        label: "Daily Revenue (₱)",
        data: dailyRevenue, // Revenue for each day
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Bar color
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart.js data for coupon status distribution
  const pieChartData = {
    labels: ["Unused", "Active", "Expired"],
    datasets: [
      {
        data: [unusedCount, activeCount, expiredCount],
        backgroundColor: ["#FBBF24", "#3B82F6", "#EF4444"], // Colors for each status
        hoverBackgroundColor: ["#F59E0B", "#2563EB", "#DC2626"],
      },
    ],
  };

  // Chart.js options for daily revenue
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Revenue (Last 7 Days)",
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
        Admin Dashboard
      </h1>

      {/* Side-by-Side Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Table Section */}
        <div className="bg-white p-4 rounded-lg shadow-md flex-1 text-black">
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
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentCoupons.map((coupon, index) => (
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
                        : coupon.status === "Unused"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {coupon.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {coupon.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Coupon Status Distribution
          </h2>
          <Pie data={pieChartData} />
          <div className="mt-4 text-center">
            <p className="text-yellow-600 font-bold">Unused: {unusedCount}</p>
            <p className="text-blue-600 font-bold">Active: {activeCount}</p>
            <p className="text-red-600 font-bold">Expired: {expiredCount}</p>
          </div>
        </div>
      </div>

      {/* Weekly and Monthly Revenue */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Weekly and Monthly Revenue
        </h2>
        <p className="text-lg text-gray-700">
          <strong>Weekly Revenue:</strong> ₱{weeklyRevenue.toFixed(2)}
        </p>
        <p className="text-lg text-gray-700">
          <strong>Monthly Revenue:</strong> ₱{monthlyRevenue.toFixed(2)}
        </p>
      </div>

      {/* Daily Revenue Graph */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Daily Revenue (Last 7 Days)
        </h2>
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </div>
  );
}
