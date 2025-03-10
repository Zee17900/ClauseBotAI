import React from "react";
import { useNavigate } from "react-router-dom"; // Import React Router navigation

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center">
          <img src="/logo.png" alt="ClauseBot AI Logo" className="h-16 mr-3" /> {/* Increased Logo Size */}
          <h1 className="text-3xl font-bold text-gold-500">ClauseBot AI</h1>
        </div>
        <nav>
          <ul className="flex space-x-6 text-lg">
            <li><a href="#" className="hover:text-gold-400">Features</a></li>
            <li><a href="#" className="hover:text-gold-400">Pricing</a></li>
            <li><a href="#" className="hover:text-gold-400">Login</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section - Centered Logo */}
      <section className="flex flex-col items-center justify-center text-center py-20">
        <img src="/logo.png" alt="ClauseBot AI Logo" className="h-32 mb-6" /> {/* Increased Logo Size */}
        <h2 className="text-5xl font-bold">AI-Powered Contract Generation</h2>
        <p className="text-lg text-gray-400 mt-4 max-w-xl">
          Instantly generate professional, legally sound contracts with AI. 
          Save time and ensure accuracy in every agreement.
        </p>
        <button
          onClick={() => navigate("/contract-generator")}
          className="mt-6 px-8 py-4 bg-gold-500 text-black text-xl font-bold rounded hover:bg-gold-400 transition duration-300"
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 text-center">
        <h3 className="text-3xl font-bold">Why Choose ClauseBot AI?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 px-6">
          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h4 className="text-xl font-bold">Instant Contracts</h4>
            <p className="text-gray-400">Generate contracts in seconds with AI-powered automation.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h4 className="text-xl font-bold">Legally Verified</h4>
            <p className="text-gray-400">AI ensures contracts follow legal best practices.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h4 className="text-xl font-bold">Secure & Private</h4>
            <p className="text-gray-400">Your data is protected with high-end encryption.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-800">
        <p>© 2025 ClauseBot AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
