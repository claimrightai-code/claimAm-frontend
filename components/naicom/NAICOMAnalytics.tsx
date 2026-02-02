"use client";
import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ArrowLeft, Download } from 'lucide-react';
import { NAICOMScreen } from '../NAICOMDashboard';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface NAICOMAnalyticsProps {
  onNavigate: (screen: NAICOMScreen) => void;
}

const timelineData = [
  { month: 'Jun', escalations: 45 },
  { month: 'Jul', escalations: 52 },
  { month: 'Aug', escalations: 48 },
  { month: 'Sep', escalations: 65 },
  { month: 'Oct', escalations: 71 },
  { month: 'Nov', escalations: 87 }
];

const regionData = [
  { name: 'Lagos', value: 145, color: '#0057B7' },
  { name: 'Abuja', value: 89, color: '#00A878' },
  { name: 'Port Harcourt', value: 67, color: '#FF9F1C' },
  { name: 'Kano', value: 43, color: '#E24A4A' },
  { name: 'Rural Areas', value: 28, color: '#9333EA' }
];

export function NAICOMAnalytics({ onNavigate }: NAICOMAnalyticsProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => onNavigate('overview')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl text-gray-900">Analytics & Reports</h1>
          </div>
          <Button style={{ backgroundColor: '#00A878' }}>
            <Download className="w-4 h-4 mr-2" />
            Export Report (PDF)
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Escalations Over Time */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Escalations Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="escalations" stroke="#00A878" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* By Region */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Escalations by Region</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-sm text-gray-600">Total Escalations</p>
            <p className="text-2xl text-gray-900 mt-2">372</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600">Avg Resolution Time</p>
            <p className="text-2xl text-gray-900 mt-2">12.4 days</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600">Resolution Rate</p>
            <p className="text-2xl text-gray-900 mt-2">76%</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600">Rural Claims</p>
            <p className="text-2xl text-gray-900 mt-2">7.5%</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
