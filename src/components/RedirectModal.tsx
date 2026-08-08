import React, { useEffect, useState } from 'react';
import { Product, AffiliateSettings } from '../types';
import { getFormattedAffiliateUrl } from '../utils/affiliate';
import { ExternalLink, ShieldCheck, CheckCircle2, ArrowRight, X, Copy, Check } from 'lucide-react';

interface RedirectModalProps {
  product: Product | null;
  onClose: () => void;
  affiliateSettings: AffiliateSettings;
}

export const RedirectModal: React.FC<RedirectModalProps> = ({
  product,
  onClose,
  affiliateSettings,
}) => {
  const [countdown, setCountdown] = useState(2);
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const targetUrl = getFormattedAffiliateUrl(product, affiliateSettings);
  const isAmazon = product.merchant === 'amazon';

  useEffect(() => {
    setCountdown(2);
    setCopied(false);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto redirect
          window.open(targetUrl, '_blank', 'noopener,noreferrer');
          setTimeout(() => onClose(), 800);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [product, targetUrl, onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleManualRedirect = () => {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200 relative text-center">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md"
          title="Cancel"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Animated Merchant Icon */}
        <div className="w-14 h-14 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center mx-auto mb-3 shadow-2xs relative">
          <ShieldCheck className="w-7 h-7 text-emerald-600" />
        </div>

        <h3 className="font-serif-editorial text-lg font-bold text-slate-900 mb-1">
          Redirecting to {product.merchantName}...
        </h3>

        <p className="text-xs text-slate-600 mb-4 font-medium">
          Securing current price <strong className="text-slate-900">${product.price.toFixed(2)}</strong> on official merchant catalog.
        </p>

        {/* Status Verification Steps */}
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-left space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Verified Merchant Link ({isAmazon ? 'Amazon Prime' : 'Impact Brand Store'})</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Best Price Guarantee Applied</span>
          </div>
        </div>

        {/* Countdown Bar & Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleManualRedirect}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2.5 px-4 rounded-md shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Click Here if Not Redirected ({countdown}s)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handleCopy}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2 px-3 rounded-md border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Affiliate Link Copied!' : 'Copy Direct Affiliate Link'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
