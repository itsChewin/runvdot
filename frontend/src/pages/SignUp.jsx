import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password == confirmPassword) {
      toast.success("Account created! You can now sign in.");
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, {
        name: username,
        email: email,
        password: password,
      });

      navigate("/signin");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (err.response?.data?.errors &&
            Object.values(err.response.data.errors)[0][0]) ||
          "Registration failed."
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-grayBg flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/3 -translate-y-1/2 text-sm text-gray-600 hover:text-black"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
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
              Create Account
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-orange hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
