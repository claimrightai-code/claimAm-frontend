"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { WebSignup } from "@/../../components/webapp/WebSignup";
import { useUserContext } from "@/hooks/hooks";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { user, loading } = useUserContext();

  // 1. AUTH GUARD: If user is already logged in and verified, don't let them sign up again
  useEffect(() => {
    if (!loading && user && user.isVerified) {
      // Redirect based on role
      const isAgent = user.roles?.some((r: any) => r.name === "agent");
      router.push(isAgent ? "/agent" : "/user/dashboard");
    }
  }, [user, loading, router]);

  // 2. SUCCESS HANDLER: What happens after the OTP is verified?
  const handleSignupComplete = (res: any) => {
    if (res?.redirectUrl) {
      // res.redirectUrl comes from your otpVerifyFunc logic
      router.push(res.redirectUrl);
    } else {
      // Fallback to subscription for regular users
      router.push("user/subscription");
    }
  };

 
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
          Setting up your secure profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WebSignup
        // onSignup is called when they finish the WHOLE flow (including OTP)
        onSignup={handleSignupComplete}
        // Redirect to login if they already have an account
        onLogin={() => router.push("/auth/login")}
      />
    </div>
  );
}
