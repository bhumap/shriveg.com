import React from 'react'
import Image from "next/image";

const WorkFlow = () => {
  return (
    <div className='px-4 bg-white py-20'>
      <div className='max-w-5xl mx-auto'>

        <h2 className='lg:text-5xl md:text-4xl text-2xl font-bold text-center mb-3'>How it Works</h2>
        <p className='max-w-2xl mx-auto text-center mb-10'>Completely network impactful users whereas next-generation application engage out thinking via tactical action.</p>

        <div className='grid gap-x-6 gap-y-12 lg:grid-cols-4 md:grid-cols-2 justify-center items-center'>

          <div className='text-center flex justify-center items-center flex-col relative' >
            <Image width={300} height={300}  className='w-40 aspect-square border rounded-full ' src="/images/workFlow/01.jpg" alt="" />
            <p className='font-semibold mt-4'>Choose Your Favorite</p>
            <div className='flex items-center justify-center bg-primary absolute top-0 right-[1%] md:right-[31%] lg:right-8   rounded-[100%] h-[50px] w-[50px] border-4 border-white'>
              <p className='text-white text-center text-xs'>01 <br /> STEP</p>
            </div>
          </div>

          <div className='text-center flex justify-center items-center flex-col relative'>
            <Image width={300} height={300}  className='w-40 aspect-square border  rounded-full' src="/images/workFlow/02.jpg" alt="" />
            <div className='font-semibold mt-4'>Our Chef Will Cook</div>
            <div className='flex items-center justify-center bg-primary absolute top-0 right-[1%] md:right-[31%] lg:right-8  rounded-[100%] h-[50px] w-[50px] border-4 border-white'>

              <p className='text-white text-center text-xs'>02 <br /> STEP</p>
            </div>
          </div>

          <div className='text-center flex justify-center items-center flex-col relative'>
            <Image width={300} height={300}  className='w-40 aspect-square border  rounded-full' src="/images/workFlow/03.jpg" alt="" />
            <div className='font-semibold mt-4'>We Deliver Your Meal</div>
            <div className='flex items-center justify-center bg-primary absolute top-0 right-[1%] md:right-[31%] lg:right-8  rounded-[100%] h-[50px] w-[50px] border-4 border-white'>

              <p className='text-white text-center text-xs'>03 <br /> STEP</p>
            </div>
          </div>

          <div className='text-center flex justify-center items-center flex-col relative'>
            <Image width={300} height={300}  className='w-40 aspect-square border rounded-full' src="/images/workFlow/04.jpg" alt="" />
            <div className='font-semibold mt-4'>Eat and Enjoy</div>
            <div className='flex items-center justify-center bg-primary absolute top-0 right-[1%] md:right-[31%] lg:right-8  rounded-[100%] h-[50px] w-[50px] border-4 border-white'>
              <p className='text-white text-center text-xs'>04 <br /> STEP</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default WorkFlow
