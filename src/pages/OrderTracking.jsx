import React from 'react';
import { Link } from 'react-router-dom';

const OrderTracking = () => {
    return (
        <main className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
            {/* Hero Section */}
            <section className="mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest uppercase bg-primary-container text-on-primary-container rounded-full">
                            Order In Progress
                        </span>
                        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">Track Your Order #CI-90421</h1>
                        <p className="mt-4 text-on-surface-variant max-w-xl text-lg">Your high-security surveillance package is currently in transit. Use the sentinel timeline below for real-time status updates.</p>
                    </div>
                    <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-primary">
                        <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Estimated Delivery</p>
                        <p className="text-3xl font-headline font-black text-primary">Oct 24, 2024</p>
                        <p className="text-sm text-on-surface-variant mt-1">Before 5:00 PM</p>
                    </div>
                </div>
            </section>

            {/* Main Content Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Visual Timeline & Map */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Visual Timeline Card */}
                    <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-xl shadow-slate-200/50">
                        <h2 className="font-headline text-xl font-bold mb-10">Sentinel Tracking</h2>
                        <div className="relative">
                            {/* Progress Line */}
                            <div className="absolute top-5 left-6 w-[calc(100%-3rem)] h-1 bg-surface-container-highest hidden md:block">
                                <div className="h-full bg-primary transition-all duration-1000" style={{ width: '66%' }}></div>
                            </div>

                            {/* Timeline Steps */}
                            <div className="flex flex-col md:flex-row justify-between relative gap-8 md:gap-0">
                                {/* Step 1: Completed */}
                                <div className="flex md:flex-col items-center md:text-center group">
                                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center z-10 shadow-lg shadow-primary/20">
                                        <span className="material-symbols-outlined">check</span>
                                    </div>
                                    <div className="ml-4 md:ml-0 md:mt-4">
                                        <p className="font-bold text-sm text-on-surface">Ordered</p>
                                        <p className="text-[11px] text-on-surface-variant">Oct 18, 10:24 AM</p>
                                    </div>
                                </div>

                                {/* Step 2: Completed */}
                                <div className="flex md:flex-col items-center md:text-center">
                                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center z-10 shadow-lg shadow-primary/20">
                                        <span className="material-symbols-outlined">inventory_2</span>
                                    </div>
                                    <div className="ml-4 md:ml-0 md:mt-4">
                                        <p className="font-bold text-sm text-on-surface">Packed</p>
                                        <p className="text-[11px] text-on-surface-variant">Oct 19, 02:15 PM</p>
                                    </div>
                                </div>

                                {/* Step 3: Current */}
                                <div className="flex md:flex-col items-center md:text-center">
                                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center z-10 shadow-lg shadow-primary/40 ring-4 ring-primary-container">
                                        <span className="material-symbols-outlined">local_shipping</span>
                                    </div>
                                    <div className="ml-4 md:ml-0 md:mt-4">
                                        <p className="font-bold text-sm text-primary">Shipped</p>
                                        <p className="text-[11px] text-on-surface-variant font-medium">In Transit - Hub A</p>
                                    </div>
                                </div>

                                {/* Step 4: Pending */}
                                <div className="flex md:flex-col items-center md:text-center opacity-40">
                                    <div className="w-12 h-12 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center z-10">
                                        <span className="material-symbols-outlined">delivery_dining</span>
                                    </div>
                                    <div className="ml-4 md:ml-0 md:mt-4">
                                        <p className="font-bold text-sm">Out for Delivery</p>
                                        <p className="text-[11px]">Expected Oct 24</p>
                                    </div>
                                </div>

                                {/* Step 5: Pending */}
                                <div className="flex md:flex-col items-center md:text-center opacity-40">
                                    <div className="w-12 h-12 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center z-10">
                                        <span className="material-symbols-outlined">task_alt</span>
                                    </div>
                                    <div className="ml-4 md:ml-0 md:mt-4">
                                        <p className="font-bold text-sm">Delivered</p>
                                        <p className="text-[11px]">Pending Arrival</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map View Placeholder */}
                    <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 h-[400px] relative">
                        <img className="w-full h-full object-cover grayscale brightness-90 relative z-0" alt="Map Route Tracking" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8H-1PThWMtvY1sDuQBqlVZk1NxvcjPclBArPRkETOT3Qld9fCQCwVG7z_NDe4AxI78keGcRwZEGEHJK-Ca3TlE7XEUCuYUqi3uZhA-No3xJFpiIBofNHKd_08T5APQEZ4AQukZXncPCtz1mKHWCDiR31xTN7sbKwanvhr7Xz2184pSwg057D6nx5DPV44l6sd_dRRAlSmNGKvPWw9UBlDTi0fP9vrWAVJz2hfMcKilbm5dpwr8YeaSKuUUb92ey4tmI21QyOeR64W" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none z-10"></div>

                        {/* Live Overlay */}
                        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                            <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute opacity-70"></div>
                            <div className="w-3 h-3 bg-primary rounded-full shadow-lg border-2 border-white"></div>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white/20 z-30">
                            <div className="flex items-center gap-3 mb-4 sm:mb-0">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
                                    <span className="material-symbols-outlined">navigation</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">Current Location</p>
                                    <p className="text-sm font-semibold">Changi Logistics Hub, Sector 4</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-md hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 whitespace-nowrap">
                                Live Track
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Details & Address */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Order Summary Card */}
                    <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-xl shadow-slate-200/50">
                        <h3 className="font-headline text-lg font-bold mb-6">Order Summary</h3>
                        <div className="space-y-6">
                            {/* Product Item 1 */}
                            <div className="flex gap-4">
                                <div className="w-20 h-20 bg-surface-container rounded-xl overflow-hidden flex-shrink-0">
                                    <img className="w-full h-full object-cover" alt="Product" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhRaXA4SFvboQl2Y7YOkpsTV-0eY_k95TFmhPOle8fGj9tgn4LYWtzNFGzhjyAuztRdeiZNeGe2ss1BaN3kmD-Niv_VzlHIzjxmVp4P_LDFAK0UMlVn3qb01cYo4xu4glXsLXiXPFuSwe0HxNpVc6UtFkEabGSXsuSo2JlK30QBiJcgaQPXRFaKUH50nBtRObqUqrYjUs5vduNLfRohA_HMLfR6MUDcz1ETJ2rFgcOb8vkgTnETJgNK7N8CHHrfAp3DqwXMxjb2DQG" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="font-bold text-sm leading-tight text-on-surface">Sentinel-4K Pro AI Camera</p>
                                    <p className="text-xs text-on-surface-variant mt-1">Pack of 4 • Midnight Black</p>
                                    <p className="font-headline font-bold text-primary mt-1">$1,299.00</p>
                                </div>
                            </div>

                            {/* Product Item 2 */}
                            <div className="flex gap-4">
                                <div className="w-20 h-20 bg-surface-container rounded-xl overflow-hidden flex-shrink-0">
                                    <img className="w-full h-full object-cover" alt="Product 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOjrP1G-_c6WjyHsZTe28q3DoNMBzONr9ECAxcq9GPXIPgWmKBzXqY7epz6qHzvrHnoR341leJIkNaYaCs5TjpNMOT9g0pZAvsQWus6jE_Kek7LAqSTlaq-enLMf_mI38okAW0BUB4m0IabgZ_iInAoQMtHTlxBcwNRFSVAAzCrtKaex6aj20NVfMCxMUyEzwooHk4uemYYDjjbtMz2ZgXUOapZopmkcLAEJ8Kty4nHJG_3cMShSCWHeCyYfTiTv43V6rwcaDzMhXQ" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="font-bold text-sm leading-tight text-on-surface">Cloud Core NVR Hub</p>
                                    <p className="text-xs text-on-surface-variant mt-1">2TB Storage • Rack Mounted</p>
                                    <p className="font-headline font-bold text-primary mt-1">$450.00</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-surface-container-high space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-on-surface-variant">Subtotal</span>
                                <span className="font-medium text-on-surface">$1,749.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-on-surface-variant">Secure Shipping</span>
                                <span className="text-primary font-bold">FREE</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-2 text-on-surface">
                                <span>Total</span>
                                <span>$1,749.00</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Address Card */}
                    <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary">location_on</span>
                            <h3 className="font-headline font-bold text-on-surface">Delivery Address</h3>
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-sm text-on-surface">Alex Henderson</p>
                            <p className="text-sm text-on-surface-variant">Corporate Plaza, Suite 402</p>
                            <p className="text-sm text-on-surface-variant">88 Market Street</p>
                            <p className="text-sm text-on-surface-variant">Singapore 048948</p>
                            <p className="text-sm text-on-surface-variant mt-3 flex items-center gap-2 font-medium">
                                <span className="material-symbols-outlined text-xs">phone</span>
                                +65 9123 4567
                            </p>
                        </div>
                    </div>

                    {/* Support Card */}
                    <div className="bg-primary-container p-6 rounded-2xl text-on-primary-container relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="font-headline font-bold mb-2">Need Assistance?</h3>
                            <p className="text-xs opacity-90 mb-4 font-medium">Our security specialists are available 24/7 for delivery inquiries.</p>
                            <button className="w-full py-3 bg-white text-primary font-bold rounded-xl text-sm transition-transform active:scale-95 shadow-md">
                                Contact Specialist
                            </button>
                        </div>
                        <span className="material-symbols-outlined absolute -bottom-4 right-0 text-8xl text-white/10 rotate-12">support_agent</span>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default OrderTracking;
