"use client";
import { useContext, useState, useEffect } from "react";
import FoodCard from "@/components/common/FoodCard";
import { Rating } from "primereact/rating";
import Slider from "react-slick";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

const ChefProfile = ({ chefDetail }) => {
  const params = useParams();

  const trimmedUsername = params.username.slice(3);
  console.log(trimmedUsername);

  const fetchPopularFoods = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://www.shriveg.com/api/dishes?chef=${trimmedUsername}&lat=${lat}&lon=${lon}`,
        {
          cache: "no-store",
        }
      );
      const data = await res.json();
      return data.message;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const [foods, setFoods] = useState([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const getPopularFoods = async (lat, lon) => {
      const foodsData = await fetchPopularFoods(lat, lon);
      setFoods(foodsData);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          getPopularFoods(latitude, longitude);

          console.log("Latitude and Longitude set:", { latitude, longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error(
            "Unable to retrieve location. Please allow location access."
          );
          getPopularFoods();
        }
      );
    } else {
      getPopularFoods();
    }
  }, []);

  console.log(foods);
  console.log(chefDetail);

  var { user } = useContext(AuthContext);

  return (
    <div className="px-4 py-10">
      <div className="max-w-5xl mx-auto rounded-md">
        <div className="relative mb-12 shadow-lg">
          <Image
            width={600}
            height={400}
            src={chefDetail?.message.chef?.coverPhoto || "/images/image.png"}
            className="w-full object-cover rounded-md h-[30vh]"
            alt=""
          />
          <div className="mx-auto w-20 h-20  rounded-full border-[6px] border-white absolute -translate-y-1/2 top-[100%] left-1/2 -translate-x-1/2">
            <Image
              width={600}
              height={400}
              src={chefDetail?.message.chef?.photo || "/images/user.png"}
              className="w-full rounded-full h-full object-cover"
              alt=""
            />
            <div className="w-3 h-3 rounded-full absolute bg-green-500 bottom-0 right-[10%] border-white border-2"></div>
            <div className="w-3 h-3 animate-ping rounded-full absolute bg-green-500 bottom-0 right-[10%] border-white border-2"></div>
          </div>
        </div>

        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold mb-1">
            {chefDetail?.message?.chef?.fullName}
          </h2>
          <p className="text-sm">@{chefDetail?.message?.chef?.username}</p>
        </div>

        <div className="mb-10">
          <div className="max-w-xl grid grid-cols-2 gap-4 sm:grid-cols-4 text-center mx-auto">
            <div>
              <p className="font-semibold mb-1">{chefDetail?.message?.count}</p>
              <p className="text-xs sm:text-sm text-gray-600">Dishes</p>
            </div>
            <div>
              <p className="font-semibold mb-1">0</p>
              <p className="text-xs sm:text-sm text-gray-600">Delivered</p>
            </div>
            <div>
              <p className="font-semibold mb-1 text-green-700">
                <i className="bx bxs-star"></i>0
                {/* <span className="text-black">(23)</span> */}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Ratings(0)</p>
            </div>
            <div>
              <p className="font-semibold mb-1">
                ₹ {parseInt(process.env.NEXT_PUBLIC_SHIPPING_COST)}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Shipping Fee</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-5xl gap-6 mb-10">
          {foods?.data?.length > 0 ? (
            foods.data.map((v, i) => <FoodCard key={i} food={v} />)
          ) : (
            <div className="col-span-full text-center mt-12">Will not be able to be delivered to your location</div>
          )}
        </div>

        <div className="mb-10">
          <p className="mb-2">
            <span className="text-black font-medium text-sm sm:text-base mb-1">
              Location :{" "}
            </span>
            <span className="text-xs sm:text-sm text-gray-600">
              {`${chefDetail?.message?.chef.address?.line1 || ""} ${
                chefDetail?.message?.chef.address?.line2 || ""
              } ${chefDetail?.message?.chef.address?.line3 || ""} ${
                chefDetail?.message?.chef.address?.cityTown || ""
              } ${chefDetail?.message?.chef.address?.district || ""} ${
                chefDetail?.message?.chef.address?.state || ""
              } ${chefDetail?.message?.chef.address?.pinCode || ""}`}
            </span>
          </p>
        </div>

        <Testimonial user={user} chefID={chefDetail?.message?.chef?._id} />
      </div>
    </div>
  );
};

export default ChefProfile;

const Testimonial = ({ user, chefID }) => {
  var [reviewData, setReviewData] = useState({});

  var { data, refetch, isLoading } = useQuery(
    chefID,
    async () => {
      var res = await axios.get(`/api/chef-reviews?chefID=${chefID}`);
      return res.data.message;
    },
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  var settings = {
    dots: false,
    autoplay: true,
    infinite: data?.data?.length > 3,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: data?.data?.length >= 3 ? 3 : 1,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: data?.data?.length >= 3 ? 3 : 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: data?.data?.length >= 2 ? 2 : 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  var submitReview = async (e) => {
    e.preventDefault();
    try {
      if (!reviewData.rating) {
        toast.error("Select Ratings First!");
        return;
      }
      var { data } = await axios.post(`/api/chef-reviews`, {
        ...reviewData,
        chef: chefID,
      });
      if (data.success) {
        toast.success(data.message);
        setReviewData({});
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="py-10">
      <h3 className="mb-6 text-2xl font-semibold text-center">Testimonials</h3>

      <div className="text-center mb-6">
        <Slider {...settings}>
          {data?.data?.map((v, i) => {
            return (
              <div key={i} className="p-4">
                <div>
                  <div className="gap-2 mb-2">
                    <Image
                      width={600}
                      height={400}
                      src={v?.customer?.photo || "/images/user.png"}
                      className="w-12 h-12 mx-auto mb-2 rounded-full shadow-lg"
                    />
                    <div>
                      <h5 className="font-semibold">{v?.customer?.fullName}</h5>
                      <h6 className="text-sm text-primary">
                        {v?.customer?.userType}
                      </h6>
                    </div>
                  </div>

                  <p className="text-sm">{v?.message}</p>
                  <Rating
                    value={v?.rating}
                    className="text-primary mx-auto block"
                    readOnly
                    cancel={false}
                  />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      {user && (
        <form onSubmit={submitReview}>
          <textarea
            onChange={(e) =>
              setReviewData({ ...reviewData, message: e.target.value })
            }
            required
            name=""
            value={reviewData.message || ""}
            className="w-full border rounded-md border-black/20 text-sm"
            id=""
            placeholder="Write a Review"
            rows="2"
          ></textarea>
          <div className="flex my-4 gap-2">
            <Rating
              value={reviewData?.rating || 0}
              style={{ color: "green", gap: "5px" }}
              cancel={false}
              size={50}
              onChange={(e) =>
                setReviewData({ ...reviewData, rating: e.value })
              }
            />
          </div>
          <button className="py-1 px-3 border-primary/50 bg-primary/5 text-primary border rounded-md text-sm">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};
