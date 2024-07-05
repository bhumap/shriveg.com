import axios from 'axios'
import React from 'react'
import ListDishForm from './ListDishForm'

var fetchDishByID = async (id) =>{
  try {
    var res = await axios.get(`${process.env.DOMAIN}/api/dishes/${id}`)
    return res.data.message
  } catch (error) {
    console.log(error)
  }
}

const page = async ({params}) => {
  var dish = await fetchDishByID(params.id)

  return (
    <div className='bg-white p-4 shadow-md rounded-xl'>
      <ListDishForm dish={dish} />
    </div>
  )
}

export default page