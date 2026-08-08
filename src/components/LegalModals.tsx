import React from 'react';
import { X, ShieldCheck, Lock, Award, CheckCircle2 } from 'lucide-react';

interface LegalModalsProps {
  activeTab: 'ftc' | 'privacy' | 'editorial' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeTab, onClose }) => {
  if (!activeTab) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-xl border border-slate-200 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-md hover:bg-slate-100"
        >
          <X className="w-4 h-4" />
        </button>

        {activeTab === 'ftc' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <div className="p-2 rounded-md bg-emerald-100 text-emerald-800">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-editorial text-lg font-bold text-slate-900">FTC Affiliate Compliance Statement</h3>
                <p className="text-xs text-slate-500">16 CFR Part 255 Federal Trade Commission Disclosure Policy</p>
              </div>
            </div>

            <div className="prose prose-slate text-xs leading-relaxed space-y-3 text-slate-700">
              <p className="font-semibold text-slate-900">
                Editorial Integrity & Affiliate Compensation Notice:
              </p>
              <p>
                In compliance with the Federal Trade Commission (FTC) guidelines, please assume that any and all links on this catalog are affiliate links for which we receive financial compensation from merchant programs including the <strong>Amazon Services LLC Associates Program</strong> and <strong>Impact.com Media Partner Network</strong>.
              </p>
              <div className="bg-slate-50 p-3 rounded-md border border-slate-200 space-y-2">
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> What this means for you as a consumer:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Zero Added Cost:</strong> Prices are identical whether you purchase through our links or directly on merchant sites.</li>
                  <li><strong>Independent Selection:</strong> Products are chosen based on rigorous hands-on testing and verified buyer ratings.</li>
                  <li><strong>No Pay-To-Play:</strong> Brands cannot pay for positive reviews or placement in our top indices.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <div className="p-2 rounded-md bg-slate-900 text-white">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-editorial text-lg font-bold text-slate-900">Consumer Privacy Policy</h3>
                <p className="text-xs text-slate-500">GDPR & CCPA Compliant Data Standards</p>
              </div>
            </div>

            <div className="text-xs leading-relaxed space-y-3 text-slate-700">
              <p>
                Your privacy is paramount. Aesthetic Hub operates as a client-side catalog and does NOT sell or trade personal consumer data to third parties.
              </p>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">1. Data We Collect</h4>
                <p>
                  When you subscribe to price alert newsletters, we store your email address solely for dispatching price drop alerts.
                </p>
                <h4 className="font-bold text-slate-900">2. Local Storage</h4>
                <p>
                  Your saved items and creator affiliate tag preferences are stored locally in your browser's LocalStorage and never sent to remote tracking servers.
                </p>
                <h4 className="font-bold text-slate-900">3. Outbound Redirects</h4>
                <p>
                  When clicking merchant links (Amazon or Impact), standard cookie tracking is governed by destination merchant terms.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'editorial' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <div className="p-2 rounded-md bg-slate-900 text-white">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-editorial text-lg font-bold text-slate-900">Editorial Testing Standards</h3>
                <p className="text-xs text-slate-500">How We Test, Verify & Score Products</p>
              </div>
            </div>

            <div className="text-xs leading-relaxed space-y-3 text-slate-700">
              <p>
                Our testing methodology focuses on material quality, review audits, and long-term durability:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200">
                  <h5 className="font-bold text-slate-900 mb-1">1. Material Quality</h5>
                  <p className="text-slate-600">Verification of medical-grade adhesives, titanium grades, and certified materials.</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200">
                  <h5 className="font-bold text-slate-900 mb-1">2. Durability</h5>
                  <p className="text-slate-600">Continuous daily hands-on usage testing.</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200">
                  <h5 className="font-bold text-slate-900 mb-1">3. Review Audit</h5>
                  <p className="text-slate-600">Cross-verification against fake review detection algorithms.</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200">
                  <h5 className="font-bold text-slate-900 mb-1">4. Value Evaluation</h5>
                  <p className="text-slate-600">Price vs durability ratio evaluated against market benchmarks.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
