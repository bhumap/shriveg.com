import React from 'react'
import MyDishes from './MyDishes'


const page = async () => {
  return (
    <div className='bg-white p-4 sm:p-10 shadow-md rounded-xl'>
      <MyDishes />
    </div>
  )
}

export default page