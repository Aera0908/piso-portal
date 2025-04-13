export default function Rates() {
  return (
    <div className="rates bg-blue-50 p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        Rates
      </h2>
      <p className="text-gray-700 mb-4 text-center">
        Here are the current rate:
      </p>
      <table className="w-full border-collapse border border-blue-200">
        <thead>
          <tr className="bg-blue-100">
            <th className="border border-blue-200 px-4 py-2 text-blue-700">
              Amount
            </th>
            <th className="border border-blue-200 px-4 py-2 text-blue-700">
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-yellow-100">
            <td className="border border-blue-200 px-4 py-2 text-gray-800">
              ₱1.00
            </td>
            <td className="border border-blue-200 px-4 py-2 text-gray-800">
              5 minutes
            </td>
          </tr>
        </tbody>
      </table>
      <p className="text-gray-700 mt-4 text-center">
        For more information, please contact us.
      </p>
    </div>
  );
}
