"use client";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

const EditProfile = () => {
  const { user, refetch } = useContext(AuthContext);

  // For Avatar Editing
  const [tempImage, setTempImage] = useState("");
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [edited, setEdited] = useState(false);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEdited(true);

    if (name.startsWith("address")) {
      setFormData({
        ...formData,
        address: { ...formData?.address, [name.split(".")[1]]: value },
      });
      return;
    }

    if (name.startsWith("email")) {
      setFormData({ ...formData, email: { [name.split(".")[1]]: value } });
      return;
    }
    if (name.startsWith("phone")) {
      setFormData({ ...formData, phone: { [name.split(".")[1]]: value } });
      return;
    }

    if (name === "photo") {
      setTempImage(e.target.files[0]);
      setFormData({ ...formData, photo: e.target.files[0] });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const sumbitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`/api/auth/edit`, {
        ...formData,
      });
      toast.success("Profile Updated Successfully!");
      setEdited(false);
      refetch();
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
      setPreview(null)
    }
  };

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);


  return (
    <>
      <form
        className="bg-white shadow-md p-4 rounded-lg"
        onSubmit={sumbitHandler}
      >
        <div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Full Name */}
            <div className="flex col-span-2 md:col-span-1 flex-col">
              <label
                className="text-[#333441d8] text-sm mb-1"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={changeHandler}
                value={formData?.fullName}
                className="rounded-lg py-2 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
              />
            </div>

            {/* Username */}
            {user?.userType == "Chef" && <div className="flex col-span-2 md:col-span-1 flex-col">
              <label
                className="text-[#333441d8] text-sm mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                title="Username can't be updated!"
                onChange={changeHandler}
                value={formData?.username}
                disabled={true}
                className="rounded-lg py-2 border text-gray-400 focus:text-[#1553A1] border-gray-200 focus:border-[#1554a177] cursor-not-allowed select-none"
              />
            </div>}

            {/* Email */}
            <div className="flex col-span-2 md:col-span-1 flex-col">
              <label className="text-[#333441d8] text-sm mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email.value"
                placeholder="Email"
                onChange={changeHandler}
                value={formData?.email?.value}
                className="rounded-lg py-2 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
              />
            </div>

            {/* Phone */}
            <div className="flex col-span-2 md:col-span-1 flex-col">
              <label className="text-[#333441d8] text-sm mb-1" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                type="text"
                name="phone.value"
                placeholder="Phone"
                onChange={changeHandler}
                value={formData?.phone?.value}
                className="rounded-lg py-2 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
              />
            </div>


            <>
                  <div className="flex col-span-2 md:col-span-1 flex-col">
                    <label
                      htmlFor="address.line1"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Address Line 1
                    </label>
  
                    <input
                      type="text"
                      name="address.line1"
                      value={formData?.address?.line1}
                      id="address.line1"
                      placeholder="Address"
                      className="rounded-lg py-2 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
                      onChange={changeHandler}
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="flex col-span-2 md:col-span-1 flex-col">
                    <label
                      htmlFor="address.line1"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Address Line 2
                    </label>
  
                    <input
                      type="text"
                      name="address.line2"
                      value={formData?.address?.line2}
                      id="address.line2"
                      placeholder="Address"
                      className="rounded-lg py-2 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
                      onChange={changeHandler}
                      disabled={loading}
                    />
                  </div>
  
                  <div className="flex col-span-2 md:col-span-1 flex-col">
                    <label
                      htmlFor="address.line1"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Address Line 3
                    </label>
  
                    <input
                      type="text"
                      name="address.line3"
                      value={formData?.address?.line3}
                      id="address.line3"
                      placeholder="Address"
                      className="rounded-lg py-2 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
                      onChange={changeHandler}
                      disabled={loading}
                    />
                  </div>
  
                  <div className="flex col-span-2 md:col-span-1 flex-col">
                    <label
                      htmlFor="address.cityTown"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      City / Town
                    </label>
  
                    <input
                      type="text"
                      name="address.cityTown"
                      value={formData?.address?.cityTown}
                      id="address.cityTown"
                      placeholder="Address"
                      className="rounded-lg py-2 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
                      onChange={changeHandler}
                      disabled={loading}
                    />
                  </div>
  
                  <div className="flex col-span-2 md:col-span-1 flex-col">
                    <label
                      htmlFor="address.district"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      District
                    </label>
  
                    <input
                      type="text"
                      name="address.district"
                      value={formData?.address?.district}
                      id="address.district"
                      placeholder="Address"
                      className="rounded-lg py-2 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
                      onChange={changeHandler}
                      disabled={loading}
                    />
                  </div>
  
                  <div className="flex col-span-2 md:col-span-1 flex-col">
                    <label
                      htmlFor="address.state"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      State
                    </label>
  
                    <input
                      type="text"
                      name="address.state"
                      value={formData?.address?.state}
                      id="address.state"
                      placeholder="State"
                      className="rounded-lg py-2 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
                      onChange={changeHandler}
                      disabled={loading}
                    />
                  </div>
  
                  <div className="flex col-span-2 md:col-span-1 flex-col">
                    <label
                      htmlFor="address.pinCode"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Pin Code
                    </label>
  
                    <input
                      type="text"
                      name="address.pinCode"
                      value={formData?.address?.pinCode}
                      id="address.pinCode"
                      placeholder="Area Pin Code"
                      className="rounded-lg py-2 border text-[#555] focus:text-[#1553A1] border-gray-300 focus:border-[#1554a177]"
                      onChange={changeHandler}
                      disabled={loading}
                    />
                  </div>
                  </>
          </div>

          <div className="flex justify-between items-center">
            <button
              disabled={!edited || loading}
              className="border-primary border disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-white rounded-md py-1 px-3 "
            >
              {loading ? "Processing.." : "Save"}
            </button>
            <Link
              href="/portal/profile/update-password"
              className="border disabled:opacity-50 text-primary border-primary disabled:cursor-not-allowed rounded-md py-1 px-3"
            >
              <i className="bx bx-lock mr-1"></i>
              Reset Password
            </Link>
          </div>
        </div>

      
      </form>

      {/* {preview && (
        <div className="px-0 py-10 md:p-10 fixed top-0 left-0 w-screen z-[99999999] h-screen bg-white/5 backdrop-blur-sm">
          <div className="bg-white rounded-md overflow-hidden border border-gray-400 shadow-md p-4 max-w-3xl mx-auto">
          <div className="text-right mb-4">
            <i onClick={()=>setPreview(null)} className="bx text-2xl cursor-pointer bg-gray-200 p-1 rounded-full bx-x"></i>
          </div>

            <Avatar
              width={"100%"}
              onCrop={(e) => {
                setTempImage(e);
              }}
              src={preview === true ? "" : preview}
              height={350}
              imageHeight={300}
              imageWidth={300}
            />
            <button
              disabled={loading}
              className="bg-primary disabled:cursor-not-allowed disabled:opacity-50 py-1 px-3 rounded-full text-white block mt-4  ml-auto"
              onClick={uploadImageToCloudinaryAndProfileUpdate}
            >
              {loading ? "Uploading..." : "Save Photo"}
            </button>
          </div>
          <div onClick={()=>setPreview(null)} className="absolute top-0 left-0 h-full z-[-1] w-full"></div>
        </div>
      )} */}
    </>
  );
};

export default EditProfile;
