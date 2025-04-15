export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center">
      {/* Copyright Section */}
      <p className="text-sm mb-2 sm:mb-0">
        © 2025 CDM Piso WiFi Portal. All rights reserved.
      </p>

      {/* Links Section */}
      <div className="flex space-x-4">
        <a href="/help" className="text-yellow-400 text-sm hover:underline">
          Help
        </a>
        <a href="/terms" className="text-yellow-400 text-sm hover:underline">
          Terms
        </a>
        <a href="/privacy" className="text-yellow-400 text-sm hover:underline">
          Privacy
        </a>
      </div>
    </footer>
  );
}
