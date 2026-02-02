"use client";
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { MobileScreen } from '../MobileApp';

interface AdvancePayFormProps {
  onNavigate: (screen: MobileScreen) => void;
}

export function AdvancePayForm({ onNavigate }: AdvancePayFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    amount: '',
    uniqueId: '',
    bvn: '',
    nin: '',
    agreeToTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.agreeToTerms) {
      onNavigate('advance-pay-processing');
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => onNavigate('advance-pay-check')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg text-gray-900">Advance Pay Application</h1>
            <p className="text-xs text-gray-600">Fill in your details below</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A878] focus:border-transparent"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              placeholder="e.g. 09031245541"
              required
              pattern="[0-9]{11}"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A878] focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Enter 11-digit phone number</p>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Amount (₦) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.amount}
              onChange={(e) => handleChange('amount', e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="e.g. 200,000"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A878] focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Maximum 50% of your pending claim amount</p>
          </div>

          {/* ClaimAm Unique ID */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              ClaimAm Unique ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.uniqueId}
              onChange={(e) => handleChange('uniqueId', e.target.value)}
              placeholder="e.g. CR-2024-8821"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A878] focus:border-transparent"
            />
          </div>

          {/* BVN */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Bank Verification Number (BVN) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.bvn}
              onChange={(e) => handleChange('bvn', e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="Enter 11-digit BVN"
              required
              maxLength={11}
              pattern="[0-9]{11}"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A878] focus:border-transparent"
            />
          </div>

          {/* NIN */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              National Identification Number (NIN) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.nin}
              onChange={(e) => handleChange('nin', e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="Enter 11-digit NIN"
              required
              maxLength={11}
              pattern="[0-9]{11}"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A878] focus:border-transparent"
            />
          </div>

          {/* Terms and Conditions */}
          <Card className="p-4 bg-blue-50 border border-blue-200">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreeToTerms}
                onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
                required
                className="mt-1 w-4 h-4 text-[#00A878] border-gray-300 rounded focus:ring-[#00A878]"
              />
              <label htmlFor="terms" className="text-xs text-gray-700 leading-relaxed">
                I agree to the <span className="text-[#00A878] underline">Terms and Conditions</span> of ClaimAm Advance Pay, 
                including repayment terms and interest rates. I understand that the advance will be deducted from my final claim settlement.
              </label>
            </div>
          </Card>

          {/* Info Alert */}
          <Card className="p-4 border border-orange-200 bg-orange-50">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  <strong>Important:</strong> Your information will be verified. Providing false information may result in 
                  application rejection and account suspension.
                </p>
              </div>
            </div>
          </Card>
        </form>
      </div>

      {/* Submit Button */}
      <div className="bg-white border-t px-6 py-4">
        <Button
          onClick={handleSubmit}
          disabled={!formData.agreeToTerms}
          className="w-full h-14 text-lg rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#00A878' }}
        >
          Submit Application
        </Button>
      </div>
    </div>
  );
}