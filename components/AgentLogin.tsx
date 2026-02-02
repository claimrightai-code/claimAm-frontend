"use client";
import { useState } from "react";
import { ArrowLeft, Lock, CheckCircle, Mail, Eye, EyeOff } from "lucide-react";
import { ClaimAmLogo } from "@/../../components/ClaimAmLogo";
import { useUserContext } from "@/hooks/hooks";
import { useRouter } from "next/navigation";
import { toast } from "@/../../components/ui/use-toast";
interface AgentLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export function AgentLogin({ onLogin, onBack }: AgentLoginProps) {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
 const {loginFunc} = useUserContext();
  const handleSubmit =  async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setIsLoading(true);
      // Simulate Login API call
      const res = await loginFunc({
        email: formData.email,
        password: formData.password
      })
    console.log(res.redirectUrl)
      if (res.ok){
        toast({
          title: "Welcome back!",
          description: "Redirecting to your dashboard"
        })
          
        if (res.redirectUrl){
          router.push(res.redirectUrl)
        }
      }else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: res.message || "Please check your credentials and try again."
        })
      }
      setTimeout(() => {
        setIsLoading(false);
        // onLogin();
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboards
        </button>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white">
        
                       <ClaimAmLogo size={60} withBackground={false} />
                    
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#00BA00] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl text-white">₦</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl text-[#1A1A1A] mb-2">Agent Login</h1>
            <p className="text-sm text-gray-600">
              Enter your email and password to access the portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="agent@claimam.ng"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BA00] focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BA00] focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!formData.email || !formData.password || isLoading}
              className="w-full bg-[#00BA00] hover:bg-[#00C853] text-white py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Secure Login
                </>
              )}
            </button>

           
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              Secure agent authentication powered by ClaimAm
            </p>
            <p className="text-xs text-gray-400 mt-1">
              🇳🇬 Supporting Nigeria&apos;s 106M underserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
