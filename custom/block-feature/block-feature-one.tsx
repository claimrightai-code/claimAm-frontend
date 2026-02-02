import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
// internal
import icon_1 from "@/assets/images/icon/icon_03.svg";
import icon_2 from "@/assets/images/icon/icon_04.svg";
import icon_3 from "@/assets/images/icon/icon_05.svg";
import Arrow from "@/assets/images/icon/icon_09.svg";
import service_data from "@/data/service-data";

// card style one item
function UpperCardItem({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
}) {
  return (
    <div className='card-style-one d-flex w-100 mb-35'>
      <div className='icon tran3s rounded-circle d-flex align-items-center justify-content-center'>
        <Icon />
      </div>
      <div className='text ps-4'>
        <h4 className='fw-bold'>{title}</h4>
        <p className='pe-xl-4'>{subtitle}</p>
      </div>
    </div>
  );
}

const BlockFeatureOne = ({ style_2 = false }: { style_2?: boolean }) => {
  const service_items = service_data.filter((s) => s.page === "home-2");
  return (
    <div
      className={`block-feature-one position-relative ${
        style_2
          ? "light-bg-deep mt-150 lg-mt-80 pt-120 lg-pt-60 pb-130 lg-pb-60"
          : "pt-75"
      }`}
    >
      {!style_2 && (
        <div className='upper-wrapper mb-110 lg-mb-80'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-4 wow fadeInUp'>
                <UpperCardItem
                  icon={icon_1}
                  title='Convenience'
                  subtitle='PayQwicker offers a one-stop solution for a wide range of financial transactions, saving you time and effort. Whether you need to purchase airtime, pay bills, transfer money, or convert airtime to cash, you can do it all within the same app, anytime and anywhere. Managing your finances have never been easier.'
                />
              </div>
              <div className='col-lg-4 wow fadeInUp' data-wow-delay='0.1s'>
                <UpperCardItem
                  icon={icon_2}
                  title='Security'
                  subtitle='Your security is our top priority. PayQwicker employs advanced encryption technology and robust security measures to safeguard your personal and financial information, providing you with peace of mind with every transaction.'
                />
              </div>
              <div className='col-lg-4 wow fadeInUp' data-wow-delay='0.2s'>
                <UpperCardItem
                  icon={icon_3}
                  title='Accessibility'
                  subtitle='With our user-friendly interface, PayQwicker is accessible to users of all backgrounds and experience levels. We continuously strive to enhance our services and introduce new features to meet evolving consumer needs, ensuring you always have access to cutting-edge financial tools and 24/7 customer suppoort.'
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='container'>
        <div className='position-relative'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='title-one text-center text-md-start mb-30 sm-mb-10'>
                <h2>Your Bills, Our Priority!</h2>
              </div>
            </div>
          </div>
          <div className='row justify-content-center'>
            {service_items.map(({ desc, icon: Icon, id, page, title }, i) => (
              <div
                key={i}
                className='col-lg-4 col-md-6 d-flex wow fadeInUp'
                data-wow-delay={`0.${i + 1}s`}
              >
                <div className='card-style-two vstack tran3s w-100 mt-30'>
                  <p className='lazy-img icon me-auto'>
                    <Icon />
                  </p>
                  <h4 className='fw-bold mt-30 mb-25'>{title}</h4>
                  <p className='mb-20'>{desc}</p>
                  <Link
                    href='/service-details'
                    className='arrow-btn tran3s mt-auto stretched-link'
                  >
                    <Arrow />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className='section-subheading sm-mt-40'>
            <p className='text-lg'>
            A digital payments network that enables users to pay all kinds of bills and send money to friends & family domestically or internationally fast and securely{" "}
            </p>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockFeatureOne;
