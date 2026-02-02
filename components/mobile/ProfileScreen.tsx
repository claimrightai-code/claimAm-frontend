import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { 
  ArrowLeft, 
  User, 
  Shield, 
  CreditCard, 
  Phone, 
  Mail, 
  MapPin,
  Languages,
  Eye,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  CheckCircle
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileScreenProps {
  onBack: () => void;
  language: 'en' | 'pidgin' | 'yoruba' | 'igbo' | 'hausa';
  onLanguageToggle: () => void;
}

const text = {
  en: {
    title: 'Profile',
    personalInfo: 'Personal Information',
    name: 'Full Name',
    uniqueId: 'Unique ID',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    policies: 'My Policies',
    settings: 'Settings',
    language: 'Language',
    highContrast: 'High Contrast',
    notifications: 'Push Notifications',
    support: 'Support & Help',
    helpCenter: 'Help Center',
    contactSupport: 'Contact Support',
    about: 'About ClaimAm',
    version: 'Version',
    logout: 'Logout',
    active: 'Active',
    expires: 'Expires',
    sumInsured: 'Sum Insured',
    verified: 'Verified'
  },
  pidgin: {
    title: 'Profile',
    personalInfo: 'Your Info',
    name: 'Full Name',
    uniqueId: 'Unique ID',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    policies: 'My Policies',
    settings: 'Settings',
    language: 'Language',
    highContrast: 'High Contrast',
    notifications: 'Push Notifications',
    support: 'Support & Help',
    helpCenter: 'Help Center',
    contactSupport: 'Talk to Support',
    about: 'About ClaimAm',
    version: 'Version',
    logout: 'Comot',
    active: 'Active',
    expires: 'Go Expire',
    sumInsured: 'Insurance Money',
    verified: 'Verified'
  },
  yoruba: {
    title: 'Profáìlì',
    personalInfo: 'Àlàyé Ẹni Kọ̀ọ̀kan',
    name: 'Orúkọ Kíkún',
    uniqueId: 'Nọ́ńbà Àkànṣe',
    email: 'Ímeèlì',
    phone: 'Fóònù',
    address: 'Àdírẹ́sì',
    policies: 'Àwọn Pólísì Mi',
    settings: 'Ètò',
    language: 'Èdè',
    highContrast: 'High Contrast',
    notifications: 'Ìfitọ́nilétí',
    support: 'Ìrànlọ́wọ́',
    helpCenter: 'Àárín Ìrànlọ́wọ́',
    contactSupport: 'Kàn sí Ìrànlọ́wọ́',
    about: 'Nípa ClaimAm',
    version: 'Ẹ̀yà',
    logout: 'Jáde',
    active: 'Ń Ṣiṣẹ́',
    expires: 'Yóò Parí',
    sumInsured: 'Owó Ìnṣúránṣì',
    verified: 'Ìjẹ́rìísí'
  },
  igbo: {
    title: 'Profaịlụ',
    personalInfo: 'Ozi Nkeonwe',
    name: 'Aha Zuru Oke',
    uniqueId: 'Nọmba Pụrụ Iche',
    email: 'Ozi-Eletrọniki',
    phone: 'Ekwentị',
    address: 'Adres',
    policies: 'Polisi M',
    settings: 'Ntọala',
    language: 'Asụsụ',
    highContrast: 'High Contrast',
    notifications: 'Ọkwa Ozi',
    support: 'Nkwado',
    helpCenter: 'Ebe Enyemaka',
    contactSupport: 'Kpọtụrụ Nkwado',
    about: 'Gbasara ClaimAm',
    version: 'Ụdị',
    logout: 'Pụọ',
    active: 'Na-arụ Ọrụ',
    expires: 'Ga-agwụ',
    sumInsured: 'Ego Inshọọransị',
    verified: 'Ekwenyela'
  },
  hausa: {
    title: 'Bayanai',
    personalInfo: 'Bayanan Mutum',
    name: 'Cikakken Suna',
    uniqueId: 'Lambar Keɓantacce',
    email: 'Imel',
    phone: 'Waya',
    address: 'Adireshi',
    policies: 'Manufofina',
    settings: 'Saitunan',
    language: 'Harshe',
    highContrast: 'High Contrast',
    notifications: 'Sanarwa',
    support: 'Tallafi',
    helpCenter: 'Cibiyar Taimako',
    contactSupport: 'Tuntuɓi Tallafi',
    about: 'Game da ClaimAm',
    version: 'Sigar',
    logout: 'Fita',
    active: 'Mai Aiki',
    expires: 'Zai Ƙare',
    sumInsured: 'Kuɗin Inshora',
    verified: 'An Tabbatar'
  }
};

const mockPolicies = [
  {
    id: 'POL-NG-2024-8745',
    type: 'Health Insurance',
    provider: 'Leadway Assurance',
    sumInsured: '₦5,000,000',
    expiry: '22 Nov 2026',
    status: 'active'
  },
  {
    id: 'POL-NG-2024-3421',
    type: 'Motor Insurance',
    provider: 'Custodian Insurance',
    sumInsured: '₦8,500,000',
    expiry: '25 Nov 2025',
    status: 'active'
  },
  {
    id: 'POL-NG-2024-1789',
    type: 'Term Life',
    provider: 'AXA Mansard',
    sumInsured: '₦50,000,000',
    expiry: '20 Nov 2045',
    status: 'active'
  }
];

export function ProfileScreen({ onBack, language, onLanguageToggle }: ProfileScreenProps) {
  const t = text[language];

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg text-gray-900">{t.title}</h1>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#00A878] to-[#0057B7] rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900">Chidinma Okafor</h2>
            <p className="text-sm text-gray-600">CR-2024-8847</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="relative w-5 h-5">
                <Shield className="w-5 h-5 text-[#0057B7]" fill="#0057B7" />
                <CheckCircle className="w-3 h-3 text-[#00A878] absolute top-0.5 left-0.5" />
              </div>
              <span className="text-xs text-gray-600">{t.verified}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Personal Information */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-medium text-gray-900 mb-4">{t.personalInfo}</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">{t.name}</p>
                <p className="font-medium">Chidinma Okafor</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">{t.uniqueId}</p>
                <p className="font-medium font-mono">CR-2024-8847</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">{t.email}</p>
                <p className="font-medium">chidinma.okafor@email.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">{t.phone}</p>
                <p className="font-medium">+234 903 124 5541</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">{t.address}</p>
                <p className="font-medium">Lagos, Nigeria</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Policies */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            {t.policies}
          </h3>
          <div className="space-y-3">
            {mockPolicies.map((policy, index) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-md transition-shadow border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {policy.type}
                      </h4>
                      <p className="text-sm text-gray-600">{policy.provider}</p>
                    </div>
                    <Badge 
                      className="text-xs"
                      style={{ backgroundColor: '#00A878' }}
                    >
                      {t.active}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">{t.sumInsured}:</p>
                      <p className="font-medium">{policy.sumInsured}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{t.expires}:</p>
                      <p className="font-medium">{policy.expiry}</p>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <p className="text-xs text-gray-500 font-mono">{policy.id}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            {t.settings}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Languages className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{t.language}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onLanguageToggle}
                className="text-xs"
              >
                {language === 'en' ? 'Pidgin/Yoruba/Igbo/Hausa' : 'EN'}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{t.highContrast}</span>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{t.notifications}</span>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Support & Help */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            {t.support}
          </h3>
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start p-0 h-auto">
              <div className="flex items-center gap-3 py-2">
                <HelpCircle className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{t.helpCenter}</span>
              </div>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start p-0 h-auto">
              <div className="flex items-center gap-3 py-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{t.contactSupport}</span>
              </div>
            </Button>
          </div>
        </div>

        {/* About */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-medium text-gray-900 mb-4">{t.about}</h3>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{t.version}</span>
            <span className="font-medium">2.1.0</span>
          </div>
        </div>

        {/* Logout */}
        <div className="p-6">
          <Button variant="destructive" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            {t.logout}
          </Button>
        </div>
      </div>
    </div>
  );
}