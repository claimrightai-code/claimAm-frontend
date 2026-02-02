"use client";
import { Users, DollarSign, TrendingUp, Award, Target, Zap, Plus, FileText, UserPlus, Repeat, Crown, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
  language: 'english' | 'pidgin';
  onConfetti: () => void;
}

export function Dashboard({ onNavigate, language, onConfetti }: DashboardProps) {
  const [progressPercentage, setProgressPercentage] = useState(68);
  const [earningsTab, setEarningsTab] = useState<'onetime' | 'recurring' | 'claims'>('onetime');

  const text = {
    english: {
      welcome: 'Welcome Back, Chukwudi!',
      subtitle: 'Your performance this month',
      totalUsers: 'Total Users Onboarded',
      claimsPaid: 'Claims Paid',
      totalEarnings: 'Total Earnings',
      myRank: 'My Rank',
      of: 'of',
      agents: 'agents',
      progressTitle: 'Monthly Target Progress',
      progressSubtitle: 'more users to hit ₦100k this month',
      walletBalance: 'Wallet Balance',
      withdraw: 'Withdraw Now',
      quickActions: 'Quick Actions',
      onboardUser: 'Onboard New User',
      fileClaim: 'File Claim for User',
      inviteAgent: 'Invite Agent',
      recentActivity: 'Recent Activity',
      viewAll: 'View All',
      badge: 'Champion Badge',
      streak: 'Day Streak',
      earningsBreakdown: 'Earnings Breakdown',
      oneTimeEarnings: 'One-Time Earnings',
      recurringMonthly: 'Recurring Monthly',
      claimCommissions: 'Claim Commissions',
      recurringIncomeTitle: 'Recurring Income This Month',
      recurringExplain: 'Every user you onboard who renews ₦2,250 subscription monthly → you collect ₦500 automatically!',
      activeRecurring: 'active users',
      viewRecurringDetails: 'View Recurring Details',
      currentTier: 'Current Tier',
      viewTierProgress: 'View Tier Progress',
    },
    pidgin: {
      welcome: 'Welcome Back, Chukwudi!',
      subtitle: 'How you dey perform this month',
      totalUsers: 'Total People Wey You Bring',
      claimsPaid: 'Claims Wey Don Pay',
      totalEarnings: 'Total Money Wey You Make',
      myRank: 'My Rank',
      of: 'for',
      agents: 'agents',
      progressTitle: 'Monthly Target Progress',
      progressSubtitle: 'more people make you collect ₦100k this month',
      walletBalance: 'Money Wey Dey Wallet',
      withdraw: 'Collect Money Now',
      quickActions: 'Quick Tins',
      onboardUser: 'Bring New Person',
      fileClaim: 'File Claim for Person',
      inviteAgent: 'Bring Agent',
      recentActivity: 'Wetin Happen Recently',
      viewAll: 'See All',
      badge: 'Champion Badge',
      streak: 'Day Streak',
      earningsBreakdown: 'How You Dey Make Money',
      oneTimeEarnings: 'One-Time Money',
      recurringMonthly: 'Monthly Steady Money',
      claimCommissions: 'Claim Money',
      recurringIncomeTitle: 'Recurring Money Don Land This Month',
      recurringExplain: 'Every person wey you bring wey renew ₦2,250 subscription monthly → you collect ₦500 automatic!',
      activeRecurring: 'active people',
      viewRecurringDetails: 'See Recurring Details',
      currentTier: 'Your Level Now',
      viewTierProgress: 'See Level Progress',
    },
  };

  const t = text[language];

  const stats = [
    { 
      label: t.totalUsers, 
      value: '284', 
      icon: Users, 
      color: 'from-blue-500 to-blue-600',
      change: '+12 this week'
    },
    { 
      label: t.claimsPaid, 
      value: '47', 
      icon: FileText, 
      color: 'from-purple-500 to-purple-600',
      change: '+5 this week'
    },
    { 
      label: t.totalEarnings, 
      value: '₦78,400', 
      icon: DollarSign, 
      color: 'from-green-500 to-green-600',
      change: '+₦8,200 this week'
    },
    { 
      label: `${t.myRank} #47 ${t.of} 4,821`, 
      value: '🏆', 
      icon: Award, 
      color: 'from-yellow-500 to-orange-600',
      change: 'Up 3 spots'
    },
  ];

  const activities = [
    { name: 'Fatima Yusuf', action: 'Claim approved - ₦15,000', time: '2 mins ago', commission: '+₦1,500' },
    { name: 'Aminu Bello', action: 'New user onboarded', time: '1 hour ago', commission: '+₦200' },
    { name: 'Bose Adebayo', action: 'Claim submitted', time: '3 hours ago', commission: 'Pending' },
    { name: 'Tunde Okafor', action: 'New user onboarded', time: '5 hours ago', commission: '+₦200' },
  ];

  // Earnings breakdown data
  const earningsData = {
    onetime: {
      amount: 56800,
      description: language === 'english' ? 'Onboarding commissions' : 'Money from bringing people',
      icon: UserPlus,
      color: 'from-blue-500 to-blue-600',
    },
    recurring: {
      amount: 43500,
      description: language === 'english' ? '87 active users × ₦500' : '87 active people × ₦500',
      icon: Repeat,
      color: 'from-green-500 to-green-600',
    },
    claims: {
      amount: 78100,
      description: language === 'english' ? 'Claims processed' : 'Claims wey don process',
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
    },
  };

  const currentTier = 'silver'; // Could be 'silver', 'gold', or 'diamond'
  const tierData = {
    silver: { name: 'Silver', icon: Star, color: 'from-gray-400 to-gray-600' },
    gold: { name: 'Gold', icon: Award, color: 'from-yellow-400 to-yellow-600' },
    diamond: { name: 'Diamond', icon: Crown, color: 'from-purple-400 to-pink-600' },
  };

  return (
    <div className="p-3 lg:p-6 pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl text-[#1A1A1A] mb-1">Welcome Back, Chukwudi!</h1>
        <p className="text-sm text-gray-600">{t.subtitle}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className="text-xl lg:text-2xl text-[#1A1A1A] mb-1">{stat.value}</p>
              <p className="text-xs text-green-600">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Big Wallet Balance Card with Earnings Breakdown */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">{t.walletBalance}</p>
            <p className="text-4xl lg:text-5xl text-[#1A1A1A]">₦178,400</p>
          </div>
          <button
            onClick={() => onNavigate('wallet')}
            className="bg-gradient-to-br from-[#00A878] to-[#00C896] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            {t.withdraw}
          </button>
        </div>

        {/* Earnings Breakdown Tabs */}
        <div className="border-t border-gray-100 pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">{t.earningsBreakdown}</h3>
          <div className="flex gap-2 mb-4 overflow-x-auto">
            <button
              onClick={() => setEarningsTab('onetime')}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                earningsTab === 'onetime'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.oneTimeEarnings}
            </button>
            <button
              onClick={() => setEarningsTab('recurring')}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                earningsTab === 'recurring'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.recurringMonthly}
            </button>
            <button
              onClick={() => setEarningsTab('claims')}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                earningsTab === 'claims'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.claimCommissions}
            </button>
          </div>

          {/* Earnings Tab Content */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100">
            {Object.entries(earningsData).map(([key, data]) => {
              if (key !== earningsTab) return null;
              const Icon = data.icon;
              return (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${data.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl text-[#1A1A1A] mb-1">₦{data.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">{data.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recurring Income Highlight Box */}
      <div
        onClick={() => onNavigate('recurring')}
        className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 mb-6 text-white shadow-2xl cursor-pointer hover:shadow-3xl transition-all relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Repeat className="w-6 h-6" />
            <p className="text-lg font-medium">{t.recurringIncomeTitle}</p>
          </div>
          
          <div className="mb-4">
            <p className="text-4xl mb-2">₦43,500 🔥</p>
            <p className="text-sm opacity-90">₦500 × 87 {t.activeRecurring}</p>
          </div>

          <div className="bg-white/20 backdrop-blur-lg rounded-lg p-3 mb-4">
            <p className="text-sm">{t.recurringExplain}</p>
          </div>

          <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors flex items-center gap-2 group-hover:gap-3">
            {t.viewRecurringDetails}
            <TrendingUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Agent Tier Badge */}
      <div
        onClick={() => onNavigate('tier')}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-6 cursor-pointer hover:shadow-xl transition-all"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${tierData[currentTier as keyof typeof tierData].color} rounded-xl flex items-center justify-center shadow-lg`}>
              {currentTier === 'diamond' ? (
                <Crown className="w-6 h-6 text-white" />
              ) : currentTier === 'gold' ? (
                <Award className="w-6 h-6 text-white" />
              ) : (
                <Star className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <p className="text-xs text-gray-600">{t.currentTier}</p>
              <p className="text-xl text-[#1A1A1A]">{tierData[currentTier as keyof typeof tierData].name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">23 more users to Gold</p>
            <button className="text-xs text-[#00A878] font-medium hover:underline">
              {t.viewTierProgress} →
            </button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-500" style={{ width: '77%' }}></div>
        </div>
      </div>

      {/* Progress Ring & Quick Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Progress */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white">
          <h3 className="text-base text-[#1A1A1A] mb-4">{t.progressTitle}</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  stroke="#00BA00"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - progressPercentage / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl text-[#1A1A1A]">{progressPercentage}%</p>
                  <p className="text-xs text-gray-500">Complete</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xl text-[#1A1A1A] mb-1">23</p>
              <p className="text-xs text-gray-600 mb-3">{t.progressSubtitle}</p>
              <div className="flex items-center gap-2">
                <Target className="w-3 h-3 text-[#00BA00]" />
                <span className="text-xs text-[#00BA00]">Target: 100 users</span>
              </div>
            </div>
          </div>
        </div>

        {/* Streak Card */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-4 shadow-lg text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs opacity-90 mb-1">🔥 {t.streak}</p>
              <p className="text-3xl">12 days</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-lg px-2 py-1 text-xs">
              <span>🏅 {t.badge}</span>
            </div>
          </div>
          <div className="text-xs opacity-90">
            Keep logging in daily to maintain your streak bonus!
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-base text-[#1A1A1A] mb-3">{t.quickActions}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white hover:shadow-xl transition-all text-left group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-[#1A1A1A] mb-1">{t.onboardUser}</p>
            <p className="text-xs text-gray-600">Earn ₦200 commission</p>
          </button>

          <button className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white hover:shadow-xl transition-all text-left group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-[#1A1A1A] mb-1">{t.fileClaim}</p>
            <p className="text-xs text-gray-600">Help user get paid faster</p>
          </button>

          <button
            onClick={() => onNavigate('invite')}
            className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white hover:shadow-xl transition-all text-left group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-[#1A1A1A] mb-1">{t.inviteAgent}</p>
            <p className="text-xs text-gray-600">Earn ₦500 per referral</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base text-[#1A1A1A]">{t.recentActivity}</h3>
          <button
            onClick={() => onNavigate('users')}
            className="text-xs text-[#2196F3] hover:underline"
          >
            {t.viewAll}
          </button>
        </div>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00BA00] to-[#00C853] rounded-full flex items-center justify-center text-white text-sm shadow-lg">
                  {activity.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-[#1A1A1A]">{activity.name}</p>
                  <p className="text-xs text-gray-600">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-xs ${
                activity.commission.includes('Pending') 
                  ? 'bg-yellow-100 text-yellow-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {activity.commission}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}