import React from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cart, placeOrder }) => {
    const navigate = useNavigate();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.07;
    const total = subtotal + tax;

    const handleCheckout = (e) => {
        e.preventDefault();
        alert('Mock checkout successful! Redirecting to tracking...');
        if (placeOrder) placeOrder();
        navigate('/order-tracking');
    };

    return (
        <div className="bg-background min-h-screen">
            <main className="max-w-7xl mx-auto px-6 py-12">
                <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Checkout Forms */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Section 1: Shipping Address */}
                        <section className="bg-surface-container-low rounded-xl p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="bg-primary-container text-on-primary-container w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                                <h2 className="font-headline text-2xl font-bold text-on-surface">Shipping Details</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-outline">First Name</label>
                                    <input required className="w-full bg-surface-container-highest border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-on-surface outline-none" placeholder="John" type="text" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-outline">Last Name</label>
                                    <input required className="w-full bg-surface-container-highest border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-on-surface outline-none" placeholder="Doe" type="text" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-outline">Street Address</label>
                                    <input required className="w-full bg-surface-container-highest border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-on-surface outline-none" placeholder="123 Sentinel Avenue, Tech Park" type="text" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-outline">City</label>
                                    <input required className="w-full bg-surface-container-highest border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-on-surface outline-none" placeholder="Singapore" type="text" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-outline">Postal Code</label>
                                    <input required className="w-full bg-surface-container-highest border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-on-surface outline-none" placeholder="123456" type="text" />
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Delivery Options */}
                        <section className="bg-surface-container-low rounded-xl p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="bg-primary-container text-on-primary-container w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                                <h2 className="font-headline text-2xl font-bold text-on-surface">Delivery Method</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className="relative group cursor-pointer">
                                    <input defaultChecked className="peer sr-only" name="delivery" type="radio" />
                                    <div className="p-4 rounded-xl bg-surface-container-lowest border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary-fixed transition-all">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold text-on-surface">Standard Security Express</p>
                                                <p className="text-sm text-outline">3-5 Business Days</p>
                                            </div>
                                            <span className="font-bold text-primary">Free</span>
                                        </div>
                                    </div>
                                </label>
                                <label className="relative group cursor-pointer">
                                    <input className="peer sr-only" name="delivery" type="radio" />
                                    <div className="p-4 rounded-xl bg-surface-container-lowest border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary-fixed transition-all">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold text-on-surface">Priority Cloud Delivery</p>
                                                <p className="text-sm text-outline">Next Day Guaranteed</p>
                                            </div>
                                            <span className="font-bold text-primary">$15.00</span>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </section>

                        {/* Section 3: Payment Methods */}
                        <section className="bg-surface-container-low rounded-xl p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="bg-primary-container text-on-primary-container w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                                <h2 className="font-headline text-2xl font-bold text-on-surface">Payment Security</h2>
                            </div>
                            <div className="space-y-4">
                                {/* Credit Card Option */}
                                <div className="bg-surface-container-lowest rounded-xl p-6 border-2 border-primary">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary">credit_card</span>
                                            <span className="font-bold text-on-surface">Credit / Debit Card</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="bg-slate-200 text-xs px-2 py-1 rounded font-bold">VISA</span>
                                            <span className="bg-slate-200 text-xs px-2 py-1 rounded font-bold">MC</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2 space-y-1">
                                            <label className="text-[10px] font-bold uppercase text-outline">Card Number</label>
                                            <input required className="w-full bg-surface-container-low border-none rounded p-3 text-on-surface outline-none focus:ring-1 focus:ring-primary" placeholder="0000 0000 0000 0000" type="text" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase text-outline">Expiry Date</label>
                                            <input required className="w-full bg-surface-container-low border-none rounded p-3 text-on-surface outline-none focus:ring-1 focus:ring-primary" placeholder="MM/YY" type="text" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase text-outline">CVC</label>
                                            <input required className="w-full bg-surface-container-low border-none rounded p-3 text-on-surface outline-none focus:ring-1 focus:ring-primary" placeholder="***" type="password" />
                                        </div>
                                    </div>
                                </div>
                                {/* UPI Option */}
                                <button type="button" className="w-full text-left p-6 bg-surface-container-lowest rounded-xl flex items-center justify-between hover:bg-surface-container transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-outline">account_balance_wallet</span>
                                        <span className="font-medium text-on-surface-variant">UPI / Digital Wallets</span>
                                    </div>
                                    <span className="material-symbols-outlined text-outline">chevron_right</span>
                                </button>
                                {/* COD Option */}
                                <button type="button" className="w-full text-left p-6 bg-surface-container-lowest rounded-xl flex items-center justify-between hover:bg-surface-container transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-outline">payments</span>
                                        <span className="font-medium text-on-surface-variant">Cash on Delivery</span>
                                    </div>
                                    <span className="material-symbols-outlined text-outline">chevron_right</span>
                                </button>
                            </div>
                        </section>

                        {/* Trust Seals */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-8 pt-4 opacity-60">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-on-surface">verified_user</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-on-surface">SSL Secure Encryption</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-on-surface">shield</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-on-surface">Fraud Protection</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-on-surface">package_2</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-on-surface">Safe Cloud Transit</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar: Order Summary */}
                    <aside className="lg:col-span-4 sticky top-24">
                        <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-xl shadow-on-surface/5 space-y-8">
                            <h3 className="font-headline text-xl font-bold text-on-surface">Order Summary</h3>
                            {/* Item List */}
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 bg-surface-container-low rounded-lg overflow-hidden flex-shrink-0">
                                            <img className="w-full h-full object-cover" src={item.image || "https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&q=80&w=600"} alt={item.name} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold leading-tight text-on-surface">{item.name}</p>
                                            <p className="text-xs text-outline">Qty: {item.quantity}</p>
                                            <p className="text-sm font-bold text-primary mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                                {cart.length === 0 && (
                                    <p className="text-sm text-outline">Your cart is empty.</p>
                                )}
                            </div>
                            {/* Breakdown */}
                            <div className="space-y-3 pt-6 border-t border-surface-container-highest">
                                <div className="flex justify-between text-sm">
                                    <span className="text-outline">Subtotal</span>
                                    <span className="font-medium text-on-surface">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-outline">Shipping</span>
                                    <span className="font-medium text-primary">Calculated at next step</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-outline">Estimated Taxes</span>
                                    <span className="font-medium text-on-surface">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg pt-4">
                                    <span className="font-bold text-on-surface">Total</span>
                                    <span className="font-extrabold text-primary">${total.toFixed(2)}</span>
                                </div>
                            </div>
                            {/* CTA */}
                            <button
                                type="submit"
                                disabled={cart.length === 0}
                                className="w-full bg-gradient-to-br from-primary to-primary-container text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-100 transition-all disabled:opacity-50 disabled:hover:scale-100">
                                Complete Secure Purchase
                            </button>
                            <p className="text-[10px] text-center text-outline leading-relaxed uppercase tracking-tighter">
                                By clicking "Complete Secure Purchase", you agree to Cloud Infotech's technical service agreement and privacy policy.
                            </p>
                        </div>

                        {/* Secondary Trust Badge */}
                        <div className="mt-6 p-4 rounded-xl bg-primary-fixed/30 flex items-center gap-4">
                            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                            <div className="text-xs">
                                <p className="font-bold text-on-primary-fixed">100% Satisfaction Guarantee</p>
                                <p className="text-on-primary-fixed-variant">30-day effortless returns for all hardware.</p>
                            </div>
                        </div>
                    </aside>
                </form>
            </main>
        </div>
    );
};

export default Checkout;
