import React from 'react';
import { TrendingUp, DollarSign, Gift, Target, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface AgentTeaserProps {
  onClick: () => void;
}

export function AgentTeaser({ onClick }: AgentTeaserProps) {
  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Main Container: Premium Card Style */}
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-3xl p-1 shadow-xl shadow-blue-900/5 border border-blue-100 overflow-hidden">
          
          {/* Decorative Background Blob (Optional subtle detail) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

          <div className="relative px-6 py-8 md:p-10">
            
            {/* Header Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Zap size={14} className="fill-blue-700" />
                Business Opportunity
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Become a ClaimAm Agent
              </h2>
              <p className="text-slate-500 text-base md:text-lg max-w-lg mx-auto">
                Turn your shop, kiosk, or home into a revenue center. 
                Start earning daily commissions instantly.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              
              {/* Item 1: Referral Bonus */}
              <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
                <div className="shrink-0 bg-green-50 p-3 rounded-xl">
                  <DollarSign className="w-5 h-5 text-[#00C853]" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-lg">₦600 Instant</p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Per new member agent referred by you.
                  </p>
                </div>
              </div>

              {/* Item 2: Claim Bonus */}
              <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
                <div className="shrink-0 bg-blue-50 p-3 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-lg">₦500 Bonus</p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Earn extra when they file their first claim.
                  </p>
                </div>
              </div>

              {/* Item 3: Swag */}
              <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
                <div className="shrink-0 bg-blue-50 p-3 rounded-xl">
                  <Gift className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-lg">Free Starter Kit</p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Get a free umbrella, banner & T-shirt.
                  </p>
                </div>
              </div>

              {/* Item 4: Milestone */}
              <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
                <div className="shrink-0 bg-green-50 p-3 rounded-xl">
                  <Target className="w-5 h-5 text-[#00C853]" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-lg">₦10,000 Milestone</p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Bonus when you refer 50 active agents.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Action Area */}
            <div className="bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-slate-100">
               <div className="flex items-center gap-2 text-amber-600 font-medium text-sm mb-4 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                  <Zap size={14} className="fill-amber-600 animate-pulse" />
                  Agent slots closing fast!
               </div>

               <button
                onClick={onClick}
                className="group relative w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-8 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                Register as Agent
                <span className="opacity-70 font-normal">|</span>
                <span>Pay ₦1,500</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}