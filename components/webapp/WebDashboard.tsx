"use client";

import React from 'react';
import { Button } from '../ui/button';
import { 
  LayoutDashboard, FileText, User, LogOut, Plus, 
  TrendingUp, Clock, CheckCircle, AlertCircle, Phone, Users
} from 'lucide-react';
import { ClaimAmLogo } from '../ClaimAmLogo';
import { SupportModal } from './SupportModal';
import { AgentFinder } from './AgentFinder';

interface WebDashboardProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function WebDashboard({ onNavigate, onLogout }: WebDashboardProps) {
  const [showSupportModal, setShowSupportModal] = React.useState(false);
  const [showAgentFinder, setShowAgentFinder] = React.useState(false);

  const recentClaims = [
    {
      id: 'CLM-2025-0847',
      type: 'Motor Insurance',
      amount: '₦450,000',
      status: 'processing',
      date: '2025-01-15',
      progress: 65
    },
    {
      id: 'CLM-2025-0723',
      type: 'Health Insurance',
      amount: '₦125,000',
      status: 'approved',
      date: '2025-01-10',
      progress: 100
    },
    {
      id: 'CLM-2024-0956',
      type: 'Home Insurance',
      amount: '₦800,000',
      status: 'under_review',
      date: '2024-12-28',
      progress: 45
    }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      processing: 'bg-blue-100 text-blue-700',
      approved: 'bg-green-100 text-green-700',
      under_review: 'bg-yellow-100 text-yellow-700',
      rejected: 'bg-red-100 text-red-700'
    };
    const labels = {
      processing: 'Processing',
      approved: 'Approved',
      under_review: 'Under Review',
      rejected: 'Rejected'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar - Hidden on mobile */}
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#00A878]/10 text-[#00A878] font-medium"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('claims-list')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
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

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="grid grid-cols-3 gap-1 p-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg bg-[#00A878]/10 text-[#00A878] font-medium"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </button>
          <button
            onClick={() => onNavigate('claims-list')}
            className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
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
        <div className="bg-gradient-to-r from-[#00A878] to-[#0052CC] p-4 lg:p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">Welcome back, Adebayo!</h1>
                <p className="text-white/90 mt-1 text-sm lg:text-base">Manage your insurance claims with ease</p>
              </div>
              <Button
                onClick={() => onNavigate('file-claim')}
                className="bg-white text-[#00A878] hover:bg-gray-100 h-11 w-full sm:w-auto"
              >
                <Plus className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">File New Claim</span>
                <span className="sm:hidden">New Claim</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="max-w-7xl mx-auto -mt-6 lg:-mt-8 px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">8</p>
              <p className="text-xs lg:text-sm text-gray-600 mt-1">Total Claims</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                </div>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-green-600">5</p>
              <p className="text-xs lg:text-sm text-gray-600 mt-1">Approved</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />
                </div>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-yellow-600">2</p>
              <p className="text-xs lg:text-sm text-gray-600 mt-1">Processing</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 text-red-600" />
                </div>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-red-600">1</p>
              <p className="text-xs lg:text-sm text-gray-600 mt-1">Rejected</p>
            </div>
          </div>
        </div>

        {/* Rest of content */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
          {/* Recent Claims */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="p-4 lg:p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg lg:text-xl font-bold text-gray-900">Recent Claims</h2>
              <button
                onClick={() => onNavigate('claims-list')}
                className="text-xs lg:text-sm text-[#0052CC] hover:underline"
              >
                View All
              </button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {recentClaims.map((claim) => (
                <div key={claim.id} className="p-4 lg:p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{claim.id}</h3>
                      <p className="text-sm text-gray-600">{claim.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 mb-1">{claim.amount}</p>
                      <p className="text-xs text-gray-500">{claim.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {getStatusBadge(claim.status)}
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#00A878] rounded-full transition-all"
                          style={{ width: `${claim.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{claim.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-br from-[#00A878] to-[#00A878]/80 rounded-xl p-6 text-white">
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-sm text-white/90 mb-4">
                Contact our support team for assistance
              </p>
              <Button variant="outline" className="bg-white text-[#00A878] border-white hover:bg-white/90" onClick={() => setShowSupportModal(true)}>
                Get Support
              </Button>
            </div>

            <div className="bg-gradient-to-br from-[#0052CC] to-[#0052CC]/80 rounded-xl p-6 text-white">
              <h3 className="font-bold mb-2">Track via USSD</h3>
              <p className="text-sm text-white/90 mb-4">
                Dial *669# from any phone to track claims
              </p>
              <Button 
                variant="outline" 
                className="bg-white text-[#0052CC] border-white hover:bg-white/90"
                onClick={() => window.open('https://youtube.com/@claimam-ussd-tutorial', '_blank')}
              >
                Learn More
              </Button>
            </div>

            <div className="bg-gradient-to-br from-[#FF9F1C] to-[#FF9F1C]/80 rounded-xl p-6 text-white">
              <h3 className="font-bold mb-2">Visit an Agent</h3>
              <p className="text-sm text-white/90 mb-4">
                Find trusted agents in your area
              </p>
              <Button variant="outline" className="bg-white text-[#FF9F1C] border-white hover:bg-white/90" onClick={() => setShowAgentFinder(true)}>
                Find Agents
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showSupportModal && <SupportModal onClose={() => setShowSupportModal(false)} />}
      {showAgentFinder && <AgentFinder onClose={() => setShowAgentFinder(false)} />}
    </div>
  );
}