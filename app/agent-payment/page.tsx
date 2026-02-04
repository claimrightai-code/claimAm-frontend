"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the VerifyPayment component client-side only
const VerifyPayment = dynamic(
  () =>
    import("@/../../components/VerifyPayment").then((mod) => mod.VerifyPayment),
  { ssr: false, loading: () => <p className="text-center p-4">Loading...</p> },
);
export default function CompletePaymentPage() {
  return (
    <>
      <VerifyPayment />
      <button
        onClick={() => (window.location.href = "/")}
        className="fixed top-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all z-50 text-sm"
      >
        ← Back to Website
      </button>
    </>
  );
}
