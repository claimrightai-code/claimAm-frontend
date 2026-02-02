"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { ArrowLeft, Camera, Upload, File, Eye, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { ClaimData, UploadedDocument } from '../MobileApp';
import { getDocumentRequirements } from '@/utils/documentRequirements';
import { motion } from 'motion/react';


interface DocumentUploadProps {
  claimData: ClaimData;
  onUpdate: (data: ClaimData) => void;
  onBack: () => void;
  onSubmit: () => void;
  onViewDocument: (doc: UploadedDocument) => void;
  language: 'en' | 'pidgin' | 'yoruba' | 'igbo' | 'hausa';
} 

const text = {
  en: {
    title: 'Upload Documents',
    subtitle: 'Upload required documents for your claim',
    required: 'Required',
    optional: 'Optional',
    camera: 'Camera',
    upload: 'Upload',
    dragDrop: 'Drag & Drop',
    view: 'View',
    replace: 'Replace',
    remove: 'Remove',
    missing: 'Missing',
    uploaded: 'Uploaded',
    submit: 'Submit Claim',
    progress: 'Upload Progress',
    allRequired: 'All required documents uploaded',
    missingDocs: 'Missing required documents'
  },
  hi: {
    title: 'दस्तावेज़ अपलोड करें',
    subtitle: 'अपने दावे के लिए आवश्यक दस्तावेज़ अपलोड करें',
    required: 'आवश्यक',
    optional: 'वैकल्पिक',
    camera: 'कैमरा',
    upload: 'अपलोड',
    dragDrop: 'ड्रैग एंड ड्रॉप',
    view: 'देखें',
    replace: 'बदलें',
    remove: 'हटाएं',
    missing: 'गुम',
    uploaded: 'अपलोड किया गया',
    submit: 'दावा जमा करें',
    progress: 'अपलोड प्रगति',
    allRequired: 'सभी आवश्यक दस्तावेज़ अपलोड किए गए',
    missingDocs: 'आवश्यक दस्तावेज़ गुम हैं'
  }
};

// Mock uploaded documents for demo
const mockDocuments: UploadedDocument[] = [
  {
    id: 'doc1',
    name: 'hospital_bill_apollo.pdf',
    type: 'application/pdf',
    size: 245760,
    url: 'https://images.unsplash.com/photo-1710503913397-df9bfea7e50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdW1lbnQlMjBob3NwaXRhbCUyMGJpbGx8ZW58MXx8fHwxNzU3ODY0ODQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    required: true,
    category: 'medical'
  },
  {
    id: 'doc2',
    name: 'damage_photo_front.jpg',
    type: 'image/jpeg',
    size: 1024000,
    url: 'https://images.unsplash.com/photo-1662541547523-118842914aa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkYW1hZ2UlMjBhY2NpZGVudCUyMGluc3VyYW5jZXxlbnwxfHx8fDE3NTc4NjQ4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    required: true,
    category: 'evidence'
  }
];

export function DocumentUpload({ claimData, onUpdate, onBack, onSubmit, onViewDocument, language }: DocumentUploadProps) {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [hasInitialized, setHasInitialized] = useState(false);
  const t = (text as Record<string, typeof text['en']>)[language] ?? text.en;
  
  const requirements = getDocumentRequirements(claimData.insuranceType!);
  const requiredDocs = requirements.filter(doc => doc.required);
  const optionalDocs = requirements.filter(doc => !doc.required);
  
  // Initialize mock documents for demo (only once)
  useEffect(() => {
    if (!hasInitialized && claimData.documents.length === 0) {
      setHasInitialized(true);
      onUpdate({
        ...claimData,
        documents: mockDocuments
      });
    }
  }, [hasInitialized, claimData, onUpdate]);
  
  const uploadedDocs = claimData.documents;
  
  const getDocumentStatus = (docId: string) => {
    return uploadedDocs.find(doc => doc.id === docId || doc.category === docId);
  };

  const handleFileUpload = (docId: string, file: File) => {
    // Simulate upload progress
    setUploadProgress(prev => ({ ...prev, [docId]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev[docId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          
          // Add document to uploaded list
          const newDoc: UploadedDocument = {
            id: `doc_${Date.now()}`,
            name: file.name,
            type: file.type,
            size: file.size,
            url: URL.createObjectURL(file),
            required: requirements.find(req => req.id === docId)?.required || false,
            category: docId
          };
          
          onUpdate({
            ...claimData,
            documents: [...claimData.documents, newDoc]
          });
          
          return { ...prev, [docId]: 0 };
        }
        return { ...prev, [docId]: currentProgress + 10 };
      });
    }, 100);
  };

  const handleRemoveDocument = (docId: string) => {
    onUpdate({
      ...claimData,
      documents: claimData.documents.filter(doc => doc.id !== docId)
    });
  };

  const allRequiredUploaded = requiredDocs.every(doc => getDocumentStatus(doc.id));
  const uploadedCount = requiredDocs.filter(doc => getDocumentStatus(doc.id)).length;
  const progressPercent = (uploadedCount / requiredDocs.length) * 100;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

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
            <p className="text-sm text-gray-600">{t.subtitle}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">{t.progress}</span>
            <span className="text-sm text-gray-600">{uploadedCount}/{requiredDocs.length}</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          <p className="text-xs text-gray-500 mt-1">
            {allRequiredUploaded ? t.allRequired : t.missingDocs}
          </p>
        </div>
      </div>

      {/* Documents List */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Required Documents */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            {t.required}
          </h3>
          <div className="space-y-4">
            {requiredDocs.map((doc) => {
              const uploaded = getDocumentStatus(doc.id);
              const progress = uploadProgress[doc.id];
              
              return (
                <Card key={doc.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">
                        {language === 'en' ? doc.name : doc.nameHi}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {language === 'en' ? doc.description : doc.descriptionHi}
                      </p>
                    </div>
                    <Badge 
                      variant={uploaded ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {uploaded ? (
                        <><CheckCircle className="w-3 h-3 mr-1" />{t.uploaded}</>
                      ) : (
                        <><AlertCircle className="w-3 h-3 mr-1" />{t.missing}</>
                      )}
                    </Badge>
                  </div>

                  {progress !== undefined && progress > 0 && (
                    <div className="mb-3">
                      <Progress value={progress} className="h-1" />
                      <p className="text-xs text-gray-500 mt-1">Uploading... {progress}%</p>
                    </div>
                  )}

                  {uploaded ? (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                       
                          <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                            <File className="w-5 h-5 text-blue-600" />
                          </div>
                      
                        <div>
                          <p className="text-sm font-medium">{uploaded.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(uploaded.size)}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewDocument(uploaded)}
                          className="p-2"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveDocument(uploaded.id)}
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex flex-col items-center gap-1 h-auto py-3"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = doc.acceptedTypes.join(',');
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) handleFileUpload(doc.id, file);
                          };
                          input.click();
                        }}
                      >
                        <Camera className="w-4 h-4" />
                        <span className="text-xs">{t.camera}</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex flex-col items-center gap-1 h-auto py-3"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = doc.acceptedTypes.join(',');
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) handleFileUpload(doc.id, file);
                          };
                          input.click();
                        }}
                      >
                        <Upload className="w-4 h-4" />
                        <span className="text-xs">{t.upload}</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex flex-col items-center gap-1 h-auto py-3"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = doc.acceptedTypes.join(',');
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) handleFileUpload(doc.id, file);
                          };
                          input.click();
                        }}
                      >
                        <File className="w-4 h-4" />
                        <span className="text-xs">{t.dragDrop}</span>
                      </Button>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Optional Documents */}
        {optionalDocs.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              {t.optional}
            </h3>
            <div className="space-y-4">
              {optionalDocs.map((doc) => {
                const uploaded = getDocumentStatus(doc.id);
                
                return (
                  <Card key={doc.id} className="p-4 border-dashed">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">
                          {language === 'en' ? doc.name : doc.nameHi}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {language === 'en' ? doc.description : doc.descriptionHi}
                        </p>
                      </div>
                      {uploaded && (
                        <Badge variant="secondary" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {t.uploaded}
                        </Badge>
                      )}
                    </div>

                    {!uploaded && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = doc.acceptedTypes.join(',');
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) handleFileUpload(doc.id, file);
                          };
                          input.click();
                        }}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {t.upload}
                      </Button>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="p-6 border-t border-gray-100">
        <Button
          onClick={onSubmit}
          disabled={!allRequiredUploaded}
          className="w-full h-12"
          style={{ backgroundColor: allRequiredUploaded ? '#0057B7' : undefined }}
        >
          {t.submit}
        </Button>
      </div>
    </div>
  );
}