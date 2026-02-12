"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  LayoutDashboard, FileText, User, LogOut, Search, Filter, 
  Download, Eye, Calendar, DollarSign, Phone, Users, Plus
} from 'lucide-react';
import { ClaimAmLogo } from '../ClaimAmLogo';

interface WebClaimsListProps {
  onNavigate: (screen: string) => void;
  onSelectClaim: (claim: any) => void;
  onLogout: () => void;
}

export function WebClaimsList({ onNavigate, onSelectClaim, onLogout }: WebClaimsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const claims = [
    {
      id: 'CLM-2025-0847',
      type: 'Motor Insurance',
      policyNumber: 'POL-NG-2024-8847',
      amount: '₦450,000',
      status: 'processing',
      date: '2025-01-15',
      description: 'Vehicle collision on Third Mainland Bridge',
      progress: 65
    },
    {
      id: 'CLM-2025-0723',
      type: 'Health Insurance',
      policyNumber: 'POL-NG-2024-6623',
      amount: '₦125,000',
      status: 'approved',
      date: '2025-01-10',
      description: 'Emergency surgery at Lagos University Teaching Hospital',
      progress: 100
    },
    {
      id: 'CLM-2024-0956',
      type: 'Home Insurance',
      policyNumber: 'POL-NG-2023-4512',
      amount: '₦800,000',
      status: 'under_review',
      date: '2024-12-28',
      description: 'Roof damage due to heavy rainfall',
      progress: 45
    },
    {
      id: 'CLM-2024-0834',
      type: 'Livestock Insurance',
      policyNumber: 'POL-NG-2024-2289',
      amount: '₦200,000',
      status: 'approved',
      date: '2024-12-15',
      description: 'Poultry loss due to disease outbreak',
      progress: 100
    },
    {
      id: 'CLM-2024-0712',
      type: 'Motor Insurance',
      policyNumber: 'POL-NG-2024-1156',
      amount: '₦95,000',
      status: 'rejected',
      date: '2024-11-30',
      description: 'Minor vehicle damage - windshield crack',
      progress: 100
    },
    {
      id: 'CLM-2024-0589',
      type: 'Health Insurance',
      policyNumber: 'POL-NG-2023-9945',
      amount: '₦340,000',
      status: 'processing',
      date: '2024-11-12',
      description: 'Dental surgery and orthodontic treatment',
      progress: 30
    }
  ];

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
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || claim.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:flex lg:w-64 bg-white border-r border-gray-200 flex-col">
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

      {/* Mobile Bottom Navigation - Only shown on mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="grid grid-cols-3 gap-1 p-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </button>
          <button
            onClick={() => onNavigate('claims-list')}
            className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg bg-[#00A878]/10 text-[#00A878] font-medium"
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs">Claims</span>
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20 lg:pb-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">My Claims</h1>
                <p className="text-sm text-gray-600 mt-1">View and track all your insurance claims</p>
              </div>
              <Button
                onClick={() => onNavigate('file-claim')}
                className="flex items-center justify-center gap-2 h-11 w-full sm:w-auto"
                style={{ backgroundColor: '#00A878' }}
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">File New Claim</span>
                <span className="sm:hidden">New Claim</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white border-b border-gray-200 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search claims..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter by Status */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex items-center gap-2 flex-1">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A878]"
                >
                  <option value="all">All Status</option>
                  <option value="processing">Processing</option>
                  <option value="approved">Approved</option>
                  <option value="under_review">Under Review</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <Button variant="outline" className="flex items-center justify-center gap-2 w-full sm:w-auto">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Claims List */}
        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 p-4 lg:p-6 border-b border-gray-100">
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold text-gray-900">{claims.length}</p>
                <p className="text-xs lg:text-sm text-gray-600">Total</p>
              </div>
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold text-green-600">
                  {claims.filter(c => c.status === 'approved').length}
                </p>
                <p className="text-xs lg:text-sm text-gray-600">Approved</p>
              </div>
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold text-blue-600">
                  {claims.filter(c => c.status === 'processing' || c.status === 'under_review').length}
                </p>
                <p className="text-xs lg:text-sm text-gray-600">In Progress</p>
              </div>
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold text-red-600">
                  {claims.filter(c => c.status === 'rejected').length}
                </p>
                <p className="text-xs lg:text-sm text-gray-600">Rejected</p>
              </div>
            </div>

            {/* Desktop Table View - Hidden on mobile */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Claim ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Progress</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredClaims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{claim.id}</p>
                        <p className="text-sm text-gray-500">{claim.policyNumber}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900">{claim.type}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{claim.amount}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{claim.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(claim.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#00A878] rounded-full transition-all"
                              style={{ width: `${claim.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{claim.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onSelectClaim(claim)}
                          className="flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View - Only shown on mobile */}
            <div className="lg:hidden divide-y divide-gray-100">
              {filteredClaims.map((claim) => (
                <div key={claim.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">{claim.id}</p>
                      <p className="text-xs text-gray-500">{claim.policyNumber}</p>
                    </div>
                    {getStatusBadge(claim.status)}
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Type:</span>
                      <span className="text-sm font-medium text-gray-900">{claim.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Amount:</span>
                      <span className="text-sm font-semibold text-gray-900">{claim.amount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Date:</span>
                      <div className="flex items-center gap-1 text-gray-900">
                        <Calendar className="w-3 h-3" />
                        <span className="text-xs">{claim.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Progress</span>
                      <span className="text-xs font-medium text-gray-900">{claim.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#00A878] rounded-full transition-all"
                        style={{ width: `${claim.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectClaim(claim)}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredClaims.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No claims found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'You haven\'t filed any claims yet'}
                </p>
                {!searchTerm && filterStatus === 'all' && (
                  <Button
                    onClick={() => onNavigate('file-claim')}
                    style={{ backgroundColor: '#00A878' }}
                  >
                    File Your First Claim
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}