import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNewProduct } from '../services/api.js';

const ProductForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product_id: '',
    name: '',
    price: '',
    company: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewProduct(formData);
      setMessage('✅ Product added successfully!');
      setFormData({ product_id: '', name: '', price: '', company: '' });
      setTimeout(() => navigate('/dashboard'), 1000); // optional delay for UX
    } catch (err) {
      setMessage(err.message || '❌ Error adding product.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border-1 rounded-2xl mt-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product ID */}
        <div>
          <label htmlFor="product_id" className="block text-sm font-semibold text-gray-700 mb-1">
            Product ID
          </label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            placeholder="Enter Product ID"
            value={formData.product_id}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Product Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-1">
            Company
          </label>
          <input
            type="text"
            name="company"
            id="company"
            placeholder="Enter Company Name"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Add Product
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className="mt-4 text-sm text-center text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
};

export default ProductForm;
