"use client";

import React, { useState, useEffect, Suspense } from "react";
// import { useRouter } from "next/navigation";
import { Hero } from "./components/Hero";
import CountdownSection from "./components/CountdownSection";
import { CTAButtons } from "./components/CTAButtons";
import { TrustSection } from "./components/TrustSection";
import { AgentTeaser } from "./components/AgentTeaser";
import { Leaderboard } from "./components/Leaderboard";
// import { FoundingMemberForm } from "./components/FoundingMemberForm";
import { AgentRegistrationForm } from "./components/AgentRegistrationForm";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { DigitalAgentID } from "./components/DigitalAgentID";
import { ReferralDashboard } from "./components/ReferralDashboard";
import { WalletHome } from "./components/WalletHome";
import { InviteEarn } from "./components/InviteEarn";
import { WithdrawPage } from "./components/WithdrawPage";
import { WalletHistory } from "./components/WalletHistory";
import { ConfettiAlert } from "./components/ConfettiAlert";
import { Loader2, LogIn, LogOut } from "lucide-react";
import { AgentLoginForm } from "./components/AgentLoginModal";
import { useUserContext } from "@/hooks/hooks";
import dynamic from "next/dynamic";
const SearchParamsHandler = React.lazy(
  () => import("./components/AgentSearchParams"),
);
const AgentRegistrationForm = dynamic(
  () =>
    import("./components/AgentRegistrationForm").then(
      (mod) => mod.AgentRegistrationForm,
    ),
  { ssr: false },
);

import {
  useAgentStats,
  useReferralNotification,
} from "@/hooks/useAgentDashboard";

interface AgentData {
  fullName: string;
  agentId: string;
  referralCode: string;
  state: string;
  city: string;
  walletBalance: number;
  totalReferrals: number;
  leaderboardRank?: number;
}

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
}

type Page = "landing" | "agent-dashboard" | "invite" | "withdraw" | "history";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [showAgentID, setShowAgentID] = useState(false);
  // const [agentData, setAgentData] = useState<AgentData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [newReferralName, setNewReferralName] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const { user, logoutFunc } = useUserContext();
  // 2. Fetch Data Directly
  // const { data: stats, isLoading } = useAgentStats();

  const { data: stats, isLoading: statsLoading } = useAgentStats();

  const [celebrationData, setCelebrationData] = useState<{
    name: string;
    amount: number;
  } | null>(null);

  // 3. Safe Fallback
  const balance = stats?.wallet_balance || 0;
  const total_referrals = stats?.total_referrals || 0;
  // console.log(stats)
  console.log(balance, total_referrals);
  const { data: notification } = useReferralNotification();
  //  console.log(stats, notification);
  // 3. WATCH FOR NEW NOTIFICATIONS
  useEffect(() => {
    if (notification && notification.has_new) {
      setCelebrationData({
        name: notification.referee_name,
        amount: notification.amount,
      });
      setShowConfetti(true);
    }
  }, [notification]);

  // Search params handling moved to the client-only `AgentSearchParams` component.
  // That handler will call `setShowLoginModal(true)` and set `initialEmail` when needed.


  // 3. DERIVED STATE: This object rebuilds itself every time 'stats' or 'user' changes
  const agentData: AgentData | null = user
    ? {
        fullName: user?.full_name || "Agent",
        agentId: `CLA-${String(user.id).padStart(5, "0")}`,
        referralCode: user.agent_profile?.referral_code || "PENDING",
        state: user.agent_profile?.state || "N/A",
        city: user.agent_profile?.lga || "N/A",

        walletBalance: Number(stats?.wallet_balance || 0),

        totalReferrals: stats?.total_referrals || 0,
      }
    : null;

  const handlePaymentComplete = (apiData: any) => {
    setShowAgentID(true);
    setShowLoginModal(true);
  };

  const handleLoginComplete = (apiUser: any) => {
    console.log("Logged in user data:", apiUser);

    // setAgentData(Data);
    
    // console.log(Data)
    setShowLoginModal(false); // Close modal
    setCurrentPage("agent-dashboard"); // Go to dashboard
  };

  // 2. Create the Logout Handler
  const handleLogout = () => {
    logoutFunc(); 
    // setCurrentPage("landing");
    // setAgentData(null); 
  };

  const handleCloseAgentID = () => {
    setShowAgentID(false);
    setCurrentPage("agent-dashboard");
  };

  const handleNavigate = (page: "invite" | "withdraw" | "history") => {
    setCurrentPage(page);
  };

  // Landing page view
  if (currentPage === "landing") {
    const scrollToAgentForm = () => {
      const agentFormSection = document.getElementById(
        "agent-registration-form",
      );
      if (agentFormSection) {
        agentFormSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute top-6 right-6 z-30">
          <button
            onClick={() => setShowLoginModal(true)}
            className="flex items-center gap-2 bg-[#00BA00] hover:bg-[#00C853] backdrop-blur-md text-white px-5 py-2.5 rounded-full border border-white/20 transition-all font-medium text-sm"
          >
            <LogIn size={16} />
            Agent Login
          </button>
        </div>

        {/* --- NEW: Login Modal --- */}
        <Suspense fallback={null}>
          <SearchParamsHandler
            onOpenLogin={(email?: string) => {
              setInitialEmail(email || "");
              setShowLoginModal(true);
            }}
          />
        </Suspense>
        {showLoginModal && (
          <AgentLoginForm
            onClose={() => setShowLoginModal(false)}
            initialEmail={initialEmail || ""}
            onLoginSuccess={handleLoginComplete}
          />
        )}
        <Hero />
        <CountdownSection />
        <CTAButtons />
        <TrustSection />
        <AgentTeaser onClick={scrollToAgentForm} />
        <Leaderboard />
        {/* <FoundingMemberForm /> */}

        {/* Pass the updated handler */}
        <AgentRegistrationForm onPaymentComplete={handlePaymentComplete} />

        <Footer />
        <WhatsAppButton />

        {agentData && (
          <div className="fixed bottom-4 right-4 z-40">
            <button
              onClick={() => setCurrentPage("agent-dashboard")}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg border border-green-400 transition-all hover:scale-105 text-sm"
            >
              continue to Dashboard
            </button>
          </div>
        )}

        {showAgentID && agentData && (
          <DigitalAgentID agentData={agentData} onClose={handleCloseAgentID} />
        )}

        {showConfetti && (
          <ConfettiAlert
            amount={600}
            referrerName={newReferralName}
            onClose={() => setShowConfetti(false)}
            onViewWallet={() => setCurrentPage("agent-dashboard")}
          />
        )}
      </div>
    );
  }

  // Agent Dashboard pages
  if (!agentData) {
    setCurrentPage("landing");
    return null;
  }
  if (statsLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {currentPage === "agent-dashboard" && (
        <>
          <ReferralDashboard
            referralCode={agentData.referralCode}
            totalReferrals={agentData.totalReferrals}
            moneyEarned={agentData.totalReferrals * 600}
            fullName={agentData.fullName}
          />
          <WalletHome
            // transactions={transactions}
            onNavigate={handleNavigate}
          />

          {/* Navigation button back to landing */}
          <div className="py-6 px-4">
            <div className="max-w-2xl mx-auto">
              <button
                // onClick={() => setCurrentPage("landing")}
                onClick={handleLogout}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl transition-colors"
              >
              Log out
              </button>
            </div>
            
          </div>
        </>
      )}

      {currentPage === "invite" && (
        <InviteEarn
          referralCode={agentData.referralCode}
          totalReferrals={agentData.totalReferrals}
          moneyEarned={agentData.totalReferrals * 600}
          onBack={() => setCurrentPage("agent-dashboard")}
        />
      )}

      {currentPage === "withdraw" && (
        <WithdrawPage
          balance={agentData.walletBalance}
          onBack={() => setCurrentPage("agent-dashboard")}
          // onWithdraw={handleWithdraw}
        />
      )}

      {currentPage === "history" && (
        <WalletHistory
          // transactions={transactions}
          onBack={() => setCurrentPage("agent-dashboard")}
        />
      )}

      {showConfetti && (
        <ConfettiAlert
          // Use data from API, fallback to defaults if manual trigger
          amount={celebrationData?.amount || 600}
          referrerName={
            celebrationData?.name || newReferralName || "A new Agent"
          }
          onClose={() => {
            setShowConfetti(false);
            setCelebrationData(null);
          }}
          onViewWallet={() => setCurrentPage("agent-dashboard")}
        />
      )}

    </div>
  );
}
