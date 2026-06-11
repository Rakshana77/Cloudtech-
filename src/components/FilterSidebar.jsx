import React from 'react';
import { Camera, Tags, DollarSign, SlidersHorizontal, RefreshCcw } from 'lucide-react';

const FilterSidebar = ({ filters, setFilters, uniqueBrands, uniqueCategories }) => {
  const handlePriceChange = (e) => {
    setFilters({ ...filters, maxPrice: Number(e.target.value) });
  };

  const clearFilters = () => {
    setFilters({ search: '', maxPrice: 2000, category: 'All', brand: 'All', stockStatus: 'All' });
  };

  return (
    <aside className="w-full md:w-72 flex flex-col space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
      
      {/* Title */}
      <div className="flex items-center space-x-2 pb-4 border-b border-slate-100">
        <SlidersHorizontal className="w-4 h-4 text-blue-600" />
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Catalog Filters</h3>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-3">Categories</h4>
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => setFilters({ ...filters, category: 'All' })}
            className={`flex items-center justify-between p-2 rounded-lg text-xs font-semibold transition-all ${
              filters.category === 'All' 
                ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-transparent'
            }`}
          >
            <span className="capitalize">All Categories</span>
          </button>
          {uniqueCategories.map(c => (
            <button
              key={c}
              onClick={() => setFilters({ ...filters, category: c })}
              className={`flex items-center justify-between p-2 rounded-lg text-xs font-semibold transition-all ${
                filters.category === c 
                  ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-transparent'
              }`}
            >
              <span className="capitalize">{c}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-3">Manufacturer Brands</h4>
        <div className="flex flex-col space-y-1">
          <label className="flex items-center space-x-2.5 py-1.5 cursor-pointer text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors">
            <input
              type="radio"
              name="brandFilter"
              checked={filters.brand === 'All'}
              onChange={() => setFilters({ ...filters, brand: 'All' })}
              className="w-3.5 h-3.5 text-blue-600 border-slate-300 focus:ring-blue-500"
            />
            <span>All Brands</span>
          </label>
          {uniqueBrands.map(b => (
            <label key={b} className="flex items-center space-x-2.5 py-1.5 cursor-pointer text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <input
                type="radio"
                name="brandFilter"
                checked={filters.brand === b}
                onChange={() => setFilters({ ...filters, brand: b })}
                className="w-3.5 h-3.5 text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span className="capitalize">{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Price Range</h4>
        <div className="space-y-2">
          <input 
            type="range"
            min="0"
            max="3000"
            step="50"
            value={filters.maxPrice} 
            onChange={handlePriceChange}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] font-bold text-slate-400">
            <span>$0</span>
            <span>Max Price: ${filters.maxPrice >= 3000 ? '3,000+' : filters.maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Stock Status */}
      <div>
        <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-3">Availability</h4>
        <div className="flex flex-col space-y-1">
          {['All', 'In Stock', 'Out of Stock'].map(status => (
            <label key={status} className="flex items-center space-x-2.5 py-1.5 cursor-pointer text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <input
                type="radio"
                name="stockStatusFilter"
                checked={filters.stockStatus === status}
                onChange={() => setFilters({ ...filters, stockStatus: status })}
                className="w-3.5 h-3.5 text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span>{status}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset button */}
      <div className="pt-4 border-t border-slate-100">
        <button 
          onClick={clearFilters} 
          className="w-full flex items-center justify-center py-2.5 rounded-lg border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors space-x-2"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          <span>Clear Filters</span>
        </button>
      </div>

    </aside>
  );
};

export default FilterSidebar;
