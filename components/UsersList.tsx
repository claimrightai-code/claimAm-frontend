"use client";
import { Search, Filter, ChevronDown, Phone, FileText, CheckCircle, Clock, XCircle, MessageCircle, Repeat } from 'lucide-react';
import { useState } from 'react';

interface UsersListProps {
  language: 'english' | 'pidgin';
}

export function UsersList({ language }: UsersListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const text = {
    english: {
      title: 'My Users',
      subtitle: 'Manage all your onboarded users',
      search: 'Search users...',
      filter: 'Filter',
      all: 'All Users',
      active: 'Active',
      pending: 'Pending',
      claimed: 'Claimed',
      name: 'Name',
      phone: 'Phone',
      policyType: 'Policy Type',
      status: 'Status',
      lastClaim: 'Last Claim',
      commission: 'Commission',
      viewDetails: 'View Details',
      total: 'Total Users',
      recurringStatus: 'Recurring Status',
      activeThisMonth: 'Active this month',
      expired: 'Expired',
      sendReminder: 'Send Renewal Reminder',
      reminderSent: 'Reminder Sent!',
    },
    pidgin: {
      title: 'My People',
      subtitle: 'See all people wey you bring',
      search: 'Find person...',
      filter: 'Sort',
      all: 'All People',
      active: 'Active',
      pending: 'Pending',
      claimed: 'Don Claim',
      name: 'Name',
      phone: 'Phone',
      policyType: 'Insurance Type',
      status: 'Status',
      lastClaim: 'Last Claim',
      commission: 'Commission',
      viewDetails: 'See Details',
      total: 'Total People',
      recurringStatus: 'Recurring Status',
      activeThisMonth: 'Active this month',
      expired: 'Don expire',
      sendReminder: 'Send Reminder',
      reminderSent: 'Reminder Don Send!',
    },
  };

  const t = text[language];

  const users = [
    {
      name: 'Fatima Yusuf',
      phone: '080 1234 5678',
      policyType: 'Motor Insurance',
      status: 'Active',
      lastClaim: '2 days ago',
      commission: 1500,
      avatar: '👩',
      recurringActive: true,
      renewalDate: 'Dec 18, 2024',
    },
    {
      name: 'Aminu Bello',
      phone: '081 9876 5432',
      policyType: 'Health Insurance',
      status: 'Active',
      lastClaim: 'Never',
      commission: 200,
      avatar: '👨',
      recurringActive: true,
      renewalDate: 'Dec 20, 2024',
    },
    {
      name: 'Bose Adebayo',
      phone: '090 5555 1234',
      policyType: 'Crop Insurance',
      status: 'Pending',
      lastClaim: 'Pending',
      commission: 0,
      avatar: '👩',
      recurringActive: false,
      renewalDate: 'Expired',
    },
    {
      name: 'Tunde Okafor',
      phone: '070 8888 9999',
      policyType: 'Life Insurance',
      status: 'Active',
      lastClaim: '1 week ago',
      commission: 200,
      avatar: '👨',
      recurringActive: true,
      renewalDate: 'Dec 25, 2024',
    },
    {
      name: 'Chioma Nwankwo',
      phone: '081 3333 4444',
      policyType: 'Motor Insurance',
      status: 'Claimed',
      lastClaim: '3 hours ago',
      commission: 1500,
      avatar: '👩',
      recurringActive: true,
      renewalDate: 'Dec 28, 2024',
    },
    {
      name: 'Musa Ibrahim',
      phone: '090 7777 6666',
      policyType: 'Poultry Insurance',
      status: 'Active',
      lastClaim: 'Never',
      commission: 200,
      avatar: '👨',
      recurringActive: false,
      renewalDate: 'Expired',
    },
    {
      name: 'Ngozi Eze',
      phone: '080 2222 3333',
      policyType: 'Health Insurance',
      status: 'Claimed',
      lastClaim: '5 days ago',
      commission: 1500,
      avatar: '👩',
      recurringActive: true,
      renewalDate: 'Jan 2, 2025',
    },
    {
      name: 'Abdullahi Garba',
      phone: '081 4444 5555',
      policyType: 'Crop Insurance',
      status: 'Active',
      lastClaim: 'Never',
      commission: 200,
      avatar: '👨',
      recurringActive: true,
      renewalDate: 'Jan 5, 2025',
    },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery);
    const matchesFilter = filterStatus === 'all' || user.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'Claimed':
        return <FileText className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Claimed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleSendReminder = (userName: string, userPhone: string) => {
    const message = `Hi ${userName.split(' ')[0]}, your ClaimAm subscription dey expire soon. Renew now to keep your coverage active and unlock instant loan access! Dial *669# or visit claimam.ng 🚀`;
    const whatsappUrl = `https://wa.me/234${userPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl text-[#1A1A1A] mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
          <p className="text-sm text-gray-600 mb-1">{t.total}</p>
          <p className="text-3xl text-[#1A1A1A]">284</p>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
          <p className="text-sm text-gray-600 mb-1">{t.active}</p>
          <p className="text-3xl text-green-600">247</p>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
          <p className="text-sm text-gray-600 mb-1">{t.pending}</p>
          <p className="text-3xl text-yellow-600">31</p>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
          <p className="text-sm text-gray-600 mb-1">{t.claimed}</p>
          <p className="text-3xl text-blue-600">47</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#00BA00] focus:outline-none transition-colors bg-white"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-48 appearance-none pl-12 pr-10 py-3 rounded-xl border-2 border-gray-200 focus:border-[#00BA00] focus:outline-none transition-colors bg-white cursor-pointer"
          >
            <option value="all">{t.all}</option>
            <option value="active">{t.active}</option>
            <option value="pending">{t.pending}</option>
            <option value="claimed">{t.claimed}</option>
          </select>
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        </div>
      </div>

      {/* Users Table/Cards */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-600">{t.name}</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">{t.phone}</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">{t.policyType}</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">{t.status}</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">{t.recurringStatus}</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">{t.commission}</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#00BA00] to-[#00C853] rounded-full flex items-center justify-center text-white shadow-lg">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-[#1A1A1A]">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      {user.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{user.policyType}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${getStatusColor(user.status)}`}>
                      {getStatusIcon(user.status)}
                      {user.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.recurringActive ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="text-sm text-green-700">{t.activeThisMonth}</p>
                            <p className="text-xs text-gray-500">{user.renewalDate}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-600" />
                          <p className="text-sm text-red-700">{t.expired}</p>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#00BA00]">
                    {user.commission > 0 ? `₦${user.commission.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleSendReminder(user.name, user.phone)}
                      className="flex items-center gap-2 bg-[#00A878] hover:bg-[#00C896] text-white text-xs px-3 py-2 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-3 h-3" />
                      {t.sendReminder}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-gray-100">
          {filteredUsers.map((user, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00BA00] to-[#00C853] rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-[#1A1A1A] mb-1">{user.name}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                    <Phone className="w-3 h-3" />
                    {user.phone}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${getStatusColor(user.status)}`}>
                      {getStatusIcon(user.status)}
                      {user.status}
                    </div>
                    {user.recurringActive ? (
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-green-100 text-green-700">
                        <Repeat className="w-3 h-3" />
                        Active
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-red-100 text-red-700">
                        <XCircle className="w-3 h-3" />
                        Expired
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{t.policyType}</p>
                  <p className="text-gray-700">{user.policyType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">{t.commission}</p>
                  <p className="text-[#00BA00]">
                    {user.commission > 0 ? `₦${user.commission.toLocaleString()}` : '-'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleSendReminder(user.name, user.phone)}
                className="w-full flex items-center justify-center gap-2 bg-[#00A878] hover:bg-[#00C896] text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {t.sendReminder}
              </button>
            </div>
          ))}
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No users found</p>
        </div>
      )}
    </div>
  );
}