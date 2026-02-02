import { InsuranceType } from '../components/MobileApp';

export interface DocumentRequirement {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  required: boolean;
  category: string;
  acceptedTypes: string[];
}

export const getDocumentRequirements = (insuranceType: InsuranceType): DocumentRequirement[] => {
  const requirements: Record<InsuranceType, DocumentRequirement[]> = {
    'health': [
      {
        id: 'hospital-bill',
        name: 'Hospital Bills',
        nameHi: 'अस्पताल के बिल',
        description: 'Original hospital bills and receipts',
        descriptionHi: 'मूल अस्पताल के बिल और रसीदें',
        required: true,
        category: 'medical',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'discharge-summary',
        name: 'Discharge Summary',
        nameHi: 'डिस्चार्ज सारांश',
        description: 'Hospital discharge summary or certificate',
        descriptionHi: 'अस्पताल डिस्चार्ज सारांश या प्रमाणपत्र',
        required: true,
        category: 'medical',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'prescription',
        name: 'Doctor Prescription',
        nameHi: 'डॉक्टर का नुस्खा',
        description: 'Original prescription from treating doctor',
        descriptionHi: 'इलाज करने वाले डॉक्टर से मूल नुस्खा',
        required: true,
        category: 'medical',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'pharmacy-bills',
        name: 'Pharmacy Bills',
        nameHi: 'फार्मेसी के बिल',
        description: 'Medicine purchase receipts',
        descriptionHi: 'दवा खरीदारी की रसीदें',
        required: false,
        category: 'financial',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'policy-copy',
        name: 'Policy Copy',
        nameHi: 'पॉलिसी की प्रति',
        description: 'Copy of insurance policy',
        descriptionHi: 'बीमा पॉलिसी की प्रति',
        required: true,
        category: 'identity',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'id-proof',
        name: 'ID Proof',
        nameHi: 'पहचान प्रमाण',
        description: 'Government issued ID (Aadhaar, PAN, etc.)',
        descriptionHi: 'सरकारी पहचान पत्र (आधार, पैन, आदि)',
        required: true,
        category: 'identity',
        acceptedTypes: ['image/*', 'application/pdf']
      }
    ],
    'motor': [
      {
        id: 'damage-photos',
        name: 'Vehicle Damage Photos',
        nameHi: 'वाहन क्षति की तस्वीरें',
        description: 'Clear photos of vehicle damage from multiple angles',
        descriptionHi: 'कई कोणों से वाहन क्षति की स्पष्ट तस्वीरें',
        required: true,
        category: 'evidence',
        acceptedTypes: ['image/*']
      },
      {
        id: 'driving-license',
        name: 'Driving License',
        nameHi: 'ड्राइविंग लाइसेंस',
        description: 'Valid driving license of the driver',
        descriptionHi: 'चालक का वैध ड्राइविंग लाइसेंस',
        required: true,
        category: 'identity',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'rc-book',
        name: 'RC Book',
        nameHi: 'RC पुस्तक',
        description: 'Vehicle registration certificate',
        descriptionHi: 'वाहन पंजीकरण प्रमाणपत्र',
        required: true,
        category: 'identity',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'repair-estimate',
        name: 'Repair Estimate',
        nameHi: 'मरम्मत का अनुमान',
        description: 'Authorized garage repair estimate',
        descriptionHi: 'अधिकृत गैरेज मरम्मत अनुमान',
        required: true,
        category: 'financial',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'fir',
        name: 'Police FIR',
        nameHi: 'पुलिस FIR',
        description: 'FIR copy (if theft/major accident)',
        descriptionHi: 'FIR की प्रति (यदि चोरी/बड़ी दुर्घटना)',
        required: false,
        category: 'legal',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'telematics',
        name: 'Telematics Data',
        nameHi: 'टेलीमैटिक्स डेटा',
        description: 'Vehicle tracking/sensor data (if available)',
        descriptionHi: 'वाहन ट्रैकिंग/सेंसर डेटा (यदि उपलब्ध हो)',
        required: false,
        category: 'technical',
        acceptedTypes: ['image/*', 'application/pdf']
      }
    ],
    'crop': [
      {
        id: 'field-photos',
        name: 'Field Photos',
        nameHi: 'खेत की तस्वीरें',
        description: 'Photos showing crop damage/loss',
        descriptionHi: 'फसल क्षति/हानि दिखाने वाली तस्वीरें',
        required: true,
        category: 'evidence',
        acceptedTypes: ['image/*']
      },
      {
        id: 'farmer-id',
        name: 'Farmer ID',
        nameHi: 'किसान पहचान पत्र',
        description: 'Farmer registration certificate',
        descriptionHi: 'किसान पंजीकरण प्रमाणपत्र',
        required: true,
        category: 'identity',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'seed-invoice',
        name: 'Seed/Pesticide Invoice',
        nameHi: 'बीज/कीटनाशक का बिल',
        description: 'Purchase receipts for seeds and pesticides',
        descriptionHi: 'बीज और कीटनाशकों की खरीदारी रसीदें',
        required: true,
        category: 'financial',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'weather-data',
        name: 'Weather Data',
        nameHi: 'मौसम डेटा',
        description: 'Weather report screenshot during loss period',
        descriptionHi: 'नुकसान अवधि के दौरान मौसम रिपोर्ट का स्क्रीनशॉट',
        required: false,
        category: 'technical',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'land-record',
        name: 'Land Records',
        nameHi: 'भूमि रिकॉर्ड',
        description: 'Land ownership documents',
        descriptionHi: 'भूमि स्वामित्व दस्तावेज',
        required: true,
        category: 'identity',
        acceptedTypes: ['image/*', 'application/pdf']
      }
    ],
    'term-life': [
      {
        id: 'death-certificate',
        name: 'Death Certificate',
        nameHi: 'मृत्यु प्रमाणपत्र',
        description: 'Official death certificate',
        descriptionHi: 'आधिकारिक मृत्यु प्रमाणपत्र',
        required: true,
        category: 'legal',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'hospital-records',
        name: 'Hospital Records',
        nameHi: 'अस्पताल के रिकॉर्ड',
        description: 'Medical records and treatment history',
        descriptionHi: 'चिकित्सा रिकॉर्ड और उपचार इतिहास',
        required: true,
        category: 'medical',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'nominee-kyc',
        name: 'Nominee KYC',
        nameHi: 'नामांकित KYC',
        description: 'Nominee identification and bank details',
        descriptionHi: 'नामांकित की पहचान और बैंक विवरण',
        required: true,
        category: 'identity',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'policy-copy',
        name: 'Policy Copy',
        nameHi: 'पॉलिसी की प्रति',
        description: 'Original insurance policy document',
        descriptionHi: 'मूल बीमा पॉलिसी दस्तावेज',
        required: true,
        category: 'identity',
        acceptedTypes: ['image/*', 'application/pdf']
      }
    ],
    'home': [
      {
        id: 'property-deed',
        name: 'Property Deed',
        nameHi: 'संपत्ति का पत्र',
        description: 'Property ownership proof',
        descriptionHi: 'संपत्ति स्वामित्व प्रमाण',
        required: true,
        category: 'identity',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'damage-photos',
        name: 'Damage Photos',
        nameHi: 'क्षति की तस्वीरें',
        description: 'Photos of property damage',
        descriptionHi: 'संपत्ति क्षति की तस्वीरें',
        required: true,
        category: 'evidence',
        acceptedTypes: ['image/*']
      },
      {
        id: 'repair-estimate',
        name: 'Repair Estimate',
        nameHi: 'मरम्मत का अनुमान',
        description: 'Professional repair cost estimate',
        descriptionHi: 'व्यावसायिक मरम्मत लागत अनुमान',
        required: true,
        category: 'financial',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'police-fir',
        name: 'Police FIR',
        nameHi: 'पुलिस FIR',
        description: 'Police report (if theft/vandalism)',
        descriptionHi: 'पुलिस रिपोर्ट (यदि चोरी/तोड़फोड़)',
        required: false,
        category: 'legal',
        acceptedTypes: ['image/*', 'application/pdf']
      }
    ],
    'travel': [
      {
        id: 'boarding-pass',
        name: 'Boarding Pass',
        nameHi: 'बोर्डिंग पास',
        description: 'Flight boarding passes',
        descriptionHi: 'फ्लाइट बोर्डिंग पास',
        required: true,
        category: 'travel',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'medical-reports',
        name: 'Medical Reports',
        nameHi: 'चिकित्सा रिपोर्ट',
        description: 'Medical certificates if health-related claim',
        descriptionHi: 'स्वास्थ्य संबंधी दावे के लिए चिकित्सा प्रमाणपत्र',
        required: false,
        category: 'medical',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'police-report',
        name: 'Police Report',
        nameHi: 'पुलिस रिपोर्ट',
        description: 'Police report (if theft/loss)',
        descriptionHi: 'पुलिस रिपोर्ट (यदि चोरी/हानि)',
        required: false,
        category: 'legal',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'receipts',
        name: 'Expense Receipts',
        nameHi: 'खर्च की रसीदें',
        description: 'Receipts for additional expenses',
        descriptionHi: 'अतिरिक्त खर्चों की रसीदें',
        required: true,
        category: 'financial',
        acceptedTypes: ['image/*', 'application/pdf']
      }
    ],
    'personal-accident': [
      {
        id: 'medical-reports',
        name: 'Medical Reports',
        nameHi: 'चिकित्सा रिपोर्ट',
        description: 'Medical examination and treatment records',
        descriptionHi: 'चिकित्सा परीक्षा और उपचार रिकॉर्ड',
        required: true,
        category: 'medical',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'police-fir',
        name: 'Police FIR',
        nameHi: 'पुलिस FIR',
        description: 'Police report of the accident',
        descriptionHi: 'दुर्घटना की पुलिस रिपोर्ट',
        required: true,
        category: 'legal',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'employer-cert',
        name: 'Employer Certificate',
        nameHi: 'नियोक्ता प्रमाणपत्र',
        description: 'Certificate from employer (if workplace accident)',
        descriptionHi: 'नियोक्ता से प्रमाणपत्र (यदि कार्यस्थल दुर्घटना)',
        required: false,
        category: 'identity',
        acceptedTypes: ['image/*', 'application/pdf']
      }
    ],
    'disability': [
      {
        id: 'medical-assessment',
        name: 'Medical Assessment',
        nameHi: 'चिकित्सा मूल्यांकन',
        description: 'Comprehensive medical assessment report',
        descriptionHi: 'व्यापक चिकित्सा मूल्यांकन रिपोर्ट',
        required: true,
        category: 'medical',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'disability-cert',
        name: 'Disability Certificate',
        nameHi: 'विकलांगता प्रमाणपत्र',
        description: 'Official disability certificate',
        descriptionHi: 'आधिकारिक विकलांगता प्रमाणपत्र',
        required: true,
        category: 'legal',
        acceptedTypes: ['image/*', 'application/pdf']
      }
    ],
    'pet': [
      {
        id: 'vet-bills',
        name: 'Veterinary Bills',
        nameHi: 'पशु चिकित्सक के बिल',
        description: 'Veterinary treatment bills and receipts',
        descriptionHi: 'पशु चिकित्सा उपचार बिल और रसीदें',
        required: true,
        category: 'financial',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'medical-records',
        name: 'Pet Medical Records',
        nameHi: 'पालतू चिकित्सा रिकॉर्ड',
        description: 'Pet medical history and treatment records',
        descriptionHi: 'पालतू चिकित्सा इतिहास और उपचार रिकॉर्ड',
        required: true,
        category: 'medical',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'pet-photos',
        name: 'Pet Photos',
        nameHi: 'पालतू की तस्वीरें',
        description: 'Photos showing pet condition/injury',
        descriptionHi: 'पालतू की स्थिति/चोट दिखाने वाली तस्वीरें',
        required: false,
        category: 'evidence',
        acceptedTypes: ['image/*']
      }
    ],
    'commercial': [
      {
        id: 'business-registration',
        name: 'Business Registration',
        nameHi: 'व्यापार पंजीकरण',
        description: 'Business registration documents',
        descriptionHi: 'व्यापार पंजीकरण दस्तावेज',
        required: true,
        category: 'identity',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'damage-assessment',
        name: 'Damage Assessment',
        nameHi: 'क्षति मूल्यांकन',
        description: 'Professional damage assessment report',
        descriptionHi: 'व्यावसायिक क्षति मूल्यांकन रिपोर्ट',
        required: true,
        category: 'evidence',
        acceptedTypes: ['image/*', 'application/pdf']
      }
    ],
    'marine': [
      {
        id: 'bill-of-lading',
        name: 'Bill of Lading',
        nameHi: 'बिल ऑफ लेडिंग',
        description: 'Shipping bill of lading',
        descriptionHi: 'शिपिंग बिल ऑफ लेडिंग',
        required: true,
        category: 'legal',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'cargo-photos',
        name: 'Cargo Damage Photos',
        nameHi: 'कार्गो क्षति तस्वीरें',
        description: 'Photos showing cargo damage',
        descriptionHi: 'कार्गो क्षति दिखाने वाली तस्वीरें',
        required: true,
        category: 'evidence',
        acceptedTypes: ['image/*']
      }
    ],
    'life-other': [
      {
        id: 'policy-docs',
        name: 'Policy Documents',
        nameHi: 'पॉलिसी दस्तावेज',
        description: 'Insurance policy documents',
        descriptionHi: 'बीमा पॉलिसी दस्तावेज',
        required: true,
        category: 'identity',
        acceptedTypes: ['image/*', 'application/pdf']
      },
      {
        id: 'nominee-details',
        name: 'Nominee Details',
        nameHi: 'नामांकित विवरण',
        description: 'Nominee identification and details',
        descriptionHi: 'नामांकित की पहचान और विवरण',
        required: true,
        category: 'identity',
        acceptedTypes: ['image/*', 'application/pdf']
      }
    ]
  };

  return requirements[insuranceType] || [];
};