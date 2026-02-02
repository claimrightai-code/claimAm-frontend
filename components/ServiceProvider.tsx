import React from "react";

import { ServiceProviderForm } from "./website/ServiceProviderForm";
interface ServiceProviderApplicationProps {
  onBack?: () => void;
}

export default function ServiceProviderApplication({
  onBack,
}: ServiceProviderApplicationProps) {
  
  return (
    <>
      <ServiceProviderForm />
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all z-50 text-sm"
        >
          ← Back to Website
        </button>
      )}
    </>
  );
}
