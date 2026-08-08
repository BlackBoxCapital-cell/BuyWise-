import React from 'react';
import { Shield, ArrowUp, Heart, ExternalLink, Lock, Info, PlusCircle } from 'lucide-react';

interface FooterProps {
  onOpenLegalModal: (tab: 'ftc' | 'privacy' | 'editorial') => void;
  onOpenSubmitModal: () => void;
  onOpenSettingsModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegalModal,
  onOpenSubmitModal,
  onOpenSettingsModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-white text-slate-600 text-xs border-t border-slate-200 py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          
          {/* Brand Info */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-serif-editorial font-bold text-slate-900 text-base tracking-tight">AESTHETIC HUB</span>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 uppercase">Catalog</span>
            </div>
            <p className="text-slate-500 text-xs max-w-md">
              Independent catalog of top-rated items sourced from verified merchants on Amazon Prime & Impact.com.
            </p>
          </div>

          {/* Editorial & Legal Links */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium text-slate-500">
            <button
              onClick={() => onOpenLegalModal('ftc')}
              className="hover:text-slate-900 transition-colors"
            >
              FTC Disclosure
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegalModal('editorial')}
              className="hover:text-slate-900 transition-colors"
            >
              Testing Methodology
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegalModal('privacy')}
              className="hover:text-slate-900 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={onOpenSubmitModal}
              className="hover:text-slate-900 transition-colors"
            >
              Submit Product
            </button>
            <span>•</span>
            <button
              onClick={onOpenSettingsModal}
              className="text-emerald-700 hover:text-emerald-800 font-semibold transition-colors"
            >
              Affiliate Settings
            </button>
          </div>

        </div>

        {/* Bottom copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} Aesthetic Hub. Independent Product Catalog. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors font-medium bg-slate-100 px-3 py-1 rounded-md border border-slate-200"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
