"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
// import { SiAzuredataexplorer } from "react-icons/si";
import CountUp from "react-countup";

function Section3() {
  return (
    <section className='py-10 bg-gray-100 lg:rounded-[50px] max-lg:p-4 p-10 lg:grid lg:grid-cols-5'>
      <div className='col-span-2'>
        <h2 className='text-2xl lg:text-4xl font-bold mb-10'>
          Secure Seamless Transactions
        </h2>

        <div className='h-[500px]'>
          <Image
   unoptimized
            src={"/section3.jpg"}
            height={400}
            width={600}
            alt='image'
            className='h-full object-cover rounded-2xl'
          />
        </div>
      </div>
      <div className='col-span-3 lg:px-10 lg:pl-16 mt-10 lg:mt-0'>
        <p className='leading-snug text-gray-500'>
          Security in online transactions is paramount in today’s digital
          landscape. Protecting your financial and personal information is
          non-negotiable and we want to assure you that our platform prioritizes
          your security above all else. Our dedicated security team works
          tirelessly to monitor and protect against emerging threats, ensuring
          your information remains confidential and secure.
        </p>

        <div className='grid grid-cols-2 mt-10 lg:pr-14 grid-rows-2 gap-4 my-4'>
          <div className='my-4'>
            <b className='mt-2 text-5xl lg:text-7xl font-medium'>
              <CountUp start={0} end={200} delay={0.7} /> K
            </b>
            <p className='text-start text-xl mt-2'>client</p>
          </div>
          <div className='my-4'>
            <b className='mt-2 text-5xl lg:text-7xl font-medium'>
              <CountUp start={0} end={97} delay={0.7} /> %
            </b>
            <p className='text-start text-xl mt-2'>Customer Satisfaction</p>
          </div>
          <div className='my-4'>
            <b className='mt-2  text-5xl lg:text-7xl font-medium'>
              <CountUp start={0} end={85} delay={0.7} />%
            </b>
            <p className='text-start text-xl mt-2'>client</p>
          </div>
          <div className='my-4'>
            <b className='mt-2  text-5xl lg:text-7xl font-medium'>200K</b>
            <p className='text-start text-xl mt-2'>client</p>
          </div>
        </div>

        <Button
          variant='outline'
          color='black'
          className='rounded-full flex bg-black text-white justify-between w-[300px] mt-4 text-lg py-7 px-4 hover:text-black hover:bg-transparent'
        >
          Explore more{" "}
          {/* {/* <SiAzuredataexplorer */}
            size={40}
            className='p-2 bg-[#1BB400] rounded-full text-black'
          />
        </Button>
      </div>
    </section>
  );
}

export default Section3;
