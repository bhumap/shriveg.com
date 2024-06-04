"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import Image from "next/image";

const MyDishes = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  var [dishes, setDishes] = useState({});

  var [loading, setLoading] = useState(false);

  var [showCreateModal, setShowCreateModal] = useState(false);
  var [dishTitle, setDishTitle] = useState("");
  var [latitude, setLatitude] = useState(0);
  var [longitude, setLongitude] = useState(0);
  var [isSignatured, setIsSignatured] = useState(false);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        console.log("Latitude and Longitude set:", { latitude, longitude });
      },
      (error) => {
        console.error("Geolocation error:", error);
        toast.error("Unable to retrieve location. Please allow location access.");
      }
    );
  }

  async function createDish(e) {
    try {
      setLoading(true);
      e.preventDefault();
      var { data } = await axios.post("/api/dishes", {
        title: dishTitle,
        isSignatured,
        latitude,
        longitude,
      });
      if (data.success) {
        window.document.body.style.overflow = "auto";
        router.push(`/portal/list-dish-form/${data.data._id}`);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  var fetchMyDishes = async () => {
    try {
      setLoading(true);
      var res = await fetch(`/api/dishes/mine`);
      res = await res.json();
      setDishes(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyDishes();
  }, []);

  const signatureDishes = dishes?.data?.filter(
    (item) => item?.isSignatured === true
  );
  const nonSignatureDishes = dishes?.data?.filter(
    (item) => item?.isSignatured !== true
  );

  return (
    <div className="">
      {/* Non Signatue Dishes  */}
      <div>
        <div className="flex justify-between mb-4 items-center">
          <h2 className="text-slate-700 font-semibold text-xl">My Dishes</h2>
          <div className=" grid gap-2 grid-cols-2">
            <button
              onClick={() => {
                setIsSignatured(true);
                setShowCreateModal(true);
                document.body.style.overflow = "hidden";
              }}
              className="border px-3 py-2 rounded-md text-xs bg-primary/10 text-primary border-primary"
            >
              List Signature Dish
            </button>
            <button
              onClick={() => {
                setIsSignatured(false);
                setShowCreateModal(true);
                document.body.style.overflow = "hidden";
              }}
              className="border px-3 py-2 rounded-md text-xs bg-primary text-white shadow-md"
            >
              List New Dish
            </button>
          </div>
        </div>
        <div>
          {nonSignatureDishes?.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {nonSignatureDishes?.map((v, i) => {
                return (
                  <div key={v._id}>
                    <div className="bg-white w-full shadow-md border relative  rounded-lg overflow-hidden">
                      <div className="flex group justify-center items-center aspect-video overflow-hidden flex-col relative">
                        <Image
                          width={600}
                          height={400}
                          className="w-full group-hover:scale-110 transition-all duration-500 h-full object-cover"
                          src={v.images[0]?.secure_url || "/images/image.png"}
                          alt=""
                        />
                        <div className="absolute top-4 right-4">
                          <i
                            onClick={() =>
                              router.push(`/portal/list-dish-form/${v._id}`)
                            }
                            className="bx bg-gray-100 cursor-pointer p-2 rounded-full shadow-sm border border-gray-300 bx-pencil"
                          ></i>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex justify-between gap-4">
                          <h2 className="font-semibold mb-1 line-clamp-2">
                            {v.title || ""}
                          </h2>
                          <div className="text-lg font-bold whitespace-nowrap">
                            ₹ {v.price || ""}
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between py-2">
                            <div className="text-primary text-xs  grid grid-cols-2 gap-4  font-medium">
                              <div className=" flex items-center">
                                <i className="bx bxs-star"></i>
                                4.7
                                <span className="text-gray-500 text-xs">
                                  (23)
                                </span>
                              </div>
                              <div className="text-primary text-xs flex items-center gap-1 font-medium">
                                <i className="bx bxs-time"></i>
                                25 min
                              </div>
                            </div>

                            <div className="text-primary text-xs flex items-center gap-1 font-medium">
                              Serves:{v?.servingPerson ? v?.servingPerson : "-"}
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 ">
                            {v.description || ""}
                          </p>
                        </div>
                        <div
                          className={`${
                            v.status == "Published"
                              ? "bg-green-700/20 border-green-700 text-green-700"
                              : "bg-orange-700/20 border-orange-700 text-orange-700"
                          }   px-3 mt-1 border py-1  font-medium rounded-full inline-block`}
                        >
                          {v.status}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {loading ? (
                <h1>Loading...</h1>
              ) : (
                <p className="text-gray-400 text-center p-4">
                  No Dish Added Yet!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Signatue Dishes */}

      <div>
        <div className="flex justify-between mt-6  mb-4 items-center">
          <h2 className="text-slate-700 font-semibold text-xl">
            My Signature Dishes
          </h2>
        </div>
        <div>
          {signatureDishes?.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {signatureDishes?.map((v, i) => {
                return (
                  <div
                    key={v._id}
                    className="bg-white w-full shadow-md border relative  rounded-lg overflow-hidden"
                  >
                    <div className="flex group justify-center items-center aspect-video overflow-hidden flex-col relative">
                      <Image
                        width={600}
                        height={400}
                        className="w-full group-hover:scale-110 transition-all duration-500 h-full object-cover"
                        src={v.images[0]?.secure_url || "/images/image.png"}
                        alt=""
                      />
                      <div className="absolute top-4 right-4">
                        <i
                          onClick={() =>
                            router.push(`/portal/list-dish-form/${v._id}`)
                          }
                          className="bx bg-gray-100 cursor-pointer p-2 rounded-full shadow-sm border border-gray-300 bx-pencil"
                        ></i>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between gap-4">
                        <h2 className="font-semibold mb-1 line-clamp-2">
                          {v.title || ""}
                        </h2>
                        <div className="text-lg font-bold whitespace-nowrap">
                          ₹ {v.price || ""}
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between py-2">
                          <div className="text-primary grid grid-cols-2 gap-3 text-xs font-medium">
                            <div className="  flex items-center">
                              <i className="bx bxs-star"></i>
                              4.7
                              <span className="text-gray-500 text-xs">
                                (23)
                              </span>
                            </div>
                            <div className="text-primary flex items-center gap-1  font-medium">
                              <i className="bx bxs-time"></i>
                              25 min
                            </div>
                          </div>
                          <div className="text-primary text-xs flex items-center gap-1 font-medium">
                            Serves:{v?.servingPerson ? v?.servingPerson : ""}
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 ">
                          {v.description || ""}
                        </p>
                      </div>
                      <div
                        className={`${
                          v.status == "Published"
                            ? "bg-green-700/20 border-green-700 text-green-700"
                            : "bg-orange-700/20 border-orange-700 text-orange-700"
                        }   px-3 mt-1 border py-1  font-medium rounded-full inline-block`}
                      >
                        {v.status}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {loading ? (
                <h1>Loading...</h1>
              ) : (
                <p className="text-gray-400 text-center p-4">
                  No Dish Added Yet!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      {/* New Dish Popup */}
      <div
        className={`fixed ${
          showCreateModal
            ? "visible opacity-100 scale-100"
            : "invisible opacity-0 scale-0"
        } transition-all duration-1000 top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-md z-20`}
      >
        <div
          onClick={() => {
            setShowCreateModal(false);
            document.body.style.overflow = "auto";
          }}
          className="w-full h-full"
        ></div>
        <div className="absolute min-w-[300px] bg-white shadow-lg top-1/2 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2 z-10">
          <h2 className="font-semibold text-lg border-b py-2 px-4 border-black/20">
            List New Dish
          </h2>
          <form onSubmit={createDish} className="p-4">
            <input
              type="text"
              disabled={loading}
              onChange={(e) => setDishTitle(e.target.value)}
              className="block w-full mb-4 border rounded-md border-black/20"
              placeholder="Enter Dish Title"
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setShowCreateModal(false);
                  document.body.style.overflow = "auto";
                }}
                className="px-3 disabled:opacity-50 disabled:cursor-not-allowed py-1 rounded-md border text-primary border-primary"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                className="px-3 disabled:opacity-50 disabled:cursor-not-allowed py-1 rounded-md border text-white bg-primary"
              >
                {loading && (
                  <i className="bx mr-1 bx-loader-circle bx-spin"></i>
                )}
                {loading ? "Processing..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyDishes;
