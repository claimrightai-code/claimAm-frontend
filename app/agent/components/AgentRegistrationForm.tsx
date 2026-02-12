"use client";

import React, { useState, useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import {
  Lock,
  Briefcase,
  Loader2,
  Store,
  Users,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useUserContext } from "@/hooks/hooks";
import { isEmail, isPhone, scrollToFirstError } from "@/utils/validation";

interface AgentRegistrationFormProps {
  onPaymentComplete: (agentData: any) => void;
}

// Backend Enum Mappings
const BUSINESS_TYPES = [
  { label: "POS Stand", value: "pos_point" },
  { label: "Bet Shop", value: "bet_shop" },
  { label: "Phone Shop", value: "phone_shop" },
  { label: "Other", value: "other" },
];
const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "Federal Capital Territory (Abuja)",
];

const TRAFFIC_RANGES = ["< 200", "200 - 500", "500 - 1000", "1000+"];
export function AgentRegistrationForm({
  onPaymentComplete,
}: AgentRegistrationFormProps) {
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    whatsapp: "",
    state: "",
    lga: "",
    shopLocation: "",
    currentBusiness: "pos_point",
    footTraffic: "50 - 100",
    referralCode: "",
    agreedToTerms: false,
  });

  // Validation state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  const validateForm = (): Record<string, string> => {
    const errors: Record<string, string> = {};

    // Full name
    if (!formData.fullName.trim()) {
      errors.fullName = "Please enter your full name";
    }

    // Email
    if (!formData.email.trim()) {
      errors.email = "Please enter your email";
    } else if (!isEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password (min 8 chars)
    if (!formData.password) {
      errors.password = "Please create a password";
    } else if (formData.password.length < 8) {
      errors.password = "Password should be at least 8 characters";
    }

    // WhatsApp (basic check)
    if (!formData.whatsapp.trim()) {
      errors.whatsapp = "Please enter your WhatsApp number";
    } else if (!isPhone(formData.whatsapp)) {
      errors.whatsapp = "Please enter a valid phone number";
    }

    // State, LGA, Shop Address
    if (!formData.state) errors.state = "Please select your state";
    if (!formData.lga.trim()) errors.lga = "Please enter your LGA";
    if (!formData.shopLocation.trim())
      errors.shopLocation = "Please enter your shop address";
    if (!formData.agreedToTerms) {
      errors.agreedToTerms = "You must agree to the terms to continue";
    }
    setFormErrors(errors);
    setIsValid(Object.keys(errors).length === 0);

    return errors;
  };

  // Re-validate on change
  useEffect(() => {
    validateForm();
  }, [formData]);

  const { registerAgentFunc, verifyPaymentFunc } = useUserContext();

  // Paystack State
  const [paystackConfig, setPaystackConfig] = useState({
    reference: "",
    email: "",
    amount: 0,
    publicKey: "",
  });

  // 2. Define a Flag to Trigger Payment
  const [readyToPay, setReadyToPay] = useState(false);
  const [registeredAgentId, setRegisteredAgentId] = useState<number | null>(
    null,
  );
  const [referalCode, setreferalCode] = useState<string | null>(null);
  // 3. Initialize Hook with the dynamic config
  const initializePaystack = usePaystackPayment(paystackConfig);

  useEffect(() => {
    if (readyToPay && paystackConfig.email && paystackConfig.publicKey) {
      setReadyToPay(false);

      initializePaystack({
        onSuccess: async (txn: any) => {
          setLoading(true);
          try {
            // verifyPaymentFunc(reference, user_id)
            const verifyRes = await verifyPaymentFunc(
              txn.reference,
              registeredAgentId,
            );

            if (verifyRes.ok) {
              onPaymentComplete({
                ...formData,
                id: registeredAgentId,
                referral_code: referalCode,
              });
            } else {
              alert(
                "Payment verification failed: " +
                  (verifyRes.message || "Unknown error"),
              );
            }
          } catch (error) {
            // console.error("Verification Error:", error);
            alert("An error occurred during verification.");
          } finally {
            setLoading(false);
          }
        },
        onClose: () => {
          alert("Payment cancelled.");
          setLoading(false);
        },
      });
    }
  }, [readyToPay, paystackConfig]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submit
    if (loading) return;

    // Validate and show messages
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      // Scroll to the first error and focus it
      scrollToFirstError(errors);
      return;
    }

    setLoading(true);

    try {
      // 1. Register
      const regRes = await registerAgentFunc({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        whatsappNumber: formData.whatsapp,
        state: formData.state,
        lga: formData.lga,
        shopAddress: formData.shopLocation,
        currentBusiness: formData.currentBusiness,
        dailyTrafficEstimate: formData.footTraffic,
        referralCode: formData.referralCode,
      });
      //  console.log(regRes)
      if (regRes.ok) {
        const { id: agentId, referral_code: referralCode } = regRes;

        if (agentId) {
          setRegisteredAgentId(agentId);
          setreferalCode(referralCode);
        }
        setPaystackConfig({
          reference: new Date().getTime().toString(),
          email: formData.email,
          amount: 1500 * 100,
          publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "",
        });

        setReadyToPay(true);
      } else {
        setLoading(false);
      }
      // }
    } catch (error) {
      // console.error(error);
      setLoading(false);
    }
  };
  return (
    <section
      id="agent-registration-form"
      className="py-12 px-4 bg-white border-t border-slate-100"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-2xl mb-4 text-blue-600">
              <Briefcase className="w-7 h-7" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Agent Application
            </h2>
            <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
              First 5,000 Agents Only
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Account Details */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-slate-700 text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm focus:border-blue-500 focus:outline-none ${formErrors.email ? "border-red-500" : "border-slate-200"}`}
                  placeholder="your@email.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {formErrors.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="block text-slate-700 text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm focus:border-blue-500 focus:outline-none ${formErrors.password ? "border-red-500" : "border-slate-200"}`}
                  placeholder="Create a password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {formErrors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {formErrors.password}
                  </p>
                )}
              </div>
            </div>

            {/* 2. Personal Details */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-slate-700 text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm focus:border-blue-500 focus:outline-none ${formErrors.fullName ? "border-red-500" : "border-slate-200"}`}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
                {formErrors.fullName && (
                  <p className="text-sm text-red-600 mt-1">
                    {formErrors.fullName}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="block text-slate-700 text-sm font-medium">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  required
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm focus:border-blue-500 focus:outline-none ${formErrors.whatsapp ? "border-red-500" : "border-slate-200"}`}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                />
                {formErrors.whatsapp && (
                  <p className="text-sm text-red-600 mt-1">
                    {formErrors.whatsapp}
                  </p>
                )}
              </div>
            </div>

            {/* 3. Location */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-slate-700 text-sm font-medium">
                  State
                </label>
                <select
                  name="state"
                  required
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm appearance-none focus:border-blue-500 focus:outline-none ${formErrors.state ? "border-red-500" : "border-slate-200"}`}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                >
                  <option value="">Select State</option>
                  {NIGERIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {formErrors.state && (
                  <p className="text-sm text-red-600 mt-1">
                    {formErrors.state}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="block text-slate-700 text-sm font-medium">
                  LGA
                </label>
                <input
                  type="text"
                  name="lga"
                  required
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm focus:border-blue-500 focus:outline-none ${formErrors.lga ? "border-red-500" : "border-slate-200"}`}
                  placeholder="City / LGA"
                  onChange={(e) =>
                    setFormData({ ...formData, lga: e.target.value })
                  }
                />
                {formErrors.lga && (
                  <p className="text-sm text-red-600 mt-1">{formErrors.lga}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-700 text-sm font-medium">
                Shop Address / Landmark
              </label>
              <input
                type="text"
                name="shopLocation"
                required
                className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm focus:border-blue-500 focus:outline-none ${formErrors.shopLocation ? "border-red-500" : "border-slate-200"}`}
                placeholder="e.g. 12 Bode Thomas, Surulere"
                onChange={(e) =>
                  setFormData({ ...formData, shopLocation: e.target.value })
                }
              />
              {formErrors.shopLocation && (
                <p className="text-sm text-red-600 mt-1">
                  {formErrors.shopLocation}
                </p>
              )}
            </div>

            {/* 4. Business Profile (Added Back) */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              {/* Business Type Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-blue-600" />
                  <label className="block text-slate-700 text-sm font-medium">
                    Current Business Type
                  </label>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {BUSINESS_TYPES.map((type) => (
                    <label
                      key={type.value}
                      className={`
                        cursor-pointer border rounded-xl p-3 text-center text-xs md:text-sm transition-all
                        ${
                          formData.currentBusiness === type.value
                            ? "bg-blue-50 border-blue-500 text-blue-700 font-bold shadow-sm"
                            : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="businessType"
                        value={type.value}
                        checked={formData.currentBusiness === type.value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currentBusiness: e.target.value,
                          })
                        }
                        className="hidden"
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Foot Traffic Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <label className="block text-slate-700 text-sm font-medium">
                    Daily Car pass your spot
                  </label>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {TRAFFIC_RANGES.map((range) => (
                    <label
                      key={range}
                      className={`
                        cursor-pointer border rounded-xl p-3 text-center text-xs md:text-sm transition-all
                        ${
                          formData.footTraffic === range
                            ? "bg-blue-600 border-blue-600 text-white font-medium shadow-md shadow-blue-500/20"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-blue-300"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="Number of cars"
                        value={range}
                        checked={formData.footTraffic === range}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            footTraffic: e.target.value,
                          })
                        }
                        className="hidden"
                      />
                      {range}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Referral Code */}
            <div className="pt-2">
              <label className="block text-slate-700 text-sm font-medium mb-1">
                Referral Code (Optional)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="Enter code if someone invited you"
                onChange={(e) =>
                  setFormData({ ...formData, referralCode: e.target.value })
                }
              />
            </div>

            <div className="pt-4">
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer group ${
                  formData.agreedToTerms
                    ? "bg-green-50 border-[#00BA00]"
                    : "bg-slate-50 border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={formData.agreedToTerms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        agreedToTerms: e.target.checked,
                      })
                    }
                  />
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      formData.agreedToTerms
                        ? "bg-[#00BA00] border-[#00BA00]"
                        : "bg-white border-slate-300 group-hover:border-[#00BA00]"
                    }`}
                  >
                    {formData.agreedToTerms && (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm leading-relaxed ${formData.agreedToTerms ? "text-green-800" : "text-slate-600"}`}
                  >
                    T & C may applied to{" "}
                    <span className="font-bold underline">Agent Service</span> .
                  </p>
                </div>
              </label>
              {formErrors.agreedToTerms && (
                <p className="text-xs text-red-600 mt-2 ml-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {formErrors.agreedToTerms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || !isValid}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Lock size={18} /> Lock My Slot – ₦1,500
                  </>
                )}
              </button>
              <p className="text-center text-slate-400 text-[10px] mt-4 leading-relaxed uppercase font-bold tracking-tighter">
                Registration is secured by Paystack • Instant ID Generation
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
