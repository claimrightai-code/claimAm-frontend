"use client";
import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ArrowLeft, Send } from 'lucide-react';
import { EscalatedClaim } from '../NAICOMDashboard';

interface NAICOMCommunicationLogProps {
  claim: EscalatedClaim;
  onBack: () => void;
}

export function NAICOMCommunicationLog({ claim, onBack }: NAICOMCommunicationLogProps) {
  const messages = [
    { date: '2025-11-20', sender: 'System', message: 'Claim submitted', read: true },
    { date: '2025-11-21', sender: 'System', message: 'AI verification complete', read: true },
    { date: '2025-11-22', sender: 'NAICOM', message: 'Notice sent to ' + claim.insurer, read: true },
    { date: '2025-11-25', sender: 'Insurer', message: 'Requesting additional documents', read: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <Button variant="outline" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Claim Details
        </Button>
        <Card className="p-6">
          <h2 className="text-2xl text-gray-900 mb-6">Communication Log</h2>
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{msg.sender}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{msg.date}</span>
                    {msg.read && <span className="text-xs text-[#00A878]">✓ Read</span>}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{msg.message}</p>
              </div>
            ))}
          </div>
          <Button className="w-full mt-6" style={{ backgroundColor: '#0057B7' }}>
            <Send className="w-4 h-4 mr-2" />
            Send NAICOM Notice
          </Button>
        </Card>
      </div>
    </div>
  );
}
