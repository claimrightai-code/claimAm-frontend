"use client";
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft, CheckCircle, XCircle, FileText, RefreshCw } from 'lucide-react';
import { EscalatedClaim } from '../NAICOMDashboard';

interface NAICOMResolutionPanelProps {
  claim: EscalatedClaim;
  onComplete: () => void;
  onBack: () => void;
}

export function NAICOMResolutionPanel({ claim, onComplete, onBack }: NAICOMResolutionPanelProps) {
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <Button variant="outline" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Claim Details
        </Button>
        <Card className="p-8">
          <h2 className="text-2xl text-gray-900 mb-6">Resolution Panel</h2>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-sm text-gray-600 mb-1">Claim ID</p>
              <p className="text-lg font-medium">{claim.claimId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Amount</p>
              <p className="text-lg font-medium">{claim.claimAmount}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <Button className="h-24 flex flex-col gap-2" style={{ backgroundColor: '#00A878' }}>
              <CheckCircle className="w-8 h-8" />
              Approve Payout
            </Button>
            <Button variant="destructive" className="h-24 flex flex-col gap-2">
              <XCircle className="w-8 h-8" />
              Reject Claim
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2">
              <FileText className="w-8 h-8" />
              Request Evidence
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2">
              <RefreshCw className="w-8 h-8" />
              Re-assign to Insurer
            </Button>
          </div>

          {/* Resolution Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resolution Reason
              </label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="insurer-delay">Insurer Delay</SelectItem>
                  <SelectItem value="valid-claim">Valid Claim - Approve</SelectItem>
                  <SelectItem value="insufficient-evidence">Insufficient Evidence</SelectItem>
                  <SelectItem value="fraud-detected">Fraud Detected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add resolution notes..."
                rows={4}
              />
            </div>

            <Button
              onClick={onComplete}
              className="w-full h-12"
              style={{ backgroundColor: '#0057B7' }}
            >
              Submit Resolution
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
