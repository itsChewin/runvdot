import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="bg-black text-orange shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="RunVDOT Logo" className="h-8 w-12" />
          <span className="text-2xl font-bold">VDOT</span>
        </Link>

        <div className="hidden md:flex space-x-8 text-lg font-medium items-center">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/calculator" className="hover:text-white transition">Calculator</Link>
          <Link to="/history" className="hover:text-white transition">History</Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-orange text-white px-4 py-1.5 rounded-full hover:bg-opacity-90 transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/signin" className="hover:text-white transition">Login</Link>
          )}
        </div>

        <button
          className="md:hidden text-orange-500 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black px-6 pb-4 flex flex-col gap-4 text-lg font-medium">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-white">Home</Link>
          <Link to="/calculator" onClick={() => setMenuOpen(false)} className="hover:text-white">Calculator</Link>
          <Link to="/history" onClick={() => setMenuOpen(false)} className="hover:text-white">History</Link>
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-left hover:text-white"
            >
              Logout
            </button>
          ) : (
            <Link to="/signin" onClick={() => setMenuOpen(false)} className="hover:text-white">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}