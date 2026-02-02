import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle,
  AlertCircle,
  FileText,
  Filter
} from 'lucide-react';
import { MobileScreen } from '../MobileApp';

interface ClaimsListScreenProps {
  onNavigate: (screen: MobileScreen) => void;
  onBack: () => void;
}

const mockClaims = [
  {
    id: 'CLM23456',
    type: 'Motor Insurance',
    amount: '₦1,200,000',
    status: 'approved' as const,
    date: '22 Nov 2025',
    description: 'Vehicle accident claim'
  },
  {
    id: 'CLM23455',
    type: 'Health Insurance', 
    amount: '₦450,000',
    status: 'pending' as const,
    date: '20 Nov 2025',
    description: 'Medical treatment claim'
  },
  {
    id: 'CLM23450',
    type: 'Home Insurance',
    amount: '₦2,800,000',
    status: 'approved' as const,
    date: '21 Nov 2025',
    description: 'Property damage claim'
  },
  {
    id: 'CLM23448',
    type: 'Travel Insurance',
    amount: '₦180,000',
    status: 'flagged' as const,
    date: '24 Nov 2025',
    description: 'Trip cancellation claim'
  },
  {
    id: 'CLM23445',
    type: 'Motor Insurance',
    amount: '₦950,000',
    status: 'approved' as const,
    date: '25 Nov 2025',
    description: 'Theft claim'
  }
];

export function ClaimsListScreen({ onNavigate, onBack }: ClaimsListScreenProps) {
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg text-gray-900">My Claims</h1>
            <p className="text-xs text-gray-600">{mockClaims.length} total claims</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button size="sm" variant="default" style={{ backgroundColor: '#00A878' }}>
            All
          </Button>
          <Button size="sm" variant="outline">
            Approved
          </Button>
          <Button size="sm" variant="outline">
            Pending
          </Button>
          <Button size="sm" variant="outline">
            Flagged
          </Button>
        </div>
      </div>

      {/* Claims List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-3">
          {mockClaims.map((claim) => (
            <Card key={claim.id} className="p-4 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00A878] to-[#0057B7] rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">#{claim.id}</p>
                    <p className="text-xs text-gray-600">{claim.date}</p>
                  </div>
                </div>
                <Badge 
                  variant={
                    claim.status === 'approved' ? 'default' : 
                    claim.status === 'pending' ? 'secondary' : 'destructive'
                  }
                  className="text-xs"
                  style={claim.status === 'approved' ? { backgroundColor: '#00A878' } : {}}
                >
                  {claim.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                  {claim.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                  {claim.status === 'flagged' && <AlertCircle className="w-3 h-3 mr-1" />}
                  {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{claim.type}</span>
                  <span className="text-sm font-semibold text-gray-900">{claim.amount}</span>
                </div>
                <p className="text-xs text-gray-500">{claim.description}</p>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={() => onNavigate('results')}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-white border-t px-6 py-4">
        <Button
          onClick={() => onNavigate('insurance-type')}
          className="w-full h-12 rounded-xl"
          style={{ backgroundColor: '#00A878' }}
        >
          <FileText className="w-4 h-4 mr-2" />
          File New Claim
        </Button>
      </div>
    </div>
  );
}
