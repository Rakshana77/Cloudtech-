import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { brandService } from '../services/brandService';
import { 
  ArrowRight, 
  ShieldCheck, 
  Camera, 
  Shield, 
  Wrench, 
  DoorOpen, 
  Network, 
  ClipboardList, 
  Star 
} from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prods, brnds] = await Promise.all([
          productService.getProducts(),
          brandService.getBrands()
        ]);
        
        setFeaturedProducts(prods.filter(p => p.featured === true || p.status === 'active').slice(0, 4));
        setBrands(brnds.filter(b => b.status === 'active').slice(0, 8));
      } catch (error) {
        console.error('Error fetching home statistics:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <main className="text-[#111827] bg-[#F6F8FB] font-sans min-h-screen pb-16">
      
      {/* Hero Section */}
      <section className="max-w-[1280px] mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Side (45%) */}
        <div className="w-full lg:w-[45%] space-y-8 text-left">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#1453E3]/10 text-[#1453E3] text-xs font-bold tracking-widest uppercase border border-[#1453E3]/20">
            TRUST IS OUR FOUNDATION
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold leading-[1.05] tracking-tight text-[#111827]">
            Your Safety is <br />
            Our <br />
            <span className="text-[#1453E3]">Top Priority</span>
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            Stop worrying about blind spots. Our AI-driven surveillance provides 24/7 crystal-clear protection for your family and assets, anywhere in the world.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              to="/products" 
              className="bg-[#1453E3] hover:bg-[#1453E3]/90 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-lg shadow-[#1453E3]/20 transition-all"
            >
              Shop Now
            </Link>
            <Link 
              to="/request-quote" 
              className="bg-white text-[#475569] px-8 py-4 rounded-xl font-bold text-sm border border-[#E5E7EB] hover:bg-slate-50 transition-all"
            >
              Get Free Quote
            </Link>
          </div>
        </div>

        {/* Right Side (55% container) */}
        <div className="w-full lg:w-[55%]">
          <div className="relative rounded-[40px] overflow-hidden flex items-center justify-center min-h-[480px] shadow-2xl bg-gradient-to-br from-[#0B1726] via-[#102B3A] to-[#152B36]">
            {/* Glow center effect */}
            <div className="absolute w-80 h-80 rounded-full bg-blue-500/10 blur-[80px]" />
            <img 
              alt="Premium CCTV Product Showcase" 
              className="absolute inset-0 w-full h-full object-cover z-10 drop-shadow-[0_20px_50px_rgba(20,83,227,0.3)]" 
              src="/hero-camera.png" 
            />
          </div>
        </div>
      </section>

      {/* Explore Solutions Section */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] pb-4 relative">
            Explore Solutions
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#1453E3] rounded-full" />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Large Feature Card Left */}
          <Link 
            to="/products"
            className="rounded-[32px] overflow-hidden relative min-h-[400px] flex flex-col justify-end p-10 bg-slate-900 group shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
            <img 
              alt="Premium CCTV Product" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
              src="/explore-camera.png" 
            />

            <div className="relative z-20 space-y-4 text-left">
              <span className="inline-flex p-3 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20">
                <Camera className="w-6 h-6" />
              </span>
              <h3 className="text-white text-3xl font-extrabold">Surveillance Systems</h3>
              <p className="text-white/70 text-sm max-w-sm">4K Ultra HD AI cameras designed for maximum coverage layouts.</p>
            </div>
          </Link>

          {/* Right Side Stacked Cards */}
          <div className="flex flex-col gap-8">
            {/* Card 1 */}
            <Link 
              to="/products"
              className="bg-white p-8 rounded-[32px] border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between h-1/2"
            >
              <div>
                <span className="inline-flex p-3 rounded-xl bg-[#1453E3]/5 text-[#1453E3] mb-4">
                  <Shield className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-[#111827]">DVR/NVR Hubs</h3>
                <p className="text-[#475569] text-sm mt-1.5">Massive storage solutions for multi-channel recording.</p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link 
              to="/products"
              className="bg-white p-8 rounded-[32px] border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between h-1/2"
            >
              <div>
                <span className="inline-flex p-3 rounded-xl bg-[#1453E3]/5 text-[#1453E3] mb-4">
                  <Wrench className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-[#111827]">Essential Parts</h3>
                <p className="text-[#475569] text-sm mt-1.5">High-performance cables, mounts, and power supplies.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Security Gear */}
      <section className="max-w-[1280px] mx-auto px-6 py-16 space-y-10">
        <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-6">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#111827]">Popular Security Gear</h2>
            <p className="text-[#475569] text-sm mt-1">Hardware trusted by thousands of businesses and homeowners.</p>
          </div>
          <Link to="/products" className="text-[#1453E3] font-bold text-sm flex items-center gap-1 hover:underline">
            Full Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white border h-[500px] rounded-[28px]"></div>
            ))
          ) : featuredProducts.length === 0 ? (
            <div className="col-span-full text-center text-xs text-slate-400 py-10">
              No products found. Add products in the admin panel.
            </div>
          ) : (
            featuredProducts.map(product => {
              const currentPrice = product.offerPrice > 0 ? product.offerPrice : product.price;
              const discount = product.offerPrice > 0 ? Math.round(((product.price - product.offerPrice) / product.price) * 100) : 0;
              return (
                <div 
                  key={product.id} 
                  className="bg-white border border-[#E5E7EB] rounded-[28px] h-[500px] flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-1.5 group p-5"
                >
                  {/* Top Image area (65% height equivalent) */}
                  <Link to={`/product/${product.id}`} className="relative h-[280px] bg-slate-50 border border-slate-100 rounded-[20px] flex items-center justify-center p-4 overflow-hidden">
                    <img 
                      alt={product.productName} 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" 
                      src={product.image || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=200'} 
                    />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {discount > 0 && (
                        <span className="bg-[#1453E3] text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          SALE
                        </span>
                      )}
                      {product.featured && (
                        <span className="bg-slate-900 text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          NEW ARRIVAL
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Text meta */}
                  <div className="space-y-3 pt-2 text-left">
                    <div className="flex justify-between items-center text-[10px] text-[#475569] font-bold uppercase tracking-wider">
                      <span>{product.brand}</span>
                      <div className="flex items-center text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                        <span>4.9</span>
                      </div>
                    </div>
                    
                    <Link to={`/product/${product.id}`} className="block">
                      <h4 className="font-bold text-[#111827] text-sm leading-tight hover:text-[#1453E3] transition-colors line-clamp-2">
                        {product.productName}
                      </h4>
                    </Link>
                    <span className="text-[10px] text-slate-400 font-mono block">SKU: {product.sku}</span>
                  </div>

                  {/* Price and Add button */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                    <div className="flex flex-col text-left">
                      {product.offerPrice > 0 ? (
                        <>
                          <span className="text-base font-extrabold text-[#1453E3]">${product.offerPrice.toFixed(2)}</span>
                          <span className="text-[10px] text-slate-400 line-through">${product.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="text-base font-extrabold text-[#111827]">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <Link 
                      to={`/product/${product.id}`} 
                      className="w-10 h-10 rounded-full bg-[#1453E3] hover:bg-[#1453E3]/90 text-white flex items-center justify-center shadow-md shadow-[#1453E3]/15 transition-all duration-300"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-[1280px] mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-extrabold text-[#1453E3] uppercase tracking-widest block">WHAT WE DO</span>
          <h2 className="text-3xl font-extrabold text-[#111827] tracking-tight">Security Solutions & Installation Services</h2>
          <p className="text-[#475569] text-sm max-w-2xl mx-auto font-medium">
            Professional security infrastructure designed, deployed, and maintained by experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* CCTV Installation */}
          <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-1.5 group flex flex-col justify-between text-left">
            <div className="space-y-4">
              <span className="inline-flex p-3.5 rounded-2xl bg-[#1453E3]/5 text-[#1453E3] group-hover:bg-[#1453E3] group-hover:text-white transition-colors duration-300">
                <Camera className="w-6 h-6" />
              </span>
              <h3 className="text-lg font-bold text-[#111827]">CCTV Installation</h3>
              <p className="text-[#475569] text-xs leading-relaxed">
                Professional installation of IP cameras, dome cameras, bullet cameras, PTZ cameras, NVR and DVR systems with complete configuration and testing.
              </p>
            </div>
            <a 
              href="https://wa.me/6581234567" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-6 inline-flex items-center text-xs font-bold text-[#1453E3] hover:underline space-x-1"
            >
              <span>Enquire via WhatsApp</span>
              <span>→</span>
            </a>
          </div>

          {/* Access Control Systems */}
          <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-1.5 group flex flex-col justify-between text-left">
            <div className="space-y-4">
              <span className="inline-flex p-3.5 rounded-2xl bg-[#1453E3]/5 text-[#1453E3] group-hover:bg-[#1453E3] group-hover:text-white transition-colors duration-300">
                <Shield className="w-6 h-6" />
              </span>
              <h3 className="text-lg font-bold text-[#111827]">Access Control Systems</h3>
              <p className="text-[#475569] text-xs leading-relaxed">
                Biometric attendance systems, facial recognition devices, RFID access control and visitor management solutions.
              </p>
            </div>
            <a 
              href="https://wa.me/6581234567" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-6 inline-flex items-center text-xs font-bold text-[#1453E3] hover:underline space-x-1"
            >
              <span>Enquire via WhatsApp</span>
              <span>→</span>
            </a>
          </div>

          {/* Annual Maintenance Contracts */}
          <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-1.5 group flex flex-col justify-between text-left">
            <div className="space-y-4">
              <span className="inline-flex p-3.5 rounded-2xl bg-[#1453E3]/5 text-[#1453E3] group-hover:bg-[#1453E3] group-hover:text-white transition-colors duration-300">
                <Wrench className="w-6 h-6" />
              </span>
              <h3 className="text-lg font-bold text-[#111827]">Annual Maintenance Contracts</h3>
              <p className="text-[#475569] text-xs leading-relaxed">
                Preventive maintenance, health checks, troubleshooting, firmware updates and system performance optimization.
              </p>
            </div>
            <a 
              href="https://wa.me/6581234567" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-6 inline-flex items-center text-xs font-bold text-[#1453E3] hover:underline space-x-1"
            >
              <span>Enquire via WhatsApp</span>
              <span>→</span>
            </a>
          </div>

          {/* Video Door Phones */}
          <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-1.5 group flex flex-col justify-between text-left">
            <div className="space-y-4">
              <span className="inline-flex p-3.5 rounded-2xl bg-[#1453E3]/5 text-[#1453E3] group-hover:bg-[#1453E3] group-hover:text-white transition-colors duration-300">
                <DoorOpen className="w-6 h-6" />
              </span>
              <h3 className="text-lg font-bold text-[#111827]">Video Door Phones</h3>
              <p className="text-[#475569] text-xs leading-relaxed">
                Smart video intercom and door phone solutions with remote monitoring and mobile application integration.
              </p>
            </div>
            <a 
              href="https://wa.me/6581234567" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-6 inline-flex items-center text-xs font-bold text-[#1453E3] hover:underline space-x-1"
            >
              <span>Enquire via WhatsApp</span>
              <span>→</span>
            </a>
          </div>

          {/* Networking Infrastructure */}
          <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-1.5 group flex flex-col justify-between text-left">
            <div className="space-y-4">
              <span className="inline-flex p-3.5 rounded-2xl bg-[#1453E3]/5 text-[#1453E3] group-hover:bg-[#1453E3] group-hover:text-white transition-colors duration-300">
                <Network className="w-6 h-6" />
              </span>
              <h3 className="text-lg font-bold text-[#111827]">Networking Infrastructure</h3>
              <p className="text-[#475569] text-xs leading-relaxed">
                PoE switches, network racks, CAT6 cabling, fiber connectivity and complete surveillance network infrastructure.
              </p>
            </div>
            <a 
              href="https://wa.me/6581234567" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-6 inline-flex items-center text-xs font-bold text-[#1453E3] hover:underline space-x-1"
            >
              <span>Enquire via WhatsApp</span>
              <span>→</span>
            </a>
          </div>

          {/* Security Consultation */}
          <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-1.5 group flex flex-col justify-between text-left">
            <div className="space-y-4">
              <span className="inline-flex p-3.5 rounded-2xl bg-[#1453E3]/5 text-[#1453E3] group-hover:bg-[#1453E3] group-hover:text-white transition-colors duration-300">
                <ClipboardList className="w-6 h-6" />
              </span>
              <h3 className="text-lg font-bold text-[#111827]">Security Consultation</h3>
              <p className="text-[#475569] text-xs leading-relaxed">
                Free site inspection, security assessment and customized surveillance planning by experienced professionals.
              </p>
            </div>
            <a 
              href="https://wa.me/6581234567" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-6 inline-flex items-center text-xs font-bold text-[#1453E3] hover:underline space-x-1"
            >
              <span>Enquire via WhatsApp</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Brands List */}
      <section className="max-w-[1280px] mx-auto px-6 py-16 space-y-6">
        <h3 className="text-lg font-bold text-[#111827] text-left">Distributor Brands</h3>
        <div className="flex flex-wrap items-center gap-8 opacity-60">
          {brands.map(b => (
            <div key={b.id} className="w-24 h-12 flex items-center justify-center p-2 bg-white rounded border border-[#E5E7EB] shadow-sm" title={b.name}>
              {b.logo ? (
                <img src={b.logo} alt={b.name} className="max-w-full max-h-full object-contain" />
              ) : (
                <span className="text-[10px] text-slate-500 font-bold uppercase">{b.name}</span>
              )}
            </div>
          ))}
        </div>
      </section>

    </main>
  );
};

export default Home;
