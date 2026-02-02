"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Loader2, CheckCircle, Banknote } from 'lucide-react';
import { MobileScreen } from '../MobileApp';

interface AdvancePayProcessingProps {
  onNavigate: (screen: MobileScreen) => void;
}

export function AdvancePayProcessing({ onNavigate }: AdvancePayProcessingProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Show success popup after 10 seconds
    const timer = setTimeout(() => {
      setShowSuccess(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-6 relative">
      {!showSuccess ? (
        // Processing State
        <div className="flex flex-col items-center">
          {/* Animated Loader */}
          <div className="mb-8 relative">
            <div className="w-32 h-32 bg-gradient-to-br from-[#00A878] to-[#0057B7] rounded-full flex items-center justify-center">
              <Loader2 className="w-20 h-20 text-white animate-spin" />
            </div>
            <div className="absolute inset-0 bg-[#00A878] rounded-full blur-2xl opacity-20 animate-pulse"></div>
          </div>

          {/* Processing Message */}
          <div className="text-center mb-8">
            <h1 className="text-2xl text-gray-900 mb-3">
              Processing Your Request
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              ClaimAm Advance Pay
            </p>
            <p className="text-sm text-gray-600 px-4 leading-relaxed">
              Please hold while we process your Advance Pay application. 
              This may take a few moments...
            </p>
          </div>

          {/* Processing Steps */}
          <Card className="w-full max-w-sm p-6 border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#00A878] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-700">Verifying your details</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#00A878] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-700">Checking eligibility</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                </div>
                <span className="text-sm text-gray-700">Processing payment...</span>
              </div>
            </div>
          </Card>

          {/* Tip */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              💡 Your wallet will be funded within 10 minutes of approval
            </p>
          </div>
        </div>
      ) : (
        // Success Popup
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6 z-50 animate-fade-in">
          <Card className="w-full max-w-sm p-8 bg-white shadow-2xl">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#00A878] to-[#0057B7] rounded-full flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center mb-6">
              <h2 className="text-2xl text-gray-900 mb-3">
                Congratulations! 🎉
              </h2>
              <p className="text-lg font-semibold text-[#00A878] mb-2">
                Advance Pay Approved
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your Advance Pay has been successfully processed and your wallet 
                will be funded within the next <strong>10 minutes</strong>.
              </p>
            </div>

            {/* Details Card */}
            <Card className="p-4 bg-green-50 border border-green-200 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Banknote className="w-5 h-5 text-[#00A878]" />
                <span className="text-sm font-semibold text-gray-900">Payment Details</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Reference:</span>
                  <span className="font-medium text-gray-900">AP-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-[#00A878]">Approved</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Time:</span>
                  <span className="font-medium text-gray-900">Within 10 mins</span>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={() => onNavigate('welcome')}
                className="w-full h-12 rounded-xl"
                style={{ backgroundColor: '#00A878' }}
              >
                Back to Home
              </Button>
              <Button
                variant="outline"
                className="w-full h-10 rounded-xl"
              >
                View Transaction
              </Button>
            </div>
          </Card>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}