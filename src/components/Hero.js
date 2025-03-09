import React from "react";

const Hero = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold">
        AI-Powered Contract Generation
      </h1>
      <p className="text-lg md:text-xl mt-4 text-gray-300">
        Instantly generate professional, legally sound contracts with AI.
      </p>
      <button className="mt-6 px-6 py-3 bg-blue-600 rounded-md text-lg font-semibold">
        Get Started
      </button>
    </section>
  );
};

export default Hero;
