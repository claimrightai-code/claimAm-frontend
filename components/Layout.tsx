"use client"; 
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  Wallet, 
  GraduationCap, 
  Megaphone, 
  UserPlus, 
  MessageCircle, 
  History,
  Menu,
  X,
  Globe,
  LogOut,
  Signal
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  language: 'en' | 'pidgin';
  setLanguage: (lang: 'en' | 'pidgin') => void;
  isRuralMode: boolean;
  setIsRuralMode: (mode: boolean) => void;
  onLogout: () => void;
  walletBalance: number;
}

export default function Layout({ 
  children, 
  language, 
  setLanguage, 
  isRuralMode, 
  setIsRuralMode,
  onLogout,
  walletBalance 
}: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const translations = {
    en: {
      dashboard: 'Dashboard',
      leaderboard: 'Leaderboards',
      myUsers: 'My Users',
      wallet: 'Wallet',
      training: 'Training',
      marketing: 'Marketing Kit',
      invite: 'Invite Agent',
      support: 'Support',
      payoutHistory: 'Payout History',
      ruralMode: 'Rural Mode',
      logout: 'Logout'
    },
    pidgin: {
      dashboard: 'Home',
      leaderboard: 'Who Dey Lead',
      myUsers: 'My People',
      wallet: 'My Money',
      training: 'Learn Work',
      marketing: 'Sales Tools',
      invite: 'Bring Agent',
      support: 'Get Help',
      payoutHistory: 'Money History',
      ruralMode: 'Simple Mode',
      logout: 'Comot'
    }
  };

  const t = translations[language];

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: t.dashboard },
    { path: '/leaderboard', icon: Trophy, label: t.leaderboard },
    { path: '/my-users', icon: Users, label: t.myUsers },
    { path: '/wallet', icon: Wallet, label: t.wallet },
    { path: '/training', icon: GraduationCap, label: t.training },
    { path: '/marketing', icon: Megaphone, label: t.marketing },
    { path: '/invite', icon: UserPlus, label: t.invite },
    { path: '/support', icon: MessageCircle, label: t.support },
    { path: '/payout-history', icon: History, label: t.payoutHistory },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-[#1A1A1A] text-white fixed h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-[#00BA00] flex items-center justify-center">
              <span className="text-white text-xl">C</span>
            </div>
            <div>
              <h1 className="text-xl">ClaimAm</h1>
              <p className="text-xs text-gray-400">Agent Dashboard</p>
            </div>
          </div>

          {/* Wallet Balance */}
          <div className="bg-gradient-to-r from-[#00BA00] to-[#00C853] rounded-xl p-4 mb-6">
            <p className="text-xs opacity-90 mb-1">Wallet Balance</p>
            <p className="text-2xl">₦{walletBalance.toLocaleString()}</p>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-[#00BA00] text-white' : 'text-gray-300 hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto p-6 border-t border-gray-800">
          <Link
            to="/rural-mode"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors mb-2"
          >
            <Signal size={20} />
            <span>{t.ruralMode}</span>
          </Link>
          
          <button
            onClick={() => setLanguage(language === 'en' ? 'pidgin' : 'en')}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors w-full mb-2"
          >
            <Globe size={20} />
            <span>{language === 'en' ? 'Switch to Pidgin' : 'Switch to English'}</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-gray-800 transition-colors w-full"
          >
            <LogOut size={20} />
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#1A1A1A] text-white z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00BA00] flex items-center justify-center">
              <span className="text-white">C</span>
            </div>
            <div>
              <h1 className="text-lg">ClaimAm</h1>
              <p className="text-xs text-gray-400">Agent</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Wallet Balance Bar */}
        <div className="bg-gradient-to-r from-[#00BA00] to-[#00C853] px-4 py-2">
          <p className="text-xs opacity-90">Wallet: ₦{walletBalance.toLocaleString()}</p>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#1A1A1A] text-white z-40 pt-24 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-[#00BA00] text-white' : 'text-gray-300 hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <Link
              to="/rural-mode"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Signal size={20} />
              <span>{t.ruralMode}</span>
            </Link>

            <button
              onClick={() => {
                setLanguage(language === 'en' ? 'pidgin' : 'en');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors w-full"
            >
              <Globe size={20} />
              <span>{language === 'en' ? 'Switch to Pidgin' : 'Switch to English'}</span>
            </button>

            <button
              onClick={() => {
                onLogout();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-gray-800 transition-colors w-full"
            >
              <LogOut size={20} />
              <span>{t.logout}</span>
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-24 lg:pt-0">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
