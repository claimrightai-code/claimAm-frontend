import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { XCircle, AlertCircle } from 'lucide-react';
import { MobileScreen } from '../MobileApp';

interface AdvancePayIneligibleProps {
  onNavigate: (screen: MobileScreen) => void;
}

export function AdvancePayIneligible({ onNavigate }: AdvancePayIneligibleProps) {
  return (
    <div className="h-full bg-gradient-to-br from-red-50 to-white flex flex-col p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-20 h-20 text-red-600" />
          </div>
        </div>

        {/* Message */}
        <div className="text-center mb-8">
          <h1 className="text-2xl text-gray-900 mb-3">
            Not Eligible Yet
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            ClaimAm Advance Pay
          </p>
          <p className="text-sm text-gray-600 px-4 leading-relaxed mb-6">
            You don't currently meet the eligibility requirements for Advance Pay. 
            Check the criteria below to see how you can qualify.
          </p>
        </div>

        {/* Eligibility Requirements Card */}
        <Card className="w-full p-6 border-2 border-orange-200 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <h3 className="text-sm font-semibold text-gray-900">Eligibility Requirements:</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-orange-700">1</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Premium Subscriber Duration</p>
                <p className="text-xs text-gray-600 mt-1">
                  You must be a premium subscriber for at least <strong>6 months</strong>
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-orange-700">2</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Successful Claim History</p>
                <p className="text-xs text-gray-600 mt-1">
                  You must have at least <strong>1 successful claim</strong> (excluding claims from partner companies like Bolt)
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-orange-700">3</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Active Claim Pending</p>
                <p className="text-xs text-gray-600 mt-1">
                  You must have an active claim currently being processed
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-orange-700">4</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Good Standing</p>
                <p className="text-xs text-gray-600 mt-1">
                  Your account must be in good standing with no outstanding issues
                </p>
              </div>
            </li>
          </ul>
        </Card>

        {/* Help Card */}
        <Card className="w-full p-4 bg-blue-50 border border-blue-200">
          <p className="text-xs text-gray-700 text-center">
            <strong>Need help?</strong> Contact our support team for more information on how to qualify.
          </p>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mt-6">
        <Button
          onClick={() => onNavigate('welcome')}
          className="w-full h-14 text-lg rounded-xl shadow-lg"
          style={{ backgroundColor: '#00A878' }}
        >
          Back to Home
        </Button>
        <Button
          variant="outline"
          className="w-full h-12 rounded-xl"
        >
          Contact Support
        </Button>
      </div>
    </div>
  );
}