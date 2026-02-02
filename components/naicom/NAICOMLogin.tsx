"use client";
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Shield, Lock, Mail } from 'lucide-react';

interface NAICOMLoginProps {
  onLogin: () => void;
}

export function NAICOMLogin({ onLogin }: NAICOMLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  const handleCACLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0057B7] to-[#00A878] flex items-center justify-center p-8">
      <Card className="w-full max-w-md p-8">
        {/* NAICOM Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0057B7] rounded-full mb-4">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl text-gray-900 mb-2">NAICOM</h1>
          <p className="text-gray-600">Escalation Oversight Portal</p>
          <p className="text-sm text-gray-500 mt-1">
            National Insurance Commission
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="officer@naicom.gov.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-[#0057B7] hover:underline">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12"
            style={{ backgroundColor: '#0057B7' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleCACLogin}
            disabled={loading}
            className="w-full h-12 border-2"
          >
            <Shield className="w-5 h-5 mr-2" />
            Sign in with CAC Credentials
          </Button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Protected by NAICOM Security Standards</p>
          <p className="mt-1">© 2025 National Insurance Commission</p>
        </div>
      </Card>
    </div>
  );
}
