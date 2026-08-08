import React, { useState } from 'react';
import { Product, AffiliateSettings } from '../types';
import { askAIProductInsights } from '../services/aiService';
import { X, Star, CheckCircle, AlertTriangle, ExternalLink, ShieldCheck, Heart, ThumbsUp, Tag, TrendingDown, Sparkles, Send, Bot } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (productId: string) => void;
  onTriggerOutboundRedirect: (product: Product) => void;
  affiliateSettings: AffiliateSettings;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isSaved,
  onToggleSave,
  onTriggerOutboundRedirect,
}) => {
  const [activeTab, setActiveTab] = useState<'verdict' | 'ai' | 'specs' | 'price' | 'reviews'>('verdict');
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  if (!product) return null;

  const isAmazon = product.merchant === 'amazon';
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const toggleVote = (reviewId: string) => {
    setHelpfulVotes(prev => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  const handleAskAI = async (question?: string) => {
    if (!product) return;
    setAiLoading(true);
    try {
      const result = await askAIProductInsights(product, question || aiQuestion);
      setAiAnalysis(result);
    } catch {
      setAiAnalysis('Unable to generate AI analysis at this time.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-slate-200 relative my-8">
        
        {/* Sticky Close Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-3.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white px-2 py-0.5 rounded text-xs font-bold text-slate-900 border border-slate-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
              {product.merchantBadgeText}
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline font-mono">
              ID: {product.asinOrId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(product.id)}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
              title={isSaved ? 'Remove from Saved' : 'Save Item'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
            
            {/* Left: Product Image & Gallery */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="aspect-square w-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {discountPercent > 0 && (
                  <span className="absolute top-3 left-3 bg-rose-600 text-white font-black text-xs px-2.5 py-1 rounded-md shadow-md">
                    SAVE {discountPercent}%
                  </span>
                )}
              </div>

              {/* Price & Primary CTA Block */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900">
                      {product.currency}{product.price.toFixed(2)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm font-semibold text-slate-400 line-through">
                        {product.currency}{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    In Stock
                  </span>
                </div>

                <button
                  onClick={() => onTriggerOutboundRedirect(product)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isAmazon ? 'Check Price on Amazon' : 'View Deal on Official Store'}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-slate-500 text-center leading-tight">
                  Redirects safely to {product.merchantName}. Prices & availability verified live.
                </p>
              </div>
            </div>

            {/* Right: Overview & Title */}
            <div className="md:col-span-7 flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                {product.category}
              </span>
              <h2 className="font-serif-editorial text-2xl font-bold text-slate-900 leading-tight mb-2">
                {product.title}
              </h2>
              <p className="text-sm font-medium text-slate-600 mb-4">
                {product.subtitle}
              </p>

              {/* Star Rating Bar */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 mb-5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400' : 'fill-slate-200 text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-black text-slate-900">{product.rating} / 5.0</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-600 font-semibold">
                  {product.reviewCount.toLocaleString()}+ Verified Buyer Reviews
                </span>
              </div>

              {/* Highlights Chips */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {product.highlights.map((hl, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200"
                  >
                    ✓ {hl}
                  </span>
                ))}
              </div>

              {/* Quick Navigation Tabs */}
              <div className="flex border-b border-slate-200 mb-4 gap-4 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTab('verdict')}
                  className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'verdict'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Editorial Verdict
                </button>
                <button
                  onClick={() => {
                    setActiveTab('ai');
                    if (!aiAnalysis) handleAskAI();
                  }}
                  className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap flex items-center gap-1 ${
                    activeTab === 'ai'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  Ask AI Insights
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'specs'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Tech Specs
                </button>
                <button
                  onClick={() => setActiveTab('price')}
                  className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'price'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Price History
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'reviews'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Reviews ({product.reviews.length})
                </button>
              </div>

              {/* Tab 1: Editorial Verdict */}
              {activeTab === 'verdict' && (
                <div className="space-y-4">
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-xl">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                      Hands-On Testing Summary
                    </p>
                    <p className="text-sm leading-relaxed text-slate-200">
                      "{product.editorVerdict}"
                    </p>
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200/80">
                      <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-emerald-600" /> Pros
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {product.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80">
                      <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-amber-600" /> Things to Note
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {product.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: AI Insights */}
              {activeTab === 'ai' && (
                <div className="space-y-3.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-emerald-600" />
                      <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                        Gemini AI Product Analyst
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                      Free AI • 3.6 Flash
                    </span>
                  </div>

                  {aiLoading ? (
                    <div className="p-4 bg-white rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center gap-2 animate-pulse">
                      <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                      <span>Generating deep AI insights on {product.title}...</span>
                    </div>
                  ) : (
                    <div className="p-3.5 bg-white rounded-lg border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                      {aiAnalysis || 'Click below or ask a specific question to analyze this product with Gemini AI.'}
                    </div>
                  )}

                  {/* Ask Question Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAskAI();
                    }}
                    className="flex gap-2 pt-1"
                  >
                    <input
                      type="text"
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      placeholder="Ask AI: e.g., 'Is this durable?', 'Is it worth the price?'"
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md outline-none focus:border-slate-900"
                    />
                    <button
                      type="submit"
                      disabled={aiLoading}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md shadow-2xs flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Ask</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Tab 2: Tech Specs */}
              {activeTab === 'specs' && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <table className="w-full text-xs text-left">
                    <tbody>
                      {Object.entries(product.specs).map(([key, val], i) => (
                        <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="py-2 px-3 font-bold text-slate-900 w-1/3 border-b border-slate-200/60">{key}</td>
                          <td className="py-2 px-3 text-slate-700 border-b border-slate-200/60">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 3: Price History */}
              {activeTab === 'price' && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <TrendingDown className="w-4 h-4 text-emerald-600" /> 30-Day Price Trend
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Current Price is Lowest
                    </span>
                  </div>

                  <div className="space-y-2 pt-2">
                    {product.priceHistory.map((pt, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200/60">
                        <span className="text-slate-500 font-medium">{pt.date}</span>
                        <span className="font-bold text-slate-900">${pt.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Verified Buyer Reviews */}
              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">{rev.author}</span>
                          {rev.verified && (
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                              ✓ Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400' : 'fill-slate-200'}`} />
                        ))}
                      </div>
                      <p className="text-xs text-slate-700">{rev.comment}</p>
                      
                      <button
                        onClick={() => toggleVote(rev.id)}
                        className={`text-[10px] font-semibold flex items-center gap-1 pt-1 ${
                          helpfulVotes[rev.id] ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        {helpfulVotes[rev.id] ? 'Helpful (Voted)' : 'Helpful'}
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
