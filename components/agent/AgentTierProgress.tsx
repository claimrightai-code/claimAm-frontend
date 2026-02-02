"use client";
import { Crown, Star, Zap, TrendingUp, Users, DollarSign, Gift, Award, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface AgentTierProgressProps {
  language: 'english' | 'pidgin';
  currentTier?: 'silver' | 'gold' | 'diamond';
  activeUsers?: number;
  totalCommission?: number;
  onConfetti?: () => void;
}

export function AgentTierProgress({ 
  language, 
  currentTier = 'silver',
  activeUsers = 87,
  totalCommission = 435000,
  onConfetti
}: AgentTierProgressProps) {
  const text = {
    english: {
      title: 'Agent Tier Progress',
      subtitle: 'Upgrade your tier to unlock bigger rewards',
      currentTier: 'Current Tier',
      nextTier: 'Next Tier',
      progress: 'Progress to Next Tier',
      moreUsers: 'more active users to reach',
      yourStats: 'Your Stats',
      activeUsers: 'Active Users',
      totalCommission: 'Total Commission',
      tierBenefits: 'Tier Benefits',
      upgrade: 'Upgrade your tier — collect bigger money and special treatment!',
      silver: 'Silver',
      gold: 'Gold',
      diamond: 'Diamond',
      silverDesc: 'Starting tier for all agents',
      goldDesc: '100+ active users OR ₦500k+ total commission',
      diamondDesc: '500+ active users OR ₦2M+ commission + 10 Gold agents recruited',
      benefits: {
        silver: [
          'Standard support response',
          'Basic marketing kit',
          'Monthly agent training',
          'Mobile app access',
        ],
        gold: [
          'Priority chat support',
          'Branded marketing banner',
          '₦20,000 monthly bonus',
          'Early access to new features',
          'Quarterly recognition',
        ],
        diamond: [
          'Regional head status',
          '₦100,000 monthly bonus',
          'Car/Okada transport allowance',
          '24/7 dedicated support line',
          'Direct CEO hotline',
          'Annual conference trip',
          'Recruit & earn from sub-agents',
        ],
      },
    },
    pidgin: {
      title: 'Agent Level Progress',
      subtitle: 'Level up make you collect bigger money',
      currentTier: 'Your Level Now',
      nextTier: 'Next Level',
      progress: 'Progress to Next Level',
      moreUsers: 'more active people to reach',
      yourStats: 'Your Stats',
      activeUsers: 'Active People',
      totalCommission: 'Total Money Wey You Make',
      tierBenefits: 'Level Benefits',
      upgrade: 'Upgrade your level — collect bigger money and special treatment!',
      silver: 'Silver',
      gold: 'Gold',
      diamond: 'Diamond',
      silverDesc: 'Starting level for all agents',
      goldDesc: '100+ active people OR ₦500k+ total money',
      diamondDesc: '500+ active people OR ₦2M+ money + 10 Gold agents wey you bring',
      benefits: {
        silver: [
          'Normal support',
          'Basic marketing things',
          'Monthly training',
          'Mobile app access',
        ],
        gold: [
          'Priority chat support',
          'Your own branded banner',
          '₦20,000 every month extra',
          'First to see new features',
          'Quarterly recognition',
        ],
        diamond: [
          'Regional head title',
          '₦100,000 every month extra',
          'Car/Okada money',
          '24/7 special support line',
          'Direct CEO line',
          'Annual conference trip',
          'Bring agents, collect money from their work',
        ],
      },
    },
  };

  const t = text[language];

  const tiers = {
    silver: {
      name: t.silver,
      icon: Star,
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-700',
      requirement: 0,
      commissionReq: 0,
      benefits: t.benefits.silver,
    },
    gold: {
      name: t.gold,
      icon: Award,
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      requirement: 100,
      commissionReq: 500000,
      benefits: t.benefits.gold,
    },
    diamond: {
      name: t.diamond,
      icon: Crown,
      color: 'from-purple-400 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      requirement: 500,
      commissionReq: 2000000,
      benefits: t.benefits.diamond,
    },
  };

  type TierKey = keyof typeof tiers; // "silver" | "gold" | "diamond"

  const getCurrentProgress = () => {
    if (currentTier === 'diamond') {
      return { percentage: 100, nextTier: null, usersNeeded: 0 };
    }
    
    const nextTier = currentTier === 'silver' ? 'gold' : 'diamond';
    const targetUsers = tiers[nextTier].requirement;
    const percentage = Math.min((activeUsers / targetUsers) * 100, 100);
    const usersNeeded = Math.max(targetUsers - activeUsers, 0);
    
    return { percentage, nextTier, usersNeeded };
  };

  const progress = getCurrentProgress();
  const currentTierData = tiers[currentTier];


const nextTierData = progress.nextTier && (progress.nextTier as TierKey)
  ? tiers[progress.nextTier as TierKey]
  : null;
  return (
    <div className="p-3 lg:p-6 pb-20 lg:pb-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl text-[#1A1A1A] mb-1">{t.title}</h1>
        <p className="text-sm text-gray-600">{t.subtitle}</p>
      </div>

      {/* Current Tier Card */}
      <div className={`${currentTierData.bgColor} rounded-2xl p-6 lg:p-8 shadow-lg mb-6 border-2 border-gray-200`}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">{t.currentTier}</p>
            <div className="flex items-center gap-3">
              <div className={`w-16 h-16 bg-gradient-to-br ${currentTierData.color} rounded-xl flex items-center justify-center shadow-lg`}>
                {currentTier === 'diamond' ? (
                  <Crown className="w-8 h-8 text-white" />
                ) : (
                  <currentTierData.icon className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-3xl text-[#1A1A1A]">{currentTierData.name}</h2>
                {currentTier === 'diamond' && (
                  <p className="text-sm text-purple-600 mt-1">👑 Elite Status</p>
                )}
              </div>
            </div>
          </div>
          
          {currentTier === 'diamond' && (
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm shadow-lg">
              🏆 Top Tier
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-gray-500" />
              <p className="text-xs text-gray-600">{t.activeUsers}</p>
            </div>
            <p className="text-2xl text-[#1A1A1A]">{activeUsers}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <p className="text-xs text-gray-600">{t.totalCommission}</p>
            </div>
            <p className="text-2xl text-[#1A1A1A]">₦{totalCommission.toLocaleString()}</p>
          </div>
        </div>

        {/* Progress to Next Tier */}
        {progress.nextTier && nextTierData && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-700">{t.progress}</p>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 bg-gradient-to-br ${nextTierData.color} rounded-lg flex items-center justify-center shadow-md`}>
                  <nextTierData.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{nextTierData.name}</span>
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full bg-gradient-to-r ${nextTierData.color} rounded-full transition-all duration-500`}
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600">
              <span className="font-medium text-[#00A878]">{progress.usersNeeded}</span> {t.moreUsers} {nextTierData.name}!
            </p>
          </div>
        )}

        {currentTier === 'diamond' && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white text-center">
            <Crown className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">You've reached the highest tier! Keep crushing it! 🎉</p>
          </div>
        )}
      </div>

      {/* Upgrade Banner */}
      {progress.nextTier && (
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-orange-600 flex-shrink-0" />
            <p className="text-sm text-gray-900">{t.upgrade}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-orange-600" />
        </div>
      )}

      {/* All Tiers Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(tiers).map(([tierKey, tier]) => {
          const TierIcon = tier.icon;
          const isCurrentTier = tierKey === currentTier;
          
          return (
            <div
              key={tierKey}
              className={`bg-white rounded-xl shadow-lg border-2 transition-all ${
                isCurrentTier ? 'border-[#00A878] shadow-xl' : 'border-gray-100'
              } overflow-hidden relative`}
            >
              {isCurrentTier && (
                <div className="absolute top-0 right-0 bg-[#00A878] text-white text-xs px-3 py-1 rounded-bl-lg">
                  {t.currentTier}
                </div>
              )}
              
              <div className={`${tier.bgColor} p-6`}>
                <div className={`w-14 h-14 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center shadow-lg mb-4`}>
                  <TierIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl text-[#1A1A1A] mb-2">{tier.name}</h3>
                <p className="text-xs text-gray-600 mb-4">
                  {tierKey === 'silver' && t.silverDesc}
                  {tierKey === 'gold' && t.goldDesc}
                  {tierKey === 'diamond' && t.diamondDesc}
                </p>
                {tier.requirement > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{tier.requirement}+ users</span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">{t.tierBenefits}</h4>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-gray-600">
                      <Gift className="w-4 h-4 text-[#00A878] flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
