import React, { useState } from 'react';
import { Mail, Bell, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState<string[]>(['beauty', 'tech']);
  const [frequency, setFrequency] = useState<'weekly' | 'instant'>('weekly');
  const [submitted, setSubmitted] = useState(false);

  const togglePreference = (pref: string) => {
    setPreferences(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="newsletter-section" className="py-8 px-4 sm:px-8 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
          
          {submitted ? (
            <div className="text-center py-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">You're Subscribed!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                We'll email you when a verified product drops in price or goes on sale.
              </p>
              <button
                onClick={() => { setSubmitted(false); setEmail(''); }}
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                Subscribe another email address
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              
              {/* Left Column: Title & Info */}
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-emerald-600" />
                  Price Drop & Viral Find Alerts
                </h3>
                <p className="text-xs text-slate-600 max-w-lg">
                  Join 18,000+ smart shoppers receiving weekly curated research and price drop alerts directly to their inbox.
                </p>
              </div>

              {/* Right Column: High Density Input & Button */}
              <form
                onSubmit={handleSubmit}
                data-netlify="true"
                name="newsletter"
                method="POST"
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto shrink-0"
              >
                <input type="hidden" name="form-name" value="newsletter" />

                <div className="relative flex-1 sm:w-64">
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 px-5 rounded-md shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Subscribe</span>
                </button>
              </form>

            </div>
          )}

        </div>
      </div>
    </section>
  );
};
