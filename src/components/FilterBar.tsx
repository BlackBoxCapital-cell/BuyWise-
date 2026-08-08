import React from 'react';
import { CategoryType, MerchantType, SortOption, ViewMode } from '../types';
import { SlidersHorizontal, Grid, List, Columns, RotateCcw, Filter, Check } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  selectedMerchant: MerchantType | 'all';
  onSelectMerchant: (merchant: MerchantType | 'all') => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  sortBy: SortOption;
  onSortByChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalResults: number;
  onResetFilters: () => void;
  isFiltered: boolean;
}

const CATEGORIES: CategoryType[] = [
  'All Finds',
  'Beauty & Sleep',
  'Home & Utility',
  'Personalized Gifts',
  'Tech & Wellness',
  'Viral Trends',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedMerchant,
  onSelectMerchant,
  maxPrice,
  onMaxPriceChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  totalResults,
  onResetFilters,
  isFiltered,
}) => {
  return (
    <div id="filter-bar" className="bg-white border-b border-slate-200 sticky top-16 z-20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        
        {/* Category Filter Pills (Horizontal Scrollable on Mobile - High Density Style) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Niche:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-150 shrink-0 border cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* secondary Controls Row: Merchants, Price Range, Sort, View Modes */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3">
          
          {/* Left: Merchant & Price quick filters */}
          <div className="flex items-center flex-wrap gap-2.5">
            
            {/* Merchant Select */}
            <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-lg border border-slate-200/80 text-xs">
              <span className="text-slate-500 font-medium px-1.5">Merchant:</span>
              <button
                onClick={() => onSelectMerchant('all')}
                className={`px-2 py-0.5 rounded font-medium transition-colors ${
                  selectedMerchant === 'all' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => onSelectMerchant('amazon')}
                className={`px-2 py-0.5 rounded font-medium transition-colors ${
                  selectedMerchant === 'amazon' ? 'bg-amber-100 text-amber-900 font-semibold border border-amber-300' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Amazon Prime
              </button>
              <button
                onClick={() => onSelectMerchant('impact')}
                className={`px-2 py-0.5 rounded font-medium transition-colors ${
                  selectedMerchant === 'impact' ? 'bg-indigo-100 text-indigo-900 font-semibold border border-indigo-300' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Impact Brands
              </button>
            </div>

            {/* Price Max Slider */}
            <div className="hidden md:flex items-center gap-2 bg-slate-100/80 px-2.5 py-1 rounded-lg border border-slate-200/80 text-xs">
              <span className="text-slate-500 font-medium">Max Price:</span>
              <span className="font-bold text-slate-900 min-w-[50px]">${maxPrice}</span>
              <input
                type="range"
                min="30"
                max="600"
                step="10"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(Number(e.target.value))}
                className="w-20 accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Reset Button if filtered */}
            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Filters
              </button>
            )}

          </div>

          {/* Right: Sort By & View Mode Toggles */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            
            {/* Total Count */}
            <span className="text-xs font-medium text-slate-500">
              <strong className="text-slate-900 font-bold">{totalResults}</strong> {totalResults === 1 ? 'Item' : 'Items'}
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="sort-select" className="text-xs font-medium text-slate-500 hidden sm:inline">Sort:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => onSortByChange(e.target.value as SortOption)}
                className="bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-xs text-slate-900 font-semibold rounded-lg px-2.5 py-1.5 outline-none cursor-pointer focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="featured">Editor's Featured</option>
                <option value="rating">Highest Rated (★ 4.8+)</option>
                <option value="discount">Biggest Discount %</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-0.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-1 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Grid Cards View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onViewModeChange('compact')}
                className={`p-1 rounded transition-colors ${
                  viewMode === 'compact' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Compact Editorial List"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onViewModeChange('comparison')}
                className={`p-1 rounded transition-colors ${
                  viewMode === 'comparison' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Comparison Table Matrix"
              >
                <Columns className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
