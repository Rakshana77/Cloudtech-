import React from 'react';

const FilterSidebar = ({ filters, setFilters, uniqueBrands, uniqueCategories }) => {
    const handlePriceChange = (e) => {
        setFilters({ ...filters, maxPrice: e.target.value });
    };

    const clearFilters = () => {
        setFilters({ search: '', maxPrice: 2000, category: 'All', brand: 'All' });
    };

    return (
        <aside className="w-full md:w-72 flex flex-col space-y-8 bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 h-fit">
            <div>
                <h3 className="font-headline font-bold text-on-surface mb-4">Price Range</h3>
                <div className="space-y-4">
                    <input className="w-full accent-primary" max="2000" min="0" step="50" type="range" value={filters.maxPrice} onChange={handlePriceChange} />
                    <div className="flex justify-between text-xs font-medium text-on-surface-variant">
                        <span>$0</span>
                        <span>${filters.maxPrice >= 2000 ? '2,000+' : filters.maxPrice}</span>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="font-headline font-bold text-on-surface mb-4">Brand</h3>
                <div className="flex flex-col space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input
                            checked={filters.brand === 'All'}
                            onChange={() => setFilters({ ...filters, brand: 'All' })}
                            className="rounded border-outline-variant text-primary focus:ring-primary h-5 w-5" type="radio" name="brand" />
                        <span className={`text-sm transition-colors ${filters.brand === 'All' ? 'text-on-surface font-semibold' : 'text-on-surface-variant group-hover:text-primary'}`}>All Brands</span>
                    </label>
                    {uniqueBrands.map(b => (
                        <label key={b} className="flex items-center space-x-3 cursor-pointer group">
                            <input
                                checked={filters.brand === b}
                                onChange={() => setFilters({ ...filters, brand: b })}
                                className="rounded border-outline-variant text-primary focus:ring-primary h-5 w-5" type="radio" name="brand" />
                            <span className={`text-sm transition-colors ${filters.brand === b ? 'text-on-surface font-semibold' : 'text-on-surface-variant group-hover:text-primary'}`}>{b}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="font-headline font-bold text-on-surface mb-4">Camera Type</h3>
                <div className="flex flex-col space-y-2">
                    <button
                        onClick={() => setFilters({ ...filters, category: 'All' })}
                        className={`flex items-center justify-between p-3 rounded-lg text-sm transition-colors ${filters.category === 'All' ? 'bg-blue-50/50 text-blue-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}>
                        <div className="flex items-center">
                            <span className="material-symbols-outlined mr-2">category</span>
                            <span>All</span>
                        </div>
                    </button>
                    {uniqueCategories.map(c => (
                        <button
                            key={c}
                            onClick={() => setFilters({ ...filters, category: c })}
                            className={`flex items-center justify-between p-3 rounded-lg text-sm transition-colors ${filters.category === c ? 'bg-blue-50/50 text-blue-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}>
                            <div className="flex items-center">
                                <span className="material-symbols-outlined mr-2">{c === 'Indoor' ? 'home_work' : c === 'Outdoor' ? 'park' : c.includes('NVR') ? 'storage' : 'settings_input_component'}</span>
                                <span>{c}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="pt-4 border-t border-outline-variant/10">
                <button onClick={clearFilters} className="w-full py-3 rounded-xl bg-surface-container-high text-on-surface font-bold text-sm hover:bg-surface-container-highest transition-colors">
                    Clear Filters
                </button>
            </div>
        </aside>
    );
};

export default FilterSidebar;
