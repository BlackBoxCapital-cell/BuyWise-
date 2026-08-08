import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client if API key is present
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Routes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
  });

  // AI Chat & Product Recommendation Endpoint
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { prompt, productCatalog, context } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }

      const ai = getGeminiClient();
      if (!ai) {
        // Return clear status so client can seamlessly fall back for GitHub / offline mode
        res.json({
          success: false,
          fallback: true,
          message: 'GEMINI_API_KEY is not set on server. Using client fallback engine.',
        });
        return;
      }

      const systemInstruction = `You are the Aesthetic AI Curator and Smart Shopping Concierge for Aesthetic Hub (Curated Vault).
Your role is to help users discover top-rated viral products, recommend curated gifts, summarize hands-on reviews, compare prices, and give unbiased shopping advice.

CURRENT CATALOG PRODUCTS:
${JSON.stringify(productCatalog || [], null, 2)}

INSTRUCTIONS:
- Be concise, elegant, knowledgeable, and helpful.
- When recommending catalog products, refer to them by exact title and mention their key benefits or price.
- If asked a general product question or comparison, deliver crisp pros and cons and highlight why an item was chosen by editorial testers.
- Keep output nicely formatted with line breaks, bullet points, and bold text.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `${context ? `[Context: ${context}]\n` : ''}${prompt}`,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text || 'I analyzed the catalog for you.';
      res.json({ success: true, text });
    } catch (err: unknown) {
      console.error('Gemini API Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to query Gemini AI';
      res.status(500).json({
        success: false,
        error: errorMessage,
        fallback: true,
      });
    }
  });

  // AI Product Insights Endpoint
  app.post('/api/ai/product-insights', async (req, res) => {
    try {
      const { product, userQuestion } = req.body;

      if (!product) {
        res.status(400).json({ error: 'Product data required' });
        return;
      }

      const ai = getGeminiClient();
      if (!ai) {
        res.json({
          success: false,
          fallback: true,
          message: 'No server key available. Using client fallback engine.',
        });
        return;
      }

      const systemInstruction = `You are an expert editorial reviewer analyzing a specific product.
Provide an objective, structured hands-on review summary and answer the user's question accurately.
Product Title: ${product.title}
Category: ${product.category}
Price: $${product.price}
Rating: ${product.rating} / 5 (${product.reviewCount} reviews)
Why it Works: ${product.whyItWorks ? product.whyItWorks.join('; ') : ''}
Pros: ${product.pros ? product.pros.join(', ') : ''}
Cons: ${product.cons ? product.cons.join(', ') : ''}
Verdict: ${product.editorVerdict}`;

      const prompt = userQuestion || 'Provide a 3-bullet executive summary on why a consumer should buy or skip this item.';

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.6,
        },
      });

      res.json({ success: true, text: response.text });
    } catch (err: unknown) {
      console.error('Gemini Product Insights Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error fetching insights';
      res.status(500).json({
        success: false,
        error: errorMessage,
        fallback: true,
      });
    }
  });

  // Vite Middleware for Development Mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
