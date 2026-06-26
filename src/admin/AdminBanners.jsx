import React, { useEffect, useState } from 'react';
import { heroBannerService } from '../services/heroBannerService';
import CloudinaryUpload from '../components/CloudinaryUpload';
import { Plus, Edit2, Trash2, X, AlertCircle, Eye, Copy, Check } from 'lucide-react';

const AdminBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonLink, setButtonLink] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sortOrder, setSortOrder] = useState('1');
  const [status, setStatus] = useState(true);

  // Preview state
  const [previewBanner, setPreviewBanner] = useState(null);

  const referencePrompt = "Ultra-premium enterprise technology hero banner for Cloud Info Tech Shop. Showcase professional laptops, networking equipment, CCTV surveillance cameras, business technology infrastructure, modern office environment, blue corporate branding, realistic lighting, premium commercial website style, large negative space for headings, ultra realistic, enterprise IT solutions, security systems, modern technology company, clean composition, 1920x1080 resolution.";

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const data = await heroBannerService.getBanners();
      setBanners(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch banners list.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referencePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openAddModal = () => {
    setEditId(null);
    setTitle('');
    setSubtitle('');
    setButtonText('');
    setButtonLink('');
    setImageUrl('');
    setSortOrder((banners.length + 1).toString());
    setStatus(true);
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (b) => {
    setEditId(b.id);
    setTitle(b.title || '');
    setSubtitle(b.subtitle || '');
    setButtonText(b.buttonText || '');
    setButtonLink(b.buttonLink || '');
    setImageUrl(b.imageUrl || '');
    setSortOrder((b.sortOrder !== undefined ? b.sortOrder : 1).toString());
    setStatus(b.status !== undefined ? Boolean(b.status) : true);
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Banner Title is required');
      return;
    }
    if (!imageUrl) {
      setError('Banner Image is required');
      return;
    }

    try {
      const payload = {
        title,
        subtitle,
        buttonText,
        buttonLink,
        imageUrl,
        mobileImageUrl: imageUrl, // use same high-quality responsive image
        sortOrder: Number(sortOrder) || 1,
        status: Boolean(status)
      };

      if (editId) {
        await heroBannerService.updateBanner(editId, payload);
      } else {
        await heroBannerService.createBanner(payload);
      }
      setModalOpen(false);
      fetchBanners();
    } catch (err) {
      setError(err.message || 'Error occurred while saving the banner.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await heroBannerService.deleteBanner(id);
        fetchBanners();
      } catch (err) {
        alert(err.message || 'Failed to delete banner');
      }
    }
  };

  const toggleStatus = async (b) => {
    try {
      await heroBannerService.updateBanner(b.id, {
        status: !b.status
      });
      fetchBanners();
    } catch (err) {
      alert(err.message || 'Failed to toggle status');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Compact Example AI Prompt Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left">
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Example AI Banner Prompt</h4>
          <p className="text-xs text-slate-500 font-mono leading-relaxed line-clamp-2 md:line-clamp-3">
            {referencePrompt}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 inline-flex items-center px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-all shadow-sm gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-400" />
              Copy Prompt
            </>
          )}
        </button>
      </div>

      {/* Main Management panel */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6 text-left">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800 font-headline">Homepage Banner List</h2>
            <p className="text-xs text-slate-500 font-medium">Manage Homepage Banners</p>
          </div>
          <button
            onClick={openAddModal}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Banner
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
                  <th className="py-3 px-4">Preview</th>
                  <th className="py-3 px-4">Banner Details</th>
                  <th className="py-3 px-4">Button CTA</th>
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {banners.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-slate-400 text-sm">
                      <div className="space-y-3">
                        <p>No homepage banners created yet.</p>
                        <button
                          onClick={openAddModal}
                          className="inline-flex items-center px-4.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-md"
                        >
                          <Plus className="w-3.5 h-3.5 mr-1.5" />
                          Add First Banner
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  banners.map((b) => (
                    <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4">
                        <img 
                          src={b.imageUrl} 
                          alt={b.title} 
                          className="w-24 h-14 object-cover rounded border bg-slate-100 shadow-sm"
                        />
                      </td>
                      <td className="py-4 px-4 max-w-xs">
                        <span className="font-bold text-slate-800 block text-sm leading-tight">
                          {b.title}
                        </span>
                        <span className="text-xs text-slate-400 block truncate mt-1">{b.subtitle}</span>
                      </td>
                      <td className="py-4 px-4">
                        {b.buttonText ? (
                          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded border">
                            {b.buttonText} ➔ {b.buttonLink || '/'}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">No CTA button</span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-slate-700">
                        {b.sortOrder !== undefined ? b.sortOrder : 1}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleStatus(b)}
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer border ${
                            b.status 
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100' 
                              : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          {b.status ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => setPreviewBanner(b)}
                          className="inline-flex items-center p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                          title="Preview Slide"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
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
      </div>

      {/* Add / Edit Banner Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 text-left">
                {editId ? 'Edit Banner' : 'Add Banner'}
              </h3>
              <button 
                onClick={() => setModalOpen(false)} 
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-left">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-red-600 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Banner Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Professional Laptop Sales for Business & Personal Use"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Banner Description</label>
                <textarea
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  rows="3"
                  className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Explore premium laptops, workstations, gaming systems and business devices from leading global brands."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Button Text</label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Explore Products"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Button Link</label>
                  <input
                    type="text"
                    value={buttonLink}
                    onChange={(e) => setButtonLink(e.target.value)}
                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. /products?tab=laptops"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <label className="text-xs font-semibold text-slate-700 uppercase block mb-2">Banner Image *</label>
                <CloudinaryUpload 
                  value={imageUrl} 
                  onChange={setImageUrl} 
                  folder="hero_banners"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Display Order</label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="1"
                    min="1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Status</label>
                  <select
                    value={status ? 'active' : 'inactive'}
                    onChange={(e) => setStatus(e.target.value === 'active')}
                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-sm bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
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
                  {editId ? 'Save Changes' : 'Add Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewBanner && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-slate-800 max-w-4xl w-full relative">
            <div className="absolute top-4 right-4 z-50">
              <button 
                onClick={() => setPreviewBanner(null)} 
                className="bg-black/60 text-white hover:bg-black/90 p-2 rounded-full transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Aspect box mimicking the actual slider slide */}
            <div className="relative w-full aspect-video md:h-[480px] bg-slate-900 overflow-hidden flex items-center justify-start text-white">
              {/* Image */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${previewBanner.imageUrl})` }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/45" />

              {/* Text */}
              <div className="relative z-10 px-8 md:px-16 space-y-4 text-left">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#1453E3] text-white text-[10px] font-bold tracking-widest uppercase">
                  Preview Mode
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold max-w-xl leading-tight">
                  {previewBanner.title}
                </h2>
                <p className="text-sm md:text-base text-white/80 max-w-md">
                  {previewBanner.subtitle}
                </p>
                {previewBanner.buttonText && (
                  <button className="bg-gradient-to-r from-[#1453E3] to-[#004bca] text-white px-6 py-2.5 rounded-lg font-bold text-xs">
                    {previewBanner.buttonText}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBanners;
