import React from 'react';
import { Crown, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface SubscriptionStatusProps {
  isPremium: boolean;
  onUpgrade?: () => void;
  compact?: boolean;
}

export function SubscriptionStatus({ isPremium, onUpgrade, compact = false }: SubscriptionStatusProps) {
  if (compact) {
    return (
      <div className={`rounded-lg p-3 ${isPremium ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className={`w-4 h-4 ${isPremium ? 'text-yellow-600' : 'text-gray-400'}`} />
            <span className={`text-sm font-medium ${isPremium ? 'text-gray-900' : 'text-gray-600'}`}>
              {isPremium ? 'Premium Member' : 'Free Plan'}
            </span>
          </div>
          {!isPremium && onUpgrade && (
            <button
              onClick={onUpgrade}
              className="text-xs text-[#00A878] font-medium"
            >
              Upgrade
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-5 ${
        isPremium 
          ? 'bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50 border-2 border-yellow-300' 
          : 'bg-white border-2 border-gray-200'
      }`}
    >
      {isPremium ? (
        <>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Crown className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Premium Member</h3>
              <p className="text-xs text-gray-600">Active subscription</p>
            </div>
          </div>

          <div className="space-y-2 bg-white/60 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Status</span>
              <span className="font-medium text-green-600">Active</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Next billing</span>
              <span className="font-medium text-gray-900">Monthly</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-yellow-200">
            <p className="text-xs text-gray-600">
              ✨ Enjoying priority processing, higher limits & 24/7 support
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <Crown className="w-7 h-7 text-gray-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Free Plan</h3>
              <p className="text-xs text-gray-600">Limited features</p>
            </div>
          </div>

          <div className="space-y-2 bg-gray-50 rounded-lg p-3 mb-3">
            <p className="text-sm text-gray-700">Upgrade to Premium for:</p>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>✓ Priority claim processing</li>
              <li>✓ Higher advance pay limits</li>
              <li>✓ 24/7 premium support</li>
              <li>✓ Free document verification</li>
            </ul>
          </div>

          {onUpgrade && (
            <button
              onClick={onUpgrade}
              className="w-full h-10 bg-[#00A878] text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
            >
              Upgrade to Premium
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </>
      )}
    </motion.div>
  );
}
