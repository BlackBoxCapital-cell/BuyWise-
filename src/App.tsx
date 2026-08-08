/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_PRODUCTS } from './data/products';
import { Product, CategoryType, MerchantType, SortOption, ViewMode, AffiliateSettings } from './types';
import { FTCBar } from './components/FTCBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RedirectModal } from './components/RedirectModal';
import { AffiliateSettingsModal } from './components/AffiliateSettingsModal';
import { Newsletter } from './components/Newsletter';
import { SubmitProductModal } from './components/SubmitProductModal';
import { LegalModals } from './components/LegalModals';
import { SavedItemsModal } from './components/SavedItemsModal';
import { AICuratorModal } from './components/AICuratorModal';
import { Footer } from './components/Footer';
import { SearchX, Filter } from 'lucide-react';

export default function App() {
  // Products Dataset
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All Finds');
  const [selectedMerchant, setSelectedMerchant] = useState<MerchantType | 'all'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(600);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Saved Finds Persistence
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('curated_vault_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('curated_vault_saved', JSON.stringify(savedIds));
    } catch {
      // ignore
    }
  }, [savedIds]);

  // Affiliate Tag Settings Persistence
  const [affiliateSettings, setAffiliateSettings] = useState<AffiliateSettings>(() => {
    try {
      const stored = localStorage.getItem('curated_vault_affiliate_settings');
      return stored ? JSON.parse(stored) : { amazonTag: 'curatedvault-20', impactId: '', customTrackingCode: '' };
    } catch {
      return { amazonTag: 'curatedvault-20', impactId: '', customTrackingCode: '' };
    }
  });

  const handleSaveSettings = (newSettings: AffiliateSettings) => {
    setAffiliateSettings(newSettings);
    try {
      localStorage.setItem('curated_vault_affiliate_settings', JSON.stringify(newSettings));
    } catch {
      // ignore
    }
  };

  // Modals State
  const [activeProductForDetail, setActiveProductForDetail] = useState<Product | null>(null);
  const [activeProductForRedirect, setActiveProductForRedirect] = useState<Product | null>(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAICuratorOpen, setIsAICuratorOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<'ftc' | 'privacy' | 'editorial' | null>(null);

  // Toggle Save Item
  const toggleSaveProduct = (productId: string) => {
    setSavedIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Filtered & Sorted Products List
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category Match
      if (selectedCategory !== 'All Finds' && p.category !== selectedCategory) {
        return false;
      }
      // Merchant Match
      if (selectedMerchant !== 'all' && p.merchant !== selectedMerchant) {
        return false;
      }
      // Max Price Match
      if (p.price > maxPrice) {
        return false;
      }
      // Instant Client Search Match (title, subtitle, verdict, highlights)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = p.title.toLowerCase().includes(q);
        const subtitleMatch = p.subtitle.toLowerCase().includes(q);
        const verdictMatch = p.editorVerdict.toLowerCase().includes(q);
        const highlightMatch = p.highlights.some(h => h.toLowerCase().includes(q));
        const categoryMatch = p.category.toLowerCase().includes(q);
        const merchantMatch = p.merchantName.toLowerCase().includes(q);

        if (!titleMatch && !subtitleMatch && !verdictMatch && !highlightMatch && !categoryMatch && !merchantMatch) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'discount') {
        const discA = ((a.originalPrice - a.price) / a.originalPrice);
        const discB = ((b.originalPrice - b.price) / b.originalPrice);
        return discB - discA;
      }
      return 0; // featured default
    });
  }, [products, searchQuery, selectedCategory, selectedMerchant, maxPrice, sortBy]);

  // Is Filter Active Check
  const isFiltered = Boolean(
    selectedCategory !== 'All Finds' ||
    selectedMerchant !== 'all' ||
    maxPrice < 600 ||
    searchQuery.trim()
  );

  const handleResetFilters = () => {
    setSelectedCategory('All Finds');
    setSelectedMerchant('all');
    setMaxPrice(600);
    setSearchQuery('');
    setSortBy('featured');
  };

  // Saved Products Objects
  const savedProducts = useMemo(() => {
    return products.filter(p => savedIds.includes(p.id));
  }, [products, savedIds]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* 1. Top FTC Compliance & Trust Disclosure Bar */}
      <FTCBar onOpenLegalModal={(tab) => setActiveLegalTab(tab)} />

      {/* 2. Sticky Navigation Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        savedCount={savedIds.length}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenAICuratorModal={() => setIsAICuratorOpen(true)}
        hasCustomTags={Boolean(affiliateSettings.amazonTag || affiliateSettings.impactId)}
      />

      {/* 3. Hero Section (Authority & Social Proof) */}
      <Hero onOpenAICuratorModal={() => setIsAICuratorOpen(true)} />

      {/* 4. Filter Bar */}
      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedMerchant={selectedMerchant}
        onSelectMerchant={setSelectedMerchant}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalResults={filteredProducts.length}
        onResetFilters={handleResetFilters}
        isFiltered={isFiltered}
      />

      {/* 5. Main Product Catalog Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Active Category Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>{selectedCategory}</span>
              {isFiltered && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Filtered Results
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Hand-tested and verified links with live merchant price checks.
            </p>
          </div>
        </div>

        {/* Empty Search / Filter State */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 my-8">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No matching products found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms, raising the max price slider, or selecting a different niche category.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Reset All Search Filters
            </button>
          </div>
        ) : (
          <>
            {/* View Mode 1: Grid Cards */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSaved={savedIds.includes(product.id)}
                    onToggleSave={toggleSaveProduct}
                    onOpenQuickView={(p) => setActiveProductForDetail(p)}
                    onTriggerOutboundRedirect={(p) => setActiveProductForRedirect(p)}
                    affiliateSettings={affiliateSettings}
                  />
                ))}
              </div>
            )}

            {/* View Mode 2: Compact Editorial List */}
            {viewMode === 'compact' && (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSaved={savedIds.includes(product.id)}
                    onToggleSave={toggleSaveProduct}
                    onOpenQuickView={(p) => setActiveProductForDetail(p)}
                    onTriggerOutboundRedirect={(p) => setActiveProductForRedirect(p)}
                    affiliateSettings={affiliateSettings}
                  />
                ))}
              </div>
            )}

            {/* View Mode 3: Comparison Table Matrix */}
            {viewMode === 'comparison' && (
              <ComparisonMatrix
                products={filteredProducts}
                savedIds={savedIds}
                onToggleSave={toggleSaveProduct}
                onOpenQuickView={(p) => setActiveProductForDetail(p)}
                onTriggerOutboundRedirect={(p) => setActiveProductForRedirect(p)}
                affiliateSettings={affiliateSettings}
              />
            )}
          </>
        )}

      </main>

      {/* 6. VIP Newsletter & Price Drop Capture Section */}
      <Newsletter />

      {/* 7. Footer with FTC Compliance Disclaimers */}
      <Footer
        onOpenLegalModal={(tab) => setActiveLegalTab(tab)}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
      />

      {/* MODALS */}
      
      {/* Editorial Detail Quick View Modal */}
      <ProductDetailModal
        product={activeProductForDetail}
        onClose={() => setActiveProductForDetail(null)}
        isSaved={activeProductForDetail ? savedIds.includes(activeProductForDetail.id) : false}
        onToggleSave={toggleSaveProduct}
        onTriggerOutboundRedirect={(p) => setActiveProductForRedirect(p)}
        affiliateSettings={affiliateSettings}
      />

      {/* Outbound Link Redirect Handler Modal */}
      <RedirectModal
        product={activeProductForRedirect}
        onClose={() => setActiveProductForRedirect(null)}
        affiliateSettings={affiliateSettings}
      />

      {/* Saved Items Modal */}
      <SavedItemsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedProducts={savedProducts}
        onRemoveSave={toggleSaveProduct}
        onTriggerOutboundRedirect={(p) => setActiveProductForRedirect(p)}
      />

      {/* Creator Affiliate Settings Modal */}
      {isSettingsModalOpen && (
        <AffiliateSettingsModal
          settings={affiliateSettings}
          onSaveSettings={handleSaveSettings}
          onClose={() => setIsSettingsModalOpen(false)}
        />
      )}

      {/* Submit Product Modal */}
      <SubmitProductModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />

      {/* Free AI Curator Modal */}
      <AICuratorModal
        isOpen={isAICuratorOpen}
        onClose={() => setIsAICuratorOpen(false)}
        products={products}
        onOpenQuickView={(p) => setActiveProductForDetail(p)}
        onTriggerOutboundRedirect={(p) => setActiveProductForRedirect(p)}
      />

      {/* Legal & Compliance Modals */}
      <LegalModals
        activeTab={activeLegalTab}
        onClose={() => setActiveLegalTab(null)}
      />

    </div>
  );
}
