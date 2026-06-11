import React, { useState } from 'react';
import { quotationService } from '../services/quotationService';
import { ShieldCheck, Mail, Phone, Building, User, FileText, CheckCircle2, Loader2 } from 'lucide-react';

const RequestQuote = () => {
  const [customerName, setCustomerName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await quotationService.createQuotation({
        customerName,
        company,
        email,
        phone,
        message,
        status: 'new'
      });
      setSuccess(true);
      setCustomerName('');
      setCompany('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to submit quote request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-5">
        
        {/* Left Info Column */}
        <div className="md:col-span-2 bg-slate-900 p-8 text-white flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-blue-500">
              <ShieldCheck className="w-8 h-8" />
              <span className="font-extrabold tracking-tight text-xl text-white">Cloud Info Tech</span>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold">Request a System Quote</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Whether you need CCTV surveillance, access control, NVR configurations or structured cabling, our experts will design a custom solution.
              </p>
            </div>
            
            <div className="space-y-4 pt-6 text-xs text-slate-300 font-medium">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>+65 6747 1104</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>sales@cloudinfotech.com.sg</span>
              </div>
              <div className="flex items-center space-x-3">
                <Building className="w-4 h-4 text-blue-500" />
                <span>HQ: 10 Ubi Crescent, Singapore 408564</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 font-semibold border-t border-slate-800 pt-6 mt-8">
            © 2026 Cloud Info Tech Pte Ltd. All Rights Reserved.
          </div>
        </div>

        {/* Right Form Column */}
        <div className="md:col-span-3 p-8">
          {success ? (
            <div className="flex flex-col items-center justify-center text-center h-full space-y-4">
              <div className="p-4 bg-emerald-100 rounded-full text-emerald-600 border border-emerald-200">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Quotation Request Received</h3>
              <p className="text-sm text-slate-500 max-w-sm">
                Thank you! Your system RFQ has been successfully logged. An integration engineer will contact you shortly with estimates.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-md"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">CCTV & Integration RFQ</h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">Submit your site parameters for dynamic scoping</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Full Name *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-slate-400" />
                    </span>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="block w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs transition-all"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Company / Organization</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-4 w-4 text-slate-400" />
                    </span>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="block w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs transition-all"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Email Address *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Phone Number *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-slate-400" />
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs transition-all"
                      placeholder="+65 8123 4567"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Scope details & requirements *</label>
                <div className="relative">
                  <span className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <FileText className="h-4 w-4 text-slate-400" />
                  </span>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                    className="block w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs transition-all"
                    placeholder="Describe your security specifications, environment type (retail, factory, office), number of cameras required..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-xs font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-600/10"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Request Free System Scoping'
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default RequestQuote;
