import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const LaunchCountdown: React.FC = () => {
  // 1. Set your Launch Date here
  // Format: "YYYY-MM-DDTHH:mm:ss"
  const TARGET_DATE = "2026-04-01T00:00:00";

  // Helper to calculate time remaining
  const calculateTimeLeft = () => {
    const difference = +new Date(TARGET_DATE) - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    // Return all zeros if date has passed
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  // 2. State to hold the time
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // 3. Update the timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, []);

  // Helper to ensure double digits (visual only)
  const formatTime = (num: number) => String(num).padStart(2, "0");

  // Reusable Card Component
  const TimeCard = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-white rounded-2xl p-4 md:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 min-w-[80px] md:min-w-[100px]">
      <span className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-mono">
        {formatTime(value)}
      </span>
      <span className="text-[10px] md:text-xs font-bold text-[#00C853] uppercase tracking-widest mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <section className="py-12 px-4 bg-slate-50 border-y border-slate-100">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-2 mb-8 text-slate-500">
          <Clock size={18} className="text-[#00C853]" />
          <p className="text-sm md:text-base font-medium uppercase tracking-wide">
            Official Launch Countdown
          </p>
        </div>

        {/* Timer Grid */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <TimeCard value={timeLeft.days} label="Days" />

          {/* Separator */}
          <div className="hidden md:flex flex-col justify-center pb-6">
            <span className="text-2xl font-bold text-slate-300">:</span>
          </div>

          <TimeCard value={timeLeft.hours} label="Hours" />

          <div className="hidden md:flex flex-col justify-center pb-6">
            <span className="text-2xl font-bold text-slate-300">:</span>
          </div>

          <TimeCard value={timeLeft.minutes} label="Mins" />

          <div className="hidden md:flex flex-col justify-center pb-6">
            <span className="text-2xl font-bold text-slate-300">:</span>
          </div>

          <TimeCard value={timeLeft.seconds} label="Secs" />
        </div>

        {/* Optional Subtext */}
        <p className="mt-8 text-slate-400 text-sm">
          Be ready to claim your insurance instantly.
        </p>
      </div>
    </section>
  );
};

export default LaunchCountdown;
