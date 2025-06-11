import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
        👋 Welcome to the Product Management App
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Please <Link to="/login" className="text-black-600 rounded-3xl px-4 py-2 bg-blue-300">Login</Link> or <Link to="/signup" className="text-black-600 rounded-3xl px-4 py-2 bg-green-300">Signup</Link> to continue.
      </p>
    </div>
  );
};

export default HomePage;
