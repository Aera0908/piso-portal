export default function Admin() {
  return (
    <div className="flex  justify-center min-h-131 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md max-h-86 mt-20">
        <h1 className="text-2xl font-bold text-blue-700 text-center mb-6">
          Admin Login
        </h1>
        <form className="space-y-4 text-black">
          {/* Username Field */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter admin username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
