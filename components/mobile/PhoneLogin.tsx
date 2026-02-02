"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ClaimAmLogo } from '../ClaimAmLogo';
import { ArrowLeft, Phone } from 'lucide-react';

interface PhoneLoginProps {
  onComplete: () => void;
  onBack?: () => void;
  onSwitchToSignup?: () => void;
  onForgotPassword?: () => void;
}

export function PhoneLogin({ onComplete, onBack, onSwitchToSignup, onForgotPassword }: PhoneLoginProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 1000);
  };

  return (
    <div className="h-full bg-gradient-to-br from-white to-green-50 flex flex-col">
      {/* Header */}
      <div className="p-6">
        {onBack && step === 'phone' && (
          <button onClick={onBack} className="mb-4 text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        {step === 'otp' && (
          <button onClick={() => setStep('phone')} className="mb-4 text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        
        <div className="flex justify-center mb-6">
          <ClaimAmLogo size={120} withBackground={true} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8">
        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Enter your phone number to continue</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0903 124 5541"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 h-12"
                  required
                  pattern="[0-9]{11}"
                />
              </div>
              <p className="text-xs text-gray-500">
                Enter your 11-digit Nigerian phone number
              </p>
            </div>

            <Button
              type="submit"
              disabled={phone.length !== 11 || loading}
              className="w-full h-12"
              style={{ backgroundColor: '#00A878' }}
            >
              {loading ? 'Sending OTP...' : 'Continue'}
            </Button>

            <div className="text-center space-y-3">
              <button 
                type="button" 
                onClick={onForgotPassword}
                className="text-sm text-[#00A878] font-medium"
              >
                Forgot Password?
              </button>
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button 
                  type="button" 
                  onClick={onSwitchToSignup}
                  className="text-[#00A878] font-medium"
                >
                  Sign Up
                </button>
              </p>
              <p className="text-sm text-gray-600">
                Don't have a smartphone?{' '}
                <button type="button" className="text-[#00A878] font-medium">
                  Dial *669#
                </button>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl text-gray-900 mb-2">Enter OTP</h2>
              <p className="text-gray-600">
                We sent a code to {phone}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp">6-Digit Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="text-center text-2xl tracking-widest h-14"
                required
                pattern="[0-9]{6}"
                maxLength={6}
              />
            </div>

            <Button
              type="submit"
              disabled={otp.length !== 6 || loading}
              className="w-full h-12"
              style={{ backgroundColor: '#00A878' }}
            >
              {loading ? 'Verifying...' : 'Verify & Login'}
            </Button>

            <div className="text-center">
              <button type="button" className="text-sm text-[#00A878] font-medium">
                Resend OTP
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-xs text-gray-500">
          By continuing, you agree to ClaimAm's Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}