import React, { useEffect, useState } from 'react';
import { quotationService } from '../services/quotationService';
import { Clock, PhoneCall, CheckCircle2, User, Mail, Phone, Building, MessageSquare, AlertCircle } from 'lucide-react';

const AdminQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState(null);

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const data = await quotationService.getQuotations();
      setQuotations(data);
    } catch (err) {
      console.error('Error fetching RFQs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await quotationService.updateQuotationStatus(id, newStatus);
      // Update local state
      setQuotations(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
      if (selectedQuote && selectedQuote.id === id) {
        setSelectedQuote(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* List Column */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Quotation RFQ Inbox</h2>
          <p className="text-xs text-slate-500 font-medium">Process client quotation requests and consult status updates</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {quotations.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm">
                No quotation requests received yet.
              </div>
            ) : (
              quotations.map((q) => (
                <div
                  key={q.id}
                  onClick={() => setSelectedQuote(q)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedQuote?.id === q.id 
                      ? 'border-blue-500 bg-blue-50/10 shadow-sm' 
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/40'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-slate-800">{q.customerName}</h4>
                      <span className="text-xs text-slate-400 font-mono">
                        Received: {new Date(q.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      q.status === 'new'
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : q.status === 'contacted'
                        ? 'bg-amber-50 text-amber-600 border border-amber-100'
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    }`}>
                      <span className="capitalize">{q.status}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">{q.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Details Inspector Panel */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-fit">
        <h3 className="text-md font-bold text-slate-800 border-b border-slate-100 pb-4 mb-4">
          Request Details Panel
        </h3>

        {selectedQuote ? (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-600">
                <User className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-semibold">{selectedQuote.customerName}</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <Building className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium">{selectedQuote.company || 'Not Specified (Individual)'}</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <Mail className="w-4 h-4 text-slate-400 animate-pulse" />
                <a href={`mailto:${selectedQuote.email}`} className="text-sm font-medium text-blue-600 underline hover:text-blue-700">
                  {selectedQuote.email}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <Phone className="w-4 h-4 text-slate-400" />
                <a href={`tel:${selectedQuote.phone}`} className="text-sm font-medium text-slate-700">
                  {selectedQuote.phone}
                </a>
              </div>
            </div>

            {/* Message */}
            <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <MessageSquare className="w-4 h-4 text-slate-400" />
                <span>Message</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                {selectedQuote.message || 'No additional remarks provided.'}
              </p>
            </div>

            {/* Status updates */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-semibold text-slate-600 uppercase block">Update Status</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleStatusChange(selectedQuote.id, 'new')}
                  className={`flex flex-col items-center justify-center py-2.5 rounded-lg border text-[11px] font-bold transition-all ${
                    selectedQuote.status === 'new' 
                      ? 'border-blue-500 bg-blue-50/30 text-blue-600' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-500'
                  }`}
                >
                  <Clock className="w-4 h-4 mb-1" />
                  New
                </button>
                <button
                  onClick={() => handleStatusChange(selectedQuote.id, 'contacted')}
                  className={`flex flex-col items-center justify-center py-2.5 rounded-lg border text-[11px] font-bold transition-all ${
                    selectedQuote.status === 'contacted' 
                      ? 'border-amber-500 bg-amber-50/30 text-amber-600' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-500'
                  }`}
                >
                  <PhoneCall className="w-4 h-4 mb-1" />
                  Contacted
                </button>
                <button
                  onClick={() => handleStatusChange(selectedQuote.id, 'closed')}
                  className={`flex flex-col items-center justify-center py-2.5 rounded-lg border text-[11px] font-bold transition-all ${
                    selectedQuote.status === 'closed' 
                      ? 'border-emerald-500 bg-emerald-50/30 text-emerald-600' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-500'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 mb-1" />
                  Closed
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-300" />
            <p className="text-xs font-medium">Select a quotation request from the list to inspect customer details and update statuses.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminQuotations;
