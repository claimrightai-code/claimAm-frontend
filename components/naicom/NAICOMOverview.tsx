"use client";
import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Shield, AlertTriangle, CheckCircle, Clock, TrendingUp, 
  FileText, Users, BarChart3, LogOut, Menu
} from 'lucide-react';
import { NAICOMScreen, EscalatedClaim } from '../NAICOMDashboard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface NAICOMOverviewProps {
  onNavigate: (screen: NAICOMScreen) => void;
  onViewClaim: (claim: EscalatedClaim) => void;
}

const escalationsByInsurer = [
  { name: 'Leadway', value: 42, count: 156 },
  { name: 'AIICO', value: 28, count: 104 },
  { name: 'AXA Mansard', value: 15, count: 56 },
  { name: 'Custodian', value: 10, count: 37 },
  { name: 'Others', value: 5, count: 19 }
];

const mockEscalations: EscalatedClaim[] = [
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

export function NAICOMOverview({ onNavigate, onViewClaim }: NAICOMOverviewProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#0057B7] rounded-lg flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl text-gray-900">NAICOM Oversight Portal</h1>
                  <p className="text-sm text-gray-600">Escalation Management System</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Officer: A. Adewale
              </Badge>
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex gap-6">
            <button className="py-4 px-2 border-b-2 border-[#00A878] text-[#00A878] font-medium">
              Dashboard
            </button>
            <button 
              onClick={() => onNavigate('queue')}
              className="py-4 px-2 border-b-2 border-transparent text-gray-600 hover:text-gray-900"
            >
              Claims Queue
            </button>
            <button 
              onClick={() => onNavigate('analytics')}
              className="py-4 px-2 border-b-2 border-transparent text-gray-600 hover:text-gray-900"
            >
              Analytics
            </button>
            <button 
              onClick={() => onNavigate('compliance')}
              className="py-4 px-2 border-b-2 border-transparent text-gray-600 hover:text-gray-900"
            >
              Compliance Reports
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-[#0057B7]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-3xl text-gray-900 mb-1">372</p>
              <p className="text-sm text-gray-600">Total Escalated</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-[#FF9F1C]" />
              </div>
              <Badge variant="destructive" className="text-xs">Critical</Badge>
            </div>
            <div>
              <p className="text-3xl text-gray-900 mb-1">87</p>
              <p className="text-sm text-gray-600">Pending &gt;30 Days</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-[#00A878]" />
              </div>
            </div>
            <div>
              <p className="text-3xl text-gray-900 mb-1">156</p>
              <p className="text-sm text-gray-600">Resolved This Month</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div>
              <p className="text-3xl text-gray-900 mb-1">12.4</p>
              <p className="text-sm text-gray-600">Avg Resolution (days)</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Chart */}
          <Card className="col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg text-gray-900">Escalations by Insurer</h3>
              <Badge className="bg-[#00A878]">
                New today: 27
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={escalationsByInsurer}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#00A878" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-5 gap-3">
              {escalationsByInsurer.map((item) => (
                <div key={item.name} className="text-center">
                  <p className="text-sm text-gray-900">{item.value}%</p>
                  <p className="text-xs text-gray-600">{item.name}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Escalations */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Recent Escalations</h3>
            <div className="space-y-3">
              {mockEscalations.slice(0, 5).map((escalation) => (
                <button
                  key={escalation.id}
                  onClick={() => onViewClaim(escalation)}
                  className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {escalation.claimId}
                    </span>
                    <Badge 
                      variant={escalation.status === 'pending' ? 'secondary' : 'default'}
                      className="text-xs"
                    >
                      {escalation.daysDelayed}d
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{escalation.insurer}</p>
                  <p className="text-xs text-gray-500 mt-1">{escalation.claimAmount}</p>
                </button>
              ))}
            </div>
            <Button
              onClick={() => onNavigate('queue')}
              variant="outline"
              className="w-full mt-4"
            >
              View All Escalations
            </Button>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('queue')}>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 rounded-lg">
                <FileText className="w-8 h-8 text-[#0057B7]" />
              </div>
              <div>
                <h3 className="text-lg text-gray-900 mb-1">Review Claims</h3>
                <p className="text-sm text-gray-600">Access the full escalation queue</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('analytics')}>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-purple-100 rounded-lg">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg text-gray-900 mb-1">View Analytics</h3>
                <p className="text-sm text-gray-600">Trends and performance metrics</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('compliance')}>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-100 rounded-lg">
                <Shield className="w-8 h-8 text-[#00A878]" />
              </div>
              <div>
                <h3 className="text-lg text-gray-900 mb-1">Generate Report</h3>
                <p className="text-sm text-gray-600">Export compliance documentation</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
