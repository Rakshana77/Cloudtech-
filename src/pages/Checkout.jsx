import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CreditCard, Wallet, Coins, ShieldCheck, ShoppingCart, User, MapPin, Truck, ChevronLeft, Loader2, CheckCircle2 } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const subtotal = cartTotal;
  const gstTax = subtotal * 0.07;
  const total = subtotal + gstTax;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment transaction
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
      clearCart();
    }, 2000);
  };

  if (completed) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center font-sans p-6">
        <div className="p-4 bg-emerald-100 rounded-full text-emerald-600 border border-emerald-200 mb-4 animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Secure Purchase Completed</h2>
        <p className="text-sm text-slate-500 max-w-sm mt-2 leading-relaxed">
          Your payment transaction was processed successfully. A dispatch engineer is matching hardware availability and your installation SLA schedule.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow"
        >
          Return to Storefront
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Checkout Steps Form */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1: Customer Contact */}
            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
                <User className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-800 text-sm uppercase">1. Customer Contact & Delivery</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">First Name *</label>
                  <input required type="text" className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs" placeholder="John" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Last Name *</label>
                  <input required type="text" className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs" placeholder="Doe" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">CCTV Installation Location Address *</label>
                  <input required type="text" className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs" placeholder="10 Ubi Crescent, #04-32 Tech Hub" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Postal Code *</label>
                  <input required type="text" className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs" placeholder="408564" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Phone Contact *</label>
                  <input required type="tel" className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-xs" placeholder="+65 8123 4567" />
                </div>
              </div>
            </section>

            {/* Step 2: Shipping Options */}
            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
                <Truck className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-800 text-sm uppercase">2. Logistics Dispatch</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative p-4 border rounded-xl flex items-center justify-between cursor-pointer hover:border-blue-500 transition-colors">
                  <input type="radio" name="dispatch_opt" defaultChecked className="text-blue-600 border-slate-300 focus:ring-blue-500" />
                  <div className="text-left flex-grow pl-3">
                    <span className="block text-xs font-bold text-slate-800">Singapore Standard Express</span>
                    <span className="block text-[10px] text-slate-400">3-5 Business Days Delivery</span>
                  </div>
                  <span className="text-xs font-bold text-blue-600">Free</span>
                </label>
                
                <label className="relative p-4 border rounded-xl flex items-center justify-between cursor-pointer hover:border-blue-500 transition-colors">
                  <input type="radio" name="dispatch_opt" className="text-blue-600 border-slate-300 focus:ring-blue-500" />
                  <div className="text-left flex-grow pl-3">
                    <span className="block text-xs font-bold text-slate-800">Immediate Site SLA Dispatch</span>
                    <span className="block text-[10px] text-slate-400">Next Day Tech Delivery</span>
                  </div>
                  <span className="text-xs font-bold text-blue-600">$15.00</span>
                </label>
              </div>
            </section>

            {/* Step 3: Payment */}
            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-800 text-sm uppercase">3. Secure Payment Scoping</h3>
              </div>

              <div className="space-y-4">
                {/* Simulated credit card forms */}
                <div className="p-4 border border-blue-500 bg-blue-50/10 rounded-xl space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span>Credit / Debit Card</span>
                    </div>
                    <span className="text-slate-400">Visa / Mastercard</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-3">
                      <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Card Number</label>
                      <input required type="text" className="block w-full px-3 py-2 border border-slate-300 rounded bg-white text-xs" placeholder="4000 1234 5678 9010" />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Expiry Date</label>
                      <input required type="text" className="block w-full px-3 py-2 border border-slate-300 rounded bg-white text-xs" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Security CVC</label>
                      <input required type="password" className="block w-full px-3 py-2 border border-slate-300 rounded bg-white text-xs" placeholder="***" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button type="button" className="flex-1 p-3 border rounded-xl text-[11px] font-bold text-slate-500 hover:bg-slate-50 flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Wallet className="w-4 h-4" />
                      <span>Digi Wallet / PayNow</span>
                    </span>
                  </button>
                  <button type="button" className="flex-1 p-3 border rounded-xl text-[11px] font-bold text-slate-500 hover:bg-slate-50 flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Coins className="w-4 h-4" />
                      <span>Cash on Delivery</span>
                    </span>
                  </button>
                </div>
              </div>
            </section>

          </div>

          {/* Checkout sidebar list */}
          <aside className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
              <ShoppingCart className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-800 text-sm uppercase">Cart Summary</h3>
            </div>

            <div className="space-y-4 max-h-[200px] overflow-y-auto pr-1">
              {cart.map((item) => {
                const itemPrice = item.offerPrice > 0 ? item.offerPrice : item.price;
                return (
                  <div key={item.id} className="flex space-x-3 items-start">
                    <div className="w-10 h-10 border rounded p-1 flex items-center justify-center bg-slate-50 flex-shrink-0">
                      <img src={item.image} alt={item.productName} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-xs font-bold text-slate-700 truncate">{item.productName}</h4>
                      <span className="text-[10px] text-slate-400 block leading-none">Qty: {item.quantity}</span>
                      <span className="text-xs font-bold text-blue-600 block mt-1">${(itemPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-slate-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST Tax (7%)</span>
                <span className="text-slate-800">${gstTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-800 font-bold text-sm pt-2">
                <span>Total</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="w-full flex items-center justify-center py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Complete Security Purchase'
              )}
            </button>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start space-x-3">
              <ShieldCheck className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                By purchasing, you authorize Cloud Info Tech to trigger automated hardware warranties matching our logistics depot.
              </div>
            </div>
          </aside>

        </form>
      </div>
    </div>
  );
};

export default Checkout;
