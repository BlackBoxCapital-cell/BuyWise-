import React, { useState } from 'react';
import { Product } from '../types';
import { askAIAssistant } from '../services/aiService';
import { Sparkles, X, Send, Bot, User, ExternalLink, Eye, RefreshCw, Zap } from 'lucide-react';

interface AICuratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onOpenQuickView: (product: Product) => void;
  onTriggerOutboundRedirect: (product: Product) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  recommendedProducts?: Product[];
  timestamp: string;
}

const SAMPLE_PROMPTS = [
  '🎁 Suggest a viral gift under $50',
  '✨ What are the best beauty & sleep finds?',
  '⚡ Top rated tech & desk setup upgrades',
  '💰 Show items with the biggest price drops',
];

export function AICuratorModal({
  isOpen,
  onClose,
  products,
  onOpenQuickView,
  onTriggerOutboundRedirect,
}: AICuratorModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I'm your **Aesthetic AI Curator**, powered by Gemini 3.6 Flash. Describe what you're looking for, your budget, or who you're shopping for, and I'll find top verified items from our catalog!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (customPrompt?: string) => {
    const promptToSend = (customPrompt || input).trim();
    if (!promptToSend || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const res = await askAIAssistant(promptToSend, products);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.text,
        recommendedProducts: res.recommendedProducts,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'I encountered an error processing your query. Please try selecting one of the suggested prompts above.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-xl max-w-2xl w-full h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-editorial text-base font-bold text-white tracking-tight">AI Curator & Assistant</h3>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-semibold flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5" />
                  Free AI
                </span>
              </div>
              <p className="text-[11px] text-slate-300">Powered by Gemini 3.6 Flash • GitHub Static Ready</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-md hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Suggestion Pills */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">Try asking:</span>
          {SAMPLE_PROMPTS.map((promptText, i) => (
            <button
              key={i}
              onClick={() => handleSend(promptText)}
              disabled={loading}
              className="text-[11px] bg-white border border-slate-200 hover:border-slate-400 text-slate-700 px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors shrink-0 shadow-2xs hover:bg-slate-100 cursor-pointer"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[88%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-md shrink-0 flex items-center justify-center text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-emerald-600 text-white shadow-2xs'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-2">
                <div
                  className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 text-white font-medium rounded-tr-none'
                      : 'bg-white border border-slate-200 text-slate-800 shadow-2xs rounded-tl-none whitespace-pre-wrap'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Render Embedded Product Cards if AI suggested items */}
                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {msg.recommendedProducts.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center gap-2.5 shadow-2xs hover:border-emerald-500 transition-colors"
                      >
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-12 h-12 object-cover rounded-md border border-slate-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-slate-900 text-xs truncate">{p.title}</h5>
                          <p className="text-[11px] font-semibold text-emerald-700">${p.price.toFixed(2)}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <button
                              onClick={() => {
                                onClose();
                                onOpenQuickView(p);
                              }}
                              className="text-[10px] font-semibold text-slate-600 hover:text-slate-900 underline underline-offset-2 flex items-center gap-0.5"
                            >
                              <Eye className="w-3 h-3" /> Quick View
                            </button>
                            <span>•</span>
                            <button
                              onClick={() => onTriggerOutboundRedirect(p)}
                              className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5"
                            >
                              Buy <ExternalLink className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-slate-400 block px-1">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-200 w-fit animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              <span>AI is analyzing catalog & hands-on reviews...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AI: e.g. 'Find a compact neck pillow under $40' or 'Compare top tech gifts'"
              className="flex-1 px-3.5 py-2 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs rounded-md shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
