import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';

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
      <header className="w-full h-12 md:h-14 lg:h-16 flex items-center">
        <nav className="flex items-center justify-between px-6 w-full max-w-[1280px] mx-auto h-full">
          {/* Logo & Tagline (Left Column - 30% Width) */}
          <div className="w-[45%] md:w-[30%] flex justify-start">
            <a href="/" onClick={handleLogoClick} className="flex items-center text-left py-1 group" aria-label="Cloud Info Tech Shop Homepage">
              <img 
                src="/images/logo.png" 
                alt="Cloud Info Tech Shop" 
                className="h-8 sm:h-9 md:h-10 lg:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
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
                  className={`text-sm lg:text-base font-semibold uppercase tracking-wider h-full flex items-center border-b-2 transition-all duration-200 ${
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
          <div className="w-[55%] md:w-[30%] flex justify-end items-center space-x-4">
            <a 
              href="tel:+6567471104"
              className="hidden lg:inline-flex items-center px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition-all shadow-sm gap-1.5 min-h-[44px]"
              aria-label="Call sales team"
            >
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>+65 6747 1104</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-[#475569] hover:text-[#1453E3] p-2 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1453E3] min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Slide-in Drawer Menu */}
        <div 
          className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop overlay */}
          <div 
            onClick={closeMobileMenu}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <div 
            className={`absolute top-0 right-0 w-72 sm:w-80 h-full bg-white shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-out transform ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <span className="font-bold text-slate-800 text-sm tracking-wider uppercase">Navigation</span>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1453E3] min-h-[44px] min-w-[44px]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="mt-8 flex flex-col space-y-5 text-left font-semibold text-base text-[#475569] uppercase tracking-wider">
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
                    className="py-2 hover:text-[#1453E3] border-b border-slate-50 transition-colors block"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Drawer Footer / Call Action CTAs */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <a 
                href="https://wa.me/6581234567" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20BA56] text-white py-3.5 rounded-xl text-sm font-bold transition-all shadow-md min-h-[44px]"
                aria-label="WhatsApp support chat"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Support</span>
              </a>
              <a 
                href="tel:+6567471104"
                className="w-full flex items-center justify-center space-x-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 py-3.5 rounded-xl text-sm font-bold transition-all shadow-sm min-h-[44px]"
                aria-label="Call sales desk"
              >
                <Phone className="w-4 h-4 text-slate-400" />
                <span>Call +65 6747 1104</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
