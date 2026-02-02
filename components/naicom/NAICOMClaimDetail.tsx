"use client";
import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowLeft, Eye, MessageSquare, FileText, CheckCircle } from 'lucide-react';
import { NAICOMScreen, EscalatedClaim } from '../NAICOMDashboard';

interface NAICOMClaimDetailProps {
  claim: EscalatedClaim;
  onNavigate: (screen: NAICOMScreen) => void;
  onBack: () => void;
}

export function NAICOMClaimDetail({ claim, onNavigate, onBack }: NAICOMClaimDetailProps) {
  const timeline = [
    { date: claim.submittedDate, event: 'Claim Submitted', status: 'complete' },
    { date: '2025-11-21', event: 'AI Verification Complete', status: 'complete' },
    { date: '2025-11-22', event: 'Insurer Notified', status: 'complete' },
    { date: '2025-11-25', event: 'Escalated to NAICOM', status: 'complete' },
    { date: 'Pending', event: 'Resolution', status: 'pending' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Queue
          </Button>
          <h1 className="text-2xl text-gray-900">Claim Details: {claim.claimId}</h1>
          <Badge variant={claim.daysDelayed > 30 ? 'destructive' : 'secondary'}>
            {claim.daysDelayed} days delayed
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Timeline */}
          <Card className="col-span-1 p-6">
            <h3 className="text-lg text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-4">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'complete' ? 'bg-[#00A878]' : 'bg-gray-300'
                    }`}></div>
                    {idx < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-medium text-gray-900">{item.event}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 30-day countdown */}
            <div className="mt-6 p-4 bg-red-50 rounded-lg text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{claim.daysDelayed}</div>
              <p className="text-sm text-red-700">Days Since Submission</p>
              <p className="text-xs text-gray-600 mt-2">Legal limit: 30 days</p>
            </div>
          </Card>

          {/* Claim Details */}
          <Card className="col-span-2 p-6">
            <h3 className="text-lg text-gray-900 mb-6">Claim Information</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm text-gray-600 mb-4">User Details</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-sm text-gray-900">{claim.userData.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone (Masked)</p>
                    <p className="text-sm text-gray-900">{claim.userPhone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">ClaimAm ID</p>
                    <p className="text-sm text-gray-900">{claim.userData.uniqueId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Policy Number</p>
                    <p className="text-sm text-gray-900">{claim.userData.policyNumber}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-600 mb-4">Claim Details</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Claim Amount</p>
                    <p className="text-lg font-semibold text-gray-900">{claim.claimAmount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Accident Type</p>
                    <p className="text-sm text-gray-900">{claim.accidentType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Region</p>
                    <p className="text-sm text-gray-900">{claim.region}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fraud Score</p>
                    <Badge variant={claim.fraudScore < 30 ? 'default' : 'destructive'}>
                      {claim.fraudScore}/100 - {claim.fraudScore < 30 ? 'Low Risk' : 'High Risk'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-4 gap-3 mt-8">
              <Button
                variant="outline"
                onClick={() => onNavigate('evidence')}
                className="flex flex-col h-auto py-4"
              >
                <Eye className="w-6 h-6 mb-2" />
                <span className="text-xs">View Evidence</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('communication')}
                className="flex flex-col h-auto py-4"
              >
                <MessageSquare className="w-6 h-6 mb-2" />
                <span className="text-xs">Communication Log</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('resolution')}
                className="flex flex-col h-auto py-4"
              >
                <CheckCircle className="w-6 h-6 mb-2" />
                <span className="text-xs">Resolve Claim</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col h-auto py-4"
              >
                <FileText className="w-6 h-6 mb-2" />
                <span className="text-xs">View Documents</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}