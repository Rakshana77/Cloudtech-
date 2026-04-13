import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { Link } from 'react-router-dom';

const ProductListing = ({ onAddToCart }) => {
    const [filters, setFilters] = useState({
        search: '',
        category: 'All',
        brand: 'All',
        maxPrice: 2000,
    });

    const [sortBy, setSortBy] = useState('popularity');

    const uniqueCategories = [...new Set(products.map(p => p.category))];
    const uniqueBrands = [...new Set(products.map(p => p.brand))];

    const filteredProducts = useMemo(() => {
        let result = products.filter(product => {
            return (
                (filters.category === 'All' || product.category === filters.category) &&
                (filters.brand === 'All' || product.brand === filters.brand) &&
                product.price <= filters.maxPrice &&
                product.name.toLowerCase().includes(filters.search.toLowerCase())
            );
        });

        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        }
        return result;
    }, [filters, sortBy]);

    return (
        <main className="max-w-7xl mx-auto pt-24 pb-12 px-6 flex flex-col md:flex-row gap-8 min-h-screen">
            <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                uniqueCategories={uniqueCategories}
                uniqueBrands={uniqueBrands}
            />
            <section className="flex-1">
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <nav className="flex items-center space-x-2 text-xs font-medium text-outline mb-2">
                            <Link to="/" className="hover:text-primary">Home</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-on-surface">Products</span>
                        </nav>
                        <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Digital Sentinels</h1>
                        <p className="text-on-surface-variant text-sm mt-1">Showing <span className="font-bold text-primary">{filteredProducts.length}</span> precision instruments</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-on-surface-variant hidden lg:inline">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white border text-slate-500 border-slate-200 rounded-xl text-sm font-bold text-on-surface shadow-sm focus:ring-primary py-2 px-4 pr-8 outline-none">
                            <option value="popularity">Popularity</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                    ))}
                    {filteredProducts.length === 0 && (
                        <div className="col-span-full py-12 text-center text-slate-500">
                            No products match your filters.
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {filteredProducts.length > 0 && (
                    <div className="mt-12 flex justify-center">
                        <nav className="flex items-center space-x-1">
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors">
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant font-medium">2</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant font-medium">3</button>
                            <span className="px-2 text-outline">...</span>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors">
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </nav>
                    </div>
                )}
            </section>
        </main>
    );
};

export default ProductListing;
