"use client";
import { useState } from 'react';
import { LayoutDashboard, Trophy, Users, Wallet, GraduationCap, Megaphone, UserPlus, MessageCircle, Clock, Smartphone, Menu, X, Globe } from 'lucide-react';

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: any) => void;
  language: 'english' | 'pidgin';
  onToggleLanguage: () => void;
}

export function Navigation({ currentScreen, onNavigate, language, onToggleLanguage }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const text = {
    english: {
      dashboard: 'Dashboard',
      leaderboard: 'Leaderboard',
      users: 'My Users',
      wallet: 'Wallet',
      training: 'Training',
      marketing: 'Marketing Kit',
      invite: 'Invite Agent',
      support: 'Support',
      payout: 'Payout History',
      rural: 'Rural Mode',
    },
    pidgin: {
      dashboard: 'Dashboard',
      leaderboard: 'Ranking',
      users: 'My People',
      wallet: 'Wallet',
      training: 'Learn Work',
      marketing: 'Marketing Tins',
      invite: 'Bring Agent',
      support: 'Help',
      payout: 'Money Wey I Collect',
      rural: 'Village Mode',
    },
  };

  const t = text[language];

  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'leaderboard', label: t.leaderboard, icon: Trophy },
    { id: 'users', label: t.users, icon: Users },
    { id: 'wallet', label: t.wallet, icon: Wallet },
    { id: 'training', label: t.training, icon: GraduationCap },
    { id: 'marketing', label: t.marketing, icon: Megaphone },
    { id: 'invite', label: t.invite, icon: UserPlus },
    { id: 'support', label: t.support, icon: MessageCircle },
    { id: 'payout', label: t.payout, icon: Clock },
    { id: 'rural', label: t.rural, icon: Smartphone },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#00BA00] rounded-xl flex items-center justify-center">
            <span className="text-xl text-white">₦</span>
          </div>
          <span className="text-xl text-[#1A1A1A]">ClaimAm</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleLanguage}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Globe className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-30 mt-16" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-white w-64 h-full pt-4 pb-20" onClick={(e) => e.stopPropagation()}>
            <nav className="space-y-1 px-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      currentScreen === item.id
                        ? 'bg-[#00BA00] text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 z-40">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#00BA00] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl text-white">₦</span>
            </div>
            <div>
              <h1 className="text-xl text-[#1A1A1A]">ClaimAm</h1>
              <p className="text-xs text-gray-500">Agent Portal</p>
            </div>
          </div>

          <button
            onClick={onToggleLanguage}
            className="w-full mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Globe className="w-4 h-4" />
            {language === 'english' ? 'Switch to Pidgin' : 'Switch to English'}
          </button>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    currentScreen === item.id
                      ? 'bg-[#00BA00] text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile spacing */}
      <div className="lg:hidden h-16" />
    </>
  );
}
