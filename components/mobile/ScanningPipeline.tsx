"use client";

import React, { useEffect, useState } from 'react';
import { ClaimData } from '../MobileApp';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Loader2,
  Upload,
  FileText,
  Shield,
  Eye,
  Database,
  TrendingUp
} from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { motion } from 'motion/react';

interface ScanningPipelineProps {
  claimData: ClaimData;
  onComplete: (data: ClaimData) => void;
  language: 'en' | 'pidgin' | 'yoruba' | 'igbo' | 'hausa';
}

const text = {
  en: {
    title: 'Analyzing your claim...',
    subtitle: 'AI-powered verification in progress',
    steps: {
      upload: 'Upload Validation',
      ocr: 'OCR & Data Extraction',
      forensics: 'Image Forensics',
      deepfake: 'Deepfake Detection',
      crosscheck: 'Cross-check Verification',
      scoring: 'Fraud Risk Scoring'
    },
    descriptions: {
      upload: 'Checking file types and sizes',
      ocr: 'Extracting text and data from documents',
      forensics: 'Scanning for image tampering',
      deepfake: 'Analyzing media authenticity',
      crosscheck: 'Verifying with external databases',
      scoring: 'Calculating fraud risk score'
    },
    results: {
      pass: 'Verified',
      warning: 'Caution',
      fail: 'Issue Found'
    }
  },
  hi: {
    title: 'आपके दावे का विश्लेषण कर रहे हैं...',
    subtitle: 'AI-संचालित सत्यापन प्रगति में है',
    steps: {
      upload: 'अपलोड सत्यापन',
      ocr: 'OCR और डेटा निष्कर्षण',
      forensics: 'छवि फोरेंसिक',
      deepfake: 'डीपफेक डिटेक्शन',
      crosscheck: 'क्रॉस-चेक सत्यापन',
      scoring: 'फ्रॉड रिस्क स्कोरिंग'
    },
    descriptions: {
      upload: 'फ़ाइल प्रकार और आकार की जांच',
      ocr: 'दस्तावेजों से टेक्स्ट और डेटा निकालना',
      forensics: 'छवि छेड़छाड़ के लिए स्कैनिंग',
      deepfake: 'मीडिया प्रामाणिकता का विश्लेषण',
      crosscheck: 'बाहरी डेटाबेस के साथ सत्यापन',
      scoring: 'फ्रॉड जोखिम स्कोर की गणना'
    },
    results: {
      pass: 'सत्यापित',
      warning: 'सावधानी',
      fail: 'समस्या मिली'
    }
  }
};

type PipelineStep = 'upload' | 'ocr' | 'forensics' | 'deepfake' | 'crosscheck' | 'scoring';

interface StepResult {
  status: 'pending' | 'processing' | 'pass' | 'warning' | 'fail';
  confidence?: number;
  details?: string;
  extractedData?: Record<string, string>;
}

const mockOCRData = {
  'Policy Number': 'INS-IN-2024-8745',
  'Date': '12 Aug 2025',
  'Amount': '₹1,20,000',
  'Hospital': 'Apollo Hospital',
  'Patient Name': 'Aditi Sharma'
};

export function ScanningPipeline({ claimData, onComplete, language }: ScanningPipelineProps) {
  const [currentStep, setCurrentStep] = useState<PipelineStep>('upload');
  const [stepResults, setStepResults] = useState<Record<PipelineStep, StepResult>>({
    upload: { status: 'pending' },
    ocr: { status: 'pending' },
    forensics: { status: 'pending' },
    deepfake: { status: 'pending' },
    crosscheck: { status: 'pending' },
    scoring: { status: 'pending' }
  });
  
  const [overallProgress, setOverallProgress] = useState(0);
  const [fraudScore, setFraudScore] = useState(0);

  const t = (text as Record<string, typeof text['en']>)[language] ?? text.en;
  
  const steps: PipelineStep[] = ['upload', 'ocr', 'forensics', 'deepfake', 'crosscheck', 'scoring'];
  
  const stepIcons = {
    upload: Upload,
    ocr: FileText,
    forensics: Shield,
    deepfake: Eye,
    crosscheck: Database,
    scoring: TrendingUp
  };

  useEffect(() => {
    const runPipeline = async () => {
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        setCurrentStep(step);
        
        // Mark step as processing
        setStepResults(prev => ({
          ...prev,
          [step]: { ...prev[step], status: 'processing' }
        }));

        // Simulate processing time
        await new Promise(resolve => {
          const duration = step === 'scoring' ? 2000 : 1500;
          setTimeout(resolve, duration);
        });

        // Update step result
        let result: StepResult;
        
        switch (step) {
          case 'upload':
            result = { status: 'pass', confidence: 100, details: '3 files validated' };
            break;
          case 'ocr':
            result = { 
              status: 'pass', 
              confidence: 98, 
              details: 'Data extracted successfully',
              extractedData: mockOCRData
            };
            break;
          case 'forensics':
            result = { status: 'warning', confidence: 78, details: 'Minor editing detected in document edges' };
            break;
          case 'deepfake':
            result = { status: 'pass', confidence: 99, details: 'No synthetic media detected' };
            break;
          case 'crosscheck':
            result = { status: 'pass', confidence: 97, details: 'All records verified' };
            break;
          case 'scoring':
            const score = 45; // Mock fraud score
            setFraudScore(score);
            result = { 
              status: score < 30 ? 'pass' : score < 60 ? 'warning' : 'fail', 
              confidence: score,
              details: `Risk score: ${score}/100`
            };
            break;
          default:
            result = { status: 'pass', confidence: 100 };
        }

        setStepResults(prev => ({
          ...prev,
          [step]: result
        }));

        setOverallProgress(((i + 1) / steps.length) * 100);
      }

      // Complete analysis
      setTimeout(() => {
        const finalFraudScore = fraudScore || 45;
        const status = finalFraudScore < 30 ? 'approved' : 'flagged';
        
        onComplete({
          ...claimData,
          fraudScore: finalFraudScore,
          status,
          id: `CLM${Date.now()}`
        });
      }, 1000);
    };

    runPipeline();
  }, []);

  const getStepIcon = (step: PipelineStep) => {
    const Icon = stepIcons[step];
    return <Icon className="w-5 h-5" />;
  };

  const getStatusColor = (status: StepResult['status']) => {
    switch (status) {
      case 'pass': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'fail': return 'text-red-600';
      case 'processing': return 'text-blue-600';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: StepResult['status']) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'fail': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'processing': return <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />;
      default: return null;
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-green-50 to-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-sm text-gray-600 mb-6">{t.subtitle}</p>
        
        {/* Overall Progress */}
        <div className="mb-6">
          <Progress value={overallProgress} className="h-3 mb-2" />
          <p className="text-sm text-gray-600">{Math.round(overallProgress)}% Complete</p>
        </div>
      </div>

      {/* Pipeline Steps */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <div className="space-y-4">
          {steps.map((step, index) => {
            const result = stepResults[step];
            const isActive = currentStep === step;
            const isCompleted = result.status !== 'pending';
            
            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-4 transition-all duration-300 ${
                  isActive ? 'ring-2 ring-blue-500 shadow-lg' : ''
                }`}>
                  <div className="flex items-start gap-4">
                    {/* Step Icon */}
                    <div className={`p-2 rounded-lg ${
                      isCompleted 
                        ? result.status === 'pass' ? 'bg-green-100' :
                          result.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                        : isActive ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <div className={getStatusColor(result.status)}>
                        {getStepIcon(step)}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">
                          {t.steps[step]}
                        </h3>
                        {getStatusIcon(result.status)}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        {t.descriptions[step]}
                      </p>

                      {/* Processing Animation */}
                      {result.status === 'processing' && (
                        <motion.div
                          className="w-full h-1 bg-gray-200 rounded-full overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.div
                            className="h-full bg-blue-500"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.5, ease: 'easeInOut' }}
                          />
                        </motion.div>
                      )}

                      {/* Results */}
                      {isCompleted && result.status !== 'processing' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3"
                        >
                          <div className="flex items-center justify-between">
                            <Badge 
                              variant={
                                result.status === 'pass' ? 'default' :
                                result.status === 'warning' ? 'secondary' : 'destructive'
                              }
                              className="text-xs"
                            >
                              {result.status === 'pass' && t.results.pass}
                              {result.status === 'warning' && t.results.warning}
                              {result.status === 'fail' && t.results.fail}
                            </Badge>
                            {result.confidence && (
                              <span className="text-xs text-gray-500">
                                {result.confidence}% confidence
                              </span>
                            )}
                          </div>
                          {result.details && (
                            <p className="text-xs text-gray-600 mt-1">{result.details}</p>
                          )}
                        </motion.div>
                      )}

                      {/* OCR Extracted Data */}
                      {step === 'ocr' && result.extractedData && isCompleted && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <h4 className="text-xs font-medium text-gray-700 mb-2">Extracted Data:</h4>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {Object.entries(result.extractedData).map(([key, value]) => (
                              <div key={key} className="flex flex-col">
                                <span className="text-gray-500">{key}:</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Fraud Score Gauge */}
                      {step === 'scoring' && fraudScore > 0 && isCompleted && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-3 p-3 bg-gray-50 rounded-lg text-center"
                        >
                          <div className="relative w-20 h-20 mx-auto mb-2">
                            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                              <path
                                className="text-gray-300"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <motion.path
                                className={fraudScore < 30 ? 'text-green-500' : fraudScore < 60 ? 'text-yellow-500' : 'text-red-500'}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ strokeDasharray: '0 100' }}
                                animate={{ strokeDasharray: `${fraudScore} 100` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-lg font-bold">{fraudScore}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600">Risk Score</p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}