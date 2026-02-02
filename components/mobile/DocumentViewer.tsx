"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  FileText, 
  Shield, 
  Zap, 
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { UploadedDocument, ClaimData } from '../MobileApp';
import { motion } from 'motion/react';


interface DocumentViewerProps {
  document: UploadedDocument;
  onBack: () => void;
  claimData: ClaimData;
  language: 'en' | 'pidgin' | 'yoruba' | 'igbo' | 'hausa';
} 

const text = {
  en: {
    title: 'Document Viewer',
    forensicOverlay: 'Forensic Overlay',
    ocrExtraction: 'OCR Extraction',
    metadata: 'Document Metadata',
    fileName: 'File Name',
    fileSize: 'File Size',
    uploadTime: 'Upload Time',
    fileType: 'File Type',
    tamperDetection: 'Tamper Detection',
    confidence: 'Confidence',
    status: 'Status',
    clean: 'Clean',
    suspicious: 'Suspicious',
    extractedFields: 'Extracted Fields',
    noExtraction: 'No text extracted from this document',
    forensicAnalysis: 'Forensic Analysis',
    pixelAnalysis: 'Pixel-level analysis shows',
    noTampering: 'No signs of digital manipulation',
    minorEditing: 'Minor edge artifacts detected',
    significantChanges: 'Significant alterations found'
  },
  hi: {
    title: 'दस्तावेज़ व्यूअर',
    forensicOverlay: 'फोरेंसिक ओवरले',
    ocrExtraction: 'OCR निष्कर्षण',
    metadata: 'दस्तावेज़ मेटाडेटा',
    fileName: 'फ़ाइल नाम',
    fileSize: 'फ़ाइल आकार',
    uploadTime: 'अपलोड समय',
    fileType: 'फ़ाइल प्रकार',
    tamperDetection: 'छेड़छाड़ का पता लगाना',
    confidence: 'विश्वास',
    status: 'स्थिति',
    clean: 'साफ',
    suspicious: 'संदिग्ध',
    extractedFields: 'निकाले गए फील्ड',
    noExtraction: 'इस दस्तावेज़ से कोई टेक्स्ट नहीं निकाला गया',
    forensicAnalysis: 'फोरेंसिक विश्लेषण',
    pixelAnalysis: 'पिक्सेल-स्तर विश्लेषण दिखाता है',
    noTampering: 'डिजिटल हेरफेर के कोई संकेत नहीं',
    minorEditing: 'मामूली किनारे की कलाकृतियां मिलीं',
    significantChanges: 'महत्वपूर्ण परिवर्तन मिले'
  }
};

const mockOCRData = {
  'Policy Number': 'INS-IN-2024-8745',
  'Date': '12 Aug 2025',
  'Amount': '₹1,20,000',
  'Hospital': 'Apollo Hospital',
  'Patient Name': 'Aditi Sharma'
};

const mockForensics = {
  tamperScore: 78,
  regions: [
    { x: 20, y: 30, width: 15, height: 8, confidence: 85, type: 'suspicious' },
    { x: 60, y: 70, width: 25, height: 12, confidence: 92, type: 'clean' }
  ]
};

export function DocumentViewer({ document, onBack, claimData, language }: DocumentViewerProps) {
  const [showForensics, setShowForensics] = useState(false);
  const [showOCR, setShowOCR] = useState(false);
  const t = (text as Record<string, typeof text['en']>)[language] ?? text.en;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getForensicStatus = (score: number) => {
    if (score < 30) return { status: t.clean, color: 'text-green-600', icon: CheckCircle };
    if (score < 70) return { status: t.suspicious, color: 'text-yellow-600', icon: AlertTriangle };
    return { status: t.suspicious, color: 'text-red-600', icon: AlertTriangle };
  };

  const forensicStatus = getForensicStatus(mockForensics.tamperScore);
  const StatusIcon = forensicStatus.icon;

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">{t.title}</h1>
            <p className="text-sm text-gray-600">{document.name}</p>
          </div>
        </div>

        {/* Toggle Controls */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={showForensics}
              onCheckedChange={setShowForensics}
              id="forensics"
            />
            <label htmlFor="forensics" className="text-sm cursor-pointer">
              {t.forensicOverlay}
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={showOCR}
              onCheckedChange={setShowOCR}
              id="ocr"
            />
            <label htmlFor="ocr" className="text-sm cursor-pointer">
              {t.ocrExtraction}
            </label>
          </div>
        </div>
      </div>

      {/* Document Display */}
      <div className="flex-1 overflow-y-auto">
        {/* Image/Document Viewer */}
        <div className="p-6">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            {document.type.startsWith('image/') ? (
              <div className="relative">
                
                
                {/* Forensic Overlay */}
                {showForensics && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0"
                  >
                    {mockForensics.regions.map((region, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.7, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className={`absolute border-2 rounded ${
                          region.type === 'suspicious' 
                            ? 'border-red-500 bg-red-500/20' 
                            : 'border-green-500 bg-green-500/20'
                        }`}
                        style={{
                          left: `${region.x}%`,
                          top: `${region.y}%`,
                          width: `${region.width}%`,
                          height: `${region.height}%`
                        }}
                      >
                        <div className={`absolute -top-6 left-0 text-xs px-2 py-1 rounded ${
                          region.type === 'suspicious' 
                            ? 'bg-red-500 text-white' 
                            : 'bg-green-500 text-white'
                        }`}>
                          {region.confidence}%
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* OCR Overlay */}
                {showOCR && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0"
                  >
                    {Object.entries(mockOCRData).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="absolute bg-blue-500 text-white text-xs px-2 py-1 rounded"
                        style={{
                          left: `${20 + index * 15}%`,
                          top: `${30 + index * 8}%`
                        }}
                      >
                        <div className="font-medium">{key}</div>
                        <div>{value}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">{document.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(document.size)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Panels */}
        <div className="px-6 pb-6 space-y-4">
          {/* Document Metadata */}
          <Card className="p-4">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {t.metadata}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">{t.fileName}:</p>
                <p className="font-medium break-all">{document.name}</p>
              </div>
              <div>
                <p className="text-gray-600">{t.fileSize}:</p>
                <p className="font-medium">{formatFileSize(document.size)}</p>
              </div>
              <div>
                <p className="text-gray-600">{t.fileType}:</p>
                <p className="font-medium">{document.type}</p>
              </div>
              <div>
                <p className="text-gray-600">{t.uploadTime}:</p>
                <p className="font-medium">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          {/* Forensic Analysis */}
          <Card className="p-4">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              {t.forensicAnalysis}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t.tamperDetection}:</span>
                <Badge 
                  variant={mockForensics.tamperScore < 30 ? 'default' : 'destructive'}
                  className="flex items-center gap-1"
                >
                  <StatusIcon className="w-3 h-3" />
                  {forensicStatus.status}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t.confidence}:</span>
                <span className="text-sm font-medium">{mockForensics.tamperScore}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    mockForensics.tamperScore < 30 
                      ? 'bg-green-500' 
                      : mockForensics.tamperScore < 70 
                        ? 'bg-yellow-500' 
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${mockForensics.tamperScore}%` }}
                />
              </div>

              <Separator />

              <div>
                <p className="text-sm text-gray-600 mb-2">{t.pixelAnalysis}:</p>
                <p className="text-sm">
                  {mockForensics.tamperScore < 30 
                    ? t.noTampering
                    : mockForensics.tamperScore < 70 
                      ? t.minorEditing
                      : t.significantChanges
                  }
                </p>
              </div>
            </div>
          </Card>

          {/* OCR Extracted Fields */}
          <Card className="p-4">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              {t.extractedFields}
            </h3>
            
            {Object.keys(mockOCRData).length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(mockOCRData).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">{key}:</span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">{t.noExtraction}</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}