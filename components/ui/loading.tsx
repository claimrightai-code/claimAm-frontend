import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className='z-50 flex items-start justify-center fixed h-screen w-screen bg-white'>
      <FaSpinner className='text-lg animate-spin text-green-400' />
    </div>
  );
}
