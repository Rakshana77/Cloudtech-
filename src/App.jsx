import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import Dashboard from './pages/Dashboard';

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const updateQuantity = (id, newQty) => {
    setCart((prev) => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const placeOrder = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar cartCount={cartCount} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
            <Route path="/products" element={<ProductListing onAddToCart={handleAddToCart} />} />
            <Route path="/product/:id" element={<ProductDetails onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeItem={removeItem} />} />
            <Route path="/checkout" element={<Checkout cart={cart} placeOrder={placeOrder} />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Fallback routes */}
            <Route path="/solutions" element={<div className="p-20 text-center">Solutions Page (Coming Soon)</div>} />
            <Route path="/support" element={<div className="p-20 text-center">Support Page (Coming Soon)</div>} />
            <Route path="/about" element={<div className="p-20 text-center">About Page (Coming Soon)</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
