import React, { useState } from 'react';
import { ShieldCheck, Info, ChevronRight, X } from 'lucide-react';

interface FTCBarProps {
  onOpenLegalModal: (tab: 'ftc' | 'privacy' | 'editorial') => void;
}

export const FTCBar: React.FC<FTCBarProps> = ({ onOpenLegalModal }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div id="ftc-banner" className="bg-slate-900 text-white text-[11px] py-1.5 px-4 tracking-wide uppercase border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded text-[10px] shrink-0 border border-emerald-800/50">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Editorial Integrity
          </span>
          <p className="text-slate-300 normal-case tracking-normal">
            We independently test and review products. When you buy through links on our site, we may earn an affiliate commission.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 normal-case tracking-normal">
          <button
            onClick={() => onOpenLegalModal('ftc')}
            className="text-slate-400 hover:text-white underline underline-offset-2 flex items-center gap-0.5 text-xs font-medium transition-colors"
          >
            <Info className="w-3 h-3" />
            Learn How We Test
            <ChevronRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-500 hover:text-slate-300 p-0.5 rounded transition-colors"
            title="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
