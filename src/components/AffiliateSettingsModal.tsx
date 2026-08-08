import React, { useState } from 'react';
import { AffiliateSettings } from '../types';
import { Settings, Save, Check, Shield, Info, X } from 'lucide-react';

interface AffiliateSettingsModalProps {
  settings: AffiliateSettings;
  onSaveSettings: (newSettings: AffiliateSettings) => void;
  onClose: () => void;
}

export const AffiliateSettingsModal: React.FC<AffiliateSettingsModalProps> = ({
  settings,
  onSaveSettings,
  onClose,
}) => {
  const [amazonTag, setAmazonTag] = useState(settings.amazonTag || '');
  const [impactId, setImpactId] = useState(settings.impactId || '');
  const [customTrackingCode, setCustomTrackingCode] = useState(settings.customTrackingCode || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings({
      amazonTag: amazonTag.trim(),
      impactId: impactId.trim(),
      customTrackingCode: customTrackingCode.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
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

        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-1.5 rounded-md bg-slate-900 text-emerald-400">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif-editorial text-base font-bold text-slate-900">Affiliate Tag Configuration</h3>
            <p className="text-xs text-slate-500">Insert your creator IDs to monetize outbound product links.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          
          {/* Amazon Tag */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1">
              Amazon Associates Store Tag
            </label>
            <input
              type="text"
              value={amazonTag}
              onChange={(e) => setAmazonTag(e.target.value)}
              placeholder="e.g. curatedvault-20"
              className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-md focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Appends <code className="text-emerald-700 font-mono font-bold">?tag=YOUR_TAG</code> to all Amazon Prime product buttons.
            </p>
          </div>

          {/* Impact ID */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1">
              Impact.com SubID / Media Partner Tracker
            </label>
            <input
              type="text"
              value={impactId}
              onChange={(e) => setImpactId(e.target.value)}
              placeholder="e.g. impact_vault_01"
              className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-md focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Appends <code className="text-slate-900 font-mono font-bold">?subId1=YOUR_ID</code> to Impact brand store links.
            </p>
          </div>

          {/* Custom Tracking Subtag */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1">
              Custom Campaign Sub-Tracking Tag (Optional)
            </label>
            <input
              type="text"
              value={customTrackingCode}
              onChange={(e) => setCustomTrackingCode(e.target.value)}
              placeholder="e.g. tiktok_bio_aug2026"
              className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-md focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none"
            />
          </div>

          <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p>
              Settings are saved securely in your local browser storage. Outbound links automatically rebuild dynamically.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Affiliate Tags</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
