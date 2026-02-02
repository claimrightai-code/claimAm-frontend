import { ArrowLeft, Shield, Lock, Eye, FileText, AlertCircle, Mail, Phone } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back to Website</span>
        </button>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white p-6 lg:p-8">
          {/* Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00BA00] to-[#00C853] rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl text-[#1A1A1A]">Privacy Policy</h1>
              <p className="text-sm text-gray-600">Last Updated: December 10, 2025</p>
            </div>
          </div>

          {/* Intro */}
          <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-200">
            <p className="text-sm text-gray-700">
              <strong>ClaimAm</strong> ("we", "us", "our") is committed to protecting your privacy. We operate as a technology platform automating insurance claims via USSD, mobile app and agents. This policy explains how we handle your data in full compliance with the <strong>Nigeria Data Protection Act (NDPA) 2023</strong>.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {/* Section 1 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-xl text-[#1A1A1A]">1. Information We Collect</h2>
              </div>
              <div className="pl-10 space-y-3">
                <div>
                  <p className="text-sm mb-2"><strong>Personal:</strong></p>
                  <p className="text-sm text-gray-700">Name, phone number, email, address, bank details (for payouts), date of birth.</p>
                </div>
                <div>
                  <p className="text-sm mb-2"><strong>Sensitive:</strong></p>
                  <p className="text-sm text-gray-700">Health records, accident photos, farm/location data (only when you provide).</p>
                </div>
                <div>
                  <p className="text-sm mb-2"><strong>Usage:</strong></p>
                  <p className="text-sm text-gray-700">USSD menu choices, app interactions, device info.</p>
                </div>
                <div>
                  <p className="text-sm mb-2"><strong>From agents:</strong></p>
                  <p className="text-sm text-gray-700">Only the minimum needed to help you (name, phone, claim status).</p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-purple-600" />
                </div>
                <h2 className="text-xl text-[#1A1A1A]">2. How We Use Your Data (Legal Bases)</h2>
              </div>
              <div className="pl-10 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700"><strong>Contract,</strong> to process your claim and pay you.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700"><strong>Consent,</strong> for marketing, Echo Claims sharing, referrals.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700"><strong>Legitimate interests,</strong> fraud prevention, service improvement.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700"><strong>Legal obligation,</strong> compliance (NAICOM) reporting.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                </div>
                <h2 className="text-xl text-[#1A1A1A]">3. How We Share Your Data</h2>
              </div>
              <div className="pl-10 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Your chosen insurer (only claim-related data).</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Licensed payout partner (bank/fintech) for transfers.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Agents (limited view for onboarding/support).</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Regulators (NAICOM, NDPC) when required.</p>
                </div>
              </div>
              <div className="pl-10 mt-3 bg-red-50 rounded-lg p-3 border border-red-200">
                <p className="text-sm text-red-700"><strong>We never sell your data.</strong></p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
                <h2 className="text-xl text-[#1A1A1A]">4. USSD-Specific</h2>
              </div>
              <div className="pl-10">
                <p className="text-sm text-gray-700">
                  When you dial <strong>*669#</strong>, we only collect your phone number and menu choices. No call recording, no location tracking without consent.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-4 h-4 text-red-600" />
                </div>
                <h2 className="text-xl text-[#1A1A1A]">5. Security & Retention</h2>
              </div>
              <div className="pl-10">
                <p className="text-sm text-gray-700">
                  We use encryption (AWS KMS), access controls, and regular audits. Data is kept only as long as needed (claims records 7 years per NAICOM; everything else deleted on request).
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-yellow-600" />
                </div>
                <h2 className="text-xl text-[#1A1A1A]">6. Your Rights (NDPA)</h2>
              </div>
              <div className="pl-10 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Access, correct, delete, restrict, or port your data — free within 30 days.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Withdraw consent anytime (reply STOP or email us).</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Complain to NDPC at ndpc.gov.ng.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Contact */}
          <div className="mt-8 bg-gradient-to-br from-[#00BA00] to-[#00C853] rounded-xl p-6 text-white">
            <h3 className="text-lg mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:privacy@ClaimAm.com" className="text-sm hover:underline">Email: privacy@ClaimAm.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+2348067969685" className="text-sm hover:underline">Phone: +234 806 796 9685</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">DPO: dpo@ClaimAm.com</span>
              </div>
            </div>
          </div>

          {/* Footer Message */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 italic">
              We only collect what we need to pay you faster. Your data stays yours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}