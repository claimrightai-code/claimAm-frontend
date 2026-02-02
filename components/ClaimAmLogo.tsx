import React from 'react';
import Image from 'next/image';
import logo from '@/assets/images/assets/claimlogo.png';
interface ClaimAmLogoProps {
  size?: number;
  className?: string;
  withBackground?: boolean;
}

export function ClaimAmLogo({ size = 140, className = "", withBackground = true }: ClaimAmLogoProps) {
  if (withBackground) {
    return (
      <div className={`inline-flex items-center justify-center rounded-xl p-4 bg-white ${className}`}>
        <Image
          src={logo} 
          alt="ClaimAm Logo" 
          style={{ width: size, height: 'auto' }}
          className="object-contain"
        />
      </div>
    );
  }
  
  return (
    <Image
      src={logo} 
      alt="ClaimAm Logo" 
      style={{ width: size, height: 'auto' }}
      className={`object-contain ${className}`}
    />
  );
}
