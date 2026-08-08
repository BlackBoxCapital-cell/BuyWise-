import { Product, AffiliateSettings } from '../types';

export function getFormattedAffiliateUrl(
  product: Product,
  settings: AffiliateSettings
): string {
  try {
    const url = new URL(product.directUrl);

    if (product.merchant === 'amazon') {
      const tag = settings.amazonTag.trim() || 'curatedvault-20';
      url.searchParams.set('tag', tag);
      if (settings.customTrackingCode) {
        url.searchParams.set('ascsubtag', settings.customTrackingCode);
      }
    } else if (product.merchant === 'impact') {
      if (settings.impactId.trim()) {
        url.searchParams.set('subId1', settings.impactId.trim());
      }
      if (settings.customTrackingCode) {
        url.searchParams.set('subId2', settings.customTrackingCode);
      }
    }

    return url.toString();
  } catch (err) {
    return product.directUrl;
  }
}

export function getCurrentDateFormatted(): string {
  const now = new Date();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${months[now.getMonth()]} ${now.getFullYear()}`;
}
