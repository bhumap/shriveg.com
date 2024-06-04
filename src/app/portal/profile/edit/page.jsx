import React from 'react'
import dynamic from 'next/dynamic'

const EditProfile = dynamic(() => import('./EditProfile'), {
    ssr: false
})

const page = () => {
  return (
    <div>
      <EditProfile />
    </div>
  )
}

export default page