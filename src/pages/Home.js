import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {/* Large Logo Centered */}
      <section className="text-center mt-16">
        <img src="/logo.png" alt="ClauseBot AI Large Logo" className="h-32 w-32 mx-auto mb-4" />
        <h1 className="text-5xl font-bold">AI-Powered Contract Generation</h1>
        <p className="text-lg mt-4">
          Instantly generate professional, legally sound contracts with AI.
        </p>
        <button
          onClick={() => navigate("/generate-contract")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 mt-6 rounded-lg"
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="mt-16 px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold">Instant Contracts</h3>
          <p className="text-sm mt-2">
            Generate contracts in seconds with AI-powered automation.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold">Legally Verified</h3>
          <p className="text-sm mt-2">
            AI ensures contracts follow legal best practices.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold">Secure & Private</h3>
          <p className="text-sm mt-2">
            Your data is protected with high-end encryption.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="mt-16 px-8 text-center">
        <h2 className="text-3xl font-bold">How It Works</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold">🔍 Step 1</h3>
            <p className="text-sm mt-2">
              Choose a contract type and enter basic details.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold">🤖 Step 2</h3>
            <p className="text-sm mt-2">
              AI generates a professional contract for you.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold">📜 Step 3</h3>
            <p className="text-sm mt-2">
              Review, edit, and download your contract.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 py-6 text-center text-gray-400">
        © 2025 ClauseBot AI. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
