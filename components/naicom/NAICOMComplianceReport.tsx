import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ArrowLeft, Download, Shield } from 'lucide-react';

interface NAICOMComplianceReportProps {
  onBack: () => void;
}

export function NAICOMComplianceReport({ onBack }: NAICOMComplianceReportProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl text-gray-900">Compliance Summary Report</h1>
          </div>
          <Button style={{ backgroundColor: '#00A878' }}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {/* PDF Preview */}
        <Card className="p-8 bg-white">
          <div className="max-w-[800px] mx-auto">
            {/* Header */}
            <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-16 h-16 bg-[#0057B7] rounded-lg flex items-center justify-center">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl text-gray-900">NAICOM</h2>
                  <p className="text-sm text-gray-600">National Insurance Commission</p>
                </div>
              </div>
              <h3 className="text-xl text-gray-900 mb-2">
                Escalation Oversight Report
              </h3>
              <p className="text-sm text-gray-600">
                Prepared for NIIRA 2025 Reporting
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Report Period: November 2025 | Generated: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Executive Summary */}
            <div className="mb-8">
              <h4 className="text-lg text-gray-900 mb-4">Executive Summary</h4>
              <div className="space-y-4 text-sm text-gray-700">
                <p>
                  This report summarizes the escalation activities handled by NAICOM's 
                  oversight portal during November 2025, in compliance with NIIRA 2025 regulations.
                </p>
                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600">Total Escalations</p>
                    <p className="text-2xl text-gray-900">372</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-600">Resolved Cases</p>
                    <p className="text-2xl text-gray-900">156</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-xs text-gray-600">Pending &gt;30 Days</p>
                    <p className="text-2xl text-gray-900">87</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-600">Avg Resolution Time</p>
                    <p className="text-2xl text-gray-900">12.4 days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Insurers */}
            <div className="mb-8">
              <h4 className="text-lg text-gray-900 mb-4">Escalations by Insurer</h4>
              <div className="space-y-2">
                {[
                  { name: 'Leadway Insurance', count: 156, percent: 42 },
                  { name: 'AIICO Insurance', count: 104, percent: 28 },
                  { name: 'AXA Mansard', count: 56, percent: 15 },
                  { name: 'Custodian Insurance', count: 37, percent: 10 },
                  { name: 'Others', count: 19, percent: 5 }
                ].map((insurer) => (
                  <div key={insurer.name} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700">{insurer.name}</span>
                        <span className="text-sm font-medium text-gray-900">{insurer.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#00A878] h-2 rounded-full"
                          style={{ width: `${insurer.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Distribution */}
            <div className="mb-8">
              <h4 className="text-lg text-gray-900 mb-4">Regional Distribution</h4>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { region: 'Lagos', count: 145 },
                  { region: 'Abuja', count: 89 },
                  { region: 'Port Harcourt', count: 67 },
                  { region: 'Kano', count: 43 },
                  { region: 'Rural Areas', count: 28 }
                ].map((region) => (
                  <div key={region.region} className="p-3 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-600">{region.region}</p>
                    <p className="text-lg text-gray-900">{region.count}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                This report is confidential and intended for NAICOM internal use only.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                © 2025 National Insurance Commission | www.naicom.gov.ng
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
