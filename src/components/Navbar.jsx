import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { cartCount } = useCart();
  const { currentUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navItems = [
    { name: 'Solutions', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Support', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 w-full z-50 bg-white border-b border-[#E5E7EB] h-20 flex items-center">
      <nav className="flex items-center justify-between px-6 w-full max-w-[1280px] mx-auto">
        {/* Brand Logo */}
        <Link to="/" onClick={closeMobileMenu} className="text-2xl font-extrabold tracking-tight text-[#111827] flex items-center">
          <span>Cloud<span className="text-[#1453E3]">Infotech</span></span>
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center space-x-10 h-20">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-semibold uppercase tracking-wider h-full flex items-center border-b-2 transition-all duration-200 ${
                  isActive 
                    ? 'border-[#1453E3] text-[#1453E3]' 
                    : 'border-transparent text-[#475569] hover:text-[#1453E3]'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-6">
          <Link to="/cart" onClick={closeMobileMenu} className="relative text-[#475569] hover:text-[#1453E3] transition-all hover:scale-105">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white transform bg-[#1453E3] rounded-full font-sans">
                {cartCount}
              </span>
            )}
          </Link>
          
          <Link 
            to={currentUser ? "/admin/dashboard" : "/admin/login"} 
            onClick={closeMobileMenu}
            className="text-[#475569] hover:text-[#1453E3] transition-all hover:scale-105"
            aria-label="User Profile"
          >
            <User className="w-6 h-6" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-[#475569] hover:text-[#1453E3] p-1 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full border-b border-[#E5E7EB] bg-white px-6 py-4 space-y-4 shadow-md flex flex-col font-semibold text-sm text-[#475569] uppercase tracking-wider z-50">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              onClick={closeMobileMenu} 
              className="py-2 border-b border-slate-50 hover:text-[#1453E3]"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
