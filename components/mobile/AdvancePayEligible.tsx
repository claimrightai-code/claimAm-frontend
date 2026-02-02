import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { MobileScreen } from '../MobileApp';

interface AdvancePayEligibleProps {
  onNavigate: (screen: MobileScreen) => void;
}

export function AdvancePayEligible({ onNavigate }: AdvancePayEligibleProps) {
  return (
    <div className="h-full bg-gradient-to-br from-green-50 to-white flex flex-col p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Success Icon */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 bg-gradient-to-br from-[#00A878] to-[#0057B7] rounded-full flex items-center justify-center">
            <CheckCircle className="w-20 h-20 text-white" />
          </div>
          <div className="absolute inset-0 bg-[#00A878] rounded-full blur-2xl opacity-20 animate-pulse"></div>
        </div>

        {/* Congratulations Message */}
        <div className="text-center mb-8">
          <h1 className="text-2xl text-gray-900 mb-3">
            Congratulations! 🎉
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            You're Eligible for
          </p>
          <p className="text-xl font-semibold text-[#00A878] mb-4">
            ClaimAm Advance Pay
          </p>
          <p className="text-sm text-gray-600 px-4 leading-relaxed">
            Get instant financial relief while your claim is being processed. 
            Click next to continue with your application.
          </p>
        </div>

        {/* Benefits Card */}
        <Card className="w-full p-6 border-2 border-[#00A878]/20 mb-8">
          <h3 className="text-sm text-gray-700 mb-3">What you get:</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#00A878] mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">Instant cash advance up to 50% of claim amount</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#00A878] mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">No interest for first 30 days</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#00A878] mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">Wallet funding within 10 minutes</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#00A878] mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">Simple application process</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={() => onNavigate('advance-pay-form')}
          className="w-full h-14 text-lg rounded-xl shadow-lg"
          style={{ backgroundColor: '#00A878' }}
        >
          Next
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <Button
          onClick={() => onNavigate('welcome')}
          variant="outline"
          className="w-full h-12 rounded-xl"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}