import React, { useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button (Visible in Mobile) */}
      <button
        className="md:hidden text-white focus:outline-none z-20"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      {/* Blackout Background */}
      <div
        className={`fixed inset-0 bg-black transition-opacity ${
          isOpen ? "opacity-50 visible" : "opacity-0 invisible"
        } z-10`}
        onClick={toggleMenu}
      ></div>

      {/* Slide Drawer (Mobile) */}
      <nav
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-20`}
      >
        <button
          className="absolute top-4 right-4 text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <ul className="mt-16 space-y-4 px-6">
          <li>
            <a
              href="#"
              className="block text-lg hover:text-blue-400 transition"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-lg hover:text-blue-400 transition"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-lg hover:text-blue-400 transition"
            >
              Help
            </a>
          </li>
        </ul>
      </nav>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex space-x-4">
        <a href="#" className="text-white hover:text-blue-400 transition">
          Home
        </a>
        <a href="#" className="text-white hover:text-blue-400 transition">
          About
        </a>
        <a href="#" className="text-white hover:text-blue-400 transition">
          Help
        </a>
      </nav>
    </>
  );
};

export default Nav;
