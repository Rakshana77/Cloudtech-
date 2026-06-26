import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { brandService } from '../services/brandService';
import { heroBannerService } from '../services/heroBannerService';
import { 
  ArrowRight, 
  ShieldCheck, 
  Camera, 
  Shield, 
  Wrench, 
  DoorOpen, 
  Network, 
  ClipboardList, 
  Star,
  Laptop,
  Briefcase,
  Clock,
  Cpu,
  Monitor
} from 'lucide-react';

const getBrandBranding = (name) => {
  const lower = (name || '').toLowerCase();
  if (lower.includes('dell')) {
    return {
      gradient: 'from-blue-600 to-blue-800',
      hoverBorder: 'hover:border-blue-600',
      glowShadow: 'hover:shadow-[0_12px_30px_rgba(37,99,235,0.3)]',
      textColor: 'text-blue-600'
    };
  }
  if (lower.includes('hp')) {
    return {
      gradient: 'from-sky-400 to-sky-600',
      hoverBorder: 'hover:border-sky-400',
      glowShadow: 'hover:shadow-[0_12px_30px_rgba(56,189,248,0.3)]',
      textColor: 'text-sky-500'
    };
  }
  if (lower.includes('lenovo')) {
    return {
      gradient: 'from-red-600 to-red-800',
      hoverBorder: 'hover:border-red-600',
      glowShadow: 'hover:shadow-[0_12px_30px_rgba(220,38,38,0.3)]',
      textColor: 'text-red-600'
    };
  }
  if (lower.includes('asus')) {
    return {
      gradient: 'from-purple-600 to-indigo-700',
      hoverBorder: 'hover:border-purple-600',
      glowShadow: 'hover:shadow-[0_12px_30px_rgba(147,51,234,0.3)]',
      textColor: 'text-purple-600'
    };
  }
  if (lower.includes('hikvision')) {
    return {
      gradient: 'from-red-800 to-red-950',
      hoverBorder: 'hover:border-red-800',
      glowShadow: 'hover:shadow-[0_12px_30px_rgba(153,27,27,0.3)]',
      textColor: 'text-red-800'
    };
  }
  if (lower.includes('dahua')) {
    return {
      gradient: 'from-orange-500 to-red-600',
      hoverBorder: 'hover:border-orange-500',
      glowShadow: 'hover:shadow-[0_12px_30px_rgba(234,88,12,0.3)]',
      textColor: 'text-orange-600'
    };
  }
  if (lower.includes('zkteco')) {
    return {
      gradient: 'from-emerald-500 to-teal-700',
      hoverBorder: 'hover:border-emerald-600',
      glowShadow: 'hover:shadow-[0_12px_30px_rgba(5,150,105,0.3)]',
      textColor: 'text-emerald-600'
    };
  }
  if (lower.includes('cp plus')) {
    return {
      gradient: 'from-blue-900 to-slate-900',
      hoverBorder: 'hover:border-blue-900',
      glowShadow: 'hover:shadow-[0_12px_30px_rgba(30,58,138,0.3)]',
      textColor: 'text-blue-900'
    };
  }
  // Default - Primary Blue
  return {
    gradient: 'from-blue-600 to-indigo-600',
    hoverBorder: 'hover:border-[#1453E3]',
    glowShadow: 'hover:shadow-[0_12px_30px_rgba(20,83,227,0.3)]',
    textColor: 'text-[#1453E3]'
  };
};

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Slider State & Data
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const defaultBanners = [
    {
      title: "One Partner For All Your Technology Needs",
      subtitle: "Laptop sales, repairs, networking, security systems and ongoing IT support for businesses and homes.",
      buttonText: "Get Free Consultation",
      buttonLink: "/contact",
      imageUrl: "/images/combined_it_hero.png",
      mobileImageUrl: "/images/combined_it_hero.png",
      sortOrder: 1,
      status: true
    }
  ];

  const activeBanners = banners.length > 0 ? banners : defaultBanners;

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prods, brnds, fetchedBanners] = await Promise.all([
          productService.getProducts(),
          brandService.getBrands(),
          heroBannerService.getBanners()
        ]);
        
        setFeaturedProducts(prods.filter(p => p.featured === true || p.status === 'active').slice(0, 4));
        setBrands(brnds.filter(b => b.status === 'active'));
        setBanners(fetchedBanners.filter(b => b.status === true));
      } catch (error) {
        console.error('Error fetching home statistics:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Auto slide effect
  useEffect(() => {
    if (isHovered || activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % activeBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, activeBanners.length]);

  // Handle manual navigation
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % activeBanners.length);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  // Touch Swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <main className="text-[#111827] bg-[#F6F8FB] font-sans min-h-screen pb-16">
      
      {/* Dynamic Hero Slider */}
      <section 
        className="relative w-full h-[720px] bg-slate-950 overflow-hidden select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides Track */}
        {activeBanners.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image with Parallax & Zoom Effect (Single Responsive Image) */}
              <div 
                className={`absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[5000ms] ease-out ${
                  isActive ? 'scale-105 translate-y-0' : 'scale-100 translate-y-2'
                }`}
                style={{ backgroundImage: `url(${slide.imageUrl || slide.image})` }}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/45 z-10" />

              {/* Slide Content Container */}
              <div className="absolute inset-0 z-20 flex items-center justify-start text-white">
                <div className="max-w-[1280px] mx-auto px-6 w-full text-left space-y-6">
                  {/* Category Pill Badge */}
                  <span className={`inline-flex items-center px-4.5 py-2 rounded-full bg-[#1453E3] text-white text-xs font-extrabold tracking-widest uppercase shadow-lg shadow-[#1453E3]/30 transition-all duration-700 delay-300 transform ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    {slide.category || "Technology Solutions"}
                  </span>

                  {/* Heading */}
                  <h1 className={`text-4xl md:text-5xl lg:text-[64px] font-extrabold leading-[1.1] tracking-tight max-w-[850px] transition-all duration-700 delay-500 transform ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}>
                    {slide.title || slide.heading}
                  </h1>

                  {/* Description */}
                  <p className={`text-lg md:text-[20px] text-white/90 font-medium leading-relaxed max-w-[650px] transition-all duration-700 delay-700 transform ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                    {slide.subtitle || slide.description}
                  </p>

                  {/* CTAs */}
                  <div className={`flex flex-wrap gap-4 pt-4 transition-all duration-700 delay-900 transform ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}>
                    {slide.buttonText ? (
                      <Link 
                        to={slide.buttonLink || "/"}
                        className="bg-gradient-to-r from-[#1453E3] to-[#004bca] hover:scale-105 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-xl shadow-[#1453E3]/25 transition-all"
                      >
                        {slide.buttonText}
                      </Link>
                    ) : slide.ctaText1 ? (
                      <Link 
                        to={slide.ctaLink1 || "/"}
                        className="bg-gradient-to-r from-[#1453E3] to-[#004bca] hover:scale-105 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-xl shadow-[#1453E3]/25 transition-all"
                      >
                        {slide.ctaText1}
                      </Link>
                    ) : null}
                    
                    {(slide.ctaText2 || !slide.buttonText) && (
                      <Link 
                        to={slide.ctaLink2 || "/contact"}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:scale-105 px-8 py-4 rounded-xl font-bold text-sm transition-all backdrop-blur-sm"
                      >
                        {slide.ctaText2 || "Contact Us"}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Left/Right Glassmorphism Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all active:scale-95 shadow-lg group hidden md:block"
        >
          <svg className="w-6 h-6 transform rotate-180 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all active:scale-95 shadow-lg group hidden md:block"
        >
          <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bottom Center Dots - Pill Style */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {activeBanners.map((_, index) => {
            const isActive = index === currentSlide;
            return (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  isActive 
                    ? 'w-8 h-2.5 bg-[#1453E3]' 
                    : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            );
          })}
        </div>
      </section>

      {/* About Cloud Info Tech Shop Section */}
      <section className="bg-white py-[120px] border-t border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column (55%) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-[11px] font-extrabold text-[#1453E3] uppercase tracking-[0.2em] block">
                ABOUT CLOUD INFO TECH SHOP
              </span>
              <h2 className="font-h2 tracking-tight">
                Your Trusted <span className="text-[#1453E3]">Technology</span> & <br />
                <span className="text-[#1453E3]">Security</span> Partner
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="font-subheading">
                Cloud Info Tech Shop provides complete technology solutions for businesses and individuals. From laptop sales and repairs to networking infrastructure and CCTV security systems, we help organizations build secure, efficient and reliable digital environments.
              </p>
              <p className="font-subheading">
                With a focus on quality products, expert support and long-term customer relationships, we deliver practical technology solutions tailored to real business needs.
              </p>
            </div>

            {/* Trust highlights badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                "Laptop Sales & Upgrades",
                "Professional Laptop Repairs",
                "CCTV Installation & Maintenance",
                "Networking Infrastructure",
                "Business IT Support"
              ].map((highlight, idx) => (
                <span 
                  key={idx} 
                  className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#0F172A] shadow-sm"
                >
                  <span className="text-[#25D366] mr-2">✓</span> {highlight}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column (45%) - Statistics grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {[
              { val: "500+", lbl: "Devices Supported", desc: "Supervised & serviced", icon: Laptop },
              { val: "100+", lbl: "Business Clients", desc: "Corporate contracts", icon: Briefcase },
              { val: "24/7", lbl: "Technical Support", desc: "Constant help desk", icon: Clock },
              { val: "10+", lbl: "Technology Solutions", desc: "End-to-end expertise", icon: Cpu }
            ].map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <div 
                  key={i} 
                  className="bg-white border border-[#E2E8F0] rounded-[18px] p-6 shadow-[0_8px_25px_rgba(15,23,42,0.06)] hover:scale-[1.05] hover:-translate-y-1.5 hover:shadow-lg hover:border-blue-600/30 transition-all duration-300 text-left flex flex-col justify-between min-h-[160px] group"
                >
                  <span className="inline-flex p-3 rounded-2xl bg-[#1453E3]/5 text-[#1453E3] w-fit">
                    <StatIcon className="w-5 h-5" />
                  </span>
                  <div className="space-y-1.5 pt-4">
                    <div className="text-3xl font-black text-[#0F172A]">{stat.val}</div>
                    <div className="text-xs font-extrabold text-[#0F172A]">{stat.lbl}</div>
                    <div className="text-[10px] text-slate-400 font-semibold">{stat.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Our Solutions Section */}
      <section id="solutions" className="max-w-[1280px] mx-auto px-6 py-[120px]">
        <div className="flex flex-col items-center mb-16 text-center space-y-4">
          <span className="text-sm font-extrabold text-[#1453E3] uppercase tracking-[0.2em] block">
            WHAT WE DO
          </span>
          <h2 className="font-h2 tracking-tight">
            Our Solutions
          </h2>
          <p className="font-subheading max-w-[700px] mx-auto">
            Comprehensive IT, Laptop, Networking and Security Services for businesses and individuals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              title: "Laptop Sales", 
              desc: "Premium laptops from Dell, HP, Lenovo, ASUS and business-grade manufacturers.", 
              link: "/products?tab=laptops",
              icon: Laptop
            },
            { 
              title: "Laptop Repairs", 
              desc: "Motherboard repair, screen replacement, keyboard repair and software troubleshooting.", 
              link: "/contact",
              icon: Wrench
            },
            { 
              title: "Laptop Upgrades", 
              desc: "Increase speed, performance and productivity with professional upgrades.", 
              link: "/contact",
              icon: Cpu
            },
            { 
              title: "Desktop Builds", 
              desc: "High-performance systems for business, gaming and creative professionals.", 
              link: "/products?tab=laptops",
              icon: Monitor
            },
            { 
              title: "Networking Solutions", 
              desc: "Structured cabling, routers, switches, WiFi deployment and office networking.", 
              link: "/contact",
              icon: Network
            },
            { 
              title: "CCTV Solutions", 
              desc: "Professional surveillance systems, access control and remote monitoring.", 
              link: "/products?tab=security",
              icon: Camera
            }
          ].map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link 
                key={i} 
                to={cat.link}
                className="bg-white p-8 h-[280px] rounded-[18px] border border-[#E2E8F0] shadow-[0_8px_25px_rgba(15,23,42,0.06)] hover:scale-[1.05] hover:-translate-y-1.5 hover:shadow-lg hover:border-blue-600/50 transition-all duration-300 text-left flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-[60px] h-[60px] rounded-2xl bg-[#1453E3]/5 text-[#1453E3] flex items-center justify-center group-hover:scale-115 group-hover:bg-[#1453E3] group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-h3 mb-2">{cat.title}</h3>
                    <p className="text-[#64748B] text-sm leading-relaxed line-clamp-3 group-hover:text-slate-700 transition-colors">{cat.desc}</p>
                  </div>
                </div>
                <span className="text-[#1453E3] text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular Tech Gear Section */}
      <section className="max-w-[1280px] mx-auto px-6 py-16 space-y-10">
        <div className="flex justify-between items-end border-b border-[#E2E8F0] pb-6">
          <div>
            <h2 className="font-h2 tracking-tight">Popular Tech Gear</h2>
            <p className="font-subheading !text-sm mt-1">High-quality laptops, custom systems, and CCTV hardware trusted by businesses.</p>
          </div>
          <Link to="/products" className="text-[#1453E3] font-bold text-sm flex items-center gap-1 hover:underline">
            Full Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white border h-[460px] rounded-[18px]"></div>
            ))
          ) : featuredProducts.length === 0 ? (
            <div className="col-span-full text-center text-xs text-slate-400 py-10">
              No products found. Add products in the admin panel.
            </div>
          ) : (
            [...featuredProducts]
              .sort((a, b) => {
                const isLaptopA = ['Laptops', 'Gaming Laptops', 'Business Laptops', 'Workstations', 'Desktop PCs'].includes(a.category);
                const isLaptopB = ['Laptops', 'Gaming Laptops', 'Business Laptops', 'Workstations', 'Desktop PCs'].includes(b.category);
                if (isLaptopA && !isLaptopB) return -1;
                if (!isLaptopA && isLaptopB) return 1;
                return 0;
              })
              .map(product => {
                const discount = product.offerPrice > 0 ? Math.round(((product.price - product.offerPrice) / product.price) * 100) : 0;
                return (
                  <div 
                    key={product.id} 
                    className="bg-white border border-[#E2E8F0] rounded-[18px] h-[460px] flex flex-col justify-between overflow-hidden shadow-[0_8px_25px_rgba(15,23,42,0.06)] hover:scale-[1.05] hover:-translate-y-1.5 hover:shadow-lg hover:border-[#1453E3]/50 transition-all duration-300 group p-5"
                  >
                    {/* Top Image area */}
                    <Link to={`/product/${product.id}`} className="relative h-[220px] bg-slate-50 border border-slate-100 rounded-[20px] flex items-center justify-center p-4 overflow-hidden">
                      <img 
                        alt={product.productName} 
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" 
                        src={product.image || '/images/product-placeholder.png'} 
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
                            POPULAR
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Text meta */}
                    <div className="space-y-2.5 pt-2 text-left">
                      <div className="flex justify-between items-center text-[10px] text-[#475569] font-bold uppercase tracking-wider">
                        <span>{product.brand}</span>
                        <div className="flex items-center text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                          <span>4.9</span>
                        </div>
                      </div>
                      
                      <Link to={`/product/${product.id}`} className="block">
                        <h4 className="font-bold text-[#111827] text-sm sm:text-base leading-snug hover:text-[#1453E3] transition-colors line-clamp-2">
                          {product.productName}
                        </h4>
                      </Link>
                      <span className="text-[10px] text-slate-400 font-mono block">SKU: {product.sku}</span>
                    </div>

                    {/* Price and Add button */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
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
                        className="w-9 h-9 rounded-full bg-[#1453E3] hover:bg-[#1453E3]/90 text-white flex items-center justify-center shadow-md shadow-[#1453E3]/15 transition-all duration-300"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </section>

      {/* Brands available section */}
      <section 
        className="w-full py-20 text-center border-t border-[#E5E7EB]"
        style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)' }}
      >
        <div className="max-w-[1280px] mx-auto px-6 space-y-12">
          
          <div className="space-y-3 max-w-[700px] mx-auto">
            <h2 className="font-h2 tracking-tight">
              Brands Available in Our Catalog
            </h2>
            <p className="font-subheading">
              We supply products from leading laptop, networking and security manufacturers.
            </p>
          </div>

          {brands.length === 0 ? (
            <div className="text-slate-400 text-xs py-8">No brands configured yet.</div>
          ) : (
            <div className="overflow-hidden relative w-full py-6">
              {/* Gradient Fades for Premium look */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
              
              <div className="animate-marquee flex gap-6 items-center">
                {/* First loop of brands */}
                {brands.map((brand, idx) => {
                  const logoSrc = brand.logo || brand.logoUrl;
                  const branding = getBrandBranding(brand.name);
                  return (
                    <div 
                      key={`brand-first-${brand.id || idx}`}
                      className={`w-[160px] h-[80px] bg-white border border-[#E2E8F0] rounded-[18px] flex items-center justify-center gap-2.5 shrink-0 px-3.5 shadow-[0_8px_25px_rgba(15,23,42,0.06)] transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1.5 cursor-pointer group ${branding.hoverBorder} ${branding.glowShadow}`}
                    >
                      {logoSrc ? (
                        <div className="flex items-center gap-2">
                          <img 
                            src={logoSrc} 
                            alt={brand.name} 
                            className="h-6 max-w-[50px] object-contain filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                          />
                          <span className={`font-bold text-xs tracking-wide text-[#0F172A] group-hover:${branding.textColor} transition-colors select-none`}>
                            {brand.name}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${branding.gradient}`} />
                          <span className={`font-bold text-xs tracking-wide text-[#0F172A] group-hover:${branding.textColor} transition-colors select-none`}>
                            {brand.name}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
                {/* Second loop of brands to create seamless infinite scrolling */}
                {brands.map((brand, idx) => {
                  const logoSrc = brand.logo || brand.logoUrl;
                  const branding = getBrandBranding(brand.name);
                  return (
                    <div 
                      key={`brand-second-${brand.id || idx}`}
                      className={`w-[160px] h-[80px] bg-white border border-[#E2E8F0] rounded-[18px] flex items-center justify-center gap-2.5 shrink-0 px-3.5 shadow-[0_8px_25px_rgba(15,23,42,0.06)] transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1.5 cursor-pointer group ${branding.hoverBorder} ${branding.glowShadow}`}
                    >
                      {logoSrc ? (
                        <div className="flex items-center gap-2">
                          <img 
                            src={logoSrc} 
                            alt={brand.name} 
                            className="h-6 max-w-[50px] object-contain filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                          />
                          <span className={`font-bold text-xs tracking-wide text-[#0F172A] group-hover:${branding.textColor} transition-colors select-none`}>
                            {brand.name}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${branding.gradient}`} />
                          <span className={`font-bold text-xs tracking-wide text-[#0F172A] group-hover:${branding.textColor} transition-colors select-none`}>
                            {brand.name}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-[#1453E3] to-[#0F172A] rounded-[18px] p-8 md:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 text-left shadow-[0_8px_25px_rgba(15,23,42,0.15)] hover:scale-[1.02] transition-all duration-300">
          <div className="space-y-3 max-w-[650px]">
            <h2 className="font-h2 tracking-tight !text-white">Need Professional IT Support?</h2>
            <p className="font-subheading !text-white/80 mt-2">
              Get expert guidance for laptops, networking and security infrastructure.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link 
              to="/contact" 
              className="bg-white text-[#1453E3] hover:bg-white/95 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:scale-105 shadow-lg shadow-black/10"
            >
              Contact Us
            </Link>
            <a 
              href="https://wa.me/6581234567" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#25D366] hover:bg-[#25D366]/90 text-white px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-black/10"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
