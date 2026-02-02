import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Heart, ShieldCheck } from 'lucide-react';
import { ClaimAmLogo } from "@/../../components/ClaimAmLogo";
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-slate-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <ClaimAmLogo size={60} withBackground={false} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                ClaimAm
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Nigeria's fastest insurance claims platform. Motor, farm, and
              hospital claims paid in minutes.
            </p>
            <div className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded w-fit">
              <ShieldCheck size={12} />
              <span>RC 9239781</span>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-[#00C853] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00C853] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00C853] transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00C853] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-[#00C853] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00C853] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00C853] transition-colors">
                  Agent Agreement
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00C853] transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Socials Column */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-800 hover:border-blue-800 transition-all"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-pink-600 hover:border-pink-600 transition-all"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-700 hover:border-blue-700 transition-all"
              >
                <Facebook size={16} />
              </a>
            </div>
            <div>
              <p className="text-green-400 font-semibold mb-6">
              📞 Dial *669# from any phone, anywhere in Nigeria
            </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {currentYear} ClaimAm Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}