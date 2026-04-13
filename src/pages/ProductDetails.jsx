import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';

const ProductDetails = ({ onAddToCart }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id)) || products[0];
    const [activeTab, setActiveTab] = useState('description');

    return (
        <main className="pt-24 pb-20 max-w-7xl mx-auto px-6">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center space-x-2 text-sm text-on-surface-variant">
                <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="hover:text-primary transition-colors cursor-pointer">{product.category}</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="font-medium text-on-surface text-primary">{product.name}</span>
            </nav>

            {/* Product Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Gallery & Main Image */}
                <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-6">
                    {/* Thumbnails */}
                    <div className="flex md:flex-col gap-4 overflow-x-auto no-scrollbar md:w-24">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden cursor-pointer border-2 border-primary bg-surface-container-lowest p-2 flex-shrink-0">
                            <img className="w-full h-full object-contain" src={product.image} alt="Thumb 1" />
                        </div>
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden cursor-pointer bg-surface-container-low hover:bg-surface-container-high transition-colors p-2 flex-shrink-0">
                            <img className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvInRX-YmaWR15lQL66NvD2cvIHiz5fdUX7oikhJEpyBOr51MgOnKh92ZCzk0OwPuxL2V5MIJT8sLngLs1DprGbqYAAEd3jJ38Ml7WqyDgiuPJGtUaI6FneUhPinfTiCeoLRDKc7wfbbRegrcAh53okkVXh7PPr-N2H9OgkUNh7Jr9jKNNyW1j2Kl1sYvRGia6mzKwiCMk5C-AsBWEtznBqTttINGZwlAr7A8_jB1zmYjmYpwdhf1JjIorPGB6k6JccpCMGk6tB976" alt="Thumb 2" />
                        </div>
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden cursor-pointer bg-surface-container-low hover:bg-surface-container-high transition-colors p-2 flex-shrink-0">
                            <img className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOiNbL8_1btlXJqdwX54N_rUpyiTgS97OGYdtB6cSzapSkfAu0E9o5sYbeOEIgedSuZcg3ULRR6sEwLd4UZXA2ZpebE-1KeRGGi4C3zmKFuvDnaF6LLN0OT7-bNcyjgOXyzFsxtSAMU7GIZV1QW0ZhifdzYi8mxrHNet30lCmrn-0eLVp_G6mC8ijjgZDxh_JtQUiqxb-UpnQNZ_La2YW1JNTgk3gfUYvmEAJopQW3SimPyUYfRLtU6iELq_-ZrT2x4oh0KSKRxgLp" alt="Thumb 3" />
                        </div>
                    </div>
                    {/* Main Preview */}
                    <div className="flex-1 bg-surface-container-lowest rounded-[2rem] p-12 flex items-center justify-center relative shadow-sm overflow-hidden min-h-[400px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                        <img className="relative z-10 max-h-[500px] w-auto object-contain drop-shadow-2xl" src={product.image} alt={product.name} />
                    </div>
                </div>

                {/* Product Info */}
                <div className="lg:col-span-5 space-y-8">
                    <div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                            {product.isNew ? 'New Arrival' : 'In Stock'}
                        </div>
                        <h1 className="text-4xl font-extrabold font-headline text-on-surface tracking-tight mb-2">{product.name}</h1>
                        <p className="text-on-surface-variant leading-relaxed">{product.description || 'Advanced security surveillance with ultra-low light precision.'}</p>
                    </div>

                    <div className="flex items-baseline space-x-3">
                        <span className="text-4xl font-bold font-headline text-primary">${product.price.toFixed(2)}</span>
                        {product.originalPrice && <span className="text-on-surface-variant line-through">${product.originalPrice.toFixed(2)}</span>}
                    </div>

                    {/* Key Specs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 p-4 rounded-xl bg-surface-container-low">
                            <span className="material-symbols-outlined text-primary">4k</span>
                            <span className="text-sm font-medium">{product.resolution || 'High Definition'}</span>
                        </div>
                        <div className="flex items-center space-x-3 p-4 rounded-xl bg-surface-container-low">
                            <span className="material-symbols-outlined text-primary">nights_stay</span>
                            <span className="text-sm font-medium">Night Vision</span>
                        </div>
                        <div className="flex items-center space-x-3 p-4 rounded-xl bg-surface-container-low">
                            <span className="material-symbols-outlined text-primary">wifi</span>
                            <span className="text-sm font-medium">{product.category === 'Wireless' ? 'Wireless' : 'Wired PoE'}</span>
                        </div>
                        <div className="flex items-center space-x-3 p-4 rounded-xl bg-surface-container-low">
                            <span className="material-symbols-outlined text-primary">shield_with_heart</span>
                            <span className="text-sm font-medium">AI Protection</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => onAddToCart(product)} className="bg-surface-container-high text-on-surface py-4 px-6 rounded-lg font-semibold hover:bg-surface-container-highest transition-all flex items-center justify-center space-x-2">
                                <span className="material-symbols-outlined">shopping_cart</span>
                                <span>Add to Cart</span>
                            </button>
                            <Link to="/checkout" onClick={() => onAddToCart(product)} className="flex items-center justify-center bg-gradient-to-br from-primary to-primary-container text-white py-4 px-6 rounded-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-xl transition-all active:scale-95">
                                Buy Now
                            </Link>
                        </div>
                        {/* Premium CTA */}
                        <button className="w-full bg-inverse-surface text-inverse-on-surface py-5 px-6 rounded-xl font-bold flex items-center justify-between group overflow-hidden relative">
                            <div className="flex items-center space-x-4 relative z-10">
                                <div className="bg-primary p-2 rounded-lg">
                                    <span className="material-symbols-outlined">construction</span>
                                </div>
                                <div className="text-left">
                                    <span className="block text-sm font-medium opacity-80 uppercase tracking-widest">White-Glove Service</span>
                                    <span className="block text-lg">Book Professional Installation</span>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform relative z-10">arrow_forward</span>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Details Tabs Section */}
            <div className="mt-24">
                <div className="flex space-x-12 border-b border-surface-container-high mb-8 overflow-x-auto no-scrollbar">
                    <button onClick={() => setActiveTab('description')} className={`text-lg font-bold font-headline pb-4 whitespace-nowrap transition-colors ${activeTab === 'description' ? 'border-b-4 border-primary text-on-surface' : 'text-on-surface-variant hover:text-primary'}`}>Description</button>
                    <button onClick={() => setActiveTab('specs')} className={`text-lg font-semibold font-headline pb-4 whitespace-nowrap transition-colors ${activeTab === 'specs' ? 'border-b-4 border-primary text-on-surface' : 'text-on-surface-variant hover:text-primary'}`}>Full Specs</button>
                    <button onClick={() => setActiveTab('reviews')} className={`text-lg font-semibold font-headline pb-4 whitespace-nowrap transition-colors ${activeTab === 'reviews' ? 'border-b-4 border-primary text-on-surface' : 'text-on-surface-variant hover:text-primary'}`}>Customer Reviews (128)</button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-2xl font-bold font-headline">Unparalleled Security Intelligence</h3>
                        <p className="text-on-surface-variant leading-relaxed text-lg">
                            The {product.name} represents the pinnacle of modern surveillance. Engineered for both commercial and luxury residential use, it features a bespoke sensor that captures crystal-clear detail even in near-total darkness. With integrated AI processing, it differentiates between people, vehicles, and pets in real-time, reducing false alarms by 99%.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                                <span>Secure Cloud Archiving with 128-bit encryption.</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                                <span>Weatherproof IP67 rated for extreme environmental conditions.</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                                <span>Two-way audio with active noise cancellation.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-surface-container-low rounded-2xl p-8">
                        <h4 className="font-bold mb-4">Technical Highlights</h4>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                                <span className="text-on-surface-variant">Sensor</span>
                                <span className="font-medium">8MP Sony STARVIS</span>
                            </div>
                            <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                                <span className="text-on-surface-variant">Field of View</span>
                                <span className="font-medium">145° Ultra-Wide</span>
                            </div>
                            <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                                <span className="text-on-surface-variant">Connectivity</span>
                                <span className="font-medium">{product.category === 'Wireless' ? 'Wi-Fi 6' : 'PoE Direct'}</span>
                            </div>
                            <div className="flex justify-between pb-2">
                                <span className="text-on-surface-variant">Storage</span>
                                <span className="font-medium">MicroSD (up to 1TB)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetails;
