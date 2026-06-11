import React, { useState } from 'react';
import { Upload, X, Loader2, RefreshCw } from 'lucide-react';
import cloudinaryService from '../services/cloudinaryService';

const CloudinaryUpload = ({ 
  value, 
  onChange, 
  multiple = false 
}) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const uploadFiles = async (files) => {
    if (!files.length) return;
    setLoading(true);
    setProgress(0);
    setError('');

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        let fileProgress = 0;
        return await cloudinaryService.uploadImage(file, (percent) => {
          fileProgress = percent;
          setProgress(percent);
        });
      });

      const urls = await Promise.all(uploadPromises);

      if (multiple) {
        const currentUrls = Array.isArray(value) ? value : (value ? [value] : []);
        onChange([...currentUrls, ...urls]);
      } else {
        onChange(urls[0]);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error uploading file(s).');
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const handleFileChange = (e) => {
    uploadFiles(e.target.files);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (urlToRemove) => {
    if (multiple) {
      const currentUrls = Array.isArray(value) ? value : [];
      onChange(currentUrls.filter(url => url !== urlToRemove));
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Previews for single image */}
        {!multiple && value && typeof value === 'string' && (
          <div className="relative w-36 h-36 border border-slate-200 rounded-lg overflow-hidden bg-slate-50 group shadow-sm flex items-center justify-center p-2">
            <img src={value} alt="Preview" className="max-w-full max-h-full object-contain" />
            <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
              {/* Replace trigger */}
              <label className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full cursor-pointer shadow transition-colors">
                <RefreshCw className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {/* Delete trigger */}
              <button
                type="button"
                onClick={() => handleRemove(value)}
                className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Previews for multiple images */}
        {multiple && Array.isArray(value) && value.map((url, idx) => (
          <div key={idx} className="relative w-28 h-28 border border-slate-200 rounded-lg overflow-hidden bg-slate-50 group shadow-sm flex items-center justify-center p-1.5">
            <img src={url} alt={`Preview ${idx + 1}`} className="max-w-full max-h-full object-contain" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Drag and Drop Zone Container */}
        {(!value || multiple) && (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`w-full max-w-md min-h-[140px] border-2 border-dashed rounded-xl flex flex-col justify-center items-center p-6 text-center cursor-pointer transition-all ${
              dragActive 
                ? 'border-blue-600 bg-blue-50/20' 
                : 'border-slate-300 bg-slate-50 hover:bg-slate-100/50 hover:border-slate-400'
            } ${loading ? 'pointer-events-none opacity-60' : ''}`}
          >
            <label className="w-full h-full flex flex-col justify-center items-center cursor-pointer">
              {loading ? (
                <div className="space-y-2 flex flex-col items-center">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <span className="text-xs font-semibold text-slate-600">
                    Uploading: {progress}%
                  </span>
                  {/* Progress Bar */}
                  <div className="w-32 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full transition-all duration-150" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-xs text-slate-700 font-bold">
                    Drag & Drop image files here
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 font-semibold">
                    or click to choose files from device
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                multiple={multiple}
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}
    </div>
  );
};

export default CloudinaryUpload;
