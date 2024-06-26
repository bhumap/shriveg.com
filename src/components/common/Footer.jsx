import React from 'react'

export default function Footer() {
  return (
    <div className='bg-gray-200'>
      <div className='text-center max-w-5xl mx-auto px-4'>


        <div className='py-12'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium text-center'>Let&apos;s Keep in touch!</h2>
          <p className='max-w-xl mx-auto text-center text-sm mt-3 text-gray-600'>Find us on any of these platforms,we respond within 1-2 business days.</p>
          
          <div className='text-primary text-[25px] flex justify-center items-center gap-3 mt-4'>
            <i className='cursor-pointer bg-gray-100 rounded-full p-2 shadow-md bx bxl-facebook' ></i>
            <i className='cursor-pointer bg-gray-100 rounded-full p-2 shadow-md bx bxl-xing' ></i>
            <i className='cursor-pointer bg-gray-100 rounded-full p-2 shadow-md bx bxl-youtube' ></i>
            <i className='cursor-pointer bg-gray-100 rounded-full p-2 shadow-md bx bxl-linkedin' ></i>
          </div>

        </div>

         <hr className='border-t border-black/20' />
         <p className='text-center text-sm text-gray-600 py-4'>@2024 Shri Veg. All Rights Reserved.</p>
        
      </div>
    </div>
  )
}
