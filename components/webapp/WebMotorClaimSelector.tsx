"use client";
import React from 'react';
import { Button } from '../ui/button';
import { Car, FileText, AlertTriangle, ArrowRight } from 'lucide-react';

interface WebMotorClaimSelectorProps {
  onSelectReport: () => void;
  onSelectClaim: () => void;
  onBack: () => void;
}

export function WebMotorClaimSelector({ onSelectReport, onSelectClaim, onBack }: WebMotorClaimSelectorProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4">
            <Car className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Motor Insurance Claim
          </h1>
          <p className="text-lg text-gray-600">
            Choose how you want to proceed
          </p>
        </div>

        {/* Two Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Report Accident */}
          <div
            onClick={onSelectReport}
            className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#FF9F1C] hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Report Accident
              </h3>
              
              <p className="text-gray-600 mb-4">
                File an accident report within 24-48 hours as required by your policy
              </p>

              <div className="w-full p-3 bg-orange-50 rounded-lg mb-4">
                <p className="text-sm text-orange-800 font-medium">
                  ⚠️ Required for all accidents, even if no claim is filed
                </p>
              </div>

              <ul className="text-left w-full space-y-2 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#00A878] mt-0.5">✓</span>
                  <span>Document incident details immediately</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#00A878] mt-0.5">✓</span>
                  <span>Upload photos and police report</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#00A878] mt-0.5">✓</span>
                  <span>Comply with policy requirements</span>
                </li>
              </ul>

              <Button
                className="w-full group-hover:bg-[#FF9F1C]"
                style={{ backgroundColor: '#FF9F1C' }}
              >
                Report Accident
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Initiate Claim */}
          <div
            onClick={onSelectClaim}
            className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#00A878] hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00A878] to-[#0052CC] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Initiate Claim
              </h3>
              
              <p className="text-gray-600 mb-4">
                File a claim to receive compensation after reporting the accident
              </p>

              <div className="w-full p-3 bg-blue-50 rounded-lg mb-4">
                <p className="text-sm text-blue-800 font-medium">
                  💡 Check at-fault vehicle and file your claim
                </p>
              </div>

              <ul className="text-left w-full space-y-2 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#00A878] mt-0.5">✓</span>
                  <span>Submit claim for compensation</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#00A878] mt-0.5">✓</span>
                  <span>Provide repair estimates and bills</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#00A878] mt-0.5">✓</span>
                  <span>Fast AI-powered verification</span>
                </li>
              </ul>

              <Button
                className="w-full"
                style={{ backgroundColor: '#00A878' }}
              >
                Start Claim
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">ℹ️</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Not sure which one to choose?
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Both options are available to you. <strong>Report Accident</strong> is mandatory for all incidents within 24-48 hours 
                of the accident, while <strong>Initiate Claim</strong> is used when you want to file for compensation. 
                You can report an accident first, then initiate a claim later.
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-6">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 text-sm hover:underline"
          >
            ← Back to Insurance Types
          </button>
        </div>
      </div>
    </div>
  );
}
