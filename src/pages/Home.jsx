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
  Star,
  Laptop,
  Briefcase,
  Clock,
  Cpu,
  Monitor
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
        setBrands(brnds.filter(b => b.status === 'active'));
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
        {/* Left Side (50%) */}
        <div className="w-full lg:w-[50%] space-y-8 text-left">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#1453E3]/10 text-[#1453E3] text-xs font-bold tracking-widest uppercase border border-[#1453E3]/20">
            Trusted IT & Security Partner
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold leading-[1.15] tracking-tight text-[#0F172A]">
            Professional <br />
            <span className="text-[#1453E3]">Laptop Services</span> & <br />
            <span className="text-[#1453E3]">Security Systems</span>
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            Cloud Info Tech provides professional laptop sales, laptop repairs, desktop solutions, networking infrastructure, CCTV surveillance, access control systems and ongoing IT support for businesses and homes.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              to="/request-quote" 
              className="bg-[#1453E3] hover:bg-[#1453E3]/90 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-lg shadow-[#1453E3]/20 transition-all"
            >
              Get Free Quote
            </Link>
            <a 
              href="#solutions" 
              className="bg-white text-[#475569] px-8 py-4 rounded-xl font-bold text-sm border border-[#E5E7EB] hover:bg-slate-50 transition-all"
            >
              Explore Solutions
            </a>
          </div>
        </div>

        {/* Right Side (50% container) */}
        <div className="w-full lg:w-[50%]">
          <div className="relative rounded-[40px] overflow-hidden flex items-center justify-center min-h-[440px] shadow-2xl bg-gradient-to-br from-[#0B1726] via-[#102B3A] to-[#152B36]">
            {/* Glow center effect */}
            <div className="absolute w-80 h-80 rounded-full bg-blue-500/10 blur-[80px]" />
            <img 
              alt="Premium IT Products, Laptops and CCTV Showcase" 
              className="absolute inset-0 w-full h-full object-cover z-10 drop-shadow-[0_20px_50px_rgba(20,83,227,0.3)]" 
              src="/hero_it_security_split.png" 
            />
          </div>
        </div>
      </section>

      {/* About Cloud Info Tech Section */}
      <section className="bg-white py-[120px] border-t border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column (55%) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-[11px] font-extrabold text-[#1453E3] uppercase tracking-[0.2em] block">
                ABOUT CLOUD INFO TECH
              </span>
              <h2 className="text-4xl lg:text-[48px] font-extrabold leading-[1.15] tracking-tight text-[#0F172A]">
                Your Trusted <span className="text-[#1453E3]">Technology</span> & <br />
                <span className="text-[#1453E3]">Security</span> Partner
              </h2>
            </div>
            
            <div className="space-y-6 text-sm text-[#475569] leading-relaxed">
              <p>
                Cloud Info Tech provides complete technology solutions for businesses and individuals. From laptop sales and repairs to networking infrastructure and CCTV security systems, we help organizations build secure, efficient and reliable digital environments.
              </p>
              <p>
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
                  className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left flex flex-col justify-between min-h-[160px]"
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
          <h2 className="text-4xl md:text-[56px] font-extrabold text-[#111827] leading-[1.15] tracking-tight">
            Our Solutions
          </h2>
          <p className="text-[#475569] text-base md:text-lg max-w-[700px] mx-auto leading-relaxed">
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
                className="bg-white p-8 h-[280px] rounded-[24px] border border-[#E5E7EB] shadow-[0_10px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_50px_rgba(20,83,227,0.15)] transition-all duration-300 transform hover:-translate-y-2 text-left flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-[60px] h-[60px] rounded-2xl bg-[#1453E3]/5 text-[#1453E3] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1453E3] group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111827] mb-2">{cat.title}</h3>
                    <p className="text-[#475569] text-sm leading-relaxed line-clamp-3">{cat.desc}</p>
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
        <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-6">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#111827]">Popular Tech Gear</h2>
            <p className="text-[#475569] text-sm mt-1">High-quality laptops, custom systems, and CCTV hardware trusted by businesses.</p>
          </div>
          <Link to="/products" className="text-[#1453E3] font-bold text-sm flex items-center gap-1 hover:underline">
            Full Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white border h-[460px] rounded-[24px]"></div>
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
                    className="bg-white border border-[#E5E7EB] rounded-[24px] h-[460px] flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-1.5 group p-5"
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
                        <h4 className="font-bold text-[#111827] text-sm leading-snug hover:text-[#1453E3] transition-colors line-clamp-2">
                          {product.productName}
                        </h4>
                      </Link>
                      <span className="text-[10px] text-slate-400 font-mono block">SKU: {product.sku}</span>
                    </div>

                    {/* Price and Add button */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
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
      <section className="w-full bg-[#F8FAFC] py-20 text-center border-t border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto px-6 space-y-12">
          
          <div className="space-y-3 max-w-[700px] mx-auto">
            <h3 className="text-3xl font-extrabold tracking-tight text-[#111827]">
              Technology Brands We Support
            </h3>
            <p className="text-[#475569] text-sm md:text-base font-medium">
              We supply and support products from leading laptop, networking and security manufacturers.
            </p>
          </div>

          {brands.length === 0 ? (
            <div className="text-slate-400 text-xs py-8">No brands configured yet.</div>
          ) : (
            <>
              {/* Desktop Infinite Marquee */}
              <div className="hidden md:block overflow-hidden relative w-full py-4">
                {/* Gradient Fades for Premium look */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
                
                <div className="animate-marquee-ltr flex gap-8 items-center">
                  {[...brands, ...brands, ...brands, ...brands].map((brand, idx) => {
                    const logoSrc = brand.logo || brand.logoUrl;
                    return (
                      <div 
                        key={idx}
                        className="bg-white border border-[#E5E7EB] rounded-2xl px-7 py-4 flex items-center justify-center gap-3 shrink-0 text-[#111827] hover:border-[#1453E3] hover:text-[#1453E3] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-w-[180px] h-[72px]"
                      >
                        {logoSrc && (
                          <img src={logoSrc} alt={brand.name} className="h-7 w-auto object-contain" />
                        )}
                        <span className="font-extrabold text-sm tracking-wide">{brand.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile swipeable horizontal scroll */}
              <div className="md:hidden flex overflow-x-auto gap-4 py-4 px-6 scrollbar-none snap-x snap-mandatory">
                {brands.map((brand, idx) => {
                  const logoSrc = brand.logo || brand.logoUrl;
                  return (
                    <div 
                      key={idx}
                      className="snap-center bg-white border border-[#E5E7EB] rounded-2xl px-7 py-4 flex items-center justify-center gap-3 shrink-0 text-[#111827] hover:border-[#1453E3] hover:text-[#1453E3] hover:shadow-xl transition-all duration-300 min-w-[160px] h-[64px]"
                    >
                      {logoSrc && (
                        <img src={logoSrc} alt={brand.name} className="h-6 w-auto object-contain" />
                      )}
                      <span className="font-extrabold text-xs tracking-wide">{brand.name}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-[#1453E3] to-[#0F172A] rounded-[32px] p-8 md:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 text-left shadow-xl shadow-[#1453E3]/10">
          <div className="space-y-3 max-w-[650px]">
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">Need Professional IT Support?</h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
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
