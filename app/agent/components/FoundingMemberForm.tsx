import React, { useState } from "react";
import {
  Lock,
  Users,
  CheckCircle2,
  Copy,
  CreditCard,
  Building,
} from "lucide-react";

export function FoundingMemberForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    state: "",
    city: "",
    whatYouHave: "",
    referralCode: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In real app, send data to backend here
    console.log("Founding member form submitted:", formData);
  };

  // Helper to copy account number
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Account number copied!");
  };

  if (submitted) {
    return (
      <section
        id="founding-member-form"
        className="py-12 px-4 bg-slate-50 border-t border-slate-200"
      >
        <div className="max-w-md mx-auto">
          {/* Success Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-green-900/5 border border-green-100 text-center relative overflow-hidden">
            {/* Confetti/Decoration Background */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[#00C853]"></div>

            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#00C853]" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Almost There! 🎉
            </h3>
            <p className="text-slate-500 mb-8 text-sm leading-relaxed">
              Complete your payment of{" "}
              <strong className="text-slate-900">₦1,500</strong> to finalize
              your Founding Membership status.
            </p>

            {/* Payment Option 1: Bank Transfer */}
            <div className="bg-slate-50 rounded-2xl p-5 mb-4 text-left border border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <Building size={16} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Bank Transfer
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Bank Name</span>
                  <span className="font-medium text-slate-900">
                    Globus Bank
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Account Name</span>
                  <span className="font-medium text-slate-900">
                    ClaimAm Limited
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                  <span className="text-slate-500">Account Number</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-lg">
                      1234567890
                    </span>
                    <button
                      onClick={() => copyToClipboard("1234567890")}
                      className="text-[#00C853] hover:text-green-700 p-1"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink-0 mx-4 text-slate-400 text-xs uppercase">
                Or Pay Online
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Payment Option 2: Card */}
            <a
              href="https://paystack.com/pay/claimam-founding-member"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 w-full bg-[#00C853] hover:bg-green-600 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-green-500/20 hover:scale-[1.02] mt-4"
            >
              <CreditCard size={18} />
              Pay with Card
            </a>

            <p className="text-xs text-slate-400 mt-6">
              Secure payment processing via Paystack
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="founding-member-form"
      className="py-12 px-4 bg-white border-t border-slate-100"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-50 rounded-2xl mb-4 text-[#00C853]">
              <Users className="w-7 h-7" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Founding Member Registration
            </h2>
            <div className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
              Join for <span className="text-[#00C853] font-bold">₦1,500</span>{" "}
              only
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-slate-700 text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#00C853] focus:ring-2 focus:ring-green-500/10 focus:outline-none transition-all placeholder:text-slate-400 text-sm"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="block text-slate-700 text-sm font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#00C853] focus:ring-2 focus:ring-green-500/10 focus:outline-none transition-all placeholder:text-slate-400 text-sm"
                  placeholder="0801 234 5678"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* State */}
              <div className="space-y-1.5">
                <label className="block text-slate-700 text-sm font-medium">
                  State <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    required
                    value={formData.state}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        state: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#00C853] focus:ring-2 focus:ring-green-500/10 focus:outline-none transition-all appearance-none text-sm"
                  >
                    <option value="">Select your state</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Cross River">Cross River</option>
                    <option value="Rivers">Rivers</option>
                    <option value="Kano">Kano</option>
                    <option value="Oyo">Oyo</option>
                    <option value="FCT">FCT</option>
                    <option value="Others">Others</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* City / LGA */}
              <div className="space-y-1.5">
                <label className="block text-slate-700 text-sm font-medium">
                  City / LGA <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, city: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#00C853] focus:ring-2 focus:ring-green-500/10 focus:outline-none transition-all placeholder:text-slate-400 text-sm"
                  placeholder="Enter city or LGA"
                />
              </div>
            </div>

            {/* What do you have */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 text-sm font-medium">
                Asset to Insure <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.whatYouHave}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      whatYouHave: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#00C853] focus:ring-2 focus:ring-green-500/10 focus:outline-none transition-all appearance-none text-sm"
                >
                  <option value="">Select asset type</option>
                  <option value="Car">Car</option>
                  <option value="Crop/Livestock">Farm (Crop/Livestock)</option>
                  <option value="Healthcare">Health (Personal/Family)</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Referral Code */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 text-sm font-medium">
                Referral Code{" "}
                <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.referralCode}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    referralCode: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#00C853] focus:ring-2 focus:ring-green-500/10 focus:outline-none transition-all placeholder:text-slate-400 text-sm"
                placeholder="Enter referral code"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#00C853] hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/20 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 mt-4"
            >
              <Lock size={18} />
              Proceed to Payment
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-[#00C853]" /> Lifetime
              Benefits
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-[#00C853]" /> Priority
              Claims
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-[#00C853]" /> Exclusive
              Updates
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
