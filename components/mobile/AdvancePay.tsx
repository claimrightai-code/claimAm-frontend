"use client";
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Card } from '../ui/card';
import { ArrowLeft, Check, X, Loader2, CheckCircle, DollarSign } from 'lucide-react';

interface AdvancePayProps {
  onBack: () => void;
}

type AdvancePayScreen = 'check' | 'eligible' | 'ineligible' | 'form' | 'processing' | 'success';

export function AdvancePay({ onBack }: AdvancePayProps) {
  const [screen, setScreen] = useState<AdvancePayScreen>('check');
  const [isEligible] = useState(true); // Mock eligibility
  const [formData, setFormData] = useState({
    name: 'Chidinma Okafor',
    phone: '09031245541',
    amount: '200000',
    uniqueId: 'CR-2024-8847',
    bvn: '',
    nin: '',
    agreedToTerms: false
  });

  useState(() => {
    // Simulate eligibility check
    const timer = setTimeout(() => {
      setScreen(isEligible ? 'eligible' : 'ineligible');
    }, 1500);
    return () => clearTimeout(timer);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setScreen('processing');
    
    // Simulate processing
    setTimeout(() => {
      setScreen('success');
    }, 10000);
  };

  // Checking screen
  if (screen === 'check') {
    return (
      <div className="h-full bg-gradient-to-br from-white to-green-50 flex flex-col items-center justify-center px-8">
        <Loader2 className="w-16 h-16 text-[#00A878] animate-spin mb-6" />
        <h2 className="text-xl text-gray-900 mb-2">Checking Eligibility...</h2>
        <p className="text-gray-600 text-center">
          Please wait while we verify your account
        </p>
      </div>
    );
  }

  // Eligible screen
  if (screen === 'eligible') {
    return (
      <div className="h-full bg-gradient-to-br from-green-50 to-white flex flex-col">
        <div className="p-6">
          <button onClick={onBack} className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-20 h-20 rounded-full bg-[#00A878] flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl text-gray-900 mb-4">Congratulations!</h1>
          <p className="text-lg text-gray-700 mb-2">
            You're eligible for ClaimAm Advance Pay
          </p>
          <p className="text-gray-600 max-w-sm">
            Get instant access to your claim amount while we process your full claim
          </p>

          <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg max-w-sm w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Available Advance:</span>
              <span className="text-2xl text-[#00A878]">₦200,000</span>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Based on your claim of ₦250,000
            </p>
          </div>
        </div>

        <div className="p-6">
          <Button
            onClick={() => setScreen('form')}
            className="w-full h-12"
            style={{ backgroundColor: '#00A878' }}
          >
            Continue to Application
          </Button>
        </div>
      </div>
    );
  }

  // Ineligible screen
  if (screen === 'ineligible') {
    return (
      <div className="h-full bg-gradient-to-br from-red-50 to-white flex flex-col">
        <div className="p-6">
          <button onClick={onBack} className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
            <X className="w-12 h-12 text-red-600" />
          </div>

          <h1 className="text-2xl text-gray-900 mb-4">Not Eligible Yet</h1>
          <p className="text-gray-600 text-center mb-8">
            You don't meet the requirements for Advance Pay at this time
          </p>

          <Card className="p-6 max-w-sm w-full">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Eligibility Requirements:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-3 h-3 text-red-600" />
                </div>
                <span className="text-sm text-gray-700">
                  Subscriber must be at least 6 months old as a premium subscriber
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-3 h-3 text-red-600" />
                </div>
                <span className="text-sm text-gray-700">
                  Must have at least 1 successful claim (except from partner companies like Bolt)
                </span>
              </li>
            </ul>
          </Card>
        </div>

        <div className="p-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full h-12"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Form screen
  if (screen === 'form') {
    return (
      <div className="h-full bg-white flex flex-col overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <button onClick={() => setScreen('eligible')} className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl text-gray-900 mt-4">Advance Pay Application</h2>
          <p className="text-sm text-gray-600">Fill in your details to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="09031245541"
              required
              pattern="[0-9]{11}"
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₦)</Label>
            <Input
              id="amount"
              type="text"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value.replace(/\D/g, '') })}
              placeholder="200,000"
              required
              className="h-12"
            />
            <p className="text-xs text-gray-500">Maximum: ₦200,000</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="uniqueId">ClaimAm Unique ID</Label>
            <Input
              id="uniqueId"
              value={formData.uniqueId}
              disabled
              className="h-12 bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bvn">BVN (Bank Verification Number)</Label>
            <Input
              id="bvn"
              type="text"
              value={formData.bvn}
              onChange={(e) => setFormData({ ...formData, bvn: e.target.value.replace(/\D/g, '').slice(0, 11) })}
              placeholder="12345678901"
              required
              pattern="[0-9]{11}"
              maxLength={11}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nin">NIN (National Identification Number)</Label>
            <Input
              id="nin"
              type="text"
              value={formData.nin}
              onChange={(e) => setFormData({ ...formData, nin: e.target.value.replace(/\D/g, '').slice(0, 11) })}
              placeholder="12345678901"
              required
              pattern="[0-9]{11}"
              maxLength={11}
              className="h-12"
            />
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Checkbox
              id="terms"
              checked={formData.agreedToTerms}
              onCheckedChange={(checked) => setFormData({ ...formData, agreedToTerms: checked as boolean })}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
              I agree to all terms and conditions that apply to ClaimAm Advance Pay, including repayment terms and service fees
            </label>
          </div>

          <Button
            type="submit"
            disabled={!formData.agreedToTerms || formData.bvn.length !== 11 || formData.nin.length !== 11}
            className="w-full h-12"
            style={{ backgroundColor: '#00A878' }}
          >
            Submit Application
          </Button>
        </form>
      </div>
    );
  }

  // Processing screen
  if (screen === 'processing') {
    return (
      <div className="h-full bg-gradient-to-br from-white to-blue-50 flex flex-col items-center justify-center px-8">
        <div className="relative mb-8">
          <Loader2 className="w-20 h-20 text-[#00A878] animate-spin" />
          <DollarSign className="w-8 h-8 text-[#00A878] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h2 className="text-2xl text-gray-900 mb-3 text-center">Processing Your Advance Pay</h2>
        <p className="text-gray-600 text-center max-w-sm">
          Please hold while we verify your information and process your request...
        </p>
        <div className="mt-8 flex gap-2">
          <div className="w-2 h-2 bg-[#00A878] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-[#00A878] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-[#00A878] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    );
  }

  // Success screen
  if (screen === 'success') {
    return (
      <div className="h-full bg-gradient-to-br from-green-50 to-white flex flex-col items-center justify-center px-8 relative overflow-hidden">
        {/* Confetti effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#00A878] rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          <div className="w-24 h-24 rounded-full bg-[#00A878] flex items-center justify-center mb-6 mx-auto shadow-lg">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>

          <h1 className="text-3xl text-gray-900 mb-4">Congratulations!</h1>
          <p className="text-lg text-gray-700 mb-8">
            Your Advance Pay request has been approved
          </p>

          <Card className="p-6 max-w-sm mx-auto mb-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Amount Approved:</span>
                <span className="text-2xl text-[#00A878]">₦{parseInt(formData.amount).toLocaleString()}</span>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 text-center">
                  <strong>Your wallet will be funded within 10 minutes</strong>
                </p>
                <p className="text-xs text-gray-600 text-center mt-2">
                  You'll receive an SMS confirmation once the funds are available
                </p>
              </div>
            </div>
          </Card>

          <Button
            onClick={onBack}
            className="w-full max-w-sm h-12"
            style={{ backgroundColor: '#00A878' }}
          >
            Back to Dashboard
          </Button>
        </div>

        <style jsx>{`
          @keyframes confetti {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
          .animate-confetti {
            animation: confetti linear infinite;
          }
        `}</style>
      </div>
    );
  }

  return null;
}