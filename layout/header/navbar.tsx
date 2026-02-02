"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
// internal
import Logo from "@/assets/images/logo/logo5.png";
import Logo2 from "@/assets/images/logo/paylogo.svg";
import Icon1 from "@/assets/images/icon/icon_14.svg";
import Icon2 from "@/assets/images/icon/icon_15.svg";
import menu_data from "@/data/menu-data";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthState";
const Navbar = ({ logo_white = false }: { logo_white?: boolean }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const {authStateL, setAuthState } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const router = useRouter();

  const handleSelect = (country: string) => {
        setSelectedCountry(country);
        setIsOpen(false);

        localStorage.setItem('selectedCountry', country);

        router.push(`/login?country=${encodeURIComponent(country)}`);
    };
    const handleLoginClick = () => {
      // setAuthState(1); // Update authState globally
        
    // console.log(authStateL)
     if (authStateL === 0) {

      setAuthState(1) 
      router.push("/login");
   
     } else if (authStateL === 1){
      setAuthState(0)
      console.log(authStateL)

      return
     }
    
    };
  return (
    <ul className='navbar-nav align-items-lg-center '>
      <li className='d-block d-lg-none'>
        <div className='logo'>
        <Image
                  src="/assets/images/logo/logo5.png"
                  width={160}
                  height={42}
                  alt="Picture of the author"
                />
        </div>
      </li>
      {menu_data.map((menu) => (
        <li
          key={menu.id}
          className={`nav-item ${menu.dropdown ? "dropdown" : ""} ${
            menu.mega_menu ? "dropdown mega-dropdown-sm" : ""
          }`}
        >
          {menu.dropdown && (
            <>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                role='button'
                data-bs-toggle='dropdown'
                data-bs-auto-close='outside'
                aria-expanded='false'
              >
                {menu.title}
              </a>
              <ul className='dropdown-menu'>
                {menu.dropdown_menus?.map((dm, i) => (
                  <li key={i}>
                    <Link
                      href={dm.link}
                      className={`dropdown-item ${
                        pathname === dm.link ? "active" : ""
                      }`}
                    >
                      <span>{dm.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          {menu.mega_menu && (
            <>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                role='button'
                data-bs-toggle='dropdown'
                data-bs-auto-close='outside'
                aria-expanded='false'
              >
                {menu.title}
              </a>
              <ul className='dropdown-menu'>
                <li className='row gx-1'>
                  {menu.mega_menus?.map((mm, i) => (
                    <div key={mm.id} className='col-lg-4'>
                      <div className='menu-column'>
                        <ul className='style-none mega-dropdown-list'>
                          {mm.menus.map((sm, i) => (
                            <li key={i}>
                              <Link
                                href={sm.link}
                                className={`dropdown-item ${
                                  pathname === sm.link ? "active" : ""
                                }`}
                              >
                                <span>{sm.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </li>
              </ul>
            </>
          )}
          {!menu.dropdown && !menu.mega_menu && (
            <Link className='nav-link' href={menu.link} role='button'>
              {menu.title}
            </Link>
          )}
        </li>
      ))}
      <li className='d-md-none ps-2 pe-2'>


        {/* <a
          href='/login'
          className='signup-btn-one icon-link w-100 mt-20'
        >
          <span className='flex-fill text-center'>Get Started</span>
          <div className='icon rounded-circle d-flex align-items-center justify-content-center'>
            <i className='bi bi-arrow-right'></i>
          </div>
        </a> */}

         <div className="relative inline-block text-left">
         <button 
    onClick={handleLoginClick} 
    className="btn-login"
  >
    Login
  </button>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="signup-btn-one icon-link w-100 mt-20 flex items-center justify-center"
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
     
      </li>
    </ul>
  );
};

export default Navbar;
