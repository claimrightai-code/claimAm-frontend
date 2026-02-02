"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "./ui/button";
import { PiAirTrafficControlDuotone } from "react-icons/pi";
import { BsFillClipboardDataFill } from "react-icons/bs";
import Image from "next/image";

export default function Service() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const router = useRouter();

    const handleSelect = (country: string) => {
        setSelectedCountry(country);
        setIsOpen(false);

        // Store the selected country in localStorage
        localStorage.setItem('selectedCountry', country);

        router.push(`/login?country=${encodeURIComponent(country)}`);
    };
  return (
    <div className='min-h-[700px] relative lg:rounded-[50px] w-full mt-48 bg-[url(/service.svg)] object-cover bg-no-repeat'>
      <Image
   unoptimized
        src={"/service.svg"}
        height={500}
        width={1200}
        alt='img'
        className='h-full w-full rounded-3xl lg:rounded-[40px]'
      />
      <div className='absolute lg:rounded-[70px] max-lg:px-7 top-0 right-0 left-0 bottom-0 bg-transparent p-4 lg:p-20 grid lg:grid-cols-2'>
        <div className='h-full w-full flex flex-col items-start justify-center'>
          <h2
            className='text-2xl lg:text-4xl font-semibold my-7'
            style={{
              lineHeight: 1.5,
            }}
          >
            Purchase Airtime, Data & Electricity All-In-One Convenient Platform
          </h2>
          <p className='my-4 max-w-sm text-start'>
            We offer the best deal for utilities click below to explore more
          </p>
          {/* <Button
            variant='outline'
            color='black'
            className='rounded-full px-20 text-lg py-7 bg-black text-[#1BB400] hover:text-black hover:bg-transparent'
          >
            Get started
          </Button> */}
           <div className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full px-20 py-7 text-lg bg-black text-[#1BB400] hover:text-black hover:bg-transparent border border-black flex items-center justify-center"
            >
                <span className="flex-fill text-center">
                    {selectedCountry ? `Selected: ${selectedCountry}` : 'Get Started'}
                </span>
                <div className="icon rounded-circle d-flex align-items-center justify-content-center ml-2">
                    <i className="bi bi-arrow-right"></i>
                </div>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                    <div className="flex flex-col">
                        <button
                            onClick={() => handleSelect('Nigeria')}
                            className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                        >
                          <div>Nigeria</div> 
                          <Image unoptimized src={'/Flag_of_Nigeria.png'} alt="nigeria" height={20} width={20} />  
                        </button>
                        <button
                            onClick={() => handleSelect('South Africa')}
                            className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                        >
                           <div> South Africa</div> 
                           <Image unoptimized src={'/flag_of_south_africa.webp'} alt="nigeria" height={20} width={20} />
                        
                        </button>
                    </div>
                </div>
            )}
        </div>
        </div>
        <div className='grid grid-cols-2 lg:p-14 grid-rows-2 gap-4'>
          <div className='service-card'>
            <BsFillClipboardDataFill className='h-14 w-14 text-black' />
            <b className='mt-2 text-xs font-medium'>
              Lowest internet data rates
            </b>
          </div>
          <div className='service-card'>
            <PiAirTrafficControlDuotone className='h-14 w-14 text-black' />
            <b className='mt-2 text-xs font-medium'>Online airtime deals</b>
          </div>
          <div className='service-card'>
            <BsFillClipboardDataFill className='h-14 w-14 text-black' />
            <b className='mt-2 text-xs font-medium'>
              Trading at your fingertips
            </b>
          </div>
          <div className='service-card'>
            <PiAirTrafficControlDuotone className='h-14 w-14 text-black' />
            <b className='mt-2 text-xs font-medium'>
              Budget friendly electricity
            </b>
          </div>
        </div>
      </div>
    </div>
  );
}
