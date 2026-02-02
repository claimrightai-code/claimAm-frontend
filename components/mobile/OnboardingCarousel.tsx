"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ChevronRight, Smartphone, Phone, MessageCircle } from 'lucide-react';

interface OnboardingCarouselProps {
  onComplete: () => void;
  onSignup?: () => void;
}

const slides = [
  {
    title: "Claim your insurance from anywhere",
    subtitle: "Easy, fast with AI & USSD",
    description: "File claims instantly using our smart app or dial *669# from any phone",
    icon: <Smartphone className="w-16 h-16 text-[#00A878]" />,
    color: "from-green-50 to-blue-50"
  },
  {
    title: "No office visits required",
    subtitle: "Dial *669# or use the app",
    description: "Submit documents, track claims, and get paid — all from your mobile device",
    icon: <Phone className="w-16 h-16 text-[#0057B7]" />,
    color: "from-blue-50 to-purple-50"
  },
  {
    title: "Echo Claims",
    subtitle: "Share your win & help others",
    description: "Join our community of successful claimants and inspire trust in insurance",
    icon: <MessageCircle className="w-16 h-16 text-[#FF9F1C]" />,
    color: "from-orange-50 to-green-50"
  }
];

export function OnboardingCarousel({ onComplete, onSignup }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const skip = () => {
    onComplete();
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Top banner */}
      <div className="bg-[#00A878] text-white px-4 py-3 text-center">
        <p className="text-sm">
          No smartphone? <span className="font-bold">Dial *669#</span> for rural access
        </p>
      </div>

      {/* Slides container */}
      <div className="flex-1 relative overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div className={`h-full bg-gradient-to-br ${slide.color} flex flex-col items-center justify-center px-8 text-center`}>
              {/* Illustration */}
              <div className="mb-8 p-8 bg-white/80 rounded-3xl shadow-lg backdrop-blur-sm">
                {slide.icon}
              </div>

              {/* Content */}
              <div className="space-y-3 max-w-sm">
                <h2 className="text-2xl text-gray-900">
                  {slide.title}
                </h2>
                <p className="text-lg text-[#00A878]">
                  {slide.subtitle}
                </p>
                <p className="text-base text-gray-600 leading-relaxed">
                  {slide.description}
                </p>
              </div>

              {/* Mock testimonial for slide 3 */}
              {index === 2 && (
                <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00A878] to-[#0057B7] flex items-center justify-center text-white flex-shrink-0">
                      OA
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm text-gray-700 italic mb-2">
                        "I got my ₦150,000 motor claim in 2 days using *669#. ClaimAm made it so easy!"
                      </p>
                      <p className="text-xs text-gray-600">
                        — Oluwaseun Adeyemi, Lagos
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="p-8 bg-white">
        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-[#00A878]' 
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {currentSlide < slides.length - 1 ? (
            <>
              <Button
                variant="outline"
                onClick={skip}
                className="flex-1"
              >
                Skip
              </Button>
              <Button
                onClick={nextSlide}
                className="flex-1 flex items-center justify-center gap-2"
                style={{ backgroundColor: '#00A878' }}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={onComplete}
                className="flex-1"
              >
                Sign In
              </Button>
              <Button
                onClick={onSignup || onComplete}
                className="flex-1"
                style={{ backgroundColor: '#00A878' }}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}