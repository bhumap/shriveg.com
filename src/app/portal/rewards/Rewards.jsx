"use client";
import React, { useEffect, useState } from "react";
import { format } from 'date-fns';

const Rewards = () => {
    let [rewards, setRewards] = useState([]);
    let [loading, setLoading] = useState(false);
    let fetchRewards = async () => {
        try {
            setLoading(true);
            let res = await fetch(`/api/rewards`);
            setRewards(res.data.message.data);
            
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
    <div className="bg-white p-2 sm:p-4 flex flex-col gap-2 shadow-md">
        <h2 className="text-xl font-bold mb-2">My Rewards</h2>
  
        <div className="relative overflow-x-auto  sm:rounded-lg">
          <table className="w-full relative min-w-[800px] text-sm text-left">
            <thead className="text-xs sticky z-[99] top-0 text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                Referred By
                </th>
                <th scope="col" className="px-6 py-3">
                Referred To
                </th>
                <th scope="col" className="px-6 text-center py-3">
                Reward Amount 
                </th>
                <th scope="col" className="px-6 text-center py-3">
                Amount Type
                </th>
                <th scope="col" className="px-6 text-center py-3">
                Status
                </th>
                <th scope="col" className="px-4 w-4">
                Created Date
                </th>
              </tr>
            </thead>
            <tbody>
              {!!rewards ? rewards?.map((reward, i) => {
                return (
                  <tr
                    key={i}
                    className="bg-white whitespace-nowrap hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{reward.referred_by.fullName}</td>
                    <td className="px-6 py-4">
                      {reward.referred_to.fullName}
                    </td>
                    <td className="px-6 text-center py-4">{reward.reward_amount}</td>
  
                    <td className="px-6 text-center font-semibold py-4">
                      {reward.amount_type}
                    </td>
                    <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-lg ${
                            reward.status === "Pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {reward.status}
                        </span>
                    </td>
                    <td className="px-4 w-4">
                        {format(new Date(reward.createdAt), "MM/dd/yyyy")}
                    </td>
                  </tr>
                );
              }): 'No data found'}
            </tbody>
          </table>
        </div>
    </div>
    );
};

export default Rewards;