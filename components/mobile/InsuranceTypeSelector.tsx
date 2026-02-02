"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowLeft, Info } from 'lucide-react';
import { InsuranceType } from '../MobileApp';
import { motion } from 'motion/react';

interface InsuranceTypeSelectorProps {
  onBack: () => void;
  onSelect: (type: InsuranceType) => void;
  language: 'en' | 'pidgin' | 'yoruba' | 'igbo' | 'hausa';
} 

const text = {
  en: {
    title: 'Select Insurance Type',
    subtitle: 'Choose the type of insurance claim you want to file',
    next: 'Continue'
  },
  hi: {
    title: 'बीमा प्रकार चुनें',
    subtitle: 'वह बीमा दावा प्रकार चुनें जो आप दर्ज करना चाहते हैं',
    next: 'जारी रखें'
  }
};

const insuranceTypes = {
  en: [
    {
      id: 'health' as InsuranceType,
      title: 'Health Insurance',
      subtitle: 'Hospitalization, OPD',
      icon: '🏥',
      docs: 'Hospital bills, discharge summary, prescriptions'
    },
    {
      id: 'motor' as InsuranceType,
      title: 'Motor Insurance',
      subtitle: 'Car, Two-wheeler, Commercial',
      icon: '🚗',
      docs: 'Damage photos, RC book, driving license'
    },
    {
      id: 'term-life' as InsuranceType,
      title: 'Term Life Insurance',
      subtitle: 'Life coverage claims',
      icon: '👨‍👩‍👧‍👦',
      docs: 'Death certificate, medical records, nominee KYC'
    },
    {
      id: 'life-other' as InsuranceType,
      title: 'Life - Other',
      subtitle: 'Whole Life, Endowment, ULIP',
      icon: '💼',
      docs: 'Policy documents, nominee details'
    },
    {
      id: 'home' as InsuranceType,
      title: 'Home Insurance',
      subtitle: 'Property damage claims',
      icon: '🏠',
      docs: 'Property deed, damage photos, repair estimates'
    },
    {
      id: 'crop' as InsuranceType,
      title: 'Crop Insurance',
      subtitle: 'Parametric & Indemnity',
      icon: '🌾',
      docs: 'Field photos, farmer ID, weather data'
    },
    {
      id: 'travel' as InsuranceType,
      title: 'Travel Insurance',
      subtitle: 'Trip-related claims',
      icon: '✈️',
      docs: 'Boarding pass, medical reports, receipts'
    },
    {
      id: 'personal-accident' as InsuranceType,
      title: 'Personal Accident',
      subtitle: 'Accident-related claims',
      icon: '🚑',
      docs: 'Medical reports, police FIR, employer certificate'
    },
    {
      id: 'disability' as InsuranceType,
      title: 'Disability Insurance',
      subtitle: 'Disability-related claims',
      icon: '♿',
      docs: 'Medical assessment, disability certificate'
    },
    {
      id: 'pet' as InsuranceType,
      title: 'Pet Insurance',
      subtitle: 'Pet health claims',
      icon: '🐕',
      docs: 'Vet bills, medical records, photos'
    },
    {
      id: 'commercial' as InsuranceType,
      title: 'Commercial Insurance',
      subtitle: 'Small business claims',
      icon: '🏢',
      docs: 'Business registration, damage assessment'
    },
    {
      id: 'marine' as InsuranceType,
      title: 'Marine Insurance',
      subtitle: 'Cargo & shipping',
      icon: '🚢',
      docs: 'Bill of lading, cargo damage photos'
    }
  ],
  hi: [
    {
      id: 'health' as InsuranceType,
      title: 'स्वास्थ्य बीमा',
      subtitle: 'अस्पताल में भर्ती, OPD',
      icon: '🏥',
      docs: 'अस्पताल के बिल, डिस्चार्ज सारांश, नुस्खे'
    },
    {
      id: 'motor' as InsuranceType,
      title: 'मोटर बीमा',
      subtitle: 'कार, दोपहिया, वाणिज्यिक',
      icon: '🚗',
      docs: 'क्षति की तस्वीरें, RC बुक, ड्राइविंग लाइसेंस'
    },
    {
      id: 'term-life' as InsuranceType,
      title: 'टर्म लाइफ इंश्योरेंस',
      subtitle: 'जीवन कवरेज दावे',
      icon: '👨‍👩‍👧‍👦',
      docs: 'मृत्यु प्रमाण पत्र, चिकित्सा रिकॉर्ड, नामांकित KYC'
    },
    {
      id: 'life-other' as InsuranceType,
      title: 'जीवन - अन्य',
      subtitle: 'पूर्ण जीवन, बंदोबस्ती, ULIP',
      icon: '💼',
      docs: 'नीति दस्तावेज, नामांकित विवरण'
    },
    {
      id: 'home' as InsuranceType,
      title: 'गृह बीमा',
      subtitle: 'संपत्ति क्षति दावे',
      icon: '🏠',
      docs: 'संपत्ति पत्र, क्षति की तस्वीरें, मरम्मत अनुमान'
    },
    {
      id: 'crop' as InsuranceType,
      title: 'फसल बीमा',
      subtitle: 'पैरामेट्रिक और क्षतिपूर्ति',
      icon: '🌾',
      docs: 'खेत की तस्वीरें, किसान ID, मौसम डेटा'
    },
    {
      id: 'travel' as InsuranceType,
      title: 'यात्रा बीमा',
      subtitle: 'यात्रा संबंधी दावे',
      icon: '✈️',
      docs: 'बोर्डिंग पास, चिकित्सा रिपोर्ट, रसीदें'
    },
    {
      id: 'personal-accident' as InsuranceType,
      title: 'व्यक्तिगत दुर्घटना',
      subtitle: 'दुर्घटना संबंधी दावे',
      icon: '🚑',
      docs: 'चिकित्सा रिपोर्ट, पुलिस FIR, नियोक्ता प्रमाणपत्र'
    },
    {
      id: 'disability' as InsuranceType,
      title: 'विकलांगता बीमा',
      subtitle: 'विकलांगता संबंधी दावे',
      icon: '♿',
      docs: 'चिकित्सा मूल्यांकन, विकलांगता प्रमाणपत्र'
    },
    {
      id: 'pet' as InsuranceType,
      title: 'पालतू बीमा',
      subtitle: 'पालतू स्वास्थ्य दावे',
      icon: '🐕',
      docs: 'पशु चिकित्सक बिल, चिकित्सा रिकॉर्ड, तस्वीरें'
    },
    {
      id: 'commercial' as InsuranceType,
      title: 'वाणिज्यिक बीमा',
      subtitle: 'छोटे व्यापार दावे',
      icon: '🏢',
      docs: 'व्यापार पंजीकरण, क्षति मूल्यांकन'
    },
    {
      id: 'marine' as InsuranceType,
      title: 'समुद्री बीमा',
      subtitle: 'कार्गो और शिपिंग',
      icon: '🚢',
      docs: 'बिल ऑफ लेडिंग, कार्गो क्षति तस्वीरें'
    }
  ]
};

export function InsuranceTypeSelector({ onBack, onSelect, language }: InsuranceTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<InsuranceType | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  
  const t = (text as Record<string, typeof text['en']>)[language] ?? text.en;
  const types = insuranceTypes[language];

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">{t.title}</h1>
            <p className="text-sm text-gray-600">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Insurance Types Grid */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {types.map((type) => (
            <motion.div
              key={type.id}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.12 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all duration-200 relative ${
                  selectedType === type.id
                    ? 'ring-2 ring-blue-500 shadow-lg'
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <h3 className="font-medium text-sm mb-1">{type.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{type.subtitle}</p>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTooltip(showTooltip === type.id ? null : type.id);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                {selectedType === type.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-xs">✓</span>
                  </motion.div>
                )}

                {showTooltip === type.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-10 bottom-full mb-2 left-0 right-0 bg-gray-900 text-white text-xs p-2 rounded-lg"
                  >
                    {type.docs}
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      {selectedType && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-6 border-t border-gray-100"
        >
          <Button
            onClick={() => onSelect(selectedType)}
            className="w-full h-12"
            style={{ backgroundColor: '#0057B7' }}
          >
            {t.next}
          </Button>
        </motion.div>
      )}
    </div>
  );
}