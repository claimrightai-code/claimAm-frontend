import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/../../components/ui/accordion";

const AccorData = [
  {
    title: "Easy Bills",
    desc: "With just a few clicks, you can settle your bills from the comfort of your home or on the go.",
  },
  {
    title: "Quick and secure bill settlement ",
    desc: "Enjoy the simplicity of managing your finances, tracking payments and never missing a due date again with the power of online bill payment solutions.",
  },
  {
    title: "Pay bills seamlessly",
    desc: "Say goodbye to the hassle of traditional bill payments and embrace the ease and convenience of paying your bills online",
  },
  {
    title: "Secure and reliable transactions",
    desc: "Confidently explore the world of digital currencies while safeguarding your investments and financial well-being.",
  },
  {
    title: "Instant exchange",
    desc: "Whether you’re a seasoned trader or just starting out, our platform empowers you to make quick and informed decisions, ensuring you’re always at the forefront of the market.",
  },
  {
    title: "Trade with ease",
    desc: "Our platform offers a seamless and user friendly interface, allowing you to execute trades swiftly, capitalize on market opportunities and navigate the dynamic world of digital assets effortlessly.",
  },
  {
    title: "Power on demand",
    desc: "Say goodbye to the inconvenience of visiting physical stores or dealing with paper bills.",
  },
  {
    title: "Never run out of power",
    desc: "Enjoy the convenience of 24/7 access to your electricity account, ensuring that your home stays powered up without the hassle of traditional methods.",
  },
];

export default function Section2() {
  return (
    <div className='my-32'>
      <div className='lg:grid grid-cols-5 gap-x-8 overflow-hidden'>
        <Accordion
          className='relative col-span-2 overflow-y-auto overflow-x-hidden  items-center justify-center lg:h-[500px] bg-no-repeat object-cover custom-scrollbar'
          type='single'
          collapsible
        >
          {AccorData.map((item, idx) => (
            <AccordionItem key={idx} value={item.title} className='my-7 mx-8'>
              <AccordionTrigger className='decoration-transparent justify-end gap-x-2'>
                <p className='text-lg text-end md:text-3xl'>{item.title}</p>
              </AccordionTrigger>
              <AccordionContent className='text-end text-lg ml-7'>
                {item.desc}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className='w-full col-span-3 flex items-center justify-center lg:h-[500px] max-lg:mt-10 bg-no-repeat object-cover'>
          <Image
   unoptimized
            src={"section2.svg"}
            height={400}
            width={600}
            alt='section'
            className='w-full'
          />
        </div>
      </div>
    </div>
  );
}
