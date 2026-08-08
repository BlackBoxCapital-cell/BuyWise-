export type MerchantType = 'amazon' | 'impact';

export type CategoryType = 
  | 'All Finds'
  | 'Beauty & Sleep'
  | 'Home & Utility'
  | 'Personalized Gifts'
  | 'Tech & Wellness'
  | 'Viral Trends';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface PricePoint {
  date: string;
  price: number;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: CategoryType;
  merchant: MerchantType;
  merchantName: string;
  merchantBadgeText: string;
  price: number;
  originalPrice: number;
  currency: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  additionalImages?: string[];
  whyItWorks: [string, string];
  highlights: string[];
  editorVerdict: string;
  pros: string[];
  cons: string[];
  specs: Record<string, string>;
  asinOrId: string;
  directUrl: string;
  badge?: string; // e.g. "Viral Pick", "Editor's Choice", "Best Seller", "Price Drop"
  priceHistory: PricePoint[];
  inStock: boolean;
  reviews: Review[];
}

export interface AffiliateSettings {
  amazonTag: string;
  impactId: string;
  customTrackingCode: string;
}

export type ViewMode = 'grid' | 'compact' | 'comparison';
export type SortOption = 'featured' | 'rating' | 'price-low' | 'price-high' | 'discount';
