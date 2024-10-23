"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import WorkFlow from "@/components/home/WorkFlow";
import PopularChefs from "@/components/home/PopularChefs";
import PopularFoods from "@/components/home/PopularFoods";
import MobileApp from "@/components/home/MobileApp";
import NewsLetter from "@/components/common/NewsLetter";
import Hero from "@/components/home/Hero";
import Category from "@/components/home/Category";
import toast from "react-hot-toast";

const fetchChefs = async () => {
  try {
    const res = await fetch(`https://shriveg.com/api/users?userType=Chef`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.message;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchPopularFoods = async (lat, lon) => {
  try {
    const res = await fetch(
      `https://shriveg.com/api/dishes?lat=${lat}&lon=${lon}`,
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

const HomePage = () => {
  const [chefs, setChefs] = useState([]);
  const [foods, setFoods] = useState([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const router = useRouter();

  useEffect(() => {
    const getChefs = async () => {
      const chefsData = await fetchChefs();
      setChefs(chefsData);
    };

    const getPopularFoods = async (lat, lon) => {
      const foodsData = await fetchPopularFoods(lat, lon);
      setFoods(foodsData);
    };

    getChefs();

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
          if (error.code === error.PERMISSION_DENIED) {
            toast.error("Location access denied. Redirecting...");
            router.push("/locate");
          } else {
            toast.error(
              "Unable to retrieve location. Please allow location access."
            );
            getPopularFoods();
          }
        }
      );
    } else {
      getPopularFoods();
    }
  }, [router]);

  return (
    <div>
      <Hero />
      <Category />

      {chefs?.data?.length > 0 ? (
        <PopularChefs chefs={chefs} />
      ) : (
        <div className="col-span-full text-center mt-12">Finding chefs...</div>
      )}

      {foods?.data?.length > 0 ? (
       <PopularFoods dishes={foods} />
      ) : (
        <div className="col-span-full text-center mt-12">Finding your nearest food...</div>
      )}

      <MobileApp />
      <NewsLetter />
    </div>
  );
};

export default HomePage;
