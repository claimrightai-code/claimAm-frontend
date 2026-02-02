import React from 'react';
import { Users, Briefcase, ChevronRight, Sparkles } from 'lucide-react';

export function CTAButtons() {
  const scrollToForm = () => {
    const form = document.getElementById('agent-registration-form');
    form?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFoundingMember = () => {
    const form = document.getElementById('founding-member-form');
    form?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
   <section className="py-12 px-4 bg-slate-50 border-t border-slate-100">
      {/* Centering Wrapper */}
      <div className="max-w-4xl mx-auto flex justify-center items-center">
        
        {/* Card Container: max-w-lg keeps the card from getting too wide on desktop */}
        <div className="w-full max-w-lg">
          
          <button
            onClick={scrollToForm}
            className="group flex flex-col w-full bg-white text-left p-6 md:p-10 rounded-[2rem] shadow-sm border-2 border-transparent hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 relative overflow-hidden"
          >
            {/* Subtle background glow on hover */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Header / Icon */}
            <div className="flex items-center justify-between w-full mb-8 relative z-10">
              <div className="bg-blue-50 p-4 rounded-2xl group-hover:bg-blue-600 transition-colors duration-300">
                <Briefcase className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-100/50 px-3 py-1.5 rounded-full uppercase tracking-widest">
                Limited Slots
              </span>
            </div>

            {/* Main Content */}
            <div className="space-y-2 mb-8 relative z-10">
              <h3 className="text-sm font-bold text-blue-600 uppercase tracking-tight">
                Partner with us
              </h3>
              <div>
                <span className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Become an Agent
                </span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed pt-2">
                Join the fastest-growing insurance network. Start earning daily commissions instantly. No experience needed.
              </p>
            </div>

            {/* Footer Action */}
            <div className="mt-auto w-full pt-6 border-t border-slate-100 flex items-center justify-between text-blue-600 font-bold text-sm group-hover:text-blue-700">
              <span>Get Started Now</span>
              <div className="bg-blue-50 rounded-xl p-2 group-hover:bg-blue-100 group-hover:translate-x-1 transition-all">
                 <ChevronRight size={20} />
              </div>
            </div>
          </button>

        </div>
      </div>
    </section>
  );
}