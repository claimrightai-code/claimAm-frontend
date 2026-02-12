"use client";
import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Star, Navigation, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface AgentFinderProps {
  onClose: () => void;
}

interface Agent {
  id: string;
  name: string;
  location: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  claimsProcessed: number;
  distance?: string;
  verified: boolean;
}

export function AgentFinder({ onClose }: AgentFinderProps) {
  const [selectedState, setSelectedState] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const agents: Agent[] = [
    {
      id: 'AG-001',
      name: 'Chidinma Okafor',
      location: 'Lekki',
      state: 'Lagos',
      address: '15 Admiralty Way, Lekki Phase 1, Lagos',
      phone: '+234 803 456 7890',
      email: 'chidinma.agent@claimam.com',
      rating: 4.9,
      claimsProcessed: 342,
      distance: '2.3 km',
      verified: true
    },
    {
      id: 'AG-002',
      name: 'Oluwaseun Adeyemi',
      location: 'Ikeja',
      state: 'Lagos',
      address: '42 Allen Avenue, Ikeja, Lagos',
      phone: '+234 805 123 4567',
      email: 'seun.agent@claimam.com',
      rating: 4.8,
      claimsProcessed: 298,
      distance: '5.7 km',
      verified: true
    },
    {
      id: 'AG-003',
      name: 'Amina Bello',
      location: 'Victoria Island',
      state: 'Lagos',
      address: '18 Ahmadu Bello Way, Victoria Island, Lagos',
      phone: '+234 807 890 1234',
      email: 'amina.agent@claimam.com',
      rating: 4.9,
      claimsProcessed: 421,
      distance: '3.1 km',
      verified: true
    },
    {
      id: 'AG-004',
      name: 'Ibrahim Yusuf',
      location: 'Surulere',
      state: 'Lagos',
      address: '77 Bode Thomas Street, Surulere, Lagos',
      phone: '+234 809 234 5678',
      email: 'ibrahim.agent@claimam.com',
      rating: 4.7,
      claimsProcessed: 256,
      distance: '8.2 km',
      verified: true
    },
    {
      id: 'AG-005',
      name: 'Ngozi Eze',
      location: 'Enugu',
      state: 'Enugu',
      address: '23 Ogui Road, Enugu',
      phone: '+234 803 567 8901',
      email: 'ngozi.agent@claimam.com',
      rating: 4.8,
      claimsProcessed: 189,
      verified: true
    },
    {
      id: 'AG-006',
      name: 'Yusuf Aliyu',
      location: 'Kano',
      state: 'Kano',
      address: '12 Murtala Mohammed Way, Kano',
      phone: '+234 805 678 9012',
      email: 'yusuf.agent@claimam.com',
      rating: 4.9,
      claimsProcessed: 312,
      verified: true
    },
    {
      id: 'AG-007',
      name: 'Blessing Okon',
      location: 'Port Harcourt',
      state: 'Rivers',
      address: '8 Aba Road, Port Harcourt',
      phone: '+234 807 789 0123',
      email: 'blessing.agent@claimam.com',
      rating: 4.7,
      claimsProcessed: 234,
      verified: true
    },
    {
      id: 'AG-008',
      name: 'Chukwuemeka Nnamdi',
      location: 'Abuja',
      state: 'FCT',
      address: '45 Gimbiya Street, Area 11, Abuja',
      phone: '+234 809 890 1234',
      email: 'chukwuemeka.agent@claimam.com',
      rating: 4.8,
      claimsProcessed: 387,
      verified: true
    },
    {
      id: 'AG-009',
      name: 'Fatima Usman',
      location: 'Kaduna',
      state: 'Kaduna',
      address: '33 Constitution Road, Kaduna',
      phone: '+234 803 901 2345',
      email: 'fatima.agent@claimam.com',
      rating: 4.6,
      claimsProcessed: 167,
      verified: true
    },
    {
      id: 'AG-010',
      name: 'Tunde Bakare',
      location: 'Ibadan',
      state: 'Oyo',
      address: '19 Ring Road, Ibadan',
      phone: '+234 805 012 3456',
      email: 'tunde.agent@claimam.com',
      rating: 4.7,
      claimsProcessed: 203,
      verified: true
    }
  ];

  const filteredAgents = agents.filter(agent => {
    const matchesState = !selectedState || agent.state === selectedState;
    const matchesSearch = !searchTerm || 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00A878] to-[#0052CC] p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Find a ClaimAm Agent</h2>
              <p className="text-white/90 mt-1">Locate trusted agents in your area</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search and Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, location, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white"
            >
              <option value="">All States</option>
              {nigerianStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            Found <strong className="text-gray-900">{filteredAgents.length}</strong> agent{filteredAgents.length !== 1 ? 's' : ''} 
            {selectedState && <> in <strong className="text-gray-900">{selectedState}</strong></>}
          </p>
        </div>

        {/* Agents List */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredAgents.map(agent => (
              <div
                key={agent.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-[#00A878]"
              >
                {/* Agent Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00A878] to-[#0052CC] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">{agent.name}</h3>
                        {agent.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{agent.id}</p>
                    </div>
                  </div>
                  {agent.distance && (
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#0052CC]">{agent.distance}</p>
                      <p className="text-xs text-gray-500">away</p>
                    </div>
                  )}
                </div>

                {/* Rating & Claims */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-gray-900">{agent.rating}</span>
                    <span className="text-xs text-gray-500">/5.0</span>
                  </div>
                  <div className="h-4 w-px bg-gray-300" />
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{agent.claimsProcessed}</span> claims processed
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{agent.location}, {agent.state}</p>
                      <p className="text-xs text-gray-600">{agent.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <a
                      href={`tel:${agent.phone}`}
                      className="text-sm text-[#0052CC] hover:underline"
                    >
                      {agent.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <a
                      href={`mailto:${agent.email}`}
                      className="text-sm text-[#0052CC] hover:underline truncate"
                    >
                      {agent.email}
                    </a>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => window.open(`tel:${agent.phone}`)}
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                  <Button
                    size="sm"
                    className="flex items-center gap-2"
                    style={{ backgroundColor: '#00A878' }}
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(agent.address)}`, '_blank')}
                  >
                    <Navigation className="w-4 h-4" />
                    Directions
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAgents.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No agents found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or selecting a different state
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedState('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              💡 <strong>Tip:</strong> All agents are verified and trained by ClaimAm
            </p>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
