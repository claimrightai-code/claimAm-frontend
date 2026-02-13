"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import the Router
import { WebLogin } from "@/../../components/webapp/WebLogin";
import { useUserContext } from "@/hooks/hooks";
import { Loader2 } from "lucide-react";
export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useUserContext(); // Ensure your context has a loading state
  const [currentScreen, setCurrentScreen] = useState<string>("login");

  // 1. AUTO-REDIRECT IF ALREADY LOGGED IN
  // If the middleware didn't catch them, this client-side check ensures 
  // logged-in users don't see the login form.
  useEffect(() => {
    if (!loading && user) {
      const isAgent = user.roles?.some((r: any) => r.name === "agent");
      if (isAgent) {
        router.push("/agent");
      } else {
        // router.push("/user/dashboard");
        router.push("/user/subscription"); //testing payment flow
      }
    }
  }, [user, loading, router]);

  // 2. Handle successful login
  // This 'res' comes from your loginFunc return { ok: true, redirectUrl: ... }
  const handleLoginSuccess = (res: any) => {
    if (res?.redirectUrl) {
      router.push(res.redirectUrl);
    } else {
      // Fallback
    //   router.push("/user/dashboard");
            router.push("/user/subscription"); //testing payment flow

    }
  };

  // 3. Prevent "Flicker" (Show loading while checking cookies)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-[#00A878] w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === "login" && (
        <WebLogin
          // We pass the response-handler to the component
          onLogin={handleLoginSuccess}
          onSignup={() => router.push("/auth/signup")}
          onForgotPassword={() => setCurrentScreen("forgot-password")}
        />
      )}

      {currentScreen === "forgot-password" && (
        <div className="flex flex-col items-center justify-center pt-20">
            <h2 className="text-2xl font-bold">Forgot Password</h2>
            <p className="text-gray-500 mb-4">Implementation coming soon...</p>
            <button 
                onClick={() => setCurrentScreen("login")}
                className="text-[#00A878] font-bold"
            >
                Back to Login
            </button>
        </div>
      )}
    </div>
  );
}