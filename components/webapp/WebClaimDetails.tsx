"use client";

import React from 'react';
import { Button } from '../ui/button';
import { 
  LayoutDashboard, FileText, User, LogOut, ArrowLeft, 
  Phone, Users, Download, Mail, Calendar, DollarSign,
  CheckCircle, Clock, AlertCircle, FileIcon, Eye
} from 'lucide-react';
import { ClaimAmLogo } from '../ClaimAmLogo';
import { ClaimData } from '../WebApp';

interface WebClaimDetailsProps {
  claim: ClaimData | null;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function WebClaimDetails({ claim, onNavigate, onLogout }: WebClaimDetailsProps) {
  // Handle if claim is null
  if (!claim) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Claim Not Found</h2>
          <p className="text-gray-600 mb-6">The claim you're looking for doesn't exist.</p>
          <Button onClick={() => onNavigate('claims-list')} style={{ backgroundColor: '#00A878' }}>
            Back to Claims List
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      processing: 'bg-blue-100 text-blue-700 border-blue-200',
      approved: 'bg-green-100 text-green-700 border-green-200',
      under_review: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      rejected: 'bg-red-100 text-red-700 border-red-200'
    };
    const labels = {
      processing: 'Processing',
      approved: 'Approved',
      under_review: 'Under Review',
      rejected: 'Rejected'
    };
    return (
      <span className={`px-4 py-2 rounded-full text-sm font-medium border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'approved':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'processing':
      case 'under_review':
        return <Clock className="w-6 h-6 text-blue-600" />;
      case 'rejected':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Clock className="w-6 h-6 text-gray-600" />;
    }
  };

  // Mock timeline data
  const timeline = [
    {
      date: '2025-01-15 09:23 AM',
      title: 'Claim Submitted',
      description: 'Your claim has been successfully submitted and assigned reference number ' + claim.id,
      status: 'completed'
    },
    {
      date: '2025-01-15 10:45 AM',
      title: 'Initial Review Completed',
      description: 'Documents verified and passed initial AI screening',
      status: 'completed'
    },
    {
      date: '2025-01-16 02:30 PM',
      title: 'Under Assessment',
      description: 'Claim assessor reviewing incident details and damage estimates',
      status: claim.status === 'processing' ? 'active' : 'completed'
    },
    {
      date: claim.status === 'approved' ? '2025-01-18 11:20 AM' : 'Pending',
      title: 'Final Decision',
      description: claim.status === 'approved' 
        ? 'Claim approved for payment of ' + claim.amount
        : 'Awaiting final approval from claims department',
      status: claim.status === 'approved' ? 'completed' : 'pending'
    }
  ];

  // Mock documents
  const documents = [
    { name: 'Police Report.pdf', size: '2.4 MB', uploadDate: '2025-01-15' },
    { name: 'Vehicle Photos.jpg', size: '3.8 MB', uploadDate: '2025-01-15' },
    { name: 'Drivers License.pdf', size: '1.2 MB', uploadDate: '2025-01-15' },
    { name: 'Vehicle Registration.pdf', size: '890 KB', uploadDate: '2025-01-15' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <ClaimAmLogo size={50} withBackground={true} />
          <p className="text-xs text-gray-600 mt-2">Web Application</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('claims-list')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#00A878]/10 text-[#00A878] font-medium"
          >
            <FileText className="w-5 h-5" />
            My Claims
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <User className="w-5 h-5" />
            Profile
          </button>
        </nav>

        {/* Multi-Channel Access Banner */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-[#00A878]/10 to-[#0052CC]/10 rounded-lg p-3 mb-3">
            <p className="text-xs font-medium text-gray-700 mb-2">
              Access ClaimAm Anywhere:
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Phone className="w-3 h-3" />
                <span>USSD: <strong>*669#</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Users className="w-3 h-3" />
                <span><strong>Visit our agents</strong></span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => onNavigate('claims-list')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Claims List
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Claim Details</h1>
                <p className="text-gray-600 mt-1">{claim.id} • {claim.type}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                {getStatusBadge(claim.status)}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Claim Overview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Claim Overview</h2>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Claim ID</p>
                    <p className="font-semibold text-gray-900">{claim.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Policy Number</p>
                    <p className="font-semibold text-gray-900">{claim.policyNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Insurance Type</p>
                    <p className="font-semibold text-gray-900">{claim.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Claim Amount</p>
                    <p className="font-semibold text-gray-900 text-lg text-[#00A878]">{claim.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date Filed</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="font-semibold text-gray-900">{claim.date}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Processing Time</p>
                    <p className="font-semibold text-gray-900">3 days</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">Claim Progress</p>
                    <p className="text-sm font-semibold text-gray-900">{claim.progress}%</p>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#00A878] to-[#0052CC] rounded-full transition-all"
                      style={{ width: `${claim.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Incident Description</h2>
                <p className="text-gray-700 leading-relaxed">{claim.description}</p>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Claim Timeline</h2>
                
                <div className="space-y-6">
                  {timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.status === 'completed' ? 'bg-green-100' :
                          item.status === 'active' ? 'bg-blue-100' :
                          'bg-gray-100'
                        }`}>
                          {item.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : item.status === 'active' ? (
                            <Clock className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        {idx < timeline.length - 1 && (
                          <div className={`w-0.5 h-12 ${
                            item.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <span className="text-xs text-gray-500">{item.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Uploaded Documents</h2>
                
                <div className="space-y-3">
                  {documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0052CC]/10 rounded-lg flex items-center justify-center">
                          <FileIcon className="w-5 h-5 text-[#0052CC]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.size} • Uploaded {doc.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              {/* Status Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  {getStatusIcon(claim.status)}
                  <div>
                    <p className="text-sm text-gray-600">Current Status</p>
                    <p className="font-bold text-gray-900 text-lg">
                      {claim.status === 'processing' ? 'Processing' :
                       claim.status === 'approved' ? 'Approved' :
                       claim.status === 'under_review' ? 'Under Review' :
                       'Rejected'}
                    </p>
                  </div>
                </div>
                
                {claim.status === 'processing' && (
                  <p className="text-sm text-gray-600">
                    Your claim is being reviewed by our team. You'll receive an update within 24-48 hours.
                  </p>
                )}
                
                {claim.status === 'approved' && (
                  <div className="space-y-3">
                    <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                      ✓ Your claim has been approved! Payment will be processed within 3-5 business days.
                    </p>
                    <Button className="w-full" style={{ backgroundColor: '#00A878' }}>
                      View Payment Details
                    </Button>
                  </div>
                )}
              </div>

              {/* Contact Support */}
              <div className="bg-gradient-to-br from-[#00A878] to-[#0052CC] rounded-xl p-6 text-white">
                <h3 className="font-bold mb-2">Need Help?</h3>
                <p className="text-sm text-white/90 mb-4">
                  Contact our support team for assistance with your claim
                </p>
                <div className="space-y-2 mb-4">
                  <a href="mailto:support@claimam.com" className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    support@claimam.com
                  </a>
                  <a href="tel:+2349118223417" className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    +234 911 822 3417
                  </a>
                </div>
                <Button variant="outline" className="w-full bg-white text-[#0052CC] border-white hover:bg-white/90">
                  Contact Support
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Upload Additional Documents
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Track via USSD *669#
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Claim Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}