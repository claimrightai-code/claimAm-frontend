"use client";
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { 
  ArrowLeft,
  User,
  FileText,
  Shield,
  TrendingUp,
  Link,
  Zap,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Download,
  Edit,
  Save,
  MessageSquare,
  Clock,
  CreditCard,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { ClaimItem } from '../AdminDashboard';
// import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ClaimReviewProps {
  claim: ClaimItem;
  onBack: () => void;
  onUpdateClaim: (claim: ClaimItem) => void;
}

const mockExtractedData = {
  'Policy Number': 'INS-IN-2024-8745',
  'Date': '12 Aug 2025',
  'Amount': '₹1,20,000',
  'Hospital': 'Apollo Hospital',
  'Patient Name': 'Aditi Sharma',
  'Doctor': 'Dr. Rajesh Mehta',
  'Diagnosis': 'Acute Appendicitis'
};

const mockForensicsData = {
  tamperScore: 78,
  confidence: 92,
  regions: [
    { type: 'suspicious', area: 'Document edges', confidence: 85 },
    { type: 'clean', area: 'Text regions', confidence: 95 },
    { type: 'suspicious', area: 'Signature area', confidence: 72 }
  ]
};

const mockDocuments = [
  {
    id: 'doc1',
    name: 'hospital_bill_apollo.pdf',
    type: 'Hospital Bill',
    size: '245 KB',
    url: 'https://images.unsplash.com/photo-1710503913397-df9bfea7e50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdW1lbnQlMjBob3NwaXRhbCUyMGJpbGx8ZW58MXx8fHwxNTc4NjQ4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'verified'
  },
  {
    id: 'doc2',
    name: 'discharge_summary.pdf',
    type: 'Discharge Summary',
    size: '180 KB',
    url: 'https://images.unsplash.com/photo-1584291527908-033f4d6542c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmF1ZCUyMGRldGVjdGlvbiUyMGFuYWx5c2lzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1Nzg2NTIyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'flagged'
  },
  {
    id: 'doc3',
    name: 'prescription.jpg',
    type: 'Prescription',
    size: '95 KB',
    url: 'https://images.unsplash.com/photo-1710503913397-df9bfea7e50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdW1lbnQlMjBob3NwaXRhbCUyMGJpbGx8ZW58MXx8fHwxNTc4NjQ4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'verified'
  }
];

const mockBlockchainData = {
  txHash: '0xA3B2C1D4E5F678901234567890ABCDEF',
  timestamp: '2025-09-14 14:32:10 IST',
  blockNumber: 18234567,
  gasUsed: '21,000',
  status: 'confirmed'
};

const scoreBreakdown = [
  { label: 'Document Authenticity', weight: 35, score: 28, color: 'bg-red-500' },
  { label: 'Media Forensics', weight: 25, score: 20, color: 'bg-yellow-500' },
  { label: 'Claim History', weight: 20, score: 18, color: 'bg-green-500' },
  { label: 'IoT Cross-check', weight: 20, score: 16, color: 'bg-blue-500' }
];

export function ClaimReview({ claim, onBack, onUpdateClaim }: ClaimReviewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'forensics'>('overview');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [notes, setNotes] = useState('');
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);

  const handleApprove = () => {
    const updatedClaim = { ...claim, status: 'approved' as const };
    onUpdateClaim(updatedClaim);
    // Simulate approval process
    setTimeout(() => {
      alert('Claim approved and payout initiated!');
    }, 1000);
  };

  const handleReject = () => {
    const updatedClaim = { ...claim, status: 'rejected' as const };
    onUpdateClaim(updatedClaim);
    alert('Claim rejected. Notification sent to policy holder.');
  };

  const getFraudScoreColor = (score: number) => {
    if (score < 30) return 'text-green-600';
    if (score < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Left Panel - Claim Info */}
      <div className="space-y-6">
        {/* Header */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="text-xl font-semibold">Claim Review</h2>
              <p className="text-sm text-gray-600">{claim.id}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-sm">
                {claim.type}
              </Badge>
              <Badge 
                variant={claim.status === 'approved' ? 'default' : 'destructive'}
                className="capitalize"
              >
                {claim.status}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="font-medium">{claim.policyHolder}</p>
                  <p className="text-sm text-gray-600">{claim.policyNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="font-medium">{claim.amount}</p>
                  <p className="text-sm text-gray-600">Claim Amount</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="font-medium">{new Date(claim.submittedAt).toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Submitted</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="font-medium">Mumbai, Maharashtra</p>
                  <p className="text-sm text-gray-600">Location</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="font-medium">+91 98765 43210</p>
                  <p className="text-sm text-gray-600">Contact</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="font-medium">aditi.sharma@email.com</p>
                  <p className="text-sm text-gray-600">Email</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Risk Assessment */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Risk Assessment
          </h3>

          <div className="text-center mb-6">
            <div className="relative w-24 h-24 mx-auto mb-3">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-300"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={getFraudScoreColor(claim.fraudScore)}
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={`${claim.fraudScore} 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{claim.fraudScore}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {claim.fraudScore < 30 ? 'Low Risk' : claim.fraudScore < 60 ? 'Medium Risk' : 'High Risk'}
            </p>
          </div>

          <div className="space-y-3">
            {scoreBreakdown.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.label}</span>
                  <span>{item.score}/{item.weight}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full`}
                    style={{ width: `${(item.score / item.weight) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Timeline */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Timeline</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">Claim Submitted</p>
                <p className="text-xs text-gray-600">14:32 - 09/14/2025</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">AI Analysis Complete</p>
                <p className="text-xs text-gray-600">14:35 - 09/14/2025</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">Flagged for Review</p>
                <p className="text-xs text-gray-600">14:36 - 09/14/2025</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">Assigned to Reviewer</p>
                <p className="text-xs text-gray-600">14:40 - 09/14/2025</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Center Panel - Details */}
      <div className="lg:col-span-2 space-y-6">
        {/* Tabs */}
        <Card className="p-6">
          <div className="flex gap-4 mb-6">
            {[
              { id: 'overview', label: 'Overview', icon: FileText },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'forensics', label: 'Forensics', icon: Shield }
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeTab === id ? 'default' : 'outline'}
                onClick={() => setActiveTab(id as any)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Extracted Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(mockExtractedData).map(([key, value]) => (
                    <div key={key} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">{key}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Smart Contract Analysis</h4>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Rule Engine Decision</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Motor Insurance - Medium damage claim with partial verification issues.
                    Recommended action: Manual review required.
                  </p>
                  <div className="mt-3 text-xs text-gray-600">
                    <p>Rule ID: MTR-2024-003</p>
                    <p>Confidence: 85%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockDocuments.map((doc) => (
                  <Card 
                    key={doc.id} 
                    className={`p-4 cursor-pointer transition-all ${
                      selectedDocument === doc.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedDocument(selectedDocument === doc.id ? null : doc.id)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{doc.type}</p>
                        <p className="text-xs text-gray-600">{doc.name}</p>
                      </div>
                      <Badge 
                        variant={doc.status === 'verified' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {doc.status === 'verified' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 mr-1" />
                        )}
                        {doc.status}
                      </Badge>
                    </div>
                    
                    {/* <ImageWithFallback
                      src={doc.url}
                      alt={doc.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    /> */}
                    
                    <div className="flex justify-between items-center text-xs text-gray-600">
                      <span>{doc.size}</span>
                      <Button variant="ghost" size="sm" className="p-1">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'forensics' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Image Forensics Analysis</h4>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">Tamper Detection Score</span>
                    <Badge variant="secondary">{mockForensicsData.tamperScore}%</Badge>
                  </div>
                  <Progress value={mockForensicsData.tamperScore} className="mb-3" />
                  <p className="text-sm text-gray-700">
                    Moderate tampering detected. Manual verification recommended.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Forensic Regions</h4>
                <div className="space-y-3">
                  {mockForensicsData.regions.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {region.type === 'suspicious' ? (
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                        <span className="text-sm">{region.area}</span>
                      </div>
                      <Badge variant={region.type === 'suspicious' ? 'destructive' : 'default'}>
                        {region.confidence}% confidence
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Actions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Review Actions</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditMode(!editMode)}
            >
              <Edit className="w-4 h-4 mr-2" />
              {editMode ? 'Cancel' : 'Edit'}
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Reviewer Notes</label>
              {editMode ? (
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your review notes here..."
                  className="min-h-[100px]"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg min-h-[100px] text-sm text-gray-600">
                  {notes || 'No notes added yet.'}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleApprove}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve & Pay
              </Button>
              <Button
                onClick={handleReject}
                variant="destructive"
                className="flex-1"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject Claim
              </Button>
            </div>

            <Button variant="outline" className="w-full">
              <MessageSquare className="w-4 h-4 mr-2" />
              Request More Information
            </Button>

            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}