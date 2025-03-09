import React from "react";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      {/* Title Section */}
      <h1 className="text-5xl font-bold mt-10 text-center">🚀 Our Features</h1>
      <p className="text-lg mt-4 text-gray-300 text-center">
        Discover the powerful AI-driven features of ClauseBot AI.
      </p>

      {/* Features Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Feature 1 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-bold">⚡ Instant Contracts</h3>
          <p className="text-sm mt-2">
            Generate contracts in seconds with AI automation.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-bold">✅ Legally Verified</h3>
          <p className="text-sm mt-2">
            AI ensures all contracts follow legal best practices.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-bold">🔒 Secure & Private</h3>
          <p className="text-sm mt-2">
            Your data is protected with high-end encryption.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-bold">📂 Multiple Contract Types</h3>
          <p className="text-sm mt-2">
            Generate rental, employment, service, and partnership contracts.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-bold">🖊️ Editable Contracts</h3>
          <p className="text-sm mt-2">
            Edit and customize contracts before finalizing.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-bold">📄 Download in PDF</h3>
          <p className="text-sm mt-2">
            Easily download your contract in PDF format.
          </p>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 mt-10 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        🔙 Back to Home
      </button>
    </div>
  );
};

export default Features;
