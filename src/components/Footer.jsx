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
              className="h-10 md:h-12 object-contain brightness-0 invert"
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
        <div className="flex gap-6">
          <Link className="font-semibold uppercase tracking-wider hover:text-white transition-colors" to="/contact">Terms</Link>
          <Link className="font-semibold uppercase tracking-wider hover:text-white transition-colors" to="/contact">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
