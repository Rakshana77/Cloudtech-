import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  Award, 
  FileText, 
  LogOut, 
  ShieldAlert,
  User,
  Menu,
  X,
  Image
} from 'lucide-react';

const AdminLayout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Tags },
    { name: 'Brands', path: '/admin/brands', icon: Award },
    { name: 'Quotations', path: '/admin/quotations', icon: FileText },
    { name: 'Homepage Banners', path: '/admin/banners', icon: Image }
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden relative">
      
      {/* Backdrop overlay for mobile menu */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-200"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shadow-xl border-r border-slate-800 z-40 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          {/* Brand Logo */}
          <div className="h-16 flex items-center justify-between px-6 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center">
              <ShieldAlert className="w-6 h-6 text-blue-500 mr-3 animate-pulse" />
              <div>
                <span className="font-bold text-white text-base block leading-none">Admin Panel</span>
                <span className="text-xs text-slate-500 font-medium">Enterprise Control</span>
              </div>
            </div>
            {/* Close trigger for mobile */}
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center px-4 py-3 bg-slate-950/60 rounded-lg mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="text-sm font-semibold text-white block leading-none truncate">
                admin
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold text-slate-400 hover:bg-red-950/20 hover:text-red-400 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3 text-slate-500 group-hover:text-red-400" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 shadow-sm">
          <div className="flex items-center space-x-3">
            {/* Hamburger Toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-600 hover:text-blue-600 p-1.5 hover:bg-slate-100 rounded-lg focus:outline-none"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg lg:text-xl font-bold text-slate-800">
              {navItems.find((item) => item.path === location.pathname)?.name || 'Admin'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
          </div>
        </header>

        {/* Content Outlet */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
