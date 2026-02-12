"use client";

import React, { useState } from 'react';
import { X, Mail, Phone, MessageCircle, Clock, ArrowLeft, CheckCircle, AlertCircle, Upload, CreditCard, FileText, HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface SupportModalProps {
  onClose: () => void;
}

type SupportTopic = 'track' | 'payment' | 'document' | 'general' | null;

export function SupportModal({ onClose }: SupportModalProps) {
  const [selectedTopic, setSelectedTopic] = useState<SupportTopic>(null);

  const renderTopicContent = () => {
    switch (selectedTopic) {
      case 'track':
        return <TrackClaimContent onBack={() => setSelectedTopic(null)} />;
      case 'payment':
        return <PaymentIssuesContent onBack={() => setSelectedTopic(null)} />;
      case 'document':
        return <DocumentUploadContent onBack={() => setSelectedTopic(null)} />;
      case 'general':
        return <GeneralQuestionsContent onBack={() => setSelectedTopic(null)} />;
      default:
        return null;
    }
  };

  if (selectedTopic) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
          {renderTopicContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Contact Support</h2>
            <p className="text-gray-600 mt-1">We're here to help you 24/7</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Email Support */}
          <div className="bg-gradient-to-r from-[#00A878]/10 to-[#0052CC]/10 rounded-xl p-6 border border-[#00A878]/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#00A878] rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Send us an email and we'll respond within 24 hours
                </p>
                <a
                  href="mailto:support@claimam.com"
                  className="inline-flex items-center gap-2 text-[#0052CC] hover:underline font-medium"
                >
                  <Mail className="w-4 h-4" />
                  support@claimam.com
                </a>
              </div>
            </div>
          </div>

          {/* Phone Support */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#0052CC] rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Call us directly for immediate assistance
                </p>
                <a
                  href="tel:+2349118223417"
                  className="inline-flex items-center gap-2 text-[#0052CC] hover:underline font-medium"
                >
                  <Phone className="w-4 h-4" />
                  +234 911 822 3417
                </a>
              </div>
            </div>
          </div>

          {/* WhatsApp Support */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">WhatsApp Support</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Chat with us on WhatsApp for quick responses
                </p>
                <a
                  href="https://wa.me/2349118223417"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-600 hover:underline font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  +234 911 822 3417
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">Business Hours</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM WAT</p>
                  <p><strong>Saturday:</strong> 9:00 AM - 3:00 PM WAT</p>
                  <p><strong>Sunday:</strong> Closed</p>
                  <p className="text-[#00A878] font-medium mt-2">
                    📞 Emergency support available 24/7 via phone
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-bold text-gray-900 mb-4">Common Support Topics</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
                onClick={() => setSelectedTopic('track')}
              >
                📋 Track Claim Status
              </button>
              <button
                className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
                onClick={() => setSelectedTopic('payment')}
              >
                💳 Payment Issues
              </button>
              <button
                className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
                onClick={() => setSelectedTopic('document')}
              >
                📄 Document Upload Help
              </button>
              <button
                className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
                onClick={() => setSelectedTopic('general')}
              >
                ❓ General Questions
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <Button
            onClick={onClose}
            className="w-full"
            style={{ backgroundColor: '#00A878' }}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

// Content for each support topic
function TrackClaimContent({ onBack }: { onBack: () => void }) {
  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Support
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Track Claim Status</h2>
            <p className="text-gray-600 text-sm">Monitor your claim progress in real-time</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* 3 Ways to Track */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-bold text-gray-900 mb-4">3 Ways to Track Your Claim</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Web Application Dashboard</h4>
                <p className="text-sm text-gray-600">
                  Go to "My Claims" section and click on any claim to view detailed status, timeline, and progress percentage.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">USSD Code *669#</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Dial <strong>*669#</strong> from any phone (no internet required) → Select "Track Claim" → Enter your claim reference number.
                </p>
                <div className="bg-white rounded-lg p-3 text-xs text-gray-700">
                  <p className="font-mono">*669# → 2. Track Claim → Enter CLM-2025-XXXX</p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Visit a ClaimAm Agent</h4>
                <p className="text-sm text-gray-600">
                  Find an agent near you using the "Find Agents" feature. Bring your claim reference number (e.g., CLM-2025-0847).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Understanding Claim Statuses */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Understanding Claim Statuses</h3>
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Processing</span>
                <span className="text-xs text-gray-600">⏱️ 1-5 days</span>
              </div>
              <p className="text-sm text-gray-700">
                Your claim has been submitted and is currently being reviewed by our AI verification system and claims assessors.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Under Review</span>
                <span className="text-xs text-gray-600">⏱️ 2-7 days</span>
              </div>
              <p className="text-sm text-gray-700">
                Additional verification needed. We may contact you for more documents or information. Check your email and phone.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Approved</span>
                <span className="text-xs text-gray-600">✅ Payment in 3-5 business days</span>
              </div>
              <p className="text-sm text-gray-700">
                Congratulations! Your claim has been approved. Payment will be processed to your registered bank account within 3-5 business days.
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Rejected</span>
                <span className="text-xs text-gray-600">❌ Appeal available</span>
              </div>
              <p className="text-sm text-gray-700">
                Your claim was not approved. Check your email for the detailed reason. You can appeal within 14 days by contacting support.
              </p>
            </div>
          </div>
        </div>

        {/* Claim Timeline Explained */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Typical Claim Processing Timeline</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Day 1: Claim Submitted</p>
                <p className="text-xs text-gray-600">Instant AI verification begins</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Day 1-2: Initial Review</p>
                <p className="text-xs text-gray-600">Documents verified, OCR scanning, fraud detection</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Day 3-5: Assessment</p>
                <p className="text-xs text-gray-600">Claims assessor reviews incident details</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Day 6-7: Final Decision</p>
                <p className="text-xs text-gray-600">Approval or additional information request</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Day 8-12: Payment</p>
                <p className="text-xs text-gray-600">If approved, payment processed to your account</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Q: Why is my claim taking longer than expected?</h4>
              <p className="text-sm text-gray-600">
                A: Complex claims may require additional verification. Common reasons include: missing documents, high claim amount requiring senior approval, or need for physical inspection. Check your email for updates.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Q: Can I track multiple claims at once?</h4>
              <p className="text-sm text-gray-600">
                A: Yes! In your dashboard "My Claims" section, you can view all your active and past claims with their current status.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Q: Will I be notified of status changes?</h4>
              <p className="text-sm text-gray-600">
                A: Yes! You'll receive SMS and email notifications at every stage. Make sure your contact information is up to date in your profile.
              </p>
            </div>
          </div>
        </div>

        {/* Need More Help */}
        <div className="bg-gradient-to-r from-[#00A878] to-[#0052CC] rounded-xl p-6 text-white">
          <h3 className="font-bold mb-2">Still Need Help?</h3>
          <p className="text-sm text-white/90 mb-4">
            Our support team is available 24/7 to assist you
          </p>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:+2349118223417"
              className="bg-white text-[#0052CC] px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-gray-100"
            >
              📞 Call Us
            </a>
            <a
              href="mailto:support@claimam.com"
              className="bg-white text-[#0052CC] px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-gray-100"
            >
              ✉️ Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentIssuesContent({ onBack }: { onBack: () => void }) {
  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Support
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Payment Issues</h2>
            <p className="text-gray-600 text-sm">Resolve payment and subscription concerns</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Common Payment Issues */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Common Payment Issues & Solutions</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Payment Not Received</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    If your approved claim payment hasn't arrived after 5 business days:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Verify your bank account details in your profile are correct</li>
                    <li>Check with your bank - payments may be on hold for verification</li>
                    <li>Contact support with your claim reference number</li>
                  </ul>
                  <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-orange-800">
                      <strong>⚡ Quick Fix:</strong> Go to Profile → Subscription → Payment Details to update your bank account information
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Subscription Payment Failed</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    If your subscription payment was declined:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Ensure sufficient funds in your account</li>
                    <li>Verify your card hasn't expired</li>
                    <li>Check if international payments are enabled (for foreign cards)</li>
                    <li>Try a different payment method (bank transfer, USSD, card)</li>
                  </ul>
                  <div className="mt-3 p-3 bg-red-50 rounded-lg">
                    <p className="text-xs text-red-800">
                      <strong>📌 Note:</strong> Your subscription remains active for 7 days after payment failure. Renew before expiry to avoid claim delays.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Wrong Amount Charged</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    If you were charged incorrectly:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Check your subscription plan - prices vary by tier (Basic/Premium/Family)</li>
                    <li>Verify no pending upgrades or add-ons were processed</li>
                    <li>Contact support immediately with transaction reference for refund</li>
                  </ul>
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-800">
                      <strong>💰 Refund Policy:</strong> Wrong charges are refunded within 5-7 business days to the original payment method
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods Accepted */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <h3 className="font-bold text-gray-900 mb-4">Accepted Payment Methods</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">💳 Debit/Credit Cards</p>
              <p className="text-xs text-gray-600">Visa, Mastercard, Verve</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">🏦 Bank Transfer</p>
              <p className="text-xs text-gray-600">Direct transfer, USSD code</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">📱 Mobile Money</p>
              <p className="text-xs text-gray-600">All major Nigerian providers</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">💰 USSD Payment</p>
              <p className="text-xs text-gray-600">Dial *669# → Pay</p>
            </div>
          </div>
        </div>

        {/* Payment Timeline */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Claim Payment Timeline</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">Claim Approved</p>
                <p className="text-xs text-gray-600">You receive email/SMS notification</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">Payment Processing (1-2 days)</p>
                <p className="text-xs text-gray-600">ClaimAm initiates bank transfer</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">Bank Processing (2-3 days)</p>
                <p className="text-xs text-gray-600">Your bank clears the payment</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#00A878] rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm">
                ✓
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">Payment Received!</p>
                <p className="text-xs text-gray-600">Check your account balance</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Payment FAQs</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Q: Can I change my payment account after submitting a claim?</h4>
              <p className="text-sm text-gray-600">
                A: Yes! Go to Profile → Subscription → Payment Details anytime before payment is processed. Once processing starts, contact support immediately.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Q: Are there any payment fees?</h4>
              <p className="text-sm text-gray-600">
                A: No! ClaimAm covers all transfer fees. You receive the full approved claim amount with no deductions.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Q: What if I don't have a bank account?</h4>
              <p className="text-sm text-gray-600">
                A: You can receive payment via mobile money (Opay, PalmPay, Kuda) or pick up cash at any ClaimAm agent location. Update your preferred method in your profile.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-[#00A878] to-[#0052CC] rounded-xl p-6 text-white">
          <h3 className="font-bold mb-2">Payment Issue Not Resolved?</h3>
          <p className="text-sm text-white/90 mb-4">
            Contact our payments team immediately for urgent assistance
          </p>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:+2349118223417"
              className="bg-white text-[#0052CC] px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-gray-100"
            >
              📞 Call Now
            </a>
            <a
              href="mailto:payments@claimam.com"
              className="bg-white text-[#0052CC] px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-gray-100"
            >
              ✉️ Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentUploadContent({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3">
          <ArrowLeft className="w-5 h-5" />
          Back to Support
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Upload className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Document Upload Help</h2>
            <p className="text-gray-600 text-sm">Complete guide to uploading documents</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <h3 className="font-bold text-gray-900 mb-4">Required Documents</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3">
              <h4 className="font-semibold text-gray-900 mb-2">🚗 Motor Insurance</h4>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Police report, photos, driver's license, vehicle papers</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-3">
              <h4 className="font-semibold text-gray-900 mb-2">🏥 Health Insurance</h4>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Medical reports, bills, prescriptions, lab results</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#00A878] to-[#0052CC] rounded-xl p-6 text-white">
          <h3 className="font-bold mb-2">Need Help?</h3>
          <p className="text-sm text-white/90 mb-4">Contact support for document assistance</p>
          <div className="grid grid-cols-2 gap-3">
            <a href="tel:+2349118223417" className="bg-white text-[#0052CC] px-4 py-2 rounded-lg text-sm font-medium text-center">
              📞 Call
            </a>
            <a href="https://wa.me/2349118223417" className="bg-white text-[#0052CC] px-4 py-2 rounded-lg text-sm font-medium text-center">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function GeneralQuestionsContent({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3">
          <ArrowLeft className="w-5 h-5" />
          Back to Support
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-sm">Quick answers to common questions</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <h3 className="font-bold text-gray-900 mb-4">🚀 Getting Started</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">How do I sign up?</h4>
              <p className="text-sm text-gray-600">
                Click "Sign Up" → Enter details → Choose plan (₦5,000-₦12,000/mo) → Complete payment → Start filing!
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Can I use ClaimAm without internet?</h4>
              <p className="text-sm text-gray-600">
                Yes! Dial <strong>*669#</strong> from any phone for USSD access. No internet or smartphone needed.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-4">📝 Filing Claims</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">How long does processing take?</h4>
              <p className="text-sm text-gray-600">
                Simple claims: 1-3 days | Complex claims: 5-7 days. Our AI speeds up processing by 60%!
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Can I file multiple claims?</h4>
              <p className="text-sm text-gray-600">
                Yes! Each claim gets its own reference number (e.g., CLM-2025-0847).
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-bold text-gray-900 mb-4">Still Have Questions?</h3>
          <div className="grid grid-cols-3 gap-3">
            <a href="tel:+2349118223417" className="bg-white text-[#0052CC] px-4 py-3 rounded-lg text-sm font-medium text-center">
              📞<br/>Call
            </a>
            <a href="mailto:support@claimam.com" className="bg-white text-[#0052CC] px-4 py-3 rounded-lg text-sm font-medium text-center">
              ✉️<br/>Email
            </a>
            <a href="https://wa.me/2349118223417" className="bg-white text-[#0052CC] px-4 py-3 rounded-lg text-sm font-medium text-center">
              💬<br/>WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}