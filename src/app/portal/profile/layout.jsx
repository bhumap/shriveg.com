"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import Image from "next/image";

const Layout = ({ children }) => {
  const { user, refetch } = useContext(AuthContext);

  var pathname = usePathname();

  const UpdateUserProfilePhoto = async (imgURL) => {
    try {
      const res = await axios.put(`/api/auth/edit`, {
        photo: imgURL,
      });
      toast.success("Profile Updated Successfully!");
      refetch();
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  const UpdateCoverPhoto = async (imgURL) => {
    try {
      console.log(imgURL);
      const res = await axios.put(`/api/auth/edit`, {
        coverPhoto: imgURL,
      });
      toast.success("Cover Image Updated Successfully!");
      refetch();
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="bg-[rgb(241,241,241)] relative min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Top */}
        <div className="relative mb-4 z-10 bg-white border border-black/20 rounded-xl ">
          
          <div className="relative">
            {<div className="relative">
              {/* cover image */}
              <Image width={600} height={400}
                className="aspect-video sm:aspect-[4/1] rounded-xl w-full object-cover"
                src={user?.coverPhoto || "/images/image.png"}
                alt=""
              />

              {/* edit icon of cover image */}
              {pathname == "/portal/profile/edit" ? (
                <CldUploadWidget
                  options={{
                    cropping: "server",
                    cropping_aspect_ratio: 4 / 1.5,
                  }}
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  onSuccess={(res) => {
                    var croppedImageUrl = res.info?.secure_url;
                    if (res?.info?.coordinates?.custom[0]) {
                      const [x, y, width, height] =
                        res?.info?.coordinates?.custom[0];
                      var croppedImageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_crop,x_${x},y_${y},w_${width},h_${height}/${res?.info?.public_id}.png`;
                    }
                    UpdateCoverPhoto(croppedImageUrl);
                    document.body.style.overflow = "auto";
                  }}
                >
                  {({ open }) => {
                    return (
                      <div
                        onClick={() => open()}
                        className="absolute top-4 cursor-pointer rounded-full w-7 h-7 bg-white right-4 z-10 flex justify-center items-center"
                      >
                        <i className="bx text-lg bx-pencil"></i>
                      </div>
                    );
                  }}
                </CldUploadWidget>
              ) : null}

              {/* shade on cover image */}
              <div className="absolute bg-black/50 rounded-xl inset-0"></div>

              <div className="flex flex-col justify-center sm:flex-row gap-2 sm:gap-4 absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:translate-y-0 bottom-1/2 translate-y-1/2 sm:left-4 sm:-bottom-6 items-center">
                <div className="relative rounded-full border-white border-2">
                  <Image width={600} height={400}
                    className="w-20 sm:w-32 h-20 sm:h-32 rounded-full object-cover overflow-hidden"
                    src={user?.photo || "/images/user.png"}
                    alt=""
                  />

                  {(pathname != "/portal/profile/edit" && user?.isActive && (user?.userType == "Chef")) && (
                    <>
                      <div
                        className={`w-4 h-4 rounded-full absolute bg-green-500 top-[10%] right-[10%] border-white border-2`}
                      ></div>
                      <div className="w-4 h-4 animate-ping rounded-full absolute bg-green-500 top-[10%] right-[10%] border-white border-2"></div>
                    </>
                  )}

                  {/* edit icon of user image */}
                  {pathname == "/portal/profile/edit" ? (
                    <CldUploadWidget
                      options={{
                        cropping: true,
                        croppingAspectRatio: 1 / 1,
                        croppingCoordinatesMode: "custom",
                      }}
                      uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                      }
                      onSuccess={(res) => {
                        var croppedImageUrl = res.info?.secure_url;
                        if (res?.info?.coordinates?.custom[0]) {
                          const [x, y, width, height] =
                            res?.info?.coordinates?.custom[0];
                          var croppedImageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_crop,x_${x},y_${y},w_${width},h_${height}/${res?.info?.public_id}.png`;
                        }

                        UpdateUserProfilePhoto(croppedImageUrl);
                        document.body.style.overflow = "auto";
                      }}
                    >
                      {({ open }) => {
                        return (
                          <div
                            onClick={() => open()}
                            className="absolute -right-1 -top-1 sm:top-1 sm:right-1 cursor-pointer rounded-full w-6 h-6 bg-white z-10 flex justify-center items-center"
                          >
                            <i className="bx bx-pencil"></i>
                          </div>
                        );
                      }}
                    </CldUploadWidget>
                  ) : null}
                </div>

                <div>
                  <h3 className="text-sm text-center sm:text-left sm:text-3xl font-semibold text-white">
                    {user?.fullName}
                  </h3>
                  <p className="font-medium text-xs sm:text-sm text-center sm:text-start text-gray-300">
                    {user?.userType}
                  </p>
                </div>
              </div>
            </div>}

          </div>
        </div>

        <div>{children}</div>
      </div>

      {/* <Image width={600} height={400}
        className="absolute w-[70vw] sm:w-[60vw]  md:w-[40vw] rotate-90 opacity-5 grayscale right-0 bottom-0"
        src="/images/layoutbg.png"
        alt=""
      /> */}
    </div>
  );
};

export default Layout;
