"use client";
import { TrendingUp, Download, Calendar, DollarSign, Users, FileText, X, CheckCircle as CheckCircleIcon, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface WalletProps {
  language: 'english' | 'pidgin';
  onConfetti: () => void;
}

export function Wallet({ language, onConfetti }: WalletProps) {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawStep, setWithdrawStep] = useState<'amount' | 'bank' | 'confirm' | 'success'>('amount');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [walletBalance, setWalletBalance] = useState(78400);

  const text = {
    english: {
      title: 'Wallet & Commission Tracker',
      subtitle: 'Track your earnings in real-time',
      balance: 'Available Balance',
      withdraw: 'Withdraw to Bank',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      earningsBreakdown: 'Earnings Breakdown',
      referralCommission: 'Referral Commission',
      claimCommission: 'Claim Processing',
      bonuses: 'Bonuses & Rewards',
      transactions: '× transactions',
      totalEarnings: 'Total Earnings This Month',
      projection: 'On track to earn ₦100k this month!',
      withdrawTitle: 'Withdraw to Bank',
      enterAmount: 'Enter Amount',
      amountPlaceholder: 'Enter amount to withdraw',
      minimum: 'Minimum withdrawal: ₦1,000',
      selectBank: 'Select Bank Account',
      confirmWithdrawal: 'Confirm Withdrawal',
      processingFee: 'Processing Fee',
      youWillReceive: 'You will receive',
      cancel: 'Cancel',
      continue: 'Continue',
      confirmButton: 'Confirm & Withdraw',
      success: 'Withdrawal Successful!',
      successMessage: 'Your money will arrive in your bank account within 5 minutes.',
      viewHistory: 'View Payout History',
      withdrawAnother: 'Make Another Withdrawal',
      addNewBank: 'Add New Bank Account',
      insufficientBalance: 'Insufficient balance',
      enterValidAmount: 'Please enter a valid amount',
    },
    pidgin: {
      title: 'Wallet & Money Tracker',
      subtitle: 'See your money as e dey enter',
      balance: 'Money Wey Dey Available',
      withdraw: 'Collect Money Go Bank',
      daily: 'Every Day',
      weekly: 'Every Week',
      monthly: 'Every Month',
      earningsBreakdown: 'How You Make Your Money',
      referralCommission: 'Referral Money',
      claimCommission: 'Claim Processing Money',
      bonuses: 'Bonuses & Rewards',
      transactions: '× transactions',
      totalEarnings: 'Total Money This Month',
      projection: 'You dey on track to make ₦100k this month!',
      withdrawTitle: 'Collect Money Go Bank',
      enterAmount: 'Put the Amount',
      amountPlaceholder: 'How much you wan collect',
      minimum: 'Minimum na ₦1,000',
      selectBank: 'Pick Your Bank',
      confirmWithdrawal: 'Confirm Say You Wan Collect',
      processingFee: 'Processing Fee',
      youWillReceive: 'You go receive',
      cancel: 'Cancel',
      continue: 'Continue',
      confirmButton: 'Confirm Make Dem Send Am',
      success: 'Money Don Send Successfully!',
      successMessage: 'Your money go reach your bank account for 5 minutes.',
      viewHistory: 'See Payout History',
      withdrawAnother: 'Collect Another Money',
      addNewBank: 'Add New Bank',
      insufficientBalance: 'Money no reach',
      enterValidAmount: 'Abeg put correct amount',
    },
  };

  const t = text[language];

  const chartData = {
    daily: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [2400, 3200, 2800, 4100, 3600, 4800, 5200],
    },
    weekly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [15600, 18900, 21200, 22700],
    },
    monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [42300, 51200, 58900, 64100, 71800, 78400],
    },
  };

  const currentData = chartData[timeRange];

  const data = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'Earnings',
        data: currentData.data,
        borderColor: '#00BA00',
        backgroundColor: 'rgba(0, 186, 0, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#00BA00',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1A1A1A',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `₦${context.parsed.y.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
      y: {
        grid: {
          color: '#E5E7EB',
        },
        ticks: {
          color: '#6B7280',
          callback: function(value: any) {
            return '₦' + value.toLocaleString();
          }
        },
      },
    },
  };

  const breakdown = [
    {
      title: t.referralCommission,
      amount: 13600,
      count: 68,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: t.claimCommission,
      amount: 18000,
      count: 12,
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: t.bonuses,
      amount: 46800,
      count: 23,
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const linkedBanks = [
    { id: '1', bank: 'GTBank', accountNumber: '0123456789', accountName: 'Chukwudi Okafor' },
    { id: '2', bank: 'Moniepoint', accountNumber: '8765432109', accountName: 'Chukwudi Okafor' },
  ];

  const handleOpenWithdrawModal = () => {
    setShowWithdrawModal(true);
    setWithdrawStep('amount');
    setWithdrawAmount('');
    setSelectedBank('');
  };

  const handleCloseWithdrawModal = () => {
    setShowWithdrawModal(false);
    setWithdrawStep('amount');
    setWithdrawAmount('');
    setSelectedBank('');
  };

  const handleContinueFromAmount = () => {
    const amount = parseInt(withdrawAmount.replace(/,/g, ''));
    if (isNaN(amount) || amount < 1000) {
      alert(t.enterValidAmount);
      return;
    }
    if (amount > walletBalance) {
      alert(t.insufficientBalance);
      return;
    }
    setWithdrawStep('bank');
  };

  const handleContinueFromBank = () => {
    if (!selectedBank) {
      alert('Please select a bank account');
      return;
    }
    setWithdrawStep('confirm');
  };

  const handleConfirmWithdrawal = () => {
    const amount = parseInt(withdrawAmount.replace(/,/g, ''));
    setWalletBalance(prev => prev - amount);
    setWithdrawStep('success');
    onConfetti();
  };

  const processingFee = 50;
  const withdrawAmountNum = parseInt(withdrawAmount.replace(/,/g, '') || '0');
  const amountToReceive = withdrawAmountNum - processingFee;

  const formatCurrency = (value: string) => {
    const num = value.replace(/\D/g, '');
    return num ? parseInt(num).toLocaleString() : '';
  };

  return (
    <div className="p-3 lg:p-6 pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl text-[#1A1A1A] mb-1">{t.title}</h1>
        <p className="text-sm text-gray-600">{t.subtitle}</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-[#00BA00] to-[#00C853] rounded-xl p-6 mb-6 shadow-2xl text-white">
        <p className="text-xs opacity-90 mb-1">{t.balance}</p>
        <p className="text-4xl mb-4">₦78,400</p>
        <button
          onClick={handleOpenWithdrawModal}
          className="w-full bg-white text-[#00BA00] py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-lg text-sm"
        >
          <Download className="w-4 h-4" />
          {t.withdraw}
        </button>
        <div className="mt-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3 h-3" />
            <span>{t.totalEarnings}</span>
          </div>
          <span>₦78,400</span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base text-[#1A1A1A]">Earnings Trend</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeRange('daily')}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                timeRange === 'daily'
                  ? 'bg-[#00BA00] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.daily}
            </button>
            <button
              onClick={() => setTimeRange('weekly')}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                timeRange === 'weekly'
                  ? 'bg-[#00BA00] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.weekly}
            </button>
            <button
              onClick={() => setTimeRange('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                timeRange === 'monthly'
                  ? 'bg-[#00BA00] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.monthly}
            </button>
          </div>
        </div>
        <div className="h-48 lg:h-64">
          <Line data={data} options={options} />
        </div>
        <div className="mt-3 bg-green-50 rounded-lg p-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <p className="text-xs text-green-700">{t.projection}</p>
        </div>
      </div>

      {/* Earnings Breakdown */}
      <div className="mb-6">
        <h3 className="text-base text-[#1A1A1A] mb-3">{t.earningsBreakdown}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {breakdown.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white hover:shadow-xl transition-shadow"
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center mb-3 shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs text-gray-600 mb-1">{item.title}</p>
                <p className="text-2xl text-[#1A1A1A] mb-1">₦{item.amount.toLocaleString()}</p>
                <p className="text-xs text-gray-500">
                  ₦{(item.amount / item.count).toLocaleString()} {t.transactions}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white">
        <h3 className="text-base text-[#1A1A1A] mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {[
            { type: 'Claim Commission', amount: 1500, date: 'Today, 2:30 PM', user: 'Fatima Yusuf' },
            { type: 'Referral Bonus', amount: 200, date: 'Today, 11:45 AM', user: 'Aminu Bello' },
            { type: 'Monthly Bonus', amount: 5000, date: 'Yesterday, 9:00 AM', user: 'ClaimAm' },
            { type: 'Claim Commission', amount: 1500, date: '2 days ago', user: 'Bose Adebayo' },
            { type: 'Referral Bonus', amount: 200, date: '3 days ago', user: 'Tunde Okafor' },
          ].map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00BA00] to-[#00C853] rounded-full flex items-center justify-center shadow-lg">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#1A1A1A]">{transaction.type}</p>
                  <p className="text-xs text-gray-600">{transaction.user}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {transaction.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base text-[#00BA00]">+₦{transaction.amount.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-2xl w-full max-w-md mx-auto relative">
            <button
              onClick={handleCloseWithdrawModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl text-[#1A1A1A] mb-6">{t.withdrawTitle}</h2>

            {withdrawStep === 'amount' && (
              <div>
                <label className="block text-sm text-gray-700 mb-2">{t.enterAmount}</label>
                <div className="relative mb-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">₦</span>
                  <input
                    type="text"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(formatCurrency(e.target.value))}
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-4 text-xl rounded-xl border-2 border-gray-200 focus:border-[#00BA00] focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                  <AlertCircle className="w-4 h-4" />
                  <span>{t.minimum}</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{t.balance}</span>
                    <span className="text-[#1A1A1A]">₦{walletBalance.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleCloseWithdrawModal}
                    className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    {t.cancel}
                  </button>
                  <button
                    onClick={handleContinueFromAmount}
                    className="flex-1 bg-[#00BA00] text-white py-4 rounded-xl hover:bg-[#00C853] transition-colors shadow-lg"
                  >
                    {t.continue}
                  </button>
                </div>
              </div>
            )}

            {withdrawStep === 'bank' && (
              <div>
                <label className="block text-sm text-gray-700 mb-4">{t.selectBank}</label>
                <div className="space-y-3 mb-6">
                  {linkedBanks.map((bank) => (
                    <button
                      key={bank.id}
                      onClick={() => setSelectedBank(bank.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        selectedBank === bank.id
                          ? 'border-[#00BA00] bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#1A1A1A] mb-1">{bank.bank}</p>
                          <p className="text-sm text-gray-600">{bank.accountNumber}</p>
                          <p className="text-xs text-gray-500">{bank.accountName}</p>
                        </div>
                        {selectedBank === bank.id && (
                          <CheckCircleIcon className="w-6 h-6 text-[#00BA00]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <button className="w-full bg-blue-50 text-blue-600 py-3 rounded-xl hover:bg-blue-100 transition-colors mb-6 text-sm">
                  + {t.addNewBank}
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => setWithdrawStep('amount')}
                    className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleContinueFromBank}
                    className="flex-1 bg-[#00BA00] text-white py-4 rounded-xl hover:bg-[#00C853] transition-colors shadow-lg"
                  >
                    {t.continue}
                  </button>
                </div>
              </div>
            )}

            {withdrawStep === 'confirm' && (
              <div>
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 mb-4">
                  <div className="text-center mb-3">
                    <p className="text-xs text-gray-600 mb-1">{t.confirmWithdrawal}</p>
                    <p className="text-3xl text-[#1A1A1A] mb-3">₦{withdrawAmountNum.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2 bg-white rounded-lg p-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Amount</span>
                      <span className="text-[#1A1A1A]">₦{withdrawAmountNum.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{t.processingFee}</span>
                      <span className="text-[#1A1A1A]">-₦{processingFee.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">{t.youWillReceive}</span>
                        <span className="text-lg text-[#00BA00]">₦{amountToReceive.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-600 mb-1">To Account:</p>
                  {linkedBanks.find(b => b.id === selectedBank) && (
                    <div>
                      <p className="text-sm text-[#1A1A1A]">{linkedBanks.find(b => b.id === selectedBank)?.bank}</p>
                      <p className="text-xs text-gray-600">{linkedBanks.find(b => b.id === selectedBank)?.accountNumber}</p>
                      <p className="text-xs text-gray-500">{linkedBanks.find(b => b.id === selectedBank)?.accountName}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setWithdrawStep('bank')}
                    className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirmWithdrawal}
                    className="flex-1 bg-[#00BA00] text-white py-2.5 rounded-lg hover:bg-[#00C853] transition-colors shadow-lg text-sm"
                  >
                    {t.confirmButton}
                  </button>
                </div>
              </div>
            )}

            {withdrawStep === 'success' && (
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl text-[#1A1A1A] mb-2">{t.success}</h3>
                <p className="text-gray-600 mb-2">₦{amountToReceive.toLocaleString()} sent to</p>
                <p className="text-sm text-gray-500 mb-6">{linkedBanks.find(b => b.id === selectedBank)?.bank} - {linkedBanks.find(b => b.id === selectedBank)?.accountNumber}</p>
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-blue-700">{t.successMessage}</p>
                </div>
                <button
                  onClick={handleCloseWithdrawModal}
                  className="w-full bg-[#00BA00] text-white py-4 rounded-xl hover:bg-[#00C853] transition-colors shadow-lg mb-3"
                >
                  Done
                </button>
                <button
                  onClick={handleOpenWithdrawModal}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm"
                >
                  {t.withdrawAnother}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}