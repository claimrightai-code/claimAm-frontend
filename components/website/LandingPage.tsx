"use client";
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ClaimAmLogo } from '../ClaimAmLogo';
import Image from 'next/image';
import { usePathname, useRouter } from "next/navigation";
import heroimage from "@/assets/images/assets/heroimage.png";
import motorist from "@/assets/images/assets/motorist.png";
import { 
  Menu,
  X,
  ArrowRight,
  Shield,
  Zap,
  Clock,
  Users,
  CheckCircle,
  ChevronRight,
  Smartphone,
  Brain,
  Lock,
  Star,
  Play,
  Apple,
  Globe,
  Phone as PhoneIcon,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Twitter,
  Radio,
  Share2,
  FileCheck,
  MessageSquare,
  Coins,
  BarChart3,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';
import { MagicTimeline } from './MagicTimeline';

interface LandingPageProps {
  onGetStarted?: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
  onServiceProviderClick?: () => void;
}

export function LandingPage({ onGetStarted, onPrivacyClick, onTermsClick, onServiceProviderClick }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoFormData, setDemoFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
const router = useRouter();
  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your interest! Our team will contact you within 24 hours.');
    setDemoFormData({ name: '', email: '', phone: '', company: '', message: '' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };
 const navigate = () => {
   router.push("/agent");
   return;
 };
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4">
      {/* Agent Registration Button - Top Right */}
      <div className="fixed top-20 right-6 z-50 text-center">
        <button
          onClick={
            navigate
          }
          className="bg-[#00BA00] hover:bg-[#00C853] text-white px-6 py-3 rounded-xl shadow-2xl transition-all hover:scale-105 text-sm animate-pulse"
        >
          <span className="block">🌟 Agent Registration</span>
        </button>
        <p className="text-xs text-gray-700 mt-2 px-2 bg-white/90 rounded-lg py-1">
          Click to become a founding agent
        </p>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <ClaimAmLogo size={60} withBackground={false} />
              <span className="text-xl font-bold text-gray-900">ClaimAm</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-[#00A878] transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-700 hover:text-[#00A878] transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-gray-700 hover:text-[#00A878] transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-700 hover:text-[#00A878] transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("demo")}
                className="text-gray-700 hover:text-[#00A878] transition-colors"
              >
                Request Demo
              </button>
              <Button
                onClick={onGetStarted}
                style={{ backgroundColor: "#00A878" }}
                className="rounded-full"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 border-t border-gray-200"
            >
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-left text-gray-700 hover:text-[#0052CC] transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-left text-gray-700 hover:text-[#0052CC] transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-left text-gray-700 hover:text-[#0052CC] transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-left text-gray-700 hover:text-[#0052CC] transition-colors"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection("demo")}
                  className="text-left text-gray-700 hover:text-[#0052CC] transition-colors"
                >
                  Request Demo
                </button>
                <Button
                  onClick={onGetStarted}
                  style={{ backgroundColor: "#0052CC" }}
                  className="w-full"
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-8 lg:pt-24 lg:pb-12 bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl lg:text-5xl text-gray-900 mb-4">
              Built to include Africa underserved rural starting with 106M
              underserved Nigerians with our{" "}
              <span className="text-[#00A878]">AI-USSD simplified system</span>,
              empowering millions in Africa.
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              <span className="font-semibold text-[#00A878]">
                Dial *669# from any phone, anywhere.
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-4xl mx-auto mb-8"
          >
            <div className="relative z-10">
              <Image
                src={heroimage}
                alt="Claim Logo"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#0052CC]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">
                    Auto-Approval Rate
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex flex-col gap-3 mb-6">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="text-lg h-12 px-8"
                style={{ backgroundColor: "#00A878" }}
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => scrollToSection("demo")}
                size="lg"
                variant="outline"
                className="text-lg h-12 px-8 border-2 border-[#00A878] text-[#00A878] hover:bg-green-50"
              >
                Request a Demo
              </Button>
            </div>

            {/* App Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <Apple className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <Play className="w-8 h-8 fill-current" />
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center gap-6 flex-wrap justify-center">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#0052CC]" />
                  <span className="text-sm text-gray-600">
                    Regulatory compliant
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0052CC]" />
                  <span className="text-sm text-gray-600">
                    Bank Grade Security
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#0052CC]" />
                  <span className="text-sm text-gray-600">
                    Built for millions
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-[#0052CC] to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">0</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">₦0</div>
              <div className="text-blue-100">Claims Processed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">0 Min</div>
              <div className="text-blue-100">Avg Processing</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">0%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Revolutionary Features
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Powered by cutting edge AI-USSD and built specifically to include
              underserved Africa rural insurance market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200 shadow-md"
            >
              <div className="w-12 h-12 bg-[#0052CC] rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                AI-Powered Verification
              </h3>
              <p className="text-gray-600 mb-3 text-sm">
                Advanced OCR, image forensics, and deepfake detection ensure
                authentic claims with 99.7% accuracy.
              </p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0052CC] mt-0.5 flex-shrink-0" />
                  Document OCR extraction
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0052CC] mt-0.5 flex-shrink-0" />
                  Deepfake detection
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0052CC] mt-0.5 flex-shrink-0" />
                  Image forensics analysis
                </li>
              </ul>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200 shadow-md"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Instant Processing
              </h3>
              <p className="text-gray-600 mb-3 text-sm">
                Submit claims in minutes via app or USSD, get approved in hours.
                No more weeks of waiting.
              </p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                  15-minute average processing
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                  Real-time status updates
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                  24/7 availability via *669#
                </li>
              </ul>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-200 shadow-md"
            >
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Fraud Prevention
              </h3>
              <p className="text-gray-600 mb-3 text-sm">
                Multi-layered fraud detection protects insurers and honest
                claimants alike.
              </p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600 mt-0.5 flex-shrink-0" />
                  IoT cross-verification
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600 mt-0.5 flex-shrink-0" />
                  Duplicate claim detection
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600 mt-0.5 flex-shrink-0" />
                  Risk scoring engine
                </li>
              </ul>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border border-orange-200 shadow-md"
            >
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                ClaimAm Advance Pay
              </h3>
              <p className="text-gray-600 mb-3 text-sm">
                Get up to 50% of your claim instantly while your claim payout is
                being processed.
              </p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-orange-600 mt-0.5 flex-shrink-0" />
                  Instant emergency funds
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-orange-600 mt-0.5 flex-shrink-0" />
                  No interest charges (T&C apply)
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-orange-600 mt-0.5 flex-shrink-0" />
                  Premium members only
                </li>
              </ul>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl border border-red-200 shadow-md"
            >
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Bank Grade Security
              </h3>
              <p className="text-gray-600 mb-3 text-sm">
                Your data is encrypted and protected with enterprise-level
                security.
              </p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 flex-shrink-0" />
                  End-to-end encryption
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 flex-shrink-0" />
                  Regulatory compliant
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 flex-shrink-0" />
                  Secure data centers
                </li>
              </ul>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-xl border border-teal-200 shadow-md"
            >
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Africa Localization
              </h3>
              <p className="text-gray-600 mb-3 text-sm">
                Built for Africans with multi-language support and local
                currency.
              </p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-600 mt-0.5 flex-shrink-0" />
                  Starting with Nigeria Pidgin, Yoruba, Hausa, and Igbo
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-600 mt-0.5 flex-shrink-0" />
                  Nigeria Naira (₦) payments
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-600 mt-0.5 flex-shrink-0" />
                  Nigeria Local bank integration
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - NEW */}
      <section
        id="services"
        className="py-12 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                ClaimAm Services Overview
              </h2>
              <p className="text-base text-gray-600 max-w-4xl mx-auto">
                An AI-powered insurtech platform automating insurance claims
                processing for underserved rural users in Nigeria and Africa,
                bridging gaps in rural access, awareness, and insurers trust
                through a hybrid B2C/B2B model.
              </p>
            </motion.div>
          </div>

          <div className="space-y-6">
            {/* Service 1: Claim Submission & Automation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg border-2 border-blue-200 overflow-hidden"
            >
              <div className="grid lg:grid-cols-12 gap-0">
                <div className="lg:col-span-4 bg-gradient-to-br from-[#0052CC] to-blue-700 p-6 lg:p-8 flex flex-col justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4"
                  >
                    <FileCheck className="w-7 h-7 text-[#0052CC]" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Claim Submission & Automation
                  </h3>
                  <div className="w-12 h-1 bg-[#00A878]"></div>
                </div>
                <div className="lg:col-span-8 p-6 lg:p-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Smartphone className="w-4 h-4 text-[#0052CC]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 text-sm">
                          Multi-Channel Access
                        </h4>
                        <p className="text-gray-700 text-xs">
                          Users file claims via mobile app or{" "}
                          <span className="font-bold text-[#00A878]">
                            USSD (*669#)
                          </span>{" "}
                          for basic phones,{" "}
                          <span className="font-bold">
                            no internet required
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-[#00A878]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 text-sm">
                          Comprehensive Coverage
                        </h4>
                        <p className="text-gray-700 text-xs">
                          Supports <span className="font-semibold">motor</span>{" "}
                          (third-party/full coverage),{" "}
                          <span className="font-semibold">agriculture</span>{" "}
                          (crop/livestock loss), and{" "}
                          <span className="font-semibold">health</span> (HIS
                          benefits).
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 text-sm">
                          AI-Powered Verification
                        </h4>
                        <p className="text-gray-700 text-xs">
                          AI verifies details in seconds, detecting fraud (
                          <span className="font-bold text-red-600">
                            70% reduction
                          </span>
                          ) and extracting data from photos/docs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service 2: Education & Escalation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg border-2 border-green-200 overflow-hidden"
            >
              <div className="grid lg:grid-cols-12 gap-0">
                <div className="lg:col-span-8 p-6 lg:p-8 order-2 lg:order-1">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-4 h-4 text-[#0052CC]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 text-sm">
                          Multilingual Chatbot Support
                        </h4>
                        <p className="text-gray-700 text-xs">
                          Chatbots in{" "}
                          <span className="font-semibold">
                            English/Pidgin/Yoruba/Igbo/Hausa
                          </span>{" "}
                          educate users on their insurance rights and claim
                          processes.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 text-sm">
                          Auto Regulatory Body Escalation
                        </h4>
                        <p className="text-gray-700 text-xs">
                          Auto escalates delays to regulatory body (
                          <span className="font-bold text-red-600">NAICOM</span>
                          ) (
                          <span className="font-semibold">30 day buffer</span>),
                          ending insurer "string along" tactics and protecting
                          claimant rights.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-[#00A878]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 text-sm">
                          Empowerment Through Knowledge
                        </h4>
                        <p className="text-gray-700 text-xs">
                          Bridges awareness gaps by informing rural users about
                          their entitlements and how to access them effectively.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 bg-gradient-to-br from-[#00A878] to-green-700 p-6 lg:p-8 flex flex-col justify-center order-1 lg:order-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4"
                  >
                    <MessageSquare className="w-7 h-7 text-[#00A878]" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Education & Escalation
                  </h3>
                  <div className="w-12 h-1 bg-[#0052CC]"></div>
                </div>
              </div>
            </motion.div>

            {/* Service 3: Payout & Echo Claims */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg border-2 border-orange-200 overflow-hidden"
            >
              <div className="grid lg:grid-cols-12 gap-0">
                <div className="lg:col-span-4 bg-gradient-to-br from-orange-500 to-orange-700 p-6 lg:p-8 flex flex-col justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4"
                  >
                    <Coins className="w-7 h-7 text-orange-600" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Payout & Echo Claims
                  </h3>
                  <div className="w-12 h-1 bg-white"></div>
                </div>
                <div className="lg:col-span-8 p-6 lg:p-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-[#00A878]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 text-sm">
                          Instant Disbursements
                        </h4>
                        <p className="text-gray-700 text-xs">
                          Instant disbursements via partnered fintech upon
                          approval, putting money directly into users bank
                          accounts in{" "}
                          <span className="font-bold">hours, not months</span>.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Share2 className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 text-sm">
                          Echo Claims - Viral Trust Building
                        </h4>
                        <p className="text-gray-700 text-xs">
                          Auto-generates shareable testimonials that turn every
                          successful claim into a{" "}
                          <span className="font-bold text-[#00A878]">
                            viral success story
                          </span>
                          , rebuilding insurance companies trust across Africa.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-[#0052CC]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 text-sm">
                          Organic Growth Engine
                        </h4>
                        <p className="text-gray-700 text-xs">
                          Every payout becomes a referral opportunity,
                          exponentially growing user base through authentic
                          word-of-mouth.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service 4: B2B Tools */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg border-2 border-purple-200 overflow-hidden"
            >
              <div className="grid lg:grid-cols-12 gap-0">
                <div className="lg:col-span-8 p-6 lg:p-8 order-2 lg:order-1">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-4 h-4 text-[#0052CC]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 text-sm">
                          Real-Time APIs & Dashboards
                        </h4>
                        <p className="text-gray-700 text-xs">
                          APIs for real-time monitoring and fraud analytics,
                          with dashboards for regulatory bodies and insurers
                          (e.g.,{" "}
                          <span className="font-bold">
                            30% unsettled case reduction
                          </span>
                          ).
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 text-sm">
                          Regulatory Body Integration
                        </h4>
                        <p className="text-gray-700 text-xs">
                          Direct integration with regulatory bodies (NAICOM) for
                          regulatory oversight, ensuring compliance and
                          transparency across all claims.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-[#00A878]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 text-sm">
                          Partner Ecosystem
                        </h4>
                        <p className="text-gray-700 text-xs">
                          White-label solutions for insurers and associations to
                          offer ClaimAm services under their own brand.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 bg-gradient-to-br from-purple-600 to-purple-800 p-6 lg:p-8 flex flex-col justify-center order-1 lg:order-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4"
                  >
                    <BarChart3 className="w-7 h-7 text-purple-600" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    B2B Tools for Insurers/Partners
                  </h3>
                  <div className="w-12 h-1 bg-[#00A878]"></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl p-6 lg:p-8 text-center"
          >
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
              Starting with Nigeria&apos;s{" "}
              <span className="text-[#00A878]">₦1T unclaimed crisis</span>
            </h3>
            <p className="text-base text-blue-100 mb-4 max-w-3xl mx-auto">
              Scaling to Africa&apos;s rural and urban markets, reclaiming
              billions for everyday people
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="h-11 px-6 bg-[#00A878] hover:bg-[#00A878]/90"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Start Your Claim
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => scrollToSection("demo")}
                size="lg"
                className="h-11 px-6 bg-[#0052CC] hover:bg-[#0052CC]/90 text-white border-2 border-white shadow-xl"
              >
                Partner With Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* USSD Access Section - NEW */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
                <Radio className="w-10 h-10 text-[#0052CC]" />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                Accessible with no hassle via USSD
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                No internet? No office visit? Just{" "}
                <span className="font-bold text-white">dial *669#</span> from
                any phone — even in the deepest village — and file your claim in
                minutes or visit any of our ClaimAm agents nation wide.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-8"
            >
              <div className="grid md:grid-cols-3 gap-6 text-white">
                <div>
                  <div className="text-4xl font-bold mb-2">*669#</div>
                  <div className="text-blue-100">Simple USSD code</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">0G</div>
                  <div className="text-blue-100">No data required</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-blue-100">Rural coverage</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <p className="text-blue-100 text-lg">
                serving 600+M Africans, starting with 106M underserved Nigerians
                in every corner of the country.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              How ClaimAm Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get your insurance claim processed in 4 simple steps online or via
              *669# or via any of ClaimAm agent nation wide
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Steps on the left */}
            <div className="flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-6">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="w-12 h-12 bg-[#0052CC] text-white rounded-full flex items-center justify-center font-bold mb-4">
                    1
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Sign Up</h3>
                  <p className="text-gray-600 text-sm">
                    Create your account in under 2 minutes via app or dial *669#
                    from any phone or visit a ClaimAm agent near you.
                  </p>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="w-12 h-12 bg-[#0052CC] text-white rounded-full flex items-center justify-center font-bold mb-4">
                    2
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    File Your Claim
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Upload documents via app or follow USSD prompts. Our AI
                    guides you through or walk to any of our agents nearest to
                    you for assistance.
                  </p>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="w-12 h-12 bg-[#0052CC] text-white rounded-full flex items-center justify-center font-bold mb-4">
                    3
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    AI Verification
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Our AI verifies your claim in minutes using advanced fraud
                    detection technology.
                  </p>
                </motion.div>

                {/* Step 4 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="w-12 h-12 bg-[#0052CC] text-white rounded-full flex items-center justify-center font-bold mb-4">
                    4
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Get Paid</h3>
                  <p className="text-gray-600 text-sm">
                    Receive instant approval and get funds directly to your bank
                    account.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Image on the right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center"
            >
              {/* <ImageWithFallback
                src={howItWorksImage}
                alt="Nigerian woman farmer using mobile phone for ClaimAm"
                className="w-3/4 h-auto rounded-2xl shadow-2xl object-cover"
              /> */}{" "}
              How it works image placeholder
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Built for Millions
            </h2>
            <p className="text-base text-gray-600">
              See what our users expects of ClaimAm
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Testimonial 1 - USSD Farmer */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-200"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                "Imagine being in my village with no network and dialing *669#,
                fie my claim via USSD, and get my payout within 12 hours, all
                without leaving the farm, wouldn't that be Epic!"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-[#0052CC] font-bold text-sm">MI</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    Musa Ibrahim
                  </div>
                  <div className="text-xs text-gray-600">
                    Farmer, Kano State
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                "We hope ClaimAm processes motor insurance claim in 15 minutes!
                this will turn me to lifetime subscriber when i get my money
                same day."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">AO</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    Adewale Okonkwo
                  </div>
                  <div className="text-xs text-gray-600">Lagos, Nigeria</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                "Hope i can get an advance pay to safe me during an emergency up
                to 40% instantly while they verified my motor claim."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">CN</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    Chioma Nwosu
                  </div>
                  <div className="text-xs text-gray-600">Abuja, Nigeria</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 4 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                "Finally, an insurance app that speaks my language! The Pidgin
                option will make everything so easy to understand."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-sm">IB</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    Ibrahim Bello
                  </div>
                  <div className="text-xs text-gray-600">Kano, Nigeria</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Magic in 5 Seconds - NEW ANIMATED SECTION */}
      <MagicTimeline />

      {/* For Institutions (B2B) - NEW SECTION */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              For Institutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Partner with ClaimAm to revolutionize your insurance operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Insurers Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border-2 border-blue-300 shadow-lg"
            >
              <div className="w-12 h-12 bg-[#0052CC] rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Insurers</h3>
              <ul className="space-y-3 mb-5">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#0052CC] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900 text-sm">
                      Cut fraud 70%
                    </span>
                    <p className="text-xs text-gray-600">
                      AI-powered verification eliminates fraudulent claims
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#0052CC] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900 text-sm">
                      Restore back users trust in insurance
                    </span>
                    <p className="text-xs text-gray-600">
                      Build credibility through transparent, fast claim
                      processing
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#0052CC] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900 text-sm">
                      Co-brand every viral Echo
                    </span>
                    <p className="text-xs text-gray-600">
                      Your brand on every shared claim success story
                    </p>
                  </div>
                </li>
              </ul>
              <Button
                className="w-full h-11"
                style={{ backgroundColor: "#0052CC" }}
              >
                Partner with Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Service Providers Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border-2 border-green-300 shadow-lg"
            >
              <div className="w-12 h-12 bg-[#00A878] rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Service Providers
              </h3>
              <ul className="space-y-3 mb-5">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#00A878] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900 text-sm">
                      Get recommended for services you provide
                    </span>
                    <p className="text-xs text-gray-600">
                      Auto garages, towing services, repair shops, and more
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#00A878] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900 text-sm">
                      Direct access to verified customers
                    </span>
                    <p className="text-xs text-gray-600">
                      Connect with insurance claim holders who need your
                      services
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#00A878] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900 text-sm">
                      Grow your business network
                    </span>
                    <p className="text-xs text-gray-600">
                      Expand your customer base through ClaimAm's platform
                    </p>
                  </div>
                </li>
              </ul>
            <Button 
                className="w-full h-11" 
                style={{ backgroundColor: '#00A878' }}
                onClick={() => {
                  if (onServiceProviderClick) {
                    onServiceProviderClick();
                  }
                
                }}
              >
                Join as a service provider
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About ClaimAm Section - NEW */}
      <section
        id="about"
        className="py-12 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                About ClaimAm
              </h2>
              <div className="w-24 h-1 bg-[#00A878] mx-auto mb-4"></div>
            </motion.div>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6 lg:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#00A878] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Our Mission
                  </h3>
                  <p className="text-base text-blue-100 leading-relaxed">
                    We&apos;re on a mission to put unclaimed insurance money
                    back in the pockets of everyday Africans with focus on
                    underserved rural, starting with Nigeria{" "}
                    <span className="font-bold text-white">
                      237M population
                    </span>{" "}
                    and it&apos;s{" "}
                    <span className="font-bold text-[#00A878]">
                      106M underserved rural
                    </span>
                    .
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6 lg:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#0052CC] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Our Vision
                  </h3>
                  <p className="text-base text-blue-100 leading-relaxed">
                    A continent where every driver, farmer, and family gets
                    insurance payout in hours, not months, turning{" "}
                    <span className="font-bold text-[#00A878]">
                      billions unclaimed into billions reclaimed
                    </span>
                    .
                  </p>
                </div>
              </div>
            </motion.div>

            {/* The Problem & Solution */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 lg:p-8 shadow-xl"
            >
              <div className="space-y-4">
                <p className="text-base text-gray-800 leading-relaxed">
                  <span className="font-bold text-red-600">
                    Every year, rural gaps, insurer delays, and low awareness
                    rob people of money they&apos;re legally entitled to.
                  </span>
                </p>

                <p className="text-xl font-bold text-[#0052CC]">
                  ClaimAm changes that.
                </p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  With one dial{" "}
                  <span className="font-bold text-[#00A878]">(*669#)</span> or a
                  few taps on our app, or with our agents anyone, anywhere, even
                  deep in the village with zero internet, can file a claim, have
                  our AI verify it in seconds, and payout hits in hours.
                </p>

                <div className="grid md:grid-cols-3 gap-4 pt-4">
                  <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                    <div className="w-10 h-10 bg-[#00A878] rounded-lg flex items-center justify-center mb-3">
                      <Share2 className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm">
                      Echo Claims
                    </h4>
                    <p className="text-xs text-gray-700">
                      Turns every win into a viral success story that rebuilds
                      trust across Africa
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                    <div className="w-10 h-10 bg-[#0052CC] rounded-lg flex items-center justify-center mb-3">
                      <Radio className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm">
                      Bridge the Gap
                    </h4>
                    <p className="text-xs text-gray-700">
                      ClaimAm bridges the rural gap, empowering all
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm">
                      New Standard
                    </h4>
                    <p className="text-xs text-gray-700">
                      It&apos;s the new way Africa claims what&apos;s theirs
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center pt-4"
            >
              <p className="text-xl font-bold text-white mb-4">
                Join the movement. Claim your right.
              </p>
              <Button
                onClick={onGetStarted}
                size="lg"
                className="h-12 px-6 bg-[#00A878] hover:bg-[#00A878]/90"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Get Started Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Request Demo Section */}
      <section
        id="demo"
        className="py-20 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                See ClaimAm in Action
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Request a personalized demo and discover how ClaimAm can
                transform your insurance claims process. Works via app or *669#.
              </p>
              {/* <ImageWithFallback
                src={demoImage}
                alt="Nigerian Highway - Drive Safely with ClaimAm Insurance"
                className="w-3/4 h-auto rounded-2xl shadow-xl mx-auto"
              /> */}
              <Image
                src={motorist}
                alt="Nigerian Highway - Drive Safely with ClaimAm Insurance"
                className="w-3/4 h-auto rounded-2xl shadow-xl mx-auto"
              />
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
              <form onSubmit={handleDemoSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="demo-name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <Input
                    id="demo-name"
                    type="text"
                    required
                    value={demoFormData.name}
                    onChange={(e) =>
                      setDemoFormData({ ...demoFormData, name: e.target.value })
                    }
                    placeholder="Enter your full name"
                    className="h-12"
                  />
                </div>

                <div>
                  <label
                    htmlFor="demo-email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id="demo-email"
                    type="email"
                    required
                    value={demoFormData.email}
                    onChange={(e) =>
                      setDemoFormData({
                        ...demoFormData,
                        email: e.target.value,
                      })
                    }
                    placeholder="you@company.com"
                    className="h-12"
                  />
                </div>

                <div>
                  <label
                    htmlFor="demo-phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="demo-phone"
                    type="tel"
                    required
                    value={demoFormData.phone}
                    onChange={(e) =>
                      setDemoFormData({
                        ...demoFormData,
                        phone: e.target.value,
                      })
                    }
                    placeholder="+234 xxx xxx xxxx"
                    className="h-12"
                  />
                </div>

                <div>
                  <label
                    htmlFor="demo-company"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Company Name (Optional)
                  </label>
                  <Input
                    id="demo-company"
                    type="text"
                    value={demoFormData.company}
                    onChange={(e) =>
                      setDemoFormData({
                        ...demoFormData,
                        company: e.target.value,
                      })
                    }
                    placeholder="Your company"
                    className="h-12"
                  />
                </div>

                <div>
                  <label
                    htmlFor="demo-message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message (Optional)
                  </label>
                  <textarea
                    id="demo-message"
                    rows={4}
                    value={demoFormData.message}
                    onChange={(e) =>
                      setDemoFormData({
                        ...demoFormData,
                        message: e.target.value,
                      })
                    }
                    placeholder="Tell us about your needs..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC] focus:border-transparent resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14"
                  style={{ backgroundColor: "#0052CC" }}
                >
                  Request Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-xs text-gray-600 text-center">
                  Our team will contact you within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - UPDATED */}
      <section className="py-20 bg-gradient-to-r from-[#0052CC] to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Join millions of users experiencing accessible, faster, smarter
            insurance claims
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            With our AI-USSD revolution. Dial *669# from any phone, anywhere, or
            download our app today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="text-lg h-14 px-8 bg-white text-[#0052CC] hover:bg-gray-100"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={() => scrollToSection("demo")}
              size="lg"
              className="text-lg h-14 px-8 bg-[#00A878] hover:bg-[#00A878]/90 text-white border-2 border-white shadow-xl"
            >
              <Play className="w-5 h-5 mr-2" />
              Request a Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
      </div>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <ClaimAmLogo size={60} withBackground={false} />
                <span className="text-xl font-bold">ClaimAm</span>
              </div>
              <p className="text-gray-400 mb-4">
                AI-USSD for Africa's rural and urban insurance claims.
                Accessible, fast, secure, and regulatory compliant.
              </p>
              <p className="text-green-400 font-semibold mb-6">
                📞 Dial *669# from any phone, anywhere in Nigeria
              </p>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com/claimam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#00A878] transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com/claimam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#00A878] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/company/claimam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#00A878] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://tiktok.com/@claimam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#00A878] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-gray-400 hover:text-[#0052CC] transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="text-gray-400 hover:text-[#0052CC] transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-400 hover:text-[#0052CC] transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="text-gray-400 hover:text-[#0052CC] transition-colors"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("demo")}
                    className="text-gray-400 hover:text-[#0052CC] transition-colors"
                  >
                    Request Demo
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-400">
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>support@claimam.com</span>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <PhoneIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>+234 9118223417</span>
                </li>
                <li className="flex items-start gap-2 text-green-400 font-semibold">
                  <PhoneIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Dial *669# anywhere</span>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Abuja, Nigeria</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 ClaimAm. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <button
                  onClick={onPrivacyClick}
                  className="text-gray-400 hover:text-[#0052CC] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={onTermsClick}
                  className="text-gray-400 hover:text-[#0052CC] transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#0052CC] transition-colors"
                >
                  Regulatory (NAICOM) Compliance
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}