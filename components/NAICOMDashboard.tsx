"use client";
import React, { useState } from 'react';
import { NAICOMLogin } from './naicom/NAICOMLogin';
import { NAICOMOverview } from './naicom/NAICOMOverview';
import { NAICOMClaimsQueue } from './naicom/NAICOMClaimsQueue';
import { NAICOMClaimDetail } from './naicom/NAICOMClaimDetail';
import { NAICOMEvidenceViewer } from './naicom/NAICOMEvidenceViewer';
import { NAICOMCommunicationLog } from './naicom/NAICOMCommunicationLog';
import { NAICOMResolutionPanel } from './naicom/NAICOMResolutionPanel';
import { NAICOMAnalytics } from './naicom/NAICOMAnalytics';
import { NAICOMComplianceReport } from './naicom/NAICOMComplianceReport';

export type NAICOMScreen = 
  | 'login' | 'overview' | 'queue' | 'detail' | 'evidence' 
  | 'communication' | 'resolution' | 'analytics' | 'compliance';

export interface EscalatedClaim {
  id: string;
  claimId: string;
  userPhone: string;
  insurer: string;
  submittedDate: string;
  daysDelayed: number;
  fraudScore: number;
  status: 'pending' | 'investigating' | 'resolved' | 'rejected';
  claimAmount: string;
  accidentType: string;
  region: string;
  userData: {
    name: string;
    uniqueId: string;
    policyNumber: string;
  };
}

export function NAICOMDashboard() {
  const [currentScreen, setCurrentScreen] = useState<NAICOMScreen>('login');
  const [selectedClaim, setSelectedClaim] = useState<EscalatedClaim | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen('overview');
  };

  const handleViewClaim = (claim: EscalatedClaim) => {
    setSelectedClaim(claim);
    setCurrentScreen('detail');
  };

  if (!isAuthenticated) {
    return <NAICOMLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 'overview' && (
        <NAICOMOverview onNavigate={setCurrentScreen} onViewClaim={handleViewClaim} />
      )}
      {currentScreen === 'queue' && (
        <NAICOMClaimsQueue onNavigate={setCurrentScreen} onViewClaim={handleViewClaim} />
      )}
      {currentScreen === 'detail' && selectedClaim && (
        <NAICOMClaimDetail 
          claim={selectedClaim} 
          onNavigate={setCurrentScreen}
          onBack={() => setCurrentScreen('queue')}
        />
      )}
      {currentScreen === 'evidence' && selectedClaim && (
        <NAICOMEvidenceViewer 
          claim={selectedClaim}
          onBack={() => setCurrentScreen('detail')}
        />
      )}
      {currentScreen === 'communication' && selectedClaim && (
        <NAICOMCommunicationLog 
          claim={selectedClaim}
          onBack={() => setCurrentScreen('detail')}
        />
      )}
      {currentScreen === 'resolution' && selectedClaim && (
        <NAICOMResolutionPanel 
          claim={selectedClaim}
          onComplete={() => setCurrentScreen('queue')}
          onBack={() => setCurrentScreen('detail')}
        />
      )}
      {currentScreen === 'analytics' && (
        <NAICOMAnalytics onNavigate={setCurrentScreen} />
      )}
      {currentScreen === 'compliance' && (
        <NAICOMComplianceReport onBack={() => setCurrentScreen('overview')} />
      )}
    </div>
  );
}
