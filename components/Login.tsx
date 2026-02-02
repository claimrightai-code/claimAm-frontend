"use client";
import { useState, useRef } from 'react';
import { Phone, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  language: 'english' | 'pidgin';
  onNavigateToPrivacy: () => void;
  onNavigateToTerms: () => void;
}

export function Login({ onLogin, language, onNavigateToPrivacy, onNavigateToTerms }: LoginProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 11) {
      setStep('otp');
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
    if (index === 5 && value && newOtp.every(digit => digit)) {
      setTimeout(onLogin, 500);
    }
  };

  const text = {
    english: {
      welcome: 'Welcome Back, Agent!',
      subtitle: 'Login to track your commissions',
      phone: 'Phone Number',
      phonePlaceholder: '080 1234 5678',
      continue: 'Continue',
      otpTitle: 'Enter OTP',
      otpSubtitle: `We sent a 6-digit code to ${phoneNumber}`,
      resend: 'Resend Code',
      verify: 'Verify & Login',
    },
    pidgin: {
      welcome: 'Welcome Back, Agent!',
      subtitle: 'Login make you see your money',
      phone: 'Phone Number',
      phonePlaceholder: '080 1234 5678',
      continue: 'Continue',
      otpTitle: 'Put the OTP',
      otpSubtitle: `We send 6-digit code to ${phoneNumber}`,
      resend: 'Send Code Again',
      verify: 'Verify & Login',
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
          {step === 'phone' ? (
            <>
              <h2 className="text-xl text-[#1A1A1A] mb-1">{t.welcome}</h2>
              <p className="text-sm text-gray-600 mb-6">{t.subtitle}</p>

              <form onSubmit={handlePhoneSubmit}>
                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2">{t.phone}</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
                      placeholder={t.phonePlaceholder}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#00BA00] focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={phoneNumber.length !== 11}
                  className="w-full bg-[#00BA00] hover:bg-[#00C853] text-white py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg text-sm"
                >
                  {t.continue}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Rural illustration */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 mb-3">Trusted by 4,821 agents across Nigeria</p>
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
                onClick={onLogin}
                disabled={!otp.every(digit => digit)}
                className="w-full bg-[#00BA00] hover:bg-[#00C853] text-white py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm"
              >
                {t.verify}
              </button>
            </>
          )}
        </div>

        {/* Legal Links */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 mb-2">By using ClaimAm, you agree to our</p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Privacy Policy clicked!');
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
                console.log('Terms of Service clicked!');
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