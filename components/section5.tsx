import React from "react";
import Carousel from "./ui/Carousel";

const items = [
  {
    title: "Kola",
    desc: "Payquick has simplified my life. I used to struggle with keeping track of my various utility bills, but with their platform, I can pay everything in one place, and their energy usage insights have helped me save on my bills",
  },
  {
    title: "Gugulethu",
    desc: "I've been using Payquick for a while now, and it's the most user-friendly platform I've found for trading . The security measures and 24/7 support gives me confidence in my investments.",
  },
  {
    title: "Amahle",
    desc: "Payquick is my go-to platform for managing my portfolio. The ability to securely store multiple in one place, has simplified my journey.",
  },
  {
    title: "Chinedu",
    desc: "Using this electricity vending platform has made my life so much easier. I can top up my electricity anytime, anywhere, and the process is incredibly convenient. No more running to the store or worrying about power outages!",
  },
  {
    title: "Zainab",
    desc: "The convenience of topping up my electricity from my smartphone is unbeatable. I no longer have to stand in long queues or worry about making payments during non-business hours. It's a stress-free solution.",
  },
];

export default function Section5() {
  return (
    <div className='my-10'>
      <Carousel items={items} />
    </div>
  );
}
