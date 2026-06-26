import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    setSent(true);
    setName('');
    setEmail('');
    setMsg('');
  };

  useSEO({
    title: 'Contact Cloud Info Tech | Laptop Repairs & CCTV Installation Singapore',
    description: 'Get in touch with Cloud Info Tech Shop. Contact us for Singapore premium laptop repairs, computer sales, CCTV installation, and business IT solutions.',
    keywords: 'Cloud Info Tech, Laptop Repair Singapore, CCTV Installation Singapore, Business IT Solutions, Computer Sales',
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Cloud Info Tech Shop",
      "image": "/images/logo.png",
      "telephone": "+65 6747 1104",
      "email": "sales@cloudinfotechshop.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "10 Ubi Crescent, #04-32",
        "addressLocality": "Singapore",
        "postalCode": "408564",
        "addressCountry": "SG"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    }
  });

  return (
    <div className="bg-slate-50 font-sans min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Title Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="font-h1 tracking-tight text-2xl sm:text-4xl font-extrabold text-slate-900">Contact Cloud Info Tech Shop</h1>
          <p className="font-subheading text-sm sm:text-base text-slate-500">
            Contact Singapore's Premium Security Systems Distributor & Integrator. We supply and support products from leading laptop, networking and security manufacturers.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-[18px] border border-[#E2E8F0] shadow-[0_8px_25px_rgba(15,23,42,0.06)] hover:shadow-lg hover:border-blue-600/30 transition-all duration-300 flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-blue-600">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-h3 text-lg mb-1 font-bold">Direct Phone</h3>
              <p className="text-xs text-slate-500">Mon-Fri 9am to 6pm</p>
              <a href="tel:+6567471104" className="text-sm font-bold text-blue-600 block mt-2 hover:underline min-h-[44px] flex items-center justify-center">
                +65 6747 1104
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-[18px] border border-[#E2E8F0] shadow-[0_8px_25px_rgba(15,23,42,0.06)] hover:shadow-lg hover:border-blue-600/30 transition-all duration-300 flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-blue-600">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-h3 text-lg mb-1 font-bold">Email Support</h3>
              <p className="text-xs text-slate-500">24/7 client dispatch</p>
              <a href="mailto:sales@cloudinfotechshop.com" className="text-sm font-bold text-blue-600 block mt-2 hover:underline min-h-[44px] flex items-center justify-center">
                sales@cloudinfotechshop.com
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-[18px] border border-[#E2E8F0] shadow-[0_8px_25px_rgba(15,23,42,0.06)] hover:shadow-lg hover:border-blue-600/30 transition-all duration-300 flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-blue-600">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-h3 text-lg mb-1 font-bold">Headquarters</h3>
              <p className="text-xs text-slate-500">Scoping & inventory center</p>
              <span className="text-xs text-slate-700 block mt-2 font-medium min-h-[44px] flex items-center justify-center">
                10 Ubi Crescent, #04-32, Singapore 408564
              </span>
            </div>
          </div>
        </div>

        {/* Lower Grid: Quick Contact form and map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Quick Msg Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center h-full space-y-4 py-8">
                <div className="p-3 bg-emerald-100 rounded-full text-emerald-600 border border-emerald-200">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-bold text-slate-800 text-base">Message Sent Successfully</h4>
                <p className="text-xs text-slate-500 max-w-xs">
                  Thank you! Your general message has been dispatched to our sales team. We will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold min-h-[44px] flex items-center justify-center"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Quick Contact Form</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-1">Fill out the form below to receive call back information</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-3 py-3 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 min-h-[44px]"
                    placeholder="e.g. Rachel Tan"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-3 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 min-h-[44px]"
                    placeholder="rachel@domain.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">How can we help you?</label>
                  <textarea
                    required
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    rows="4"
                    className="block w-full px-3 py-3 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 min-h-[44px]"
                    placeholder="Describe your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow min-h-[44px]"
                >
                  <Send className="w-3.5 h-3.5 mr-2" />
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Interactive Map Visual */}
          <div className="bg-slate-900 text-slate-400 rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between overflow-hidden relative min-h-[350px] space-y-6 lg:space-y-0">
            <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
            
            <div className="relative space-y-4">
              <span className="text-[10px] text-blue-500 uppercase tracking-widest font-extrabold block">Location Scoping</span>
              <h3 className="text-xl font-bold text-white leading-tight">Singapore Central Depot</h3>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Located near Ubi MRT Station. Visitors by appointment only. Our central logistics warehouse holds over 20,000+ CCTV camera components, DVRs, cabling hardware and server rack assemblies.
              </p>
            </div>

            {/* Custom stylized mini map grid UI representation */}
            <div className="h-32 border border-slate-800/80 rounded-xl relative overflow-hidden bg-slate-950 flex flex-col justify-center items-center my-4">
              <div className="grid grid-cols-12 gap-1 w-full h-full p-2 opacity-25">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-slate-800 rounded-sm"></div>
                ))}
              </div>
              <div className="absolute flex flex-col items-center">
                <div className="p-2 bg-blue-600 rounded-full border border-white text-white animate-bounce shadow-lg shadow-blue-500/50">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-white uppercase bg-slate-900/80 px-2 py-0.5 rounded-full mt-2 border border-slate-800">
                  Ubi Crescent 10
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs font-medium relative">
              <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span>Standard Distribution Hours: 09:00 - 18:00 (GMT+8)</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
