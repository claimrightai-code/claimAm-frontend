"use client";
import React, { useState } from 'react';
import { ClaimsQueue } from './admin/ClaimsQueue';
import { ClaimReview } from './admin/ClaimReview';
import { AuditLog } from './admin/AuditLog';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ClaimAmLogo } from './ClaimAmLogo';
import { 
  LayoutDashboard, 
  FileText, 
  Shield, 
  Clock, 
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  Download
} from 'lucide-react';

export type AdminScreen = 'dashboard' | 'claim-review' | 'audit-log';

export interface ClaimItem {
  id: string;
  type: string;
  policyHolder: string;
  policyNumber: string;
  fraudScore: number;
  status: 'pending' | 'approved' | 'flagged' | 'rejected';
  submittedAt: string;
  amount: string;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high';
}

const mockClaims: ClaimItem[] = [
  {
    id: 'CLM12345',
    type: 'Motor Insurance',
    policyHolder: 'Adebayo Oluwaseun',
    policyNumber: 'POL-NG-2024-8745',
    fraudScore: 45,
    status: 'flagged',
    submittedAt: '2025-11-23 14:32:10',
    amount: '₦1,200,000',
    assignedTo: 'Reviewer A',
    priority: 'medium'
  },
  {
    id: 'CLM12346',
    type: 'Health Insurance',
    policyHolder: 'Ngozi Eze',
    policyNumber: 'POL-NG-2024-9876',
    fraudScore: 18,
    status: 'approved',
    submittedAt: '2025-11-22 13:15:22',
    amount: '₦750,000',
    priority: 'low'
  },
  {
    id: 'CLM12347',
    type: 'Crop Insurance',
    policyHolder: 'Ibrahim Mohammed',
    policyNumber: 'POL-NG-2024-5432',
    fraudScore: 78,
    status: 'flagged',
    submittedAt: '2025-11-21 12:45:15',
    amount: '₦3,500,000',
    assignedTo: 'Reviewer B',
    priority: 'high'
  },
  {
    id: 'CLM12348',
    type: 'Travel Insurance',
    policyHolder: 'Chidinma Okoro',
    policyNumber: 'POL-NG-2024-1122',
    fraudScore: 25,
    status: 'approved',
    submittedAt: '2025-11-20 11:30:45',
    amount: '₦450,000',
    priority: 'low'
  },
  {
    id: 'CLM12349',
    type: 'Home Insurance',
    policyHolder: 'Yusuf Bello',
    policyNumber: 'POL-NG-2024-7788',
    fraudScore: 92,
    status: 'rejected',
    submittedAt: '2025-11-25 10:15:30',
    amount: '₦8,500,000',
    assignedTo: 'Reviewer C',
    priority: 'high'
  }
];

export function AdminDashboard() {
  const [currentScreen, setCurrentScreen] = useState<AdminScreen>('dashboard');
  const [selectedClaim, setSelectedClaim] = useState<ClaimItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'flagged' | 'approved' | 'rejected'>('all');

  const stats = {
    totalClaims: mockClaims.length,
    pendingReview: mockClaims.filter(c => c.status === 'flagged').length,
    autoApproved: mockClaims.filter(c => c.status === 'approved').length,
    avgFraudScore: Math.round(mockClaims.reduce((sum, claim) => sum + claim.fraudScore, 0) / mockClaims.length),
    highRiskClaims: mockClaims.filter(c => c.fraudScore > 70).length
  };

  const filteredClaims = filter === 'all' 
    ? mockClaims 
    : mockClaims.filter(claim => claim.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ClaimAmLogo size={80} withBackground={true} />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">ClaimAm Dashboard</h1>
              <p className="text-sm text-gray-600">Accessible, Fast, Trust Rebuilding AI-USSD powered Insurance claims</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Live Updates
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mt-4">
          <Button
            variant={currentScreen === 'dashboard' ? 'default' : 'ghost'}
            onClick={() => setCurrentScreen('dashboard')}
            className="flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Button>
          <Button
            variant={currentScreen === 'audit-log' ? 'default' : 'ghost'}
            onClick={() => setCurrentScreen('audit-log')}
            className="flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Audit Log
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {currentScreen === 'dashboard' && !selectedClaim && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Claims</p>
                    <p className="text-2xl font-semibold">{stats.totalClaims}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pending Review</p>
                    <p className="text-2xl font-semibold">{stats.pendingReview}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Auto Approved</p>
                    <p className="text-2xl font-semibold">{stats.autoApproved}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Risk Score</p>
                    <p className="text-2xl font-semibold">{stats.avgFraudScore}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Shield className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">High Risk</p>
                    <p className="text-2xl font-semibold">{stats.highRiskClaims}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Claims Queue */}
            <ClaimsQueue
              claims={filteredClaims}
              onSelectClaim={(claim) => {
                setSelectedClaim(claim);
                setCurrentScreen('claim-review');
              }}
              filter={filter}
              onFilterChange={setFilter}
            />
          </>
        )}

        {currentScreen === 'claim-review' && selectedClaim && (
          <ClaimReview
            claim={selectedClaim}
            onBack={() => {
              setSelectedClaim(null);
              setCurrentScreen('dashboard');
            }}
            onUpdateClaim={(updatedClaim) => {
              setSelectedClaim(updatedClaim);
              // Update the claim in the list
            }}
          />
        )}

        {currentScreen === 'audit-log' && (
          <AuditLog
            claims={mockClaims}
          />
        )}
      </div>
    </div>
  );
}