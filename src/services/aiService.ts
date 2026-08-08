import { Product } from '../types';

export interface AIResponse {
  text: string;
  recommendedProducts?: Product[];
  isFallback?: boolean;
}

/**
 * Intelligent Client Fallback Engine for GitHub Pages / Static Hosting / Offline mode
 * Analyzes query intent and generates natural language response + matching catalog products.
 */
function generateLocalAIResponse(prompt: string, catalog: Product[]): AIResponse {
  const query = prompt.toLowerCase();
  
  // Extract budget constraints if mentioned (e.g. "under 50", "under $100", "below 200")
  let maxPrice: number | null = null;
  const priceMatch = query.match(/(?:under|below|less than|\$)\s*(\d+)/i);
  if (priceMatch) {
    maxPrice = parseFloat(priceMatch[1]);
  }

  // Filter products by query keywords & price
  let matches = catalog.filter(p => {
    if (maxPrice !== null && p.price > maxPrice) return false;

    const fullText = `${p.title} ${p.subtitle} ${p.category} ${p.editorVerdict} ${p.highlights.join(' ')} ${p.pros.join(' ')}`.toLowerCase();
    
    // Check key query terms
    const keywords = query.replace(/[^\w\s]/gi, '').split(/\s+/).filter(w => w.length > 2);
    if (keywords.length === 0) return true;

    // Match if at least one strong keyword or category matches
    return keywords.some(k => fullText.includes(k));
  });

  // If no specific match, fallback to top-rated items within budget
  if (matches.length === 0) {
    matches = catalog
      .filter(p => maxPrice === null || p.price <= maxPrice)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  } else {
    // Sort matches by rating
    matches.sort((a, b) => b.rating - a.rating);
  }

  const topPicks = matches.slice(0, 3);

  // Synthesize natural AI response
  let replyText = '';

  if (query.includes('gift') || query.includes('present')) {
    replyText = `### 🎁 AI Gift Concierge Recommendation\n\nBased on hands-on testing, here are top curated gift picks:\n\n`;
  } else if (query.includes('cheap') || query.includes('budget') || maxPrice !== null) {
    replyText = `### 💰 Best Value & Deals Search\n\nHere are top verified items matching your budget${maxPrice ? ` under $${maxPrice}` : ''}:\n\n`;
  } else if (query.includes('beauty') || query.includes('skin') || query.includes('sleep')) {
    replyText = `### ✨ Beauty & Wellness AI Highlights\n\nHere are top tested beauty and self-care essentials:\n\n`;
  } else if (query.includes('tech') || query.includes('desk') || query.includes('gadget')) {
    replyText = `### ⚡ Tech & Utility AI Selection\n\nTop productivity and tech upgrades verified for performance:\n\n`;
  } else {
    replyText = `### 🤖 Aesthetic AI Recommendation\n\nI analyzed your query ("${prompt.trim()}") against our verified merchant index:\n\n`;
  }

  if (topPicks.length === 0) {
    replyText += `No items matched your exact price criteria. Consider browsing our **All Finds** or adjusting your price limit.`;
  } else {
    topPicks.forEach((p, idx) => {
      replyText += `**${idx + 1}. ${p.title}** ($${p.price.toFixed(2)} - *${p.merchantName}*)\n`;
      replyText += `• **Rating:** ⭐ ${p.rating} / 5 (${p.reviewCount} verified reviews)\n`;
      replyText += `• **Why AI Recommends:** ${p.whyItWorks[0]} ${p.editorVerdict}\n`;
      replyText += `• **Top Advantage:** ${p.pros[0] || 'High build quality'}\n\n`;
    });

    replyText += `*Tip: Click "Quick View" on any card below to read detailed specs and price histories.*`;
  }

  return {
    text: replyText,
    recommendedProducts: topPicks,
    isFallback: true,
  };
}

/**
 * Ask AI Assistant (Server API first, client fallback second)
 */
export async function askAIAssistant(prompt: string, catalog: Product[]): Promise<AIResponse> {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        productCatalog: catalog.map(p => ({
          id: p.id,
          title: p.title,
          category: p.category,
          price: p.price,
          merchant: p.merchantName,
          rating: p.rating,
          whyItWorks: p.whyItWorks,
          editorVerdict: p.editorVerdict,
          pros: p.pros,
          cons: p.cons,
        })),
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.text) {
        // Find matching product objects mentioned in text
        const mentioned = catalog.filter(p => 
          data.text.toLowerCase().includes(p.title.toLowerCase()) || 
          data.text.includes(p.id)
        );

        return {
          text: data.text,
          recommendedProducts: mentioned.length > 0 ? mentioned : undefined,
          isFallback: false,
        };
      }
    }
  } catch (err) {
    console.warn('Server AI route unavailable (e.g., GitHub Pages or static host). Using smart client engine.', err);
  }

  // Fallback engine for GitHub Pages or static export
  return generateLocalAIResponse(prompt, catalog);
}

/**
 * Ask AI about a specific product (Server API first, client fallback second)
 */
export async function askAIProductInsights(product: Product, question?: string): Promise<string> {
  try {
    const res = await fetch('/api/ai/product-insights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product, userQuestion: question }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.text) {
        return data.text;
      }
    }
  } catch {
    // Fallback below
  }

  // Intelligent local product summary fallback
  if (question && question.trim()) {
    return `### 🔍 AI Analysis: "${question}"\n\n` +
      `**Product:** ${product.title} ($${product.price})\n` +
      `• **Key Insight:** ${product.editorVerdict}\n` +
      `• **Primary Strength:** ${product.pros[0]}\n` +
      `• **Important Note:** ${product.cons[0] || 'Verify stock availability before checkout.'}\n` +
      `• **Rating Consensus:** ⭐ ${product.rating}/5 across ${product.reviewCount} buyer reviews.`;
  }

  return `### ⚡ AI Executive Summary for ${product.title}\n\n` +
    `1. **Core Benefit:** ${product.whyItWorks[0]}\n` +
    `2. **Hands-on Verdict:** ${product.editorVerdict}\n` +
    `3. **Best For:** Buyers looking for a verified, high-rating ${product.category.toLowerCase()} item on ${product.merchantName}.`;
}
