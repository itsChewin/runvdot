import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-orange shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="RunVDOT Logo" className="h-8 w-12" />
          <span className="text-2xl font-bold">VDOT</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          <Link to="/calculator" className="hover:text-white transition">Calculator</Link>
          <Link to="/history" className="hover:text-white transition">History</Link>
          <Link to="/signin" className="hover:text-white transition"> Login </Link>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black px-6 pb-4 flex flex-col gap-4 text-lg font-medium">
          <Link to="/calculator" onClick={() => setMenuOpen(false)} className="hover:text-white">Calculator</Link>
          <Link to="/history" onClick={() => setMenuOpen(false)} className="hover:text-white">History</Link>
          <Link to="/signin" onClick={() => setMenuOpen(false)} className="hover:text-white">Login</Link>
        </div>
      )}
    </nav>
  );
}