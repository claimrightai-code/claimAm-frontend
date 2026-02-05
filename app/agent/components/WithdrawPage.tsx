"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Building,
  AlertCircle,
  Banknote,
  Loader2, // Import spinner
} from "lucide-react";
// import { withdrawFromWallet } from "@/context/UserContext"; // Import the hook
import { useToast } from "@/../../components/ui/use-toast";
import {useWithdraw  } from "@/hooks/useWithdrawal";

interface WithdrawPageProps {
  balance: number;
  onBack: () => void;
  onWithdraw?: any; // Marked optional as we handle it internally now
}

export function WithdrawPage({ balance, onBack }: WithdrawPageProps) {
  // 1. USE HOOKS
  const { banks, resolveAccount, withdraw } = useWithdraw();
  const { toast } = useToast();
  const [txnDetails, setTxnDetails] = useState<{
    ref: string;
    status: string;
  } | null>(null);

  const [accountNumber, setAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState(""); // Store Code, not just Name
  const [bankName, setBankName] = useState(""); // For display
  const [amount, setAmount] = useState("");

  const [accountName, setAccountName] = useState(""); // Resolved Name
  const [verifying, setVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // 2. AUTO-VERIFY ACCOUNT
  useEffect(() => {
    const verify = async () => {
      if (accountNumber.length === 10 && bankCode) {
        setVerifying(true);
        try {
          const name = await resolveAccount(accountNumber, bankCode);
          console.log(name)
          console.log(bankCode);
          setAccountName(name);
          toast({ title: "Account Verified", description: name });
        } catch (error) {
          setAccountName("");
          toast({ variant: "destructive", title: "Invalid Account Details" });
        } finally {
          setVerifying(false);
        }
      } else {
        setAccountName("");
      }
    };

    const timer = setTimeout(verify, 500);
    return () => clearTimeout(timer);
  }, [accountNumber, bankCode]);

  // 3. HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseInt(amount);

    if (withdrawAmount < 200) {
      toast({ variant: "destructive", title: "Minimum withdrawal is ₦200" });
      return;
    }

    if (withdrawAmount > balance) {
      toast({ variant: "destructive", title: "Insufficient balance" });
      return;
    }

    if (!accountName) {
      toast({ variant: "destructive", title: "Please verify account first" });
      return;
    }

    setLoading(true);
    try {
      const res = await withdraw({
        amount: parseInt(amount),
        account_number: accountNumber,
        bank_code: bankCode,
        account_name: accountName,
      });

      // 2. SUCCESS LOGIC
      setTxnDetails({
        ref: res.reference,
        status: res.status, // e.g. "pending" or "success"
      });
      setWithdrawSuccess(true);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Withdrawal Failed",
        description: error.response?.data?.detail || "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
if (withdrawSuccess) {
  const isPending = txnDetails?.status !== "success";

  return (
    <section className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full animate-in zoom-in duration-300">
        <div className="bg-white rounded-[2rem] p-8 text-center shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
          {/* Top Decorative Bar - Changes color based on status */}
          <div
            className={`absolute top-0 left-0 w-full h-2 ${isPending ? "bg-orange-500" : "bg-[#00C853]"}`}
          ></div>

          <div
            className={`w-20 h-20 ${isPending ? "bg-orange-50" : "bg-green-50"} rounded-full flex items-center justify-center mx-auto mb-6`}
          >
            {isPending ? (
              <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            ) : (
              <CheckCircle2 className="w-10 h-10 text-[#00C853]" />
            )}
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            {isPending ? "Transfer Processing" : "Withdrawal Successful!"}
          </h3>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            {isPending
              ? "Paystack is communicating with your bank. Funds usually arrive in minutes."
              : "Your funds have been sent successfully to your bank account."}
          </p>

          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Amount Sent
              </p>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isPending ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}
              >
                {txnDetails?.status?.toUpperCase() || "PENDING"}
              </span>
            </div>

            <div className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              ₦{parseInt(amount).toLocaleString()}
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-slate-200">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Bank</span>
                <span className="font-medium text-slate-900">{bankName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Account</span>
                <span className="font-medium text-slate-900">
                  {accountName}
                </span>
              </div>
              {/* Added Reference ID for Support */}
              <div className="flex justify-between text-[10px] pt-2 border-t border-dashed">
                <span className="text-slate-400 uppercase font-bold">
                  Reference
                </span>
                <span className="font-mono text-slate-500">
                  {txnDetails?.ref}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onBack}
            className={`w-full ${isPending ? "bg-slate-800" : "bg-[#00C853]"} hover:opacity-90 text-white font-bold py-4 rounded-xl transition-all shadow-lg`}
          >
            Back to Wallet
          </button>
        </div>
      </div>
    </section>
  );
}

  return (
    <section className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 group"
          >
            <div className="p-1.5 rounded-full bg-white border border-slate-200 group-hover:border-slate-300 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Back to Wallet</span>
          </button>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Withdraw Funds
            </h2>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Available Balance
              </span>
              <span className="text-lg font-bold text-[#00C853]">
                ₦{balance.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Bank Selection (Dynamic from API) */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 text-sm font-medium">
                Destination Bank
              </label>
              <div className="relative">
                <select
                  required
                  value={bankCode}
                  onChange={(e) => {
                    setBankCode(e.target.value);
                    // Find name for display
                    const b = banks.find((x) => x.code === e.target.value);
                    if (b) setBankName(b.name);
                  }}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#00C853] transition-all appearance-none text-sm"
                >
                  <option value="">Select Bank</option>
                  {banks.map((bank) => (
                    <option key={bank.code} value={bank.code}>
                      {bank.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Building size={16} />
                </div>
              </div>
            </div>

            {/* Account Number */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 text-sm font-medium">
                Account Number
              </label>
              <input
                type="text"
                required
                value={accountNumber}
                onChange={(e) =>
                  setAccountNumber(
                    e.target.value.replace(/\D/g, "").slice(0, 10),
                  )
                }
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#00C853] transition-all placeholder:text-slate-400 text-sm font-mono"
                placeholder="0123456789"
                maxLength={10}
              />

              {verifying && (
                <p className="text-xs text-blue-500 flex items-center gap-1">
                  <Loader2 className="animate-spin w-3 h-3" /> Verifying name...
                </p>
              )}
              {accountName && !verifying && (
                <div className="p-3 bg-green-50 text-green-700 font-bold rounded-xl text-center text-sm border border-green-100 flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} /> {accountName} 
                </div>
              )}
            </div>

            {/* Amount Input */}
            <div className="space-y-3 pt-2">
              <label className="block text-slate-700 text-sm font-medium">
                Amount to Withdraw
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                  ₦
                </div>
                <input
                  type="text"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                  className="w-full pl-8 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#00C853] transition-all placeholder:text-slate-400 text-lg font-bold"
                  placeholder="0.00"
                />
              </div>

              {/* Quick Amount Chips */}
              <div className="flex flex-wrap gap-2">
                {[1000, 5000, 10000].map((quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200 transition-colors"
                  >
                    ₦{quickAmount.toLocaleString()}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setAmount(balance.toString())}
                  className="px-3 py-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 text-xs font-medium border border-green-200 transition-colors"
                >
                  Max
                </button>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
              <div className="text-xs text-blue-700 space-y-1">
                <p>• Withdrawals are processed instantly (5-30 mins).</p>
                <p>• Zero transaction fees for founding agents.</p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !accountName}
              className="w-full bg-[#00C853] hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Banknote size={18} />
                  Withdraw Funds
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
