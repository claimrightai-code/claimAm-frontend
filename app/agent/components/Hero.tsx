// import logo from 'figma:asset/35aaf15d9771aa14409793ff8e19c40be25757d8.png';
import { ClaimAmLogo } from "@/../../components/ClaimAmLogo";
import { Check, Star, Users, ArrowRight } from "lucide-react";
// import { ClaimAmLogo } from '../../../ClaimAmLogo';
import Link from "next/link";
interface HeroProps {
  onFoundingMemberClick?: () => void;
  onAgentClick?: () => void;
}

export function Hero({ onFoundingMemberClick, onAgentClick }: HeroProps) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-green-100">
      {/* Navigation (Included for context/completeness) */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full mb-8">
        <div className="flex items-center gap-2">
          
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <ClaimAmLogo size={60} withBackground={false} />
            </div>
            <span className="text-xl font-bold text-gray-900">ClaimAm</span>
          </Link>
        </div>
        <div className="hidden md:block text-sm font-medium text-slate-500">
          {/* Placeholder for menu items */}
        </div>
      </nav>
      <section className="px-4 text-center max-w-5xl mx-auto relative pb-20">
        {/* Logo/Brand Mark Centered */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-50 p-4 rounded-2xl mb-2">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <ClaimAmLogo size={60} withBackground={false} />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            ClaimAm
          </h1>

          {/* Slogan Badge - Replaced gradient with clean modern pill */}
          <div className="inline-flex items-center gap-2 bg-[#00C853]/10 text-[#00C853] px-5 py-2 rounded-full text-lg font-semibold mb-8 border border-[#00C853]/20">
            <Check size={18} strokeWidth={3} />
            <span>claim your Right!</span>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto font-medium">
            Nigeria's accessible and fastest insurance claims platform. Get your
            motor, farm, hospital & other insurance claims paid in minutes.
            <span className="block text-slate-400 text-base mt-2 font-normal">
              No stress. No waiting. From anywhere.
            </span>
          </p>

          {/* Insurance Types - Converted to clean chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Motor", "Farm", "Hospital", "and more"].map((item, index) => (
              <span
                key={index}
                className="bg-slate-50 text-slate-600 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium shadow-sm hover:border-[#00C853] hover:text-[#00C853] transition-colors cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Buttons - Styled to match the clean aesthetic */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mt-8">
          {/* Founding Member Button (Primary Green) */}
        

          {/* Agent Button (Secondary Blue) */}
          <button
            onClick={onAgentClick}
            className="group w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-base font-bold">
                <Users size={18} />
                Become an Agent
              </div>
              <div className="text-[11px] font-medium text-blue-100 mt-0.5">
                Earn ₦5k-₦50k+ Daily
              </div>
            </div>
          </button>
        </div>

        {/* Trust/Social Proof Footer */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <p className="text-slate-400 text-sm">
            Trusted by thousands of Nigerians
          </p>
        </div>
      </section>
    </div>
  );
}