import React from 'react';
import { Button } from '../ui/button';
import { ClaimAmLogo } from '../ClaimAmLogo';
import { CheckCircle, Crown, Calendar, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface SubscriptionSuccessProps {
  amount: number;
  days: number;
  expiryDate: Date;
  onContinue: () => void;
}

export function SubscriptionSuccess({ amount, days, expiryDate, onContinue }: SubscriptionSuccessProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-NG', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getSubscriptionPeriod = (days: number) => {
    if (days >= 365) return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? 's' : ''}`;
    if (days >= 180) return `${Math.floor(days / 180)} half-year${Math.floor(days / 180) > 1 ? 's' : ''}`;
    if (days >= 30) return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''}`;
    return `${days} days`;
  };

  return (
    <div className="h-full bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="mb-6"
        >
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center"
            >
              <Crown className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h2>
          <p className="text-sm text-gray-600">
            You're now a premium subscriber
          </p>
        </motion.div>

        {/* Subscription Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200 space-y-4">
            <div className="flex justify-center mb-2">
              <ClaimAmLogo size={50} withBackground={true} />
            </div>

            <div className="text-center pb-4 border-b border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
              <p className="text-3xl font-bold text-gray-900">₦{amount.toLocaleString()}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Subscription Period</span>
                </div>
                <span className="font-semibold text-gray-900">{getSubscriptionPeriod(days)}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Total Days</span>
                </div>
                <span className="font-semibold text-gray-900">{days} days</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <span className="text-sm text-gray-700">Valid Until</span>
                </div>
                <span className="font-semibold text-gray-900 text-xs">{formatDate(expiryDate)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3 border border-yellow-200">
                <p className="text-xs font-semibold text-gray-900 mb-2">
                  ✨ Premium Benefits Activated:
                </p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>✓ Priority claim processing</li>
                  <li>✓ Higher advance pay limits</li>
                  <li>✓ 24/7 premium support</li>
                  <li>✓ Free document verification</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-sm mt-8"
        >
          <Button
            onClick={onContinue}
            className="w-full h-12"
            style={{ backgroundColor: '#00A878' }}
          >
            Continue to Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
}