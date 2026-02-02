"use client";
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ClaimAmLogo } from './ClaimAmLogo';

interface PitchDeckProps {
  onClose?: () => void;
}

export default function PitchDeck({ onClose }: PitchDeckProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title
    {
      id: 'title',
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-3">
          <ClaimAmLogo size={80} withBackground={false} />
          <h1 className="text-2xl text-gray-900">ClaimAm</h1>
          <p className="text-sm text-gray-600">AI-USSD for Africa's rural and urban insurance claims.</p>
          <p className="text-xs text-gray-500">For 1.4B+ Africans</p>
          <p className="text-xs text-gray-500">Starting Nigeria 106M underserved rural</p>
        </div>
      )
    },
    
    // Slide 2: Problem
    {
      id: 'problem',
      content: (
        <div className="flex flex-col justify-center h-full px-4">
          <h2 className="text-xl text-gray-900 mb-3">The Problem</h2>
          <div className="space-y-2 text-xs text-gray-700">
            <div className="flex items-start space-x-2">
              <span className="text-base">🚫</span>
              <p><strong className="text-red-600">1.4B+ rural Africans</strong> can't file claims — no internet, low feature phones</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-base">⏱️</span>
              <p><strong className="text-red-600">Average claim takes 2-6 months</strong> — families can't wait</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-base">💸</span>
              <p><strong className="text-red-600">Billions unclaimed annually</strong> — lost to complexity & fraud fears</p>
            </div>
          </div>
          <div className="mt-3 p-2 bg-red-50 border-l-4 border-red-600 rounded">
            <p className="text-xs text-gray-800">Every year, rural gaps, insurer delays, and low awareness rob people of money they're legally entitled to.</p>
          </div>
        </div>
      )
    },

    // Slide 3: Solution
    {
      id: 'solution',
      content: (
        <div className="flex flex-col justify-center h-full px-4">
          <h2 className="text-xl text-gray-900 mb-3">Our Solution</h2>
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#00A878] to-[#0052CC] text-white p-3 rounded-lg">
              <h3 className="text-sm mb-1">🏆 The USSD Moat: *669#</h3>
              <p className="text-xs">File claims from ANY phone — no internet, no app, no smartphone needed</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-blue-50 p-2 rounded-lg">
                <h4 className="text-xs mb-1">🤖 AI Verification</h4>
                <p className="text-[10px] text-gray-700">OCR, image forensics, deepfake detection</p>
              </div>
              <div className="bg-gradient-to-r from-[#00A878] to-[#0052CC] text-white p-2 rounded-lg">
                <h3 className="text-xs mb-1">⚡ Advance Pay</h3>
                <p className="text-[10px]">70% instant pay</p>
              </div>
              <div className="bg-purple-50 p-2 rounded-lg">
                <h4 className="text-xs mb-1">🌍 Localization</h4>
                <p className="text-[10px] text-gray-700">Pan-African languages</p>
              </div>
              <div className="bg-yellow-50 p-2 rounded-lg">
                <h4 className="text-xs mb-1">🎯 Fraud Prevention</h4>
                <p className="text-[10px] text-gray-700">99% fraud detection</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 4: Market Size
    {
      id: 'market',
      content: (
        <div className="flex flex-col justify-center h-full px-4">
          <h2 className="text-lg text-gray-900 mb-2">Market Opportunity</h2>
          <div className="space-y-2">
            {/* Main Market Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 rounded-lg">
                <h3 className="text-base mb-0.5">$92.9B</h3>
                <p className="text-[10px]">Africa Insurance Market (2024)</p>
              </div>
              <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-2 rounded-lg">
                <h3 className="text-base mb-0.5">$4.87B</h3>
                <p className="text-[10px]">Nigeria Insurance Market (2024)</p>
              </div>
            </div>

            {/* Penetration Gap - The Opportunity */}
            <div className="bg-red-50 border-l-4 border-red-500 p-2 rounded">
              <h4 className="text-[10px] mb-1 text-red-900">The Massive Penetration Gap</h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-sm text-red-600">0.34%</p>
                  <p className="text-[8px] text-gray-700">Nigeria</p>
                </div>
                <div>
                  <p className="text-sm text-orange-600">3.5%</p>
                  <p className="text-[8px] text-gray-700">Africa Avg</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">6.5%</p>
                  <p className="text-[8px] text-gray-700">Global Avg</p>
                </div>
              </div>
              <p className="text-[9px] text-gray-700 mt-1">
                Nigeria is <strong>10x</strong> below Africa, <strong>15-20x</strong> below global average
              </p>
            </div>

            {/* Target Population */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-green-50 p-2 rounded-lg text-center">
                <h4 className="text-sm text-[#00A878]">106M</h4>
                <p className="text-[9px] text-gray-700">Rural Nigerians</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg text-center">
                <h4 className="text-sm text-[#0052CC]">200M+</h4>
                <p className="text-[9px] text-gray-700">Total Nigerian</p>
              </div>
              <div className="bg-purple-50 p-2 rounded-lg text-center">
                <h4 className="text-sm text-purple-600">1.4B</h4>
                <p className="text-[9px] text-gray-700">Africa Total</p>
              </div>
            </div>

            {/* The Solution Statement */}
            <div className="bg-gradient-to-r from-[#00A878] to-[#0052CC] text-white p-2 rounded-lg">
              <p className="text-[10px] leading-tight">
                <strong>Our Solution:</strong> Uses AI-USSD to close this gap by reaching the <strong>99%</strong> of the population currently excluded from financial rights and rebuild trust in insurance financial protection.
              </p>
            </div>

            {/* Market Sizing */}
            <div className="space-y-0.5 text-[9px] text-gray-700">
              <p>• <strong>TAM:</strong> $92.9B African insurance market</p>
              <p>• <strong>SAM:</strong> $14.6B (30% addressable Nigeria + tier-1 markets)</p>
              <p>• <strong>SOM:</strong> $730M (5% Year 3 target)</p>
            </div>
          </div>
        </div>
      )
    },

    // Slide 5: Product
    {
      id: 'product',
      content: (
        <div className="flex flex-col justify-center h-full px-4">
          <h2 className="text-xl text-gray-900 mb-3">Product Overview</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <div className="bg-white border border-gray-200 p-2 rounded-lg">
                <h3 className="text-xs mb-1 text-[#0052CC]">📱 Mobile App</h3>
                <ul className="space-y-1 text-[10px] text-gray-700">
                  <li>• Photo/video OCR</li>
                  <li>• Real-time tracking</li>
                  <li>• Multi-language</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 p-2 rounded-lg">
                <h3 className="text-xs mb-1 text-[#00A878]">📞 USSD (*669#)</h3>
                <ul className="space-y-1 text-[10px] text-gray-700">
                  <li>• Any phone</li>
                  <li>• No internet</li>
                  <li>• ₦0 data cost</li>
                </ul>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-white border border-gray-200 p-2 rounded-lg">
                <h3 className="text-xs mb-1 text-purple-600">🖥️ Admin</h3>
                <ul className="space-y-1 text-[10px] text-gray-700">
                  <li>• AI fraud scoring</li>
                  <li>• NAICOM escalation</li>
                  <li>• Analytics</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-[#00A878] to-[#0052CC] text-white p-2 rounded-lg">
                <h3 className="text-xs mb-1">⚡ Advance Pay</h3>
                <p className="text-[10px]">70% in &lt; 2 hours</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 6: Traction
    {
      id: 'traction',
      content: (
        <div className="flex flex-col justify-center h-full px-4">
          <h2 className="text-xl text-gray-900 mb-3">Traction & Validation</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-green-50 border border-green-300 p-2 rounded-lg text-center">
                <h3 className="text-lg text-green-600">1000</h3>
                <p className="text-[10px] text-gray-700">Early Signups</p>
              </div>
              <div className="bg-blue-50 border border-blue-300 p-2 rounded-lg text-center">
                <h3 className="text-lg text-blue-600">0%</h3>
                <p className="text-[10px] text-gray-700">Mobile Users</p>
              </div>
              <div className="bg-purple-50 border border-purple-300 p-2 rounded-lg text-center">
                <h3 className="text-lg text-purple-600">4.2hrs</h3>
                <p className="text-[10px] text-gray-700">Avg Processing</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-3 rounded-lg">
              <h3 className="text-sm mb-2 text-gray-900">Key Milestones</h3>
              <div className="space-y-1 text-[10px] text-gray-700">
                <p>✅ USSD shortcode processing</p>
                <p>✅ 99.2% fraud detection</p>
                <p>✅ NAICOM compliance</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 7: Business Model
    {
      id: 'business-model',
      content: (
        <div className="flex flex-col justify-center h-full px-4">
          <h2 className="text-sm text-gray-900 mb-1.5">Business Model</h2>
          <div className="space-y-1.5">
            {/* Annual MRR Projection */}
            <div className="bg-gradient-to-r from-[#00A878] to-[#0052CC] text-white p-1.5 rounded-lg">
              <h3 className="text-[9px] mb-0.5">Annual MRR Projection</h3>
              <p className="text-base">$3.1B (₦4.65T)</p>
            </div>

            {/* Revenue Breakdown */}
            <div className="bg-white border border-gray-200 p-1.5 rounded-lg">
              <h4 className="text-[9px] mb-0.5 text-gray-900">Revenue Streams</h4>
              <div className="space-y-0.5 text-[8px] text-gray-700">
                <div className="flex justify-between">
                  <span className="font-semibold">• Subscription ($0.05 × 365d × 106M)</span>
                  <span className="text-[#00A878] font-semibold">$1.9B (₦2.85T)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">• Claims Fee (7% × $66.7 avg × 106M)</span>
                  <span className="text-[#0052CC] font-semibold">$742M (₦1.11T)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">• API Fees (71 insurers × $10K)</span>
                  <span className="text-purple-600 font-semibold">$710K (₦1.07B)</span>
                </div>
              </div>
            </div>

            {/* 2026 First Year MRR */}
            <div className="bg-blue-50 border border-blue-300 p-1.5 rounded-lg">
              <h4 className="text-[9px] mb-0.5 text-gray-900">2026 First Year MRR</h4>
              <div className="space-y-0.5 text-[8px] text-gray-700">
                <div className="flex justify-between">
                  <span className="font-semibold">• Subscription ($0.05 × 275d × 106M)</span>
                  <span className="text-[#00A878] font-semibold">$1.45B (₦2.18T)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">• Claims Fee (7% × $66.7 avg × 106M)</span>
                  <span className="text-[#0052CC] font-semibold">$742M (₦1.11T)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">• API Fees (71 insurers × $10K)</span>
                  <span className="text-purple-600 font-semibold">$710K (₦1.07B)</span>
                </div>
                <div className="flex justify-between border-t border-blue-300 pt-0.5 mt-0.5">
                  <span className="font-bold">Total 2026:</span>
                  <span className="text-blue-600 font-bold">$2.19B (₦3.29T)</span>
                </div>
              </div>
            </div>

            {/* Economics */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="bg-green-50 border border-green-300 p-1 rounded">
                <h4 className="text-[8px] mb-0.5 text-gray-900 font-semibold">Unit Economics</h4>
                <div className="space-y-0.5 text-[7px] text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-semibold">CAC:</span>
                    <span className="font-semibold">₦850</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">LTV:</span>
                    <span className="font-semibold">₦12,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">LTV:CAC:</span>
                    <span className="text-green-600 font-bold">14.6x</span>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-300 p-1 rounded">
                <h4 className="text-[8px] mb-0.5 text-gray-900 font-semibold">Margins</h4>
                <div className="space-y-0.5 text-[7px] text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-semibold">Gross:</span>
                    <span className="text-purple-600 font-bold">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Transaction:</span>
                    <span className="font-semibold">2.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Advance Fee:</span>
                    <span className="font-semibold">3%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 8: Competition
    {
      id: 'competition',
      content: (
        <div className="flex flex-col justify-center h-full px-4">
          <h2 className="text-xl text-gray-900 mb-3">Competitive Advantage</h2>
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#00A878] to-[#0052CC] text-white p-3 rounded-lg">
              <h3 className="text-sm mb-1">🏆 Our USSD Moat</h3>
              <p className="text-xs">ONLY platform for 106M non-smartphone users</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-[10px]">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-1 text-left">Feature</th>
                    <th className="p-1 text-center text-[#00A878]">Us</th>
                    <th className="p-1 text-center text-gray-500">Traditional</th>
                    <th className="p-1 text-center text-gray-500">Insurtechs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-1">USSD</td>
                    <td className="p-1 text-center">✅</td>
                    <td className="p-1 text-center">❌</td>
                    <td className="p-1 text-center">❌</td>
                  </tr>
                  <tr>
                    <td className="p-1">AI Fraud</td>
                    <td className="p-1 text-center">✅</td>
                    <td className="p-1 text-center">❌</td>
                    <td className="p-1 text-center">⚠️</td>
                  </tr>
                  <tr>
                    <td className="p-1">Advance Pay</td>
                    <td className="p-1 text-center">✅</td>
                    <td className="p-1 text-center">❌</td>
                    <td className="p-1 text-center">❌</td>
                  </tr>
                  <tr>
                    <td className="p-1">Languages</td>
                    <td className="p-1 text-center">✅</td>
                    <td className="p-1 text-center">❌</td>
                    <td className="p-1 text-center">⚠️</td>
                  </tr>
                  <tr>
                    <td className="p-1">Processing</td>
                    <td className="p-1 text-center text-green-600">4.2hrs</td>
                    <td className="p-1 text-center text-red-600">120d</td>
                    <td className="p-1 text-center text-yellow-600">7-14d</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    },

    // Slide 9: Go-to-Market
    {
      id: 'gtm',
      content: (
        <div className="flex flex-col justify-center h-full px-4">
          <h2 className="text-xl text-gray-900 mb-3">Go-to-Market Strategy</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-green-50 p-2 rounded-lg">
                <h3 className="text-xs mb-1 text-[#00A878]">Phase 1</h3>
                <p className="text-[10px] text-gray-700">Nigeria</p>
                <p className="text-[9px] text-gray-600">1M in 6mo</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg">
                <h3 className="text-xs mb-1 text-[#0052CC]">Phase 2</h3>
                <p className="text-[10px] text-gray-700">West Africa</p>
                <p className="text-[9px] text-gray-600">3M in 18mo</p>
              </div>
              <div className="bg-purple-50 p-2 rounded-lg">
                <h3 className="text-xs mb-1 text-purple-600">Phase 3</h3>
                <p className="text-[10px] text-gray-700">Pan-Africa</p>
                <p className="text-[9px] text-gray-600">7M in 36mo</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-2 rounded-lg">
              <h3 className="text-sm mb-2 text-gray-900">Distribution</h3>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-700">
                <p>🏪 5K+ agents</p>
                <p>📻 Radio campaigns</p>
                <p>🤝 Insurer partners</p>
                <p>📱 Social media campaigns</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 10: The Ask
    {
      id: 'ask',
      content: (
        <div className="flex flex-col justify-center h-full px-4">
          <h2 className="text-xl text-gray-900 mb-3">The Ask</h2>
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#00A878] to-[#0052CC] text-white p-4 rounded-lg">
              <h3 className="text-lg mb-1">Raising $500K Seed</h3>
              <p className="text-xs opacity-90">Safe note, $5M cap</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white border border-gray-200 p-2 rounded-lg">
                <h3 className="text-xs mb-2 text-gray-900">Use of Funds</h3>
                <div className="space-y-1 text-[10px] text-gray-700">
                  <div className="flex justify-between">
                    <span>Engineering</span>
                    <span>40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Go-to-Market</span>
                    <span>30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Operations</span>
                    <span>20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Runway</span>
                    <span>10%</span>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 p-2 rounded-lg">
                <h3 className="text-xs mb-2 text-gray-900">Expected Milestones in 18 Months</h3>
                <div className="space-y-1 text-[10px] text-gray-700">
                  <p>✓ 500K users</p>
                  <p>✓ $10M processed</p>
                  <p>✓ 50 partnerships</p>
                  <p>✓ Break-even</p>
                  <p>✓ Series A ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 11: Vision
    {
      id: 'vision',
      content: (
        <div className="flex flex-col items-center justify-center h-full px-4 text-center">
          <div className="space-y-4">
            <h2 className="text-2xl text-gray-900">Our Vision</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              A continent where every driver, farmer, and family gets insurance payout in hours, not months, turning{' '}
              <span className="text-[#00A878]">billions unclaimed</span> into{' '}
              <span className="text-[#0052CC]">billions reclaimed</span>.
            </p>
            <div className="bg-gradient-to-r from-[#00A878] to-[#0052CC] text-white p-4 rounded-lg">
              <p className="text-lg mb-2">1.4B+ Africans (106M Nigerians)</p>
              <p className="text-sm opacity-90">One simple code: *669#</p>
            </div>
            <div className="text-xs text-gray-600 space-y-2">
              <p>Let's turn insurance into a force for good.</p>
              <p>Let's build ClaimAm together.</p>
            </div>
          </div>
        </div>
      )
    },

    // Slide 12: Contact
    {
      id: 'contact',
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-3">
          <ClaimAmLogo size={80} withBackground={false} />
          <h1 className="text-3xl text-gray-900">Thank You</h1>
          <div className="text-center space-y-2">
            <p className="text-base text-gray-900">ClaimAm</p>
            <p className="text-xs text-gray-500">AI-USSD for Africa's rural and urban insurance claims.</p>
            <div className="pt-4 space-y-1 text-xs text-gray-700">
              <p>contact@claimam.com</p>
              <p>www.claimam.com</p>
              <p>Dial *669# to file a claim</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'Escape' && onClose) onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-[#00A878] via-[#0052CC] to-[#003d99] z-50 flex flex-col"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00A878] to-[#0052CC] rounded-lg"></div>
          <span className="text-xl text-gray-900">ClaimAm Pitch Deck</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            {currentSlide + 1} / {slides.length}
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 overflow-hidden flex items-center justify-center p-8">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[400px] p-6 overflow-y-auto">
          {slides[currentSlide].content}
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
              currentSlide === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#0052CC] text-white hover:bg-blue-700'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          {/* Slide indicators */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-[#0052CC] w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
              currentSlide === slides.length - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#00A878] text-white hover:bg-green-700'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Keyboard hints */}
      <div className="absolute bottom-24 left-8 text-sm text-gray-500">
        <p>Use arrow keys ← → to navigate</p>
      </div>
    </div>
  );
}