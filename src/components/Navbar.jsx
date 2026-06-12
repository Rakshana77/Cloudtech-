import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navItems = [
    { name: 'Solutions', path: '/#services' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleLogoClick = (e) => {
    e.preventDefault();
    closeMobileMenu();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="w-full z-50 sticky top-0 bg-white border-b border-[#E5E7EB] shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
      {/* PREMIUM MINIMAL MAIN HEADER */}
      <header className="w-full h-[90px] flex items-center">
        <nav className="flex items-center justify-between px-6 w-full max-w-[1280px] mx-auto h-full">
          {/* Logo & Tagline (Left Column - 30% Width) */}
          <div className="w-[30%] flex justify-start">
            <a href="/" onClick={handleLogoClick} className="flex flex-col text-left py-2 group">
              <span className="text-[26px] lg:text-[28px] font-extrabold tracking-tight text-[#0F172A] leading-tight transition-colors group-hover:text-[#1453E3]">
                Cloud<span className="text-[#1453E3] group-hover:text-[#0F172A]">Infotech</span>
              </span>
              <span className="text-[10px] lg:text-xs font-semibold text-[#475569] uppercase tracking-widest leading-none mt-1">
                Laptop Sales • Security Systems
              </span>
            </a>
          </div>

          {/* Center Navigation (Center Column - 40% Width) */}
          <div className="hidden md:flex w-[40%] justify-center items-center space-x-12 h-full">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path.startsWith('/#') && location.hash === item.path.substring(1));
              return (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    if (item.path.startsWith('/#')) {
                      closeMobileMenu();
                      if (location.pathname === '/') {
                        e.preventDefault();
                        const element = document.getElementById(item.path.substring(2));
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    } else {
                      closeMobileMenu();
                    }
                  }}
                  className={`text-base font-semibold uppercase tracking-wider h-full flex items-center border-b-2 transition-all duration-200 ${
                    isActive 
                      ? 'border-[#1453E3] text-[#1453E3]' 
                      : 'border-transparent text-[#475569] hover:text-[#1453E3] hover:border-[#1453E3]/50'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Right Area (Right Column - 30% Width) */}
          <div className="w-[30%] flex justify-end items-center">
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-[#475569] hover:text-[#1453E3] p-1.5 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[90px] left-0 w-full border-b border-[#E5E7EB] bg-white px-6 py-5 space-y-4 shadow-lg flex flex-col font-semibold text-sm text-[#475569] uppercase tracking-wider z-50 text-left">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.path} 
                onClick={(e) => {
                  closeMobileMenu();
                  if (item.path.startsWith('/#') && location.pathname === '/') {
                    e.preventDefault();
                    const element = document.getElementById(item.path.substring(2));
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="py-2.5 border-b border-slate-50 hover:text-[#1453E3] block"
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
