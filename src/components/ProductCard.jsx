import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="group relative flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-1">
            <Link to={`/product/${product.id}`} className="relative h-64 overflow-hidden bg-surface-container-low block">
                <img alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={product.image || "https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&q=80&w=600"} />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button className="bg-white/80 backdrop-blur text-on-surface p-2 rounded-full shadow-sm hover:bg-white hover:text-primary transition-colors" onClick={(e) => { e.preventDefault(); }}>
                        <span className="material-symbols-outlined text-xl">favorite</span>
                    </button>
                </div>
                {product.isNew && (
                    <div className="absolute bottom-4 left-4">
                        <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">New Arrival</span>
                    </div>
                )}
            </Link>
            <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <Link to={`/product/${product.id}`}>
                        <h2 className="font-headline font-bold text-lg text-on-surface leading-tight hover:text-primary transition-colors">{product.name}</h2>
                    </Link>
                    <div className="flex items-center text-primary">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="text-xs font-bold ml-1">{product.rating || '4.9'}</span>
                    </div>
                </div>
                <p className="text-xs text-on-surface-variant font-medium mb-4">{product.description || 'Professional Surveillance Gear'}</p>
                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-on-surface leading-none">${product.price.toFixed(2)}</span>
                        {product.originalPrice && <span className="text-xs text-error font-semibold line-through decoration-error/30 mt-1">${product.originalPrice.toFixed(2)}</span>}
                    </div>
                    <button
                        onClick={() => onAddToCart(product)}
                        className="bg-gradient-to-br from-primary to-primary-container text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-md active:scale-95 transition-transform hover:opacity-90">
                        Quick Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
