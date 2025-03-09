import React from "react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mt-8">Choose Your Plan</h1>
      <p className="text-lg mt-2 mb-8 text-gray-300">
        Pick the plan that suits you best. The first contract is free!
      </p>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        {/* Pay-per-contract */}
        <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-2">📜 Pay-Per-Contract</h2>
          <p className="text-lg text-gray-300">$1 per contract</p>
          <p className="text-sm text-gray-400 mt-2">No commitment, pay as you go.</p>
          <button
            onClick={() => navigate("/generate-contract")}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Get Started
          </button>
        </div>

        {/* Monthly Plan */}
        <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg border-2 border-blue-500">
          <h2 className="text-2xl font-bold mb-2">💼 Monthly Plan</h2>
          <p className="text-lg text-gray-300">$9.99 / month</p>
          <p className="text-sm text-gray-400 mt-2">Unlimited contracts.</p>
          <button
            onClick={() => navigate("/subscribe?plan=monthly")}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Subscribe
          </button>
        </div>

        {/* Yearly Plan */}
        <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-2">🎉 Yearly Plan</h2>
          <p className="text-lg text-gray-300">$99.99 / year</p>
          <p className="text-sm text-gray-400 mt-2">Best value - Save 20%!</p>
          <button
            onClick={() => navigate("/subscribe?plan=yearly")}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-8 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Pricing;
