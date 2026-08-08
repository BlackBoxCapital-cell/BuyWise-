import React, { useEffect, useRef } from 'react';
import { Search, Heart, Settings, PlusCircle, Shield, Sparkles, X } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  savedCount: number;
  onOpenSavedModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenSubmitModal: () => void;
  onOpenAICuratorModal: () => void;
  hasCustomTags: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  savedCount,
  onOpenSavedModal,
  onOpenSettingsModal,
  onOpenSubmitModal,
  onOpenAICuratorModal,
  hasCustomTags,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Ctrl+K / Cmd+K focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header id="main-header" className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 md:gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs group-hover:bg-emerald-600 transition-colors duration-200">
                <Shield className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-editorial font-bold text-lg tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors leading-none flex items-center gap-1.5">
                  AESTHETIC HUB
                  <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold bg-slate-100 text-slate-700 rounded border border-slate-200 uppercase tracking-wider">
                    VERIFIED
                  </span>
                </span>
                <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase mt-0.5">
                  Curated Product Catalog
                </span>
              </div>
            </a>
          </div>

          {/* Search Input Bar (Instant Client-Side Filtering - High Density Pill Style) */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-900 transition-colors">
                <Search className="w-4 h-4" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search curated tech & lifestyle..."
                className="w-full pl-10 pr-20 py-2 bg-slate-100 hover:bg-slate-100/90 focus:bg-white text-xs sm:text-sm text-slate-900 placeholder-slate-400 rounded-full border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all duration-150"
              />
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1">
                {searchQuery ? (
                  <button
                    onClick={() => onSearchChange('')}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-500 bg-white rounded-full border border-slate-200 shadow-2xs">
                    ⌘K
                  </kbd>
                )}
              </div>
            </div>
          </div>

          {/* Action Header Items */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Free AI Curator Button */}
            <button
              onClick={onOpenAICuratorModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-emerald-600 rounded-lg transition-colors border border-slate-800 shadow-2xs cursor-pointer group"
              title="Open Free AI Shopping Concierge"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white transition-colors animate-pulse" />
              <span>AI Curator</span>
              <span className="hidden md:inline-block text-[9px] font-mono bg-emerald-500/20 text-emerald-300 group-hover:bg-white/20 group-hover:text-white px-1 rounded">Free</span>
            </button>

            {/* Submit Product Modal Toggle */}
            <button
              onClick={onOpenSubmitModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200/60"
            >
              <PlusCircle className="w-3.5 h-3.5 text-slate-600" />
              <span>Submit Product</span>
            </button>

            {/* Creator Affiliate Settings */}
            <button
              onClick={onOpenSettingsModal}
              className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                hasCustomTags
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title="Configure your Amazon Tag & Impact ID"
            >
              <Settings className={`w-3.5 h-3.5 ${hasCustomTags ? 'text-emerald-600 animate-spin-slow' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">
                {hasCustomTags ? 'Custom Tags Active' : 'Affiliate Settings'}
              </span>
              {hasCustomTags && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              )}
            </button>

            {/* Saved Items Button */}
            <button
              onClick={onOpenSavedModal}
              className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
              title="Saved Items"
            >
              <Heart className={`w-5 h-5 ${savedCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center rounded-full border-2 border-white shadow-2xs">
                  {savedCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
