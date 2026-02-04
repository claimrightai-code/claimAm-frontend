"use client";
import { useState, useEffect } from "react";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { useUserContext } from "@/hooks/hooks";
import { useToast } from "@/../../components/ui/use-toast";
import { useSearchParams, useRouter } from "next/navigation";

interface LoginProps {
  onLogin: () => void;
  language: "english" | "pidgin";
  onNavigateToPrivacy: () => void;
  onNavigateToTerms: () => void;
}

export default function Otppage({
  onLogin,
  onNavigateToPrivacy,
  onNavigateToTerms,
}: LoginProps) {
  // 1. Get resendOtpFunc from context
  const { otpFunc, resendOtpFunc } = useUserContext();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramEmail = searchParams.get("email") ?? "";

  const [step, setStep] = useState<"email" | "otp">("email");
  // 2. Initialize email state with param, but allow editing
  const [email, setEmail] = useState(paramEmail);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false); // Separate loading state for resend text

  // Prevent multiple OTP sends: track whether an OTP has already been requested
  const [hasRequestedOtp, setHasRequestedOtp] = useState(false);
  // Cooldown (in seconds) to prevent immediate resends after a send
  const [resendCooldown, setResendCooldown] = useState(0);

  // Manage a countdown timer for the resend cooldown
  useEffect(() => {
    let timer: any = null;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((c) => (c > 0 ? c - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendCooldown]);

  // 3. Handle Initial Email Submission (Request OTP)
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If we've already requested an OTP for this session, don't request another one
    if (hasRequestedOtp) {
      toast({
        title: "OTP Already Sent",
        description:
          "A code has already been sent to this email. Check your inbox.",
      });
      setStep("otp");
      return;
    }

    if (!email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Immediately mark that we've requested an OTP to prevent double requests
    setHasRequestedOtp(true);
    // Start a short cooldown to prevent immediate resends (e.g., 60s)
    setResendCooldown(60);

    try {
      // Call the API to send the initial OTP
      // console.log(email);
      const res = await resendOtpFunc({ email });
      console.log(res);

      if (res.ok) {
        toast({
          title: "OTP Sent",
          description: "Check your inbox for the code.",
        });
        setStep("otp");
      } else {
        // Reset the request flag and cooldown so user can try again
        setHasRequestedOtp(false);
        setResendCooldown(0);
      }
    } catch (error) {
      console.error(error);
      setHasRequestedOtp(false);
      setResendCooldown(0);
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle "Resend Code" Click
  const handleResendClick = async () => {
    if (resending) return;

    // Prevent resends during cooldown
    if (resendCooldown > 0) {
      toast({
        title: "Please Wait",
        description: `You can request a new code in ${resendCooldown} seconds.`,
        variant: "destructive",
      });
      return;
    }

    setResending(true);
    // start cooldown immediately to prevent rapid repeated clicks
    setResendCooldown(60);

    try {
      console.log(email);
      const res = await resendOtpFunc({ email });
      if (res.ok) {
        // Ensure we mark that an OTP was requested
        setHasRequestedOtp(true);
        toast({
          title: "Code Resent",
          description: "A new code has been sent to your email.",
        });
      } else {
        // failed - allow retry by clearing cooldown
        setResendCooldown(0);
      }
    } catch (error) {
      console.error(error);
      setResendCooldown(0);
    } finally {
      setResending(false);
    }
  };

  // 5. Handle Verification
  const verifyOtp = async (currentOtpArray: string[]) => {
    const otpString = currentOtpArray.join("");
    if (otpString.length !== 6) return;

    setLoading(true);
    try {
      const res = await otpFunc({
        email: email,
        otp: otpString,
      });

      if (res.ok) {
        toast({
          title: "Verified",
          description: "Account verification successful.",
        });
        // onLogin();
        // router.push('/agent');
        router.push(`/agent?action=login&email=${encodeURIComponent(email)}`);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00BA00] rounded-xl mb-3 shadow-lg">
            <span className="text-2xl text-white">₦</span>
          </div>
          <h1 className="text-3xl text-[#1A1A1A] mb-1">ClaimAm</h1>
          <p className="text-sm text-gray-600">OTP verification</p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white">
          {step === "email" ? (
            <>
              <p className="text-sm text-gray-600 mb-6">Verify OTP</p>

              <form onSubmit={handleEmailSubmit}>
                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      value={email}
                      // Uncommented this so user can type if param is empty
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="agent@example.com"
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
                      Continue
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
              <h2 className="text-xl text-[#1A1A1A] mb-1">Enter OTP</h2>
              <p className="text-sm text-gray-600 mb-6">
                Enter the 6-digit code sent to {email}
              </p>

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

              {/* Resend Button Logic */}
              <button
                onClick={handleResendClick}
                disabled={resending || resendCooldown > 0}
                className="text-[#2196F3] text-xs mb-4 hover:underline disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {resending
                  ? "Sending..."
                  : resendCooldown > 0
                    ? `Resend Code (${resendCooldown}s)`
                    : "Resend Code"}
              </button>

              <button
                onClick={() => verifyOtp(otp)}
                disabled={!otp.every((digit) => digit) || loading}
                className="w-full bg-[#00BA00] hover:bg-[#00C853] text-white py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <p>Verify</p>
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
