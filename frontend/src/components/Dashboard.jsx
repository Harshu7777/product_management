import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-300 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to the Dashboard😀 👉</h1>

      <button
        onClick={() => navigate("/add-product")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow"
      >
        Add Product
      </button>

      <button
        onClick={() => navigate("/products")}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow"
      >
        View Products
      </button>
    </div>
  );
};

export default Dashboard;
