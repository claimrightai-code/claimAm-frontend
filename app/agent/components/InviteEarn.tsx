import { Copy, Share2, Users, TrendingUp, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface InviteEarnProps {
  referralCode: string;
  totalReferrals: number;
  moneyEarned: number;
  onBack: () => void;
}

export function InviteEarn({ referralCode, totalReferrals, moneyEarned, onBack }: InviteEarnProps) {
  const [copied, setCopied] = useState(false);
  const referralLink = `claimam.ng/ref=${referralCode}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const message = `Join ClaimAm as a Founding Agent! 🔥\n\nEarn ₦5,000-₦50,000+ daily helping Nigerians with insurance claims.\n\nUse my code: ${referralCode}\n${referralLink}\n\nPay only ₦1,000 to start!`;
    
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(message)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`,
      sms: `sms:?body=${encodeURIComponent(message)}`
    };

    window.open(urls[platform], '_blank');
  };

  return (
    <section className="py-4 px-4 bg-gradient-to-b from-gray-900 via-blue-900/20 to-gray-900 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs">Back to Wallet</span>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl text-white mb-2">
            Invite Agents, Earn ₦200 Instantly 🔥
          </h2>
          <p className="text-gray-300 text-sm">
            Every person that pays ₦1,000 with your code → ₦200 lands in your wallet immediately!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-4 text-center border border-green-400 shadow-lg">
            <Users className="w-6 h-6 text-white mx-auto mb-2" />
            <div className="text-2xl text-white mb-1">{totalReferrals}</div>
            <div className="text-green-100 text-xs">People Joined</div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-4 text-center border border-blue-400 shadow-lg">
            <TrendingUp className="w-6 h-6 text-white mx-auto mb-2" />
            <div className="text-2xl text-white mb-1">₦{moneyEarned.toLocaleString()}</div>
            <div className="text-blue-100 text-xs">Money Earned</div>
          </div>
        </div>

        {/* Referral Code */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4 border border-gray-700">
          <div className="text-green-400 text-xs mb-2 text-center">YOUR REFERRAL CODE</div>
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-4 mb-3">
            <div className="flex items-center justify-between">
              <div className="text-white text-2xl tracking-widest">{referralCode}</div>
              <button
                onClick={() => handleCopy(referralCode)}
                className="bg-green-400 hover:bg-green-500 text-green-900 p-2 rounded-lg transition-colors"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="text-gray-400 text-xs mb-2 text-center">YOUR REFERRAL LINK</div>
          <div className="flex items-center justify-between bg-gray-700 rounded-lg p-2">
            <div className="text-white text-xs truncate flex-1">{referralLink}</div>
            <button
              onClick={() => handleCopy(referralLink)}
              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors ml-2"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          {copied && (
            <div className="text-green-400 text-xs text-center mt-2">
              ✓ Copied to clipboard!
            </div>
          )}
        </div>

        {/* Share Buttons */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-4">
          <h3 className="text-white text-base mb-3 text-center">Share Your Code</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleShare('whatsapp')}
              className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors flex flex-col items-center gap-1"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-xs">WhatsApp</span>
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex flex-col items-center gap-1"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-xs">Facebook</span>
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg transition-colors flex flex-col items-center gap-1"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-xs">Twitter</span>
            </button>
            <button
              onClick={() => handleShare('sms')}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex flex-col items-center gap-1"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-xs">SMS</span>
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-green-900/30 border border-green-600 rounded-lg p-3">
          <div className="text-green-400 text-xs text-center">
            💡 <span className="text-white">Pro Tip:</span> Share in WhatsApp groups, post on social media, and tell friends at your shop. The more you share, the more you earn!
          </div>
        </div>
      </div>
    </section>
  );
}