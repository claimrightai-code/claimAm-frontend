import React from "react";
import { Shield, Users, CheckCircle2 } from "lucide-react";

export function TrustSection() {
  return (
    <section className="py-8 px-4 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Card 1: Community Proof (Green) */}
          <div className="flex items-center p-4 md:p-5 rounded-2xl border border-slate-100 bg-slate-50/50 shadow-sm">
            {/* Icon Box */}
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-xl mr-4">
              <Users className="w-6 h-6 text-[#00C853]" />
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <p className="text-xs font-bold text-[#00C853] uppercase tracking-wider mb-0.5">
                Community
              </p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-slate-900">
                  100+
                </span>
                <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Joined
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">
                Founding Agents registered
              </p>
            </div>
          </div>

          {/* Card 2: Legal Proof (Blue) */}
          <div className="flex items-center p-4 md:p-5 rounded-2xl border border-slate-100 bg-slate-50/50 shadow-sm">
            {/* Icon Box */}
            <div className="flex-shrink-0 bg-blue-50 p-3 rounded-xl mr-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-0.5">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Officially Registered
                </p>
                <CheckCircle2
                  size={12}
                  className="text-blue-600 fill-blue-100"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-slate-900">
                  RC 9239781
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">
                Corporate Affairs Commission
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
