"use client";
import { useQuery } from "@tanstack/react-query";

import { useUserContext } from "@/hooks/hooks";
import {getCookie} from "cookies-next";
import api from "@/api";


// 1. Hook for Live Stats (Polled)
export function useAgentStats() {
       
  
  const { user, getAgentDashboardStats} = useUserContext();
  return useQuery({
    queryKey: ["agent-stats", user?.id],
    queryFn: async () => {
      const res = await getAgentDashboardStats();
      // console.log(res)
      if (!res.ok) throw new Error("Failed");
      // if (!res.data) {
      //   return {
      //     wallet_balance: 0,
      //     total_referrals: 0,
      //     active_referrals: 0,
      //     pending_referrals: 0,
      //   };
      // }
      return res;
    },
    enabled: !!user,
    refetchInterval: 100000, // Update every 30 seconds
  });
}

// 2. Hook for Transactions
export function useWalletHistory() {
      
  
  const { user , getWalletHistory} = useUserContext();
  return useQuery({
    queryKey: ["wallet-history", user?.id],
    queryFn: async () => {
      const res = await getWalletHistory();
      // console.log(res)
      if (!res.ok) throw new Error("Failed");
      return res;
    },
    enabled: !!user,
  });
}

// 3. Hook for Referrals List
export function useReferralList() {
       const cookies = getCookie("token");
  
  const { user} = useUserContext();
  return useQuery({
    queryKey: ["referral-list", user?.id],
    queryFn:  async () => {
      const res = await api.get("/dashboard/referrals",  {
      headers: { Authorization: `Bearer ${cookies}` },
    });
      return res.data
    },
    enabled: !!user,
  });
}


export function useReferralNotification() {
       const cookies = getCookie("token");
  const { user } = useUserContext();

  return useQuery({
    queryKey: ["referral-notification", user?.id],
    queryFn: async () => {
      const res = await api.get("/agents/notifications/new-referral",  {
      headers: { Authorization: `Bearer ${cookies}` },
    });
      return res.data;
    },
    // Only run if user is logged in
    enabled: !!user,
    // Check every 10 seconds (adjust based on server load preference)
    refetchInterval: 10000,
  });
}


export function useLeaderboard(){

   const {getLeaderboardApi } = useUserContext();
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await getLeaderboardApi();
      if (res && res.data){
        return res.data;
      }
      if (Array.isArray(res)){
        return res;
      }
      return [];
    },
    refetchInterval: 6000
  })
}