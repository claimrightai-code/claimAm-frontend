"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ClaimAmLogo } from '../ClaimAmLogo';
import { ArrowLeft, Phone, User, Mail, Calendar, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface SignupScreenProps {
  onComplete: () => void;
  onBack?: () => void;
  onSwitchToLogin?: () => void;
}

export function SignupScreen({ onComplete, onBack, onSwitchToLogin }: SignupScreenProps) {
  const [step, setStep] = useState<'details' | 'phone' | 'otp'>('details');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    state: '',
    phone: '',
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('phone');
  };

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

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
    'Yobe', 'Zamfara'
  ];

  return (
    <div className="h-full bg-gradient-to-br from-white to-green-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6">
        {(onBack && step === 'details') && (
          <button onClick={onBack} className="mb-4 text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        {step === 'phone' && (
          <button onClick={() => setStep('details')} className="mb-4 text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        {step === 'otp' && (
          <button onClick={() => setStep('phone')} className="mb-4 text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        
        <div className="flex justify-center mb-6">
          <ClaimAmLogo size={80} withBackground={true} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 overflow-y-auto pb-6">
        {step === 'details' && (
          <motion.form 
            onSubmit={handleDetailsSubmit} 
            className="space-y-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl text-gray-900 mb-2">Create Account</h2>
              <p className="text-sm text-gray-600">Join ClaimAm today</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Chidinma Okafor"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="chidinma@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="pl-10 h-12"
                  required
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State of Residence</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full pl-10 h-12 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00A878] focus:border-transparent"
                  required
                >
                  <option value="">Select State</option>
                  {nigerianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 mt-6"
              style={{ backgroundColor: '#00A878' }}
            >
              Continue
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button 
                  type="button" 
                  onClick={onSwitchToLogin}
                  className="text-[#00A878] font-medium"
                >
                  Sign In
                </button>
              </p>
            </div>
          </motion.form>
        )}

        {step === 'phone' && (
          <motion.form 
            onSubmit={handlePhoneSubmit} 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl text-gray-900 mb-2">Verify Phone Number</h2>
              <p className="text-sm text-gray-600">Enter your phone number to receive OTP</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0903 124 5541"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
              disabled={formData.phone.length !== 11 || loading}
              className="w-full h-12"
              style={{ backgroundColor: '#00A878' }}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have a smartphone?{' '}
                <button type="button" className="text-[#00A878] font-medium">
                  Dial *669#
                </button>
              </p>
            </div>
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
              <h2 className="text-2xl text-gray-900 mb-2">Enter OTP</h2>
              <p className="text-sm text-gray-600">
                We sent a code to {formData.phone}
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <div className="text-center">
              <button type="button" className="text-sm text-[#00A878] font-medium">
                Resend OTP
              </button>
            </div>
          </motion.form>
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