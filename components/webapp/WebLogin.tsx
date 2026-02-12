"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ClaimAmLogo } from '../ClaimAmLogo';
import { Phone, Lock, Smartphone, Users, MessageSquare } from 'lucide-react';

interface WebLoginProps {
  onLogin: () => void;
  onSignup: () => void;
  onForgotPassword: () => void;
}

export function WebLogin({ onLogin, onSignup, onForgotPassword }: WebLoginProps) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <ClaimAmLogo size={80} withBackground={true} />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to manage your insurance claims
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+234 XXX XXX XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-[#0052CC] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base"
              style={{ backgroundColor: '#00A878' }}
            >
              Sign In
            </Button>
          </form>

          {/* Alternative Access Methods */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-4">
              Or access ClaimAm through:
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Smartphone className="w-6 h-6 text-[#0052CC] mx-auto mb-1" />
                <p className="text-xs text-gray-600">Mobile App</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <MessageSquare className="w-6 h-6 text-[#00A878] mx-auto mb-1" />
                <p className="text-xs text-gray-600">USSD *669#</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Users className="w-6 h-6 text-[#FF9F1C] mx-auto mb-1" />
                <p className="text-xs text-gray-600">Visit Agent</p>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSignup}
                className="text-[#0052CC] font-medium hover:underline"
              >
                Sign Up Free
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#00A878] via-[#0052CC] to-[#003d99] items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <h2 className="text-4xl font-bold mb-6">
            Accessible, Faster, Smarter Insurance Claims
          </h2>
          <p className="text-xl text-white/90 mb-8">
            File claims from anywhere using our AI-powered platform. 
            Dial *669# from any phone or visit our trusted agents near you.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Multi-Channel Access</h3>
                <p className="text-white/80 text-sm">Web, mobile app, USSD *669#, or physical agents</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">AI-Powered Verification</h3>
                <p className="text-white/80 text-sm">Fast, secure claim processing with advanced fraud detection</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">106M+ Underserved Users</h3>
                <p className="text-white/80 text-sm">Serving rural Nigeria, expanding to 1.4B+ Africans</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-sm italic">
              "I got my ₦150,000 motor claim in 2 days using *669#. ClaimAm made it so easy!"
            </p>
            <p className="text-xs mt-2 text-white/70">— Oluwaseun Adeyemi, Lagos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
