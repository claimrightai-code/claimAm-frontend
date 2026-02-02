"use client";
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { ArrowLeft, Calendar } from 'lucide-react';
import { ClaimData } from '../MobileApp';

interface ClaimDetailsFormProps {
  claimData: ClaimData;
  onUpdate: (data: ClaimData) => void;
  onBack: () => void;
  onNext: () => void;
  language: 'en' | 'pidgin' | 'yoruba' | 'igbo' | 'hausa';
} 

const text = {
  en: {
    title: 'Claim Details',
    subtitle: 'Provide basic information about your claim',
    policyHolder: 'Policy Holder Name',
    policyNumber: 'Policy Number',
    incidentDate: 'Incident Date',
    description: 'Brief Description',
    descriptionPlaceholder: 'Describe the incident in a few words...',
    claimAmount: 'Claim Amount (Optional)',
    amountPlaceholder: 'Enter amount in ₹',
    next: 'Next: Upload Documents',
    maxChars: 'characters remaining'
  },
  hi: {
    title: 'दावा विवरण',
    subtitle: 'अपने दावे के बारे में बुनियादी जानकारी प्रदान करें',
    policyHolder: 'पॉलिसी धारक का नाम',
    policyNumber: 'पॉलिसी नंबर',
    incidentDate: 'घटना की तारीख',
    description: 'संक्षिप्त विवरण',
    descriptionPlaceholder: 'घटना का कुछ शब्दों में वर्णन करें...',
    claimAmount: 'दावा राशि (वैकल्पिक)',
    amountPlaceholder: '₹ में राशि दर्ज करें',
    next: 'अगला: दस्तावेज़ अपलोड करें',
    maxChars: 'शेष अक्षर'
  }
};

export function ClaimDetailsForm({ claimData, onUpdate, onBack, onNext, language }: ClaimDetailsFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = (text as Record<string, typeof text['en']>)[language] ?? text.en;
  const maxDescLength = 250;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!claimData.policyHolder.trim()) {
      newErrors.policyHolder = language === 'en' ? 'Required' : 'आवश्यक';
    }
    
    if (!claimData.policyNumber.trim()) {
      newErrors.policyNumber = language === 'en' ? 'Required' : 'आवश्यक';
    }
    
    if (!claimData.incidentDate) {
      newErrors.incidentDate = language === 'en' ? 'Required' : 'आवश्यक';
    }
    
    if (!claimData.description.trim()) {
      newErrors.description = language === 'en' ? 'Required' : 'आवश्यक';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const handleInputChange = (field: keyof ClaimData, value: string) => {
    onUpdate({ ...claimData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
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
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Policy Holder */}
          <div>
            <Label htmlFor="policyHolder">{t.policyHolder}</Label>
            <Input
              id="policyHolder"
              value={claimData.policyHolder}
              onChange={(e) => handleInputChange('policyHolder', e.target.value)}
              className={`mt-2 ${errors.policyHolder ? 'border-red-500' : ''}`}
              placeholder="Aditi Sharma"
            />
            {errors.policyHolder && (
              <p className="text-red-500 text-sm mt-1">{errors.policyHolder}</p>
            )}
          </div>

          {/* Policy Number */}
          <div>
            <Label htmlFor="policyNumber">{t.policyNumber}</Label>
            <Input
              id="policyNumber"
              value={claimData.policyNumber}
              onChange={(e) => handleInputChange('policyNumber', e.target.value)}
              className={`mt-2 ${errors.policyNumber ? 'border-red-500' : ''}`}
              placeholder="INS-IN-2024-8745"
            />
            {errors.policyNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.policyNumber}</p>
            )}
          </div>

          {/* Incident Date */}
          <div>
            <Label htmlFor="incidentDate">{t.incidentDate}</Label>
            <div className="relative mt-2">
              <Input
                id="incidentDate"
                type="date"
                value={claimData.incidentDate}
                onChange={(e) => handleInputChange('incidentDate', e.target.value)}
                className={`${errors.incidentDate ? 'border-red-500' : ''}`}
                max={new Date().toISOString().split('T')[0]}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {errors.incidentDate && (
              <p className="text-red-500 text-sm mt-1">{errors.incidentDate}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">{t.description}</Label>
            <Textarea
              id="description"
              value={claimData.description}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= maxDescLength) {
                  handleInputChange('description', value);
                }
              }}
              className={`mt-2 min-h-[100px] ${errors.description ? 'border-red-500' : ''}`}
              placeholder={t.descriptionPlaceholder}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
              <p className="text-sm text-gray-500 ml-auto">
                {maxDescLength - claimData.description.length} {t.maxChars}
              </p>
            </div>
          </div>

          {/* Claim Amount */}
          <div>
            <Label htmlFor="claimAmount">{t.claimAmount}</Label>
            <Input
              id="claimAmount"
              type="number"
              value={claimData.claimAmount}
              onChange={(e) => handleInputChange('claimAmount', e.target.value)}
              className="mt-2"
              placeholder={t.amountPlaceholder}
            />
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="p-6 border-t border-gray-100">
        <Button
          onClick={handleNext}
          className="w-full h-12"
          style={{ backgroundColor: '#0057B7' }}
        >
          {t.next}
        </Button>
      </div>
    </div>
  );
}