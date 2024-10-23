"use client";
import React, { useEffect, useState, useContext } from "react";
import { format } from 'date-fns';
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";

const Rewards = () => {
    let [rewards, setRewards] = useState([]);
    let [loading, setLoading] = useState(false);
    const { user,refetch } = useContext(AuthContext);
    
    const copyToClipboard = () => {
      const referralUrl = `https://shriveg.com/register?referral=${user?.referral_code}`;
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

    let fetchRewards = async () => {
        try {
            setLoading(true);
            let res = await fetch(`/api/rewards`);
            res = await res.json();
            setRewards(res.message.data);
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRewards();
    }, [])

    return (
<div className="bg-gray-100 min-h-screen p-4 sm:p-8">
  {/* Referral Code Card */}
  <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Share Your Referral Code</h2>
    <div className="flex items-center justify-between bg-blue-50 p-5 rounded-lg shadow-sm">
      <div>
        <p className="text-sm text-blue-700">Your Referral Code</p>
        <p className="text-2xl font-bold text-gray-900">{user?.referral_code}</p>
      </div>
      <button
        onClick={copyToClipboard}
        className="text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg shadow-md transition-all duration-150"
      >
        Copy Code
      </button>
    </div>
    {/* Conditional message to encourage sharing */}
      <p className="text-sm text-gray-600 mt-4">
        Share your referral code to earn rewards! Once someone uses your code, you&apos;ll see your rewards listed here.
      </p>
  </div>

  {/* Referral Rewards Table Card */}
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-xl font-bold mb-4 text-gray-800">My Rewards</h2>
    <div className="relative overflow-x-auto bg-white rounded-lg shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">Referred By</th>
            <th scope="col" className="px-6 py-3">Referred To</th>
            <th scope="col" className="px-6 py-3 text-center">Reward Amount</th>
            <th scope="col" className="px-6 py-3 text-center">Amount Type</th>
            <th scope="col" className="px-6 py-3 text-center">Status</th>
            <th scope="col" className="px-6 py-3 text-center">Created Date</th>
          </tr>
        </thead>
        <tbody>
          {!!rewards && rewards.length > 0 ? (
            rewards.map((reward, i) => (
              <tr key={i} className="bg-white hover:bg-gray-50">
                <td className="px-6 py-4">{reward.referred_by.fullName}</td>
                <td className="px-6 py-4">{reward.referred_to.fullName}</td>
                <td className="px-6 text-center py-4">{reward.reward_amount}</td>
                <td className="px-6 text-center font-semibold py-4 capitalize">{reward.amount_type}</td>
                <td className="px-6 text-center py-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      reward.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600 capitalize"
                        : "bg-green-100 text-green-600 capitalize"
                    }`}
                  >
                    {reward.status}
                  </span>
                </td>
                <td className="px-6 text-center py-4">
                  {format(new Date(reward.createdAt), "MM/dd/yyyy")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No rewards yet. Share your referral code to start earning!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>


    );
};

export default Rewards;