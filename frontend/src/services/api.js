import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:8000", // Adjust for deployment if needed
});

// Automatically add token to every request if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =======================
// Product APIs
// =======================

// Add new product
export const addNewProduct = async (productData) => {
  try {
    const res = await api.post("/api/v1/products", productData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Unknown error adding product" };
  }
};

// Update product by ID
export const updateProductById = async (id, updatedData) => {
  try {
    const res = await api.put(`/api/v1/products/${id}`, updatedData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Unknown error updating product" };
  }
};

// Delete product by ID
export const deleteProduct = async (id) => {
  try {
    const res = await api.delete(`/api/v1/products/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Unknown error deleting product" };
  }
};

// Get all products
export const getAllProducts = async () => {
  try {
    const res = await api.get("/api/v1/products/");
    return res.data.products;
  } catch (err) {
    throw err.response?.data || { message: "Unknown error fetching products" };
  }
};

// Get products with price lower than value
export const getProductsLowerThan = (value) =>
  api.get(`/api/v1/products/price/lower/${value}`).then((res) => res.data);

// Get products with price higher than value
export const getProductsHigherThan = (value) =>
  api.get(`/api/v1/products/price/higher/${value}`).then((res) => res.data);

// =======================
// User APIs
// =======================

// Register user
export const signupUser = async (userData) => {
  try {
    const res = await api.post("/api/v1/users/register", userData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Signup failed" };
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const res = await api.post("/api/v1/users/login", credentials);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};

export default api;
