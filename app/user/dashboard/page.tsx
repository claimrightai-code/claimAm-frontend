"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { WebDashboard } from "@/../../components/webapp/WebDashboard";
import { useUserContext } from "@/hooks/hooks";
import { Loader2 } from "lucide-react";
export default function DashboardPage() {
  const { user, logoutFunc } = useUserContext();
  const router = useRouter();

  // 1. Handle Logout
  const handleLogout = async () => {
    await logoutFunc();
    router.push("/auth/login");
  };
  const handleNavigation = (screen: string) => {
    switch (screen) {
      case "profile":
        router.push("/user/profile");
        break;
      case "file-claim":
        router.push("/user/file-claim");
        break;
      case "claims-list":
        router.push("/user/claims");
        break;
      default:
        router.push("/user/dashboard");
    }
  };
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-green-600 w-10 h-10" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <WebDashboard 
        onNavigate={handleNavigation} 
        onLogout={handleLogout} 
      />
    </div>
  );
}