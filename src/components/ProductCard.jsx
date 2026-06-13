import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, Info, PhoneCall } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const discount = product.offerPrice > 0 ? Math.round(((product.price - product.offerPrice) / product.price) * 100) : 0;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[18px] shadow-[0_8px_25px_rgba(15,23,42,0.06)] hover:scale-[1.05] hover:-translate-y-1.5 hover:shadow-lg hover:border-[#1453E3]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden relative group">
      <Link to={`/product/${product.id}`} className="relative h-56 overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center p-4">
        <img 
          alt={product.productName} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" 
          src={product.image || "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=200"} 
        />
        
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded shadow">
            -{discount}% OFF
          </div>
        )}

        {product.featured && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded shadow">
            FEATURED
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between items-start gap-2">
            <span className="text-[10px] text-blue-600 font-extrabold uppercase tracking-wider">
              {product.brand}
            </span>
            <div className="flex items-center text-amber-500 text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold ml-1 text-slate-600">4.9</span>
            </div>
          </div>
          
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-tight hover:text-blue-600 transition-colors line-clamp-2">
              {product.productName}
            </h3>
          </Link>
          <span className="text-[10px] text-slate-400 font-mono block">SKU: {product.sku}</span>
        </div>

        {/* Stock status conditions */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {product.offerPrice > 0 ? (
                <>
                  <span className="text-base font-extrabold text-blue-600">${product.offerPrice.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-400 line-through">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-base font-extrabold text-slate-800">${product.price.toFixed(2)}</span>
              )}
            </div>

            {/* Badge details */}
            {product.status === 'inactive' ? (
              <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                Unavailable
              </span>
            ) : product.stockQuantity > 0 ? (
              <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                In Stock
              </span>
            ) : (
              <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-100">
                Out Of Stock
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            {/* Get Quote on WhatsApp Button */}
            <a
              href={`https://wa.me/6581234567?text=${encodeURIComponent(
                `Hello Cloud Info Tech,\n\nI am interested in:\n\n${product.productName}\n\nPlease share:\n\n* Pricing\n* Installation charges\n* Warranty details\n\nThank you.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors space-x-1.5 shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Get Quote on WhatsApp</span>
            </a>

            {/* Quick View Button */}
            <Link
              to={`/product/${product.id}`}
              className="w-full flex items-center justify-center py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg transition-colors bg-white"
            >
              <span>Quick View</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;
