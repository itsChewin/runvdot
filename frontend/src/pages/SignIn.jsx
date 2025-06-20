import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    toast.success("Signing in successfully!");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          email,
          password,
        }
      );

      // ✅ Save token to localStorage
      localStorage.setItem("token", res.data.token);

      login(res.data.user); // this is your context login
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );

      if (err.response?.status === 401) {
        toast.error(
          "Invalid credentials. Please check your email and password."
        );
      } else {
        toast.error("Login failed. Try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-grayBg flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          Sign In
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange placeholder-gray-400"
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/3 -translate-y-1/2 text-sm text-gray-600 hover:text-black"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="flex justify-center mt-1">
            <button
              type="submit"
              className="inline-block bg-orange text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-orange hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
