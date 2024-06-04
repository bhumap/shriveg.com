"use client"; 

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CollectionCard from "@/components/common/CollectionCard";

const Page = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude and Longitude set:", { latitude, longitude });

          fetchNearbyFoods(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error(
            "Unable to retrieve location. Please allow location access."
          );
        }
      );
    }
  }, []);

  const fetchNearbyFoods = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `${process.env.DOMAIN}/api/dishes/nearbyFoods?lat=${latitude}&lon=${longitude}`
      );
      if (response.ok) {
        const data = await response.json();
        setFoods(data);
      } else {
        console.error("Failed to fetch nearby foods");
      }
    } catch (error) {
      console.error("Error fetching nearby foods:", error);
    }
  };

  const fastFoods = foods && foods.length > 0 ? foods.filter((food) => food.category === "breakfast") : [];

  return (
    <div>
      {fastFoods.length > 0 && (
        <CollectionCard
          dishes={fastFoods}
          title={"Great Morning"}
          dis={"Offering you a delightful start to your morning"}
        />
      )}
    </div>
  );
};

export default Page;
