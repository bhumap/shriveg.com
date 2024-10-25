"use client";

import React, { useState, useEffect } from "react";

import CollectionCard from "@/components/common/CollectionCard";

const fetchPopularFoods = async (lat, lon) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/dishes?lat=${lat}&lon=${lon}`,
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

const Page = () => {
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

  const fastFoods = foods?.data?.filter((food) => food.category === "brunch");

  return (
    <div>
      {foods?.data?.length > 0 ? (
        <CollectionCard
          dishes={fastFoods}
          title={"Irresistible Brunch"}
          dis={"Treat yourself to a delightful mid-day feast!"}
        />
      ) : (
        <div className="col-span-full text-center mt-12">
          Finding your nearest food...
        </div>
      )}
    </div>
  );
};

export default Page;
