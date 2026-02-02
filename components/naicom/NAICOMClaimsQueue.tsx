"use client";
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { NAICOMScreen, EscalatedClaim } from '../NAICOMDashboard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface NAICOMClaimsQueueProps {
  onNavigate: (screen: NAICOMScreen) => void;
  onViewClaim: (claim: EscalatedClaim) => void;
}

const mockClaims: EscalatedClaim[] = [
  {
    id: 'ESC001',
    claimId: 'CLM-23456',
    userPhone: '0803***4521',
    insurer: 'Leadway Insurance',
    submittedDate: '2025-11-20',
    daysDelayed: 35,
    fraudScore: 18,
    status: 'pending',
    claimAmount: '₦145,000',
    accidentType: 'Motor - Collision',
    region: 'Lagos',
    userData: {
      name: 'Adebayo Oluwole',
      uniqueId: 'CR-2024-8821',
      policyNumber: 'POL-NG-2024-5521'
    }
  },
  {
    id: 'ESC002',
    claimId: 'CLM-23457',
    userPhone: '0901***7734',
    insurer: 'AIICO Insurance',
    submittedDate: '2025-11-21',
    daysDelayed: 42,
    fraudScore: 22,
    status: 'investigating',
    claimAmount: '₦280,000',
    accidentType: 'Health - Surgery',
    region: 'Abuja',
    userData: {
      name: 'Ngozi Eze',
      uniqueId: 'CR-2024-8822',
      policyNumber: 'POL-NG-2024-5522'
    }
  },
  {
    id: 'ESC003',
    claimId: 'CLM-23458',
    userPhone: '0813***9012',
    insurer: 'AXA Mansard',
    submittedDate: '2025-11-22',
    daysDelayed: 38,
    fraudScore: 15,
    status: 'pending',
    claimAmount: '₦95,000',
    accidentType: 'Home - Fire',
    region: 'Port Harcourt',
    userData: {
      name: 'Ibrahim Mohammed',
      uniqueId: 'CR-2024-8823',
      policyNumber: 'POL-NG-2024-5523'
    }
  }
];

export function NAICOMClaimsQueue({ onNavigate, onViewClaim }: NAICOMClaimsQueueProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'investigating' | 'resolved'>('all');

  const filteredClaims = mockClaims.filter(claim => {
    const matchesSearch = claim.claimId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.userPhone.includes(searchTerm) ||
                         claim.insurer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => onNavigate('overview')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl text-gray-900">Escalated Claims Queue</h1>
        </div>

        <Card className="p-6">
          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by Claim ID, Phone, or Insurer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('pending')}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === 'investigating' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('investigating')}
              >
                Investigating
              </Button>
              <Button
                variant={statusFilter === 'resolved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('resolved')}
              >
                Resolved
              </Button>
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim ID</TableHead>
                <TableHead>User Phone</TableHead>
                <TableHead>Insurer</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Days Delayed</TableHead>
                <TableHead>Fraud Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClaims.map((claim) => (
                <TableRow key={claim.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell className="font-medium">{claim.claimId}</TableCell>
                  <TableCell>{claim.userPhone}</TableCell>
                  <TableCell>{claim.insurer}</TableCell>
                  <TableCell>{claim.submittedDate}</TableCell>
                  <TableCell>
                    <Badge variant={claim.daysDelayed > 30 ? 'destructive' : 'secondary'}>
                      {claim.daysDelayed} days
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={claim.fraudScore < 30 ? 'default' : 'destructive'}>
                      {claim.fraudScore}/100
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={claim.status === 'pending' ? 'secondary' : 'default'}>
                      {claim.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={() => onViewClaim(claim)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
