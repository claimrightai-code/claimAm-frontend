"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ClaimAmLogo } from "../ClaimAmLogo";
import {
  CheckCircle,
  AlertCircle,
  Upload,
  Wifi,
  WifiOff,
  Save,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import api from "@/api";

// Nigerian states
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
  "FCT",
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
];

// Banks in Nigeria;
const NIGERIAN_BANKS = [
  "Access Bank",
  "Citibank",
  "Ecobank",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank (FCMB)",
  "Globus Bank",
  "Guaranty Trust Bank (GTBank)",
  "Heritage Bank",
  "Keystone Bank",
  "Polaris Bank",
  "Providus Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank",
  "Sterling Bank",
  "SunTrust Bank",
  "Union Bank",
  "United Bank for Africa (UBA)",
  "Unity Bank",
  "Wema Bank",
  "Zenith Bank",
  "Kuda Bank",
  "Moniepoint",
  "OPay",
  "PalmPay",
];

interface FormData {
  // Section 1: Business Basics
  businessName: string;
  serviceType: {
    repairs: boolean;
    towing: boolean;
  };
  ownerName: string;
  phone: string;
  altPhone: string;
  email: string;

  // Section 2: Location
  state: string;
  lga: string;
  address: string;
  landmark: string;

  // Section 3: Business Proof
  hasCac: string;
  cacNumber: string;
  otherProof: string;

  // Section 4: Bank Account
  bankName: string;
  accountNumber: string;
  accountName: string;

  // Section 5: Services
  vehicleTypes: {
    cars: boolean;
    suvs: boolean;
    trucks: boolean;
    motorcycles: boolean;
    commercial: boolean;
  };
  repairServices: {
    mechanical: boolean;
    bodywork: boolean;
    electrical: boolean;
    panelBeating: boolean;
    diagnostics: boolean;
    ac: boolean;
    others: boolean;
  };
  towServices: {
    flatbed: boolean;
    recovery: boolean;
    roadside: boolean;
    available24: boolean;
  };
  yearsInBusiness: string;
  quoteSpeed: string;

  // Section 6: Photos
  photos: File[];

  // Section 7: Agreement
  agreed: boolean;
  notes: string;
}

export function ServiceProviderForm() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    serviceType: { repairs: false, towing: false },
    ownerName: "",
    phone: "",
    altPhone: "",
    email: "",
    state: "",
    lga: "",
    address: "",
    landmark: "",
    hasCac: "",
    cacNumber: "",
    otherProof: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    vehicleTypes: {
      cars: false,
      suvs: false,
      trucks: false,
      motorcycles: false,
      commercial: false,
    },
    repairServices: {
      mechanical: false,
      bodywork: false,
      electrical: false,
      panelBeating: false,
      diagnostics: false,
      ac: false,
      others: false,
    },
    towServices: {
      flatbed: false,
      recovery: false,
      roadside: false,
      available24: false,
    },
    yearsInBusiness: "",
    quoteSpeed: "",
    photos: [],
    agreed: false,
    notes: "",
  });

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem("claimam_service_provider_form");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData({ ...formData, ...parsed });
        const savedTime = localStorage.getItem(
          "claimam_service_provider_form_time",
        );
        if (savedTime) {
          setLastSaved(new Date(savedTime));
        }
        toast.info("Form data restored from previous session", {
          description: "You can continue where you left off",
          duration: 5000,
        });
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, []);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("You are back online!", { duration: 3000 });
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.error("You are offline. Your data will be saved locally.", {
        duration: 5000,
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Auto-save function
  const autoSave = () => {
    setIsSaving(true);
    try {
      const dataToSave = { ...formData };
      delete (dataToSave as any).photos; // Don't save photos to localStorage
      localStorage.setItem(
        "claimam_service_provider_form",
        JSON.stringify(dataToSave),
      );
      localStorage.setItem(
        "claimam_service_provider_form_time",
        new Date().toISOString(),
      );
      setLastSaved(new Date());
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save on form data change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!submitted) {
        autoSave();
      }
    }, 1000); // Save after 1 second of inactivity

    return () => clearTimeout(timer);
  }, [formData, submitted]);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (section: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...(prev as any)[section], [field]: value },
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 3); // Max 3 photos
      setFormData((prev) => ({ ...prev, photos: files }));
      toast.success(`${files.length} photo(s) selected`, { duration: 2000 });
    }
  };

  const validateForm = (): boolean => {
    // Check mandatory fields
    if (!formData.businessName.trim()) {
      toast.error("Please enter your business name");
      return false;
    }
    if (!formData.serviceType.repairs && !formData.serviceType.towing) {
      toast.error("Please select at least one type of service");
      return false;
    }
    if (!formData.ownerName.trim()) {
      toast.error("Please enter owner/manager full name");
      return false;
    }
    if (!formData.phone.trim() || !formData.phone.startsWith("+234")) {
      toast.error(
        "Please enter a valid Nigerian phone number starting with +234",
      );
      return false;
    }
    if (!formData.state) {
      toast.error("Please select your state");
      return false;
    }
    if (!formData.lga.trim()) {
      toast.error("Please enter your LGA");
      return false;
    }
    if (!formData.address.trim()) {
      toast.error("Please enter your full workshop address");
      return false;
    }
    if (!formData.agreed) {
      toast.error("Please agree to the terms");
      return false;
    }
    return true;
  };

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();

  //     if (!validateForm()) {
  //       return;
  //     }

  //     // Simulate form submission
  //     toast.success("Submitting your application...", { duration: 2000 });

  //     setTimeout(() => {
  //       setSubmitted(true);
  //       // Clear saved data
  //       localStorage.removeItem("claimam_service_provider_form");
  //       localStorage.removeItem("claimam_service_provider_form_time");

  //       // Scroll to top
  //       window.scrollTo({ top: 0, behavior: "smooth" });
  //     }, 2000);
  //   };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const toastId = toast.loading("Submitting your application...");

    try {
      const dataToSend = new FormData();

      // 1. Prepare the JSON data (text fields)
      const { photos, ...jsonFields } = formData;
      // We send the JSON as a string in a field called 'data'
      dataToSend.append("data", JSON.stringify(jsonFields));

      // 2. Append Photos (binary files)
      formData.photos.forEach((file) => {
        dataToSend.append("photos", file);
      });

      // 3. API Call with Axios
      // Note: We 'await' the response
      // Note: Pass 'dataToSend' directly as the body
      const response = await api.post(
        `/service_providers/register_service_provider`,
        dataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // 4. Axios logic: Success is typically 200 or 201
      if (response.status === 200 || response.status === 201) {
        toast.success("Application submitted successfully!", { id: toastId });
        setSubmitted(true);
        localStorage.removeItem("claimam_service_provider_form");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail ||
        "Network error. Please try again later.";

      toast.error(errorMessage, { id: toastId });
      console.error("Submission error:", error);
    }
  };
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You! 🎉
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Your application has been received successfully.
          </p>
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
            <p className="text-gray-800 font-semibold mb-2">
              What happens next?
            </p>
            <p className="text-gray-700">
              We will call you within{" "}
              <span className="font-bold text-green-600">3–7 days</span> to
              confirm your details and complete your registration.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Please keep your phone available for our call.
            </p>
          </div>
          <Button
            onClick={() => router.push("/")}
            className="bg-[#00A878] hover:bg-[#00C853] text-white px-8 py-3"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ClaimAmLogo size={80} withBackground={false} />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Become a ClaimAm Service Provider
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Get more customers from accident claims. It's free to apply!
          </p>

          {/* Info Box */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 max-w-2xl mx-auto">
            <p className="text-gray-800 font-semibold mb-2">
              We made this form very simple for everyone, even in areas with
              slow or no internet:
            </p>
            <ul className="text-left text-gray-700 space-y-1 max-w-md mx-auto">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Only 10–15 minutes to fill</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Works on basic Android phones or browsers</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Online/Offline Status */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isOnline ? (
              <>
                <Wifi className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-semibold">
                  You are online
                </span>
              </>
            ) : (
              <>
                <WifiOff className="w-5 h-5 text-orange-600" />
                <span className="text-orange-700 font-semibold">
                  You are offline - Data will be saved locally
                </span>
              </>
            )}
          </div>
          {lastSaved && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Save className="w-4 h-4" />
              <span>
                {isSaving
                  ? "Saving..."
                  : `Last saved: ${lastSaved.toLocaleTimeString()}`}
              </span>
            </div>
          )}
        </div>

        {/* Form */}
        <form
          id="sp-form"
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 lg:p-8 space-y-8"
        >
          {/* Section 1: Business Basics */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">
                1
              </span>
              Your Business Basics
              <span className="text-red-600 text-sm">(Mandatory)</span>
            </h2>

            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="businessName"
                  className="text-gray-700 font-semibold"
                >
                  Business Name <span className="text-red-600">*</span>
                </Label>
                <p className="text-sm text-gray-600 mb-2">
                  (e.g., "Emma Auto Repairs" or your personal name if no
                  registered name)
                </p>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) =>
                    updateFormData("businessName", e.target.value)
                  }
                  placeholder="Enter your business name"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label className="text-gray-700 font-semibold mb-3 block">
                  Type of Service (Choose one or both){" "}
                  <span className="text-red-600">*</span>
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="repairs"
                      checked={formData.serviceType.repairs}
                      onCheckedChange={(checked) =>
                        updateNestedField("serviceType", "repairs", checked)
                      }
                    />
                    <label
                      htmlFor="repairs"
                      className="text-gray-700 cursor-pointer"
                    >
                      Motor Vehicle Repairs/Garage
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="towing"
                      checked={formData.serviceType.towing}
                      onCheckedChange={(checked) =>
                        updateNestedField("serviceType", "towing", checked)
                      }
                    />
                    <label
                      htmlFor="towing"
                      className="text-gray-700 cursor-pointer"
                    >
                      Towing/Recovery Services
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="ownerName"
                  className="text-gray-700 font-semibold"
                >
                  Owner/Manager Full Name{" "}
                  <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => updateFormData("ownerName", e.target.value)}
                  placeholder="Enter full name"
                  className="mt-1"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-gray-700 font-semibold"
                  >
                    Phone Number <span className="text-red-600">*</span>
                  </Label>
                  <p className="text-sm text-gray-600 mb-2">
                    (We will call you for confirmation)
                  </p>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="+234..."
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="altPhone"
                    className="text-gray-700 font-semibold"
                  >
                    Alternative Phone Number{" "}
                    <span className="text-gray-500">(Optional)</span>
                  </Label>
                  <Input
                    id="altPhone"
                    type="tel"
                    value={formData.altPhone}
                    onChange={(e) => updateFormData("altPhone", e.target.value)}
                    placeholder="+234..."
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-semibold">
                  Email Address{" "}
                  <span className="text-gray-500">
                    (Optional – if you have one)
                  </span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="your@email.com"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Location */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">
                2
              </span>
              Location
              <span className="text-red-600 text-sm">
                (Mandatory – So users can find you)
              </span>
            </h2>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="state"
                    className="text-gray-700 font-semibold"
                  >
                    State <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => updateFormData("state", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] overflow-y-auto">
                      {NIGERIAN_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="lga" className="text-gray-700 font-semibold">
                    Local Government Area (LGA){" "}
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="lga"
                    value={formData.lga}
                    onChange={(e) => updateFormData("lga", e.target.value)}
                    placeholder="Enter your LGA"
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="address"
                  className="text-gray-700 font-semibold"
                >
                  Full Workshop Address <span className="text-red-600">*</span>
                </Label>
                <p className="text-sm text-gray-600 mb-2">
                  (e.g., "No. 12 Market Road, beside primary school, Owerri")
                </p>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  placeholder="Enter full address"
                  className="mt-1"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor="landmark"
                  className="text-gray-700 font-semibold"
                >
                  Nearest Landmark
                </Label>
                <p className="text-sm text-gray-600 mb-2">
                  (to help people locate you easily, e.g., "Opposite police
                  station")
                </p>
                <Input
                  id="landmark"
                  value={formData.landmark}
                  onChange={(e) => updateFormData("landmark", e.target.value)}
                  placeholder="Enter nearest landmark"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Business Proof */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">
                3
              </span>
              Business Proof
              <span className="text-gray-600 text-sm">
                (As much as you have – we accept informal too)
              </span>
            </h2>

            <div className="space-y-6">
              <div>
                <Label className="text-gray-700 font-semibold mb-3 block">
                  Do you have CAC registration?
                </Label>
                <RadioGroup
                  value={formData.hasCac}
                  onValueChange={(value) => updateFormData("hasCac", value)}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="yes" id="cac-yes" />
                    <label
                      htmlFor="cac-yes"
                      className="text-gray-700 cursor-pointer"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="cac-no" />
                    <label
                      htmlFor="cac-no"
                      className="text-gray-700 cursor-pointer"
                    >
                      No (that's okay – many local mechanics don't)
                    </label>
                  </div>
                </RadioGroup>

                {formData.hasCac === "yes" && (
                  <div className="mt-4">
                    <Label
                      htmlFor="cacNumber"
                      className="text-gray-700 font-semibold"
                    >
                      Enter RC/BN Number
                    </Label>
                    <Input
                      id="cacNumber"
                      value={formData.cacNumber}
                      onChange={(e) =>
                        updateFormData("cacNumber", e.target.value)
                      }
                      placeholder="RC/BN Number"
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label
                  htmlFor="otherProof"
                  className="text-gray-700 font-semibold"
                >
                  Other Proof{" "}
                  <span className="text-gray-500">
                    (Optional but helps approval)
                  </span>
                </Label>
                <Select
                  value={formData.otherProof}
                  onValueChange={(value) => updateFormData("otherProof", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select if you have any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tin">Tax ID (TIN) number</SelectItem>
                    <SelectItem value="permit">
                      Local government permit
                    </SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Section 4: Bank Account */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">
                4
              </span>
              Bank Account for Future Payments
              <span className="text-gray-600 text-sm">
                (Optional now, needed later for referrals)
              </span>
            </h2>

            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="bankName"
                  className="text-gray-700 font-semibold"
                >
                  Bank Name
                </Label>
                <Select
                  value={formData.bankName}
                  onValueChange={(value) => updateFormData("bankName", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-y-auto">
                    {NIGERIAN_BANKS.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="accountNumber"
                    className="text-gray-700 font-semibold"
                  >
                    Account Number
                  </Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) =>
                      updateFormData("accountNumber", e.target.value)
                    }
                    placeholder="10 digits"
                    maxLength={10}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="accountName"
                    className="text-gray-700 font-semibold"
                  >
                    Account Name
                  </Label>
                  <Input
                    id="accountName"
                    value={formData.accountName}
                    onChange={(e) =>
                      updateFormData("accountName", e.target.value)
                    }
                    placeholder="As shown on your account"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Your Services */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">
                5
              </span>
              Your Services
              <span className="text-gray-600 text-sm">
                (Tell us what you do)
              </span>
            </h2>

            <div className="space-y-6">
              <div>
                <Label className="text-gray-700 font-semibold mb-3 block">
                  What vehicles do you work on? (Tick all that apply)
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cars"
                      checked={formData.vehicleTypes.cars}
                      onCheckedChange={(checked) =>
                        updateNestedField("vehicleTypes", "cars", checked)
                      }
                    />
                    <label
                      htmlFor="cars"
                      className="text-gray-700 cursor-pointer"
                    >
                      Cars/Saloon
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="suvs"
                      checked={formData.vehicleTypes.suvs}
                      onCheckedChange={(checked) =>
                        updateNestedField("vehicleTypes", "suvs", checked)
                      }
                    />
                    <label
                      htmlFor="suvs"
                      className="text-gray-700 cursor-pointer"
                    >
                      SUVs/Jeeps
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="trucks"
                      checked={formData.vehicleTypes.trucks}
                      onCheckedChange={(checked) =>
                        updateNestedField("vehicleTypes", "trucks", checked)
                      }
                    />
                    <label
                      htmlFor="trucks"
                      className="text-gray-700 cursor-pointer"
                    >
                      Trucks/Buses
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="motorcycles"
                      checked={formData.vehicleTypes.motorcycles}
                      onCheckedChange={(checked) =>
                        updateNestedField(
                          "vehicleTypes",
                          "motorcycles",
                          checked,
                        )
                      }
                    />
                    <label
                      htmlFor="motorcycles"
                      className="text-gray-700 cursor-pointer"
                    >
                      Motorcycles
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="commercial"
                      checked={formData.vehicleTypes.commercial}
                      onCheckedChange={(checked) =>
                        updateNestedField("vehicleTypes", "commercial", checked)
                      }
                    />
                    <label
                      htmlFor="commercial"
                      className="text-gray-700 cursor-pointer"
                    >
                      Commercial vehicles
                    </label>
                  </div>
                </div>
              </div>

              {formData.serviceType.repairs && (
                <div>
                  <Label className="text-gray-700 font-semibold mb-3 block">
                    Main Repair Services You Offer (Tick all that apply)
                  </Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mechanical"
                        checked={formData.repairServices.mechanical}
                        onCheckedChange={(checked) =>
                          updateNestedField(
                            "repairServices",
                            "mechanical",
                            checked,
                          )
                        }
                      />
                      <label
                        htmlFor="mechanical"
                        className="text-gray-700 cursor-pointer"
                      >
                        Mechanical
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bodywork"
                        checked={formData.repairServices.bodywork}
                        onCheckedChange={(checked) =>
                          updateNestedField(
                            "repairServices",
                            "bodywork",
                            checked,
                          )
                        }
                      />
                      <label
                        htmlFor="bodywork"
                        className="text-gray-700 cursor-pointer"
                      >
                        Bodywork/Painting
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="electrical"
                        checked={formData.repairServices.electrical}
                        onCheckedChange={(checked) =>
                          updateNestedField(
                            "repairServices",
                            "electrical",
                            checked,
                          )
                        }
                      />
                      <label
                        htmlFor="electrical"
                        className="text-gray-700 cursor-pointer"
                      >
                        Electrical
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="panelBeating"
                        checked={formData.repairServices.panelBeating}
                        onCheckedChange={(checked) =>
                          updateNestedField(
                            "repairServices",
                            "panelBeating",
                            checked,
                          )
                        }
                      />
                      <label
                        htmlFor="panelBeating"
                        className="text-gray-700 cursor-pointer"
                      >
                        Panel beating
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="diagnostics"
                        checked={formData.repairServices.diagnostics}
                        onCheckedChange={(checked) =>
                          updateNestedField(
                            "repairServices",
                            "diagnostics",
                            checked,
                          )
                        }
                      />
                      <label
                        htmlFor="diagnostics"
                        className="text-gray-700 cursor-pointer"
                      >
                        Diagnostics
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="ac"
                        checked={formData.repairServices.ac}
                        onCheckedChange={(checked) =>
                          updateNestedField("repairServices", "ac", checked)
                        }
                      />
                      <label
                        htmlFor="ac"
                        className="text-gray-700 cursor-pointer"
                      >
                        AC repair
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="others"
                        checked={formData.repairServices.others}
                        onCheckedChange={(checked) =>
                          updateNestedField("repairServices", "others", checked)
                        }
                      />
                      <label
                        htmlFor="others"
                        className="text-gray-700 cursor-pointer"
                      >
                        Others
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {formData.serviceType.towing && (
                <div>
                  <Label className="text-gray-700 font-semibold mb-3 block">
                    Towing Services You Offer (Tick all that apply)
                  </Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="flatbed"
                        checked={formData.towServices.flatbed}
                        onCheckedChange={(checked) =>
                          updateNestedField("towServices", "flatbed", checked)
                        }
                      />
                      <label
                        htmlFor="flatbed"
                        className="text-gray-700 cursor-pointer"
                      >
                        Flatbed towing
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="recovery"
                        checked={formData.towServices.recovery}
                        onCheckedChange={(checked) =>
                          updateNestedField("towServices", "recovery", checked)
                        }
                      />
                      <label
                        htmlFor="recovery"
                        className="text-gray-700 cursor-pointer"
                      >
                        Recovery/winching
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="roadside"
                        checked={formData.towServices.roadside}
                        onCheckedChange={(checked) =>
                          updateNestedField("towServices", "roadside", checked)
                        }
                      />
                      <label
                        htmlFor="roadside"
                        className="text-gray-700 cursor-pointer"
                      >
                        Roadside help (jumpstart, tire change)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="available24"
                        checked={formData.towServices.available24}
                        onCheckedChange={(checked) =>
                          updateNestedField(
                            "towServices",
                            "available24",
                            checked,
                          )
                        }
                      />
                      <label
                        htmlFor="available24"
                        className="text-gray-700 cursor-pointer"
                      >
                        24/7 available?
                      </label>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="yearsInBusiness"
                    className="text-gray-700 font-semibold"
                  >
                    Years in Business
                  </Label>
                  <Select
                    value={formData.yearsInBusiness}
                    onValueChange={(value) =>
                      updateFormData("yearsInBusiness", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select years" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] overflow-y-auto">
                      <SelectItem value="<1">Less than 1 year</SelectItem>
                      <SelectItem value="1-5">1–5 years</SelectItem>
                      <SelectItem value="5-10">5–10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="quoteSpeed"
                    className="text-gray-700 font-semibold"
                  >
                    How fast can you give a repair quote?
                  </Label>
                  <Select
                    value={formData.quoteSpeed}
                    onValueChange={(value) =>
                      updateFormData("quoteSpeed", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select speed" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] overflow-y-auto">
                      <SelectItem value="same-day">Same day</SelectItem>
                      <SelectItem value="next-day">Next day</SelectItem>
                      <SelectItem value="2-3-days">2–3 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Photos */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">
                6
              </span>
              Photos
              <span className="text-gray-600 text-sm">
                (Optional – Big help for "Verified" badge)
              </span>
            </h2>

            <div>
              <Label className="text-gray-700 font-semibold mb-3 block">
                Upload Photos (Take with phone – optional but recommended)
              </Label>
              <p className="text-sm text-gray-600 mb-3">
                Maximum 3 photos: Workshop outside signboard, Inside
                workshop/tools, Your tow truck (if applicable)
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-500 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <label htmlFor="photos" className="cursor-pointer">
                  <span className="text-green-600 font-semibold hover:text-green-700">
                    Click to upload photos
                  </span>
                  <span className="text-gray-600"> or drag and drop</span>
                  <input
                    id="photos"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                {formData.photos.length > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    {formData.photos.length} photo(s) selected
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 7: Agreement & Submit */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">
                7
              </span>
              Agreement & Submit
            </h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="notes" className="text-gray-700 font-semibold">
                  Any extra notes?{" "}
                  <span className="text-gray-500">(Optional)</span>
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => updateFormData("notes", e.target.value)}
                  placeholder="Tell us anything else you'd like us to know..."
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreed"
                    checked={formData.agreed}
                    onCheckedChange={(checked) =>
                      updateFormData("agreed", checked)
                    }
                    className="mt-1"
                  />
                  <label
                    htmlFor="agreed"
                    className="text-gray-700 cursor-pointer"
                  >
                    <span className="font-semibold">I agree to:</span>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                      <li>Provide honest repair quotes</li>
                      <li>Treat customers well</li>
                      <li>Allow my details to be shown in the app</li>
                    </ul>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                onTouchStart={() => {}}
                className="w-full h-14 text-lg bg-green-600 hover:bg-green-700 text-white"
                disabled={!formData.agreed}
              >
                Send Application
              </Button>

              {!formData.agreed && (
                <p className="text-sm text-orange-600 text-center flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Please agree to the terms above to submit
                </p>
              )}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>
            Questions? Call us at +234-911-8223-417 or email support@claimam.com
          </p>
          <p className="mt-2">© 2025 ClaimAm. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
