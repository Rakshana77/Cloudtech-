import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const Home = () => {
    return (
        <main className="pt-16 text-on-surface bg-surface">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-10"></div>
                    <img alt="Modern Smart Home" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDu97QIKtZA7PFakrIw0pbnYIedT6mW_OeMRnPsjWInA8ys_7316ZFoid47yWqzdrkdBzoZ9ohbMQtLg0klrOcweo-weWQeu9ONUzxKl5RZ7XOxYA6zIIpzDhVsGpoIGYig6Zb-POxtdo9N6UGvsXjKgm0nJrFeqCD6uPn0o7VBrr88BgSNlTop7KudxohDdVYKCvTPYtxj0fEgHcN4Te5IJ7dt5dlvZTaSYO-LeAc65fB-QdnSEd_xOSVZC_Hg_eK0UtKQMGW5aCLA" />
                </div>
                <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-20">
                    <div>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-8 border border-primary/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Trust is Our Foundation
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-extrabold font-headline leading-[1.1] mb-8">
                            Your Safety is Our <br /><span className="text-primary">Top Priority</span>
                        </h1>
                        <p className="text-xl text-on-surface-variant mb-12 max-w-xl leading-relaxed font-medium">
                            Stop worrying about blind spots. Our AI-driven surveillance provides 24/7 crystal-clear protection for your family and assets, anywhere in the world.
                        </p>
                        <div className="flex flex-wrap gap-5">
                            <Link to="/products" className="primary-gradient text-white px-10 py-5 rounded-xl font-bold text-lg shadow-2xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 hover:primary-gradient-hover transition-all active:scale-95 flex items-center gap-2">
                                Shop Now <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                            <button className="bg-surface-container-low text-on-surface px-10 py-5 rounded-xl font-bold text-lg border border-slate-200 hover:bg-white hover:shadow-lg transition-all active:scale-95">
                                Get Free Quote
                            </button>
                        </div>
                    </div>
                    <div className="hidden lg:block relative">
                        <div className="relative z-10 p-4 bg-white/30 backdrop-blur-md rounded-[2.5rem] ghost-border shadow-2xl">
                            <img alt="Professional Security Hardware" className="w-full h-auto rounded-[2rem] shadow-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwVv9kMhtGwDS0UvvCRvtOPq7sdRKY6Ym4aC8T8jt9z8WdbAHk1ly3dD0Spk0B1VVUggUw-f7qCkcmEj5CogwRRv1Xqt7zYRA2V5VDz-Pn9evY54_itSOsAvodSul_LVoa6a-hM0-qqvE9_CVfP0Ys_BlIFc9ykEhheY1N3aYq-4V1gTJFYkNfAOgoR_yXRwOwAmRfzGfrUZuxBKXSRWSakMGH3_EEkqwOzx5juDOzSOPG6yvfCxHBcYPJLgjVoOzeEmhnTonghBu9" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute -top-6 -left-6 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
                    </div>
                </div>
            </section>

            {/* Unified Trust Bar */}
            <section className="py-12 bg-surface-container-low border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {['verified_user', 'support_agent', 'build_circle'].map((icon, i) => (
                        <div key={i} className="flex items-center space-x-5 group">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-3xl">{icon}</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-on-surface">
                                    {i === 0 ? '2-Year Warranty' : i === 1 ? '24/7 Expert Support' : 'Pro Installation'}
                                </h4>
                                <p className="text-on-surface-variant text-sm">
                                    {i === 0 ? 'Full replacement guarantee' : i === 1 ? 'Assistance anytime you need' : 'Certified tech deployment'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="text-4xl font-extrabold font-headline mb-4">Explore Solutions</h2>
                    <div className="h-1.5 w-20 bg-primary rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <Link to="/products" className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl bg-slate-900 aspect-square md:aspect-auto shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer block">
                        <img alt="Smart Cameras" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsWgS9ZLaf5z7-h7yBm9-otgLSw2loMeT-dr6Jn95YhfEMgQXeeColngTnWjzgEt9_f_3oYDZKsszW4fYjrIMPIptUNa1leGmTo5UJUiupInLCGitBwl3ii3ZBlWuAzsDDl3uXzdlVvfNXztHKV8BIdSLIDD227bRJAr4dZAiJUkEy9GG_49mbBQ74xD-MyRUPN6ejRv6vHovIH9O2CIUJQ6P6jAjf2NpR-L6GgHp5Wlikf5Id9KRkCx8KKik0gFtZY0bGiVEC3374" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-10 flex flex-col justify-end">
                            <div className="mb-4 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                                <span className="material-symbols-outlined text-3xl">videocam</span>
                            </div>
                            <h3 className="text-white text-3xl font-extrabold mb-3">Surveillance Cameras</h3>
                            <p className="text-white/70 text-base max-w-xs leading-relaxed">4K Ultra HD resolution with AI-powered movement tracking and face recognition.</p>
                        </div>
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">arrow_outward</span>
                            </div>
                        </div>
                    </Link>
                    <Link to="/products" className="group relative overflow-hidden rounded-3xl bg-surface-container-lowest border border-slate-100 h-80 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 cursor-pointer block">
                        <div className="p-8">
                            <div className="mb-6 w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined text-3xl">storage</span>
                            </div>
                            <h3 className="text-on-surface text-xl font-bold mb-2">DVR/NVR Hubs</h3>
                            <p className="text-on-surface-variant text-sm">Massive storage solutions for multi-channel recording.</p>
                        </div>
                    </Link>
                    <Link to="/products" className="group relative overflow-hidden rounded-3xl bg-surface-container-lowest border border-slate-100 h-80 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 cursor-pointer block">
                        <div className="p-8">
                            <div className="mb-6 w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined text-3xl">settings_input_component</span>
                            </div>
                            <h3 className="text-on-surface text-xl font-bold mb-2">Essential Parts</h3>
                            <p className="text-on-surface-variant text-sm">High-performance cables, mounts, and power supplies.</p>
                        </div>
                    </Link>
                    <Link to="/solutions" className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-slate-100 h-80 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer block">
                        <img alt="Installation Kits" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlEbtbuge2vaVtCdm8Nx5F44DjsOESTbZVXKukHr9PTiCmeTPS-iosRfB0gl5BtUPV2DOOYJr3ApWaMCNzQo0I8-axuC1zrQpJHTbQw05NEKM9QKVIaQtuRDD8ozh6-ltXSFSRYoN9WojG7NYsZrglwCurb5zYvjE_MlkOqOSyrqzCxExX4C2F1OdhqOHJgZPoRNvzie1XEdAiw8KkoVQz-GIYlugXT3G_svEz90pNektmz6q03rWfIHMZGEl1JVUHcq4zC5aFRmck" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-10 flex flex-col justify-center">
                            <div className="mb-4 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-3xl">handyman</span>
                            </div>
                            <h3 className="text-white text-2xl font-extrabold mb-2">Professional Installation</h3>
                            <p className="text-white/80 text-sm max-w-xs">Let our certified experts set up your network for peak performance.</p>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl font-extrabold font-headline">Popular Security Gear</h2>
                        <p className="text-on-surface-variant mt-3 text-lg">Hardware trusted by thousands of businesses and homeowners.</p>
                    </div>
                    <Link to="/products" className="text-primary font-bold flex items-center hover:gap-3 transition-all">
                        Full Catalog <span className="material-symbols-outlined ml-1">arrow_forward</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {products.slice(0, 4).map(product => (
                        <Link key={product.id} to={`/product/${product.id}`} className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-2xl border border-slate-100 transition-all duration-300 group block">
                            <div className="relative overflow-hidden rounded-2xl bg-slate-50 mb-6 h-64 skeleton group-hover:bg-none">
                                <img alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={product.image} />
                                {product.isNew && <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg">New Arrival</div>}
                                {product.originalPrice && <div className="absolute top-4 left-4 bg-tertiary text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg">Sale</div>}
                            </div>
                            <h3 className="font-bold text-on-surface text-lg mb-1">{product.name}</h3>
                            <p className="text-on-surface-variant text-xs mb-6 truncate">{product.description}</p>
                            <div className="flex items-center justify-between border-t border-slate-50 pt-5">
                                <span className="text-2xl font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
                                <button className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center hover:bg-primary-container hover:-translate-y-1 transition-all active:scale-90 shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined text-2xl">add_shopping_cart</span>
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-extrabold font-headline mb-6">Built on Trusted Stories</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">We protect what matters most. See why thousands of customers choose Cloud Infotech for their security needs.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="bg-white/5 backdrop-blur-xl p-12 rounded-[2.5rem] border border-white/10 hover:border-primary/50 transition-colors group">
                            <div className="flex items-center gap-1 text-primary mb-8">
                                {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                            </div>
                            <p className="text-xl italic text-slate-300 mb-10 leading-[1.8] font-medium">"The installation was seamless. Cloud Infotech provided a comprehensive security assessment that revealed blind spots we hadn't even considered. Our warehouse is now fully secured with no compromises."</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-5">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-primary/20">
                                        <img alt="Marcus Chen" className="w-full h-full object-cover bg-gray-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN-RiJzqw9WPo-BSS70wVezA-OGyScd4fCmrVVVsffBkJ67O8vH43DOrI0CAhxpmOBkrhzSDfHAyRBGxs-gho4nWNG9CjxDjQwxGeSgSGtk4bmylf600kXlqD5UIEYkYC4DcaVOylYUeflpGDu0z1vlBYV6YXfLrm0OQfK95q8Q_YOQdcqYFb6RqTzl-ruC0AXizBwWnJadfaP6fl9WHtmI16BnhR16Lgv9jie4i7zfZW-zXrd_EFALKiNxt3gBhpxS6f7ygb_l9wa" />
                                    </div>
                                    <div>
                                        <h5 className="font-extrabold text-lg">Marcus Chen</h5>
                                        <p className="text-sm text-slate-500">Director, Logistics Hub</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl p-12 rounded-[2.5rem] border border-white/10 hover:border-primary/50 transition-colors group">
                            <div className="flex items-center gap-1 text-primary mb-8">
                                {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                            </div>
                            <p className="text-xl italic text-slate-300 mb-10 leading-[1.8] font-medium">"The 4K resolution is mind-blowing. Being able to check live feeds from my phone with zero lag gives me absolute peace of mind while traveling. I feel safe knowing my home is guarded."</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-5">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-primary/20">
                                        <img alt="Sarah Jenkins" className="w-full h-full object-cover bg-gray-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZtbQBL8xx-X-D2lwPGn1XHd4UdiRgfEf6Zed_5VTcxw6AmB94QJrCE4yNZ-Mp-zinB7ofLMdDHfoHEGlAqGKcOSsrnHAQx2ZFYNoKC7PCvfhm4xsCZcsMZ2OeivqQur14Kpm1QrrrG0YJGfuFpUsubvewENH5I8dm2iVFLKG1IRrL9j58e8Elr7XHyZAy2vVEVz90eWszx5P2OMTdXwPVQ9bwWtLtbzbnvy_x5Teql-Obzcs0UYilRXpGcSBa7YPa4yOVQnA83r9N" />
                                    </div>
                                    <div>
                                        <h5 className="font-extrabold text-lg">Sarah Jenkins</h5>
                                        <p className="text-sm text-slate-500">Home Owner</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chat FAB */}
            <button className="fixed bottom-10 right-10 w-16 h-16 rounded-2xl primary-gradient text-white shadow-[0_20px_50px_rgba(0,75,202,0.3)] flex items-center justify-center hover:scale-110 hover:-rotate-3 active:scale-95 transition-all z-50 group">
                <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">chat</span>
            </button>

        </main>
    );
};
export default Home;
