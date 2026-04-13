import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-slate-100 mt-auto">
            <div className="py-20 px-8 grid grid-cols-1 md:grid-cols-4 gap-16 max-w-7xl mx-auto">
                <div className="col-span-1">
                    <div className="text-2xl font-extrabold text-slate-900 mb-6 font-headline">Cloud<span className="text-primary">Infotech</span></div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8">Securing the future with next-gen intelligence. Dedicated to world-class surveillance technology since 2010.</p>
                    <div className="flex space-x-4">
                        <a className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-100" href="#"><span className="material-symbols-outlined text-xl">language</span></a>
                        <a className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-100" href="#"><span className="material-symbols-outlined text-xl">alternate_email</span></a>
                    </div>
                </div>
                <div>
                    <h6 className="text-xs uppercase tracking-[0.2em] text-slate-900 font-black mb-8">Solutions</h6>
                    <ul className="space-y-4">
                        <li><Link className="text-slate-500 hover:text-primary text-sm font-semibold transition-colors" to="/products">Residential Security</Link></li>
                        <li><Link className="text-slate-500 hover:text-primary text-sm font-semibold transition-colors" to="/products">Enterprise Hubs</Link></li>
                        <li><Link className="text-slate-500 hover:text-primary text-sm font-semibold transition-colors" to="/support">Smart Integration</Link></li>
                    </ul>
                </div>
                <div>
                    <h6 className="text-xs uppercase tracking-[0.2em] text-slate-900 font-black mb-8">Resources</h6>
                    <ul className="space-y-4">
                        <li><Link className="text-slate-500 hover:text-primary text-sm font-semibold transition-colors" to="/support">Support Center</Link></li>
                        <li><a className="text-slate-500 hover:text-primary text-sm font-semibold transition-colors" href="#">Installation Guides</a></li>
                        <li><a className="text-slate-500 hover:text-primary text-sm font-semibold transition-colors" href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h6 className="text-xs uppercase tracking-[0.2em] text-slate-900 font-black mb-8">Newsletter</h6>
                    <p className="text-slate-500 text-sm mb-6">Stay updated with the latest in security tech.</p>
                    <div className="relative">
                        <input className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Email address" type="email" />
                        <button className="absolute right-2 top-1.5 bg-primary text-white p-1.5 rounded-lg hover:bg-primary-container transition-colors"><span className="material-symbols-outlined text-base">send</span></button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-8 py-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">© 2026 Cloud Infotech Pte. Ltd.</p>
                <div className="flex gap-8">
                    <a className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary" href="#">Terms</a>
                    <a className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary" href="#">Cookies</a>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
