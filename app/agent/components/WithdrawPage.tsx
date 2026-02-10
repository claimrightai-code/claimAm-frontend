"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Building,
  AlertCircle,
  Banknote,
  Loader2,
} from "lucide-react";
import { useToast } from "@/../../components/ui/use-toast";
import { useWithdraw } from "@/hooks/useWithdrawal";
import { useQueryClient } from "@tanstack/react-query"; // To refresh balance

interface WithdrawPageProps {
  balance: number;
  onBack: () => void;
}

export function WithdrawPage({ balance, onBack }: WithdrawPageProps) {
  const queryClient = useQueryClient();
  const { banks, resolveAccount, withdraw } = useWithdraw();
  const { toast } = useToast();

  const [txnDetails, setTxnDetails] = useState<{
    ref: string;
    status: string;
  } | null>(null);

  const [accountNumber, setAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [amount, setAmount] = useState("");

  const [accountName, setAccountName] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // AUTO-VERIFY ACCOUNT NAME
  useEffect(() => {
    const verify = async () => {
      if (accountNumber.length === 10 && bankCode) {
        setVerifying(true);
        try {
          const name = await resolveAccount(accountNumber, bankCode);
          setAccountName(name);
        } catch (error) {
          setAccountName("");
        } finally {
          setVerifying(false);
        }
      } else {
        setAccountName("");
      }
    };

    const timer = setTimeout(verify, 600); // Debounce
    return () => clearTimeout(timer);
  }, [accountNumber, bankCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = Number(amount);

    if (withdrawAmount < 200) {
      toast({ variant: "destructive", title: "Minimum withdrawal is ₦200" });
      return;
    }

    if (withdrawAmount > balance) {
      toast({ variant: "destructive", title: "Insufficient balance" });
      return;
    }

    setLoading(true);
    try {
      const res = await withdraw({
        amount: withdrawAmount,
        account_number: accountNumber,
        bank_code: bankCode,
        account_name: accountName,
      });

      // BACKEND RESPONSE MAPPING:
      // res.reference: "WDR-XXXX"
      // res.data.paystack_status: "success" or "pending"
      setTxnDetails({
        ref: res.reference,
        status: res.data?.paystack_status || "pending",
      });

      // REFRESH BALANCE: This updates the ₦ amount on the main dashboard instantly
      queryClient.invalidateQueries({ queryKey: ["agent-stats"] });
      queryClient.invalidateQueries({ queryKey: ["wallet-history"] });

      setWithdrawSuccess(true);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Withdrawal Rejected",
        description:
          error.response?.data?.detail ||
          "Please verify your details and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS VIEW
  if (withdrawSuccess) {
    const isPending =
      txnDetails?.status !== "reviewed" && txnDetails?.status !== "success"; // Treat "reviewed" as success for display purposes

    return (
      <section className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full animate-in zoom-in duration-300">
          <div className="bg-white rounded-[2rem] p-8 text-center shadow-xl border border-slate-100 relative overflow-hidden">
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
                ? "Your transfer has been queued. Bank confirmation usually takes a few minutes."
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
                ₦{Number(amount).toLocaleString()}
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t border-slate-200 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Bank</span>
                  <span className="font-medium text-slate-900">{bankName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Account Name</span>
                  <span className="font-medium text-slate-900 truncate max-w-[150px]">
                    {accountName}
                  </span>
                </div>
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

  // FORM VIEW
  return (
    <section className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 group"
          >
            <div className="p-1.5 rounded-full bg-white border border-slate-200 group-hover:border-slate-300">
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
                Balance:
              </span>
              <span className="text-lg font-bold text-[#00C853]">
                ₦{balance.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="block text-slate-700 text-sm font-medium">
                Destination Bank
              </label>
              <select
                required
                value={bankCode}
                onChange={(e) => {
                  setBankCode(e.target.value);
                  const b = banks.find((x: any) => x.code === e.target.value);
                  if (b) setBankName(b.name);
                }}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#00C853] outline-none text-sm appearance-none"
              >
                <option value="">Select Bank</option>
                {banks.map((bank: any) => (
                  <option key={bank.code} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>

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
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#00C853] outline-none text-sm font-mono"
                placeholder="0123456789"
              />

              {verifying && (
                <p className="text-xs text-blue-500 flex items-center gap-1 mt-2">
                  <Loader2 className="animate-spin w-3 h-3" /> Verifying name...
                </p>
              )}
              {accountName && !verifying && (
                <div className="p-3 bg-green-50 text-green-700 font-bold rounded-xl text-center text-sm border border-green-100 flex items-center justify-center gap-2 mt-2">
                  <CheckCircle2 size={16} /> {accountName}
                </div>
              )}
            </div>

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
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#00C853] outline-none text-lg font-bold"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
              <div className="text-xs text-blue-700 space-y-1">
                <p>• Withdrawals are processed via Paystack instantly.</p>
                <p>
                  • Funds usually arrive in your bank account in 5-30 minutes.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !accountName}
              className="w-full bg-[#00C853] hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Banknote size={18} /> Withdraw Funds
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
