"use client"
import { AuthContext } from '@/context/AuthContext'
import React, { useContext } from 'react'

const Page = () => {

  var {user}  = useContext(AuthContext)

  return (
    <div className='p-4'>
      <div className='border mx-auto max-w-xl rounded-lg border-dashed border-black text-center py-4 my-10'>
      <h2 className='text-gray-600 uppercase'>My Wallet</h2>
      <h2 className='text-4xl font-semibold'>{ (user?.wollet?.balance).toLocaleString()} ₹</h2>
      </div>
    </div>
  )
}

export default Page