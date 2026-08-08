import React from 'react';
import { Product, AffiliateSettings } from '../types';
import { Star, ExternalLink, ShieldCheck, Check, Heart, Eye } from 'lucide-react';

interface ComparisonMatrixProps {
  products: Product[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onOpenQuickView: (p: Product) => void;
  onTriggerOutboundRedirect: (p: Product) => void;
  affiliateSettings: AffiliateSettings;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  products,
  savedIds,
  onToggleSave,
  onOpenQuickView,
  onTriggerOutboundRedirect,
}) => {
  if (products.length === 0) return null;

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-xs my-6">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr className="bg-slate-900 text-white text-[11px] uppercase tracking-wider font-mono">
            <th className="p-3 font-semibold rounded-tl-xl w-1/3">Product & Verdict</th>
            <th className="p-3 font-semibold">Category</th>
            <th className="p-3 font-semibold">Merchant</th>
            <th className="p-3 font-semibold">Rating</th>
            <th className="p-3 font-semibold">Verified Price</th>
            <th className="p-3 font-semibold text-right rounded-tr-xl">Buy Link</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
          {products.map((p) => {
            const isSaved = savedIds.includes(p.id);
            const isAmazon = p.merchant === 'amazon';

            return (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                
                {/* Product Info Column */}
                <td className="p-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover rounded-md border border-slate-200 shrink-0 cursor-pointer"
                      onClick={() => onOpenQuickView(p)}
                    />
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        {p.badge && (
                          <span className="text-[9px] font-bold uppercase bg-slate-900 text-white px-1.5 py-0.2 rounded">
                            {p.badge}
                          </span>
                        )}
                        <button
                          onClick={() => onToggleSave(p.id)}
                          className="text-slate-400 hover:text-rose-500"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'text-rose-500 fill-rose-500' : ''}`} />
                        </button>
                      </div>
                      <h4
                        onClick={() => onOpenQuickView(p)}
                        className="font-bold text-slate-900 hover:text-emerald-700 cursor-pointer text-xs leading-snug line-clamp-1"
                      >
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 font-medium">{p.whyItWorks[0]}</p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="p-3 font-medium text-slate-600">{p.category}</td>

                {/* Merchant Badge */}
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded border bg-white border-slate-200 text-slate-900">
                    <ShieldCheck className="w-3 h-3 text-slate-700" />
                    {p.merchantName}
                  </span>
                </td>

                {/* Star Rating */}
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="font-bold text-slate-900">{p.rating}</span>
                    <span className="text-slate-400 text-[10px]">({p.reviewCount})</span>
                  </div>
                </td>

                {/* Price */}
                <td className="p-3">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-slate-900">${p.price.toFixed(2)}</span>
                    {p.originalPrice > p.price && (
                      <span className="text-[10px] text-slate-400 line-through">${p.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </td>

                {/* Outbound CTA */}
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onOpenQuickView(p)}
                      className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md"
                      title="Quick Review"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onTriggerOutboundRedirect(p)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] rounded-md shadow-2xs flex items-center gap-1"
                    >
                      <span>{isAmazon ? 'Amazon' : 'View'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
