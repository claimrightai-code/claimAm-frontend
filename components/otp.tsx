"use client";
import { useState } from "react";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { useUserContext } from "@/hooks/hooks"; // Import your hook
import { useToast } from "./ui/use-toast"; // Assuming you have toast
import { useParams } from "next/navigation";
interface LoginProps {
  onLogin: () => void;
  language: "english" | "pidgin";
  onNavigateToPrivacy: () => void;
  onNavigateToTerms: () => void;
}

export function Otppage({
  onLogin,
  language,
  onNavigateToPrivacy,
  onNavigateToTerms,
}: LoginProps) {
  const { otpFunc } = useUserContext(); // Get the verification function
  const { toast } = useToast();
  const params = useParams();
  const email = params?.email || "";
  const [step, setStep] = useState<"email" | "otp">("email");
//   const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  // 1. Handle Email Submission (Request OTP)
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // TODO: If you have a "Send OTP" endpoint (like resend-otp), call it here.
      // For now, we assume the OTP was sent or we proceed to verification step.
      // await resendOtpFunc(email);

      setStep("otp");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle OTP Verification
  const verifyOtp = async (currentOtpArray: string[]) => {
    const otpString = currentOtpArray.join("");
    if (otpString.length !== 6) return;

    setLoading(true);
    try {
      // Call your existing API function
      const res = await otpFunc({
        email: email,
        otp: otpString,
      });

      if (res.ok) {
        onLogin(); // Navigate to dashboard
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-submit when all filled
    if (index === 5 && value && newOtp.every((digit) => digit)) {
      verifyOtp(newOtp);
    }
  };

  const text = {
    english: {
      welcome: "Welcome Back, Agent!",
      subtitle: "Login to track your commissions",
      emailLabel: "Email Address",
      emailPlaceholder: "agent@example.com",
      continue: "Continue",
      otpTitle: "Enter OTP",
      otpSubtitle: `We sent a 6-digit code to ${email}`,
      resend: "Resend Code",
      verify: "Verify & Login",
    },
    pidgin: {
      welcome: "Welcome Back, Agent!",
      subtitle: "Login make you see your money",
      emailLabel: "Email Address",
      emailPlaceholder: "agent@example.com",
      continue: "Continue",
      otpTitle: "Put the OTP",
      otpSubtitle: `We don send code enter ${email}`,
      resend: "Send Code Again",
      verify: "Verify & Login",
    },
  };

  const t = text[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00BA00] rounded-xl mb-3 shadow-lg">
            <span className="text-2xl text-white">₦</span>
          </div>
          <h1 className="text-3xl text-[#1A1A1A] mb-1">ClaimAm</h1>
          <p className="text-sm text-gray-600">Agent Dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white">
          {step === "email" ? (
            <>
              <h2 className="text-xl text-[#1A1A1A] mb-1">{t.welcome}</h2>
              <p className="text-sm text-gray-600 mb-6">{t.subtitle}</p>

              <form onSubmit={handleEmailSubmit}>
                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2">
                    {t.emailLabel}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      value={email}
                    //   onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#00BA00] focus:outline-none transition-colors text-sm"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!email || loading}
                  className="w-full bg-[#00BA00] hover:bg-[#00C853] text-white py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg text-sm"
                >
                  {loading ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    <>
                      {t.continue}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Rural illustration */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 mb-3">
                  Trusted by 4,821 agents across Nigeria
                </p>
                <div className="flex justify-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-lg">
                    🏪
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                    🏍️
                  </div>
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-lg">
                    🌾
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl text-[#1A1A1A] mb-1">{t.otpTitle}</h2>
              <p className="text-sm text-gray-600 mb-6">{t.otpSubtitle}</p>

              <div className="flex gap-2 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-full aspect-square text-center text-xl rounded-lg border-2 border-gray-200 focus:border-[#00BA00] focus:outline-none transition-colors"
                    maxLength={1}
                  />
                ))}
              </div>

              <button className="text-[#2196F3] text-xs mb-4 hover:underline">
                {t.resend}
              </button>

              <button
                onClick={() => verifyOtp(otp)}
                disabled={!otp.every((digit) => digit) || loading}
                className="w-full bg-[#00BA00] hover:bg-[#00C853] text-white py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  t.verify
                )}
              </button>
            </>
          )}
        </div>

        {/* Legal Links */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 mb-2">
            By using ClaimAm, you agree to our
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onNavigateToPrivacy();
              }}
              className="text-xs text-[#2196F3] hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-xs text-gray-400">•</span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onNavigateToTerms();
              }}
              className="text-xs text-[#2196F3] hover:underline cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
