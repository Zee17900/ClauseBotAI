import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Make sure the logo exists in assets folder

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* ✅ Fixed Navbar - Dark Background, Better Logo Size */}
      <nav className="w-full bg-gray-900 p-4 flex justify-between items-center fixed top-0 left-0 right-0 shadow-md z-50">
        <div className="flex items-center">
          <img src={logo} alt="ClauseBot AI Logo" className="h-12 w-auto mr-3" />
          <h1 className="text-2xl font-bold text-gold-400">ClauseBot AI</h1>
        </div>
        <div>
          <button className="px-5 py-2 mx-2 bg-gray-700 rounded hover:bg-gray-600">Features</button>
          <button className="px-5 py-2 mx-2 bg-gray-700 rounded hover:bg-gray-600">Pricing</button>
          <button className="px-6 py-2 mx-2 bg-blue-500 rounded hover:bg-blue-400">Login</button>
        </div>
      </nav>

      {/* ✅ Improved Hero Section - Larger Text & Button */}
      <section className="flex flex-col items-center justify-center text-center mt-32 px-6">
        <h1 className="text-6xl font-extrabold text-white">AI-Powered Contract Generation</h1>
        <p className="text-lg mt-4 text-gray-300">
          Instantly generate professional, legally sound contracts with AI.
        </p>
        <button
          onClick={() => navigate("/builder")}
          className="mt-6 px-8 py-4 bg-gold-500 text-black font-bold text-lg rounded hover:bg-gold-400 transition duration-300"
        >
          Get Started
        </button>
      </section>

      {/* ✅ Fixed Feature Boxes - More Spacing & Visibility */}
      <section className="mt-20 px-10 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
          <div className="p-6 bg-gray-800 rounded-lg text-center">
            <h3 className="text-xl font-bold text-gold-500">Instant Contracts</h3>
            <p className="text-gray-300 mt-2">Generate contracts in seconds with AI.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg text-center">
            <h3 className="text-xl font-bold text-gold-500">Legally Verified</h3>
            <p className="text-gray-300 mt-2">AI ensures contracts follow legal best practices.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg text-center">
            <h3 className="text-xl font-bold text-gold-500">Secure & Private</h3>
            <p className="text-gray-300 mt-2">Your data is protected with high-end encryption.</p>
          </div>
        </div>
      </section>

      {/* ✅ Improved How It Works - Icons Added */}
      <section className="mt-20 px-10 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-white">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl mt-10">
          <div className="p-6 bg-gray-800 rounded-lg text-center hover:bg-gray-700 transition duration-300">
            <h3 className="text-lg font-bold text-gold-500">🔍 Step 1</h3>
            <p className="text-gray-300 mt-2">Choose a contract type and enter details.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg text-center hover:bg-gray-700 transition duration-300">
            <h3 className="text-lg font-bold text-gold-500">🤖 Step 2</h3>
            <p className="text-gray-300 mt-2">AI generates a professional contract for you.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg text-center hover:bg-gray-700 transition duration-300">
            <h3 className="text-lg font-bold text-gold-500">📜 Step 3</h3>
            <p className="text-gray-300 mt-2">Review, edit, and download your contract.</p>
          </div>
        </div>
      </section>

      {/* ✅ Fixed Footer - Looks More Professional */}
      <footer className="w-full bg-gray-900 p-6 mt-20 text-center">
        <p className="text-gray-400">© 2025 ClauseBot AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
