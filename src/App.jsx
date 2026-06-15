import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { MessageCircle } from 'lucide-react';

const PageTitleHandler = () => {
  const location = useLocation();

  useEffect(() => {
    let title = 'Cloud Info Tech | Laptop Sales & CCTV Security Systems';
    const path = location.pathname;
    
    if (path === '/products') {
      title = 'Equipment Catalog | Cloud Info Tech';
    } else if (path === '/contact') {
      title = 'Contact Us | Cloud Info Tech';
    } else if (path === '/request-quote') {
      title = 'Request a Quote | Cloud Info Tech';
    } else if (path === '/cart') {
      title = 'Shopping Cart | Cloud Info Tech';
    } else if (path === '/checkout') {
      title = 'Checkout | Cloud Info Tech';
    } else if (path.startsWith('/product/')) {
      title = 'Product Details | Cloud Info Tech';
    } else if (path.startsWith('/admin')) {
      title = 'Admin Panel | Cloud Info Tech';
    }
    
    document.title = title;
  }, [location]);

  return null;
};


// Public components & pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import RequestQuote from './pages/RequestQuote';
import Contact from './pages/Contact';

// Admin portal components
import Login from './admin/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminCategories from './admin/AdminCategories';
import AdminBrands from './admin/AdminBrands';
import AdminQuotations from './admin/AdminQuotations';
import AdminBanners from './admin/AdminBanners';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <PageTitleHandler />
          <Routes>
            {/* Admin Routes with distinct layout */}
            <Route path="/admin/login" element={<Login />} />
            
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="brands" element={<AdminBrands />} />
              <Route path="quotations" element={<AdminQuotations />} />
              <Route path="banners" element={<AdminBanners />} />
            </Route>

            {/* Public Layout and Routes */}
            <Route path="/*" element={
              <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductListing />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/request-quote" element={<RequestQuote />} />
                    <Route path="/contact" element={<Contact />} />
                    
                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
                {/* Floating WhatsApp button */}
                <a 
                  href="https://wa.me/6581234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fixed bottom-8 right-8 z-50 bg-[#1453E3] hover:bg-[#1453E3]/90 text-white p-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all animate-bounce"
                  aria-label="Contact sales desk on WhatsApp"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            } />
          </Routes>

        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
