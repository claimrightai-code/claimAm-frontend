// "use client";

// import { useState, useEffect } from "react";
// import { useUserContext } from "@/hooks/hooks";
// import {
//   Lock,
//   CreditCard,
//   Loader2,
//   ArrowRight,
//   ShieldCheck,
//   Wallet,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// // import { verifyPaymentFunc } from "@/lib/api";

// export default function CompletePaymentPage() {
//   const { user, verifyPaymentFunc } = useUserContext();
//   const [loading, setLoading] = useState(false);
//   const [initializePaystack, setInitializePaystack] = useState<any | null>(
//     null,
//   );
//   const router = useRouter();
//   // Paystack Config
//   const config = {
//     reference: new Date().getTime().toString(),
//     email: user?.email || "",
//     amount: 1500 * 100, // ₦1,500
//     publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "",
//   };

//   useEffect(() => {
//     let mounted = true;
//     // Import react-paystack only on the client to avoid server eval of `window`
//     import("react-paystack").then((mod) => {
//       if (mounted && mod?.usePaystackPayment) {
//         setInitializePaystack(() => mod.usePaystackPayment(config));
//       }
//     });
//     return () => {
//       mounted = false;
//     };
//   }, [config]);
//   const handlePayClick = () => {
//     setLoading(true);
//     initializePaystack({
//       onSuccess: async (tx: any) => {
//         // 1. Verify with backend
//         const res = await verifyPaymentFunc(tx.reference, user?.id);
//         if (res.ok) {
//           // 2. Redirect to dashboard
//           // This will trigger the logic in App.tsx
//           router.push("/agent");
//         }
//       },
//       onClose: () => {
//         setLoading(false);
//         alert("Payment cancelled.");
//       },
//     });
//   };

//   if (!user) {
//     router.push("/agent");
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full">
//         {/* Main Card */}
//         <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
//           {/* Decorative Top Bar */}

//           {/* Status Icon */}
//           <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
//             <Lock className="text-orange-500 w-8 h-8" />
//           </div>

//           <div className="text-center mb-8">
//             <h2 className="text-2xl font-bold text-slate-900 mb-2">
//               Activate Dashboard
//             </h2>
//             <p className="text-slate-500 text-sm leading-relaxed">
//               Hello{" "}
//               <span className="font-bold text-slate-800">
//                 {user?.full_name}
//               </span>
//               , your profile is ready! Pay your one-time slot fee to start
//               earning commissions.
//             </p>
//           </div>

//           {/* Fee Details Box */}
//           <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
//             <div className="flex justify-between items-center mb-4">
//               <div className="flex items-center gap-2">
//                 <Wallet size={16} className="text-slate-400" />
//                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
//                   Agent Slot Fee
//                 </span>
//               </div>
//               <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
//                 PENDING
//               </span>
//             </div>

//             <div className="flex items-baseline gap-1 mb-1">
//               <span className="text-3xl font-bold text-slate-900">₦1,500</span>
//               <span className="text-slate-400 text-sm">.00</span>
//             </div>
//             <p className="text-[10px] text-slate-400 font-medium italic">
//               *Standard fee is ₦20,000 (You saved ₦18,500)
//             </p>
//           </div>

//           {/* Features Checklist */}
//           <div className="space-y-3 mb-8">
//             <div className="flex items-center gap-3 text-sm text-slate-600">
//               <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
//                 <ShieldCheck size={14} className="text-[#00BA00]" />
//               </div>
//               Instant Referral Bonuses (₦600/agent)
//             </div>
//             <div className="flex items-center gap-3 text-sm text-slate-600">
//               <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
//                 <ShieldCheck size={14} className="text-[#00BA00]" />
//               </div>
//               Real-time Commissions Dashboard
//             </div>
//           </div>

//           {/* Action Button */}
//           <button
//             onClick={handlePayClick}
//             disabled={loading}
//             className="w-full bg-[#00BA00] hover:bg-[#00C853] text-white font-bold py-4 rounded-2xl shadow-xl shadow-green-500/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
//           >
//             {loading ? (
//               <Loader2 className="animate-spin w-6 h-6" />
//             ) : (
//               <>
//                 <CreditCard size={20} />
//                 Pay & Activate
//                 <ArrowRight size={18} className="ml-1" />
//               </>
//             )}
//           </button>

//           {/* Footer Info */}
//           <p className="text-center text-[10px] text-slate-400 mt-6 leading-relaxed uppercase tracking-tighter font-bold">
//             Secured by Paystack • Instant Activation
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
