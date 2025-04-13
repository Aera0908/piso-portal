import Nav from "./Nav";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between relative">
      {/* Logo */}
      <img src="/cdm_logo.png" alt="CDM Logo" className="h-10 w-10" />

      {/* Title */}
      <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
        CDM Piso WiFi Portal
      </h1>

      {/* Navigation */}
      <Nav />
    </header>
  );
}
