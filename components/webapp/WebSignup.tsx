"use client";
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ClaimAmLogo } from '../ClaimAmLogo';
import { User, Phone, Mail, Lock, MapPin, Calendar } from 'lucide-react';

interface WebSignupProps {
  onSignup: () => void;
  onLogin: () => void;
}

export function WebSignup({ onSignup, onLogin }: WebSignupProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    state: '',
    password: '',
    confirmPassword: ''
  });

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <ClaimAmLogo size={70} withBackground={true} />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Join millions experiencing accessible, faster, smarter claims
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Chidinma Okafor"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+234 XXX XXX XXXX"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="chidinma@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="dob"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* State */}
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A878]"
                  required
                >
                  <option value="">Select State</option>
                  {nigerianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="pl-10"
                  required
                  minLength={8}
                />
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-2 pt-2">
            <input 
              type="checkbox" 
              id="terms" 
              className="mt-1 rounded border-gray-300" 
              required 
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to ClaimAm's{' '}
              <a href="#" className="text-[#0052CC] hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-[#0052CC] hover:underline">Privacy Policy</a>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base"
            style={{ backgroundColor: '#00A878' }}
          >
            Continue to Subscription
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onLogin}
              className="text-[#0052CC] font-medium hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>

        {/* Multi-Channel Access Banner */}
        <div className="mt-6 p-4 bg-gradient-to-r from-[#00A878]/10 to-[#0052CC]/10 rounded-lg border border-[#00A878]/20">
          <p className="text-sm text-center text-gray-700">
            💡 <span className="font-medium">No internet?</span> Dial <span className="font-bold text-[#0052CC]">*669#</span> or visit our <span className="font-bold">trusted agents</span> near you
          </p>
        </div>
      </div>
    </div>
  );
}
