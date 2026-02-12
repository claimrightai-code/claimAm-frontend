"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ClaimAmLogo } from "../ClaimAmLogo";
import { Check, Zap, Shield, Clock, ArrowLeft } from "lucide-react";

interface WebSubscriptionProps {
  onComplete: () => void;
  onBack: () => void;
}

export function WebSubscription({ onComplete, onBack }: WebSubscriptionProps) {
  const [selectedPlan, setSelectedPlan] = useState<
    "payg" | "monthly" | "biannual" | "annual"
  >("payg");

  const plans = [
    {
      id: "payg" as const,
      name: "Flexible",
      subtitle: "Pay-As-You-Go",
      price: "₦50",
      period: "/day",
      originalPrice: "₦75",
      savings: "Save ₦25/day",
      features: [
        "Perfect for occasional claims",
        "No commitment required",
        "Cancel anytime",
        "Full AI verification",
        "USSD & agent access",
      ],
      recommended: false,
    },
    {
      id: "monthly" as const,
      name: "Monthly",
      subtitle: "Best for Regular Users",
      price: "₦1,500",
      period: "/30 days",
      originalPrice: "₦2,250",
      savings: "Save ₦750",
      features: [
        "Unlimited claims filing",
        "Priority processing",
        "Advanced fraud protection",
        "Email & SMS alerts",
        "Multi-channel access",
      ],
      recommended: true,
    },
    {
      id: "biannual" as const,
      name: "6 Months",
      subtitle: "Great Value",
      price: "₦6,000",
      period: "/6 months",
      originalPrice: "₦9,000",
      savings: "Save ₦3,000",
      features: [
        "All Monthly features",
        "Dedicated support",
        "6 months coverage",
        "Family member add-on",
        "Quarterly reports",
      ],
      recommended: false,
    },
    {
      id: "annual" as const,
      name: "Annual",
      subtitle: "Maximum Savings",
      price: "₦10,000",
      period: "/year",
      originalPrice: "₦18,000",
      savings: "Save ₦8,000",
      features: [
        "All 6-Month features",
        "VIP support 24/7",
        "Annual coverage",
        "Premium fraud detection",
        "Custom analytics dashboard",
      ],
      recommended: false,
    },
  ];

  const handleSubscribe = () => {
    // Simulate payment and account creation
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <ClaimAmLogo size={60} withBackground={true} />
          <div className="w-20" /> {/* Spacer for centering */}
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the subscription that fits your needs. All plans include full
            access to ClaimAm's AI-powered platform.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? "ring-4 ring-[#00A878] scale-105"
                  : "hover:shadow-xl hover:scale-102"
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#00A878] to-[#0052CC] text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    RECOMMENDED
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{plan.subtitle}</p>

                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400 line-through">
                    {plan.originalPrice}
                  </p>
                  <p className="text-sm font-semibold text-[#00A878]">
                    {plan.savings}
                  </p>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="w-5 h-5 text-[#00A878] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Selection Indicator */}
              <div className="flex justify-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === plan.id
                      ? "border-[#00A878] bg-[#00A878]"
                      : "border-gray-300"
                  }`}
                >
                  {selectedPlan === plan.id && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            All Plans Include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#00A878]/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-[#00A878]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  AI-Powered Verification
                </h3>
                <p className="text-sm text-gray-600">
                  Advanced OCR, deepfake detection, and fraud scoring
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0052CC]/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-[#0052CC]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Multi-Channel Access
                </h3>
                <p className="text-sm text-gray-600">
                  Web, mobile app, USSD *669#, or visit agents
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FF9F1C]/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-[#FF9F1C]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Fast Processing
                </h3>
                <p className="text-sm text-gray-600">
                  Get your claims processed in as little as 2 days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleSubscribe}
            className="w-full h-14 text-lg mb-4"
            style={{ backgroundColor: "#00A878" }}
          >
            Subscribe to {plans.find((p) => p.id === selectedPlan)?.name} Plan
          </Button>
          <p className="text-center text-sm text-gray-600">
            Secure payment powered by Paystack • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}
