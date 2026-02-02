"use client";
import React, { useState } from 'react';
import { SplashScreen } from './mobile/SplashScreen';
import { OnboardingCarousel } from './mobile/OnboardingCarousel';
import { PhoneLogin } from './mobile/PhoneLogin';
import { SignupScreen } from './mobile/SignupScreen';
import { ForgotPasswordScreen } from './mobile/ForgotPasswordScreen';
import { SubscriptionScreen } from './mobile/SubscriptionScreen';
import { WelcomeScreen } from './mobile/WelcomeScreen';
import { InsuranceTypeSelector } from './mobile/InsuranceTypeSelector';
import { ClaimDetailsForm } from './mobile/ClaimDetailsForm';
import { DocumentUpload } from './mobile/DocumentUpload';
import { ScanningPipeline } from './mobile/ScanningPipeline';
import { ResultsScreen } from './mobile/ResultsScreen';
import { DocumentViewer } from './mobile/DocumentViewer';
import { ProfileScreen } from './mobile/ProfileScreen';
import { ChatBot } from './mobile/ChatBot';
import { AdvancePay } from './mobile/AdvancePay';
import { USSDFlow } from './mobile/USSDFlow';
import { AdvancePayEligible } from './mobile/AdvancePayEligible';
import { AdvancePayIneligible } from './mobile/AdvancePayIneligible';
import { AdvancePayForm } from './mobile/AdvancePayForm';
import { AdvancePayProcessing } from './mobile/AdvancePayProcessing';
import { ClaimsListScreen } from './mobile/ClaimsListScreen';

export type InsuranceType = 
  | 'health' | 'motor' | 'term-life' | 'life-other' | 'home' 
  | 'crop' | 'travel' | 'personal-accident' | 'disability' 
  | 'pet' | 'commercial' | 'marine';

export interface ClaimData {
  id?: string;
  insuranceType: string;
  policyHolder: string;
  policyNumber: string;
  incidentDate: string;
  description: string;
  claimAmount: string;
  documents: UploadedDocument[];
  fraudScore?: number;
  status?: 'submitted' | 'analyzing' | 'approved' | 'flagged' | 'rejected';
} 

export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  required: boolean;
  category: string;
}

export type MobileScreen = 
  | 'splash' | 'onboarding' | 'login' | 'signup' | 'forgot-password' | 'subscription' | 'welcome' | 'insurance-type' | 'claim-details' | 'documents' 
  | 'scanning' | 'results' | 'document-viewer' | 'profile' | 'advance-pay' | 'ussd-flow'
  | 'advance-pay-check' | 'advance-pay-eligible' | 'advance-pay-ineligible' | 'advance-pay-form' | 'advance-pay-processing'
  | 'claims-list';

export function MobileApp() {
  const [currentScreen, setCurrentScreen] = useState<MobileScreen>('splash');
  const [claimData, setClaimData] = useState<ClaimData>({
    insuranceType: 'health',
    policyHolder: 'Chidinma Okafor',
    policyNumber: 'POL-NG-2024-8847',
    incidentDate: '',
    description: '',
    claimAmount: '',
    documents: []
  });
  const [language, setLanguage] = useState<'en' | 'pidgin' | 'yoruba' | 'igbo' | 'hausa'>('en');
  const [showChat, setShowChat] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<UploadedDocument | null>(null);
  const [userPhone, setUserPhone] = useState('09031245541');
  const [isPremium, setIsPremium] = useState(false);
  const [subscriptionExpiry, setSubscriptionExpiry] = useState<Date | null>(null);

  // Check subscription status on mount and regularly
  React.useEffect(() => {
    const checkSubscription = () => {
      const stored = localStorage.getItem('claimam_subscription');
      if (stored) {
        const data = JSON.parse(stored);
        const expiry = new Date(data.expiryDate);
        const now = new Date();
        
        if (expiry > now) {
          setIsPremium(true);
          setSubscriptionExpiry(expiry);
        } else {
          // Subscription expired
          setIsPremium(false);
          setSubscriptionExpiry(null);
          localStorage.removeItem('claimam_subscription');
        }
      }
    };

    checkSubscription();
    // Check every minute
    const interval = setInterval(checkSubscription, 60000);
    return () => clearInterval(interval);
  }, []);

  // Mobile container with iPhone 14 dimensions
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-[390px] h-[844px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative">
        {/* Render current screen */}
        {currentScreen === 'splash' && (
          <SplashScreen onComplete={() => setCurrentScreen('onboarding')} />
        )}

        {currentScreen === 'onboarding' && (
          <OnboardingCarousel 
            onComplete={() => setCurrentScreen('login')}
            onSignup={() => setCurrentScreen('signup')}
          />
        )}

        {currentScreen === 'login' && (
          <PhoneLogin 
            onComplete={() => setCurrentScreen('subscription')}
            onBack={() => setCurrentScreen('onboarding')}
            onSwitchToSignup={() => setCurrentScreen('signup')}
            onForgotPassword={() => setCurrentScreen('forgot-password')}
          />
        )}

        {currentScreen === 'signup' && (
          <SignupScreen 
            onComplete={() => setCurrentScreen('subscription')}
            onBack={() => setCurrentScreen('onboarding')}
            onSwitchToLogin={() => setCurrentScreen('login')}
          />
        )}

        {currentScreen === 'forgot-password' && (
          <ForgotPasswordScreen 
            onComplete={() => setCurrentScreen('login')}
            onBack={() => setCurrentScreen('login')}
          />
        )}

        {currentScreen === 'subscription' && (
          <SubscriptionScreen 
            onComplete={(premium) => {
              if (premium !== undefined) {
                setIsPremium(premium);
                // Re-check subscription from localStorage
                const stored = localStorage.getItem('claimam_subscription');
                if (stored) {
                  const data = JSON.parse(stored);
                  setSubscriptionExpiry(new Date(data.expiryDate));
                }
              }
              setCurrentScreen('welcome');
            }}
            onBack={() => setCurrentScreen('login')}
            userPhone={userPhone}
          />
        )}

        {currentScreen === 'welcome' && (
          <WelcomeScreen 
            onNavigate={setCurrentScreen}
            language={language}
            isPremium={isPremium}
            subscriptionExpiry={subscriptionExpiry}
            onLanguageToggle={() => {
              const langs: Array<'en' | 'pidgin' | 'yoruba' | 'igbo' | 'hausa'> = ['en', 'pidgin', 'yoruba', 'igbo', 'hausa'];
              const currentIndex = langs.indexOf(language);
              setLanguage(langs[(currentIndex + 1) % langs.length]);
            }}
          />
        )}

        {currentScreen === 'claims-list' && (
          <ClaimsListScreen
            onNavigate={setCurrentScreen}
            onBack={() => setCurrentScreen('welcome')}
          />
        )}

        {currentScreen === 'advance-pay' && (
          <AdvancePay onBack={() => setCurrentScreen('welcome')} />
        )}

        {currentScreen === 'advance-pay-check' && (
          <AdvancePayEligible onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'advance-pay-eligible' && (
          <AdvancePayEligible onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'advance-pay-ineligible' && (
          <AdvancePayIneligible onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'advance-pay-form' && (
          <AdvancePayForm onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'advance-pay-processing' && (
          <AdvancePayProcessing onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'ussd-flow' && (
          <USSDFlow onBack={() => setCurrentScreen('welcome')} />
        )}
        
        {currentScreen === 'insurance-type' && (
          <InsuranceTypeSelector
            onBack={() => setCurrentScreen('welcome')}
            onSelect={(type) => {
              setClaimData(prev => ({ ...prev, insuranceType: type }));
              setCurrentScreen('claim-details');
            }}
            language={language}
          />
        )}
        
        {currentScreen === 'claim-details' && (
          <ClaimDetailsForm
            claimData={claimData}
            onUpdate={setClaimData}
            onBack={() => setCurrentScreen('insurance-type')}
            onNext={() => setCurrentScreen('documents')}
            language={language}
          />
        )}
        
        {currentScreen === 'documents' && (
          <DocumentUpload
            claimData={claimData}
            onUpdate={setClaimData}
            onBack={() => setCurrentScreen('claim-details')}
            onSubmit={() => setCurrentScreen('scanning')}
            onViewDocument={(doc) => {
              setSelectedDocument(doc);
              setCurrentScreen('document-viewer');
            }}
            language={language}
          />
        )}
        
        {currentScreen === 'scanning' && (
          <ScanningPipeline
            claimData={claimData}
            onComplete={(updatedClaim) => {
              setClaimData(updatedClaim);
              setCurrentScreen('results');
            }}
            language={language}
          />
        )}
        
        {currentScreen === 'results' && (
          <ResultsScreen
            claimData={claimData}
            onNavigate={setCurrentScreen}
            language={language}
          />
        )}
        
        {currentScreen === 'document-viewer' && selectedDocument && (
          <DocumentViewer
            document={selectedDocument}
            onBack={() => setCurrentScreen('documents')}
            claimData={claimData}
            language={language}
          />
        )}
        
        {currentScreen === 'profile' && (
          <ProfileScreen
            onBack={() => setCurrentScreen('welcome')}
            language={language}
            onLanguageToggle={() => {
              const langs: Array<'en' | 'pidgin' | 'yoruba' | 'igbo' | 'hausa'> = ['en', 'pidgin', 'yoruba', 'igbo', 'hausa'];
              const currentIndex = langs.indexOf(language);
              setLanguage(langs[(currentIndex + 1) % langs.length]);
            }}
          />
        )}

        {/* Floating Chat Button */}
        {!showChat && (
          <button
            onClick={() => setShowChat(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
            style={{ background: '#0057B7' }}
          >
            💬
          </button>
        )}

        {/* Chat Modal */}
        {showChat && (
          <ChatBot
            onClose={() => setShowChat(false)}
            language={language}
          />
        )}
      </div>
    </div>
  );
}