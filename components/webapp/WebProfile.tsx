"use client"
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  LayoutDashboard, FileText, User, LogOut, Mail, Phone as PhoneIcon, 
  MapPin, Calendar, Shield, CreditCard, Bell, Lock, Phone, Users, Camera
} from 'lucide-react';
import { ClaimAmLogo } from '../ClaimAmLogo';

interface WebProfileProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function WebProfile({ onNavigate, onLogout }: WebProfileProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'subscription' | 'notifications' | 'security'>('profile');
  
  const [profileData, setProfileData] = useState({
    fullName: 'Chidinma Okafor',
    email: 'chidinma.okafor@example.com',
    phone: '+234 803 456 7890',
    dateOfBirth: '1990-05-15',
    state: 'Lagos',
    address: '15 Admiralty Way, Lekki Phase 1, Lagos'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    claimUpdates: true,
    marketingEmails: false
  });

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <FileText className="w-5 h-5" />
            My Claims
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#00A878]/10 text-[#00A878] font-medium"
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
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                {/* Profile Picture */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00A878] to-[#0052CC] mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                    CO
                  </div>
                  <button className="text-sm text-[#0052CC] hover:underline flex items-center gap-1 justify-center">
                    <Camera className="w-4 h-4" />
                    Change Photo
                  </button>
                </div>

                {/* Profile Info */}
                <div className="space-y-3 text-center pb-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900">{profileData.fullName}</h3>
                  <p className="text-sm text-gray-600">{profileData.email}</p>
                  <p className="text-sm text-gray-600">{profileData.phone}</p>
                </div>

                {/* Subscription Info */}
                <div className="mt-4 p-3 bg-gradient-to-r from-[#00A878]/10 to-[#0052CC]/10 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Current Plan</p>
                  <p className="font-bold text-gray-900">Monthly Plan</p>
                  <p className="text-xs text-gray-600 mt-1">Renews: Feb 15, 2025</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => setActiveTab('subscription')}
                  >
                    Manage Plan
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Tabs */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex-1 px-6 py-4 text-sm font-medium ${
                      activeTab === 'profile'
                        ? 'text-[#00A878] border-b-2 border-[#00A878]'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <User className="w-5 h-5 inline mr-2" />
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('subscription')}
                    className={`flex-1 px-6 py-4 text-sm font-medium ${
                      activeTab === 'subscription'
                        ? 'text-[#00A878] border-b-2 border-[#00A878]'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 inline mr-2" />
                    Subscription
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`flex-1 px-6 py-4 text-sm font-medium ${
                      activeTab === 'notifications'
                        ? 'text-[#00A878] border-b-2 border-[#00A878]'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Bell className="w-5 h-5 inline mr-2" />
                    Notifications
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`flex-1 px-6 py-4 text-sm font-medium ${
                      activeTab === 'security'
                        ? 'text-[#00A878] border-b-2 border-[#00A878]'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Lock className="w-5 h-5 inline mr-2" />
                    Security
                  </button>
                </div>
              </div>

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          type="text"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative mt-2">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative mt-2">
                          <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="phone"
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <div className="relative mt-2">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="dob"
                            type="date"
                            value={profileData.dateOfBirth}
                            onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="state">State</Label>
                        <div className="relative mt-2">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            id="state"
                            value={profileData.state}
                            onChange={(e) => setProfileData(prev => ({ ...prev, state: e.target.value }))}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A878]"
                          >
                            {nigerianStates.map(state => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          type="text"
                          value={profileData.address}
                          onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button variant="outline">Cancel</Button>
                      <Button style={{ backgroundColor: '#00A878' }}>Save Changes</Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Subscription Tab */}
              {activeTab === 'subscription' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Subscription Management</h2>
                  
                  <div className="space-y-6">
                    {/* Current Plan */}
                    <div className="p-6 bg-gradient-to-r from-[#00A878]/10 to-[#0052CC]/10 rounded-lg border border-[#00A878]/20">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">Monthly Plan</h3>
                          <p className="text-sm text-gray-600">₦1,500 / 30 days</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Next billing date</p>
                          <p className="font-bold text-gray-900">February 15, 2025</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1">Change Plan</Button>
                        <Button variant="outline" className="text-red-600 hover:bg-red-50">Cancel Subscription</Button>
                      </div>
                    </div>

                    {/* Billing History */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-4">Billing History</h3>
                      <div className="space-y-3">
                        {[
                          { date: '2025-01-15', amount: '₦1,500', status: 'Paid' },
                          { date: '2024-12-15', amount: '₦1,500', status: 'Paid' },
                          { date: '2024-11-15', amount: '₦1,500', status: 'Paid' }
                        ].map((bill, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{bill.date}</p>
                              <p className="text-sm text-gray-600">Monthly Subscription</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">{bill.amount}</p>
                              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                {bill.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
                      { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive updates via SMS' },
                      { key: 'claimUpdates', label: 'Claim Status Updates', description: 'Get notified when claim status changes' },
                      { key: 'marketingEmails', label: 'Marketing Emails', description: 'Receive promotional offers and news' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof typeof notifications]}
                            onChange={(e) => setNotifications(prev => ({
                              ...prev,
                              [item.key]: e.target.checked
                            }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00A878]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00A878]"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-6">
                    <Button style={{ backgroundColor: '#00A878' }}>Save Preferences</Button>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    {/* Change Password */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" className="mt-2" />
                        </div>
                        <Button style={{ backgroundColor: '#00A878' }}>Update Password</Button>
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <Button variant="outline">Enable</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
