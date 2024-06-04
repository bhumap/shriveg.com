"use client";

import React, { useState, useEffect } from "react";
import WorkFlow from "@/components/home/WorkFlow";
import PopularChefs from "@/components/home/PopularChefs";
import PopularFoods from "@/components/home/PopularFoods";
import MobileApp from "@/components/home/MobileApp";
import NewsLetter from "@/components/common/NewsLetter";
import Hero from "@/components/home/Hero";
import Category from "@/components/home/Category";

const fetchChefs = async () => {
  try {
    const res = await fetch(`https://www.shriveg.com/api/users?userType=Chef`, {
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
      `https://www.shriveg.com/api/dishes?lat=${lat}&lon=${lon}`,
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

  return (
    <div>
      <Hero />
      {/* <WorkFlow /> */}
      <Category />
      <PopularChefs chefs={chefs} />
      <PopularFoods dishes={foods} />
      <MobileApp />
      <NewsLetter />
    </div>
  );
};

export default HomePage;
