import './App.css'
import Signup from './components/SignUp'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import Dashboard from './components/Dashboard'
import HomePage from './components/Homepage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path="" element={< HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* User */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Product */}
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
