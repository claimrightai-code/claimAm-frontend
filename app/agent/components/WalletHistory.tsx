"use client";

import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  ArrowDownLeft,
  ArrowUpRight,
  History,
  Loader2,
} from "lucide-react";
import { useWalletHistory } from "@/hooks/useAgentDashboard";

interface Transaction {
  id: number;
  type: "credit" | "debit";
  amount: string | number; // Handling string "1500.0" from API
  description: string;
  status?: string;
  date: string;
}

interface WalletHistoryProps {
  onBack: () => void;
}

export function WalletHistory({ onBack }: WalletHistoryProps) {
  const { data: transactions, isLoading } = useWalletHistory();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
      </div>
    );
  }

  /**
   * FIX 1: Convert Object { 0: {}, ok: true } to Array []
   * We extract only the values that are numeric keys
   */
  const txList: Transaction[] = transactions
    ? Object.keys(transactions)
        .filter((key) => !isNaN(Number(key))) // Ignore the "ok" key
        .map((key) => (transactions as any)[key])
    : [];

  // FIX 2: Calculate Totals (Ensuring we convert string amounts to numbers)
  const totalCredits = txList
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalDebits = txList
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* FIX 3: Back Button visibility (Changed text-gray-400 to text-slate-600) */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors mb-6 group"
        >
          <div className="p-2 rounded-full bg-white shadow-sm border border-slate-200 group-hover:border-blue-200">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold">Back to Wallet</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Transaction History
          </h2>
          <p className="text-slate-500 text-sm">
            View your recent earnings and withdrawals
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white border border-green-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-green-100 rounded-lg text-green-600">
                <TrendingUp size={14} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Total In
              </span>
            </div>
            <div className="text-xl font-bold text-slate-900">
              ₦{totalCredits.toLocaleString()}
            </div>
          </div>

          <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                <TrendingDown size={14} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Total Out
              </span>
            </div>
            <div className="text-xl font-bold text-slate-900">
              ₦{totalDebits.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Transactions List Container */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50">
            <h3 className="font-bold text-slate-800">Recent Activity</h3>
          </div>

          <div className="max-h-[500px] overflow-y-auto">
            {txList.length === 0 ? (
              <div className="py-20 text-center">
                <History className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 text-sm">
                  No transactions found yet
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {txList.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-5 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                            transaction.type === "credit"
                              ? "bg-green-50 border-green-100 text-[#00C853]"
                              : "bg-blue-50 border-blue-100 text-blue-600"
                          }`}
                        >
                          {transaction.type === "credit" ? (
                            <ArrowDownLeft className="w-5 h-5" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5" />
                          )}
                        </div>

                        <div>
                          <div className="text-slate-900 font-bold text-sm mb-0.5">
                            {transaction.description}
                          </div>
                          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                            {new Date(transaction.date).toLocaleDateString(
                              "en-NG",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}{" "}
                            •{" "}
                            {new Date(transaction.date).toLocaleTimeString(
                              "en-NG",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`text-sm font-black ${
                          transaction.type === "credit"
                            ? "text-[#00C853]"
                            : "text-slate-700"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}₦
                        {Number(transaction.amount).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
