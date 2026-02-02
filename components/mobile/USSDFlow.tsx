"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Smartphone } from 'lucide-react';

interface USSDFlowProps {
  onBack: () => void;
}

type USSDScreen = 'welcome' | 'create-account' | 'phone-entry' | 'otp' | 'main-menu' | 'file-claim' | 'photo-upload' | 'ai-result' | 'echo-share';

export function USSDFlow({ onBack }: USSDFlowProps) {
  const [screen, setScreen] = useState<USSDScreen>('welcome');
  const [input, setInput] = useState('');

  const FeaturePhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-full max-w-sm mx-auto">
      {/* Phone frame */}
      <div className="bg-gray-800 rounded-[40px] p-6 shadow-2xl">
        {/* Screen */}
        <div className="bg-gradient-to-b from-green-100 to-green-50 rounded-lg p-4 mb-6 min-h-[400px] flex flex-col font-mono text-sm border-4 border-gray-700">
          {children}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
            <button
              key={key}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg py-3 text-lg font-bold transition-colors"
              onClick={() => setInput(prev => prev + key)}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <button className="bg-green-600 hover:bg-green-500 text-white rounded-lg py-2 text-sm transition-colors">
            ← Back
          </button>
          <button className="bg-red-600 hover:bg-red-500 text-white rounded-lg py-2 text-sm transition-colors">
            End
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-y-auto">
      <div className="p-6">
        <button onClick={onBack} className="mb-4 text-gray-600 flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Back to App
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl text-gray-900 mb-2">USSD Demo: *669#</h2>
          <p className="text-gray-600">Feature phone interface simulation</p>
        </div>

        {/* Welcome Screen */}
        {screen === 'welcome' && (
          <FeaturePhoneFrame>
            <div className="flex-1">
              <div className="text-center mb-4">
                <p className="text-xs text-gray-600">CLAIMAM</p>
                <p className="text-lg">*669#</p>
              </div>
              <div className="space-y-1 text-xs">
                <p className="font-bold">Welcome to ClaimAm</p>
                <p>File claims via USSD</p>
                <p className="mt-3">Select option:</p>
                <p>1. Create Account</p>
                <p>2. Login</p>
                <p>3. File Claim</p>
                <p>4. Check Status</p>
                <p>5. My Rights</p>
                <p>6. Echo Claims</p>
                <p className="mt-3">00. Help</p>
              </div>
            </div>
            <Button
              onClick={() => setScreen('create-account')}
              size="sm"
              className="w-full mt-4"
              style={{ backgroundColor: '#00A878' }}
            >
              Next: Create Account
            </Button>
          </FeaturePhoneFrame>
        )}

        {/* Create Account */}
        {screen === 'create-account' && (
          <FeaturePhoneFrame>
            <div className="flex-1">
              <div className="space-y-1 text-xs">
                <p className="font-bold">Create Account</p>
                <p className="mt-3">To register, please provide:</p>
                <p className="mt-3">1. Phone number</p>
                <p>2. Full name</p>
                <p>3. BVN (optional)</p>
                <p className="mt-3">Press 1 to continue</p>
                <p>Press 0 to go back</p>
              </div>
            </div>
            <Button
              onClick={() => setScreen('phone-entry')}
              size="sm"
              className="w-full mt-4"
              style={{ backgroundColor: '#00A878' }}
            >
              Next: Phone Entry
            </Button>
          </FeaturePhoneFrame>
        )}

        {/* Phone Entry */}
        {screen === 'phone-entry' && (
          <FeaturePhoneFrame>
            <div className="flex-1">
              <div className="space-y-1 text-xs">
                <p className="font-bold">Enter Phone Number</p>
                <p className="mt-3">Type your 11-digit</p>
                <p>phone number:</p>
                <div className="mt-4 bg-white p-2 rounded border-2 border-gray-400">
                  <p className="text-center">09031245541</p>
                </div>
                <p className="mt-3 text-center text-[10px]">Press # to confirm</p>
              </div>
            </div>
            <Button
              onClick={() => setScreen('otp')}
              size="sm"
              className="w-full mt-4"
              style={{ backgroundColor: '#00A878' }}
            >
              Next: OTP Verification
            </Button>
          </FeaturePhoneFrame>
        )}

        {/* OTP Verification */}
        {screen === 'otp' && (
          <FeaturePhoneFrame>
            <div className="flex-1">
              <div className="space-y-1 text-xs">
                <p className="font-bold">OTP Verification</p>
                <p className="mt-3">Enter the 6-digit code</p>
                <p>sent to 0903***5541</p>
                <div className="mt-4 bg-white p-2 rounded border-2 border-gray-400">
                  <p className="text-center tracking-wider">123456</p>
                </div>
                <p className="mt-3 text-[10px]">Didn't receive code?</p>
                <p className="text-[10px]">Press 1 to resend</p>
              </div>
            </div>
            <Button
              onClick={() => setScreen('main-menu')}
              size="sm"
              className="w-full mt-4"
              style={{ backgroundColor: '#00A878' }}
            >
              Next: Main Menu
            </Button>
          </FeaturePhoneFrame>
        )}

        {/* Main Menu */}
        {screen === 'main-menu' && (
          <FeaturePhoneFrame>
            <div className="flex-1">
              <div className="space-y-1 text-xs">
                <p className="font-bold">Main Menu</p>
                <p className="text-[10px]">ID: CR-2024-8847</p>
                <p className="mt-3">What would you like to do?</p>
                <p className="mt-3">1. File New Claim</p>
                <p>2. Check Claim Status</p>
                <p>3. Know Your Rights</p>
                <p>4. Echo Claims</p>
                <p>5. My Profile</p>
                <p>6. Support</p>
                <p className="mt-3">0. Logout</p>
              </div>
            </div>
            <Button
              onClick={() => setScreen('file-claim')}
              size="sm"
              className="w-full mt-4"
              style={{ backgroundColor: '#00A878' }}
            >
              Next: File Claim
            </Button>
          </FeaturePhoneFrame>
        )}

        {/* File Claim */}
        {screen === 'file-claim' && (
          <FeaturePhoneFrame>
            <div className="flex-1">
              <div className="space-y-1 text-xs">
                <p className="font-bold">File New Claim</p>
                <p className="mt-3">Select insurance type:</p>
                <p className="mt-2">1. Motor</p>
                <p>2. Health</p>
                <p>3. Home</p>
                <p>4. Travel</p>
                <p>5. Crop</p>
                <p>6. Life</p>
                <p className="mt-3">Example: Press 1</p>
                <p className="text-[10px]">(Motor selected)</p>
              </div>
            </div>
            <Button
              onClick={() => setScreen('photo-upload')}
              size="sm"
              className="w-full mt-4"
              style={{ backgroundColor: '#00A878' }}
            >
              Next: Photo Upload
            </Button>
          </FeaturePhoneFrame>
        )}

        {/* Photo Upload */}
        {screen === 'photo-upload' && (
          <FeaturePhoneFrame>
            <div className="flex-1">
              <div className="space-y-1 text-xs">
                <p className="font-bold">Upload Evidence</p>
                <p className="mt-3">Please send photos to:</p>
                <div className="mt-3 bg-white p-2 rounded">
                  <p className="font-bold text-center">+234-669-CLAIM</p>
                </div>
                <p className="mt-3 text-[10px]">Or use WhatsApp:</p>
                <p className="text-[10px]">wa.me/234669CLAIM</p>
                <p className="mt-3">Required photos:</p>
                <p className="text-[10px]">✓ Accident scene</p>
                <p className="text-[10px]">✓ Vehicle damage</p>
                <p className="text-[10px]">✓ Police report</p>
                <p className="mt-3">Press 1 when done</p>
              </div>
            </div>
            <Button
              onClick={() => setScreen('ai-result')}
              size="sm"
              className="w-full mt-4"
              style={{ backgroundColor: '#00A878' }}
            >
              Next: AI Result
            </Button>
          </FeaturePhoneFrame>
        )}

        {/* AI Result */}
        {screen === 'ai-result' && (
          <FeaturePhoneFrame>
            <div className="flex-1">
              <div className="space-y-1 text-xs">
                <p className="font-bold">Claim Verified!</p>
                <p className="mt-3">Claim ID: CLM-98765</p>
                <div className="mt-3 bg-green-200 p-3 rounded">
                  <p className="font-bold">✓ APPROVED</p>
                  <p className="mt-2">Amount: ₦85,000</p>
                </div>
                <p className="mt-3 text-[10px]">AI Fraud Score: 12/100</p>
                <p className="text-[10px]">Status: Low Risk</p>
                <p className="mt-3">Payout in 2-3 days to:</p>
                <p className="text-[10px]">Account: 0123456789</p>
                <p className="text-[10px]">GTBank</p>
                <p className="mt-3">1. Share Echo Story</p>
                <p>2. Back to Menu</p>
              </div>
            </div>
            <Button
              onClick={() => setScreen('echo-share')}
              size="sm"
              className="w-full mt-4"
              style={{ backgroundColor: '#00A878' }}
            >
              Next: Echo Share
            </Button>
          </FeaturePhoneFrame>
        )}

        {/* Echo Share */}
        {screen === 'echo-share' && (
          <FeaturePhoneFrame>
            <div className="flex-1">
              <div className="space-y-1 text-xs">
                <p className="font-bold">Echo Your Win!</p>
                <p className="mt-3">Help others trust</p>
                <p>insurance by sharing</p>
                <p>your story</p>
                <p className="mt-3">Your success will be</p>
                <p>shared via SMS to your</p>
                <p>community (anonymous)</p>
                <div className="mt-3 bg-blue-100 p-2 rounded text-[10px]">
                  <p>"I got ₦85k motor claim</p>
                  <p>in 3 days via *669#</p>
                  <p>- ClaimAm works!"</p>
                </div>
                <p className="mt-3">1. Share (Free SMS)</p>
                <p>2. Skip</p>
              </div>
            </div>
            <Button
              onClick={() => setScreen('welcome')}
              size="sm"
              className="w-full mt-4"
              style={{ backgroundColor: '#00A878' }}
            >
              Complete Demo
            </Button>
          </FeaturePhoneFrame>
        )}

        {/* Navigation */}
        <div className="mt-6 flex justify-center gap-2">
          {['welcome', 'create-account', 'phone-entry', 'otp', 'main-menu', 'file-claim', 'photo-upload', 'ai-result', 'echo-share'].map((s) => (
            <button
              key={s}
              onClick={() => setScreen(s as USSDScreen)}
              className={`w-2 h-2 rounded-full transition-colors ${
                screen === s ? 'bg-[#00A878]' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}