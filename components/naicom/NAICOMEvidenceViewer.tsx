import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ArrowLeft } from 'lucide-react';
import { EscalatedClaim } from '../NAICOMDashboard';

interface NAICOMEvidenceViewerProps {
  claim: EscalatedClaim;
  onBack: () => void;
}

export function NAICOMEvidenceViewer({ claim, onBack }: NAICOMEvidenceViewerProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <Button variant="outline" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Claim Details
        </Button>
        <Card className="p-8">
          <h2 className="text-2xl text-gray-900 mb-4">Evidence Viewer</h2>
          <p className="text-gray-600">Full-screen photo carousel with AI overlays will be displayed here.</p>
        </Card>
      </div>
    </div>
  );
}
