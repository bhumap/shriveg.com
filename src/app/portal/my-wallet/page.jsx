"use client"
import { AuthContext } from '@/context/AuthContext'
import React, { useContext } from 'react'
import { FaMoneyBillWave, FaHistory } from "react-icons/fa";
import { toast } from "react-toastify";

const Page = () => {

  var {user}  = useContext(AuthContext)

  const copyToClipboard = () => {
    const referralUrl = `http://localhost:3000/register?referral=${user?.referral_code}`;
    navigator.clipboard.writeText(referralUrl)
      .then(() => {
        toast.success("Referral code copied to clipboard!", {
          position: "top-right",
          autoClose: 3000, // Auto close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error("Failed to copy referral code.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <section className="flex flex-col items-center py-10 mx-auto max-w-5xl gap-10">
      {/* Wallet Page Header */}
      <h1 className="text-4xl font-bold mb-6 text-gray-800">My Wallet</h1>

      {/* Wallet Balance Card */}
      <div className="w-full max-w-lg rounded-lg shadow-xl bg-[rgba(210,103,72,var(--tw-bg-opacity))] p-6 mb-8 text-white relative overflow-hidden border border-white 
                      bg-[linear-gradient(110deg,rgb(210,103,72),45%,rgb(232,126,99),55%,rgb(210,103,72))] bg-[length:200%_100%] 
                      animate-[shimmer_3s_infinite] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 
                      focus:ring-offset-2 focus:ring-offset-slate-50">
        {/* Decorative Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-20"></div>
        <h1 className="text-3xl font-bold mb-4 relative z-10">Wallet Balance</h1>
        <p className="text-lg mb-6 relative z-10">Your current balance is:</p>
        <h2 className="text-5xl font-extrabold relative z-10">₹100</h2>
        {/* Recharge Button with Animation */}
      </div>
      
      <a href="./recharge" className="bg-primary text-white px-8 py-3 rounded-md shadow-md flex items-center relative z-10 transition-transform transform hover:scale-105">
        <FaMoneyBillWave className="mr-2" /> Recharge Wallet
      </a>

      {/* Rewards Section */}
      <div className="w-full max-w-lg">
        {/* Referral Code Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Share Your Referral Code</h2>
          <div className="flex items-center justify-between bg-blue-50 p-5 rounded-lg shadow-sm">
            <div>
              <p className="text-sm text-primary-700">Your Referral Code</p>
              <p className="text-2xl font-bold text-gray-900">{user?.referral_code}</p>
            </div>
            <button onClick={copyToClipboard} className="text-white bg-primary px-5 py-2 rounded-lg shadow-md transition-all duration-150">
              Copy Code
            </button>
          </div>
          {/* Conditional message to encourage sharing */}
          <p className="text-sm text-gray-600 mt-4">
            Share your referral code to earn rewards! Once someone uses your code, you&apos;ll see your rewards listed here.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Page