"use client";
import { Plus, Calendar, CheckCircle, Clock, XCircle, Download, Building2, CreditCard } from 'lucide-react';
import { useState } from 'react';

interface PayoutHistoryProps {
  language: 'english' | 'pidgin';
}

export function PayoutHistory({ language }: PayoutHistoryProps) {
  const [showAddBank, setShowAddBank] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  const text = {
    english: {
      title: 'Payout History',
      subtitle: 'Track all your withdrawals',
      addBank: 'Add Bank Account',
      linkedAccounts: 'Linked Bank Accounts',
      history: 'Withdrawal History',
      amount: 'Amount',
      status: 'Status',
      date: 'Date',
      method: 'Method',
      reference: 'Reference',
      success: 'Success',
      pending: 'Pending',
      failed: 'Failed',
      bankName: 'Bank Name',
      accountNum: 'Account Number',
      accountNameLabel: 'Account Name',
      save: 'Save Account',
      cancel: 'Cancel',
      selectBank: 'Select your bank',
      download: 'Download Statement',
      totalWithdrawn: 'Total Withdrawn',
      pendingWithdrawals: 'Pending',
      successfulWithdrawals: 'Successful',
    },
    pidgin: {
      title: 'Money Wey I Don Collect',
      subtitle: 'See all the money wey you don withdraw',
      addBank: 'Add Bank Account',
      linkedAccounts: 'Bank Accounts Wey You Don Link',
      history: 'Withdrawal History',
      amount: 'Amount',
      status: 'Status',
      date: 'Date',
      method: 'Method',
      reference: 'Reference',
      success: 'Success',
      pending: 'Pending',
      failed: 'Failed',
      bankName: 'Bank Name',
      accountNum: 'Account Number',
      accountNameLabel: 'Account Name',
      save: 'Save Account',
      cancel: 'Cancel',
      selectBank: 'Pick your bank',
      download: 'Download Statement',
      totalWithdrawn: 'Total Money Wey You Don Collect',
      pendingWithdrawals: 'Pending',
      successfulWithdrawals: 'Successful',
    },
  };

  const t = text[language];

  const banks = [
    'GTBank',
    'Access Bank',
    'Zenith Bank',
    'First Bank',
    'UBA',
    'Moniepoint',
    'Opay',
    'Kuda Bank',
    'PalmPay',
    'WEMA Bank',
  ];

  const linkedBanks = [
    { bank: 'GTBank', accountNumber: '0123456789', accountName: 'Chukwudi Okafor', isPrimary: true },
    { bank: 'Moniepoint', accountNumber: '8765432109', accountName: 'Chukwudi Okafor', isPrimary: false },
  ];

  const payoutHistory = [
    {
      amount: 50000,
      status: 'success',
      date: '2024-12-05',
      time: '2:30 PM',
      method: 'GTBank - 0123456789',
      reference: 'WD-2024-001247',
    },
    {
      amount: 25000,
      status: 'success',
      date: '2024-11-28',
      time: '11:15 AM',
      method: 'Moniepoint - 8765432109',
      reference: 'WD-2024-001198',
    },
    {
      amount: 15000,
      status: 'pending',
      date: '2024-12-08',
      time: '9:45 AM',
      method: 'GTBank - 0123456789',
      reference: 'WD-2024-001289',
    },
    {
      amount: 30000,
      status: 'success',
      date: '2024-11-15',
      time: '4:20 PM',
      method: 'GTBank - 0123456789',
      reference: 'WD-2024-001089',
    },
    {
      amount: 20000,
      status: 'success',
      date: '2024-11-02',
      time: '10:30 AM',
      method: 'Moniepoint - 8765432109',
      reference: 'WD-2024-000967',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleSaveBank = () => {
    // In a real app, this would save to backend
    setShowAddBank(false);
    setSelectedBank('');
    setAccountNumber('');
    setAccountName('');
  };

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl text-[#1A1A1A] mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
          <p className="text-sm text-gray-600 mb-1">{t.totalWithdrawn}</p>
          <p className="text-3xl text-[#1A1A1A]">₦140,000</p>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
          <p className="text-sm text-gray-600 mb-1">{t.successfulWithdrawals}</p>
          <p className="text-3xl text-green-600">4</p>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
          <p className="text-sm text-gray-600 mb-1">{t.pendingWithdrawals}</p>
          <p className="text-3xl text-yellow-600">1</p>
        </div>
      </div>

      {/* Linked Bank Accounts */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg text-[#1A1A1A]">{t.linkedAccounts}</h3>
          <button
            onClick={() => setShowAddBank(!showAddBank)}
            className="flex items-center gap-2 px-4 py-2 bg-[#00BA00] hover:bg-[#00C853] text-white rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            {t.addBank}
          </button>
        </div>

        {showAddBank && (
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">{t.bankName}</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#00BA00] focus:outline-none transition-colors"
                >
                  <option value="">{t.selectBank}</option>
                  {banks.map((bank, index) => (
                    <option key={index} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">{t.accountNum}</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="0123456789"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#00BA00] focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">{t.accountNameLabel}</label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Account Name"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#00BA00] focus:outline-none transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSaveBank}
                className="flex-1 bg-[#00BA00] hover:bg-[#00C853] text-white py-3 rounded-xl transition-colors"
              >
                {t.save}
              </button>
              <button
                onClick={() => setShowAddBank(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl transition-colors"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {linkedBanks.map((account, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-xl ${
                account.isPrimary ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00BA00] to-[#00C853] rounded-xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[#1A1A1A] flex items-center gap-2">
                    {account.bank}
                    {account.isPrimary && (
                      <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                        Primary
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600">{account.accountNumber}</p>
                  <p className="text-xs text-gray-500">{account.accountName}</p>
                </div>
              </div>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg text-[#1A1A1A]">{t.history}</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-sm">
            <Download className="w-4 h-4" />
            {t.download}
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-600">{t.reference}</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">{t.amount}</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">{t.method}</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">{t.date}</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">{t.status}</th>
              </tr>
            </thead>
            <tbody>
              {payoutHistory.map((payout, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-600 text-sm">{payout.reference}</td>
                  <td className="px-6 py-4 text-[#1A1A1A]">₦{payout.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{payout.method}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {payout.date} • {payout.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${getStatusColor(payout.status)}`}>
                      {getStatusIcon(payout.status)}
                      {payout.status === 'success' ? t.success : payout.status === 'pending' ? t.pending : t.failed}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-gray-100">
          {payoutHistory.map((payout, index) => (
            <div key={index} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-2xl text-[#1A1A1A]">₦{payout.amount.toLocaleString()}</p>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${getStatusColor(payout.status)}`}>
                  {getStatusIcon(payout.status)}
                  {payout.status === 'success' ? t.success : payout.status === 'pending' ? t.pending : t.failed}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">{payout.method}</p>
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {payout.date} • {payout.time}
              </p>
              <p className="text-xs text-gray-400">{payout.reference}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
