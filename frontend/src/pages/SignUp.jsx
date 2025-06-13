import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-grayBg flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">Sign Up</h2>
        <form>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
          />

          <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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

          <div className="flex justify-center mt-1">
          <Link
            type="submit"
            className="inline-block bg-orange text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition"
          >
            Create Account
          </Link>
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