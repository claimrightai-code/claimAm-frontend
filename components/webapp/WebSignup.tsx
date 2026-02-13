"use client";
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ClaimAmLogo } from '../ClaimAmLogo';
import {
  User,
  Phone,
  Mail,
  Lock,
  MapPin,
  Calendar,
  CreditCard,
  Loader2,
  X,
} from "lucide-react";
import { useUserContext } from "@/hooks/hooks";
import { useToast } from "../ui/use-toast";

interface WebSignupProps {
  onSignup: (res: any) => void;
  onLogin: () => void;
}

export function WebSignup({ onSignup, onLogin }: WebSignupProps) {
  const { registerFunc, resendOtpFunc, verifyUserOtpFunc } = useUserContext();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    state: "",
    password: "",
    NIN: "",
    confirmPassword: "",
  });

  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onSignup();
  // };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // --- 1. Handle Registration Submission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await registerFunc({
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone,
        nin_number: formData.NIN,
        date_of_birth: formData.dateOfBirth,
        state: formData.state,
      });

      if (res.ok) {
        toast({
          title: "OTP Sent",
          description: "Check your email for verification code.",
        });
        setShowOtpModal(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. Handle OTP Verification ---
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await verifyUserOtpFunc({
        email: formData.email,
        otp: otp,
      });
      console.log(res);
      if (res.ok) {
        toast({ title: "Verified!", description: "Welcome to ClaimAm!" });
        alert("Account created successfully! Please log in.");

        onSignup(res);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-blue-50">
      {/* --- OTP MODAL --- */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl relative">
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Verify Email</h2>
              <p className="text-sm text-gray-500 mt-2">
                We sent a 6-digit code to <br />
                <span className="font-semibold text-gray-800">
                  {formData.email}
                </span>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="text-center text-3xl tracking-[1rem] h-16 font-bold focus:border-[#00A878]"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={otp.length !== 6 || loading}
                className="w-full h-12 text-base bg-[#00A878] hover:bg-[#008f65]"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Verify & Create Account"
                )}
              </Button>

              <p className="text-center text-sm text-gray-600">
                Didn't get the code?{" "}
                <button
                  type="button"
                  onClick={() => resendOtpFunc({ email: formData.email })}
                  className="text-[#00A878] font-bold hover:underline"
                >
                  Resend
                </button>
              </p>
            </form>
          </div>
        </div>
      )}

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
                  onChange={(e) => handleChange("fullName", e.target.value)}
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
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nin">NIN Number (11 digits)</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="nin"
                  placeholder="National ID Number"
                  value={formData.NIN}
                  onChange={(e) =>
                    handleChange(
                      "NIN",
                      e.target.value.replace(/\D/g, "").slice(0, 11),
                    )
                  }
                  className="pl-10 h-12"
                  required
                  maxLength={11}
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
                  onChange={(e) => handleChange("email", e.target.value)}
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
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
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
                  onChange={(e) => handleChange("state", e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A878]"
                  required
                >
                  <option value="">Select State</option>
                  {nigerianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
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
                  onChange={(e) => handleChange("password", e.target.value)}
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
              I agree to ClaimAm's{" "}
              <a href="#" className="text-[#0052CC] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#0052CC] hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base"
            style={{ backgroundColor: "#00A878" }}
          >
            Continue to Subscription
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
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
            💡 <span className="font-medium">No internet?</span> Dial{" "}
            <span className="font-bold text-[#0052CC]">*669#</span> or visit our{" "}
            <span className="font-bold">trusted agents</span> near you
          </p>
        </div>
      </div>
    </div>
  );
}
