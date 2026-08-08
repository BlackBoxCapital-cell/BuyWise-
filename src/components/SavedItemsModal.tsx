import React from 'react';
import { Product } from '../types';
import { X, Heart, ExternalLink, Trash2, ShoppingBag } from 'lucide-react';

interface SavedItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProducts: Product[];
  onRemoveSave: (productId: string) => void;
  onTriggerOutboundRedirect: (product: Product) => void;
}

export const SavedItemsModal: React.FC<SavedItemsModalProps> = ({
  isOpen,
  onClose,
  savedProducts,
  onRemoveSave,
  onTriggerOutboundRedirect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-xl border border-slate-200 relative flex flex-col justify-between">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-rose-50 text-rose-600">
                <Heart className="w-4 h-4 fill-rose-500" />
              </div>
              <div>
                <h3 className="font-serif-editorial text-base font-bold text-slate-900">Saved Items</h3>
                <p className="text-[11px] text-slate-500">{savedProducts.length} items saved in local browser storage</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List of Saved Products */}
          {savedProducts.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-xs font-bold text-slate-700">No Saved Items Yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click the heart icon on any product card to save items for quick comparison or later purchase.
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
              {savedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3 justify-between group hover:border-slate-300 transition-all"
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-cover rounded-md shrink-0 border border-slate-200"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{prod.title}</h4>
                    <p className="text-[11px] text-slate-500">{prod.merchantName}</p>
                    <span className="text-xs font-bold text-slate-900">${prod.price.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onTriggerOutboundRedirect(prod)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-md shadow-2xs flex items-center gap-1"
                    >
                      <span>Buy</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => onRemoveSave(prod.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors"
          >
            Close Saved Items
          </button>
        </div>

      </div>
    </div>
  );
};
