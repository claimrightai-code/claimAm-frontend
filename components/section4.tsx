import Image from "next/image";
// import { SiAzuredataexplorer } from "react-icons/si";

const data = [
  {
    title: "Enjoy smooth and reliable transactions  ",
    image: "/steptodown.com836921.jpg",
  },
  { title: "Peace of mind in every click", image: "/steptodown.com665292.jpg" },
  {
    title:
      "Enjoy the convenience of managing various transactions from your home",
    image: "/steptodown.com379059.jpg",
  },
];

function Section4() {
  return (
    <section className='my-20 text-center font-bold flex flex-col justify-center px-6'>
      <h2 className='max-w-screen-md text-center justify-center text-2xl lg:text-4xl mx-auto'>
        Enjoy effortless transactions for a happier you
      </h2>

      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10 my-28 place-content-center'>
        {data.map((item, id) => (
          <div
            key={id}
            className={`h-[450px] max-w-[350px] relative ${
              id == 1 && "lg:scale-125 transition-all ease-in-out"
            }`}
          >
            <div className='p-2 px-5 flex justify-between rounded-br-[40px] rounded-bl-[40px] bg-black bg-opacity-40 backdrop-blur-lg absolute w-full bottom-0 right-0 left-0'>
              <div className='text-white w-full text-start text-lg mr-2'>
                {item.title}
              </div>
              <div className=''>
                {/* <SiAzuredataexplorer
                  size={40}
                  className='p-2 bg-[#1BB400] rounded-full'
                /> */}
              </div>
            </div>
            <Image
   unoptimized
              src={item.image}
              height={340}
              width={600}
              alt='image'
              className='h-full object-cover rounded-[40px]'
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Section4;
