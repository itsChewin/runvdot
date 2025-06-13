import React from "react";
import { Link } from "react-router-dom";
import shoes from "../assets/shoes.png";

export default function Home() {
  return (
    <div className="bg-white-100 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Take you running to the next level.
          </h1>
          <p className="text-white-700 mb-6">
            Based on the research of <br className="md:hidden" /> Dr. Jack
            Daniels
          </p>
          <Link
            to="/calculator"
            className="inline-block bg-orange text-white px-5 py-2 rounded-full hover:bg-orange-600 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={shoes}
            alt="Spike shoes"
            className="rounded-xl w-full h-auto shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
