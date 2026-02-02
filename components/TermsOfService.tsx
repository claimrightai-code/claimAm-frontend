import { ArrowLeft, FileText, Users, DollarSign, Shield, Gavel, Mail, Phone, CheckCircle } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl text-[#1A1A1A]">Terms of Service</h1>
              <p className="text-sm text-gray-600">Last Updated: December 10, 2025</p>
            </div>
          </div>

          {/* Intro */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
            <p className="text-sm text-gray-700">
              Welcome to <strong>ClaimAm</strong>, the accessible, easy, and fastest way to get your insurance money. By using our website, app, USSD (*669#), or agent services you agree to these terms.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {/* Section 1 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <h2 className="text-xl text-[#1A1A1A]">1. Who Can Use ClaimAm</h2>
              </div>
              <div className="pl-10 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">You must be 16+ (under 18 needs parent/guardian consent).</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">You must be in Nigeria (Africa).</p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <h2 className="text-xl text-[#1A1A1A]">2. Our Services</h2>
              </div>
              <div className="pl-10 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">File and track claims (motor, crop/livestock, health).</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Instant AI verification + escalation to NAICOM if delayed.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Payouts via licensed partner within hours of approval.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Echo Claims — optional viral success sharing.</p>
                </div>
              </div>
              <div className="pl-10 mt-3 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                <p className="text-sm text-yellow-700">Services are in beta until full launch (March 2026).</p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-orange-600" />
                </div>
                <h2 className="text-xl text-[#1A1A1A]">3. Fees</h2>
              </div>
              <div className="pl-10 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700"><strong>Free to file claims.</strong></p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700"><strong>Premium subscription (optional):</strong> ₦1,500 every 20 days or ₦2,250 monthly.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700"><strong>Success fee:</strong> 7% of approved payout (max ₦70,000 on ₦1M claim), only if you get paid.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700"><strong>Agent onboarding contribution:</strong> ₦1,500 (one-time, non-refundable, converts to 12 months premium credit on launch).</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700"><strong>Performance deposit:</strong> ₦10,000 (fully refunded after 100 onboardings in 45 days).</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-xl text-[#1A1A1A]">4. Agent Rules</h2>
              </div>
              <div className="pl-10 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Earn ₦600 per successful referral + share of success fees.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Follow training and data protection rules.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700 bg-red-50 rounded px-2 py-1 border border-red-200"><strong>Fraud or misuse = permanent ban + deposit and Performance deposit forfeit if already made.</strong></p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-red-600" />
                </div>
                <h2 className="text-xl text-[#1A1A1A]">5. Refunds & Cancellation</h2>
              </div>
              <div className="pl-10 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Cancel anytime — no questions asked.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Deposits always refunded per rules above.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">No cash refund on onboarding contribution (credit instead).</p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-yellow-600" />
                </div>
                <h2 className="text-xl text-[#1A1A1A]">6. Our Promise & Limits</h2>
              </div>
              <div className="pl-10 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">We make claims accessible, faster, we don&apos;t guarantee approval (that&apos;s the insurer).</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Liability limited to fees you paid us.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00BA00] rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Service may have bugs, we fix fast.</p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Gavel className="w-4 h-4 text-gray-600" />
                </div>
                <h2 className="text-xl text-[#1A1A1A]">7. Governing Law</h2>
              </div>
              <div className="pl-10">
                <p className="text-sm text-gray-700">
                  Nigeria. Disputes resolved in Abuja courts or arbitration.
                </p>
              </div>
            </section>
          </div>

          {/* Contact */}
          <div className="mt-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="text-lg mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@ClaimAm.com" className="text-sm hover:underline">support@ClaimAm.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+2348067969685" className="text-sm hover:underline">+234 806 796 9685</a>
              </div>
            </div>
          </div>

          {/* Footer Message */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 italic">
              🇳🇬 Built for Nigeria&apos;s 106M underserved • Expanding to 1.4B+ Africans
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}