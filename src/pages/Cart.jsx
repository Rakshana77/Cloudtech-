import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, ShieldCheck, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeItem, cartTotal } = useCart();
  
  const subtotal = cartTotal;
  const gstTax = subtotal * 0.07;
  const total = subtotal + gstTax;

  return (
    <main className="max-w-7xl mx-auto pt-10 pb-16 px-6 min-h-screen font-sans">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Item List Column */}
        <div className="flex-grow space-y-6 w-full lg:w-auto">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
              <span>Your Shopping Cart</span>
            </h1>
            <span className="text-slate-500 font-semibold text-xs bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
              {cart.length} items
            </span>
          </div>

          <div className="space-y-4">
            {cart.map((item) => {
              const itemPrice = item.offerPrice > 0 ? item.offerPrice : item.price;
              return (
                <div key={item.id} className="flex flex-col sm:flex-row items-stretch sm:items-center p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow transition-all gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-50 border p-2 flex items-center justify-center">
                    <img alt={item.productName} className="max-h-full max-w-full object-contain" src={item.image} />
                  </div>
                  
                  <div className="flex-grow space-y-1">
                    <span className="text-[10px] text-blue-600 font-extrabold uppercase tracking-wider">{item.brand}</span>
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{item.productName}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">SKU: {item.sku}</span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <div className="flex items-center border border-slate-300 rounded-lg p-1 bg-slate-50">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                        className="p-1 text-slate-500 hover:text-blue-600 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 font-bold text-xs text-slate-800 min-w-[20px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                        className="p-1 text-slate-500 hover:text-blue-600 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex flex-col items-end min-w-[100px]">
                      <span className="text-sm font-bold text-blue-600">
                        ${(itemPrice * item.quantity).toFixed(2)}
                      </span>
                      <button 
                        onClick={() => removeItem(item.id)} 
                        className="text-[10px] text-red-600 font-bold hover:underline mt-1 flex items-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {cart.length === 0 && (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl flex flex-col items-center space-y-4">
                <ShoppingCart className="w-12 h-12 text-slate-300" />
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Your cart is currently empty</h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">Add items from the equipment catalog to request procurement checkout.</p>
                </div>
                <Link to="/products" className="inline-flex px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow">
                  Browse Equipment
                </Link>
              </div>
            )}
          </div>

          <div className="pt-4">
            <Link to="/products" className="inline-flex items-center text-xs font-bold text-blue-600 hover:underline space-x-1">
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Summary Sidebar Column */}
        {cart.length > 0 && (
          <aside className="w-full lg:w-96 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">Order Summary</h2>
            
            <div className="space-y-3 text-xs font-semibold text-slate-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-slate-800 font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST Tax (7%)</span>
                <span className="text-slate-800 font-bold">${gstTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Scoping</span>
                <span className="text-slate-800 font-bold">Free (Promo)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
              <div>
                <span className="text-xs font-bold text-slate-700 block">Total Due</span>
                <span className="text-[10px] text-slate-400 font-medium">Secured Singapore Dispatch</span>
              </div>
              <span className="text-xl font-extrabold text-blue-600">${total.toFixed(2)}</span>
            </div>

            <Link 
              to="/checkout" 
              className="w-full flex items-center justify-center py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-blue-600/10 active:scale-95 space-x-1.5"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[11px] font-bold text-slate-700 leading-tight">Singapore Installer Guarantee</h4>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                  Includes 1-year basic manufacturer hardware scoping replacement guarantee.
                </p>
              </div>
            </div>
          </aside>
        )}

      </div>
    </main>
  );
};

export default Cart;
