import React, { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import { brandService } from '../services/brandService';
import CloudinaryUpload from '../components/CloudinaryUpload';
import { Plus, Edit2, Trash2, Search, X, Check, Eye, AlertCircle } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search states
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form states
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [status, setStatus] = useState('active');
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [prods, cats, brnds] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories(),
        brandService.getBrands()
      ]);
      setProducts(prods);
      setCategories(cats.filter(c => c.status === 'active'));
      setBrands(brnds.filter(b => b.status === 'active'));
    } catch (err) {
      console.error('Error loading inventory list', err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditId(null);
    setProductName('');
    setSku('');
    setBrand(brands[0]?.name || '');
    setCategory(categories[0]?.name || '');
    setDescription('');
    setSpecifications('');
    setPrice('');
    setOfferPrice('');
    setStockQuantity('');
    setStatus('active');
    setFeatured(false);
    setImage('');
    setGalleryImages([]);
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditId(p.id);
    setProductName(p.productName || '');
    setSku(p.sku || '');
    setBrand(p.brand || '');
    setCategory(p.category || '');
    setDescription(p.description || '');
    setSpecifications(p.specifications || '');
    setPrice(p.price || '');
    setOfferPrice(p.offerPrice || '');
    setStockQuantity(p.stockQuantity || '');
    setStatus(p.status || 'active');
    setFeatured(p.featured || false);
    setImage(p.image || '');
    setGalleryImages(p.galleryImages || []);
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName.trim() || !sku.trim()) {
      setError('Product Name and SKU are required');
      return;
    }

    try {
      const payload = {
        productName,
        sku,
        brand,
        category,
        description,
        specifications,
        price: Number(price) || 0,
        offerPrice: Number(offerPrice) || 0,
        stockQuantity: Number(stockQuantity) || 0,
        status,
        featured,
        image,
        galleryImages
      };

      if (editId) {
        await productService.updateProduct(editId, payload);
      } else {
        await productService.createProduct(payload);
      }
      setModalOpen(false);
      loadAllData();
    } catch (err) {
      setError(err.message || 'Error saving product information.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product? This action is irreversible.')) {
      try {
        await productService.deleteProduct(id);
        loadAllData();
      } catch (err) {
        alert(err.message || 'Failed to delete product.');
      }
    }
  };

  // Filter logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.productName.toLowerCase().includes(search.toLowerCase()) || 
                          p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    const matchesStatus = selectedStatus ? p.status === selectedStatus : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination calculations
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Product Inventory</h2>
          <p className="text-xs text-slate-500 font-medium">Manage security assets, stock counts and prices</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm self-end sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </button>
      </div>

      {/* Filters bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search SKU or Name..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="block w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          />
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
            className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <select
            value={selectedStatus}
            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
            className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-100 rounded-lg">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold text-xs uppercase bg-slate-50/50">
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Product Details</th>
                <th className="py-3 px-4">Category & Brand</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400 text-sm">
                    No products found matching filters.
                  </td>
                </tr>
              ) : (
                currentProducts.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4">
                      <img 
                        src={p.image || 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=200'} 
                        alt={p.productName} 
                        className="w-12 h-12 object-cover rounded border bg-slate-50 shadow-sm"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-800 block text-sm leading-tight hover:underline cursor-pointer">
                        {p.productName}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">SKU: {p.sku}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-slate-700 block font-semibold text-xs leading-none mb-1">{p.category}</span>
                      <span className="text-[10px] text-blue-600 font-extrabold uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {p.brand}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {p.offerPrice > 0 ? (
                        <div className="flex flex-col">
                          <span className="text-blue-600 font-bold">${p.offerPrice.toFixed(2)}</span>
                          <span className="text-[10px] text-slate-400 line-through">${p.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="text-slate-800 font-bold">${p.price.toFixed(2)}</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {p.status === 'inactive' ? (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          Unavailable
                        </span>
                      ) : p.stockQuantity > 0 ? (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                          {p.stockQuantity} In Stock
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
                          Out Of Stock
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                        p.status === 'active' 
                          ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                        {p.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="inline-flex items-center p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="inline-flex items-center p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500 font-medium">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} items
          </span>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white border border-slate-200 rounded text-slate-500 hover:bg-slate-50 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded text-xs font-semibold border ${
                  currentPage === page 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/10' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-white border border-slate-200 rounded text-slate-500 hover:bg-slate-50 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Create / Edit Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all my-8">
            <div className="flex justify-between items-center px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-bold text-slate-800">
                {editId ? 'Modify System Asset' : 'Catalog New Security Equipment'}
              </h3>
              <button 
                onClick={() => setModalOpen(false)} 
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-red-600 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Grid 1: Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Vigilance X1 Pro Dome Camera"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-sm font-mono focus:ring-2 focus:ring-blue-500"
                    placeholder="VS-D-9923"
                  />
                </div>
              </div>

              {/* Grid 2: Relationships */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Manufacturer Brand</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-sm bg-white"
                  >
                    <option value="">Select Brand</option>
                    {brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Category Group</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-sm bg-white"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              {/* Grid 3: Pricing and Stocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">List Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="599.00"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Offer Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Optional promo price"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="42"
                  />
                </div>
              </div>

              {/* Descriptions & Specs */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Full product descriptions and details..."
                  ></textarea>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Technical Specifications (One per line)</label>
                  <textarea
                    value={specifications}
                    onChange={(e) => setSpecifications(e.target.value)}
                    rows="3"
                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-sm font-mono focus:ring-2 focus:ring-blue-500"
                    placeholder="Resolution: 4K Ultra HD&#10;Night Vision: 30m infrared&#10;IP Rating: IP67 Weatherproof"
                  ></textarea>
                </div>
              </div>

              {/* Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <div>
                  <label className="text-xs font-semibold text-slate-700 uppercase block mb-2">Main Catalog Image</label>
                  <CloudinaryUpload 
                    value={image} 
                    onChange={setImage} 
                    folder="products_main"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 uppercase block mb-2">Gallery Slide Images</label>
                  <CloudinaryUpload 
                    value={galleryImages} 
                    onChange={setGalleryImages} 
                    multiple={true}
                    folder="products_gallery"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-col sm:flex-row gap-6 border-t border-slate-100 pt-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4.5 h-4.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="featured" className="text-xs font-semibold text-slate-700 uppercase block">Featured Showcase Product</label>
                </div>
                <div className="sm:ml-auto flex items-center space-x-3">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Availability Status:</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-800 text-sm bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active (Publish)</option>
                    <option value="inactive">Inactive (Hide)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  {editId ? 'Update Inventory' : 'Create Asset Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
