import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0F172A] text-slate-300 border-t border-slate-800 mt-auto font-sans">
      <div className="py-20 px-6 max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 text-left">
        {/* Column 1: Company About */}
        <div className="space-y-6 lg:col-span-1">
          <div className="text-2xl font-extrabold text-white">
            Cloud<span className="text-[#1453E3]">Infotech</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed font-semibold">
            Specializing in laptop sales, motherboard repairs, networking deployment and enterprise CCTV security solutions.
          </p>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            Laptop Sales • Security Systems
          </div>
        </div>

        {/* Column 2: Solutions */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase font-extrabold text-white tracking-widest">Solutions</h4>
          <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
            <li><a href="/#services" className="hover:text-white transition-colors">Laptop Sales</a></li>
            <li><a href="/#services" className="hover:text-white transition-colors">Laptop Repairs</a></li>
            <li><a href="/#services" className="hover:text-white transition-colors">CCTV Solutions</a></li>
            <li><a href="/#services" className="hover:text-white transition-colors">Networking Services</a></li>
          </ul>
        </div>

        {/* Column 3: Products */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase font-extrabold text-white tracking-widest">Products</h4>
          <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
            <li><Link to="/products?tab=laptops" className="hover:text-white transition-colors">Laptops & IT Gear</Link></li>
            <li><Link to="/products?tab=security" className="hover:text-white transition-colors">CCTV Cameras</Link></li>
            <li><Link to="/products?tab=security" className="hover:text-white transition-colors">NVR/DVR Hubs</Link></li>
            <li><Link to="/products?tab=security" className="hover:text-white transition-colors">Access Control</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase font-extrabold text-white tracking-widest">Contact</h4>
          <ul className="space-y-3 text-xs font-semibold text-slate-400">
            <li className="flex items-start space-x-2">
              <MapPin className="w-3.5 h-3.5 mt-0.5 text-slate-500 flex-shrink-0" />
              <span>123 Ubi Avenue 4, #01-23 Ubi Techpark, Singapore 408799</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-[#1453E3]" />
              <a href="tel:+6581234567" className="hover:text-white transition-colors">+65 8123 4567</a>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <a href="mailto:info@cloudinfotech.com" className="hover:text-white transition-colors">info@cloudinfotech.com</a>
            </li>
          </ul>
        </div>

        {/* Column 5: Support */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase font-extrabold text-white tracking-widest">Support</h4>
          <ul className="space-y-3 text-xs font-semibold text-slate-400">
            <li><Link to="/contact" className="hover:text-white transition-colors">Support Center</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Request Service</Link></li>
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
        <p className="font-semibold uppercase tracking-wider">© 2026 Cloud Infotech Pte. Ltd. All rights reserved.</p>
        <div className="flex gap-6">
          <a className="font-semibold uppercase tracking-wider hover:text-white" href="#">Terms</a>
          <a className="font-semibold uppercase tracking-wider hover:text-white" href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
