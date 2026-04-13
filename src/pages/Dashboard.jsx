import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="bg-surface font-body text-on-surface min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[288px_1fr] gap-8">
                {/* Sidebar */}
                <aside className="flex flex-col h-fit md:sticky md:top-24">
                    <div className="w-full bg-white rounded-2xl p-4 shadow-xl shadow-slate-200/50 flex flex-col">
                        <div className="px-4 py-3 mb-4">
                            <h2 className="text-slate-500 text-xs font-bold tracking-widest uppercase mb-1">My Account</h2>
                            <p className="text-slate-400 text-[10px] uppercase tracking-wider">User Dashboard</p>
                        </div>
                        <nav className="space-y-1">
                            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-500 hover:bg-slate-50 transition-all rounded-lg group">
                                <span className="material-symbols-outlined group-hover:text-blue-600">person</span>
                                <span className="text-sm font-medium">Profile</span>
                            </a>
                            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-blue-600 font-bold bg-blue-50/50 rounded-lg group">
                                <span className="material-symbols-outlined">package_2</span>
                                <span className="text-sm">My Orders</span>
                            </a>
                            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-500 hover:bg-slate-50 transition-all rounded-lg group">
                                <span className="material-symbols-outlined group-hover:text-blue-600">location_on</span>
                                <span className="text-sm font-medium">Saved Addresses</span>
                            </a>
                            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-500 hover:bg-slate-50 transition-all rounded-lg group">
                                <span className="material-symbols-outlined group-hover:text-blue-600">favorite</span>
                                <span className="text-sm font-medium">Wishlist</span>
                            </a>
                        </nav>
                        <div className="mt-8 pt-6 border-t border-slate-100 px-4">
                            <a href="#" className="flex items-center space-x-3 text-slate-400 hover:text-error transition-colors">
                                <span className="material-symbols-outlined">logout</span>
                                <span className="text-sm font-medium">Logout</span>
                            </a>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="space-y-8">
                    {/* Header */}
                    <header className="bg-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between shadow-xl shadow-slate-200/50 relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10 w-full sm:w-auto">
                            <div className="h-20 w-20 rounded-2xl overflow-hidden ring-4 ring-blue-50 shadow-inner">
                                <img alt="Admin Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8BR5fSwb6yhNPK00DZTmNYWec3zKaH3MIeB0vFLSGZWAl8630dpyRcMt-tYa_-SiqdrvmzzKnvMVG_1nYXdjzHPemrnRyLVo-8g7pZaul_nfhrTpsFRYDU-73UL20cgcLj464zS8SGFz3ofMwlsmOqOKW3LlBE_2qOPQQGYmvqBm8mbOEVLPgYqOvu8hXzb8bo6gGr5l8Y_eX5ahpx7G2MXfNKMGP-AeXuZjzokS9VN7Iy4JJzx12XcAQijzQqOfXXho93KcMF8R-" />
                            </div>
                            <div className="text-center sm:text-left">
                                <h1 className="text-2xl font-extrabold text-on-surface tracking-tight font-headline">Alexander Wright</h1>
                                <p className="text-secondary text-sm font-medium flex items-center justify-center sm:justify-start mt-1">
                                    <span className="material-symbols-outlined text-[16px] mr-1">verified</span>
                                    Member since 2024
                                </p>
                            </div>
                        </div>

                        <div className="hidden lg:flex items-center space-x-4 relative z-10">
                            <div className="text-right">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Orders</p>
                                <p className="text-2xl font-black text-on-surface">24</p>
                            </div>
                            <div className="h-10 w-[1px] bg-slate-100"></div>
                            <div className="text-right">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Points</p>
                                <p className="text-2xl font-black text-primary">1,250</p>
                            </div>
                        </div>
                        <div className="absolute -right-12 -top-12 h-40 w-40 bg-blue-50/30 rounded-full blur-3xl"></div>
                    </header>

                    {/* Recent Orders Section */}
                    <section className="space-y-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <h3 className="text-xl font-bold font-headline text-on-surface tracking-tight">Recent Orders</h3>
                            <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full space-x-2 w-full sm:w-auto">
                                <span className="material-symbols-outlined text-slate-400 text-[18px]">search</span>
                                <input className="bg-transparent outline-none border-none focus:ring-0 text-sm text-slate-600 w-full md:w-64 placeholder:text-slate-400" placeholder="Search orders..." type="text" />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl overflow-x-auto shadow-xl shadow-slate-200/50">
                            <table className="w-full text-left min-w-[600px]">
                                <thead className="bg-slate-50/50 border-b border-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    <tr className="hover:bg-slate-50/30 transition-colors">
                                        <td className="px-6 py-5 font-mono text-sm text-slate-600">#CI-90421</td>
                                        <td className="px-6 py-5 text-sm text-slate-500">Oct 12, 2024</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-3">
                                                <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-slate-400">videocam</span>
                                                </div>
                                                <span className="text-sm font-semibold text-slate-700">Sentinel X1 Camera</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-fixed text-on-primary-fixed-variant tracking-wider">
                                                SHIPPED
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <Link to="/order-tracking" className="text-primary text-xs font-bold hover:underline">Track Order</Link>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/30 transition-colors">
                                        <td className="px-6 py-5 font-mono text-sm text-slate-600">#CI-90388</td>
                                        <td className="px-6 py-5 text-sm text-slate-500">Oct 05, 2024</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-3">
                                                <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-slate-400">router</span>
                                                </div>
                                                <span className="text-sm font-semibold text-slate-700">Cloud Hub Pro 2</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-surface-container-high text-slate-600 tracking-wider">
                                                DELIVERED
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-primary text-xs font-bold hover:underline">View Details</button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/30 transition-colors">
                                        <td className="px-6 py-5 font-mono text-sm text-slate-600">#CI-90112</td>
                                        <td className="px-6 py-5 text-sm text-slate-500">Sep 24, 2024</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-3">
                                                <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-slate-400">sensors</span>
                                                </div>
                                                <span className="text-sm font-semibold text-slate-700">Motion Sensor Pack</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-surface-container-high text-slate-600 tracking-wider">
                                                DELIVERED
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-primary text-xs font-bold hover:underline">View Details</button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/30 transition-colors">
                                        <td className="px-6 py-5 font-mono text-sm text-slate-600">#CI-89945</td>
                                        <td className="px-6 py-5 text-sm text-slate-500">Sep 15, 2024</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-3">
                                                <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-slate-400">lock</span>
                                                </div>
                                                <span className="text-sm font-semibold text-slate-700">Smart Bio-Lock V4</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-error-container text-error tracking-wider">
                                                CANCELLED
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-primary text-xs font-bold hover:underline">View Details</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
