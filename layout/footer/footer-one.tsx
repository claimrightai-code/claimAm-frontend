import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import Logo from "@/assets/images/logo/logo5.svg";
import FooterSocial from "./footer-social";

const FooterOne = () => {
  return (
    <div className='footer-one'>
      <div className='container'>
        <div className='inner-wrapper'>
          <div className='row justify-content-between'>
            <div className='col-xl-4 col-md-3 footer-intro mb-30'>
              <div className='logo mb-15'>
                <Link href='/' className='d-inline-block d-lg-none'>
                <Image
                  src="/assets/images/logo/logo5.png"
                  width={260}
                  height={42}
                  alt="Picture of the author"
                />
                </Link>
              </div>
              <p className='text-white lh-sm mb-35'>
                
                <span className='opacity-50'>
                 Follow us on social media
                </span>
              </p>
              {/* social link */}
              <ul className='style-none d-flex align-items-center social-icon'>
                <FooterSocial />
              </ul>
              {/* social link */}
            </div>
         
     
          
          </div>
        </div>
      </div>
     

      <div className="container">
      <div className="bottom-footer">
        <div className="row align-items-center">
          <div className="col-lg-5 order-lg-last mb-15">
            <div className="footer-newsletter float-xl-end">
              <h5 className="footer-title">Subscribe Newsletter</h5>
              <form action="#">
                <input type="email" placeholder="Enter your email address"/>
                <button><i className="bi bi-arrow-right"></i></button>
              </form>
            </div>
          </div>
          <div className="col-lg-7 order-lg-first mb-15">
            <Link href="/" className="d-none d-lg-inline-block mb-25">
            <Image
                  src="/assets/images/logo/logo5.png"
                  width={260}
                  height={42}
                  alt="Picture of the author"
                />
            </Link>

            <div className="d-xl-flex align-items-center">
             {/*  <ul className="style-none bottom-nav d-flex flex-wrap justify-content-center justify-content-lg-start order-lg-last">
                <li><Link href="#">Privacy & Terms</Link></li>
                <li><Link href="#">Cookies</Link></li>
                <li><Link href="#">Contact Us</Link></li>
              </ul> */}
              <div className="copyright me-xl-4 lg-mt-10 order-lg-first">
                Copyright @{new Date().getFullYear()} PayQwicker Limted.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FooterOne;
