import React, { useState } from "react";
import { Trophy, Crown, X, Medal, MapPin, Users } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  state: string;
  referrals: number;
  prize: number;
}

const mockLeaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Chukwudi O.",
    state: "Lagos",
    referrals: 189,
    prize: 300000,
  },
  { rank: 2, name: "Fatima A.", state: "Kano", referrals: 156, prize: 150000 },
  { rank: 3, name: "Ibrahim K.", state: "FCT", referrals: 134, prize: 100000 },
  {
    rank: 4,
    name: "Blessing N.",
    state: "Rivers",
    referrals: 128,
    prize: 50000,
  },
  { rank: 5, name: "Adebayo M.", state: "Oyo", referrals: 119, prize: 50000 },
  { rank: 6, name: "Amina S.", state: "Kaduna", referrals: 112, prize: 30000 },
  { rank: 7, name: "Chidi U.", state: "Enugu", referrals: 105, prize: 30000 },
  { rank: 8, name: "Ngozi P.", state: "Anambra", referrals: 98, prize: 30000 },
  { rank: 9, name: "Yusuf M.", state: "Katsina", referrals: 92, prize: 30000 },
  { rank: 10, name: "Chioma E.", state: "Imo", referrals: 87, prize: 30000 },
  { rank: 11, name: "Tunde L.", state: "Lagos", referrals: 81, prize: 10000 },
  { rank: 12, name: "Aisha B.", state: "Borno", referrals: 76, prize: 10000 },
  { rank: 13, name: "Emeka O.", state: "Abia", referrals: 72, prize: 10000 },
  { rank: 14, name: "Folake A.", state: "Ekiti", referrals: 68, prize: 10000 },
  { rank: 15, name: "Usman D.", state: "Sokoto", referrals: 64, prize: 10000 },
];

export function Leaderboard() {
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(false);

  const prizeBreakdown = [
    {
      position: "1st",
      prize: "₦300k",
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
    {
      position: "2nd",
      prize: "₦150k",
      color: "bg-slate-100 text-slate-600 border-slate-200",
    },
    {
      position: "3rd",
      prize: "₦100k",
      color: "bg-orange-100 text-orange-700 border-orange-200",
    },
    {
      position: "4-5th",
      prize: "₦50k",
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
  ];

  // Helper for rank icons
  const getRankIcon = (rank: number) => {
    if (rank === 1)
      return <Crown size={16} className="text-yellow-500 fill-yellow-500" />;
    if (rank === 2)
      return <Medal size={16} className="text-slate-400 fill-slate-200" />;
    if (rank === 3)
      return <Medal size={16} className="text-orange-400 fill-orange-200" />;
    return (
      <span className="text-slate-500 font-medium text-xs w-4 text-center">
        {rank}
      </span>
    );
  };

  return (
    <>
      <section className="py-12 px-4 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#00C853]/10 text-[#00C853] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Trophy size={14} />
              Founding Agents Challenge
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Leaderboard
            </h2>
           

           
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Agent Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                      State
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Referrals
                    </th>
                   
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {mockLeaderboardData.slice(0, 10).map((entry) => (
                    <tr
                      key={entry.rank}
                      className={`hover:bg-slate-50/80 transition-colors ${entry.rank <= 3 ? "bg-slate-50/30" : ""}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getRankIcon(entry.rank)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-sm font-medium ${entry.rank <= 3 ? "text-slate-900" : "text-slate-600"}`}
                        >
                          {entry.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <MapPin size={12} />
                          <span className="text-sm">{entry.state}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Users size={12} className="text-slate-400" />
                          <span className="text-sm font-bold text-slate-700">
                            {entry.referrals}
                          </span>
                        </div>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* View Full Button */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => setShowFullLeaderboard(true)}
                className="w-full bg-white hover:bg-slate-50 text-slate-600 font-medium py-3 rounded-xl border border-slate-200 transition-colors text-sm shadow-sm"
              >
                View Full Top 100 Leaderboard
              </button>
            </div>
          </div>

          <div className="text-center mt-4 text-xs text-slate-400">
            Leaderboard closes 28 February 2026. Rankings update daily.
          </div>
        </div>
      </section>

      {/* Full Leaderboard Modal */}
      {showFullLeaderboard && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] shadow-2xl flex flex-col animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="bg-green-50 p-2 rounded-lg">
                  <Trophy size={20} className="text-[#00C853]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Top 100 Agents
                  </h3>
                  <p className="text-xs text-slate-500">Real-time ranking</p>
                </div>
              </div>
              <button
                onClick={() => setShowFullLeaderboard(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-0">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0 shadow-sm z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                      State
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">
                      Prize
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {mockLeaderboardData.map((entry) => (
                    <tr key={entry.rank} className="hover:bg-slate-50">
                      <td className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getRankIcon(entry.rank)}
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm text-slate-700">
                        {entry.name}
                      </td>
                      <td className="px-6 py-3 text-sm text-slate-500">
                        {entry.state}
                      </td>
                      <td className="px-6 py-3 text-sm font-bold text-[#00C853] text-right">
                        ₦{entry.prize.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-slate-100 text-center text-xs text-slate-400 bg-slate-50 rounded-b-2xl">
              Keep referring to climb the ranks!
            </div>
          </div>
        </div>
      )}
    </>
  );
}
