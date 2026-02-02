import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  CheckCircle, 
  AlertTriangle, 
  Download, 
  Copy, 
  Clock, 
  ArrowLeft, 
  FileText,
  CreditCard,
  Shield,
  Eye
} from 'lucide-react';
import { ClaimData, MobileScreen } from '../MobileApp';
import { motion } from 'motion/react';

interface ResultsScreenProps {
  claimData: ClaimData;
  onNavigate: (screen: MobileScreen) => void;
  language: 'en' | 'pidgin' | 'yoruba' | 'igbo' | 'hausa';
} 

const text = {
  en: {
    approved: {
      title: 'Claim Approved! 🎉',
      message: 'Your claim has been automatically approved',
      payoutInitiated: 'Payout Initiated',
      transferTime: 'Funds will reach your bank in 1-2 hours',
      amount: 'Approved Amount',
      downloadReport: 'Download Claim Report',
      claimId: 'Claim ID',
      auditId: 'Audit ID'
    },
    flagged: {
      title: 'Claim Flagged for Review',
      subtitle: 'Additional verification required',
      issues: 'Issues Detected',
      estimatedTime: 'Estimated review time: 24-48 hours',
      uploadMore: 'Upload Additional Documents',
      requestReview: 'Request Manual Review',
      contactSupport: 'Contact Support'
    },
    common: {
      fraudScore: 'Fraud Risk Analysis',
      riskExplanation: 'Details',
      breakdown: 'Risk Breakdown',
      mediaForensics: 'Media Forensics',
      claimHistory: 'Claim History',
      iotCrosscheck: 'IoT Cross-check',
      claimDetails: 'Claim Details',
      backHome: 'Back to Home'
    }
  },
  hi: {
    approved: {
      title: 'दावा स्वीकृत! 🎉',
      message: 'आपका दावा स्वचालित रूप से स्वीकृत हो गया है',
      payoutInitiated: 'भुगतान शुरू किया गया',
      transferTime: 'धन 1-2 घंटे में आपके बैंक में पहुंच जाएगा',
      amount: 'स्वीकृत राशि',
      downloadReport: 'दावा रिपोर्ट डाउनलोड करें',
      claimId: 'दावा ID',
      auditId: 'ऑडिट ID'
    },
    flagged: {
      title: 'दावा समीक्षा के लिए चिह्नित',
      subtitle: 'अतिरिक्त सत्यापन आवश्यक',
      issues: 'समस्याएं पाई गईं',
      estimatedTime: 'अनुमानित समीक्षा समय: 24-48 घंटे',
      uploadMore: 'अधिक दस्तावेज़ अपलोड करें',
      requestReview: 'मैनुअल समीक्षा का अनुरोध करें',
      contactSupport: 'सहायता से संपर्क करें'
    },
    common: {
      fraudScore: 'जोखिम मूल्यांकन',
      riskExplanation: 'विवरण',
      breakdown: 'जोखिम विवरण',
      mediaForensics: 'मीडिया फोरेंसिक',
      claimHistory: 'दावा इतिहास',
      iotCrosscheck: 'IoT क्रॉस-चेक',
      claimDetails: 'दावे का विवरण',
      backHome: 'होम पर वापस'
    }
  }
};

const mockIssues = [
  'Missing RC Book document',
  'Tamper detected in invoice image',
  'Inconsistent vehicle damage assessment'
];

export function ResultsScreen({ claimData, onNavigate, language }: ResultsScreenProps) {
  const t = (text as Record<string, typeof text['en']>)[language] ?? text.en;
  const isApproved = claimData.status === 'approved';
  const fraudScore = claimData.fraudScore || 45;
  
  const copyToClipboard = async (text: string) => {
    try {
      // Try the modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for when Clipboard API is blocked
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } finally {
          textArea.remove();
        }
      }
    } catch (err) {
      // Silent fail - clipboard operation is not critical
      console.log('Copy failed:', err);
    }
  };

  const scoreBreakdown = [
    { label: t.common.mediaForensics, value: 25, score: 23 },
    { label: t.common.claimHistory, value: 20, score: 18 },
    { label: t.common.iotCrosscheck, value: 20, score: 16 }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-green-50 to-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="mb-4"
        >
          {isApproved ? (
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          ) : (
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-12 h-12 text-orange-600" />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            {isApproved ? t.approved.title : t.flagged.title}
          </h1>
          <p className="text-sm text-gray-600">
            {isApproved ? t.approved.message : t.flagged.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Approved Content */}
          {isApproved && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6 border-green-200 bg-green-50">
                <div className="text-center mb-4">
                  <Badge variant="default" className="mb-3" style={{ backgroundColor: '#00A878' }}>
                    <CreditCard className="w-3 h-3 mr-1" />
                    {t.approved.payoutInitiated}
                  </Badge>
                  <p className="text-2xl text-[#00A878] mb-1">
                    {claimData.claimAmount || '₦1,200,000'}
                  </p>
                  <p className="text-sm text-gray-700">{t.approved.amount}</p>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                  <Clock className="w-4 h-4" />
                  {t.approved.transferTime}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Flagged Content */}
          {!isApproved && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-4 border-orange-200 bg-orange-50">
                <h3 className="font-medium text-orange-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {t.flagged.issues}
                </h3>
                <ul className="space-y-2 mb-4">
                  {mockIssues.map((issue, index) => (
                    <li key={index} className="text-sm text-orange-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-orange-600">{t.flagged.estimatedTime}</p>
              </Card>
            </motion.div>
          )}

          {/* Claim Details */}
          <Card className="p-4">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {t.common.claimDetails}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t.approved.claimId}:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono">{claimData.id || 'CLM12345'}</span>
                  <button
                    onClick={() => copyToClipboard(claimData.id || 'CLM12345')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t.approved.auditId}:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono">AUD-{Date.now().toString().slice(-6)}</span>
                  <button
                    onClick={() => copyToClipboard(`AUD-${Date.now().toString().slice(-6)}`)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Risk Assessment */}
          <Card className="p-4">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              {t.common.fraudScore}
            </h3>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-300"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={fraudScore < 30 ? 'text-green-500' : fraudScore < 60 ? 'text-yellow-500' : 'text-red-500'}
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray={`${fraudScore} 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">{fraudScore}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Risk Score: {fraudScore}/100</p>
                  <p className="text-xs text-gray-600">
                    {fraudScore < 30 ? 'Low Risk' : fraudScore < 60 ? 'Medium Risk' : 'High Risk'}
                  </p>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="text-xs">
                <Eye className="w-3 h-3 mr-1" />
                {t.common.riskExplanation}
              </Button>
            </div>

            <Separator className="my-4" />

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">{t.common.breakdown}</h4>
              <div className="space-y-3">
                {scoreBreakdown.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium">{item.score}/{item.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(item.score / item.value) * 100}%`,
                          backgroundColor: '#00A878'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            {isApproved ? (
              <>
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  {t.approved.downloadReport}
                </Button>
              </>
            ) : (
              <>
                <Button className="w-full" style={{ backgroundColor: '#00A878' }}>
                  {t.flagged.uploadMore}
                </Button>
                <Button className="w-full" variant="outline">
                  {t.flagged.requestReview}
                </Button>
                <Button className="w-full" variant="outline" onClick={() => window.location.href = 'mailto:support@claimam.ng'}>
                  {t.flagged.contactSupport}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="p-6 border-t border-gray-100">
        <Button
          onClick={() => onNavigate('welcome')}
          variant="ghost"
          className="w-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.common.backHome}
        </Button>
      </div>
    </div>
  );
}