"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import Navbar from "./navbar";
// import Logo from "@/assets/images/logo/logopq.png";
import useSticky from "@/hooks/use-sticky";
// import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthState";
// import { ArrowRight } from "react-icons/ai";
import { FaLongArrowAltRight as ArrowRight } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
  onLoginClick?: () => void;
  currentAuthState?: number
}

const HeaderTwo: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const { sticky } = useSticky();
    const [isOpen, setIsOpen] = useState(false);
    const {authStateL, setAuthState } = useAuth();
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const router = useRouter();
  
    const navigate =  () => {
      router.push("/agent")
      return;
    }
  
   
    const handleLoginClick = () => {
      // setAuthState(1); // Update authState globally
        
    // console.log(authStateL)
     if (authStateL === 0 || 1) {
      setAuthState(1) 
      router.push("/login");
      return;
     }
    };  
    const handleSelect = (country: string) => {
      if (authStateL === 0  || authStateL === 1) {
        setAuthState(0)
        setSelectedCountry(country);
        setIsOpen(false);
        localStorage.setItem('selectedCountry', country);
        router.push(`/login?country=${encodeURIComponent(country)}`);
        return
      }
       
    };
  return (
    <>
      <header
        className={`theme-main-menu menu-overlay menu-style-one white-vr sticky-menu ${
          sticky ? "fixed" : ""
        }`}
      >
       <div>
         <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
         
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute w-8 h-4 border-t-4 border-blue-800 rounded-t-full top-1"></div>
            <div className="absolute w-6 h-3 border-t-4 border-green-500 rounded-t-full top-3"></div>
          </div>
          <span className="text-2xl font-bold text-slate-800 tracking-tight">
            ClaimAm
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-green-600 transition-colors">About</a>
          <a href="#" className="hover:text-green-600 transition-colors">Features</a>
          <a href="#" className="hover:text-green-600 transition-colors">Services</a>
          <a href="#" className="hover:text-green-600 transition-colors">How It Works</a>
          <a href="#" className="hover:text-green-600 transition-colors">Request Demo</a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-[#00C853] hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors" onClick={navigate}>
            Agent Registration
            <ArrowRight size={16} />
          </button>
          
          {/* <button className="hidden lg:flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-slate-600 text-xs font-medium px-4 py-2.5 rounded-lg transition-colors">
            <ChevronLeft size={14} />
            Back to Dashboards
          </button> */}
        </div>
      </nav>

      {/* Main Hero Section */}
      
        {/* <div>
              <nav className='navbar navbar-expand-lg p0 order-lg-2'>
                <button
                  className='navbar-toggler d-block d-lg-none'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#navbarNav'
                  aria-controls='navbarNav'
                  aria-expanded='false'
                  aria-label='Toggle navigation'
                >
                  <span></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                  
                  <Navbar logo_white={true} />
                 
                </div>
              </nav>
            </div>
          
        </div> */}
        </div>
        </div>
      </header>

      {/* login modal start */}
      {/* login modal end */}
    </>
  );
};

export default HeaderTwo;
