"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";
// internal
// import bg_1 from "@/assets/images/media/img_01.jpg";
// import bg_2 from "@/assets/images/media/img_02.jpg";
// import bg_3 from "@/assets/images/media/img_03.jpg";
// import Icon from "@/assets/images/icon/icon_02.svg";
// import bg_shape from "@/assets/images/logo/";


import businessman from "@/assets/images/assets/businessman_01.png";


const imgStyle = {
  height: "auto",
  width: "auto"
};

// slider bg
// const slider_bg = [bg_1, bg_2, bg_3];
// // slider setting
// const slider_setting = {
//   dots: false,
//   arrows: false,
//   centerPadding: "0px",
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
//   fade: true,
//   autoplaySpeed: 7000,
// };

const HeroBannerTwo = () => {
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


    <div className="hero-banner-five">
    <div className="bg-wrapper position-relative pt-85 sm-pt-50 pb-120 xl-pb-100 sm-pb-10">
      


    <div className='container position-relative'>
        <div className='row justify-content-between'>
        <div className="col-lg-6 col-md-8 wow fadeInLeft">
     
            <h1 className='hero-heading rounded-2xl d-inline-block position-relative wow fadeInUp font-extrabold'>
            <br />
              Quick solution {/* </span> */}
              <br />
              to streamline <br />
              bill payments.
            </h1>
            <p
              className='text-xl text-black pt-35 pb-25 wow fadeInUp '
              data-wow-delay='0.1s'
            >
              Welcome to PayQwicker, where managing your bills and finances are done effortlessly.
            </p>

            {/* <Link
              href='/login'
              className='btn-two icon-link wow ddd fadeInUp text-white '
              data-wow-delay='0.2s'
            >
              <span>Get Started</span>
              <Icon className='lazy-img icon ms-2' />
            </Link> */}

             <div className="relative inline-block text-left">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="btn-two icon-link wow ddd fadeInUp text-white"
                data-wow-delay="0.2s"
            >
                <span>{selectedCountry ? `Country: ${selectedCountry}` : 'Get Started'}</span>
                <div className="icon ms-2 d-inline-flex align-items-center">
                    <i className="bi bi-arrow-right lazy-img"></i>
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
        </div>
      </div>


      <div className="media-wrapper ps-5 pe-5 d-flex align-items-end">
        <Image
          src={'../../public/assets/images/assets/businessman.png'}
          alt="image"
          className="lazy-img me-auto ms-auto"
          style={imgStyle}
        />
    
      </div>
    </div>
  </div>



    
    
  );
};

export default HeroBannerTwo;
