import React from 'react';
import { Product, AffiliateSettings } from '../types';
import { Star, ExternalLink, Heart, Check, Eye, ShieldCheck, Tag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isSaved: boolean;
  onToggleSave: (productId: string) => void;
  onOpenQuickView: (product: Product) => void;
  onTriggerOutboundRedirect: (product: Product) => void;
  affiliateSettings: AffiliateSettings;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSaved,
  onToggleSave,
  onOpenQuickView,
  onTriggerOutboundRedirect,
}) => {
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const isAmazon = product.merchant === 'amazon';

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between overflow-hidden relative"
    >
      {/* Top Banner Tag & Save Heart */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
        
        {/* Merchant Tag - High Density Style */}
        <div className="flex items-center gap-1.5 flex-wrap pointer-events-auto">
          {product.badge && (
            <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-slate-900 text-white rounded shadow-2xs">
              {product.badge}
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[9px] font-bold text-slate-900 border border-slate-200 shadow-2xs flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-slate-700" />
            {product.merchantBadgeText}
          </span>
        </div>

        {/* Bookmark Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(product.id);
          }}
          className="pointer-events-auto p-1.5 rounded-full bg-white/90 backdrop-blur-xs text-slate-700 hover:text-rose-500 hover:bg-white border border-slate-200 shadow-2xs transition-all cursor-pointer"
          title={isSaved ? 'Remove from Saved' : 'Save to Favorites'}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isSaved ? 'text-rose-500 fill-rose-500' : 'text-slate-500'
            }`}
          />
        </button>
      </div>

      {/* Card Content Top Container */}
      <div>
        
        {/* Product Image Container */}
        <div
          onClick={() => onOpenQuickView(product)}
          className="relative aspect-16/10 w-full bg-slate-100 overflow-hidden cursor-pointer group-hover:opacity-95"
        >
          <img
            src={product.imageUrl}
            alt={product.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300 ease-out"
            loading="lazy"
          />

          {/* Discount Badge Overlay */}
          {discountPercent > 0 && (
            <div className="absolute bottom-2.5 left-2.5 bg-rose-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow-2xs flex items-center gap-1">
              <Tag className="w-3 h-3" />
              SAVE {discountPercent}%
            </div>
          )}

          {/* Quick View Hover Overlay */}
          <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-white/90 backdrop-blur-xs text-slate-900 font-bold text-xs px-3 py-1.5 rounded-md shadow-xs flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-700" />
              Quick View
            </span>
          </div>
        </div>

        {/* Product Information Body */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          
          <div>
            {/* Rating Widget */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="flex text-amber-500 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'fill-slate-200 text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-medium text-slate-400">
                ({product.reviewCount.toLocaleString()})
              </span>
            </div>

            {/* Product Title */}
            <h3
              onClick={() => onOpenQuickView(product)}
              className="text-[15px] font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug mb-1.5 cursor-pointer line-clamp-2"
            >
              {product.title}
            </h3>

            {/* Subtitle / Description */}
            <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
              {product.editorVerdict || product.subtitle}
            </p>

            {/* Why It Works Summary */}
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3 space-y-1">
              {product.whyItWorks.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600 leading-tight">
                  <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Feature Highlights Badges */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.highlights.slice(0, 3).map((hl, i) => (
              <span
                key={i}
                className="text-[9px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200/60"
              >
                {hl}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Card Footer: Price & Call to Action (High Density Style) */}
      <div className="p-4 pt-2 border-t border-slate-100 bg-slate-50/30 mt-auto">
        
        <div className="flex items-center justify-between gap-2">
          
          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              {product.currency}{product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs font-medium text-slate-400 line-through">
                {product.currency}{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Buy Action Button - High Density Emerald Style */}
          <button
            onClick={() => onTriggerOutboundRedirect(product)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] py-2 px-3 rounded-md shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>{isAmazon ? 'Check Price' : 'View Deal'}</span>
            <ExternalLink className="w-3 h-3" />
          </button>

        </div>

      </div>

    </div>
  );
};
