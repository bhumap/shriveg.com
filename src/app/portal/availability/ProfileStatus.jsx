"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
const ProfileStatus = () => {
  const { user, refetch } = useContext(AuthContext);

  const sumbitHandler = async (e) => {
    try {
      const res = await axios.put(`/api/auth/edit`, {
        isActive: e.target.checked,
      });
      toast.success("Status Updated Successfully!");
      refetch();
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <>

    <h2 className="my-2 font-semibold text-xl">Store Status </h2>
      {user?.userType == "Chef" ? (
        <div className="flex">
          <label className="inline-flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"
              onChange={sumbitHandler}
              checked={user?.isActive}
              className="sr-only peer"
            />
            <div
              className={`relative w-11 h-6 bg-red-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500`}
            ></div>
            <span className="ms-3 text-sm font-medium text-gray-900">
              {user?.isActive ? "Active" : "Inactive"}
            </span>
          </label>
        </div>
      ) : null}
    </>
  );
};

export default ProfileStatus;
