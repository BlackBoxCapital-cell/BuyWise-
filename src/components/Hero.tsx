import React from 'react';
import { getCurrentDateFormatted } from '../utils/affiliate';
import { ShieldCheck, Award, Zap, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenAICuratorModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAICuratorModal }) => {
  const currentDate = getCurrentDateFormatted();

  return (
    <section id="hero-section" className="bg-white border-b border-slate-200 py-6 sm:py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
        
        {/* Main Content */}
        <div className="hero-content max-w-3xl space-y-2">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-slate-900 text-white text-[10px] font-bold tracking-wider uppercase">
              VERIFIED INDEX
            </span>
            {onOpenAICuratorModal && (
              <button
                onClick={onOpenAICuratorModal}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-[10px] font-bold tracking-tight cursor-pointer transition-colors"
              >
                <Sparkles className="w-3 h-3 text-emerald-700" />
                <span>Try Free AI Concierge</span>
              </button>
            )}
            <span className="text-xs text-slate-500 font-medium">
              Independent catalog of top-rated items
            </span>
          </div>

          <h1 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
            Curated Products Worth Your Money.
          </h1>

          <p className="text-sm text-slate-600 max-w-2xl font-normal leading-relaxed">
            Tested, reviewed, and sourced directly from verified merchant stores on <strong className="text-slate-900 font-semibold">Amazon Prime</strong> & <strong className="text-slate-900 font-semibold">Impact.com Brand Outlets</strong>.
          </p>

          {/* Compact Trust Features */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-2 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Verified Merchant Links
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              Zero Sponsored Bias
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              Direct Official Checkout
            </span>
          </div>
        </div>

        {/* Right side Trust Badge */}
        <div className="shrink-0 flex md:flex-col items-start md:items-end justify-between gap-2 border-t md:border-t-0 border-slate-200 pt-3 md:pt-0">
          <div className="bg-slate-200 text-slate-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
            Updated: {currentDate}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            4.8★ Quality Threshold
          </p>
        </div>

      </div>
    </section>
  );
};
