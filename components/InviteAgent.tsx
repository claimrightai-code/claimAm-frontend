"use client";
import { Copy, Share2, Users, DollarSign, TrendingUp, CheckCircle, Gift } from 'lucide-react';
import { useState } from 'react';

interface InviteAgentProps {
  language: 'english' | 'pidgin';
}

export function InviteAgent({ language }: InviteAgentProps) {
  const [copied, setCopied] = useState(false);
  const referralCode = 'CHUK2024';
  const referralLink = `https://claimam.ng/join/${referralCode}`;

  const text = {
    english: {
      title: 'Invite Agents',
      subtitle: 'Build your team and earn more',
      yourCode: 'Your Referral Code',
      yourLink: 'Your Referral Link',
      copy: 'Copy',
      copied: 'Copied!',
      share: 'Share',
      stats: 'Your Referral Stats',
      invited: 'Agents Invited',
      active: 'Active Agents',
      earned: 'Total Earned',
      howItWorks: 'How It Works',
      step1: 'Share your unique code or link with potential agents',
      step2: 'They sign up and start earning commissions',
      step3: 'You earn ₦500 for each successful referral',
      step4: 'Unlock bonuses when you hit milestones',
      bonuses: 'Milestone Bonuses',
      bonus1: '10 agents = ₦5,000 extra',
      bonus2: '50 agents = ₦10,000 extra',
      bonus3: '100 agents = ₦25,000 extra',
      recentReferrals: 'Recent Referrals',
      pending: 'Pending',
    },
    pidgin: {
      title: 'Bring Agents',
      subtitle: 'Build your team make you collect more money',
      yourCode: 'Your Referral Code',
      yourLink: 'Your Referral Link',
      copy: 'Copy',
      copied: 'Don Copy!',
      share: 'Share',
      stats: 'Your Referral Stats',
      invited: 'Agents Wey You Bring',
      active: 'Active Agents',
      earned: 'Total Money Wey You Make',
      howItWorks: 'How E Dey Work',
      step1: 'Share your code or link with people wey fit be agents',
      step2: 'Dem go sign up and start dey make money',
      step3: 'You go collect ₦500 for each person wey register',
      step4: 'You go unlock bonuses when you reach target',
      bonuses: 'Milestone Bonuses',
      bonus1: '10 agents = ₦5,000 extra',
      bonus2: '50 agents = ₦10,000 extra',
      bonus3: '100 agents = ₦25,000 extra',
      recentReferrals: 'People Wey You Don Bring Recently',
      pending: 'Pending',
    },
  };

  const t = text[language];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referrals = [
    { name: 'Emmanuel Okon', status: 'Active', earned: 500, date: '2 days ago', avatar: '👨' },
    { name: 'Halima Bala', status: 'Active', earned: 500, date: '5 days ago', avatar: '👩' },
    { name: 'Samuel Ibe', status: 'Pending', earned: 0, date: '1 week ago', avatar: '👨' },
    { name: 'Blessing Udoh', status: 'Active', earned: 500, date: '2 weeks ago', avatar: '👩' },
    { name: 'Yusuf Garba', status: 'Active', earned: 500, date: '3 weeks ago', avatar: '👨' },
  ];

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl text-[#1A1A1A] mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-gray-600 mb-1">{t.invited}</p>
          <p className="text-3xl text-[#1A1A1A]">23</p>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-gray-600 mb-1">{t.active}</p>
          <p className="text-3xl text-[#1A1A1A]">19</p>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-gray-600 mb-1">{t.earned}</p>
          <p className="text-3xl text-[#00BA00]">₦9,500</p>
        </div>
      </div>

      {/* Referral Code & Link */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-[#00BA00] to-[#00C853] rounded-2xl p-6 shadow-lg text-white">
          <p className="text-sm opacity-90 mb-3">{t.yourCode}</p>
          <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 mb-4">
            <p className="text-3xl text-center tracking-wider">{referralCode}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleCopy(referralCode)}
              className="flex-1 bg-white text-[#00BA00] py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  {t.copied}
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  {t.copy}
                </>
              )}
            </button>
            <button className="px-6 bg-white/20 hover:bg-white/30 backdrop-blur-lg py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
          <p className="text-sm text-gray-600 mb-3">{t.yourLink}</p>
          <div className="bg-gray-50 rounded-xl p-4 mb-4 break-all">
            <p className="text-sm text-gray-700">{referralLink}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleCopy(referralLink)}
              className="flex-1 bg-[#00BA00] hover:bg-[#00C853] text-white py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  {t.copied}
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  {t.copy}
                </>
              )}
            </button>
            <button className="px-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white mb-8">
        <h3 className="text-lg text-[#1A1A1A] mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#00BA00]" />
          {t.howItWorks}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: '1', text: t.step1, icon: '📱' },
            { step: '2', text: t.step2, icon: '✅' },
            { step: '3', text: t.step3, icon: '💰' },
            { step: '4', text: t.step4, icon: '🎁' },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00BA00] to-[#00C853] rounded-full flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg">
                {item.icon}
              </div>
              <div className="text-sm text-[#00BA00] mb-2">Step {item.step}</div>
              <p className="text-sm text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone Bonuses */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 mb-8 shadow-lg text-white">
        <div className="flex items-center gap-3 mb-6">
          <Gift className="w-8 h-8" />
          <h3 className="text-2xl">{t.bonuses}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 text-center">
            <p className="text-3xl mb-2">🥉</p>
            <p className="text-sm opacity-90">{t.bonus1}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 text-center">
            <p className="text-3xl mb-2">🥈</p>
            <p className="text-sm opacity-90">{t.bonus2}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 text-center">
            <p className="text-3xl mb-2">🥇</p>
            <p className="text-sm opacity-90">{t.bonus3}</p>
          </div>
        </div>
        <div className="mt-4 bg-white/20 backdrop-blur-lg rounded-xl p-3 text-center">
          <p className="text-sm">Progress: 23/50 agents • ₦5,500 away from next bonus!</p>
        </div>
      </div>

      {/* Recent Referrals */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
        <h3 className="text-lg text-[#1A1A1A] mb-6">{t.recentReferrals}</h3>
        <div className="space-y-4">
          {referrals.map((referral, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#00BA00] to-[#00C853] rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                  {referral.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[#1A1A1A]">{referral.name}</p>
                  <p className="text-sm text-gray-600">{referral.date}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm mb-1 ${
                  referral.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {referral.status}
                </div>
                <p className="text-sm text-[#00BA00]">
                  {referral.earned > 0 ? `+₦${referral.earned}` : t.pending}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
