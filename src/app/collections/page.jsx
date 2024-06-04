"use client";

import React, { useEffect, useState } from "react";
import CollectionCard from "@/components/common/CollectionCard";

var fetchPopularFoods = async (lat, log) => {
  try {
    var res = await fetch(
      `http://localhost:3000/api/dishes/?lat=${lat}&lon=${log}`,
      {
        cache: "no-store",
      }
    );
    res = await res.json();
    return res.message;
  } catch (error) {
    console.log(error);
  }
};

const page = async () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
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
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  var foods = await fetchPopularFoods(latitude, longitude);

  const fastFoods = foods.data.filter((food) => food.category === "breakfast");

  return (
    <div>
      <CollectionCard
        dishes={fastFoods}
        title={"Great Morning"}
        dis={"Offering you a delightful start to your morning"}
      />
    </div>
  );
};

export default page;
