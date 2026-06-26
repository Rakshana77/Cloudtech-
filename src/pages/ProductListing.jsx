import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import { brandService } from '../services/brandService';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { ChevronRight, Search } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const ProductListing = () => {
  useSEO({
    title: 'Laptop, Desktop & CCTV Products | Cloud Info Tech Shop',
    description: 'Explore the Cloud Info Tech Shop catalog of premium business laptops, high-performance gaming rigs, dome and bullet security cameras, NVR hubs, access control devices, and networking hardware.',
    keywords: 'Laptop Sales, Desktop Sales, CCTV Cameras, Security Systems, dome cameras, bullet cameras, NVR, Access Control, Cloud Info Tech Shop products',
    schema: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://cloudinfotechshop.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Products",
          "item": "https://cloudinfotechshop.com/products"
        }
      ]
    }
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'laptops';
  const initialCategory = searchParams.get('category') || 'All';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: '',
    category: initialCategory,
    brand: 'All',
    maxPrice: 3000,
    stockStatus: 'All'
  });

  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [prods, cats, brnds] = await Promise.all([
          productService.getProducts(),
          categoryService.getCategories(),
          brandService.getBrands()
        ]);
        
        // Only display active products on public listing
        setProducts(prods.filter(p => p.status === 'active'));
        setCategories(cats.filter(c => c.status === 'active'));
        setBrands(brnds.filter(b => b.status === 'active'));
      } catch (err) {
        console.error('Error fetching catalog resources', err);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  // Set category from search param on update
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
  }, [searchParams]);

  // Reset category filter if tab changes
  const handleTabChange = (tabName) => {
    setSearchParams({ tab: tabName });
    setFilters(prev => ({ ...prev, category: 'All' }));
  };

  const uniqueCategories = useMemo(() => {
    return categories.map(c => c.name);
  }, [categories]);

  const uniqueBrands = useMemo(() => brands.map(b => b.name), [brands]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      // Filter by active tab productType (laptop or security)
      let pType = (product.productType || '').toLowerCase();
      if (!pType) {
        // fallback for older products based on hardcoded defaults
        const laptopCatFallbacks = ['laptops', 'gaming laptops', 'business laptops', 'workstations', 'desktop pcs', 'monitors', 'accessories', 'networking'];
        pType = laptopCatFallbacks.includes((product.category || '').toLowerCase()) ? 'laptop' : 'security';
      }
      const matchesTab = pType === (activeTab === 'laptops' ? 'laptop' : 'security');

      if (!matchesTab) return false;

      const matchesCategory = filters.category === 'All' || product.category === filters.category;
      const matchesBrand = filters.brand === 'All' || product.brand === filters.brand;
      const priceToCompare = product.offerPrice > 0 ? product.offerPrice : product.price;
      const matchesPrice = priceToCompare <= filters.maxPrice;
      const matchesSearch = product.productName.toLowerCase().includes(filters.search.toLowerCase()) || 
                            product.sku.toLowerCase().includes(filters.search.toLowerCase());
      
      let matchesStock = true;
      if (filters.stockStatus === 'In Stock') {
        matchesStock = product.stockQuantity > 0;
      } else if (filters.stockStatus === 'Out of Stock') {
        matchesStock = product.stockQuantity === 0;
      }

      return matchesCategory && matchesBrand && matchesPrice && matchesSearch && matchesStock;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => {
        const pA = a.offerPrice > 0 ? a.offerPrice : a.price;
        const pB = b.offerPrice > 0 ? b.offerPrice : b.price;
        return pA - pB;
      });
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => {
        const pA = a.offerPrice > 0 ? a.offerPrice : a.price;
        const pB = b.offerPrice > 0 ? b.offerPrice : b.price;
        return pB - pA;
      });
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return result;
  }, [products, filters, sortBy, activeTab]);

  return (
    <main className="max-w-7xl mx-auto pt-10 pb-16 px-6 flex flex-col space-y-8 min-h-screen font-sans">
      
      {/* Breadcrumbs & Tab Headers */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <nav className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-400 uppercase mb-2 text-left">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-600">Equipment Catalog</span>
          </nav>
          <h1 className="font-h1 tracking-tight text-left">Technology Marketplace</h1>
        </div>

        {/* Tab System */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => handleTabChange('laptops')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all uppercase tracking-wider ${
              activeTab === 'laptops'
                ? 'bg-white text-[#1453E3] shadow-sm'
                : 'text-[#475569] hover:text-[#111827]'
            }`}
          >
            Laptops & IT Gear
          </button>
          <button
            onClick={() => handleTabChange('security')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all uppercase tracking-wider ${
              activeTab === 'security'
                ? 'bg-white text-[#1453E3] shadow-sm'
                : 'text-[#475569] hover:text-[#111827]'
            }`}
          >
            Security Products
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          uniqueCategories={uniqueCategories}
          uniqueBrands={uniqueBrands}
        />

        {/* Grid listing */}
        <section className="flex-grow space-y-6">
          {/* Header bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
            <div className="text-left">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827] capitalize">
                {activeTab === 'laptops' ? 'Laptops & Office Workstations' : 'CCTV & Security Products'}
              </h2>
              <p className="text-slate-500 text-xs mt-0.5">
                Showing <span className="font-bold text-[#1453E3]">{filteredProducts.length}</span> matching options
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto flex-nowrap">
              {/* Quick Search bar */}
              <div className="relative w-full md:w-56">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <Search className="h-3.5 w-3.5 text-slate-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search catalog..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="block w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                />
              </div>

              {/* Sort by dropdown */}
              <div className="flex items-center space-x-1.5 shrink-0">
                <span className="text-xs font-semibold text-slate-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border text-slate-600 border-slate-300 rounded-lg text-xs font-semibold focus:ring-blue-500 py-1.5 px-3 outline-none"
                >
                  <option value="newest">Newest Releases</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Cards Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-16 text-center text-slate-400 text-xs font-medium">
                  No active items match your search filters in this category.
                </div>
              )}
            </div>
          )}

        </section>
      </div>
    </main>
  );
};

export default ProductListing;
