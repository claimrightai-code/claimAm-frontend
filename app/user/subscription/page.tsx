"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { WebSubscription } from "@/../../components/webapp/WebSubscription";
import { useUserContext } from "@/hooks/hooks";
import { Loader2 } from "lucide-react";

export default function SubscriptionPage() {
  const router = useRouter();
  const { user, loading } = useUserContext();

  // 1. AUTH GUARD: Only allow logged-in users here
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
    
    // Optional: If user already has an active policy/subscription, 
    // skip this page and go straight to dashboard
    if (user?.has_active_subscription) {
       router.push("/user/dashboard");
    }
  }, [user, loading, router]);

  // 2. SUCCESS HANDLER
  const handleSubscriptionComplete = () => {
    // Navigate to the main user dashboard
    router.push("/user/dashboard");
  };

  // 3. BRANDED GLOBAL LOADER
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="relative">
          <div className="w-16 h-16 bg-[#00A878] rounded-2xl animate-pulse shadow-lg flex items-center justify-center text-white font-bold text-2xl">
            ₦
          </div>
          <Loader2 className="absolute -bottom-10 left-5 animate-spin text-[#00A878]" />
        </div>
        <p className="mt-12 text-slate-400 font-medium animate-pulse">
          Preparing your insurance plans...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WebSubscription
        // When they pay or pick a plan
        onComplete={handleSubscriptionComplete}
        // Go back to signup or dashboard depending on logic
        onBack={() => router.back()}
      />
    </div>
  );
}