"use client";
import { TrendingUp, Users, Calendar, Phone, AlertCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface RecurringIncomeTrackerProps {
  language: 'english' | 'pidgin';
}

export function RecurringIncomeTracker({ language }: RecurringIncomeTrackerProps) {
  const [selectedMonth, setSelectedMonth] = useState('current');

  const text = {
    english: {
      title: 'Your Monthly Recurring Income',
      subtitle: 'Track your passive income stream',
      liveCounter: 'active users',
      thisMonth: 'this month',
      perUser: 'per user monthly',
      explanation: 'Every user you onboard who renews ₦2,250 subscription monthly → you collect ₦500 automatically!',
      reminder: 'Call your users to renew! Users with 6+ months active subscription unlock instant loan access — your ₦500 dey wait!',
      activeUsers: 'Active Users Contributing',
      monthlyTrend: 'Monthly Recurring Trend',
      renewalDate: 'Renewal Date',
      sendReminder: 'Send Reminder',
      reminderSent: 'Reminder Sent!',
    },
    pidgin: {
      title: 'Your Monthly Recurring Money',
      subtitle: 'See your steady money wey dey come every month',
      liveCounter: 'active people',
      thisMonth: 'this month',
      perUser: 'for each person every month',
      explanation: 'Every person wey you bring wey renew ₦2,250 subscription monthly → you collect ₦500 automatic!',
      reminder: 'Call your people make dem renew! People wey get 6 months and above active subscription fit collect instant loan — your ₦500 dey wait!',
      activeUsers: 'Active People Wey Dey Pay',
      monthlyTrend: 'Monthly Money Trend',
      renewalDate: 'When Dem Go Renew',
      sendReminder: 'Send Reminder',
      reminderSent: 'Reminder Don Send!',
    },
  };

  const t = text[language];

  const activeUsersCount = 87;
  const recurringAmount = 43500; // ₦500 × 87
  const perUserAmount = 500;

  const activeUsers = [
    { id: 1, name: 'Fatima Y***', phone: '***5678', renewalDate: 'Dec 18, 2024', monthsActive: 8, reminderSent: false },
    { id: 2, name: 'Aminu B***', phone: '***5432', renewalDate: 'Dec 20, 2024', monthsActive: 6, reminderSent: false },
    { id: 3, name: 'Bose A***', phone: '***1234', renewalDate: 'Dec 22, 2024', monthsActive: 12, reminderSent: false },
    { id: 4, name: 'Tunde O***', phone: '***9999', renewalDate: 'Dec 25, 2024', monthsActive: 4, reminderSent: true },
    { id: 5, name: 'Chioma N***', phone: '***4444', renewalDate: 'Dec 28, 2024', monthsActive: 9, reminderSent: false },
    { id: 6, name: 'Musa I***', phone: '***7777', renewalDate: 'Jan 2, 2025', monthsActive: 11, reminderSent: false },
    { id: 7, name: 'Ada U***', phone: '***2222', renewalDate: 'Jan 5, 2025', monthsActive: 7, reminderSent: false },
    { id: 8, name: 'Sani K***', phone: '***8888', renewalDate: 'Jan 8, 2025', monthsActive: 5, reminderSent: false },
  ];

  const monthlyData = [
    { month: 'Jun', amount: 28500, users: 57 },
    { month: 'Jul', amount: 32000, users: 64 },
    { month: 'Aug', amount: 35500, users: 71 },
    { month: 'Sep', amount: 38000, users: 76 },
    { month: 'Oct', amount: 40500, users: 81 },
    { month: 'Nov', amount: 42000, users: 84 },
    { month: 'Dec', amount: 43500, users: 87 },
  ];

  const maxAmount = Math.max(...monthlyData.map(d => d.amount));

  const handleSendReminder = (userId: number, phone: string, name: string) => {
    const message = `Hi ${name.split(' ')[0]}, your ClaimAm subscription dey expire soon. Renew now to keep your coverage active and unlock instant loan access! Dial *669# or visit claimam.ng 🚀`;
    const whatsappUrl = `https://wa.me/234${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    // window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="p-3 lg:p-6 pb-20 lg:pb-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl text-[#1A1A1A] mb-1">{t.title}</h1>
        <p className="text-sm text-gray-600">{t.subtitle}</p>
      </div>

      {/* Live Counter Card */}
      <div className="bg-gradient-to-br from-[#00A878] to-[#00C896] rounded-2xl p-6 lg:p-8 shadow-2xl mb-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm opacity-90">Live Update</span>
          </div>
          
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-4 mb-2">
              <Users className="w-8 h-8 opacity-80" />
              <p className="text-5xl lg:text-6xl">{activeUsersCount}</p>
            </div>
            <p className="text-lg opacity-90 mb-4">{t.liveCounter}</p>
            
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 mb-4">
              <p className="text-4xl lg:text-5xl mb-1">₦{recurringAmount.toLocaleString()}</p>
              <p className="text-sm opacity-90">{t.thisMonth} 🔥</p>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="opacity-90">₦{perUserAmount}</span>
              <span className="opacity-60">×</span>
              <span className="opacity-90">{activeUsersCount} users</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-sm">
            <p className="opacity-90">{t.explanation}</p>
          </div>
        </div>
      </div>

      {/* Reminder Banner */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-500 rounded-lg p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-gray-900">{t.reminder}</p>
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
        <h3 className="text-lg text-[#1A1A1A] mb-6">{t.monthlyTrend}</h3>
        <div className="space-y-4">
          {monthlyData.map((data, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-gray-600">{data.month}</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">{data.users} users</span>
                  <span className="text-[#00A878]">₦{data.amount.toLocaleString()}</span>
                </div>
              </div>
              <div className="h-10 bg-gray-100 rounded-lg overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-[#00A878] to-[#00C896] rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                  style={{ width: `${(data.amount / maxAmount) * 100}%` }}
                >
                  {index === monthlyData.length - 1 && (
                    <TrendingUp className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Users List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg text-[#1A1A1A] mb-4">{t.activeUsers}</h3>
        <div className="space-y-3">
          {activeUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {user.phone}
                    </span>
                    <span>•</span>
                    <span>{user.monthsActive} months</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">{t.renewalDate}</p>
                  <p className="text-sm text-gray-900 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {user.renewalDate}
                  </p>
                </div>
                
                {user.reminderSent ? (
                  <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    <RefreshCw className="w-3 h-3" />
                    {t.reminderSent}
                  </div>
                ) : (
                  <button
                    onClick={() => handleSendReminder(user.id, user.phone, user.name)}
                    className="flex items-center gap-2 bg-[#00A878] hover:bg-[#00C896] text-white text-xs px-3 py-2 rounded-lg transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    {t.sendReminder}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
