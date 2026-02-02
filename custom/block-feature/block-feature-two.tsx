import React from "react";
import Image from "next/image";
import Icon1 from "@/assets/images/icon/icon_10.svg";
import Icon2 from "@/assets/images/icon/icon_11.svg";

const BlockFeatureTwo = () => {
  return (
    <div className='block-feature-two mt-80'>
      <div className='container'>
        <div className='wrapper'>
          <div className='row align-items-center'>
            <div className='col-md-4'>
              <div className='card-style-three pt-45 md-pt-30 pb-35 sm-pb-30'>
                <p className='lazy-img icon'>
                  <Icon1 />
                </p>
                <h4 className='fw-bold mt-40 sm-mt-20 mb-20'>Our Mission</h4>
                <p>
                At PayQwicker, our mission is to revolutionize the way you handle your finances. We believe that managing your money and payment of bills should be simple, secure, and seamless. Our goal is to empower individuals and businesses by providing innovative solutions that make financial transactions faster, easier, and more convenient.
                </p>
              </div>
            </div>
            <div className='col-md-5'>
              <div className='border-line h-100 ps-lg-5 pe-lg-5 ps-md-3 pe-md-3'>
                <div className='card-style-three pt-45 md-pt-30 pb-35 sm-pb-30'>
                  <p className='lazy-img icon'>
                    <Icon2 />
                  </p>
                  <h4 className='fw-bold mt-40 sm-mt-20 mb-20'>
                    Our company vision.
                  </h4>
                  <p>
                  At PayQwicker, we believe in a future where financial freedom is within reach for everyone. Our vision is to pioneer a future where financial transactions are seamless, secure, and accessible to all. We envision a world where individuals and businesses can effortlessly manage their finances, make payments, pay bills, and transfer funds locally and internationally with ease.
                  </p>
                </div>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='ps-lg-5 sm-pb-30 sm-pt-30'>
                <div className='numb fw-500'>
                  <span className='counter'>13</span>+
                </div>
                <p className='m0'>
                Years with proud <br /> experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockFeatureTwo;
