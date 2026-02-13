"use client";

import React, { useEffect, useState } from "react";
import { WebLogin } from "@/../../components/webapp/WebLogin";
import { WebSignup } from "@/../../components/webapp/WebSignup";
import { WebDashboard } from "@/../../components/webapp/WebDashboard";
import { WebFileClaimFlow } from "@/../../components/webapp/WebFileClaimFlow";
import { WebClaimsList } from "@/../../components/webapp/WebClaimsList";
import { WebClaimDetails } from "@/../../components/webapp/WebClaimDetails";
import { WebProfile } from "@/../../components/webapp/WebProfile";
import { WebSubscription } from "@/../../components/webapp/WebSubscription";
import { useUserContext } from "@/hooks/hooks";

export type WebScreen =
  | "login"
  | "signup"
  | "forgot-password"
  | "dashboard"
  | "file-claim"
  | "claims-list"
  | "claim-details"
  | "profile"
  | "subscription"
  | "documents";

export interface ClaimData {
  id?: string;
  insuranceType?: string;
  policyHolder?: string;
  policyNumber?: string;
  incidentDate?: string;
  claimAmount?: string;
  description?: string;
  status?: string;
  documents?: any[];
  type?: string;
  amount?: string;
  date?: string;
  progress?: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<WebScreen>("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<ClaimData | null>(null);
  const { user, logoutFunc } = useUserContext();
  console.log(user);

  const handleLogin = () => {
    // setIsAuthenticated(true);
    setCurrentScreen("dashboard");
  };

  const handleSignup = () => {
    setCurrentScreen("subscription");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    logoutFunc();
    setCurrentScreen("login");
  };

  // Render authentication screens
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        {currentScreen === "login" && (
          <WebLogin
            onLogin={handleLogin}
            onSignup={() => setCurrentScreen("signup")}
            onForgotPassword={() => setCurrentScreen("forgot-password")}
          />
        )}

        {currentScreen === "signup" && (
          <WebSignup
            onSignup={handleSignup}
            onLogin={() => setCurrentScreen("login")}
          />
        )}

        {currentScreen === "subscription" && (
          <WebSubscription
            onComplete={handleLogin}
            onBack={() => setCurrentScreen("signup")}
          />
        )}
      </div>
    );
  }

  // Render main application screens
  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === "dashboard" && (
        <WebDashboard onNavigate={setCurrentScreen} onLogout={handleLogout} />
      )}

      {currentScreen === "file-claim" && (
        <WebFileClaimFlow
          onComplete={() => setCurrentScreen("claims-list")}
          onCancel={() => setCurrentScreen("dashboard")}
        />
      )}

      {currentScreen === "claims-list" && (
        <WebClaimsList
          onNavigate={setCurrentScreen}
          onSelectClaim={(claim) => {
            setSelectedClaim(claim);
            setCurrentScreen("claim-details");
          }}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === "claim-details" && (
        <WebClaimDetails
          onNavigate={setCurrentScreen}
          onLogout={handleLogout}
          claim={selectedClaim}
        />
      )}

      {currentScreen === "profile" && (
        <WebProfile onNavigate={setCurrentScreen} onLogout={handleLogout} />
      )}
    </div>
  );
}
