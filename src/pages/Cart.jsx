import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, updateQuantity, removeItem }) => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.07;
    const total = subtotal + tax;

    return (
        <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Item List Section */}
                <div className="flex-grow space-y-8">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Your Shopping Cart</h1>
                        <span className="text-on-surface-variant font-medium">{cart.length} items</span>
                    </div>

                    <div className="space-y-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center p-6 bg-surface-container-lowest rounded-xl shadow-sm transition-all hover:shadow-md">
                                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                                    <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                                </div>
                                <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
                                    <h3 className="text-lg font-bold font-headline">{item.name}</h3>
                                    <p className="text-sm text-on-surface-variant">{item.description}</p>
                                </div>
                                <div className="mt-4 md:mt-0 flex items-center gap-8 w-full md:w-auto">
                                    <div className="flex items-center bg-surface-container-low rounded-lg p-1">
                                        <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="p-1 hover:text-primary">
                                            <span className="material-symbols-outlined text-sm">remove</span>
                                        </button>
                                        <span className="px-4 font-bold text-sm">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-primary">
                                            <span className="material-symbols-outlined text-sm">add</span>
                                        </button>
                                    </div>
                                    <div className="flex flex-col items-end min-w-[80px]">
                                        <span className="text-lg font-bold font-headline text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                                        <button onClick={() => removeItem(item.id)} className="text-xs text-error font-medium hover:underline mt-1 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-xs">delete</span> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {cart.length === 0 && (
                            <div className="text-center py-12">
                                <span className="material-symbols-outlined text-6xl text-outline mb-4">shopping_cart</span>
                                <h3 className="text-xl font-bold font-headline text-on-surface">Your cart is empty</h3>
                                <p className="text-on-surface-variant">Looks like you haven't added any products yet.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-12">
                        <Link to="/products" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                            <span className="material-symbols-outlined">arrow_back</span>
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                {/* Sidebar Order Summary */}
                <aside className="w-full lg:w-96">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-surface-container-low p-8 rounded-2xl">
                            <h2 className="text-xl font-bold font-headline mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-on-surface-variant">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-on-surface">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-on-surface-variant">
                                    <span>Shipping Estimation</span>
                                    <span className="font-medium text-on-surface">Calculated at next step</span>
                                </div>
                                <div className="flex justify-between text-on-surface-variant">
                                    <span>Tax</span>
                                    <span className="font-medium text-on-surface">${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Coupon Code */}
                            <div className="mb-8">
                                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">Discount Code</label>
                                <div className="flex gap-2">
                                    <input className="flex-grow bg-surface-container-lowest border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary text-sm outline-none" placeholder="Enter code" type="text" />
                                    <button className="bg-surface-container-high px-4 py-3 rounded-lg text-sm font-bold hover:bg-surface-container-highest transition-colors">Apply</button>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-outline-variant/15 flex justify-between items-end mb-8">
                                <span className="text-lg font-bold">Total</span>
                                <div className="text-right">
                                    <span className="block text-2xl font-black font-headline text-on-surface">${total.toFixed(2)}</span>
                                    <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Secure checkout guaranteed</span>
                                </div>
                            </div>

                            <Link to="/checkout" className="block text-center w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-100 transition-all pointer-events-auto">
                                Proceed to Checkout
                            </Link>
                        </div>

                        {/* Security Badge - Contextual UI */}
                        <div className="p-6 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold">CloudProtect Coverage</h4>
                                <p className="text-xs text-on-surface-variant">Your purchase includes 1-year basic hardware support.</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default Cart;
