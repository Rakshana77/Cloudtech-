import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import { 
  ChevronRight, 
  ShieldCheck, 
  ShoppingCart, 
  PhoneCall, 
  Camera, 
  Cpu, 
  HardDrive, 
  Wrench, 
  Check, 
  Star,
  Loader2
} from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const prod = await productService.getProductById(id);
        setProduct(prod);
        setActiveImage(prod.image || '');
        
        // Fetch related products
        const allProds = await productService.getProducts();
        const related = allProds.filter(p => p.category === prod.category && p.id !== prod.id && p.status === 'active').slice(0, 4);
        setRelatedProducts(related);
      } catch (err) {
        console.error('Error loading product details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Security Asset Not Found</h2>
        <p className="text-xs text-slate-500 font-medium">This equipment item does not exist or has been decommissioned.</p>
        <Link to="/products" className="inline-flex px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const specList = product.specifications 
    ? product.specifications.split('\n').filter(s => s.trim()) 
    : ['Standard CCTV scoping parameters', 'IP66 Environment Rating', '12V DC Input'];

  const discount = product.offerPrice > 0 ? Math.round(((product.price - product.offerPrice) / product.price) * 100) : 0;
  const currentPrice = product.offerPrice > 0 ? product.offerPrice : product.price;

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <main className="max-w-7xl mx-auto pt-10 pb-20 px-6 font-sans space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-400 uppercase">
        <Link to="/products" className="hover:text-blue-600">Catalog</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-600 capitalize">{product.category}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 truncate max-w-xs">{product.productName}</span>
      </nav>

      {/* Main product card details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Gallery / Images */}
        <div className="lg:col-span-7 space-y-4">
          <div className="h-96 w-full bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-center p-6 relative overflow-hidden">
            <img 
              src={activeImage || "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=400"} 
              alt={product.productName} 
              className="max-h-full max-w-full object-contain" 
            />
          </div>
          
          {/* Thumbnails */}
          {(product.galleryImages && product.galleryImages.length > 0) && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              <button 
                onClick={() => setActiveImage(product.image)}
                className={`w-16 h-16 border rounded-lg bg-slate-50 overflow-hidden flex items-center justify-center p-1 flex-shrink-0 transition-all ${
                  activeImage === product.image ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <img src={product.image} className="max-h-full max-w-full object-contain" alt="main" />
              </button>
              {product.galleryImages.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(url)}
                  className={`w-16 h-16 border rounded-lg bg-slate-50 overflow-hidden flex items-center justify-center p-1 flex-shrink-0 transition-all ${
                    activeImage === url ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={url} className="max-h-full max-w-full object-contain" alt={`gallery-${idx}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Meta & Configuration Options */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-600 font-extrabold uppercase bg-blue-50 border border-blue-100 px-3 py-0.5 rounded">
                {product.brand}
              </span>
              <div className="flex items-center text-amber-500 text-xs font-bold">
                <Star className="w-4 h-4 fill-current mr-1" />
                <span>4.9 (128 Scopes)</span>
              </div>
            </div>
            
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight leading-tight">
              {product.productName}
            </h1>
            <span className="text-xs text-slate-400 font-mono block">SKU Code: {product.sku}</span>
          </div>

          <div className="flex items-baseline space-x-3 py-2 border-y border-slate-100">
            {product.offerPrice > 0 ? (
              <>
                <span className="text-3xl font-extrabold text-blue-600">${product.offerPrice.toFixed(2)}</span>
                <span className="text-sm text-slate-400 line-through">${product.price.toFixed(2)}</span>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                  Save {discount}%
                </span>
              </>
            ) : (
              <span className="text-3xl font-extrabold text-slate-800">${product.price.toFixed(2)}</span>
            )}
          </div>

          <p className="text-slate-500 text-xs leading-relaxed">
            {product.description || 'Professional grade integration equipment, built with high-fidelity components to handle critical CCTV network loads.'}
          </p>

          {/* Lead Generation / Scoping Contact Card */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="font-bold text-[#0F172A] text-base">Interested in this product?</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Speak with our security experts for pricing, installation and technical guidance.
              </p>
            </div>

            <div className="space-y-3">
              {/* WhatsApp Us (Green Button) */}
              <a
                href={`https://wa.me/6581234567?text=${encodeURIComponent(
                  `Hello Cloud Info Tech,\n\nI am interested in:\n\n${product.productName}\n\nPlease share:\n\n* Pricing\n* Installation charges\n* Warranty details\n\nThank you.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors space-x-2 shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>

              {/* Call Sales Team (Outline Button) */}
              <a
                href="tel:+6567471104"
                className="w-full flex items-center justify-center py-3 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg transition-colors space-x-2 bg-white"
              >
                <PhoneCall className="w-4 h-4 text-slate-400" />
                <span>Call Sales Team (+65 6747 1104)</span>
              </a>

              {/* Request Quotation (Primary Blue Button) */}
              <Link
                to="/request-quote"
                className="w-full flex items-center justify-center py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                <span>Request Quotation</span>
              </Link>
            </div>

            {/* Checklist details */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-4 border-t border-slate-200 text-[10px] font-bold text-slate-600">
              <div className="flex items-center space-x-1">
                <span className="text-blue-600 text-xs">✓</span>
                <span>Installation Available</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-blue-600 text-xs">✓</span>
                <span>Technical Support Available</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-blue-600 text-xs">✓</span>
                <span>Warranty Support</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-blue-600 text-xs">✓</span>
                <span>Same-Day Response</span>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Tabs description */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex space-x-8 border-b border-slate-100 pb-4 mb-6 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('description')} 
            className={`text-xs font-bold uppercase tracking-wider pb-2 transition-all ${
              activeTab === 'description' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Equipment Details
          </button>
          <button 
            onClick={() => setActiveTab('specs')} 
            className={`text-xs font-bold uppercase tracking-wider pb-2 transition-all ${
              activeTab === 'specs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Technical Specs
          </button>
        </div>

        {activeTab === 'description' ? (
          <div className="space-y-4 max-w-3xl text-slate-600 text-xs leading-relaxed">
            <h4 className="font-bold text-slate-800 text-sm">Industrial Scoping Specifications</h4>
            <p>
              This {product.brand} surveillance equipment represents the pinnacle of modern hardware design. Optimized for both commercial integration and security layouts, it features customized engineering to run on continuous power feeds with high-fidelity signal rendering.
            </p>
            <ul className="space-y-2 pl-4 list-disc">
              <li>Low light environment performance algorithms.</li>
              <li>IP rating parameters to withstand harsh outdoor conditions.</li>
              <li>Fully compliant with Singapore standard CCTV installation grids.</li>
            </ul>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl text-xs font-medium">
            {specList.map((spec, i) => {
              const parts = spec.split(':');
              return (
                <div key={i} className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">{parts[0]}</span>
                  <span className="text-slate-800 font-bold text-right">{parts[1] || 'Compliant'}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800">Related Equipment Stock</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <Link 
                key={p.id} 
                to={`/product/${p.id}`} 
                className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-40 bg-slate-50 border rounded-lg flex items-center justify-center p-3 mb-3">
                    <img src={p.image} className="max-h-full max-w-full object-contain" alt={p.productName} />
                  </div>
                  <span className="text-[10px] text-blue-600 font-extrabold uppercase block">{p.brand}</span>
                  <h4 className="text-xs font-bold text-slate-700 leading-tight mt-1 line-clamp-2">{p.productName}</h4>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between font-bold text-xs text-slate-800">
                  <span>${(p.offerPrice > 0 ? p.offerPrice : p.price).toFixed(2)}</span>
                  <span className="text-[10px] text-blue-600">Inspect specs</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </main>
  );
};

export default ProductDetails;
