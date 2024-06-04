import Link from 'next/link'
import React from 'react'
import LoginForm from '@/components/Login/LoginForm'


export const metadata = {
  title:"Login - Shri Veg",
  desc:"Online Food Delivery Service Providers"
}


const Login = () => {
  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default Login