import React, { useEffect, useState } from 'react';
import { brandService } from '../services/brandService';
import CloudinaryUpload from '../components/CloudinaryUpload';
import { Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react';

const AdminBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [status, setStatus] = useState('active');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const data = await brandService.getBrands();
      setBrands(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditId(null);
    setName('');
    setLogo('');
    setStatus('active');
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (brand) => {
    setEditId(brand.id);
    setName(brand.name);
    setLogo(brand.logo || '');
    setStatus(brand.status);
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Brand name is required');
      return;
    }

    try {
      const payload = { name, logo, status };
      if (editId) {
        await brandService.updateBrand(editId, payload);
      } else {
        await brandService.createBrand(payload);
      }
      setModalOpen(false);
      fetchBrands();
    } catch (err) {
      setError(err.message || 'An error occurred while saving.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this brand? All products using it will retain their brand tag but might need updating.')) {
      try {
        await brandService.deleteBrand(id);
        fetchBrands();
      } catch (err) {
        alert(err.message || 'Failed to delete brand');
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Brand Portfolio</h2>
          <p className="text-xs text-slate-500 font-medium">Manage manufacturing and distribution partners</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Brand
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold text-xs uppercase bg-slate-50/50">
                <th className="py-3.5 px-4">Logo</th>
                <th className="py-3.5 px-4">Brand Name</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-slate-400 text-sm">
                    No brands created yet. Click "Add Brand" to get started!
                  </td>
                </tr>
              ) : (
                brands.map((b) => (
                  <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="w-14 h-10 border rounded bg-slate-50 overflow-hidden flex items-center justify-center p-1">
                        {b.logo ? (
                          <img src={b.logo} alt={b.name} className="max-w-full max-h-full object-contain" />
                        ) : (
                          <span className="text-[10px] text-slate-400 font-bold uppercase">{b.name.slice(0,3)}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {b.name}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        b.status === 'active' 
                          ? 'bg-emerald-50 text-emerald-600' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {b.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(b)}
                        className="inline-flex items-center p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
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

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
            <div className="flex justify-between items-center px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-bold text-slate-800">
                {editId ? 'Edit Brand' : 'Create New Brand'}
              </h3>
              <button 
                onClick={() => setModalOpen(false)} 
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-red-600 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">
                  Brand Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  placeholder="e.g. Hikvision"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">
                  Brand Logo
                </label>
                <CloudinaryUpload 
                  value={logo} 
                  onChange={setLogo}
                  folder="brands"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm bg-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
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
                  {editId ? 'Save Changes' : 'Create Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBrands;
