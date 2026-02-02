"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ClaimAmLogo } from '../ClaimAmLogo';
import { ArrowLeft, Phone, Lock, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ForgotPasswordScreenProps {
  onComplete: () => void;
  onBack?: () => void;
}

export function ForgotPasswordScreen({ onComplete, onBack }: ForgotPasswordScreenProps) {
  const [step, setStep] = useState<'phone' | 'otp' | 'new-password' | 'success'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

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
      setStep('new-password');
    }, 1000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    // Validate passwords
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1000);
  };

  const handleSuccessComplete = () => {
    onComplete();
  };

  return (
    <div className="h-full bg-gradient-to-br from-white to-green-50 flex flex-col">
      {/* Header */}
      <div className="p-6">
        {(onBack && step === 'phone') && (
          <button onClick={onBack} className="mb-4 text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        {step === 'otp' && (
          <button onClick={() => setStep('phone')} className="mb-4 text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        {step === 'new-password' && (
          <button onClick={() => setStep('otp')} className="mb-4 text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        
        <div className="flex justify-center mb-6">
          <ClaimAmLogo size={80} withBackground={true} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8">
        {step === 'phone' && (
          <motion.form 
            onSubmit={handlePhoneSubmit} 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl text-gray-900 mb-2">Reset Password</h2>
              <p className="text-sm text-gray-600">
                Enter your phone number to receive a verification code
              </p>
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
                Enter your registered 11-digit Nigerian phone number
              </p>
            </div>

            <Button
              type="submit"
              disabled={phone.length !== 11 || loading}
              className="w-full h-12"
              style={{ backgroundColor: '#00A878' }}
            >
              {loading ? 'Sending Code...' : 'Send Verification Code'}
            </Button>
          </motion.form>
        )}

        {step === 'otp' && (
          <motion.form 
            onSubmit={handleOtpSubmit} 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl text-gray-900 mb-2">Enter Verification Code</h2>
              <p className="text-sm text-gray-600">
                We sent a 6-digit code to {phone}
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
              {loading ? 'Verifying...' : 'Verify Code'}
            </Button>

            <div className="text-center">
              <button type="button" className="text-sm text-[#00A878] font-medium">
                Resend Code
              </button>
            </div>
          </motion.form>
        )}

        {step === 'new-password' && (
          <motion.form 
            onSubmit={handlePasswordSubmit} 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl text-gray-900 mb-2">Create New Password</h2>
              <p className="text-sm text-gray-600">
                Choose a strong password for your account
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-10 h-12"
                  required
                  minLength={6}
                />
              </div>
              <p className="text-xs text-gray-500">
                Must be at least 6 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 h-12"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {passwordError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {passwordError}
              </div>
            )}

            <Button
              type="submit"
              disabled={!newPassword || !confirmPassword || loading}
              className="w-full h-12"
              style={{ backgroundColor: '#00A878' }}
            >
              {loading ? 'Updating Password...' : 'Reset Password'}
            </Button>
          </motion.form>
        )}

        {step === 'success' && (
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-[#00A878]" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl text-gray-900">Password Reset Successful!</h2>
              <p className="text-sm text-gray-600">
                Your password has been updated successfully
              </p>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSuccessComplete}
                className="w-full h-12"
                style={{ backgroundColor: '#00A878' }}
              >
                Continue to Sign In
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-xs text-gray-500">
          Need help? Contact ClaimAm support
        </p>
      </div>
    </div>
  );
}