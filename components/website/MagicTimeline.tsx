"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Camera, 
  CheckCircle, 
  Share2, 
  Users,
  Zap
} from 'lucide-react';

export function MagicTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Smartphone,
      title: 'Dial *669# or tap the app',
      description: 'Access ClaimAm from anywhere',
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
      bgGradient: 'from-blue-50 to-blue-100',
    },
    {
      icon: Camera,
      title: 'Snap accident photo → AI verifies in 8 seconds',
      description: 'Advanced AI processes your claim instantly',
      color: 'bg-purple-500',
      textColor: 'text-purple-500',
      bgGradient: 'from-purple-50 to-purple-100',
    },
    {
      icon: CheckCircle,
      title: 'Fraud score: Low → ₦1M payout hits wallet',
      description: 'Automatic approval and instant payout',
      color: 'bg-green-500',
      textColor: 'text-green-500',
      bgGradient: 'from-green-50 to-green-100',
    },
    {
      icon: Share2,
      title: 'Echo Claim auto-shares your win',
      description: 'Your success story spreads automatically',
      color: 'bg-orange-500',
      textColor: 'text-orange-500',
      bgGradient: 'from-orange-50 to-orange-100',
    },
    {
      icon: Users,
      title: 'Your friends dial *669# — the loop begins',
      description: 'Viral growth through real success stories',
      color: 'bg-pink-500',
      textColor: 'text-pink-500',
      bgGradient: 'from-pink-50 to-pink-100',
    },
  ];

  // Auto-play animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000); // Change step every 3 seconds

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/50 px-4 py-2 rounded-full mb-6"
          >
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Auto-Playing Demo</span>
          </motion.div>
          <h2 className="text-3xl lg:text-6xl font-bold text-white mb-4">
            The Magic in 5 Seconds
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Watch how ClaimAm creates a viral loop of satisfied customers
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Progress Bar Background */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-white/20" />
          
          {/* Animated Progress Bar */}
          <motion.div
            className="hidden md:block absolute top-20 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ width: '0%' }}
            animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />

          {/* Steps Grid */}
          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              const isPast = index < activeStep;

              return (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: isActive ? 1 : isPast ? 0.7 : 0.4,
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step Number Circle */}
                  <div className="flex flex-col items-center mb-4">
                    <div 
                      className={`
                        relative w-16 h-16 rounded-full flex items-center justify-center mb-3
                        ${isActive ? step.color : isPast ? 'bg-white/30' : 'bg-white/10'}
                        transition-all duration-300
                      `}
                    >
                      <Icon className={`w-8 h-8 ${isActive || isPast ? 'text-white' : 'text-white/50'}`} />
                      
                      {/* Pulse Animation for Active Step */}
                      {isActive && (
                        <>
                          <motion.div
                            className={`absolute inset-0 rounded-full ${step.color} opacity-50`}
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <motion.div
                            className={`absolute inset-0 rounded-full ${step.color} opacity-30`}
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          />
                        </>
                      )}
                    </div>

                    {/* Step Number */}
                    <div className={`
                      text-sm font-bold px-3 py-1 rounded-full
                      ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40'}
                    `}>
                      Step {index + 1}
                    </div>
                  </div>

                  {/* Step Content Card */}
                  <motion.div
                    className={`
                      p-4 rounded-xl border-2 min-h-[140px]
                      ${isActive 
                        ? `bg-gradient-to-br ${step.bgGradient} border-white/50 shadow-2xl` 
                        : isPast 
                          ? 'bg-white/10 border-white/20' 
                          : 'bg-white/5 border-white/10'
                      }
                      transition-all duration-300
                    `}
                    animate={{
                      y: isActive ? -5 : 0,
                    }}
                  >
                    <h3 className={`
                      text-sm font-bold mb-2
                      ${isActive ? 'text-gray-900' : 'text-white'}
                    `}>
                      {step.title}
                    </h3>
                    <p className={`
                      text-xs
                      ${isActive ? 'text-gray-700' : 'text-white/60'}
                    `}>
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Step Indicators (Mobile) */}
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${index === activeStep 
                    ? 'w-8 bg-white' 
                    : index < activeStep 
                      ? 'w-2 bg-white/50' 
                      : 'w-2 bg-white/20'
                  }
                `}
              />
            ))}
          </div>

          {/* Current Step Info (Large Display) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 rounded-2xl">
                <div className={`w-3 h-3 rounded-full ${steps[activeStep].color} animate-pulse`} />
                <span className="text-white font-semibold">
                  Currently showing: {steps[activeStep].title}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-2xl text-white font-semibold mb-4">
            From claim to viral growth loop — all in seconds
          </p>
          <p className="text-blue-200 text-lg">
            Join the ClaimAm revolution and experience the magic yourself
          </p>
        </motion.div>
      </div>
    </section>
  );
}