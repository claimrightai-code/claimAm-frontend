"use client";
import { Smartphone, Wifi, WifiOff, Download, Info } from 'lucide-react';
import { useState } from 'react';

interface RuralModeProps {
  language: 'english' | 'pidgin';
}

export function RuralMode({ language }: RuralModeProps) {
  const [isRuralMode, setIsRuralMode] = useState(false);

  const text = {
    english: {
      title: 'Rural Mode',
      subtitle: 'Ultra-light version for basic phones',
      currentMode: 'Current Mode',
      standard: 'Standard Mode',
      rural: 'Rural Mode',
      toggle: 'Switch to Rural Mode',
      toggleBack: 'Switch to Standard Mode',
      benefits: 'Benefits of Rural Mode',
      benefit1: 'Works on 2G networks',
      benefit2: 'Uses 90% less data',
      benefit3: 'Text-only interface',
      benefit4: 'USSD fallback (*669#)',
      benefit5: 'Faster loading times',
      benefit6: 'Works offline for basic tasks',
      ussd: 'USSD Quick Guide',
      ussdDesc: 'Teach users to dial *669# from any phone',
      steps: 'Steps',
      step1: 'Dial *669# from any phone',
      step2: 'Select language (English/Pidgin/Hausa/Igbo/Yoruba)',
      step3: 'Choose: 1=File Claim, 2=Check Status, 3=Register',
      step4: 'Follow the prompts',
      step5: 'Receive SMS confirmation',
      download: 'Download USSD Training Materials',
      note: 'Important Note',
      noteDesc: 'Rural Mode is optimized for agents working in areas with poor internet connectivity. It disables images, videos, and heavy animations.',
    },
    pidgin: {
      title: 'Village Mode',
      subtitle: 'Small version wey go work for basic phone',
      currentMode: 'Current Mode',
      standard: 'Standard Mode',
      rural: 'Village Mode',
      toggle: 'Change to Village Mode',
      toggleBack: 'Change to Standard Mode',
      benefits: 'Wetin Village Mode Go Do For You',
      benefit1: 'E dey work for 2G network',
      benefit2: 'E dey use 90% less data',
      benefit3: 'Na only text, no pictures',
      benefit4: 'USSD fallback (*669#)',
      benefit5: 'E dey load faster',
      benefit6: 'E dey work offline for small tins',
      ussd: 'USSD Quick Guide',
      ussdDesc: 'Teach people make dem dial *669# from any phone',
      steps: 'Steps',
      step1: 'Dial *669# from any phone',
      step2: 'Pick language (English/Pidgin/Hausa/Igbo/Yoruba)',
      step3: 'Choose: 1=File Claim, 2=Check Status, 3=Register',
      step4: 'Follow the prompts',
      step5: 'You go receive SMS confirmation',
      download: 'Download USSD Training Materials',
      note: 'Important Note',
      noteDesc: 'Village Mode na for agents wey dey work for place wey internet no dey fine. E go off pictures, videos, and heavy animations.',
    },
  };

  const t = text[language];

  const benefits = [
    { text: t.benefit1, icon: '📡' },
    { text: t.benefit2, icon: '💾' },
    { text: t.benefit3, icon: '📝' },
    { text: t.benefit4, icon: '📞' },
    { text: t.benefit5, icon: '⚡' },
    { text: t.benefit6, icon: '🔌' },
  ];

  const ussdSteps = [
    { step: '1', text: t.step1, icon: '📱' },
    { step: '2', text: t.step2, icon: '🌍' },
    { step: '3', text: t.step3, icon: '📋' },
    { step: '4', text: t.step4, icon: '👆' },
    { step: '5', text: t.step5, icon: '✉️' },
  ];

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl text-[#1A1A1A] mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Current Mode Status */}
      <div className={`rounded-2xl p-8 mb-8 shadow-lg transition-all ${
        isRuralMode
          ? 'bg-gradient-to-br from-orange-500 to-orange-600'
          : 'bg-gradient-to-br from-[#00BA00] to-[#00C853]'
      }`}>
        <div className="flex items-center justify-between text-white mb-6">
          <div>
            <p className="text-sm opacity-90 mb-2">{t.currentMode}</p>
            <p className="text-4xl mb-2">{isRuralMode ? t.rural : t.standard}</p>
            <div className="flex items-center gap-2 text-sm opacity-90">
              {isRuralMode ? (
                <>
                  <WifiOff className="w-4 h-4" />
                  <span>Optimized for 2G networks</span>
                </>
              ) : (
                <>
                  <Wifi className="w-4 h-4" />
                  <span>Full-featured experience</span>
                </>
              )}
            </div>
          </div>
          <Smartphone className="w-20 h-20 opacity-80" />
        </div>
        <button
          onClick={() => setIsRuralMode(!isRuralMode)}
          className="w-full bg-white text-[#1A1A1A] py-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          <Smartphone className="w-5 h-5" />
          {isRuralMode ? t.toggleBack : t.toggle}
        </button>
      </div>

      {/* Benefits Grid */}
      <div className="mb-8">
        <h3 className="text-lg text-[#1A1A1A] mb-4">{t.benefits}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-3">{benefit.icon}</div>
              <p className="text-[#1A1A1A]">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* USSD Guide */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg text-[#1A1A1A]">{t.ussd}</h3>
            <p className="text-sm text-gray-600">{t.ussdDesc}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 mb-6 text-white">
          <div className="text-center mb-4">
            <p className="text-sm opacity-90 mb-2">Feature Phone Display</p>
            <div className="bg-green-400 text-gray-900 rounded-lg p-4 inline-block">
              <p className="text-2xl tracking-wider">*669#</p>
            </div>
          </div>
          <div className="space-y-2 text-sm font-mono">
            <p className="opacity-90">Welcome to ClaimAm!</p>
            <p className="opacity-90">1. File New Claim</p>
            <p className="opacity-90">2. Check Claim Status</p>
            <p className="opacity-90">3. Register New User</p>
            <p className="opacity-90">4. View Balance</p>
            <p className="opacity-90">5. Change Language</p>
            <p className="mt-4 text-green-400">Enter option (1-5):</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {ussdSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00BA00] to-[#00C853] rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                {step.step}
              </div>
              <div className="flex-1">
                <p className="text-[#1A1A1A]">{step.text}</p>
              </div>
              <div className="text-2xl">{step.icon}</div>
            </div>
          ))}
        </div>

        <button className="w-full bg-[#00BA00] hover:bg-[#00C853] text-white py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg">
          <Download className="w-5 h-5" />
          {t.download}
        </button>
      </div>

      {/* Important Note */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-lg text-blue-900 mb-2">{t.note}</h4>
            <p className="text-sm text-blue-800">{t.noteDesc}</p>
          </div>
        </div>
      </div>

      {/* Visual Comparison */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
          <h4 className="text-lg text-[#1A1A1A] mb-4 flex items-center gap-2">
            <Wifi className="w-5 h-5 text-[#00BA00]" />
            Standard Mode
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Images & Graphics</span>
              <span className="text-green-600">✓ Enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Animations</span>
              <span className="text-green-600">✓ Enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Charts & Graphs</span>
              <span className="text-green-600">✓ Enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Data Usage</span>
              <span className="text-orange-600">High</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Network Required</span>
              <span className="text-orange-600">3G/4G</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
          <h4 className="text-lg text-[#1A1A1A] mb-4 flex items-center gap-2">
            <WifiOff className="w-5 h-5 text-orange-600" />
            Rural Mode
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Images & Graphics</span>
              <span className="text-red-600">✗ Disabled</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Animations</span>
              <span className="text-red-600">✗ Disabled</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Charts & Graphs</span>
              <span className="text-yellow-600">⚠ Simplified</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Data Usage</span>
              <span className="text-green-600">Minimal</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Network Required</span>
              <span className="text-green-600">2G/EDGE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
