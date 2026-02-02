"use client";
import Image from "next/image";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import { Button } from "./ui/button";
// import { SiAzuredataexplorer } from "react-icons/si";
import { Input } from "./ui/input";

export default function Hero() {
  const SwipeHero = [
    { component: <Hero1 /> },
    { component: <Hero2 /> },
    // { component: <Hero3 /> },
  ];

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      autoplay={true}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop
    >
      {SwipeHero.map((item, id) => (
        <SwiperSlide key={id}>
          <div className='pb-20 md:pb-0 lg:py-20'>{item.component}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export function Hero1() {
  return (
    <div className='flex flex-col lg:grid lg:grid-cols-2 max-lg:px-4 mt-16 lg:mt-28'>
      <div className='py-7'>
        <h1 className='text-5xl lg:text-6xl font-semibold leading-[56px]'>
          Seamless Money Transfer, Worldwide connection.{" "}
        </h1>
        <p className='mt-4 max-w-sm'>
          we believe in connecting hearts and empowering dreams through secure,
          fast, and reliable money transfers. Whether you&apos;re sending
          support to family abroad or facilitating international business
          transactions, our cutting-edge remittance solution is your trusted
          partner.
        </p>

        <Button
          variant='outline'
          color='black'
          className='rounded-full flex max-w-xs bg-gray-100 justify-between w-full mt-4 text-lg py-7 px-4 hover:text-black hover:bg-transparent'
        >
          Explore more{" "}
          {/* <SiAzuredataexplorer
            size={40}
            className='p-2 bg-[#1BB400] rounded-full'
          /> */}
        </Button>
      </div>
      <div className='flex justify-end mb-10'>
        <div className='p-7 max-w-[430px] w-full rounded-2xl border'>
          <div className='bg-black text-[#1BB400] rounded-xl p-4'>
            <p className='text-center '>Exchange Rate</p>
            <p className='font-bold text-lg text-center my-2'>
              1.00 USD = 760.00 NGN
            </p>
          </div>
          <div className='mt-2 pt-3'>
            <p>You send exactly</p>
            <div className='rounded-xl mt-3 border flex'>
              <Input
                placeholder='100'
                className='h-12 border-none focus-visible:ring-0'
              />
              <div className='form-control w-full max-w-[90px]'>
                <select className='select select-none bg-black text-[#1BB400] rounded-tr-xl rounded-br-xl rounded-none focus:outline-none focus-visible:outline-none'>
                  <option value='USD' defaultChecked>
                    USD
                  </option>
                  <option value='EURO'>EURO</option>
                  <option value='GBP'>GBP</option>
                </select>
              </div>
            </div>
          </div>
          <div className='flex text-xs mt-4 justify-between items-center rounded-xl'>
            <p className='text-black text-center'>Fee & Charge</p>
            <p className='text-black font-bold text-center'>+1.00 USD</p>
          </div>
          <div className='flex text-xs mt-1 justify-between items-center rounded-xl'>
            <p className='text-black text-center'>Amount will convert</p>
            <p className='text-black font-bold text-center'>100 USD</p>
          </div>
          <div className='flex text-xs mt-1 justify-between items-center rounded-xl'>
            <p className='text-black text-center'>Fee & Charge</p>
            <p className='text-black font-bold text-center'>+1.00 USD</p>
          </div>
          <div className='mt-2 pt-3'>
            <p>You send exactly</p>
            <div className='rounded-xl mt-3 border flex'>
              <Input
                placeholder='76000.00'
                className='h-12 border-none focus-visible:ring-0'
              />
              <div className='form-control w-full max-w-[90px]'>
                <select className='select select-none bg-black text-[#1BB400] rounded-tr-xl rounded-br-xl rounded-none focus:outline-none focus-visible:outline-none'>
                  <option value='NGN' defaultChecked>
                    NGN
                  </option>
                  <option value='EURO'>EURO</option>
                  <option value='GBP'>GBP</option>
                </select>
              </div>
            </div>
          </div>
          <div className='flex items-center mt-4 justify-between'>
            <h4>Receive method</h4>
            <div className='form-control w-full max-w-[90px]'>
              <select className='select select-none bg-black text-[#1BB400] rounded-xl focus:outline-none focus-visible:outline-none'>
                <option value='USD' defaultChecked>
                  USD
                </option>
                <option value='EURO'>EURO</option>
                <option value='GBP'>GBP</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function Hero2() {
  return (
    <div className='flex flex-col-reverse lg:grid lg:grid-cols-6 max-lg:px-4 mt-16 lg:mt-28'>
      <Image
        unoptimized
        src={"/hero.jpg"}
        className='col-span-2 p-7 h-[500px] object-cover'
        height={400}
        width={710}
        alt='hero'
        // placeholder="blur"
        // blurDataURL=""
      />
      <div className='col-span-2 py-7'>
        <h1 className='text-5xl lg:text-6xl font-semibold leading-[56px]'>
          Seamlessly Buy your airtme and Data.{" "}
        </h1>
        <p className='mt-4 max-w-sm'>
          We offer the best deal for utilities click below to explore more
        </p>

        <Button
          variant='outline'
          color='black'
          className='rounded-full flex bg-gray-100 justify-between w-full mt-4 text-lg py-7 px-4 hover:text-black hover:bg-transparent'
        >
          Explore more{" "}
          <SiAzuredataexplorer
            size={40}
            className='p-2 bg-[#1BB400] rounded-full'
          />
        </Button>
      </div>
      <div className='col-span-2 p-7 max-w-[710px] h-[400px] hidden lg:block'>
        <Image
   unoptimized
          src={"/hero2.svg"}
          className='hover:bg-opacity-70'
          height={223}
          width={406}
          alt='hero'
        />{" "}
        <Image
   unoptimized
          src={"/hero2.svg"}
          className='hover:bg-opacity-70 mt-6'
          height={223}
          width={406}
          alt='hero'
        />
      </div>
    </div>
  );
}
export function Hero3() {
  return (
    <div className='flex flex-col-reverse lg:grid lg:grid-cols-6 max-lg:px-4 mt-16 lg:mt-28'>
      <Image
   unoptimized
        src={"/hero.jpg"}
        className='col-span-2 p-7 h-[500px] object-cover'
        height={400}
        width={710}
        alt='hero'
        // placeholder="blur"
        // blurDataURL=""
      />
      <div className='col-span-2 py-7'>
        <h1 className='text-5xl lg:text-6xl font-semibold leading-[56px]'>
          Seamlessly Buy your airtme and Data.{" "}
        </h1>
        <p className='mt-4 max-w-sm'>
          We offer the best deal for utilities click below to explore more
        </p>

        <Button
          variant='outline'
          color='black'
          className='rounded-full flex bg-gray-100 justify-between w-full mt-4 text-lg py-7 px-4 hover:text-black hover:bg-transparent'
        >
          Explore more{" "}
          <SiAzuredataexplorer
            size={40}
            className='p-2 bg-[#1BB400] rounded-full'
          />
        </Button>
      </div>
      <div className='col-span-2 p-7 max-w-[710px] h-[400px] hidden lg:block'>
        <Image
   unoptimized
          src={"/hero2.svg"}
          className='hover:bg-opacity-70'
          height={223}
          width={406}
          alt='hero'
        />{" "}
        <Image
   unoptimized
          src={"/hero2.svg"}
          className='hover:bg-opacity-70 mt-6'
          height={223}
          width={406}
          alt='hero'
        />
      </div>
    </div>
  );
}
