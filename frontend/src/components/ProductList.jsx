import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllProducts,
  deleteProduct,
  updateProductById,
  getProductsLowerThan,
  getProductsHigherThan,
} from "../services/api";

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filterPrice, setFilterPrice] = useState("");
  const [filterType, setFilterType] = useState("none");
  const [message, setMessage] = useState("");

  // States for editing
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    company: "",
  });

  const fetchProducts = async () => {
    try {
      let data;
      if (filterType === "lower" && filterPrice) {
        data = await getProductsLowerThan(filterPrice);
      } else if (filterType === "higher" && filterPrice) {
        data = await getProductsHigherThan(filterPrice);
      } else {
        data = await getAllProducts();
      }

      setProducts(Array.isArray(data.products) ? data.products : data);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage(err.response?.data?.message || "Error fetching products.");
    }
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditForm({
      name: product.name,
      price: product.price,
      company: product.company,
    });
  };

  const handleEditChange = (e) => {
    setEditForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditSubmit = async (id) => {
    try {
      await updateProductById(id, editForm);
      setMessage("✅ Product updated!");
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error updating product.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setMessage("✅ Product deleted!");
      fetchProducts();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error deleting product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filterType, filterPrice]);

  return (
    <div className="p-4 max-w-3xl mx-auto  ">
      <h2 className="text-2xl font-bold mb-4">📦 Product List</h2>

      <div className="flex gap-3 mb-6">
        <input
          type="number"
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
          placeholder="Enter price"
          className="p-2 border border-gray-300 rounded w-40"
        />
        <button
          onClick={() => setFilterType("lower")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Lower Than
        </button>
        <button
          onClick={() => setFilterType("higher")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Higher Than
        </button>
        <button
          onClick={() => {
            setFilterType("none");
            setFilterPrice("");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {message && <p className="mb-4 text-sm text-red-600">{message}</p>}

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) =>
            editingId === product._id ? (
              <li
                key={product._id}
                className="border rounded p-4 shadow space-y-2"
              >
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  placeholder="Name"
                  className="w-full p-2 border rounded"
                />
                <input
                  name="price"
                  type="number"
                  value={editForm.price}
                  onChange={handleEditChange}
                  placeholder="Price"
                  className="w-full p-2 border rounded"
                />
                <input
                  name="company"
                  value={editForm.company}
                  onChange={handleEditChange}
                  placeholder="Company"
                  className="w-full p-2 border rounded"
                />
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditSubmit(product._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                  >
                    ✅ Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </li>
            ) : (
              <li
                key={product._id}
                className="flex justify-between items-center border rounded p-4 shadow"
              >
                <div>
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    ₹{product.price} | {product.company}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => startEdit(product)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      )}

      <button
        onClick={() => navigate("/dashboard")}
        className="bg-red-500 mt-8 hover:bg-red-600 text-white px-5 py-2 rounded text-sm"
      >
        👈 Go back to Dashboard
      </button>
    </div>
  );
};

export default ProductList;
