"use client";
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { 
  Search, 
  Calendar,
  User,
  Bot,
  Shield,
  Link,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Filter,
  Download,
  Eye
} from 'lucide-react';
import { ClaimItem } from '../AdminDashboard';

interface AuditLogProps {
  claims: ClaimItem[];
}

interface AuditEntry {
  id: string;
  claimId: string;
  action: string;
  actor: 'system' | 'ai' | 'reviewer';
  actorName: string;
  timestamp: string;
  details: string;
  txHash?: string;
  status: 'success' | 'warning' | 'error';
  metadata?: Record<string, any>;
}

const mockAuditEntries: AuditEntry[] = [
  {
    id: 'audit1',
    claimId: 'CLM12345',
    action: 'Claim Submitted',
    actor: 'system',
    actorName: 'SafeClaim API',
    timestamp: '2025-09-14 14:32:10',
    details: 'New claim submitted by Aditi Sharma for motor insurance',
    status: 'success',
    metadata: { ip: '192.168.1.100', userAgent: 'SafeClaim Mobile v2.1.0' }
  },
  {
    id: 'audit2',
    claimId: 'CLM12345',
    action: 'Document Upload',
    actor: 'system',
    actorName: 'Upload Service',
    timestamp: '2025-09-14 14:32:45',
    details: '3 documents uploaded successfully',
    status: 'success',
    metadata: { fileCount: 3, totalSize: '1.2MB' }
  },
  {
    id: 'audit3',
    claimId: 'CLM12345',
    action: 'AI Analysis Started',
    actor: 'ai',
    actorName: 'Fraud Detection Engine',
    timestamp: '2025-09-14 14:33:00',
    details: 'Automated verification pipeline initiated',
    status: 'success'
  },
  {
    id: 'audit4',
    claimId: 'CLM12345',
    action: 'OCR Processing',
    actor: 'ai',
    actorName: 'OCR Service',
    timestamp: '2025-09-14 14:33:15',
    details: 'Text extraction completed with 94% confidence',
    status: 'success',
    metadata: { confidence: 94, fieldsExtracted: 7 }
  },
  {
    id: 'audit5',
    claimId: 'CLM12345',
    action: 'Image Forensics',
    actor: 'ai',
    actorName: 'Forensics Engine',
    timestamp: '2025-09-14 14:33:30',
    details: 'Tamper detection analysis completed',
    status: 'warning',
    metadata: { tamperScore: 78, regionsAnalyzed: 5 }
  },
  {
    id: 'audit6',
    claimId: 'CLM12345',
    action: 'Fraud Score Calculated',
    actor: 'ai',
    actorName: 'Risk Assessment',
    timestamp: '2025-09-14 14:34:00',
    details: 'Final fraud score: 45/100 - Manual review required',
    status: 'warning',
    metadata: { fraudScore: 45, riskLevel: 'medium' }
  },
  {
    id: 'audit8',
    claimId: 'CLM12345',
    action: 'Assigned for Review',
    actor: 'system',
    actorName: 'Workflow Engine',
    timestamp: '2025-09-14 14:35:00',
    details: 'Claim assigned to Reviewer A for manual verification',
    status: 'success',
    metadata: { assignedTo: 'Reviewer A', priority: 'medium' }
  },
  {
    id: 'audit9',
    claimId: 'CLM12346',
    action: 'Auto Approved',
    actor: 'ai',
    actorName: 'Smart Contract',
    timestamp: '2025-09-14 13:16:30',
    details: 'Claim auto-approved with fraud score 18/100',
    status: 'success',
    metadata: { fraudScore: 18, autoApproval: true }
  },
  {
    id: 'audit10',
    claimId: 'CLM12346',
    action: 'Payout Initiated',
    actor: 'system',
    actorName: 'Payment Service',
    timestamp: '2025-09-14 13:17:00',
    details: 'Payment of ₹75,000 initiated to beneficiary account',
    status: 'success',
    metadata: { amount: 75000, paymentMethod: 'NEFT', referenceId: 'PAY123456' }
  }
];

export function AuditLog({ claims }: AuditLogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActor, setFilterActor] = useState<'all' | 'system' | 'ai' | 'reviewer'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'success' | 'warning' | 'error'>('all');
  const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null);

  const getActorIcon = (actor: AuditEntry['actor']) => {
    switch (actor) {
      case 'system':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'ai':
        return <Bot className="w-4 h-4 text-purple-600" />;
      case 'reviewer':
        return <User className="w-4 h-4 text-green-600" />;
    }
  };

  const getStatusIcon = (status: AuditEntry['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusVariant = (status: AuditEntry['status']) => {
    switch (status) {
      case 'success':
        return 'default';
      case 'warning':
        return 'secondary';
      case 'error':
        return 'destructive';
    }
  };

  const filteredEntries = mockAuditEntries
    .filter(entry => {
      const matchesSearch = searchTerm === '' || 
        entry.claimId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.details.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesActor = filterActor === 'all' || entry.actor === filterActor;
      const matchesStatus = filterStatus === 'all' || entry.status === filterStatus;
      
      return matchesSearch && matchesActor && matchesStatus;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Audit Log</h2>
            <p className="text-sm text-gray-600">Complete trail of all system activities</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Log
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search audit entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          <select
            value={filterActor}
            onChange={(e) => setFilterActor(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">All Actors</option>
            <option value="system">System</option>
            <option value="ai">AI Engine</option>
            <option value="reviewer">Reviewer</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">System Events</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {mockAuditEntries.filter(e => e.actor === 'system').length}
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">AI Actions</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {mockAuditEntries.filter(e => e.actor === 'ai').length}
            </p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium">Warnings</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600">
              {mockAuditEntries.filter(e => e.status === 'warning').length}
            </p>
          </div>
        </div>
      </Card>

      {/* Audit Table */}
      <Card className="p-6">
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Claim ID</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <div>
                        <p>{new Date(entry.timestamp).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(entry.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className="font-mono text-sm">{entry.claimId}</span>
                  </TableCell>
                  
                  <TableCell>
                    <span className="font-medium">{entry.action}</span>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getActorIcon(entry.actor)}
                      <div>
                        <p className="text-sm font-medium capitalize">{entry.actor}</p>
                        <p className="text-xs text-gray-500">{entry.actorName}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant={getStatusVariant(entry.status)} className="flex items-center gap-1 w-fit">
                      {getStatusIcon(entry.status)}
                      {entry.status}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <p className="text-sm max-w-xs truncate">{entry.details}</p>
                    {entry.txHash && (
                      <p className="text-xs text-blue-600 font-mono mt-1">
                        TX: {entry.txHash.slice(0, 10)}...
                      </p>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedEntry(entry)}
                      className="p-2"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <p>Showing {filteredEntries.length} of {mockAuditEntries.length} entries</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span>Success</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-yellow-600" />
              <span>Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-3 h-3 text-red-600" />
              <span>Error</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Entry Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Audit Entry Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedEntry(null)}
                  className="p-2"
                >
                  ×
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Claim ID</p>
                    <p className="font-mono">{selectedEntry.claimId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Action</p>
                    <p className="font-medium">{selectedEntry.action}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Actor</p>
                    <p className="flex items-center gap-2">
                      {getActorIcon(selectedEntry.actor)}
                      {selectedEntry.actorName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge variant={getStatusVariant(selectedEntry.status)} className="flex items-center gap-1 w-fit">
                      {getStatusIcon(selectedEntry.status)}
                      {selectedEntry.status}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Timestamp</p>
                    <p className="font-mono">{selectedEntry.timestamp}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Details</p>
                  <p className="p-3 bg-gray-50 rounded-lg">{selectedEntry.details}</p>
                </div>

                {selectedEntry.txHash && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Transaction Hash</p>
                    <p className="font-mono text-sm p-3 bg-blue-50 rounded-lg break-all">
                      {selectedEntry.txHash}
                    </p>
                  </div>
                )}

                {selectedEntry.metadata && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Metadata</p>
                    <pre className="text-xs p-3 bg-gray-50 rounded-lg overflow-x-auto">
                      {JSON.stringify(selectedEntry.metadata, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}