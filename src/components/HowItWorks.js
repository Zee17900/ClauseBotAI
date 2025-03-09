import React from "react";

const HowItWorks = () => {
  return (
    <section className="text-center py-16">
      <h2 className="text-3xl font-bold">How It Works</h2>
      <div className="flex justify-center space-x-6 mt-6">
        <div className="bg-gray-800 p-6 rounded-lg w-64">
          <h3 className="font-bold">🔍 Step 1</h3>
          <p className="text-gray-400">Choose a contract type and enter details.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg w-64">
          <h3 className="font-bold">🤖 Step 2</h3>
          <p className="text-gray-400">AI generates a professional contract.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg w-64">
          <h3 className="font-bold">📜 Step 3</h3>
          <p className="text-gray-400">Review, edit, and download your contract.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
