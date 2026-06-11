const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const cloudinaryService = {
  uploadImage: (file, onProgress) => {
    return new Promise((resolve, reject) => {
      if (!cloudName || !uploadPreset) {
        // Local preview fallback if not configured
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (onProgress) onProgress(100);
          resolve(reader.result);
        };
        reader.onerror = (err) => reject(err);
        return;
      }

      const xhr = new XMLHttpRequest();
      const fd = new FormData();

      xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, true);

      // Track progress
      if (onProgress) {
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            onProgress(percent);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          const resp = JSON.parse(xhr.responseText);
          let url = resp.secure_url;
          
          // Requirement 8: Automatically optimize and resize images using Cloudinary transformations
          if (url.includes('/upload/')) {
            url = url.replace('/upload/', '/upload/w_600,h_600,c_fill,f_auto,q_auto/');
          }
          resolve(url);
        } else {
          try {
            const err = JSON.parse(xhr.responseText);
            reject(new Error(err.error?.message || 'Upload failed'));
          } catch {
            reject(new Error('Upload failed'));
          }
        }
      };

      xhr.onerror = () => reject(new Error('Network error during upload'));

      fd.append('file', file);
      fd.append('upload_preset', uploadPreset);
      xhr.send(fd);
    });
  }
};
export default cloudinaryService;
