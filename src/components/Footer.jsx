import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0F172A] text-slate-300 border-t border-slate-800 mt-auto font-sans">
      <div className="py-20 px-6 max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 text-left">
        {/* Column 1: Company About */}
        <div className="space-y-6 lg:col-span-1">
          <Link to="/" className="hover:opacity-90 transition-opacity block w-fit">
            <img 
              src="/images/logo.png" 
              alt="Cloud Info Tech Shop" 
              className="h-10 md:h-12 object-contain"
            />
          </Link>
          <p className="text-slate-400 text-xs leading-relaxed font-semibold">
            Specializing in{' '}
            <Link to="/products?tab=laptops" className="hover:text-white underline decoration-[#1453E3] underline-offset-2 transition-colors">
              laptop sales
            </Link>
            ,{' '}
            <Link to="/contact" className="hover:text-white underline decoration-[#1453E3] underline-offset-2 transition-colors">
              motherboard repairs
            </Link>
            ,{' '}
            <Link to="/contact" className="hover:text-white underline decoration-[#1453E3] underline-offset-2 transition-colors">
              networking deployment
            </Link>{' '}
            and enterprise{' '}
            <Link to="/products?tab=security" className="hover:text-white underline decoration-[#1453E3] underline-offset-2 transition-colors">
              CCTV security solutions
            </Link>
            .
          </p>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex flex-wrap items-center gap-1.5">
            <Link to="/products?tab=laptops" className="hover:text-slate-300 transition-colors">Laptop Sales</Link>
            <span>•</span>
            <Link to="/products?tab=security" className="hover:text-slate-300 transition-colors">Security Systems</Link>
          </div>
        </div>

        {/* Column 2: Solutions */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase font-extrabold text-white tracking-widest">Solutions</h4>
          <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
            <li><Link to="/products?tab=laptops" className="hover:text-white transition-colors">Laptop Sales</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Laptop Repairs</Link></li>
            <li><Link to="/products?tab=security" className="hover:text-white transition-colors">CCTV Solutions</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Networking Services</Link></li>
          </ul>
        </div>

        {/* Column 3: Products */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase font-extrabold text-white tracking-widest">Products</h4>
          <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
            <li><Link to="/products?tab=laptops" className="hover:text-white transition-colors">Laptops & IT Gear</Link></li>
            <li><Link to="/products?tab=security&category=CCTV%20Cameras" className="hover:text-white transition-colors">CCTV Cameras</Link></li>
            <li><Link to="/products?tab=security&category=NVR%20Systems" className="hover:text-white transition-colors">NVR/DVR Hubs</Link></li>
            <li><Link to="/products?tab=security&category=Access%20Control" className="hover:text-white transition-colors">Access Control</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase font-extrabold text-white tracking-widest">Contact</h4>
          <ul className="space-y-3 text-xs font-semibold text-slate-400">
            <li className="flex items-start space-x-2">
              <MapPin className="w-3.5 h-3.5 mt-0.5 text-slate-500 flex-shrink-0" />
              <a 
                href="https://maps.google.com/?q=10+Ubi+Crescent,+%2304-32,+Singapore+408564" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                10 Ubi Crescent, #04-32, Singapore 408564
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-[#1453E3]" />
              <a href="tel:+6567471104" className="hover:text-white transition-colors">+65 6747 1104</a>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <a href="mailto:sales@cloudinfotechshop.com" className="hover:text-white transition-colors">sales@cloudinfotechshop.com</a>
            </li>
          </ul>
        </div>

        {/* Column 5: Support */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase font-extrabold text-white tracking-widest">Support</h4>
          <ul className="space-y-3 text-xs font-semibold text-slate-400">
            <li><Link to="/contact" className="hover:text-white transition-colors">Support Center</Link></li>
            <li><Link to="/request-quote" className="hover:text-white transition-colors">Request Service</Link></li>
            <li className="pt-2">
              <a 
                href="https://wa.me/6581234567" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center space-x-1.5 bg-[#25D366] hover:bg-[#20BA56] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Support</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
        <p className="font-semibold uppercase tracking-wider">© 2026 Cloud Infotech Shop. All rights reserved.</p>
        
        {/* Social Links */}
        <div className="flex items-center space-x-5 my-2 md:my-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Cloud Infotech Shop on Facebook">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Cloud Infotech Shop on Twitter">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Cloud Infotech Shop on Instagram">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Cloud Infotech Shop on LinkedIn">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>

        <div className="flex gap-6">
          <Link className="font-semibold uppercase tracking-wider hover:text-white transition-colors" to="/contact">Terms</Link>
          <Link className="font-semibold uppercase tracking-wider hover:text-white transition-colors" to="/contact">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
