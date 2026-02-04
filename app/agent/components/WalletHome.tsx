"use client";
import {
  ArrowDownToLine,
  Share2,
  History,
  Eye,
  EyeOff,
  Wallet,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useAgentStats } from "@/hooks/useAgentDashboard";

interface WalletHomeProps {
  onNavigate: (page: "invite" | "withdraw" | "history") => void;
}

export function WalletHome({ onNavigate }: WalletHomeProps) {
  const [showBalance, setShowBalance] = useState(true);

  // 2. Fetch Data Directly
  const { data: stats, isLoading } = useAgentStats();

  // 3. Safe Fallback
  console.log(stats);
  const balance = stats?.wallet_balance || 0;
  
  return (
    <div className="px-4 py-6 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        {/* Balance Card */}
        <div className="relative bg-gradient-to-br from-[#00C853] to-green-700 rounded-[1.5rem] p-6 mb-6 shadow-xl shadow-green-500/20 text-white overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Wallet size={120} />
          </div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1 opacity-90">
              <span className="text-xs font-bold uppercase tracking-widest">
                Total Balance
              </span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>

            <div className="mb-4">
              {isLoading ? (
                <div className="h-10 w-48 bg-white/20 animate-pulse rounded-lg mt-2" />
              ) : (
                <h2 className="text-4xl font-bold tracking-tight font-mono">
                  NGN{showBalance ? `${balance.toLocaleString()}` : "•••••••"}
                </h2>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-medium border border-white/10">
                Available for withdrawal
              </div>

              {/* Active Referrals Count (Bonus Feature) */}
              {!isLoading && (
                <div className="text-xs font-bold bg-green-800/30 px-2 py-1 rounded border border-white/10">
                  {stats?.active_referrals || 0} Active Referrals
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => onNavigate("withdraw")}
            className="group bg-white hover:bg-blue-50 border border-slate-100 hover:border-blue-100 rounded-2xl p-4 transition-all shadow-sm hover:shadow-md flex flex-col items-center justify-center gap-3 active:scale-95"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center">
              <ArrowDownToLine size={20} />
            </div>
            <span className="text-xs font-bold text-slate-600 group-hover:text-blue-700">
              Withdraw
            </span>
          </button>

          <button
            onClick={() => onNavigate("invite")}
            className="group bg-white hover:bg-green-50 border border-slate-100 hover:border-green-100 rounded-2xl p-4 transition-all shadow-sm hover:shadow-md flex flex-col items-center justify-center gap-3 active:scale-95"
          >
            <div className="w-10 h-10 rounded-full bg-green-50 text-[#00C853] group-hover:bg-[#00C853] group-hover:text-white transition-colors flex items-center justify-center">
              <Share2 size={20} />
            </div>
            <span className="text-xs font-bold text-slate-600 group-hover:text-green-700">
              Invite
            </span>
          </button>

          <button
            onClick={() => onNavigate("history")}
            className="group bg-white hover:bg-slate-100 border border-slate-100 hover:border-slate-200 rounded-2xl p-4 transition-all shadow-sm hover:shadow-md flex flex-col items-center justify-center gap-3 active:scale-95"
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 group-hover:bg-slate-600 group-hover:text-white transition-colors flex items-center justify-center">
              <History size={20} />
            </div>
            <span className="text-xs font-bold text-slate-600 group-hover:text-slate-800">
              History
            </span>
          </button>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <div className="bg-blue-100 p-1.5 rounded-full shrink-0 mt-0.5">
            <Sparkles size={14} className="text-blue-600 fill-blue-600" />
          </div>
          <div>
            <p className="text-sm text-slate-700 leading-relaxed">
              <span className="font-bold text-blue-700">Pro Tip:</span> Earn{" "}
              <span className="font-bold text-[#00C853]">₦600 instantly</span>{" "}
              whenever a new agent uses your referral code to register!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
