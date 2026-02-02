"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, X, Loader2 } from "lucide-react";
import { useUserContext } from "@/hooks/hooks";
import {
  useAgentStats,
 
} from "@/hooks/useAgentDashboard";

interface AgentData {
  fullName: string;
  agentId: string;
  referralCode: string;
  state: string;
  city: string;
  walletBalance: number;
  totalReferrals: number;
  leaderboardRank?: number;
}

interface AgentLoginFormProps {
  onClose: () => void;
  initialEmail?: string;
  onLoginSuccess: (userData: any) => void;
}

export function AgentLoginForm({
  onClose,
  onLoginSuccess,
  initialEmail = "",
}: AgentLoginFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user,loginFunc } = useUserContext();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the existing login logic
      const res = await loginFunc({ email, password });
      console.log(res);
      if (res.redirectUrl === `/verify-email?email=${res.email}`) {
        // console.log(res.redirectUrl)
        router.push(res.redirectUrl);
      } else if (res.redirectUrl === `/agent-payment`) {
         router.push(res.redirectUrl);
      } else {
        console.log("clicked");
        onLoginSuccess(res);
      }
    } catch (error) {
      console.error("Login error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* Click outside to close (Optional wrapper logic, here we just center) */}
      <div className="w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:-right-12 text-white hover:text-gray-200 transition-colors bg-white/10 p-2 rounded-full backdrop-blur-md"
        >
          <X size={24} />
        </button>

        {/* The Card (Your Design) */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white relative overflow-hidden">
          {/* Background Decoration (Optional subtle gradient) */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>

          {/* Logo Section */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00BA00] rounded-xl mb-3 shadow-lg shadow-green-200">
              <span className="text-2xl text-white font-bold">₦</span>
            </div>
            <h1 className="text-2xl font-bold text-[#1A1A1A]">ClaimAm</h1>
            <p className="text-sm text-gray-500 font-medium">Agent Dashboard</p>
          </div>

          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-[#1A1A1A]">Welcome Back!</h2>
            <p className="text-sm text-gray-600">
              Login to track your commissions
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#00BA00] transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="agent@example.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#00BA00] focus:outline-none transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#00BA00] transition-colors" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#00BA00] focus:outline-none transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-[#00BA00] hover:bg-[#00C853] text-white py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-200 hover:shadow-green-300 font-bold text-sm mt-2"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>
                  Login to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Rural Illustration (Footer) */}
          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-xs text-gray-400 mb-4 font-medium">
              Trusted by 4,821 agents across Nigeria
            </p>
            <div className="flex justify-center gap-4">
              <div
                className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-lg shadow-sm border border-green-100"
                title="Shop"
              >
                🏪
              </div>
              <div
                className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-lg shadow-sm border border-blue-100"
                title="Logistics"
              >
                🏍️
              </div>
              <div
                className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center text-lg shadow-sm border border-yellow-100"
                title="Agriculture"
              >
                🌾
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="mt-6 flex items-center justify-center gap-3 text-[10px] text-gray-400">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </div>
  );
}
