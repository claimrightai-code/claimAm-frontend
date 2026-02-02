"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ClaimAmLogo } from '../ClaimAmLogo';
import { SubscriptionSuccess } from './SubscriptionSuccess';
import { 
  ArrowLeft, 
  Building2, 
  CreditCard, 
  Copy, 
  CheckCircle, 
  Plus, 
  Trash2,
  AlertCircle,
  Wallet,
  Crown,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface SubscriptionScreenProps {
  onComplete: (isPremium?: boolean) => void;
  onBack?: () => void;
  userPhone?: string;
}

const nigerianBanks = [
  'Access Bank', 'Citibank', 'Ecobank', 'Fidelity Bank', 'First Bank of Nigeria',
  'First City Monument Bank (FCMB)', 'Globus Bank', 'Guaranty Trust Bank (GTBank)',
  'Heritage Bank', 'Keystone Bank', 'Polaris Bank', 'Providus Bank', 
  'Stanbic IBTC Bank', 'Standard Chartered Bank', 'Sterling Bank', 'SunTrust Bank',
  'Union Bank', 'United Bank for Africa (UBA)', 'Unity Bank', 'Wema Bank',
  'Zenith Bank', 'Moniepoint MFB', 'Kuda Bank', 'Opay', 'PalmPay'
];

export function SubscriptionScreen({ onComplete, onBack, userPhone }: SubscriptionScreenProps) {
  const [step, setStep] = useState<'intro' | 'banks' | 'virtual-account' | 'payment-method' | 'card-payment' | 'success'>('intro');
  const [paymentDetails, setPaymentDetails] = useState<{ amount: number; days: number; expiryDate: Date } | null>(null);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [currentBank, setCurrentBank] = useState({
    bankName: '',
    accountNumber: '',
    accountName: ''
  });
  const [virtualAccount, setVirtualAccount] = useState({
    bank: '',
    accountNumber: '',
    accountName: ''
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [subscriptionAmount, setSubscriptionAmount] = useState('1500');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [verifyingAccount, setVerifyingAccount] = useState(false);

  // Calculate subscription days based on amount
  const calculateDays = (amount: number) => {
    const minAmount = 1500;
    const daysPerMin = 20;
    const costPerDay = minAmount / daysPerMin; // ₦75 per day
    return Math.floor(amount / costPerDay);
  };

  const getSubscriptionPeriod = (days: number) => {
    if (days >= 365) return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? 's' : ''}`;
    if (days >= 180) return `${Math.floor(days / 180)} half-year${Math.floor(days / 180) > 1 ? 's' : ''}`;
    if (days >= 30) return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''}`;
    return `${days} days`;
  };

  // Generate virtual account on component mount
  useEffect(() => {
    const banks = ['Sterling Bank', 'Moniepoint MFB'];
    const selectedBank = banks[Math.floor(Math.random() * banks.length)];
    const accountNumber = '50' + Math.floor(10000000 + Math.random() * 90000000);
    const accountName = 'ClaimAm - ' + (userPhone || '09031245541').slice(-4);
    
    setVirtualAccount({
      bank: selectedBank,
      accountNumber: accountNumber.toString(),
      accountName: accountName
    });
  }, [userPhone]);

  const handleAddBank = () => {
    if (currentBank.bankName && currentBank.accountNumber && currentBank.accountName) {
      if (bankAccounts.length < 3) {
        setBankAccounts([...bankAccounts, { ...currentBank, id: Date.now().toString() }]);
        setCurrentBank({ bankName: '', accountNumber: '', accountName: '' });
      }
    }
  };

  const handleRemoveBank = (id: string) => {
    setBankAccounts(bankAccounts.filter(acc => acc.id !== id));
  };

  const handleVerifyAccount = () => {
    setVerifyingAccount(true);
    // Simulate account verification
    setTimeout(() => {
      setVerifyingAccount(false);
      setCurrentBank(prev => ({ 
        ...prev, 
        accountName: 'Chidinma Okafor' // Mock verified name
      }));
    }, 1500);
  };

  const handleCopyAccount = async () => {
    try {
      // Try the modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(virtualAccount.accountNumber);
      } else {
        // Fallback for when Clipboard API is blocked
        const textArea = document.createElement('textarea');
        textArea.value = virtualAccount.accountNumber;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } finally {
          textArea.remove();
        }
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Silent fail - clipboard operation is not critical
      console.log('Copy failed:', err);
    }
  };

  const handleCardPayment = () => {
    const amount = parseInt(subscriptionAmount);
    if (amount < 1500) {
      alert('Minimum subscription amount is ₦1,500');
      return;
    }
    
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      const days = calculateDays(amount);
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + days);
      
      // Store subscription data
      localStorage.setItem('claimam_subscription', JSON.stringify({
        isPremium: true,
        amount: amount,
        days: days,
        expiryDate: expiryDate.toISOString(),
        startDate: new Date().toISOString()
      }));
      
      // Show success screen
      setPaymentDetails({ amount, days, expiryDate });
      setStep('success');
    }, 2000);
  };

  // Show success screen
  if (step === 'success' && paymentDetails) {
    return (
      <SubscriptionSuccess 
        amount={paymentDetails.amount}
        days={paymentDetails.days}
        expiryDate={paymentDetails.expiryDate}
        onContinue={() => onComplete(true)}
      />
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-white to-green-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-2">
        {onBack && step === 'intro' && (
          <button onClick={onBack} className="mb-4 text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        {step !== 'intro' && step !== 'success' && (
          <button 
            onClick={() => {
              if (step === 'banks') setStep('intro');
              else if (step === 'virtual-account') setStep('banks');
              else if (step === 'payment-method') setStep('virtual-account');
              else if (step === 'card-payment') setStep('payment-method');
            }} 
            className="mb-4 text-gray-600"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        
        <div className="flex justify-center mb-4">
          <ClaimAmLogo size={60} withBackground={true} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <AnimatePresence mode="wait">
          {/* Introduction */}
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#00A878] to-green-600 rounded-full flex items-center justify-center">
                    <Crown className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl text-gray-900">Welcome to ClaimAm!</h2>
                <p className="text-sm text-gray-600">
                  Let's set up your account for seamless claim payouts
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 space-y-4 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900">What you'll need:</h3>
                
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-4 h-4 text-[#00A878]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Bank Account Details</p>
                      <p className="text-xs text-gray-600">Add up to 3 banks for claim payouts</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Wallet className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Virtual Account</p>
                      <p className="text-xs text-gray-600">Get a dedicated account for subscriptions</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Premium Benefits</p>
                      <p className="text-xs text-gray-600">Fund ₦1,500+ to unlock premium features</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-[#00A878] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-700">
                    Your bank details are encrypted and secure. We use them only for claim disbursements.
                  </p>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-800 font-medium">
                    Subscription required: You must subscribe to access ClaimAm dashboard and services.
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setStep('banks')}
                className="w-full h-12"
                style={{ backgroundColor: '#00A878' }}
              >
                Continue Setup
              </Button>
            </motion.div>
          )}

          {/* Bank Accounts Setup */}
          {step === 'banks' && (
            <motion.div
              key="banks"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="text-center">
                <h2 className="text-xl text-gray-900 mb-2">Add Bank Accounts</h2>
                <p className="text-sm text-gray-600">
                  Add up to 3 accounts for claim payouts
                </p>
              </div>

              {/* Added Banks */}
              {bankAccounts.length > 0 && (
                <div className="space-y-2">
                  {bankAccounts.map((account) => (
                    <div key={account.id} className="bg-white rounded-lg p-4 border border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-[#00A878]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{account.bankName}</p>
                          <p className="text-xs text-gray-600">{account.accountNumber} • {account.accountName}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveBank(account.id)}
                        className="text-red-500 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Bank Form */}
              {bankAccounts.length < 3 && (
                <div className="bg-white rounded-xl p-5 space-y-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">
                      {bankAccounts.length === 0 ? 'Add First Bank' : `Add Bank ${bankAccounts.length + 1}`}
                    </h3>
                    <span className="text-xs text-gray-500">{bankAccounts.length}/3</span>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name</Label>
                      <select
                        id="bankName"
                        value={currentBank.bankName}
                        onChange={(e) => setCurrentBank({ ...currentBank, bankName: e.target.value })}
                        className="w-full h-11 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A878] focus:border-transparent"
                      >
                        <option value="">Select Bank</option>
                        {nigerianBanks.map(bank => (
                          <option key={bank} value={bank}>{bank}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <div className="flex gap-2">
                        <Input
                          id="accountNumber"
                          type="text"
                          placeholder="0123456789"
                          value={currentBank.accountNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setCurrentBank({ ...currentBank, accountNumber: value });
                          }}
                          className="h-11"
                          maxLength={10}
                        />
                        <Button
                          type="button"
                          onClick={handleVerifyAccount}
                          disabled={currentBank.accountNumber.length !== 10 || !currentBank.bankName || verifyingAccount}
                          variant="outline"
                          className="h-11 px-4"
                        >
                          {verifyingAccount ? '...' : 'Verify'}
                        </Button>
                      </div>
                    </div>

                    {currentBank.accountName && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Account Name</p>
                        <p className="text-sm font-medium text-gray-900">{currentBank.accountName}</p>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleAddBank}
                    disabled={!currentBank.accountName}
                    variant="outline"
                    className="w-full h-10 border-[#00A878] text-[#00A878]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add This Bank
                  </Button>
                </div>
              )}

              <Button
                onClick={() => setStep('virtual-account')}
                disabled={bankAccounts.length === 0}
                className="w-full h-12"
                style={{ backgroundColor: '#00A878' }}
              >
                Continue
              </Button>
            </motion.div>
          )}

          {/* Virtual Account */}
          {step === 'virtual-account' && (
            <motion.div
              key="virtual-account"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="text-center">
                <h2 className="text-xl text-gray-900 mb-2">Your Virtual Account</h2>
                <p className="text-sm text-gray-600">
                  Fund this account to activate premium features
                </p>
              </div>

              {/* Virtual Account Card */}
              <div className="bg-gradient-to-br from-[#00A878] to-green-700 rounded-2xl p-6 text-white space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    <span className="text-sm font-medium">ClaimAm Wallet</span>
                  </div>
                  <Crown className="w-6 h-6 opacity-80" />
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <p className="text-xs opacity-80 mb-1">Bank Name</p>
                    <p className="font-semibold text-lg">{virtualAccount.bank}</p>
                  </div>

                  <div>
                    <p className="text-xs opacity-80 mb-1">Account Number</p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-2xl tracking-wider">{virtualAccount.accountNumber}</p>
                      <button
                        onClick={handleCopyAccount}
                        className="bg-white/20 hover:bg-white/30 rounded-lg p-2 transition-colors"
                      >
                        {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs opacity-80 mb-1">Account Name</p>
                    <p className="font-medium">{virtualAccount.accountName}</p>
                  </div>
                </div>
              </div>

              {/* Premium Benefits */}
              <div className="bg-white rounded-xl p-5 space-y-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-semibold text-gray-900">Premium Benefits</h3>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00A878] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">Priority claim processing</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00A878] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">Higher advance pay limits</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00A878] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">24/7 premium support</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00A878] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">Free document verification</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-sm text-gray-900">
                    <span className="font-semibold">₦1,500</span> = 20 days subscription
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Pay more for longer access (₦75/day)
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="text-xs text-gray-700">
                    <span className="font-semibold">Examples:</span>
                  </p>
                  <ul className="text-xs text-gray-700 mt-1 space-y-0.5">
                    <li>• ₦2,250 = 1 month</li>
                    <li>• ₦13,500 = 6 months</li>
                    <li>• ₦27,375 = 1 year</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => setStep('payment-method')}
                  className="w-full h-12"
                  style={{ backgroundColor: '#00A878' }}
                >
                  Continue to Payment
                </Button>

                <p className="text-xs text-center text-red-600">
                  ⚠️ Subscription required to access dashboard
                </p>
              </div>
            </motion.div>
          )}

          {/* Payment Method Selection */}
          {step === 'payment-method' && (
            <motion.div
              key="payment-method"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="text-center">
                <h2 className="text-xl text-gray-900 mb-2">Choose Payment Method</h2>
                <p className="text-sm text-gray-600">
                  Minimum ₦1,500 for 20 days access
                </p>
              </div>

              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-orange-900 mb-1">
                      Subscription Required
                    </p>
                    <p className="text-xs text-orange-800">
                      You must complete payment to access the ClaimAm dashboard and file claims.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bank Transfer Option */}
              <button
                onClick={() => {
                  alert('Please transfer any amount ≥ ₦1,500 to your virtual account. Your subscription will activate automatically based on the amount transferred. (₦1,500 = 20 days, ₦75 per additional day)');
                }}
                className="w-full bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-[#00A878] transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#00A878]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Bank Transfer</h3>
                    <p className="text-sm text-gray-600">Transfer any amount ≥ ₦1,500</p>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
                </div>
                <div className="mt-3 pl-16">
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <p className="text-xs text-gray-700">
                      Account: <span className="font-mono font-semibold">{virtualAccount.accountNumber}</span>
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Pay more for longer access
                    </p>
                  </div>
                </div>
              </button>

              {/* Card Payment Option */}
              <button
                onClick={() => setStep('card-payment')}
                className="w-full bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-[#00A878] transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Pay with Card</h3>
                    <p className="text-sm text-gray-600">Instant activation • Choose your amount</p>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
                </div>
              </button>
            </motion.div>
          )}

          {/* Card Payment */}
          {step === 'card-payment' && (
            <motion.div
              key="card-payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="text-center">
                <h2 className="text-xl text-gray-900 mb-2">Pay with Card</h2>
                <p className="text-sm text-gray-600">
                  Secure payment powered by Paystack
                </p>
              </div>

              {/* Amount Input */}
              <div className="bg-white rounded-xl p-5 border-2 border-green-200 space-y-3">
                <Label htmlFor="amount">Subscription Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-medium">₦</span>
                  <Input
                    id="amount"
                    type="number"
                    value={subscriptionAmount}
                    onChange={(e) => setSubscriptionAmount(e.target.value)}
                    min="1500"
                    step="100"
                    className="h-14 pl-8 text-2xl font-bold"
                  />
                </div>
                {parseInt(subscriptionAmount) >= 1500 && (
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <p className="text-sm font-semibold text-green-900">
                      {calculateDays(parseInt(subscriptionAmount))} days subscription
                    </p>
                    <p className="text-xs text-green-700 mt-0.5">
                      ≈ {getSubscriptionPeriod(calculateDays(parseInt(subscriptionAmount)))}
                    </p>
                  </div>
                )}
                {parseInt(subscriptionAmount) < 1500 && (
                  <p className="text-xs text-red-600">Minimum: ₦1,500 (20 days)</p>
                )}
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSubscriptionAmount('1500')}
                  className="bg-white border-2 border-gray-200 rounded-lg p-2 text-center hover:border-[#00A878] transition-colors"
                >
                  <p className="font-semibold text-gray-900">₦1,500</p>
                  <p className="text-xs text-gray-600">20 days</p>
                </button>
                <button
                  onClick={() => setSubscriptionAmount('2250')}
                  className="bg-white border-2 border-gray-200 rounded-lg p-2 text-center hover:border-[#00A878] transition-colors"
                >
                  <p className="font-semibold text-gray-900">₦2,250</p>
                  <p className="text-xs text-gray-600">1 month</p>
                </button>
                <button
                  onClick={() => setSubscriptionAmount('13500')}
                  className="bg-white border-2 border-gray-200 rounded-lg p-2 text-center hover:border-[#00A878] transition-colors"
                >
                  <p className="font-semibold text-gray-900">₦13,500</p>
                  <p className="text-xs text-gray-600">6 months</p>
                </button>
              </div>

              {/* Card Form */}
              <div className="bg-white rounded-xl p-5 space-y-4 shadow-sm border border-gray-100">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={cardDetails.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                      const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                      setCardDetails({ ...cardDetails, cardNumber: formatted });
                    }}
                    className="h-11"
                    maxLength={19}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '').slice(0, 4);
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2);
                        }
                        setCardDetails({ ...cardDetails, expiryDate: value });
                      }}
                      className="h-11"
                      maxLength={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                        setCardDetails({ ...cardDetails, cvv: value });
                      }}
                      className="h-11"
                      maxLength={3}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    type="text"
                    placeholder="Name on card"
                    value={cardDetails.cardName}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                    className="h-11"
                  />
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-700">
                    Your payment is secured with 256-bit SSL encryption
                  </p>
                </div>
              </div>

              <Button
                onClick={handleCardPayment}
                disabled={
                  !cardDetails.cardNumber || 
                  !cardDetails.expiryDate || 
                  !cardDetails.cvv || 
                  !cardDetails.cardName ||
                  parseInt(subscriptionAmount) < 1500 ||
                  loading
                }
                className="w-full h-12"
                style={{ backgroundColor: '#00A878' }}
              >
                {loading ? 'Processing Payment...' : `Pay ₦${parseInt(subscriptionAmount).toLocaleString()}`}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}