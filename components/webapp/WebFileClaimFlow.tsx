"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { 
  ArrowLeft, ArrowRight, Heart, Car, Home, Sprout, 
  Building2, Shield, Upload, X, FileText, CheckCircle
} from 'lucide-react';
import { WebMotorClaimSelector } from './WebMotorClaimSelector';

interface WebFileClaimFlowProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function WebFileClaimFlow({ onComplete, onCancel }: WebFileClaimFlowProps) {
  const [step, setStep] = useState(1);
  const [showMotorSelector, setShowMotorSelector] = useState(false);
  const [motorClaimType, setMotorClaimType] = useState<'report' | 'claim' | null>(null);
  const [formData, setFormData] = useState({
    insuranceType: '',
    policyNumber: '',
    policyHolder: '',
    incidentDate: '',
    claimAmount: '',
    description: '',
    documents: [] as File[]
  });

  const insuranceTypes = [
    {
      id: 'health',
      name: 'Health Insurance',
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      description: 'Medical bills, hospital visits, treatments'
    },
    {
      id: 'motor',
      name: 'Motor Insurance',
      icon: Car,
      color: 'from-blue-500 to-cyan-500',
      description: 'Vehicle accidents, theft, damages'
    },
    {
      id: 'home',
      name: 'Home Insurance',
      icon: Home,
      color: 'from-green-500 to-emerald-500',
      description: 'Property damage, theft, natural disasters'
    },
    {
      id: 'livestock',
      name: 'Livestock Insurance',
      icon: Sprout,
      color: 'from-yellow-500 to-orange-500',
      description: 'Fish, poultry, animal husbandry'
    },
    {
      id: 'business',
      name: 'Business Insurance',
      icon: Building2,
      color: 'from-purple-500 to-violet-500',
      description: 'Business interruption, liability'
    },
    {
      id: 'other',
      name: 'Other Insurance',
      icon: Shield,
      color: 'from-gray-500 to-slate-500',
      description: 'Other insurance types'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...newFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    // If motor insurance selected on step 1, show motor selector
    if (step === 1 && formData.insuranceType === 'motor') {
      setShowMotorSelector(true);
      return;
    }
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (showMotorSelector) {
      setShowMotorSelector(false);
      setMotorClaimType(null);
      setFormData(prev => ({ ...prev, insuranceType: '' }));
      return;
    }
    
    if (step > 1) {
      setStep(step - 1);
    } else {
      onCancel();
    }
  };

  const handleMotorSelection = (type: 'report' | 'claim') => {
    setMotorClaimType(type);
    setShowMotorSelector(false);
    setStep(2);
  };

  const getDocumentRequirements = (type: string) => {
    const requirements: { [key: string]: string[] } = {
      health: [
        'Hospital bills/receipts',
        'Medical reports',
        'Doctor\'s prescription',
        'Diagnostic test results',
        'Discharge summary'
      ],
      motor: [
        'Police report',
        'Photos of vehicle damage',
        'Driver\'s license',
        'Vehicle registration',
        'Witness statements (if any)'
      ],
      livestock: [
        'Farm photos',
        'Mortality records',
        'Veterinary certificates',
        'Farmer ID',
        'Purchase records',
        'Vaccination records',
        'Farm registration'
      ],
      home: [
        'Photos of damage',
        'Police report (if applicable)',
        'Repair estimates',
        'Proof of ownership',
        'Incident report'
      ]
    };
    return requirements[type] || ['Supporting documents', 'Proof of incident', 'Any relevant receipts'];
  };

  // Show Motor Selector if motor insurance is selected
  if (showMotorSelector) {
    return (
      <WebMotorClaimSelector
        onSelectReport={() => handleMotorSelection('report')}
        onSelectClaim={() => handleMotorSelection('claim')}
        onBack={() => {
          setShowMotorSelector(false);
          setFormData(prev => ({ ...prev, insuranceType: '' }));
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-900">File New Claim</h1>
          <button
            onClick={onCancel}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            {['Insurance Type', 'Policy Details', 'Claim Information', 'Upload Documents'].map((label, idx) => (
              <div key={idx} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step > idx + 1 ? 'bg-[#00A878] text-white' :
                  step === idx + 1 ? 'bg-[#0052CC] text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {step > idx + 1 ? <CheckCircle className="w-5 h-5" /> : idx + 1}
                </div>
                <span className={`ml-2 text-sm ${step === idx + 1 ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                  {label}
                </span>
                {idx < 3 && <div className="w-12 h-0.5 bg-gray-200 mx-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto">
          {/* Step 1: Insurance Type Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Insurance Type</h2>
              <p className="text-gray-600 mb-8">Choose the type of insurance claim you want to file</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {insuranceTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setFormData(prev => ({ ...prev, insuranceType: type.id }))}
                    className={`bg-white rounded-xl p-6 cursor-pointer transition-all ${
                      formData.insuranceType === type.id
                        ? 'ring-4 ring-[#00A878] shadow-lg'
                        : 'hover:shadow-lg border border-gray-200'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4`}>
                      <type.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{type.name}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Policy Details */}
          {step === 2 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Policy Details</h2>
              <p className="text-gray-600 mb-8">Enter your insurance policy information</p>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="policyHolder">Policy Holder Name</Label>
                  <Input
                    id="policyHolder"
                    type="text"
                    placeholder="Enter full name as on policy"
                    value={formData.policyHolder}
                    onChange={(e) => setFormData(prev => ({ ...prev, policyHolder: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="policyNumber">Policy Number</Label>
                  <Input
                    id="policyNumber"
                    type="text"
                    placeholder="e.g., POL-NG-2024-8847"
                    value={formData.policyNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, policyNumber: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="incidentDate">Date of Incident</Label>
                  <Input
                    id="incidentDate"
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, incidentDate: e.target.value }))}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Claim Information */}
          {step === 3 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Claim Information</h2>
              <p className="text-gray-600 mb-8">Provide details about your claim</p>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="claimAmount">Claim Amount (₦)</Label>
                  <Input
                    id="claimAmount"
                    type="text"
                    placeholder="e.g., 450,000"
                    value={formData.claimAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, claimAmount: e.target.value }))}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">Enter the total amount you are claiming</p>
                </div>

                <div>
                  <Label htmlFor="description">Description of Incident</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of what happened..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="mt-2 min-h-[150px]"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Include date, time, location, and circumstances of the incident
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Upload Documents */}
          {step === 4 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Documents</h2>
              <p className="text-gray-600 mb-8">Upload all required supporting documents</p>
              
              {/* Required Documents List */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#0052CC]" />
                  Required Documents:
                </h3>
                <ul className="space-y-1 ml-7">
                  {getDocumentRequirements(formData.insuranceType).map((doc, idx) => (
                    <li key={idx} className="text-sm text-gray-700">• {doc}</li>
                  ))}
                </ul>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-900 font-medium mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Supports PDF, JPG, PNG (Max 10MB per file)
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Choose Files
                  </Button>
                </label>
              </div>

              {/* Uploaded Files */}
              {formData.documents.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Uploaded Files ({formData.documents.length})</h3>
                  {formData.documents.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#0052CC]" />
                        <div>
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(idx)}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {step === 1 ? 'Cancel' : 'Previous'}
          </Button>
          
          <Button
            onClick={handleNext}
            className="flex items-center gap-2"
            style={{ backgroundColor: '#00A878' }}
            disabled={
              (step === 1 && !formData.insuranceType) ||
              (step === 2 && (!formData.policyHolder || !formData.policyNumber || !formData.incidentDate)) ||
              (step === 3 && (!formData.claimAmount || !formData.description)) ||
              (step === 4 && formData.documents.length === 0)
            }
          >
            {step === 4 ? 'Submit Claim' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}