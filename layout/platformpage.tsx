"use client";
import { useState, useEffect } from "react";
import { Dashboard } from "../components/Dashboard";
import { Leaderboard } from "../components/Leaderboard";
import { UsersList } from "../components/UsersList";
import { Wallet } from "../components/Wallet";
import { TrainingAcademy } from "../components/TrainingAcademy";
import { MarketingKit } from "../components/MarketingKit";
import { InviteAgent } from "../components/InviteAgent";
import { SupportChat } from "../components/SupportChat";
import { PayoutHistory } from "../components/PayoutHistory";
import { RuralMode } from "../components/RuralMode";
import { Navigation } from "../components/Navigations";
import { MessageCircle, LayoutDashboard } from "lucide-react";
import { MobileApp } from "../components/MobileApp";
import { AdminDashboard } from "../components/AdminDashboard";
import { NAICOMDashboard } from "../components/NAICOMDashboard";
import { LandingPage } from "../components/website/LandingPage";
import { PrivacyPolicy } from "../components/PrivacyPolicy";
import { TermsOfService } from "../components/TermsOfService";
import { AgentLogin } from "../components/AgentLogin";
import { RecurringIncomeTracker } from "../components/agent/RecurringIncomeTracker";
import { AgentTierProgress } from "../components/agent/AgentTierProgress";
import ServiceProvider from "../components/ServiceProvider";
import { usePathname, useRouter } from "next/navigation";

type Screen =
  | "dashboard"
  | "leaderboard"
  | "users"
  | "wallet"
  | "training"
  | "marketing"
  | "invite"
  | "support"
  | "payout"
  | "rural"
  | "privacy"
  | "terms"
  | "recurring"
  | "tier";
type DashboardType =
  | "agent"
  | "mobile"
  | "admin"
  | "naicom"
  | "website"
  | "selector"
  | "privacy"
  | "terms"
  | "service-provider";

export default function Platform() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [language, setLanguage] = useState<"english" | "pidgin">("english");
  const [showConfetti, setShowConfetti] = useState(false);
  const [dashboardType, setDashboardType] = useState<DashboardType>("website");
  const [isAgentLoggedIn, setIsAgentLoggedIn] = useState(false);
 const router = useRouter();
  const handleNavigation = (screen: Screen) => {
    setCurrentScreen(screen);
  };
const navigate = () => {
  router.push("/agent");
  return;
};
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "english" ? "pidgin" : "english"));
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleAgentLogin = () => {
    setIsAgentLoggedIn(true);
  };

  const handleAgentLogout = () => {
    setIsAgentLoggedIn(false);
    setDashboardType("selector");
  };

  // Dashboard Selector Screen
  if (dashboardType === "selector") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        {/* Agent Registration Button - Top Right */}
        <div className="fixed top-6 right-6 z-50 text-center">
          <button
            onClick={
            navigate
          }
            className="bg-[#00BA00] hover:bg-[#00C853] text-white px-6 py-3 rounded-xl shadow-2xl transition-all hover:scale-105 text-sm"
          >
            <span className="block">🌟 Agent Registration</span>
          </button>
          <p className="text-xs text-gray-700 mt-2 px-2">
            Click to become a founding agent
          </p>
        </div>

        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#00BA00] rounded-2xl mb-4 shadow-2xl">
              <span className="text-4xl text-white">₦</span>
            </div>
            <h1 className="text-4xl text-[#1A1A1A] mb-2">ClaimAm Platform</h1>
            <p className="text-gray-600">Select a dashboard to view</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => setDashboardType("website")}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white hover:shadow-2xl transition-all text-left group hover:scale-105"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <LayoutDashboard className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl text-[#1A1A1A] mb-2">Website</h3>
              <p className="text-sm text-gray-600">
                Landing page & marketing site
              </p>
            </button>

            <button
              onClick={() => setDashboardType("mobile")}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white hover:shadow-2xl transition-all text-left group hover:scale-105"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl text-[#1A1A1A] mb-2">Mobile App</h3>
              <p className="text-sm text-gray-600">Customer claims flow</p>
            </button>

            <button
              onClick={() => setDashboardType("agent")}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white hover:shadow-2xl transition-all text-left group hover:scale-105"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#00BA00] to-[#00C853] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl">🏪</span>
              </div>
              <h3 className="text-xl text-[#1A1A1A] mb-2">Agent Dashboard</h3>
              <p className="text-sm text-gray-600">Field agents & USSD moat</p>
            </button>

            <button
              onClick={() => setDashboardType("admin")}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white hover:shadow-2xl transition-all text-left group hover:scale-105"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="text-xl text-[#1A1A1A] mb-2">Admin Dashboard</h3>
              <p className="text-sm text-gray-600">
                Claims review & AI pipeline
              </p>
            </button>

            <button
              onClick={() => setDashboardType("naicom")}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white hover:shadow-2xl transition-all text-left group hover:scale-105"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="text-xl text-[#1A1A1A] mb-2">NAICOM Portal</h3>
              <p className="text-sm text-gray-600">
                Regulator oversight dashboard
              </p>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-3">
              🇳🇬 Built for Nigeria&apos;s 106M underserved • Expanding to 1.4B+
              Africans
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDashboardType("privacy" as DashboardType)}
                className="text-xs text-[#2196F3] hover:underline"
              >
                Privacy Policy
              </button>
              <span className="text-xs text-gray-400">•</span>
              <button
                onClick={() => setDashboardType("terms" as DashboardType)}
                className="text-xs text-[#2196F3] hover:underline"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show selected dashboard
  if (dashboardType === "website") {
    return (
      <>
        <LandingPage
          onPrivacyClick={() => setDashboardType("privacy")}
          onTermsClick={() => setDashboardType("terms")}
          onServiceProviderClick={() => setDashboardType("service-provider")}
        />
        {/* <button
          onClick={() => setDashboardType("selector")}
          className="fixed top-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all z-50 text-sm"
        >
          ← Back to Dashboards
        </button> */}
      </>
    );
  }

  if (dashboardType === "mobile") {
    return (
      <>
        <MobileApp />
        <button
          onClick={() => setDashboardType("selector")}
          className="fixed top-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all z-50 text-sm"
        >
          ← Back to Dashboards
        </button>
      </>
    );
  }

  if (dashboardType === "admin") {
    return (
      <>
        <AdminDashboard />
        <button
          onClick={() => setDashboardType("selector")}
          className="fixed top-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all z-50 text-sm"
        >
          ← Back to Dashboards
        </button>
      </>
    );
  }

  if (dashboardType === "naicom") {
    return (
      <>
        <NAICOMDashboard />
        <button
          onClick={() => setDashboardType("selector")}
          className="fixed top-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all z-50 text-sm"
        >
          ← Back to Dashboards
        </button>
      </>
    );
  }

  if (dashboardType === "privacy") {
    return (
      <>
        <PrivacyPolicy onBack={() => setDashboardType("selector")} />
      </>
    );
  }

  if (dashboardType === "terms") {
    return (
      <>
        <TermsOfService onBack={() => setDashboardType("selector")} />
      </>
    );
  }

  if (dashboardType === "service-provider") {
    return (
      <>
        <ServiceProvider
          onBack={() => setDashboardType("website")}
        />
      </>
    );
  }


  // Agent Dashboard - Requires Login
  if (dashboardType === "agent") {
    if (!isAgentLoggedIn) {
      return (
        <AgentLogin
          onLogin={handleAgentLogin}
          onBack={() => setDashboardType("selector")}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {showConfetti && <Confetti />}

      {/* Dashboard Switcher Button */}
      <button
        onClick={() => setDashboardType("selector")}
        className="fixed top-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all z-50 text-sm flex items-center gap-2"
      >
        <LayoutDashboard className="w-4 h-4" />
        Switch Dashboard
      </button>

      <Navigation
        currentScreen={currentScreen}
        onNavigate={handleNavigation}
        language={language}
        onToggleLanguage={toggleLanguage}
      />

      <main className="lg:ml-64">
        {currentScreen === "dashboard" && (
          <Dashboard
            onNavigate={handleNavigation}
            language={language}
            onConfetti={triggerConfetti}
          />
        )}
        {currentScreen === "leaderboard" && <Leaderboard language={language} />}
        {currentScreen === "users" && <UsersList language={language} />}
        {currentScreen === "wallet" && (
          <Wallet language={language} onConfetti={triggerConfetti} />
        )}
        {currentScreen === "training" && (
          <TrainingAcademy language={language} />
        )}
        {currentScreen === "marketing" && <MarketingKit language={language} />}
        {currentScreen === "invite" && <InviteAgent language={language} />}
        {currentScreen === "support" && <SupportChat language={language} />}
        {currentScreen === "payout" && <PayoutHistory language={language} />}
        {currentScreen === "rural" && <RuralMode language={language} />}
        {currentScreen === "privacy" && (
          <PrivacyPolicy onBack={() => handleNavigation("dashboard")} />
        )}
        {currentScreen === "terms" && (
          <TermsOfService onBack={() => handleNavigation("dashboard")} />
        )}
        {currentScreen === "recurring" && (
          <RecurringIncomeTracker language={language} />
        )}
        {currentScreen === "tier" && <AgentTierProgress language={language} />}
      </main>

      {/* Floating WhatsApp Button */}
      <button className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg z-50 transition-transform hover:scale-110">
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-10px",
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: ["#00BA00", "#00C853", "#2196F3", "#FFD700"][
                Math.floor(Math.random() * 4)
              ],
            }}
          />
        </div>
      ))}
    </div>
  );
}
