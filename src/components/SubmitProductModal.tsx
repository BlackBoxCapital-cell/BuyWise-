import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

interface SubmitProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitProductModal: React.FC<SubmitProductModalProps> = ({ isOpen, onClose }) => {
  const [productTitle, setProductTitle] = useState('');
  const [merchantUrl, setMerchantUrl] = useState('');
  const [brandEmail, setBrandEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-slate-200 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif-editorial text-lg font-bold text-slate-900">Submission Received!</h3>
            <p className="text-xs text-slate-600">
              Our editorial testing team reviews all candidate items within 48 business hours.
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="mt-3 px-4 py-1.5 bg-slate-900 text-white font-semibold text-xs rounded-md"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-slate-900 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-editorial text-base font-bold text-slate-900">Submit a Product for Review</h3>
                <p className="text-xs text-slate-500">Brands & creators: submit candidate items for independent testing.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  placeholder="e.g. Ergonomic Cervical Neck Pillow"
                  className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-md focus:border-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">Amazon or Official Store URL</label>
                <input
                  type="url"
                  required
                  value={merchantUrl}
                  onChange={(e) => setMerchantUrl(e.target.value)}
                  placeholder="https://www.amazon.com/dp/ASIN or store URL"
                  className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-md focus:border-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">Brand Contact Email</label>
                <input
                  type="email"
                  required
                  value={brandEmail}
                  onChange={(e) => setBrandEmail(e.target.value)}
                  placeholder="press@brand.com"
                  className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-md focus:border-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">Why should we feature this item?</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Key features, certifications, or unique value proposition..."
                  className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-md focus:border-slate-900 outline-none"
                />
              </div>

              <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200 text-[11px] text-slate-600">
                Note: We maintain strict 100% zero-pay-for-placement editorial independence. Submitting does not guarantee inclusion.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Candidate</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
