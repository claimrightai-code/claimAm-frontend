"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CountryDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const router = useRouter();

    const handleSelect = (country: string) => {
        setSelectedCountry(country);
        setIsOpen(false);
        router.push(`/login?country=${encodeURIComponent(country)}`);
    };

    return (
        <div className="relative inline-block text-left">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="signup-btn-one icon-link w-100 mt-20 flex items-center justify-center"
            >
                <span className="flex-fill text-center">
                    {selectedCountry ? `Selected: ${selectedCountry}` : 'Get Started'}
                </span>
                {/* <div className="icon rounded-circle d-flex align-items-center justify-content-center ml-2">
                    <i className="bi bi-arrow-right"></i>
                </div> */}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                    <ul>
                        <li>
                            <button 
                                onClick={() => handleSelect('Nigeria')} 
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                            >
                                Nigeria
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleSelect('South Africa')} 
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                            >
                                South Africa
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CountryDropdown;
