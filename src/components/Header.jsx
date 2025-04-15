import Nav from "./Nav";

export default function Header() {
  return (
    <header className="bg-white p-4 flex flex-row md:flex-row items-center justify-between border-b-4 border-[#f9cb15] sticky top-0 left-0 w-full z-50">
      {/* Logo and Title */}
      <div className="flex items-center justify-between w-full md:w-auto">
        {/* Icon */}
        <img src="/wifi_icon.svg" alt="WiFi Icon" className="h-15 w-15" />

        {/* Title */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full px-1">
          <h1 className="text-xl font-bold text-blue-700">
            CDM Piso WiFi Portal
          </h1>
          <p className="text-xs text-[#f9cb15] font-bold">
            Fast and Affordable Internet
          </p>
        </div>
      </div>

      {/* Internet Active Indicator */}
      <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full shadow-sm border border-blue-300 mt-0 md:mt-0">
        <span className="h-3 w-3 bg-green-500 rounded-full mx-auto"></span>
        <span className="text-sm font-medium text-blue-700 ml-1 hidden md:inline">
          Internet Active
        </span>
      </div>
    </header>
  );
}
