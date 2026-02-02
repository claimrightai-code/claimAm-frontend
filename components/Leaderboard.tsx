"use client";

import { Crown, TrendingUp, MapPin, Trophy, Award, Star, Filter, Loader2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useLeaderboard } from '@/hooks/useAgentDashboard';

interface LeaderboardProps {
  language: 'english' | 'pidgin';
}

export function Leaderboard({ language }: LeaderboardProps) {
  const [tab, setTab] = useState<'national' | 'state'>('national');
  const [tierFilter, setTierFilter] = useState<'all' | 'silver' | 'gold' | 'diamond'>('all');
  
  // 1. Fetch Real Data from Hook
  const { data: rawData, isLoading } = useLeaderboard();

  const text = {
    english: {
      title: 'Agent Leaderboard',
      subtitle: 'Compete with agents nationwide',
      national: 'National Rankings',
      state: 'Regional Top 10',
      prizePool: '₦1,000,000 Prize Pool',
      prizeSubtitle: 'Top 3 agents win monthly',
      rank: 'Rank',
      agent: 'Agent',
      users: 'Referrals',
      earnings: 'Est. Rewards',
      youHere: 'You are here',
      first: '1st: ₦500,000',
      second: '2nd: ₦300,000',
      third: '3rd: ₦200,000',
      allAgents: 'All Agents',
      myTierOnly: 'My Tier Only',
      filterByTier: 'Filter by Tier',
      loading: 'Loading rankings...'
    },
    pidgin: {
      title: 'Agent Ranking',
      subtitle: 'Compete with agents for all Nigeria',
      national: 'All Nigeria',
      state: 'Lagos Top 10',
      prizePool: '₦1,000,000 Prize Pool',
      prizeSubtitle: 'Top 3 agents go collect money every month',
      rank: 'Rank',
      agent: 'Agent',
      users: 'People',
      earnings: 'Money',
      youHere: 'Na here you dey',
      first: '1st: ₦500,000',
      second: '2nd: ₦300,000',
      third: '3rd: ₦200,000',
      allAgents: 'All Agents',
      myTierOnly: 'My Tier Only',
      filterByTier: 'Sort by Level',
      loading: 'Wait make we check rankings...'
    },
  };

  const t = text[language];

  // Logic to determine badge/emoji based on rank
  const getRankBadge = (rank: number) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  const getTier = (users: number, earnings: number): 'silver' | 'gold' | 'diamond' => {
    if (users >= 50 || earnings >= 30000) return 'diamond';
    if (users >= 10 || earnings >= 6000) return 'gold';
    return 'silver';
  };

  // 2. MAP BACKEND DATA TO UI STRUCTURE
  const mappedLeaderboard = useMemo(() => {
    // Determine where the array is
    const listToMap = Array.isArray(rawData) ? rawData : rawData?.data || [];

    return listToMap.map((item: any) => {
      const users = item.total_referrals;
      const earnings = users * 600; 
      
      return {
        rank: item.rank,
        name: item.agent_name,
        location: 'Nigeria', 
        users: users,
        earnings: earnings,
        badge: getRankBadge(item.rank),
        tier: getTier(users, earnings)
      };
    });
  }, [rawData]);

  // Apply tier filter
  const filteredLeaderboard = useMemo(() => {
    return tierFilter === 'all' 
      ? mappedLeaderboard 
      : mappedLeaderboard.filter((agent: { tier: string; }) => agent.tier === tierFilter);
  }, [mappedLeaderboard, tierFilter]);

  // 3. LOADING STATE
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-[#00BA00] animate-spin mb-4" />
        <p className="text-gray-500 font-medium">{t.loading}</p>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Prize Pool Banner */}
      <div className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-2xl p-6 mb-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="flex items-center justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-8 h-8 text-white" />
              <h2 className="text-2xl font-bold text-white">{t.prizePool}</h2>
            </div>
            <p className="text-white/90 mb-4 font-medium">{t.prizeSubtitle}</p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg px-4 py-2 text-white text-xs font-bold uppercase tracking-wider">
                {t.first}
              </div>
              <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg px-4 py-2 text-white text-xs font-bold uppercase tracking-wider">
                {t.second}
              </div>
            </div>
          </div>
          <div className="hidden lg:block text-8xl">🏆</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('national')}
          className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${
            tab === 'national' ? 'bg-[#00BA00] text-white shadow-lg shadow-green-200' : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          {t.national}
        </button>
        <button
          onClick={() => setTab('state')}
          className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${
            tab === 'state' ? 'bg-[#00BA00] text-white shadow-lg shadow-green-200' : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          {t.state}
        </button>
      </div>

      {/* Podium (Top 3) */}
      {filteredLeaderboard.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8 items-end">
          {/* 2nd Place */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center h-fit pt-8">
            <div className="text-3xl mb-2">🥈</div>
            <p className="text-[#1A1A1A] font-bold text-xs truncate">{filteredLeaderboard[1].name}</p>
            <p className="text-lg font-black text-[#00BA00]">₦{filteredLeaderboard[1].earnings.toLocaleString()}</p>
          </div>

          {/* 1st Place */}
          <div className="bg-white rounded-2xl p-4 shadow-xl border-t-4 border-[#00BA00] text-center pb-8 pt-6 scale-110 md:scale-100">
            <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-[#1A1A1A] font-bold text-sm md:text-base mb-1">{filteredLeaderboard[0].name}</p>
            <p className="text-2xl font-black text-[#00BA00]">₦{filteredLeaderboard[0].earnings.toLocaleString()}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Champion</p>
          </div>

          {/* 3rd Place */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center h-fit pt-8">
            <div className="text-3xl mb-2">🥉</div>
            <p className="text-[#1A1A1A] font-bold text-xs truncate">{filteredLeaderboard[2].name}</p>
            <p className="text-lg font-black text-[#00BA00]">₦{filteredLeaderboard[2].earnings.toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* Full Table */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.rank}</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.agent}</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.users}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLeaderboard.map((agent, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <span className="font-bold text-slate-900">{agent.badge || `#${agent.rank}`}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center font-bold text-[#00BA00] text-sm">
                        {agent.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{agent.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{agent.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-bold text-slate-700 text-sm">
                    {agent.users}
                  </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}