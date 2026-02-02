import React, { useRef, useState } from "react";
import { Share2, Download, X, Crown, CheckCircle2, MapPin } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

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

interface DigitalAgentIDProps {
  agentData: AgentData;
  onClose: () => void;
}

export function DigitalAgentID({ agentData, onClose }: DigitalAgentIDProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const referralLink = `claimam.ng/ref=${agentData.referralCode}`;
  const isTopAgent =
    agentData.leaderboardRank && agentData.leaderboardRank <= 100;
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = () => {
    const message = `I'm now a ClaimAm Founding Agent! 🔥\nJoin me and earn ₦5,000-₦50,000+ daily.\nCode: ${agentData.referralCode}\n${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setIsGenerating(true);
      const html2canvas = (await import("html2canvas")).default;

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null, // Allows transparency and respects CSS border-radius
        scale: 3, // High resolution
        logging: false,
        useCORS: true, // Ensures icons/images load properly
      });

      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `ClaimAm-ID-${agentData.agentId}.png`;
      link.click();
      setIsGenerating(false);
    } catch (error) {
      console.error(error);
      alert("Capture failed. Please take a screenshot instead.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full animate-in fade-in zoom-in duration-300">
        {/* The ID Card */}
        <div
          ref={cardRef}
          className="relative bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden border border-slate-700 flex flex-col"
          style={{ aspectRatio: "3/4.5" }}
        >
          {/* Subtle Glow Backgrounds */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00C853]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

          {/* Header */}
          <div className="flex justify-between items-start mb-10 relative z-10">
            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 flex items-center justify-center">
                <div className="absolute w-7 h-3.5 border-t-[3px] border-blue-500 rounded-t-full top-0.5"></div>
                <div className="absolute w-5 h-2.5 border-t-[3px] border-[#00C853] rounded-t-full top-2.5"></div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                ClaimAm
              </span>
            </div>
            {isTopAgent && (
              <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full border border-yellow-400/20 text-[10px] font-bold tracking-widest">
                <Crown size={12} className="fill-yellow-400" />
                TOP {agentData.leaderboardRank}
              </div>
            )}
          </div>

          <div className="mb-8">
            <span className="bg-white/5 text-slate-400 border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
              Founding Agent
            </span>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8 relative z-10">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00C853] to-blue-500 p-1 mb-4 shadow-xl">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white text-3xl font-bold border-4 border-slate-900">
                {agentData.fullName.charAt(0)}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {agentData.fullName}
            </h2>
            <div className="flex items-center gap-1.5 text-slate-500 text-sm">
              <MapPin size={14} />
              {agentData.city}, {agentData.state}
            </div>
          </div>

          {/* Data Grid */}
          <div className="grid grid-cols-2 gap-4 mb-10 relative z-10">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                Agent ID
              </p>
              <p className="text-sm font-mono font-bold text-blue-400">
                {agentData.agentId}
              </p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                Ref Code
              </p>
              <p className="text-sm font-mono font-bold text-[#00C853]">
                {agentData.referralCode}
              </p>
            </div>
          </div>

          {/* QR Code */}
          <div className="mt-auto flex flex-col items-center relative z-10">
            <div className="bg-white p-2.5 rounded-2xl shadow-lg shadow-black/40 mb-4">
              <QRCodeSVG value={referralLink} size={70} />
            </div>
            <p className="text-[10px] text-slate-500 font-medium text-center tracking-wide">
              Scan to join this Agent's network
            </p>
          </div>
        </div>

        {/* Action Buttons (Light Theme to match main UI) */}
        <div className="mt-8 space-y-3">
          <button
            onClick={onClose}
            className="w-full bg-[#00C853] hover:bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={20} />
            Continue to Dashboard
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-4 rounded-2xl border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Download size={18} />
              {isGenerating ? "Saving..." : "Download ID"}
            </button>
            <button
              onClick={handleShare}
              className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-4 rounded-2xl border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Share2 size={18} />
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
