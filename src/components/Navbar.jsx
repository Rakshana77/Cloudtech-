import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount = 0 }) => {
    return (
        <header className="fixed top-0 w-full z-50 glass-nav border-b border-slate-100">
            <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                <Link to="/" className="text-2xl font-extrabold tracking-tight text-slate-900 font-headline">
                    Cloud<span className="text-primary">Infotech</span>
                </Link>
                <div className="hidden md:flex items-center space-x-10 font-semibold text-sm text-slate-600">
                    <Link to="/products" className="text-primary relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary transition-colors">Products</Link>
                    <Link to="/solutions" className="hover:text-primary transition-colors">Solutions</Link>
                    <Link to="/support" className="hover:text-primary transition-colors">Support</Link>
                </div>
                <div className="flex items-center space-x-6">
                    <Link to="/cart" className="relative material-symbols-outlined text-slate-600 hover:text-primary transition-all hover:scale-110 active:scale-95">
                        shopping_cart
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/4 bg-red-600 rounded-full font-body">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <Link to="/dashboard" className="material-symbols-outlined text-slate-600 hover:text-primary transition-all hover:scale-110 active:scale-95">
                        account_circle
                    </Link>
                </div>
            </nav>
        </header>
    );
};
export default Navbar;
