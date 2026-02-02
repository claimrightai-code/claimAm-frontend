"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  FileText,
  MessageCircle,
  User,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Languages,
  Banknote,
  ChevronDown,
  Crown,
} from "lucide-react";
import { MobileScreen } from "../MobileApp";
import { ClaimAmLogo } from "../ClaimAmLogo";
import { SubscriptionStatus } from "./SubscriptionStatus";

interface WelcomeScreenProps {
  onNavigate: (screen: MobileScreen) => void;
  language: "en" | "pidgin" | "yoruba" | "igbo" | "hausa";
  onLanguageToggle: () => void;
  isPremium?: boolean;
  subscriptionExpiry?: Date | null;
}

const text = {
  en: {
    welcome: "Welcome to ClaimAm",
    subtitle:
      "Accessible, Fast, Trust Rebuilding AI-USSD powered Insurance claims",
    fileClaim: "File a Claim",
    quickActions: "Quick Actions",
    policies: "My Policies",
    claims: "Claims",
    support: "Support",
    profile: "Profile",
    advancePay: "Advance Pay",
    recentClaims: "Recent Claims",
    noClaims: "No recent claims",
    ussdBanner: "No smartphone? Dial *669# and Claim Your Rights Anywhere",
    language: "EN",
    status: {
      approved: "Approved",
      pending: "Analyzing",
      flagged: "Under Review",
    },
  },
  pidgin: {
    welcome: "Welcome to ClaimAm",
    subtitle:
      "Easy, Fast, AI-USSD wey dey help you rebuild trust for Insurance claims",
    fileClaim: "File Claim",
    quickActions: "Quick Actions",
    policies: "My Policies",
    claims: "Claims",
    support: "Support",
    profile: "Profile",
    advancePay: "Advance Pay",
    recentClaims: "Recent Claims",
    noClaims: "No recent claims",
    ussdBanner: "No smartphone? Dial *669# make you claim your rights anywhere",
    language: "Pidgin",
    status: {
      approved: "Approved",
      pending: "Dey Check Am",
      flagged: "Dey Review",
    },
  },
  yoruba: {
    welcome: "Káàbọ̀ sí ClaimAm",
    subtitle:
      "Ìrọ̀rùn, Yára, AI-USSD tó ń tún ìgbẹ́kẹ̀lé kọ́ fún àwọn ìbéèrè Ìnṣúránṣì",
    fileClaim: "Fi Ẹ̀dùn Sílẹ̀",
    quickActions: "Àwọn Ìṣe Kíákíá",
    policies: "Àwọn Pólísì Mi",
    claims: "Àwọn Ìbéèrè",
    support: "Ìrànlọ́wọ́",
    profile: "Profáìlì",
    advancePay: "Ìsanwó Ṣáájú",
    recentClaims: "Àwọn Ìbéèrè Láìpẹ́",
    noClaims: "Kò sí ìbéèrè láìpẹ́",
    ussdBanner: "Kò ní smartphone? Pe *669# kó o lè bèèrè ẹ̀tọ́ rẹ níbikíbi",
    language: "Yoruba",
    status: {
      approved: "Fọwọ́sí",
      pending: "Ń Ṣàyẹ̀wò",
      flagged: "Ń Wo",
    },
  },
  igbo: {
    welcome: "Nnọọ na ClaimAm",
    subtitle:
      "Dị mfe, Ngwa ngwa, AI-USSD na-ewughachi ntụkwasị obi maka mkpesa Ịnshọọransị",
    fileClaim: "Tinye Mkpesa",
    quickActions: "Omume Ngwa Ngwa",
    policies: "Polisi M",
    claims: "Mkpesa",
    support: "Nkwado",
    profile: "Profaịlụ",
    advancePay: "Ụgwọ Nke Mbụ",
    recentClaims: "Mkpesa Nso Nso A",
    noClaims: "Enweghị mkpesa nso nso a",
    ussdBanner: "Enweghị smartphone? Kpọọ *669# ma jiri ikike gị ebe ọbụla",
    language: "Igbo",
    status: {
      approved: "Kwadoro",
      pending: "Na-enyocha",
      flagged: "Na-enyocha",
    },
  },
  hausa: {
    welcome: "Barka da zuwa ClaimAm",
    subtitle:
      "Mai sauƙi, Mai sauri, AI-USSD mai sake gina amana don da'awar Inshora",
    fileClaim: "Ƙaddamar da Da'awa",
    quickActions: "Ayyuka Masu Sauri",
    policies: "Manufofina",
    claims: "Da'awa",
    support: "Tallafi",
    profile: "Bayanai",
    advancePay: "Biyan Kuɗi Na Gaba",
    recentClaims: "Da'awa Na Kwanan Nan",
    noClaims: "Babu da'awa na kwanan nan",
    ussdBanner: "Babu smartphone? Kira *669# don neman haƙƙinka a ko'ina",
    language: "Hausa",
    status: {
      approved: "An Amince",
      pending: "Ana Bincika",
      flagged: "Ana Dubawa",
    },
  },
};

const mockClaims = [
  {
    id: "CLM23456",
    type: "Motor Insurance",
    amount: "₦1,200,000",
    status: "approved" as const,
    date: "22 Nov 2025",
  },
  {
    id: "CLM23455",
    type: "Health Insurance",
    amount: "₦450,000",
    status: "pending" as const,
    date: "20 Nov 2025",
  },
];

export function WelcomeScreen({
  onNavigate,
  language,
  onLanguageToggle,
  isPremium = false,
  subscriptionExpiry,
}: WelcomeScreenProps) {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const t = text[language];

  // Calculate days remaining
  const getDaysRemaining = () => {
    if (!subscriptionExpiry) return 0;
    const now = new Date();
    const expiry = new Date(subscriptionExpiry);
    const diff = expiry.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = getDaysRemaining();

  return (
    <div className="h-full bg-gradient-to-br from-green-50 to-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ClaimAmLogo size={65} withBackground={true} />
            <div>
              <h1 className="text-lg text-gray-900">{t.welcome}</h1>
              <p className="text-sm text-gray-600">{t.subtitle}</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1"
            >
              <Languages className="w-4 h-4 text-gray-600" />
              <span className="text-xs text-gray-700">{t.language}</span>
              <ChevronDown className="w-3 h-3 text-gray-600" />
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                {(["en", "pidgin", "yoruba", "igbo", "hausa"] as const).map(
                  (lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        onLanguageToggle();
                        setShowLanguageMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                    >
                      {text[lang].language}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        </div>

        {/* USSD Banner */}
        <div className="mb-4 p-3 bg-gradient-to-r from-[#00A878] to-[#0057B7] rounded-lg">
          <p className="text-white text-xs text-center leading-relaxed">
            {t.ussdBanner}
          </p>
        </div>

        {/* Subscription Status */}
        <div className="mb-4">
          {isPremium && subscriptionExpiry ? (
            <div className="rounded-lg p-3 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Active Subscription
                  </span>
                </div>
                <span className="text-xs font-semibold text-green-700">
                  {daysRemaining} {daysRemaining === 1 ? "day" : "days"} left
                </span>
              </div>
              {daysRemaining <= 5 && (
                <button
                  onClick={() => onNavigate("subscription")}
                  className="mt-2 text-xs text-[#00A878] font-medium"
                >
                  Renew subscription →
                </button>
              )}
            </div>
          ) : (
            <div className="rounded-lg p-3 bg-red-50 border border-red-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-900">
                    Subscription Required
                  </span>
                </div>
                <button
                  onClick={() => onNavigate("subscription")}
                  className="text-xs text-red-700 font-medium bg-white px-3 py-1 rounded"
                >
                  Subscribe
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main CTA */}
        <Button
          onClick={() => {
            if (!isPremium) {
              alert(
                "Please subscribe to file claims. Click the Subscribe button above.",
              );
              return;
            }
            onNavigate("insurance-type");
          }}
          className="w-full h-14 text-lg rounded-xl shadow-lg"
          style={{
            backgroundColor: isPremium ? "#00A878" : "#9CA3AF",
            opacity: isPremium ? 1 : 0.7,
          }}
        >
          <FileText className="w-6 h-6 mr-3" />
          {isPremium ? t.fileClaim : "🔒 " + t.fileClaim}
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <h3 className="text-sm text-gray-700 mb-3">{t.quickActions}</h3>
        <div className="grid grid-cols-5 gap-3">
          <button
            onClick={() => onNavigate("profile")}
            className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <Shield className="w-5 h-5 text-[#00A878] mb-1" />
            <span className="text-xs text-gray-700 text-center leading-tight">
              {t.policies}
            </span>
          </button>

          <button
            onClick={() => onNavigate("claims-list")}
            className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <Clock className="w-5 h-5 text-orange-600 mb-1" />
            <span className="text-xs text-gray-700 text-center leading-tight">
              {t.claims}
            </span>
          </button>

          <button
            onClick={() =>
              (window.location.href =
                "mailto:support@claimam.ng?subject=Support Request&body=Hello ClaimAm Support Team,%0D%0A%0D%0AI need assistance with:%0D%0A%0D%0A")
            }
            className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <MessageCircle className="w-5 h-5 text-blue-600 mb-1" />
            <span className="text-xs text-gray-700 text-center leading-tight">
              {t.support}
            </span>
          </button>

          <button
            onClick={() => onNavigate("profile")}
            className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <User className="w-5 h-5 text-purple-600 mb-1" />
            <span className="text-xs text-gray-700 text-center leading-tight">
              {t.profile}
            </span>
          </button>

          <button
            onClick={() => onNavigate("advance-pay-check")}
            className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <Banknote className="w-5 h-5 text-[#00A878] mb-1" />
            <span className="text-xs text-gray-700 text-center leading-tight">
              {t.advancePay}
            </span>
          </button>
        </div>
      </div>

      {/* Recent Claims */}
      <div className="flex-1 px-6 pb-6">
        <h3 className="text-sm text-gray-700 mb-3">{t.recentClaims}</h3>
        <div className="space-y-3">
          {mockClaims.length > 0 ? (
            mockClaims.map((claim) => (
              <Card key={claim.id} className="p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    #{claim.id}
                  </span>
                  <Badge
                    variant={
                      claim.status === "approved"
                        ? "default"
                        : claim.status === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                    className="text-xs"
                    style={
                      claim.status === "approved"
                        ? { backgroundColor: "#00A878" }
                        : {}
                    }
                  >
                    {claim.status === "approved" && (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    )}
                    {claim.status === "pending" && (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    {claim.status === "flagged" && (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {t.status[claim.status]}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{claim.type}</p>
                    <p className="text-xs text-gray-500">{claim.date}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {claim.amount}
                  </span>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">{t.noClaims}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
