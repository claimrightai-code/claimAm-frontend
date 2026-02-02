"use client";

import React, { useEffect } from 'react';
import { ClaimAmLogo } from '../ClaimAmLogo';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-full bg-gradient-to-br from-[#00A878] via-[#0052CC] to-[#003d99] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with background */}
        <div className="mb-12 animate-fade-in">
          <ClaimAmLogo size={160} withBackground={true} />
        </div>
        
        {/* Tagline */}
        <div className="text-center space-y-3 animate-slide-up">
          <h2 className="text-white text-xl px-6 leading-relaxed">
            No smartphone?
          </h2>
          <p className="text-white/90 text-lg px-4 leading-relaxed">
            Dial <span className="font-bold text-white text-2xl">*669#</span>
          </p>
          <p className="text-white text-base px-6 leading-relaxed">
            and Claim Your Rights Anywhere
          </p>
        </div>

        {/* Loading indicator */}
        <div className="mt-16 flex gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.5s both;
        }
      `}</style>
    </div>
  );
}