import {
  Copy,
  Share2,
  TrendingUp,
  Info,
  CheckCircle2,
  Wallet,
  Users,
  MessageCircle,
  Facebook,
} from "lucide-react";
import { useState } from "react";

interface ReferralDashboardProps {
  referralCode: string;
  totalReferrals: number;
  moneyEarned: number;
  fullName: string;
}

export function ReferralDashboard({
  referralCode,
  totalReferrals,
  moneyEarned,
  fullName,
}: ReferralDashboardProps) {
  const [copied, setCopied] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Ensure link has https:// so social platforms treat it as a real link
  const referralLink = `https://claimam.ng/agent?ref=${referralCode}`;

  // Logic to calculate next milestone (e.g., 50, 100, 150)
  const milestoneStep = 50;
  const nextMilestone =
    Math.ceil((totalReferrals + 1) / milestoneStep) * milestoneStep;
  const nextBonus = 10000;

  // Calculate Progress Percentage (0 to 100)
  const progressPercentage = Math.min(
    (totalReferrals / nextMilestone) * 100,
    100,
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async (platform: "whatsapp" | "share" | "sms") => {
    const message = `Join ClaimAm as a Founding Agent! 🔥\n\nEarn ₦5,000-₦50,000+ daily helping Nigerians with insurance claims.\n\nUse my code: ${referralCode}\n${referralLink}`;

    if (navigator.share) {
      navigator.share({
        title: "Join ClaimAm",
        text: message,
      });
    } else {
      switch (platform) {
        case "whatsapp": {
          // Open the WhatsApp channel directly (no share/copy behavior)
          const channelUrl = "https://chat.whatsapp.com/0029VbCPveeLI8YeAFhoUY2d";
          window.open(channelUrl, "_blank");
          break;
        }
        case "share":
          window.open(
            `https://claimam.ng/agent/?u=${encodeURIComponent(referralCode)}&quote=${encodeURIComponent(message)}`,
            "_blank",
          );
          break;
        case "sms":
          window.open(`sms:?body=${encodeURIComponent(message)}`, "_blank");
          break;
      }
    }
  };

  return (
    <section className="py-8 px-4 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Referral Hub
              </h2>
              <p className="text-slate-500 text-xs md:text-sm">
                Hello <span className="font-bold"> {fullName}</span>, Grow your
                network, and increase your earnings
              </p>
            </div>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>

          {showInfo && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex gap-3 animate-in fade-in slide-in-from-top-2">
              <div className="bg-blue-100 p-1 rounded-full h-fit">
                <Info size={14} className="text-blue-600" />
              </div>
              <p className="text-xs text-blue-800 leading-relaxed">
                <span className="font-bold">How it works:</span> Share your
                unique code. Earn{" "}
                <span className="font-bold">₦600 instantly</span> when a new
                agent registers and pays using your link.
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Total Joined */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Users size={14} className="text-blue-600" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Network
                </span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-slate-900">
                {totalReferrals}
              </div>
              <div className="text-xs text-slate-500 mt-1">Agents Joined</div>
            </div>

            {/* Money Earned */}
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-[#00C853]/20 rounded-lg">
                  <Wallet size={14} className="text-[#00C853]" />
                </div>
                <span className="text-xs font-bold text-green-700 uppercase tracking-wider">
                  Earnings
                </span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-slate-900">
                ₦{moneyEarned.toLocaleString()}
              </div>
              <div className="text-xs text-green-700 mt-1">Total Paid</div>
            </div>
          </div>

          {/* Code & Link Section */}
          <div className="space-y-4 mb-8">
            {/* Referral Code */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-1 pr-1.5 flex items-center justify-between">
              <div className="pl-4 py-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  Your Code
                </p>
                <p className="text-lg font-mono font-bold text-slate-900 tracking-wide">
                  {referralCode || "Loading..."}
                </p>
              </div>
              <button
                onClick={() => handleCopy(referralCode)}
                className="bg-white hover:bg-slate-100 text-slate-600 p-3 rounded-xl border border-slate-200 shadow-sm transition-all active:scale-95"
              >
                {copied ? (
                  <CheckCircle2 size={18} className="text-[#00C853]" />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>

            {/* Referral Link */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-1 pr-1.5 flex items-center justify-between">
              <div className="pl-4 py-3 overflow-hidden">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  Referral Link
                </p>
                <p className="text-sm text-slate-600 truncate">
                  {referralLink}
                </p>
              </div>
              <button
                onClick={() => handleCopy(referralLink)}
                className="bg-white hover:bg-slate-100 text-slate-600 p-3 rounded-xl border border-slate-200 shadow-sm transition-all active:scale-95 flex-shrink-0 ml-2"
              >
                <Copy size={18} />
              </button>
            </div>

            {copied && (
              <p className="text-center text-xs text-[#00C853] font-medium animate-in fade-in">
                ✓ Copied to clipboard
              </p>
            )}
          </div>

          {/* Milestone Progress */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-5 mb-8 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

            <div className="flex items-center gap-2 mb-2 relative z-10">
              <div className="bg-white/20 p-1 rounded-md">
                <TrendingUp size={14} className="text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wide opacity-90">
                Next Bonus
              </span>
            </div>

            <div className="flex justify-between items-end mb-2 relative z-10">
              <p className="text-sm font-medium">
                Refer{" "}
                <span className="font-bold">
                  {nextMilestone - totalReferrals} more
                </span>{" "}
                to win ₦{nextBonus.toLocaleString()}
              </p>
              <p className="text-xs font-bold opacity-80">
                {totalReferrals}/{nextMilestone}
              </p>
            </div>

            {/* Progress Bar Fixed */}
            <div className="w-full bg-black/20 rounded-full h-2 relative z-10">
              <div
                className="bg-[#00C853] h-2 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,200,83,0.5)]"
                // FIX: Use the calculated percentage variable, NOT the event type
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Share Actions */}
          <div>
            <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Share Instantly
            </p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleShare("whatsapp")}
                className="group flex flex-col items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] transition-colors"
              >
                <Users size={20} className="fill-current" />
                <span className="text-xs font-bold">Join Community</span>
              </button>

              <button
                onClick={() => handleShare("share")}
                className="group flex flex-col items-center justify-center gap-2 py-3 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] transition-colors"
              >
                <Share2 size={20} className="fill-current" />
                <span className="text-xs font-bold">Share</span>
              </button>

              <button
                onClick={() => handleShare("sms")}
                className="group flex flex-col items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <Share2 size={20} />
                <span className="text-xs font-bold">Others</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
